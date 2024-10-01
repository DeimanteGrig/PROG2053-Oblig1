document.addEventListener('DOMContentLoaded', loadPage2());

function loadPage2() {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => {
        if (!response.ok) {
            throw new Error("Error with the status: " + response.status);
        }
        return response.json();
    })
    .then((posts) => {
        let i = 0;

        i = loadUntilScrollable(posts, i);

        window.addEventListener('scroll', () => {
            if (scrolledDown() && i < 100) {
                i = loadPosts(posts, i);
            }
        })
    })
}

function loadPosts(posts, i) {
    let container = document.getElementById("content");

    let end = Math.min(i+3, 100);

    for (let j = i; j < end; j++) {
        const article = document.createElement("article");
        const userId = document.createElement("h3");
        userId.textContent = "ID: " + posts[j].userId;
        const id = document.createElement("h3");
        id.textContent = "Post nr. " + posts[j].id;
        const title = document.createElement("h1");
        title.textContent = posts[j].title;
        const body = document.createElement("p");
        body.textContent = posts[j].body;
        
        article.appendChild(userId);
        article.appendChild(id);
        article.appendChild(title);
        article.appendChild(body);
        container.appendChild(article);
    }
    i = end;
    return i; 
}

function scrolledDown() {
    return window.innerHeight + window.scrollY >= document.body.scrollHeight;
}

function loadUntilScrollable(posts, i) {
    while (i < 100 && document.body.scrollHeight <= window.innerHeight) {
        i = loadPosts(posts, i); 
    }
    return i; 
}