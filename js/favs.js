
let productsDom = document.querySelector(".products");
let noProductsDom = document.querySelector(".noProducts");

function drawFavProductsUI (allProducts=[]) {
    if(JSON.parse(localStorage.getItem("productsFav")).length ===0 ){
        noProductsDom.innerHTML="There's No Fav Items !!"
    }
    let products= JSON.parse(localStorage.getItem("productsFav")) || allProducts;

    let productsUI = products.map ( (item) => {
        return `
        <div class="product-item">
        <img src="./images/photo-1505740420928-5e560c06d30e.jpg" alt="headphone-image" class="product-item-img">
        <div class="product-item-desc">
            
            <h2>${item.title}</h2>
            <p>${item.desc}</p>
            <span> Size: Large </span> <br>
        </div>
        <div class="product-item-actions">
            <button class="add-to-card" id="addCard"  onclick="removeFromFav(${item.id})"> Remove From Favourite</button>
        </div>
    </div>
        `
    })
    productsDom.innerHTML = productsUI.join("");

}
drawFavProductsUI()

// removing fav
function removeFromFav(id) {
    let productEditDB=JSON.parse(localStorage.getItem("products"));
    productEditDB.forEach((p)=>{
        if(p.id === id)     {
        delete p.liked
        }
    })
    localStorage.setItem("products",JSON.stringify(productEditDB));
    // let returnedItems =productEditDB.filter((e)=> e.id===id)
    // localStorage.setItem("products",JSON.stringify(returnedItems));
    // console.log(removedLiked)
    let productsFav=localStorage.getItem("productsFav")
    if(productsFav){
        let items =JSON.parse(productsFav)
        let filteredItems= items.filter(item => item.id !== id);
        localStorage.setItem("productsFav",JSON.stringify(filteredItems));

        console.log(filteredItems)
        drawFavProductsUI(filteredItems)
        

    }
}