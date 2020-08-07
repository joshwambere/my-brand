/**
 * import firebase config file
*/
import {db}from './config.js';


const postId=sessionStorage.getItem('data-id');
console.log(postId);
function addpost() {
    if(postId!=null){
        console.log('CANT WORK')
    }else{
        console.log('joshnn')
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
                }).catch(function(error) {
                    console.log("Error adding document:", error);
                });
                title.value='';
                content.value='';
                cover.value='';
                

            }
        })
    }
}

addpost();