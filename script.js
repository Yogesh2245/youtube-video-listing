const videoContainer = document.getElementById("videos");
const searchBar = document.getElementById("search-bar");

const apiEndpoint = `https://api.freeapi.app/api/v1/public/youtube/videos`;

let videoData;

fetch(apiEndpoint)
  .then((res) => res.json())
  .then((result) => {
    
    // Checking data is retrived or not
    if (result.data && result.data.data) {
      videoData = result.data.data;  
      displayVideos(videoData);  
        } else {
      console.error("API Problem ", result);
    }
  })
  .catch((err) => console.error("Error ", err));

//display videos function
function displayVideos(data) {
  videoContainer.innerHTML = "";  

  data.forEach((video) => {
    const videoId = video.items.id; 
    const title = video.items.snippet.title || "No Title";
    const thumbnailUrl = video.items.snippet.thumbnails.high.url || "";
    const channelName = video.items.snippet.channelTitle || "Chai Aur Code";

    if (!videoId || !thumbnailUrl) return; 

    videoContainer.innerHTML += `
      <a class="video-card" href="https://youtube.com/watch?v=${videoId}" target="_blank">
        <img src="${thumbnailUrl}" alt="${title}">
        <p class="caption">${title}</p>
        <p class="channel">${channelName}</p>
      </a>
    `;
  });
}

// Search Videos function start here
searchBar.addEventListener("input", function () {
  const searchText = searchBar.value.toLowerCase();
  if (!videoData) return; // here handle to undefined data

  const filteredVideos = videoData.filter((video) =>
    video.items.snippet.title.toLowerCase().includes(searchText)
  );
  displayVideos(filteredVideos);
});
