let products = JSON.parse(localStorage.getItem("products")) || productsDB;
let productId = JSON.parse(localStorage.getItem('productDetails'));
let productDetails = products.find((item) => item.id === productId)
let itemDom = document.querySelector('.item-details');


itemDom.innerHTML= `


<img src="${productDetails.imageUrl}" alt="product-img"/>
<h2>${productDetails.title}</h2> 
<p>${productDetails.desc}</p>
<span>Size: ${productDetails.size}</span> <br>
<span>Quantity: ${productDetails.qty}</span>
<br>
<button class="edit-product" onclick="editProduct(${productId})">Edit Product </button>



`
function editProduct(id) {
    localStorage.setItem("editProduct",id)
    window.location="editProduct.html"
   }