document.addEventListener('DOMContentLoaded', () =>{
    if (window.location.pathname.includes("Page2.html")){
        loadPage2();
    }
});

document.addEventListener('DOMContentLoaded', () =>{
    if (window.location.pathname.includes("Page3.html")){
        setInterval(loadWeather(), 300000);
    }
});

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
    let container = document.getElementById("p2content");

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

function loadWeather() {
    const locations = [
        {name: "New York", latitude: 40.7143, longitude: -74.0060},
        {name: 'Oslo',     latitude: 59.9127, longitude: 10.7461},
        {name: 'London',   latitude: 51.5085, longitude: -0.1257},
        {name: 'Tokyo',    latitude: 35.6895, longitude: 139.6917},
        {name: 'Beijing',  latitude: 39.9075, longitude: 116.3972},
        {name: 'Paris',    latitude: 48.8534, longitude: 2.3488}
    ];

    const content = document.getElementById("p3content");
    content.innerHTML = '';

    locations.forEach(location => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error with the status: " + response.status);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const weatherBox = document.createElement('div');
            weatherBox.classList.add('weatherBox');

            const current = data.current_weather;
            weatherBox.innerHTML = `
                <h2>${location.name}</h2>
                <p>Temperature: ${current.temperature} °C</p>
                <p>Wind speed: ${current.windspeed} km/h</p> 
            `;
            content.appendChild(weatherBox);
        })
    })
}
