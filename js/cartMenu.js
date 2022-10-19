// vars
let cartProductDivDom = document.querySelector('.carts-products div')
let badgeDom = document.querySelector('.badge');
let cartProductMenu = document.querySelector('.carts-products')

let shoppingCartIcon = document.querySelector(".shoppingCart")
// Openning Cart Menu
shoppingCartIcon.addEventListener('click',openCartMenu);


    // check if there's items in localstorage
    let addedItems=localStorage.getItem('productsInCart') ? 
    JSON.parse(localStorage.getItem('productsInCart')) 
    : [] ;
(function(){
    
    if(addedItems.length>0){
    addedItems.map((item) => {
        cartProductDivDom.innerHTML += `<p>${item.title} ${item.qty}</p>`
    })

    badgeDom.style.display="block";

    badgeDom.innerHTML = addedItems.length;
}

})()

// open cart menu function
function openCartMenu () {
    if(cartProductDivDom.innerHTML != "") {
        if(cartProductMenu.style.display == "block") {
            cartProductMenu.style.display="none";
        }
        else {
            cartProductMenu.style.display="block";
        }
    }

}