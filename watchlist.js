function retrieveWatchlist() {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const watchlistContainer = document.getElementById("watchlistContainer");
  const watchlistWrapper = document.createElement("div");
  watchlistWrapper.className = "watchlistWrapper";

  console.log(watchlist);
  watchlist.forEach(async (meow) => {
    const data = await fetchShow(meow.id, meow.mediaType);
    const watchlistCard = document.createElement("a");
    watchlistCard.href = `#details?tv/${meow.id}`;
    watchlistCard.className = "companyCard";
    watchlistCard.innerHTML = `
      <div class="imageWrapper">
      <img class="lazy" data-src="${data.poster}"/>
      </div>
      <div class="titleWrapper">
        <span>${data.title}</span>
      </div>
      `;
    watchlistWrapper.appendChild(watchlistCard);
    lazy();
  });

  watchlistContainer.appendChild(watchlistWrapper);
}
