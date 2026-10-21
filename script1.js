//dataset containing shop items
const items = [{name:"sword", price:60, amount:0},
               {name:"armor", price:100, amount:0},
               {name:"chain", price:50, amount:0},
               {name:"pot", price:20, amount:0}]

//detects if user already has item in cart/basket
let swordButtons = document.querySelector('#swordOptions')
let armorButtons = document.querySelector('#armorOptions')
let chainButtons = document.querySelector('#chainOptions')
let potButtons = document.querySelector('#potOptions')
//only relevant to catlogue.html

//loads saved cart
const savedSwordAmount = localStorage.getItem('swordAmount');
if (savedSwordAmount !== null) {
  items[0].amount = Number(savedSwordAmount);
}
const savedArmorAmount = localStorage.getItem('armorAmount');
if (savedArmorAmount !== null) {
  items[1].amount = Number(savedArmorAmount);
}
const savedChainAmount = localStorage.getItem('chainAmount');
if (savedChainAmount !== null) {
  items[2].amount = Number(savedChainAmount);
}
const savedPotAmount = localStorage.getItem('potAmount');
if (savedPotAmount !== null) {
  items[3].amount = Number(savedPotAmount);
}

//changes value of amount of swords
function incSword(){
  items[0].amount=items[0].amount + 1;
  localStorage.setItem('swordAmount', items[0].amount);
  refresh();
}
function decSword(){
  if(items[0].amount > 0){
    items[0].amount=items[0].amount - 1;
    localStorage.setItem('swordAmount', items[0].amount);
    refresh();
  }
}
//Changes value of amount of armor
function incArmor(){
  items[1].amount=items[1].amount + 1;
  localStorage.setItem('armorAmount', items[1].amount);
  refresh();
}
function decArmor(){
  if(items[1].amount > 0){
    items[1].amount=items[1].amount - 1;
    localStorage.setItem('armorAmount', items[1].amount);
    refresh();
  }
}
//Changes value of amount of chainmail
function incChain(){
  items[2].amount=items[2].amount + 1;
  localStorage.setItem('chainAmount', items[2].amount);
  refresh();
}
function decChain(){
  if(items[2].amount > 0){
    items[2].amount=items[2].amount - 1;
    localStorage.setItem('chainAmount', items[2].amount);
    refresh();
  }
}
//Changes value of amount of cooking pots
function incPot(){
  items[3].amount=items[3].amount + 1;
  localStorage.setItem('potAmount', items[3].amount);
  refresh();
}
function decPot(){
  if(items[3].amount > 0){
    items[3].amount=items[3].amount - 1;
    localStorage.setItem('potAmount', items[3].amount);
    refresh();
  }
}


//updates every value change
function refresh(){
//determines what button layout to display
if(swordButtons){
if(items[0].amount==0){
  swordButtons.innerHTML=`<button id="swordUp" class="cartButton"><strong>Add to Cart</strong></button>`
}
else{
  swordButtons.innerHTML=`<button id="swordUp" class="cartButton"><strong>Add to cart (${items[0].amount})</strong></button><button id="swordDown" class="cartButton"><strong>Remove from Cart</strong></button>`
}
}
//determines what button layout to display
if(armorButtons){
if(items[1].amount==0){
  armorButtons.innerHTML=`<button id="armorUp" class="cartButton"><strong>Add to Cart</strong></button>`
}
else{
  armorButtons.innerHTML=`<button id="armorUp" class="cartButton"><strong>Add to cart (${items[1].amount})</strong></button><button id="armorDown" class="cartButton"><strong>Remove from Cart</strong></button>`
}
}
//determines what button layout to display
if(chainButtons){
if(items[2].amount==0){
  chainButtons.innerHTML=`<button id="chainUp" class="cartButton"><strong>Add to Cart</strong></button>`
}
else{
  chainButtons.innerHTML=`<button id="chainUp" class="cartButton"><strong>Add to cart (${items[2].amount})</strong></button><button id="chainDown" class="cartButton"><strong>Remove from Cart</strong></button>`
}
}
//determines what button layout to display
if(potButtons){
if(items[3].amount==0){
  potButtons.innerHTML=`<button id="potUp" class="cartButton"><strong>Add to Cart</strong></button>`
}
else{
  potButtons.innerHTML=`<button id="potUp" class="cartButton"><strong>Add to cart (${items[3].amount})</strong></button><button id="potDown" class="cartButton"><strong>Remove from Cart</strong></button>`
}
}

//establishes buttons
const addSword = document.getElementById('swordUp')
const remSword = document.getElementById('swordDown')
const addArmor = document.getElementById('armorUp')
const remArmor = document.getElementById('armorDown')
const addChain = document.getElementById('chainUp')
const remChain = document.getElementById('chainDown')
const addPot = document.getElementById('potUp')
const remPot = document.getElementById('potDown')

//detects button presses
if(addArmor){
addArmor.addEventListener("click", incArmor)
}
if(remArmor){
remArmor.addEventListener("click", decArmor)
}

if(addChain){
addChain.addEventListener("click", incChain)
}
if(remChain){
remChain.addEventListener("click", decChain)
}

if(addPot){
addPot.addEventListener("click", incPot)
}
if(remPot){
remPot.addEventListener("click", decPot)
}

//checks to see if button exists on given page-prevents error
if(addSword){
addSword.addEventListener("click", incSword)
}
if(remSword){
remSword.addEventListener("click", decSword)
}
}

//cart counter
let amounts = document.querySelector('#amounts')
if(amounts){
  amounts.innerHTML=`<p style="margin-bottom: 16px; color:black;">x${items[0].amount}</p><br><p style="margin-bottom: 16px; color:black;">x${items[1].amount}</p><br><p style="margin-bottom: 16px; color:black;">x${items[2].amount}</p><br><p style="margin-bottom: 10px; color:black;">x${items[3].amount}</p>`
}
//total
let totals = document.querySelector('#totals')
if(totals){
  let sum = (items[0].amount*items[0].price)+(items[1].amount*items[1].price)+(items[2].amount*items[2].price)+(items[3].amount*items[3].price)
  let final = sum + (sum*0.1);
  totals.innerHTML=`<p style="margin-bottom: 16px; color:black;">Subtotal: $${sum}</p><p style="margin-bottom: 16px; color:black;">King's Tax: 10%</p><p style="margin-bottom: 16px; color:black;">Total: $${final}</p>`
}


//check out buttons
let checkButtons = document.querySelector('#checkOptions');
if(items[0].amount+items[1].amount+items[2].amount+items[3].amount > 0 && checkButtons){
  checkButtons.innerHTML=`<button id="delivery" class="cartButton"><strong>Delivery</strong></button><button id="payNow" class="cartButton"><strong>Pay Now</strong></button>`

  //establishes button functions
  const payButton= document.getElementById('payNow');
  payButton.addEventListener("click", pay)
  const deliverButton= document.getElementById('delivery');
  deliverButton.addEventListener("click", deliver)

  //happens when user presses pay
  async function pay(){
    //recalculate total cause "final" isnt global
    let finalPay = ((items[0].amount * items[0].price) + 
              (items[1].amount * items[1].price) + 
              (items[2].amount * items[2].price) + 
              (items[3].amount * items[3].price))*1.1;
    //round to 4 digits
    let roundPay = Number(finalPay.toPrecision(4));

    //asks user for confirmation
    let verify = confirm(`Pay $${roundPay}?`);

    if (verify !== null) {
      alert("Paid Successfully!");
      //waits for tracking process
      await trackOrder();
      //empties cart
      localStorage.setItem('swordAmount', 0);
      localStorage.setItem('armorAmount', 0);
      localStorage.setItem('chainAmount', 0);
      localStorage.setItem('potAmount', 0);
      //refreshes page
      location.reload()
    } 
  }

  async function deliver(){
    //asks user for address
    let address = prompt(`Delivery Address?`);

    if (address!==null){
      //recalculate total cause "final" isnt global
      let finalPay = ((items[0].amount * items[0].price) + 
              (items[1].amount * items[1].price) + 
              (items[2].amount * items[2].price) + 
              (items[3].amount * items[3].price))*1.1;
      //round to 4 digits
      let roundPay = Number(finalPay.toPrecision(4));
      let deliverFee = roundPay*0.05;
      let verifyDel = confirm(`Pay $${roundPay} + $${Number(deliverFee.toPrecision(4))} delivery fee?`);
      if (verifyDel==true){
        alert("Delivery scheduled!");
        //waits for tracking process
        await trackOrder();
        //empties cart
        localStorage.setItem('swordAmount', 0);
        localStorage.setItem('armorAmount', 0);
        localStorage.setItem('chainAmount', 0);
        localStorage.setItem('potAmount', 0);
        //refreshes page
        location.reload()
      }
    }
  }
}

//order tracking
const orderStatus=document.querySelector('#orderStatus');
const trackText=document.querySelector('#trackText');
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
if(checkButtons){
orderStatus.innerHTML=`<p style="color:rgb(0,255,0)">Awaiting Order</p>`
trackText.innerHTML=`<h3 style="color:black">Awaiting Order</h3>`
}
//tracks order
  async function trackOrder(){
  checkButtons.innerHTML=`<h3 style="color:black">Order Recieved.</h3><br><p style="color:black; margin-top:-20px;"><i>Track your order below</i></p>`
  orderStatus.innerHTML=`<p style="color:yellow">Processing Order</p>`
  trackText.innerHTML=`<h3 style="color:black">Processing Order...</h3>`
  await delay(5000);
  orderStatus.innerHTML=`<p style="color:aqua">Constructing Items</p>`
  trackText.innerHTML=`<h3 style="color:black">Constructing Items...</h3>`
  await delay(5000);
  orderStatus.innerHTML=`<p style="color:rgb(0,255,0)">Order Ready</p>`
  trackText.innerHTML=`<h3 style="color:rgb(0,200,0)"><i>Order Ready</i></h3>`
  alert('Order Ready!');
  //ensures cart emptied in case site refreshed prematurely
  localStorage.setItem('swordAmount', 0);
  localStorage.setItem('armorAmount', 0);
  localStorage.setItem('chainAmount', 0);
  localStorage.setItem('potAmount', 0);
  await delay(8000);
  orderStatus.innerHTML=`<p style="color:rgb(0,255,0)">Awaiting Order</p>`
  trackText.innerHTML=`<h3 style="color:black">Awaiting Order...</h3>`
}

//checks to see if cart is empty
let checkNada = document.querySelector('#nadaOptions');
let nadaSum = items[0].amount+items[1].amount+items[2].amount+items[3].amount
if(amounts&&!nadaSum> 0) {
    checkNada.innerHTML = `<h3 style="color:black">Nothing in Basket...</h3>`;
  }

refresh();