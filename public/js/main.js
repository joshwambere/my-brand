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

    }
})

//validate signup

const RegisterPwd = document.getElementById('pwd');
const confirmPwd = document.getElementById('rePwd')
const registerpwdError = document.getElementById('PwdError')
const confirmPwdError = document.getElementById('rePwdError')
const registerForm = document.getElementById('myForm');

registerForm.addEventListener('submit', (e) => {
    var messageConfirmPwd = [];
    var messagePwd = [];
    if (RegisterPwd.value === '' || RegisterPwd.value == null) {
        messagePwd.push('password is required');
    } else {
        if (RegisterPwd.value.length < 6) {
            messagePwd.push('password must be 6 char long');
        } else {
            if (confirmPwd.value != RegisterPwd.value) {
                messageConfirmPwd.push("Password doesn't match");
            }
        }
    }


    if (messageConfirmPwd.length > 0 || messagePwd.length > 0) {
        e.preventDefault();
        confirmPwdError.innerHTML = messageConfirmPwd;
        registerpwdError.innerHTML = messagePwd;

    }
})