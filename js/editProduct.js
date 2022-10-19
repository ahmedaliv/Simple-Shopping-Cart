let products=JSON.parse(localStorage.getItem("products")) || productsDB;
let productId = JSON.parse(localStorage.getItem("editProduct"));
let getProduct=products.find(i=> i.id ===productId);

// // variables

let productName = document.getElementById("product-name")
let productDesc = document.getElementById("product-desc")
let productSizeSelect = document.getElementById("product-size")
let updateForm = document.getElementById("update-form")
let inputFile = document.getElementById("upload-image-file")

let productImage;
let productSizeValue;

productName.value=getProduct.title;

productDesc.value=getProduct.desc;

productSizeSelect.value=getProduct.size;

productImage=getProduct.imageUrl;
// // Events
productSizeSelect.addEventListener('change',getProductSizeValue)
updateForm.addEventListener('submit',updateProductForm)
inputFile.addEventListener('change', uploadImage)



// // Functions
function getProductSizeValue(e) {
    productSizeValue = e.target.value;
}

function updateProductForm (e) {
    e.preventDefault();


    getProduct.title=productName.value;
    getProduct.desc=productDesc.value;
    getProduct.size=productSizeSelect.value;
    getProduct.imageUrl=productImage;

        localStorage.setItem("products",JSON.stringify(products))
    setTimeout(()=> window.location="index.html")

    //     let allProducts=JSON.parse(localStorage.getItem('products')) || productsDB
//     let nameValue=productName.value;
//     let descValue=productDesc.value;
//    if(nameValue && descValue) {
//     let obj = {
//         id: (allProducts)  ? allProducts.length + 1 :  1,
//         qty:1,
//         imageUrl:productImage,
//         size:productSizeValue,
//         title:nameValue,
//         desc:descValue,
//         isMe:true
         
        
//     }
//     let newProducts = allProducts ? [...allProducts, obj] : [obj];
//     localStorage.setItem("products",JSON.stringify(newProducts))

//     productName.value="";
//     productDesc.value="";
//     productSizeSelect.value="";

//     setTimeout(()=>{
//         window.location="index.html"
//     },500)
//    } else {
//     alert("Enter Data ...")
//    }
}

// uploadImage

function uploadImage(){
    let file =this.files[0];
    const types = ["image/jpeg","image/png"]
    if(types.indexOf(file.type) === -1 ){
        alert("Type Not Supported")
        return;
    }
    if(!(file.size > 2 * 1024 )){
        alert("Size is too large")
        return;
    }

    getImageBase64(file);

}


function getImageBase64(file) {

    let reader = new FileReader();

    reader.readAsDataURL(file);
    
    reader.onload=function (){
        productImage=reader.result;
        console.log(productImage)
        // console.log(reader.result);
    }
    reader.onerror=function(){
        alert("Error ");
    }
}