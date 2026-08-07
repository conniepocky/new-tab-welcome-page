const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const currentTime = new Date().toLocaleTimeString();
let clockIntervalId;

function updateClock() {
  const timeElement = document.querySelector("h1");

  if (timeElement) {
    timeElement.textContent = new Date().toLocaleTimeString();
  }
}

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  })
  .then((data) => {
      if (!data.url) throw new Error("Invalid API response: missing url field");
      
      let media;

      if (data.media_type === "image") {
          media = `<img id="galaxy" src="${data.url}"/>`;
      } else {
          media = `<video id="galaxy" src="${data.url}" controls></video>`;
      }

      document.querySelector("#app").innerHTML = `
          <div class="container">
            <section class="titles-container child">
              <div class="content">
                <h1>${currentTime}</h1>
                <h2>${data.title}</h2>
              </div>
            </section>
            <section class="media-container child">
              <div class="content">
                ${media}
                <p>${data.explanation}</p>
              </div>
            </section>
          </div>
      `;

      updateClock();
      clearInterval(clockIntervalId);
      clockIntervalId = setInterval(updateClock, 1000);
  })
  .catch((error) => {
    console.error(error);
    document.querySelector("#app").innerHTML = `<p>Error: ${error.message}</p>`;
  });

// cursor animation

window.addEventListener('mousemove', function(e) {
  var arr = [1, 0.9, 0.8, 0.5, 0.2]; 

  arr.forEach(function(i) {
    var x = (1 - i) * 75; // distance from cursor
    var star = document.createElement('div');

    star.className = 'star';
    star.style.top = e.pageY + Math.round(Math.random() * x - x / 2) + 'px'; 
    star.style.left = e.pageX + Math.round(Math.random() * x - x / 2) + 'px';

    document.body.appendChild(star);

    window.setTimeout(function() {
      document.body.removeChild(star);
    }, Math.round(Math.random() * i * 600));
  });
}, false);