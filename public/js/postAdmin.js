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
const db=firebase.firestore();

const card = document.getElementById('blogHolder');


function renderPost(doc) {





    card.setAttribute('data-id', doc.id)
    card.innerHTML += `
    <a href="showPostAdmin.html">
    <div class="jd-blog-card-admin">

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
            ${doc.data().content}
            </p>
            <a href="show.html">Read more...</a>
        </div>
    </div>
</a>
        `
        console.log(doc.data().content);

}


db.collection('posts').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderPost(doc);
    });
})


