/*MAIN STRUCTURE FOR THE NIGGAS DINER*/
const DRINKS=[{n:"Chocolate egg cream",p:4.5},{n:"Fresh diner coffee",p:3},{n:"Cherry Cola",p:3.5},{n:"Fresh lemonade",p:3.75}];
const SIZE_STEP=1.5;  // price difference by size
const ADDON_MARKUP=1.5;       
const ALC_MIN=.75;            
const SIZES=["Small","Medium","Large"];
const MENU=[
/*MENU ITEMS with sides */

/*PASTRAMI SANDWICH */
{id:"pastrami",e:"🥪",n:"Pastrami on Rye",p:16.5,d:"Hand-carved pastrami, spicy brown mustard, sour pickle.",
 a:[["Swiss cheese",1.5],["Coleslaw",1],["Russian dressing",.75],["Extra pastrami",4.5],["Side of fries",3.5],["Extra pickles",.75]]},

 /*BEESECHURGER */
{
  id:"burger",
  e:"🍔",
  n:"Cheeseburger Deluxe",
  p:13.95,d:"Griddled beef patty, American cheese, lettuce, tomato, fries.",
  a:[["Bacon",2],
  ["Fried egg",1.5],
  ["Sautéed onions",1],
  ["Extra patty",4],
  ["Onion rings",3.5],
  ["Avocado",2]
]
},

 /*BACON EGG CHEESE ROLL */
{
  id:"bec",
  e:"🍳",
  n:"Bacon, Egg & Cheese on a Roll"
  ,p:8.5,d:"The bodega classic on a toasted kaiser roll."
  ,a:[["Extra bacon",2]
  ,["Sausage patty",2]
  ,["Home fries",3]
  ,["Hot sauce",0]
  ,["Avocado",2]
  ,["Double egg",1.75]
]
},

 /*GYRO IDK KUNG ANO PA SINESERVE NILA SO ETO NALANG */
{id:"gyro",
e:"🥙",
n:"Greek Gyro Platter",
p:14.5,
d:"Sliced gyro, rice, salad, warm pita and tzatziki.",
a:[["Feta cheese",1.5],
["Extra tzatziki",1],
["Kalamata olives",1.25],
["Extra pita",1.5],
["Hot peppers",.75],
["Side of fries",3.5]
]
},

/*PANKEK */
{
  id:"pancakes",
  e:"🥞",
  n:"Buttermilk Pancake Stack",
  p:10.95,
  d:"Three fluffy pancakes with whipped butter and maple syrup.",
 a:[["Blueberries",1.75],
 ["Chocolate chips",1.5],
 ["Whipped cream",1],
 ["Two strips of bacon",3],
 ["Scrambled eggs",3.25],
 ["Extra maple syrup",.75]
]
},

/*TEMPLATE */
{
  id:"reuben",
  e:"🥪",
  n:"Reuben Sandwich",
  p:15.5,
  d:"Corned beef, Swiss, sauerkraut and Russian dressing on grilled rye.",
  a:[
    ["Extra corned beef",4.5],
    ["Extra Swiss cheese",1.5],
    ["Coleslaw",1],
    ["Side of fries",3.5],
    ["Extra pickles",.75],
    ["Thousand Island dressing",.75]
  ]
},
{
  id:"lox",
  e:"🥯",
  n:"Bagel with Lox",
  p:13.95,
  d:"Toasted bagel, cream cheese, nova lox, tomato, red onion and capers.",
  a:[
    ["Extra lox",4],
    ["Extra cream cheese",1.25],
    ["Capers",.75],
    ["Sliced cucumber",.75],
    ["Hard-boiled egg",1.5],
    ["Everything seasoning",0]
  ]
},
{
  id:"omelet",
  e:"🥚",
  n:"Western Omelet",
  p:11.95,
  d:"Three eggs with ham, peppers and onions, served with toast.",
  a:[
    ["Cheddar cheese",1.25],
    ["Home fries",3],
    ["Sausage links",3],
    ["Sautéed mushrooms",1.25],
    ["Avocado",2],
    ["Hot sauce",0]
  ]
},
{
  id:"pattymelt",
  e:"🧀",
  n:"Patty Melt",
  p:14.5,
  d:"Beef patty, melted Swiss and grilled onions on griddled rye.",
  a:[
    ["Bacon",2],
    ["Extra Swiss cheese",1.5],
    ["Fried egg",1.5],
    ["Onion rings",3.5],
    ["Side of fries",3.5],
    ["Sautéed mushrooms",1.25]
  ]
},
{
  id:"disco",
  e:"🍟",
  n:"Disco Fries",
  p:9.95,
  d:"Crispy fries smothered in brown gravy and melted mozzarella.",
  a:[
    ["Bacon bits",2],
    ["Extra gravy",.75],
    ["Extra mozzarella",1.5],
    ["Chopped scallions",.5],
    ["Jalapeños",.75],
    ["Fried egg",1.5]
  ]
},
{
  id:"matzo",
  e:"🍲",
  n:"Matzo Ball Soup",
  p:8.5,
  d:"Homemade chicken broth, a fluffy matzo ball, carrots and noodles.",
  a:[
    ["Extra matzo ball",2.5],
    ["Extra noodles",1],
    ["Side of rye bread",1.5],
    ["Shredded chicken",2.5],
    ["Fresh dill",0],
    ["Crackers",.75]
  ]
},
{
  id:"club",
  e:"🍞",
  n:"Turkey Club",
  p:14.25,
  d:"Triple-decker with roast turkey, bacon, lettuce and tomato on toasted white.",
  a:[
    ["Extra bacon",2],
    ["Avocado",2],
    ["Swiss cheese",1.5],
    ["Side of fries",3.5],
    ["Coleslaw",1],
    ["Extra turkey",3.5]
  ]
},




];



const $=s=>document.querySelector(s),usd=n=>"$"+n.toFixed(2);
let cart=[],cur=null,qty=1,uid=0;
let orderType=null,paySnapshot=null,receipts=[];

$("#grid").innerHTML=MENU.map(m=>`<button class="item" data-id="${m.id}"><span class="emoji" aria-hidden="true">${m.e}</span><h3>${m.n}</h3><p>${m.d}</p><span class="price">${usd(m.p)}</span><span class="cta">Customize &amp; add</span></button>`).join("")
  +`<button class="item" id="alcCard"><span class="emoji" aria-hidden="true">🧂</span><h3>Add-Ons À La Carte</h3><p>Just want fries or extra cheese? Order add-ons on their own here.</p><span class="cta">Browse add-ons</span></button>`;
$("#grid").onclick=e=>{
  const b=e.target.closest(".item");
  if(!b)return;
  if(b.id==="alcCard"){openAlaCarte();return;}
  const m=MENU.find(m=>m.id===b.dataset.id);
  if(m)openItem(m);
};

function opt(type,name,label,price,val){
  return `<label class="opt">
  <input type="${type}" name="${name}" value="${val}">
  <span>${label}</span>
  <b>${price>0?"+"+usd(price):price===0?"Free":""}</b>
  </label>`}


function openItem(m){
  cur=m;qty=1;$("#q").textContent=1;$("#dname").textContent=m.n;
  $("#dbody").innerHTML=`<h3>Add-ons</h3><p class="hint">Add to your order.</p>


  <div class="opts">${m.a.map((a,i)=>opt("checkbox","addon",a[0],a[1],i)).join("")}</div>
  <h3>Add a drink</h3><p class="hint">Optional. Pick one.</p><div class="opts">${opt("radio","drink","No drink","",-1).replace("<b></b>","")}${DRINKS.map((d,i)=>opt("radio","drink",d.n,d.p,i)).join("")}</div>
  <h3>Drink size</h3><p class="hint">Only matters if you picked a drink above.</p><div class="opts">
    <label class="opt"><input type="radio" name="size" value="0" checked><span>Small</span><b></b></label>
    <label class="opt"><input type="radio" name="size" value="1"><span>Medium</span><b>+${usd(SIZE_STEP)}</b></label>
    <label class="opt"><input type="radio" name="size" value="2"><span>Large</span><b>+${usd(SIZE_STEP*2)}</b></label>
  </div>`;


  $('#dbody input[name="drink"][value="-1"]').checked=true;
  $("#dbody").onchange=updateAdd;updateAdd();$("#dlg").showModal();
}



function config(){
  const adds=[...document.querySelectorAll('input[name="addon"]:checked')].map(i=>cur.a[+i.value]);
  const dv=+document.querySelector('input[name="drink"]:checked').value;
  const sizeIdx=+document.querySelector('input[name="size"]:checked').value;
  return{adds,drink:dv>=0?DRINKS[dv]:null,sizeIdx};
}


function unit(c){
  return cur.p+c.adds.reduce((s,a)=>s+a[1],0)+(c.drink?c.drink.p+SIZE_STEP*c.sizeIdx:0)
}


function updateAdd(){$("#add").textContent=`Add to order · ${usd(unit(config())*qty)}`}
$("#plus").onclick=()=>{qty=Math.min(qty+1,9);$("#q").textContent=qty;updateAdd()};
$("#minus").onclick=()=>{qty=Math.max(qty-1,1);$("#q").textContent=qty;updateAdd()};
$("#close").onclick=()=>$("#dlg").close();
$("#add").onclick=()=>{
  const c=config();
  /* One line per tap: same plate with different add-ons is never merged. */
  cart.push({id:++uid,name:cur.n,adds:c.adds,drink:c.drink,sizeIdx:c.sizeIdx,unit:unit(c),qty});
  $("#dlg").close();render();
};




function render(){
  $("#lines").innerHTML=cart.length?cart.map(l=>`<li>
    <div class="row">
    <span>${l.qty} × ${l.name}</span>
    <span>${usd(l.unit*l.qty)}</span>
    </div>
<small>${l.alc?"Ordered on its own":(l.adds.length?"Add-ons: "+l.adds.map(a=>a[0]).join(", "):"No add-ons")}</small>${l.drink?`<small>Drink: ${SIZES[l.sizeIdx]} ${l.drink.n}</small>`:""}
  <button class="rm" data-id="${l.id}">Remove</button></li>`).join(""):`<li class="empty">Nothing yet. Tap a plate to get started.</li>`;

  const sub=cart.reduce((s,l)=>s+l.unit*l.qty,0),tax=sub*.08875;


  $("#sub").textContent=usd(sub);$("#tax").textContent=usd(tax);$("#total").textContent=usd(sub+tax);
  $("#place").disabled=!cart.length;
}




$("#lines").onclick=e=>{const b=e.target.closest(".rm");if(b){cart=cart.filter(l=>l.id!==+b.dataset.id);render()}};
$("#clear").onclick=()=>{cart=[];render()};

/* DIBNE IN TAKE OUT CHOICE REVERSAL*/
function openTypeDialog(isChange){
  $("#typeClose").classList.toggle("hidden",!isChange);
  $("#typeDlg").showModal();
}
function alcOpt(label,price,val){
  return `<label class="opt"><input type="checkbox" name="alc" value="${val}"><span>${label}</span><b>${usd(price)}</b></label>`;
}
function openAlaCarte(){
  $("#alcBody").innerHTML=MENU.map((m,mi)=>`
    <h3>${m.n} add-ons</h3>
    <div class="opts">${m.a.map((a,ai)=>alcOpt(a[0],Math.max(a[1]*ADDON_MARKUP,ALC_MIN),`${mi}-${ai}`)).join("")}</div>
  `).join("");
  $("#alcDlg").showModal();
}
$("#closeAlc").onclick=()=>$("#alcDlg").close();
$("#alcAdd").onclick=()=>{
  [...document.querySelectorAll('input[name="alc"]:checked')].forEach(c=>{
    const [mi,ai]=c.value.split("-").map(Number);
    const base=MENU[mi].a[ai];
    cart.push({id:++uid,name:`${base[0]} (à la carte)`,adds:[],drink:null,sizeIdx:0,alc:true,unit:Math.max(base[1]*ADDON_MARKUP,ALC_MIN),qty:1});
  });
  $("#alcDlg").close();render();
};


/*DINE IN TAKE OUT CHOOSING */
function chooseType(t){
  orderType=t;
  $("#typeLabel").textContent=t==="dine"?"🍽️ Dine In":"🥡 Takeout";
  $("#typeDlg").close();
}


$("#typeDlg").addEventListener("cancel",e=>{if(!orderType)e.preventDefault()});
$("#pickDine").onclick=()=>chooseType("dine");
$("#pickTake").onclick=()=>chooseType("take");
$("#typeClose").onclick=()=>$("#typeDlg").close();
$("#changeType").onclick=()=>openTypeDialog(true);



/*Payment function popup*/
function openPay(){
  const subtotal=cart.reduce((s,l)=>s+l.unit*l.qty,0),tax=subtotal*.08875;
  paySnapshot={lines:cart.map(l=>({...l})),subtotal,tax,total:subtotal+tax,type:orderType};
  $("#payTotal").textContent=usd(paySnapshot.total);
  $("#cashInput").value="";$("#cashInput").classList.remove("invalid");
  $("#payMsg").textContent="";$("#payMsg").className="pay-msg";
  $("#confirmPay").disabled=true;$("#confirmPay").textContent="Confirm payment";
  $("#payDlg").showModal();$("#cashInput").focus();
}


/*validation system */

function validateCash(){
  const raw=$("#cashInput").value.trim(),input=$("#cashInput"),msg=$("#payMsg"),btn=$("#confirmPay");
  const reset=()=>{input.classList.remove("invalid");btn.disabled=true;btn.textContent="Confirm payment"};
  if(!raw){msg.textContent="";msg.className="pay-msg";reset();return}

  /* only digits are accepted NIGGER ang maglagay ng letter at symbol*/
  if(!/^\d+(\.\d{1,2})?$/.test(raw)){
    msg.textContent="Enter numbers only, like 20 or 20.00 — no letters or symbols.";
    msg.className="pay-msg err";input.classList.add("invalid");reset();return;
  }


  const amount=parseFloat(raw);
  if(amount<paySnapshot.total){
    /*Payment MUSt be greater than cost wag bobo  */
    msg.textContent=`That's ${usd(paySnapshot.total-amount)} short of the total.`;
    msg.className="pay-msg err";input.classList.add("invalid");reset();return;
  }


  const change=amount-paySnapshot.total;
  /*Realtime change indicator, astig kasi, lowkey optional if masyado mukhang cluttered*/

  msg.textContent=`Change due: ${usd(change)}`;msg.className="pay-msg ok";
  input.classList.remove("invalid");btn.disabled=false;
  btn.textContent=`Confirm payment · Change ${usd(change)}`;
}

/*cash input click */
$("#cashInput").oninput=validateCash;
$("#closePay").onclick=()=>$("#payDlg").close();
$("#place").onclick=openPay;

/*Payment Confirmation for resibo */
$("#confirmPay").onclick=()=>{
  const amount=parseFloat($("#cashInput").value.trim()),change=amount-paySnapshot.total;
  const receipt={num:100+Math.floor(Math.random()*900)

    /*Receipt info */
    /*snapshot current values to print out receipt */
    ,type:paySnapshot.type
    ,time:new Date()
    ,lines:paySnapshot.lines
    ,subtotal:paySnapshot.subtotal
    ,tax:paySnapshot.tax
    ,total:paySnapshot.total,
    tendered:amount,change};

/*Shift recipe to stack */
  receipts.unshift(receipt);
  $("#receiptCount").textContent=`(${receipts.length})`;
  cart=[];render();$("#payDlg").close();
  $("#num").textContent="#"+receipt.num;
  $("#doneType").textContent=receipt.type==="dine"?"🍽️ Dine In":"🥡 Takeout";
  $("#doneTendered").textContent=usd(receipt.tendered);
  $("#doneChange").textContent=usd(receipt.change);
  $("#doneMsg").textContent=receipt.type==="dine"?"Grab a table. We'll call your number.":"We'll call your number when it's ready to go.";
  $("#done").showModal();
};
$("#new").onclick=()=>$("#done").close();

/* Receipt checking, 1 receipt per order completed */
function renderReceipts(){
  $("#receiptsBody").innerHTML=receipts.length?receipts.map(r=>`
    <div class="receipt">
      <div class="row">
          <span>Order #${r.num}</span>
          <span class="tag">${r.type==="dine"?"Dine In":"Takeout"}</span>
      </div>
      <div class="time">${r.time.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</div>
      <button class="rm dl" data-i="${i}" type="button">Download .txt</button>
      <ul class="lines">${r.lines.map(l=>`<li>
          <div class="row">
          <span>${l.qty} × ${l.name}</span>
          <span>${usd(l.unit*l.qty)}</span>
          </div>

        <small>${l.alc?"Ordered on its own":(l.adds.length?"Add-ons: "+l.adds.map(a=>a[0]).join(", "):"No add-ons")}</small>${l.drink?`<small>Drink: ${SIZES[l.sizeIdx]} ${l.drink.n}</small>`:""}</li>`).join("")}</ul>      <div class="tot">
         <div>
           <span>Subtotal</span>
           <span>${usd(r.subtotal)}</span>
        </div>

      <div>
        <span>Tax</span>
        <span>${usd(r.tax)}</span>
      </div>


      <div class="grand">
        <span>Total</span>
        <span>${usd(r.total)}</span>
      </div>


      <div>
        <span>Tendered</span>
        <span>${usd(r.tendered)}</span>
      </div>


      <div>
      <span>Change</span>
      <span>${usd(r.change)}</span>
      </div>
      </div>
    </div>`).join(""):
    `<p class="no-receipts">No orders placed yet this session.</p>`;
}

function receiptText(r){
  const rule="-".repeat(40);
  const pad=(label,value)=>label+" ".repeat(Math.max(1,40-label.length-value.length))+value;
  const out=[
    "WrnEats",
    rule,
    `Order #${r.num} (${r.type==="dine"?"Dine In":"Takeout"})`,
    r.time.toLocaleString(),
    rule
  ];
  r.lines.forEach(l=>{
    out.push(pad(`${l.qty} x ${l.name}`,usd(l.unit*l.qty)));
    out.push("   "+(l.alc?"Ordered on its own":(l.adds.length?"Add-ons: "+l.adds.map(a=>a[0]).join(", "):"No add-ons")));
    if(l.drink)out.push(`   Drink: ${SIZES[l.sizeIdx]} ${l.drink.n}`);
  });
  out.push(rule,pad("Subtotal",usd(r.subtotal)),pad("Tax",usd(r.tax)),pad("Total",usd(r.total)),
    pad("Cash tendered",usd(r.tendered)),pad("Change",usd(r.change)),rule,"Thank you!");
  return out.join("\n");
}
function downloadReceipt(r){
  const blob=new Blob([receiptText(r)],{type:"text/plain"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download=`receipt-${r.num}.txt`;
  a.click();
  URL.revokeObjectURL(a.href);
}

/*Additional lang pero dark theme cool asf btw */
function applyTheme(t){
  document.documentElement.setAttribute("data-theme",t);
  $("#themeToggle").textContent=t==="dark"?"☀️ Light mode":"🌙 Dark mode";
  localStorage.setItem("kiosk-theme",t);
}
/*click toggle for dark theme */
$("#themeToggle").onclick=()=>{
  const current=document.documentElement.getAttribute("data-theme")==="dark"?"dark":"light";
  applyTheme(current==="dark"?"light":"dark");
};

const saved=localStorage.getItem("kiosk-theme");
if(saved){
  applyTheme(saved);
}else if(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches){
  $("#themeToggle").textContent="☀️ Light mode";
}

$("#openReceipts").onclick=()=>{renderReceipts();$("#receiptsDlg").showModal()};
$("#closeReceipts").onclick=()=>$("#receiptsDlg").close();

/*exec*/
//render type shi type shi
render();
openTypeDialog(false);
