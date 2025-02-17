const route = {
  home: `
  <div class="home">
    <div class="landing">
     <div class="backdropLanding swiper-container">
     <div class="swiper-wrapper landingWrapper"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>

     <div class="swiper-container posterLanding">
    <div class="swiper-wrapper"></div>
    </div>
    </div>
  <h1 class="landingLabel">Network Section</h1>
  <div id="companiesContainer" class="swiper-container">
        <div id="companiesWrapper" class="swiper-wrapper"></div>
           <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
   </div>

<h1 class="landingLabel">Latest Trailers</h1>
   <div id="trailersContainer" class="swiper-container">
   <div id="trailersWrapper" class="swiper-wrapper"></div>
           <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
   </div>

        

        </div>
         <footer>&copy; All righst reserved</footer>
         
         
         `,
  movie: ` <div class="meow-movie">
   <div class="swiper-container genreContainer">
      <div id="genreWrapper" class="swiper-wrapper"></div>
    </div>
    <div id="genreMovieContainer"></div>
  </div>`,
  tv: `<p>tv</p>`,
  watchlist: `<div id="watchlistContainer"></div>`,
  donate: `<p>donate</p>`,
};

async function render() {
  const hash = location.hash.slice(1) || "home";
  let content = route[hash];

  // Handle dynamic company routes
  if (hash.startsWith("company/")) {
    content = `<div id="companyContainer"></div>`;
  } else if (hash.startsWith("details?")) {
    content = `<div id="detailsContainer"></div>`;
  }

  // Default to 404 if no valid route
  if (!content) {
    content = `<div class="notFound"><p>404 Page Not Found</p></div>`;
  }

  document.getElementById("contents").innerHTML = content;
  document
    .querySelectorAll(".line")
    .forEach((line) => line.classList.remove("glow"));

  document.querySelector(`a[href="#${hash}"] .line`)?.classList.add("glow");

  if (hash == "home") {
    landingFunction();
    company();
    fetchLatestforTrailer();
  } else if (hash.startsWith("company/")) {
    const companyId = hash.replace("company/", "");
    companiesFunction(companyId);
  } else if (hash.startsWith("details?")) {
    const params = hash.replace("details?", "").split("/");
    const mediaType = params[0];
    const id = params[1];
    const data = await fetchShow(id, mediaType);
    detailsFunction(data);
  } else if (hash == "movie") {
    movieSection();
  } else if (hash == "tv") {
  } else if (hash == "watchlist") {
    retrieveWatchlist();
  } else if (hash == "donate") {
  }
}

window.addEventListener("hashchange", render);
window.addEventListener("load", render);
