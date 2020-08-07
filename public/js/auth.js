/**
 * import firebase config file
*/
import {db,auth}from './config.js';

const name = document.getElementById('username');
    const pwd = document.getElementById('pwd');
    const form = document.getElementById('myForm');
    const userError = document.getElementById('UsernameError');
    const pwdError = document.getElementById('PwdError');
    const finlErr=document.getElementById('finalError');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        var messageUser = [];
        var messagepwd = [];
        var finalError=[];
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

        } else {
            
            auth.signInWithEmailAndPassword(name.value,pwd.value).then(cred=>{
                window.location.href='../../app/html/admin.html';
            }).catch(function(error) {
                console.log("Error getting document:", error);
                finalError.push('incorrect email or password try again');
                finlErr.innerHTML=finalError;
            });
        }
    })