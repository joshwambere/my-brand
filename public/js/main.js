const humburgerIcn = document.getElementById('humburger');
const dropMenu = document.getElementById('JdMenu');

function toggleHumburger() {
    humburgerIcn.classList.toggle('active');
    dropMenu.classList.toggle('active');
}
humburgerIcn.addEventListener('click', toggleHumburger);


//validate the login form
const name = document.getElementById('username');
const pwd = document.getElementById('pwd');
const form = document.getElementById('myForm')
const userError = document.getElementById('UsernameError')
const pwdError = document.getElementById('PwdError')
form.addEventListener('submit', (e) => {
    e.preventDefault();
    var messageUser = [];
    var messagepwd = [];
    if (name.value === '' || name == null) {
        messageUser.push('username is required');
    }

    if (pwd.value === '' || pwd.value == null) {
        messagepwd.push('password is required');
    } else {
        if (pwd.value.length < 6) {
            messagepwd.push('password must be 6 char long');
        }
    }

    if (messageUser.length > 0 || messagepwd.length > 0) {
        e.preventDefault();
        userError.innerHTML = messageUser;
        pwdError.innerHTML = messagepwd;

    }else{
        window.location.href='../../app/html/admin.html', true;
        
    }
})