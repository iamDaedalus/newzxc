function landingTrailer(meow, backdrop) {
  const trailersWrapper = document.getElementById("trailersWrapper");
  const trailerSlide = document.createElement("div");
  trailerSlide.className = "trailerSlide swiper-slide";
  trailerSlide.innerHTML = `
  <i class='bx bxl-youtube'></i>
  <img class="iframeCover  lazy" data-src="https://image.tmdb.org/t/p/w500/${backdrop}"/>
   <iframe class="youtubeTrailer lazy" data-src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  `;
  trailersWrapper.appendChild(trailerSlide);

  const youtube = trailerSlide.querySelector(".bxl-youtube");
  const youtubeTrailer = trailerSlide.querySelector(".youtubeTrailer");
  const iframeCover = trailerSlide.querySelector(".iframeCover");
  youtube.addEventListener("click", () => {
    youtubeTrailer.dataset.src = meow;
    iframeCover.classList.add("uncover");
    youtube.classList.add("uncover");
    lazy();
  });
  lazy();
}

async function fetchLatestforTrailer() {
  const endpoint = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=en-US`;
  const response = await fetch(endpoint);
  const data = await response.json();
  data.results.forEach(async (meow) => {
    const data = await fetchTrailer(meow.id, "movie");
    landingTrailer(data, meow.backdrop_path);
  });

  new Swiper("#trailersContainer", {
    slidesPerView: "auto",
    spaceBetween: 20,
    loop: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}
