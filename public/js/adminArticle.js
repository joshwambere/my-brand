/**
 * import firebase config file
*/
import {db}from './config.js';


const id = sessionStorage.getItem('data-id');
const showCard = document.getElementById('show-card')


function viewPost(doc) {

    showCard.innerHTML += `
        <div class="jd-blog-show-banner" style="background: url(${doc.data().cover}); background-size: cover;">

        </div>
        <div class="jd-blog-header">
            <h2 class="title-show">
            ${doc.data().title}
            </h2>
        </div>
        <div class="jd-blog-desc">
            <p>posted on: ${doc.data().postedAt.toDate()} by Johnson</p>
        </div>
        <div class="jd-blog-content show-content">
            <p>
            ${doc.data().content}
            </p>

        </div>
        `


}
let docHolder;
db.collection('posts').where(firebase.firestore.FieldPath.documentId(id), '==', id).onSnapshot(snap =>{
    let changes=snap.docChanges();
    changes.forEach(change =>{
        if(change.type=='added'){
            viewPost(change.doc);
        }
        
        edit(change.doc);
        
        
    })
})

const editblog=document.getElementById('edit');

function edit(doc){
        editblog.addEventListener('click',(e)=>{
        e.preventDefault();
        window.location.href = '../../app/html/AddPost.html', true;
        sessionStorage=doc.id;
    })

}

const deleteBlog=document.getElementById('delete');

    deleteBlog.addEventListener('click',(e)=>{
        e.preventDefault();
        console.log('johnson')
        db.collection('posts').doc(id).delete();  
    })