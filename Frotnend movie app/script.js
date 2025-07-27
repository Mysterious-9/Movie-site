const APILINK =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1dd0a92711e404a150c77161bc58a33c&page=1";
const IMG_path = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?api_key=1dd0a92711e404a150c77161bc58a33c&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnmovies(APILINK);

function returnmovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then(function (data) {
      console.log(data.results);
      main.innerHTML = ""; 

      const div_row = document.createElement("div");
      div_row.setAttribute("class", "row");

      data.results.forEach((element) => {
        const div_card = document.createElement("div");
        div_card.setAttribute("class", "card");

        const div_column = document.createElement("div");
        div_column.setAttribute("class", "column");

        const image = document.createElement("img");
        image.setAttribute("class", "thumbnail");
        image.setAttribute("id", "image");

        const title = document.createElement("h3");
        title.setAttribute("id", "title");
        title.innerHTML = `${element.title}`;

        image.src = element.poster_path
          ? IMG_path + element.poster_path
          : "https://via.placeholder.com/300x450?text=No+Image";

        div_card.appendChild(image);
        div_card.appendChild(title);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);
      });

      main.appendChild(div_row);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchItem = search.value.trim();
  if (searchItem) {
    returnmovies(SEARCHAPI + searchItem);
    search.value = "";
  }
});
