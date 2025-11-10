<?php
require_once __DIR__ . '/../config.php';

$raw=file_get_contents('php://input');
$sig=$_SERVER['HTTP_SIGNATURE']??'';
$calc=hash_hmac('sha256',$raw,TM_SIGNING_KEY);
if(!hash_equals($calc,$sig)){ http_response_code(401); echo 'invalid_signature'; exit; }

$payload=json_decode($raw,true);
if(!$payload){ http_response_code(400); echo 'invalid_json'; exit; }
$result=$payload['result']??$payload;
$payment_id=$result['id']??null;
$reference_id=$result['referenceId']??null;
$state=$result['state']??null;
if(!$payment_id||!$reference_id){ http_response_code(400); echo 'invalid_payload'; exit; }

$stmt=$connection->prepare("SELECT tt.id, tt.topup_id, tt.user_id, tt.tokens, tt.state, u.balance FROM transfermit_topups tt JOIN users u ON u.id=tt.user_id WHERE tt.reference_id=? LIMIT 1");
$stmt->bind_param("s",$reference_id);
$stmt->execute();
$res=$stmt->get_result();
if($res->num_rows===0){ http_response_code(404); echo 'not_found'; exit; }
$row=$res->fetch_assoc();
$stmt->close();

if($state==='COMPLETED'){
    if($row['state']!=='COMPLETED'){
        $new_balance=intval($row['balance'])+intval($row['tokens']);
        $stmt=$connection->prepare("UPDATE users SET balance=? WHERE id=?");
        $stmt->bind_param("ii",$new_balance,$row['user_id']);
        $stmt->execute();
        $stmt->close();

        $stmt=$connection->prepare("UPDATE transfermit_topups SET payment_id=?, state='COMPLETED', updated_at=NOW() WHERE reference_id=?");
        $stmt->bind_param("ss",$payment_id,$reference_id);
        $stmt->execute();
        $stmt->close();
    }
    echo 'ok'; exit;
}

if(in_array($state,['PENDING','CHECKOUT','DECLINED','CANCELLED'])){
    $stmt=$connection->prepare("UPDATE transfermit_topups SET payment_id=?, state=?, updated_at=NOW() WHERE reference_id=?");
    $stmt->bind_param("sss",$payment_id,$state,$reference_id);
    $stmt->execute();
    $stmt->close();
    echo 'ok'; exit;
}

echo 'ok';
