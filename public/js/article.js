var firebaseConfig = {
    apiKey: "AIzaSyBG5hHsXZ-4IBTRolWhznPIPVjl-7EZPh8",
    authDomain: "mybrand-61fba.firebaseapp.com",
    databaseURL: "https://mybrand-61fba.firebaseio.com",
    projectId: "mybrand-61fba",
    storageBucket: "mybrand-61fba.appspot.com",
    messagingSenderId: "971411413605",
    appId: "1:971411413605:web:e9ae0257c4238b9ef9448c",
    measurementId: "G-B9F4EYSBSS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();

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
                <p>posted on: ${doc.data().postedAt} by ${doc.data().postedBy}</p>
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