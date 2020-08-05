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

const card = document.getElementById('blogHolder');



function renderPost(doc) {
    function shorten(str, maxLen, separator = ' ') {
        if (str.length <= maxLen) return str;
        return str.substr(0, str.lastIndexOf(separator, maxLen));
    };

    var blogContentShort = shorten(doc.data().content, 180, separator = ' ');
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



db.collection('posts').orderBy('postedAt').onSnapshot(snap =>{
    let changes=snap.docChanges();
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