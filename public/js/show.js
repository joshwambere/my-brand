function commentValidation() {
  
    const textArea = document.getElementById('comment-text');
    const nameInput = document.getElementById('name-coments');
    const emailInput = document.getElementById('email-comments');
    const commentTextError = document.getElementById('comment-text-error');
    const nameComentsError = document.getElementById('name-coments-error');
    const emailCommentsError = document.getElementById('email-comments-error');
    const formComment = document.getElementById('commentForm');

    formComment.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        
        var errorMsg = [];
        if (textArea.value === '' || textArea == null) {
            errorMsg.push('please enter any comment');
            console.log('yes');
        } 
        if (nameInput.value === '' || nameInput.value == null) {
            errorMsg.push('please provide your name');
        } 
        if (emailInput.value === '' || emailInput.value == null) {
            errorMsg.push('please provide your email');
        }

        if (errorMsg.length > 0) {
            e.preventDefault();
            commentTextError.innerHTML = errorMsg[0];
            nameComentsError.innerHTML = errorMsg[1];
            emailCommentsError.innerHTML = errorMsg[2];

        }
    })
}
commentValidation();