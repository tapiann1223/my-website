document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const comment = document.getElementById('comment').value;

    const commentId = Date.now(); // ユニークなIDを生成

    addCommentToDOM({ id: commentId, username, comment });
    saveComment({ id: commentId, username, comment });

    document.getElementById('commentForm').reset();
});

function saveComment(comment) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(addCommentToDOM);
}

function addCommentToDOM(comment) {
    const commentSection = document.getElementById('commentList');
    const newComment = document.createElement('div');
    newComment.setAttribute('data-id', comment.id);
    newComment.innerHTML = `<strong>${comment.username}:</strong> <p>${comment.comment}</p> <button onclick="deleteComment(${comment.id})">削除</button>`;
    commentSection.appendChild(newComment);
}

function deleteComment(id) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments = comments.filter(comment => comment.id !== id);
    localStorage.setItem('comments', JSON.stringify(comments));

    const commentSection = document.getElementById('commentList');
    const commentToDelete = commentSection.querySelector(`[data-id="${id}"]`);
    commentSection.removeChild(commentToDelete);
}

document.addEventListener('DOMContentLoaded', loadComments);
