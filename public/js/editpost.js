const articleId = sessionStorage.getItem('data-id');




db.collection('posts').where(firebase.firestore.FieldPath.documentId(articleId), '==', articleId).get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        edit(doc);
    });
})




function edit(doc){
        const title=document.getElementById('title');
        const cover=document.getElementById('cover');
        const content=document.getElementById('content');
        title.value=doc.data().title;
        cover.value=doc.data().cover;
        content.value=doc.data().content;

        const form = document.getElementById('addPost');
  
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
                db.collection('posts').where(firebase.firestore.FieldPath.documentId(articleId), '==', articleId).update({
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



