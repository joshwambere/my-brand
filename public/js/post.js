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
        <a class="blog-card-cl-card">
        <div class="jd-blog-card" data-id="${doc.id}">

            <div class="jd-blog-banner" style="background: url(${doc.data().cover}); background-size: cover;" id="banner">

            </div>
            <div class="jd-blog-header">
                <h2 id="title">
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



db.collection('posts').onSnapshot(snap =>{
    let changes=snap.docChanges();
    pagination(changes);
    changes.forEach(change =>{
        if(change.type=='added'){
            
            renderPost(change.doc)
        }
    })
})


const cards = document.getElementsByClassName('jd-blog-card');

function setId() {

    for (const mycard of cards) {
        mycard.addEventListener('click', (e) => {
            e.preventDefault();
            const id = mycard.getAttribute('data-id');
            sessionStorage.setItem('data-id', id);
            window.location.href = '../../app/html/show.html', true;
        })
    }
}
window.addEventListener('load', () => {

    setId();
})

const prev=document.getElementById('prev');
const next=document.getElementById('next');
function pagination(doc){
    let list=doc;
    let page=null;
    for(let i=0; i<page+6; i++){
        
    }
}
