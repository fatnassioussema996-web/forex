document.addEventListener('DOMContentLoaded',()=> {
    const form=document.getElementById('topup-form');
    if(!form)return;
    const amountInput=document.getElementById('topup-amount');
    const tokenDisplay=document.getElementById('token-equivalent');
    const presetBtns=form.querySelectorAll('.preset-btn');
    const checkoutButton=document.getElementById('checkout-button');
    const luckyButton=document.getElementById('lucky-button');
    const errorBox=document.getElementById('error-message');
    const rate=parseFloat(amountInput.dataset.rate)||1;
    const currency=(amountInput.dataset.currency||'EUR').toUpperCase();
    const perUnit=100/rate;
    const sanitize=v=>String(v).replace(',', '.').replace(/[^\d.]/g,'');
    const fmt2=v=>Number(v).toFixed(2);
    const updateTokens=v=>{const a=parseFloat(sanitize(v));if(isNaN(a)||a<=0){tokenDisplay.textContent='';return;}const t=Math.floor(a*perUnit);tokenDisplay.textContent=`You'll get ${t} Tokens`;};
    presetBtns.forEach(btn=>{btn.addEventListener('click',()=>{presetBtns.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const val=btn.dataset.amount;if(val!=='custom'){amountInput.value=fmt2(val);}else{amountInput.value='';amountInput.focus();}updateTokens(amountInput.value);});});
    amountInput.addEventListener('input',()=>{const v=sanitize(amountInput.value);amountInput.value=v;updateTokens(v);});
    const initial=form.querySelector('.preset-btn:not([data-amount="custom"])'); if(initial) initial.click();

    const send=async(isLucky,btn)=>{
        const amount=parseFloat(sanitize(amountInput.value));
        if(isNaN(amount)||amount<1){errorBox.textContent='Введите корректную сумму.';return;}
        const orig=btn.textContent;
        btn.textContent='Обработка...';
        btn.classList.add('opacity-60');
        checkoutButton.disabled=true;
        luckyButton.disabled=true;
        errorBox.textContent='';
        try{
            const qs=new URLSearchParams(location.search);
            const method=qs.get('method')==='googlepay'?'googlepay':'card';
            const body={amount, currency, lucky:!!isLucky, method};
            const url='/api/topup-init.php'+(location.search.includes('debug=1')?'?debug=1':'');
            const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
            const text=await r.text(); let data=null; try{data=JSON.parse(text);}catch(e){}
            if(!r.ok) throw new Error((data&&(data.error||data.details))||text||('HTTP '+r.status));
            if(!data||!data.redirectUrl) throw new Error('Не получен redirectUrl');
            window.location.href=data.redirectUrl;
        }catch(e){
            errorBox.innerHTML=`<div class="bg-red-50 border border-red-200 rounded-md p-3 text-center"><p class="text-red-800 font-medium">❌ Ошибка</p><p class="text-red-700 text-sm">${e.message}</p></div>`;
        }finally{
            btn.textContent=orig;
            btn.classList.remove('opacity-60');
            checkoutButton.disabled=false;
            luckyButton.disabled=false;
        }
    };

    checkoutButton.addEventListener('click',e=>{e.preventDefault();send(false,checkoutButton);});
    luckyButton.addEventListener('click',e=>{e.preventDefault();send(true,luckyButton);});
});
