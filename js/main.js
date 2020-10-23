"use strict";

const resultsShow = document.querySelector(".js-list");
const resultsFavouritesShows = document.querySelector(".js-list-favourites");

let series = [];
let favouritesList = [];

//Función para obtener los datos del API

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

//Función para pintar

function paintSeries() {
  let seriesResults = "";
  let urlphoto = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
  for (let i = 0; i < series.length; i++) {
    let classFavourite;
    const favouriteIndex = favouritesList.indexOf(i);
    const favourite = favouriteIndex !== -1;
    if (favourite === true) {
      classFavourite = "card__favourite";
    } else {
      classFavourite = "";
    }

    seriesResults += `<li class="card ${classFavourite}" id="${series[i].show.id}">`;
    seriesResults += `<h2 class="card__title">${series[i].show.name}</h2>`;
    if (series[i].show.image === null) {
      seriesResults += `<img class="card__img" src="${urlphoto}" alt="Foto de ${series[i].show.name}"/>`;
    } else {
      seriesResults += `<img class="card__img" src="${series[i].show.image.medium}" alt="Foto de ${series[i].show.name}"/>`;
    }
    seriesResults += "<li>";
  }
  console.log(seriesResults);
  resultsShow.innerHTML = seriesResults;
}

//Función para las series favoritas

//const favouritesShows = function (event) {
//console.log("Hola mundo");
//const clicked = parseInt(event.currentTarget.id);
//console.log(clicked);
//const indexFav = favouritesList.indexOf(clicked); // find
//const isFavourite = indexFav !== -1;
//if (isFavourite === false) {
//favouritesList.push(clicked); // guardar el objeto entero
//} else {
//favouritesList.splice(indexFav, 1);
//}
//console.log(favouritesList);
//paintSeries();
//listenSeries();
//paintFavourites();
//};

const favouritesShows = function (event) {
  console.log("Hola mundo");
  const clickedSerie = parseInt(event.currentTarget.id);
  let serieFav;
  let indexInFavourites;
  for (let i = 0; i < series.length; i++) {
    console.log("entro");
    if (clickedSerie === series[i].show.id) {
      serieFav = favouritesList.find(
        (favouritesList) => favouritesList.show.id == series[i].id
      );
      if (serieFav !== undefined) {
        indexInFavourites = favouritesList.findIndex((fav) => serieFav === fav);
        favouritesList.splice([indexInFavourites], 1);
      } else {
        favouritesList.push(series[i]);
      }
    }
  }

  paintSeries();
  listenSeries();
  paintFavourites();
};

function paintFavourites() {
  let seriesFavouriteResults = "";
  let urlPhotoFavourites =
    "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
  for (let i = 0; i < favouritesList.length; i++) {
    seriesFavouriteResults += `<li class="card" id="${favouritesList[i].show.id}">`;
    seriesFavouriteResults += `<h2 class="card__title">${favouritesList[i].show.name}</h2>`;
    if (favouritesList[i].show.image === null) {
      seriesFavouriteResults += `<img class="card__img" src="${urlPhotoFavourites}" alt="Foto de ${favouritesList[i].show.name}"/>`;
    } else {
      seriesFavouriteResults += `<img class="card__img" src="${favouritesList[i].show.image.medium}" alt="Foto de ${favouritesList[i].show.name}"/>/>`;
    }
    seriesFavouriteResults += "<li>";
  }
  resultsFavouritesShows.innerHTML = seriesFavouriteResults;
}

function listenSeries() {
  const seriesItems = document.querySelectorAll(".card");
  for (const serieItem of seriesItems) {
    serieItem.addEventListener("click", favouritesShows);
  }
}

//Función para escuchar el evento de la búsqueda

const formSearch = document.querySelector(".js-formSearch");

function listenButton() {
  formSearch.addEventListener("submit", getDataFromApi);
}

listenButton();
