let orderItems = [];
function addItem(name, price){
  orderItems.push({name, price});
  updateOrder();
  document.getElementById("order").scrollIntoView({behavior:"smooth"});
}
function updateOrder(){
  const itemBox = document.getElementById("items");
  const quantity = Number(document.getElementById("quantity").value) || 1;
  itemBox.value = orderItems.map((item,i)=>
    (i+1)+". "+item.name+" - ₹"+item.price).join("\n");
  const subtotal = orderItems.reduce((sum,item)=>sum+item.price,0);
  document.getElementById("total").textContent = subtotal * quantity;
}
document.getElementById("quantity").addEventListener("input", updateOrder);
document.getElementById("orderForm").addEventListener("submit", function(e){
  e.preventDefault();
  const name=document.getElementById("customerName").value.trim();
  const phone=document.getElementById("phone").value.trim();
  const address=document.getElementById("address").value.trim();
  const message=document.getElementById("message");
  if(!name || !phone || !address || orderItems.length===0){
    message.textContent="Please complete all fields and add at least one item.";
    return;
  }
  if(!/^\d{10}$/.test(phone)){
    message.textContent="Please enter a valid 10-digit phone number.";
    return;
  }
  message.textContent="Order confirmed! Thank you, "+name+". Your total is ₹"+document.getElementById("total").textContent+".";
  message.style.color="green";
});
