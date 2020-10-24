"use strict";

const resultsShow = document.querySelector(".js-list");
const resultsFavouritesShows = document.querySelector(".js-list-favourites");

let series = [];
let favouritesList = [];

//Función para conectar con la API y recoger los datos que necesitamos

function getDataFromApi(ev) {
  ev.preventDefault();
  const inputSearch = document.querySelector(".js-input");
  const inputValue = inputSearch.value;
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      series = data;
      paintSeries();
      listenButton();
      listenSeries();
    });
}

//Función para pintar los resultados de la búsqueda

function paintSeries() {
  let seriesResults = "";
  let urlPhoto = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
  for (let i = 0; i < series.length; i++) {
    let classFavourite;
    const favouriteIndex = favouritesList.indexOf(series[i]);
    if (favouriteIndex === -1) {
      classFavourite = "";
    } else {
      classFavourite = "card__favourite";
    }
    seriesResults += `<li class="card ${classFavourite}" id="${series[i].show.id}">`;
    seriesResults += `<h2 class="card__title">${series[i].show.name}</h2>`;
    if (series[i].show.image === null) {
      seriesResults += `<img class="card__img" src="${urlPhoto}" alt="Foto de ${series[i].show.name}"/>`;
    } else {
      seriesResults += `<img class="card__img" src="${series[i].show.image.medium}" alt="Foto de ${series[i].show.name}"/>`;
    }
    seriesResults += "<li>";
  }
  resultsShow.innerHTML = seriesResults;
}

//Función para guardar las series favoritas

const favouritesShows = function (event) {
  const clickedSerie = parseInt(event.currentTarget.id);
  let serieFav;
  let indexInFavourites;
  for (let i = 0; i < series.length; i++) {
    if (clickedSerie === series[i].show.id) {
      //Buscamos en favoritos en el objeto cuyo id sea el mismo que el de la serie
      serieFav = favouritesList.find(
        (favouritesList) => favouritesList.show.id == series[i].id
      );
      //Si lo encontramos (si no está undefined) está dentro de favoritos
      if (serieFav !== undefined) {
        //Buscamos el índice de esa serie en favoritos y lo sacamos del array
        indexInFavourites = favouritesList.findIndex((fav) => serieFav === fav);
      } else {
        favouritesList.push(series[i]);
      }
    }
  }

  paintSeries();
  listenSeries();
  paintFavourites();
  setLocalStorage();
};

//Función para pintar las series favoritas

function paintFavourites() {
  let seriesFavouriteResults = "";
  let urlPhotoFavourites =
    "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
  for (let i = 0; i < favouritesList.length; i++) {
    seriesFavouriteResults += `<li class="card" id="${favouritesList[i].show.id}">`;
    seriesFavouriteResults += `<button type="reset"><i class="fas fa-times"></i></button>`;
    seriesFavouriteResults += `<h2 class="card__title">${favouritesList[i].show.name}</h2>`;
    if (favouritesList[i].show.image === null) {
      seriesFavouriteResults += `<img class="card__img" src="${urlPhotoFavourites}" alt="Foto de ${favouritesList[i].show.name}"/>`;
    } else {
      seriesFavouriteResults += `<img class="card__img" src="${favouritesList[i].show.image.medium}" alt="Foto de ${favouritesList[i].show.name}"/>`;
    }
    seriesFavouriteResults += "<li>";
  }
  resultsFavouritesShows.innerHTML = seriesFavouriteResults;
  /* listenReset(); */
}

//Función para escuchar el evento para seleccionar las series

function listenSeries() {
  const seriesItems = document.querySelectorAll(".card");
  for (const serieItem of seriesItems) {
    serieItem.addEventListener("click", favouritesShows);
  }
}

//Función para guardar los datos de favoritos en LocalStorage

function setLocalStorage() {
  localStorage.setItem("favourite", JSON.stringify(favouritesList));
}

//Función para obtener la info del localStorage, leerla y parsearla

function getLocalStorage() {
  favouritesList = JSON.parse(localStorage.getItem("favourite"));
  if (favouritesList === null) {
    favouritesList = [];
  }
}

/* const buttonReset = document.querySelector(".js-button-reset");

function listenReset() {
  console.log("Irene");
  buttonReset.addEventListener("click", paintFavourites);
}

function resetAll(){

}

listenReset(); */

//Función para escuchar el evento de la búsqueda de series

const formSearch = document.querySelector(".js-formSearch");

function listenButton() {
  formSearch.addEventListener("submit", getDataFromApi);
}

listenButton();
