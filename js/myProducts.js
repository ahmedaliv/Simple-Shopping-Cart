let products=JSON.parse(localStorage.getItem("products")) || productsDB;


let productsDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".noProducts");


let drawMyProductsUI;
(drawMyProductsUI =function  (products= []) {
    let myProducts= products.filter(item => item.isMe);
    if(myProducts.length > 0){

    let productsUI = myProducts.map ( (item) => {
         
    return `
    <div class="product-item" style="border:${item.isMe ? '2px solid green': '' }">
    <img src=${item.imageUrl} alt="headphone-image" class="product-item-img">
    <div class="product-item-desc">
        
        <a onclick='saveItemData(${item.id})'>${item.title}</a>
        <p>${item.desc}</p>
        <span> Size: ${item.size} </span>

         <button class="edit-product" onclick="editProduct(${item.id}">Edit Product </button>
            <br>
         <button class="delete-product" onclick="deleteProduct(${item.id}">Delete Product </button>
    </div>

</div>
`

})

productsDom.innerHTML = productsUI.join("");
}
else {
    
    noProductsDom.innerHTML="No Products"
}
})(JSON.parse(localStorage.getItem('products')) || productsDB);


//Edit Product
function editProduct(id) {
    localStorage.setItem("editProduct",id);
    window.location="editProduct.html"  ;
   }

// Delete Product 

function deleteProduct(id){
    let products=JSON.parse(localStorage.getItem("products")) || productsDB;
    let myProducts=products.filter(item => item.isMe);
    let filtered=myProducts.filter(i=>i.id !==id);
    drawMyProductsUI(filtered);
    localStorage.setItem("products",JSON.stringify(products));
}