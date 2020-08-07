/**
 * import firebase config file
*/
import {db}from './config.js';


const card = document.getElementById('blogHolder');



function renderPost(doc) {
    function shorten(str, maxLen, separator = ' ') {
        if (str.length <= maxLen) return str;
        return str.substr(0, str.lastIndexOf(separator, maxLen));
    };

    var blogContentShort = shorten(doc.data().content, 180, ' ');
    card.innerHTML += `
    <a href="showPostAdmin.html">
    <div class="jd-blog-card-admin" data-id="${doc.id}" >

        <div class="jd-blog-banner"
            style="background: url(${doc.data().cover}); background-size: cover;">

        </div>
        <div class="jd-blog-header">
            <h2>
                ${doc.data().title}
            </h2>
        </div>
        <div class="jd-blog-content">
            <p>
            ${blogContentShort}
            </p>
            <a href="show.html">Read more...</a>
        </div>
    </div>
</a>
        `
    setId();

}


db.collection('posts').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderPost(doc);
    });
})

const addnew=document.getElementById('addPost');
addnew.addEventListener('click', (e)=>{
    sessionStorage.removeItem('data-id');
})
const cards = document.getElementsByClassName('jd-blog-card-admin');

function setId() {

    for (const mycard of cards) {
        mycard.addEventListener('click', (e) => {
            e.preventDefault();
            const id = mycard.getAttribute('data-id');
            sessionStorage.setItem('data-id', id);
            window.location.href = '../../app/html/showPostAdmin.html', true;
        })
    }
}
window.addEventListener('load', () => {

    setId();
})