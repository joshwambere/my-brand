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


function addpost() {
    const form = document.getElementById('addPost');
    var title = document.getElementById('title');
    var cover = document.getElementById('cover');
    var content = document.getElementById('content');
    const titleError = document.getElementById('titleError');
    const coverError = document.getElementById('coverError');
    const contentError = document.getElementById('contentError');

    form.addEventListener('submit', (e) => {
        e.preventDefault();


        var errorMsgTitle = [];
        var errorMsgCover = [];
        var errorMsgContent = [];
        if (title.value === '' || title.value == null)
            errorMsgTitle.push('title is required');


        if (cover.value === '' || cover.value == null)
            errorMsgCover.push('cover photo is required');

        if (content.value === '' || content.value == null)
            errorMsgContent.push('please provide any content ');


        if (errorMsgTitle.length > 0 || errorMsgContent.length > 0 || errorMsgCover.length > 0) {
            e.preventDefault();
            titleError.innerHTML = errorMsgTitle;
            coverError.innerHTML = errorMsgCover;
            contentError.innerHTML = errorMsgContent;

        } else {
            var postedAt= firebase.firestore.Timestamp.fromDate(new Date()).toDate();
            console.log(postedAt);
            db.collection('posts').add({
                title: title.value,
                content: content.value,
                cover: cover.value,
                postedBy: "johnson",
                postedAt: postedAt
            });
            title.value='';
            content.value='';
            cover.value='';
            

        }
    })
}

addpost();