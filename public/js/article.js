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
                <p>posted on: ${doc.data().postedAt.toDate()} by ${doc.data().postedBy}</p>
            </div>
            <div class="jd-blog-content show-content">
                <p>
                    ${doc.data().content}  
                </p>
                
            </div>
        `


}

db.collection('posts').where(firebase.firestore.FieldPath.documentId(id), '==', id).get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        viewPost(doc);
    });
})