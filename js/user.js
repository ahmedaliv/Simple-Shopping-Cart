let userInfo = document.querySelector("#user_info");
let userDom = document.querySelector("#user");
let links = document.querySelector("#links");
let logOut = document.querySelector("#logout");


if(localStorage.getItem("username",)){
links.remove()
userInfo.style.display="flex";
userDom.innerHTML=localStorage.getItem("username")

}



logOut.addEventListener('click' , (e)=> {
    localStorage.clear();
    
    setTimeout( e=>  window.location='register.html'
    ,1500)
})

