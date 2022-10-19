
// Get data from localstorage 
let get_user =localStorage.getItem("username");
let get_email =localStorage.getItem("email");
let products=JSON.parse(localStorage.getItem("products")) ||productsDB;
let myProducts=products.filter(item => item.isMe);


// variables 
let userDom_2 =document.getElementById("username");
let userEmailDom =document.getElementById("email");
let productsLength=document.querySelector("#products-length span");
userDom_2.innerHTML=get_user;
userEmailDom.innerHTML=get_email;

if(myProducts.length != 0 ){
    productsLength.innerHTML=myProducts.length;
}else {
    productsLength.remove();
}