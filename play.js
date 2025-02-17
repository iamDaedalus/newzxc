function playerFunction(data, id, mediaType) {
  console.log(id);
  const episode = 1;
  const season = 1;
  const servers = [
    {
      name: "Main",
      movieLink: `https://vidsrc.xyz/embed/movie/${id}`,
      tvLink: `https://vidsrc.xyz/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`,
    },
    {
      name: "Server 2",
      movieLink: `https://embed.su/embed/movie/${id}`,
      tvLink: `https://embed.su/embed/tv/${id}/${season}/${episode}`,
    },
    {
      name: "Server 1",
      movieLink: `https://vidsrc.cc/v2/embed/movie/${id}`,
      tvLink: `https://vidsrc.cc/v2/embed/tv/${id}/${season}/${episode}`,
    },
    {
      name: "Server 3",
      movieLink: `https://vidbinge.dev/embed/movie/${id}`,
      tvLink: `https://vidbinge.dev/embed/tv/${id}/${season}/${episode}`,
    },

    {
      name: "Server 4",
      movieLink: `https://vidlink.pro/movie/${id}`,
      tvLink: `https://vidlink.pro/tv/${id}/${season}/${episode}`,
    },
    {
      name: "Server 5",
      movieLink: `https://www.primewire.tf/embed/movie?tmdb=${id}`,
      tvLink: `https://www.primewire.tf/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`,
    },
  ];

  const playerContainer = document.getElementById("playerContainer");
  const iframePlayer = document.createElement("iframe");
  iframePlayer.className = "iframePlayer";

  iframePlayer.src =
    mediaType === "movie" ? servers[0].movieLink : servers[0].tvLink;
  const serverButtonWrapper = document.createElement("div");
  serverButtonWrapper.className = "serverButtonWrapper";
  servers.forEach((meow) => {
    const serverButton = document.createElement("button");
    serverButton.innerText = `${meow.name}`;
    serverButtonWrapper.appendChild(serverButton);

    serverButton.addEventListener("click", () => {
      if (mediaType === "movie") {
        iframePlayer.src = meow.movieLink;
      } else if (mediaType === "tv") {
        iframePlayer.src = meow.tvLink;
        console.log(iframePlayer);
      } else {
      }
    });
  });
  const details = document.createElement("div");
  details.innerHTML = `
  <i class="playerTagline">${data.tagline}</i>
  <h2 class="playerTitle">${data.title || data.name}</h2>
  <div class="playerTrio">
  <span>${data.yearReleased}</span>
  &#x2022;
  <span>${data.runtime}</span>
  &#x2022;
  <span>${data.genreName}</span>
   &#x2022;
  <span>TMDB Rating: ${data.vote}</span>
  </div>
  <p  class="playerOverview">${data.overview}</p>
  `;

  const SEWrapper = document.createElement("div");
  if (mediaType === "tv") {
    const seasonDropdown = document.createElement("span");
    seasonDropdown.innerHTML = "Season 1  <i class='bx bx-chevron-down'></i>";
    SEWrapper.appendChild(seasonDropdown);
  }

  playerContainer.appendChild(iframePlayer);
  playerContainer.appendChild(serverButtonWrapper);
  playerContainer.appendChild(details);
  playerContainer.appendChild(SEWrapper);
}
