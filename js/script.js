


// Define Products

let productsDom = document.querySelector(".products");
let products= productsDB


// Display Products IIF
let drawProductsUI;
(drawProductsUI =function  (products= []) {

let productsUI = products.map ( (item) => {
     const isMine=item.isMe;
     const editBtn='<button class="edit-product" onclick="editProduct(' +item.id +')">Edit Product </button>'
    return `
    <div class="product-item" style="border:${item.isMe ? '2px solid green': '' }">
    <img src=${item.imageUrl} alt="headphone-image" class="product-item-img">
    <div class="product-item-desc">
        
        <a onclick='saveItemData(${item.id})'>${item.title}</a>
        <p>${item.desc}</p>
        <span> Size: ${item.size} </span>

        ${isMine ? editBtn : '' }
    </div>
    <div class="product-item-actions">
        <button class="add-to-card" id="addCard"  onclick="addedToCard(${item.id})"> Add To Card</button>
        <i class="fav far fa-heart" style="color:${item.liked === true ? "red" : ""}"  onclick="addToFav(${item.id})"></i>
    </div>
</div>
    `
})
productsDom.innerHTML = productsUI.join("");
})(JSON.parse(localStorage.getItem('products')) || products);




// add to cart

function addedToCard (id) {

    if(localStorage.getItem("username")) {
        let products=JSON.parse(localStorage.getItem("products")) || productsDB;
        let product=products.find((item) => item.id === id ) // find instead of filter , to get the item not an array
        let isProductInCart=addedItems.some(i => i.id ===product.id)
        
        if(isProductInCart){
            addedItems = addedItems.map(p => {
                if(p.id === product.id) p.qty++;
                return p;
            })
        }
        else {
            addedItems.push(product);
        }


        cartProductDivDom.innerHTML="";

        addedItems.forEach(i => {
            cartProductDivDom.innerHTML += `<p>${i.title} <span class="i-qty">${i.qty}</span></p>`

        })
    
  

        // Save Data
        localStorage.setItem("productsInCart" , JSON.stringify(addedItems));
    // Add Counter of Items
        let cartItems = document.querySelectorAll(".carts-products div p")
    
        badgeDom.style.display="block";
        badgeDom.innerHTML = cartItems.length;
    }
    else {
        window.location="login.html"
    }

    
}

/// make the array unique 

function getUniqueArr(arr,filterType){
    let unique = arr 
    .map((item)=> item[filterType])
    .map((item,i,final)=> final.indexOf(item) === i && i)
    .filter (item => arr[item])
    .map(item => arr[item]) 


    return unique;

}







function saveItemData(id) {
    
localStorage.setItem('productDetails', id);
window.location="cardDetails.html"; 
}




// search function

let input = document.getElementById("search")



input.addEventListener('keyup',function(e) {
    
        search(e.target.value ,   JSON.parse(localStorage.getItem("products")))
    
    if(e.target.value.trim()==="")
        drawProductsUI(JSON.parse(localStorage.getItem('products')))
})


function search(title,myArray){
let arr = myArray.filter((item)=> item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1)
drawProductsUI(arr); 
}



// add to Fav
let favItems=localStorage.getItem('productsFav') ? 
JSON.parse(localStorage.getItem('productsFav')) 
: [] ;

function addToFav (id) {

    
    if(localStorage.getItem("username")) {
      
        let chossenItem=products.find(item => item.id === id ) // find instead of filter , to get the item not an array
        if(chossenItem.liked){
            let productEditDB=JSON.parse(localStorage.getItem("products")) || products;
            productEditDB.forEach((p)=>{
                if((p.id === id) && (p.liked === true)) {
                    removeFromFav(p.id);
                    console.log("after deleting")
                }
            })
        }
        else{
            chossenItem.liked= true;
                favItems=[...favItems , chossenItem]
            let uniqueProducts = getUniqueArr(favItems,"id");
            localStorage.setItem("productsFav" , JSON.stringify(uniqueProducts));
            let alreadyFav = JSON.parse(localStorage.getItem('products')) || products
            
            alreadyFav.map((item) => {
            if(item.id === chossenItem.id){
                item.liked=true;
            }
            })
            localStorage.setItem('products',JSON.stringify(alreadyFav))
            drawProductsUI(alreadyFav)     
    }}
    else {
        window.location="login.html"
    }

    
}



// removing fav [edited for main page]
function removeFromFav(id) {
    console.log("removing")
    let productEditDB=JSON.parse(localStorage.getItem("products")) || products;
    productEditDB.forEach((p)=>{
        if(p.id === id) {
            delete p.liked;
            console.log(p);
        }
    })
    
    localStorage.setItem("products",JSON.stringify(productEditDB));
        drawProductsUI(productEditDB)
    // let returnedItems =productEditDB.filter((e)=> e.id===id)
    // localStorage.setItem("products",JSON.stringify(returnedItems));
    // console.log(removedLiked)
    let productsFav=localStorage.getItem("productsFav")
    if(productsFav){
        let items =JSON.parse(productsFav)
        let filteredItems= items.filter(item => item.id !== id);
        localStorage.setItem("productsFav",JSON.stringify(filteredItems));

    }
}

// Filter Products By Size



let sizeFilter = document.getElementById("size-filter");

sizeFilter.addEventListener('change', getProductsFilteredBySize );


function getProductsFilteredBySize(e){
let val= e.target.value;
let products = JSON.parse(localStorage.getItem("products")) || products;

if(val==="all"){
    drawProductsUI(products);
}
else{
    products=products.filter(i => i.size ===val);
    drawProductsUI(products)
}

}

///

function editProduct(id) {
 localStorage.setItem("editProduct",id);
 window.location="editProduct.html"  ;
}


// lang edits
let en = document.getElementById("en_lang")
let ar = document.getElementById("ar_lang")

en.addEventListener('click',()=>{changeDir("ltr")
changeElements();
})
ar.addEventListener('click',()=>{changeDir("rtl")
changeElements();
})

function changeDir (dir) {
    document.documentElement.setAttribute("dir",dir);
    localStorage.setItem("langDir",dir); 
}


//  edit lang in some elements 
// elements in vars
let navFavs= document.querySelector("#favs a");
let navProds= document.querySelector("#prods a");
let navLogout= document.querySelector("#logout a");
let addBtns= document.querySelectorAll(".add-to-card");
let viewAll= document.querySelector("#view-all");


//function to change
function changeElements() {
    
if(localStorage.getItem("langDir") == "rtl"){
    input.setAttribute("placeholder","بحث")
    navFavs.innerHTML="المفضلات"
    navProds.innerHTML="منتجاتي"
    navLogout.innerHTML="تسجيل الخروج"
    viewAll.innerHTML="اظهار جميع المنتجات"
    addBtns.forEach((i)=>i.innerHTML="اضافة الى العربة")
    
}else if (localStorage.getItem("langDir") == "ltr"){
    input.setAttribute("placeholder","Search")
    navFavs.innerHTML="Favorites"
    navProds.innerHTML="My Products"
    navLogout.innerHTML="Logout"
    viewAll.innerHTML="View All Products"
    addBtns.forEach((i)=>i.innerHTML="Add To Card")


}
}