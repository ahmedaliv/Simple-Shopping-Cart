
let productsDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".noProducts");

function drawCartProductsUI (allProducts=[]) {
    if(JSON.parse(localStorage.getItem("productsInCart")).length ===0 ){
        noProductsDom.innerHTML="There's No Items !!"
    }
    let products= JSON.parse(localStorage.getItem("productsInCart")) || allProducts;

    let productsUI = products.map ( (item) => {
        return `
        <div class="product-item">
        <img src="./images/photo-1505740420928-5e560c06d30e.jpg" alt="headphone-image" class="product-item-img">
        <div class="product-item-desc">
            
            <h2>Headphone Item</h2>
            <p>${item.desc}</p>
            <span> Size: Large </span> <br>
            <span> Quantity: ${item.qty}</span>
        </div>
        <div class="product-item-actions">
            <button class="add-to-card" id="addCard"  onclick="removeItemFromCart(${item.id})"> Remove From Card</button>
        </div>
    </div>
        `
    })
    productsDom.innerHTML = productsUI.join("");

}
drawCartProductsUI()
function removeItemFromCart(id) {
    let productsInCart=localStorage.getItem("productsInCart")
    if(productsInCart){
        let items =JSON.parse(productsInCart)
        let filteredItems= items.filter(item => item.id !== id);
        localStorage.setItem("productsInCart",JSON.stringify(filteredItems));
        drawCartProductsUI(filteredItems)
        cartProductDivDom.innerHTML="";

        filteredItems.forEach(i => {
            cartProductDivDom.innerHTML += `<p>${i.title} <span class="i-qty">${i.qty}</span></p>`

        })
        let cartItems = document.querySelectorAll(".carts-products div p")
        if(cartItems.length===0){
            badgeDom.style.display="none";

        }else
        badgeDom.innerHTML = cartItems.length;
    
    }

}