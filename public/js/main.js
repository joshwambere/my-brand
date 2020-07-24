
const humburgerIcn=document.getElementById('humburger');
const dropMenu=document.getElementById('JdMenu');

function toggleHumburger(){
    humburgerIcn.classList.toggle('active');
    dropMenu.classList.toggle('active');
}
humburgerIcn.addEventListener('click',toggleHumburger);

//on click humbergure click
//validate the form
const loginBtn=document.getElementById('login');
console.log(loginBtn);
var form=document.forms.myForm;
form.onsubmit=function (){
    var username =document.getElementById('username').value;
    var pwd=document.getElementById('pwd').value;
    if(username=='johnson' && pwd=='okayfine'){
        console.log('yes');
        window.location.href ='../../app/html/admin.html';
    }
}