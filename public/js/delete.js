/**
 * import firebase config file
*/
import {db}from './config.js';

const articleId = sessionStorage.getItem('data-id');

db.collection('posts').where(firebase.firestore.FieldPath.documentId(articleId), '==', articleId).get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        deleteArticle(doc);
    });
})

function deleteArticle(){
    db.collection('posts').doc(articleId).delete();
    
 }