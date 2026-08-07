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
              <h1>${currentTime}</h1>
              <h2>${data.title}</h2>
            </section>
            <section class="media-container child">
              ${media}
              <p>${data.explanation}</p>
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
