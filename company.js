async function companiesFunction(companyId) {
  const companyContainer = document.getElementById("companyContainer");
  companyContainer.innerHTML = "";
  const endpoint = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_networks=${companyId}&sort_by=popularity.desc`;
  const today = new Date().toISOString().split("T")[0];

  const response = await fetch(endpoint);
  const data = await response.json();
  data.results.forEach(async (meow) => {
    if (meow.air_date <= today || meow.first_air_date <= today) {
      displayCompany(meow);
    }
  });
}

function displayCompany(data) {
  const poster = data.poster_path
    ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
    : "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEibeodCS7BPOb9g45oi5UXnHI4lwGJECVpkbQTTZOSV4YTNkOWzY__ZQITNna1nBEiXMcATjNM20xtsKXbRPvejk1Rek-bRsp-ZiwOI5vyWMhYC_AEQodd_otWepiHkpG9zJCd0iABhb1iFFRuJXE6mSyWhy0xpQdv8IIZoOAl8aI1QBc4gRQxfvqim/s1600/%5BZXC%20STREAM%5D11.jpg";

  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const isBookmarked = watchlist.some((item) => item.id === data.id);

  const companyCard = document.createElement("a");
  companyCard.href = `#details?tv/${data.id}`;
  companyCard.className = "companyCard";
  companyCard.innerHTML = `
      <div class="imageWrapper">
       <i class='bx ${isBookmarked ? "bxs-bookmark" : "bx-bookmark"} '></i>
      <img class="lazy" data-src="${poster}"/>
      </div>
      <div class="titleWrapper">
        <span>${data.name}</span>
      </div>
      `;
  companyContainer.appendChild(companyCard);

  const bookmark = companyCard.querySelector(".bx-bookmark, .bxs-bookmark");
  bookmark.addEventListener("click", (event) => {
    watchlistFunction(data.id, "tv", bookmark);
  });

  lazy();
}
