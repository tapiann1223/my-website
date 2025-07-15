document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const comment = document.getElementById('comment').value;

    const commentId = Date.now(); // ユニークなIDを生成

    addCommentToDOM({ id: commentId, username, comment });
    saveComment({ id: commentId, username, comment });

    document.getElementById('commentForm').reset();
});

document.getElementById('newsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('newsTitle').value;
    const content = document.getElementById('newsContent').value;

    const newsId = Date.now(); // ユニークなIDを生成

    addNewsToDOM({ id: newsId, title, content });
    saveNews({ id: newsId, title, content });

    document.getElementById('newsForm').reset();
});

function saveComment(comment) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
}

function saveNews(news) {
    let newsList = JSON.parse(localStorage.getItem('news')) || [];
    newsList.push(news);
    localStorage.setItem('news', JSON.stringify(newsList));
}

function loadComments() {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(addCommentToDOM);
}

function loadNews() {
    const newsList = JSON.parse(localStorage.getItem('news')) || [];
    newsList.forEach(addNewsToDOM);
}

function addCommentToDOM(comment) {
    const commentSection = document.getElementById('commentList');
    const newComment = document.createElement('div');
    newComment.setAttribute('data-id', comment.id);
    newComment.innerHTML = `<strong>${comment.username}</strong>: <p>${comment.comment}</p> <button onclick="deleteComment(${comment.id})">削除</button>`;
    commentSection.appendChild(newComment);
}

function addNewsToDOM(news) {
    const newsSection = document.getElementById('newsList');
    const newNews = document.createElement('div');
    newNews.setAttribute('data-id', news.id);
    newNews.innerHTML = `<h3 onclick="showNewsDetail(${news.id})">${news.title}</h3> <button onclick="deleteNews(${news.id})">削除</button>`;
    newsSection.appendChild(newNews);
}

function deleteComment(id) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments = comments.filter(comment => comment.id !== id);
    localStorage.setItem('comments', JSON.stringify(comments));

    const commentSection = document.getElementById('commentList');
    const commentToDelete = commentSection.querySelector(`[data-id="${id}"]`);
    commentSection.removeChild(commentToDelete);
}

function deleteNews(id) {
    let newsList = JSON.parse(localStorage.getItem('news')) || [];
    newsList = newsList.filter(news => news.id !== id);
    localStorage.setItem('news', JSON.stringify(newsList));

    const newsSection = document.getElementById('newsList');
    const newsToDelete = newsSection.querySelector(`[data-id="${id}"]`);
    newsSection.removeChild(newsToDelete);
}

function showNewsDetail(id) {
    const newsList = JSON.parse(localStorage.getItem('news')) || [];
    const news = newsList.find(news => news.id === id);

    if (news) {
        document.getElementById('newsDetailTitle').innerText = news.title;
        document.getElementById('newsDetailContent').innerHTML = convertNewlinesToBreaks(news.content);

        document.getElementById('newsList').classList.add('hidden');
        document.getElementById('newsDetail').classList.remove('hidden');

        // 削除ボタンにIDを設定
        document.getElementById('deleteNewsDetail').setAttribute('data-id', id);
    }
}

function hideNewsDetail() {
    document.getElementById('newsDetail').classList.add('hidden');
    document.getElementById('newsList').classList.remove('hidden');
}

document.getElementById('closeNewsDetail').addEventListener('click', hideNewsDetail);

document.getElementById('deleteNewsDetail').addEventListener('click', function() {
    const id = parseInt(this.getAttribute('data-id'));
    deleteNews(id);
    hideNewsDetail();
});

function convertNewlinesToBreaks(text) {
    return text.replace(/\n/g, '<br>');
}

document.addEventListener('DOMContentLoaded', () => {
    loadComments();
    loadNews();
});
