<?php
if (session_status() === PHP_SESSION_NONE) { session_start(); }
require_once __DIR__.'/../config.php';
require_once __DIR__.'/../currency-utils.php';
header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) { http_response_code(401); echo json_encode(['error'=>'unauthorized']); exit; }

$input=json_decode(file_get_contents('php://input'),true);
$amount=isset($input['amount'])?floatval($input['amount']):0;
$currency=isset($input['currency'])?strtoupper($input['currency']):'EUR';
$lucky=!empty($input['lucky']);
if (!is_finite($amount) || $amount < 1) { http_response_code(422); echo json_encode(['error'=>'invalid_amount_min_1']); exit; }
if (!preg_match('/^[A-Z]{3}$/',$currency)) $currency='EUR';

$user_id=(int)$_SESSION['user_id'];
$stmt=$connection->prepare("SELECT * FROM users WHERE id=? LIMIT 1");
$stmt->bind_param("i",$user_id);
$stmt->execute();
$res=$stmt->get_result();
$u=$res?$res->fetch_assoc():null;
$stmt->close();
if(!$u){ http_response_code(404); echo json_encode(['error'=>'user_not_found']); exit; }

$first=isset($u['first_name'])&&$u['first_name']!==''?$u['first_name']:'Harry';
$last=isset($u['last_name'])&&$u['last_name']!==''?$u['last_name']:'Potter';
$email=isset($u['email'])&&$u['email']!==''?$u['email']:'customer@email.com';
$cit=isset($u['citizenship'])&&$u['citizenship']!==''?strtoupper($u['citizenship']):'GB';
$dob=isset($u['date_of_birth'])&&$u['date_of_birth']!==''?$u['date_of_birth']:'1996-01-05';
$rawPhone=$u['phone']??'';
$digitsPhone=preg_replace('/\D+/','',$rawPhone);
if($digitsPhone===''||strlen($digitsPhone)<9)$digitsPhone='357123456789';
$phone=strlen($digitsPhone)>3?substr($digitsPhone,0,3).' '.substr($digitsPhone,3):$digitsPhone;

$addr1=isset($u['bill_address'])&&$u['bill_address']!==''?$u['bill_address']:'211, Victory street';
$addr2=isset($u['bill_address_2'])&&$u['bill_address_2']!==''?$u['bill_address_2']:'Office 7B';
$city=isset($u['bill_city'])&&$u['bill_city']!==''?$u['bill_city']:'Hogwarts';
$cc=isset($u['bill_country'])&&$u['bill_country']!==''?strtoupper($u['bill_country']):'GB';
if(!preg_match('/^[A-Z]{2}$/',$cc))$cc='GB';
$zip=isset($u['bill_postal'])&&$u['bill_postal']!==''?$u['bill_postal']:'01001';
$state=isset($u['bill_state'])&&$u['bill_state']!==''?$u['bill_state']:'CA';

$rateCfg=get_currency_config($currency);
$tokens_per_unit=100/$rateCfg['rate'];
$tokens=(int)floor($amount*$tokens_per_unit);
$bonus_percent=0;
if($lucky){ $bonus_percent=random_int(10,25); $tokens=(int)floor($tokens*(100+$bonus_percent)/100); }

$custom_ref='TOPUP-'.$user_id.'-'.bin2hex(random_bytes(6));

$stmt=$connection->prepare("INSERT INTO topups (user_id, amount) VALUES (?,?)");
$stmt->bind_param("id",$user_id,$amount);
$stmt->execute();
$topup_id=$connection->insert_id;
$stmt->close();

$stmt=$connection->prepare("INSERT INTO transfermit_topups (topup_id,user_id,reference_id,amount,currency,tokens,bonus_percent,state) VALUES (?,?,?,?,?,?,?,'INITIATED')");
$stmt->bind_param("iisdsii",$topup_id,$user_id,$custom_ref,$amount,$currency,$tokens,$bonus_percent);
$stmt->execute();
$stmt->close();

$ref_compose='payment_id='.$topup_id.';custom_ref='.$custom_ref;

$base=rtrim(SITE_BASE_URL,'/');
$successUrl=$base.'/top-up-success?pid={id}&ref={referenceId}&state={state}&type={type}';
$declineUrl = $base . '/top-up-decline?pid={id}&ref={referenceId}&state={state}&type={type}';

$payload=[
    'referenceId'=>$ref_compose,
    'paymentType'=>'DEPOSIT',
    'paymentMethod'=>'BASIC_CARD',
    'amount'=>(float)$amount,
    'currency'=>$currency,
    'description'=>'Funding the account number '.$user_id,
    'customer'=>[
        'referenceId'=>'VIP_customer_'.$user_id,
        'citizenshipCountryCode'=>$cit,
        'firstName'=>$first,
        'lastName'=>$last,
        'dateOfBirth'=>$dob,
        'email'=>$email,
        'phone'=>$phone,
        'locale'=>'en',
        'ip'=>$_SERVER['REMOTE_ADDR']??'172.16.0.1'
    ],
    'billingAddress'=>[
        'addressLine1'=>$addr1,
        'addressLine2'=>$addr2,
        'city'=>$city,
        'countryCode'=>$cc,
        'postalCode'=>$zip,
        'state'=>$state
    ],
    'successReturnUrl'=>$successUrl,
    'declineReturnUrl'=>$declineUrl,
    'webhookUrl'=>$base.'/api/transfermit-webhook.php',
    'websiteUrl'=>$base,
    'additionalParameters'=>[
        'countryOfBirth'=>$cit
    ]
];

$ch=curl_init(TM_API_URL.'/payments');
curl_setopt_array($ch,[
    CURLOPT_POST=>true,
    CURLOPT_HTTPHEADER=>[
        'Authorization: Bearer '.TM_API_KEY,
        'Content-Type: application/json',
        'Accept: application/json'
    ],
    CURLOPT_POSTFIELDS=>json_encode($payload,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES),
    CURLOPT_RETURNTRANSFER=>true,
    CURLOPT_TIMEOUT=>60
]);
$resp=curl_exec($ch);
$http=curl_getinfo($ch,CURLINFO_RESPONSE_CODE);
$err=curl_error($ch);
curl_close($ch);

if(isset($_GET['debug'])&&$_GET['debug']==='1'){
    error_log('TM_CARDSHPP HTTP='.$http.' ERR='.($err?:'none').' RESP='.(is_string($resp)?$resp:'null'));
    error_log('TM_CARDSHPP PAYLOAD='.json_encode($payload,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES));
}

if($http>=200&&$http<300&&$resp){
    $data=json_decode($resp,true);
    $payment=$data['result']??$data;
    $payment_id=$payment['id']??null;
    $state=$payment['state']??'CHECKOUT';
    $redirect=$payment['redirectUrl']??null;
    if($payment_id){
        $stmt=$connection->prepare("UPDATE transfermit_topups SET payment_id=?, state=? WHERE reference_id=?");
        $stmt->bind_param("sss",$payment_id,$state,$custom_ref);
        $stmt->execute();
        $stmt->close();
    }
    if($redirect){ echo json_encode(['redirectUrl'=>$redirect]); exit; }
    $fallback=$base.'/top-up-success?pid='.rawurlencode($payment_id?:'').'&ref='.rawurlencode($ref_compose).'&state='.rawurlencode($state).'&type=DEPOSIT';
    echo json_encode(['redirectUrl'=>$fallback]); exit;
}

http_response_code($http?:500);
echo $resp?:json_encode(['error'=>$err?:'gateway_unreachable']);
