const humburgerIcn=document.getElementById('humburger');
const dropMenu=document.getElementById('JdMenu');

function toggleHumburger(){
    humburgerIcn.classList.toggle('active');
    dropMenu.classList.toggle('jdNavMenuHumburger');
}
humburgerIcn.addEventListener('click',toggleHumburger);

//on click humbergure click

