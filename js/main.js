"use strict";

//Variables

const resultsShow = document.querySelector(".js-list");
const resultsFavouritesShows = document.querySelector(".js-list-favourites");
const buttonReset = document.querySelector(".js-button-reset");
const formSearch = document.querySelector(".js-form-search");

//Arrays

let series = [];
let favouritesList = [];

//Function to obtain the data from the API

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
      listenSeries();
    });
}

//Function to paint the results from the series search

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
    seriesResults += "</li>";
  }
  resultsShow.innerHTML = seriesResults;
}

//Function to listen the series search event

function listenButton() {
  formSearch.addEventListener("submit", getDataFromApi);
}

//Function to save the favourite series

const favouritesShows = function (event) {
  const clickedSerie = parseInt(event.currentTarget.id);
  let serieFav;
  let indexInFavourites;
  for (let i = 0; i < series.length; i++) {
    if (clickedSerie === series[i].show.id) {
      //We search in favourites in the object whose id is the same as that of the series
      serieFav = favouritesList.find(
        (favouritesList) => favouritesList.show.id == series[i].show.id
      );
      //If we found it (if it is not undefined) it is inside of favourites
      if (serieFav !== undefined) {
        //We search in the index of that series in favourites and take it out of the array
        indexInFavourites = favouritesList.findIndex((fav) => serieFav === fav);
        favouritesList.splice([indexInFavourites], 1);
        //if we can't find it, it's not in favourites
      } else {
        favouritesList.push(series[i]);
        /*  series.splice(indexInFavourites, 1); */
      }
    }
  }

  paintSeries();
  listenSeries();
  paintFavourites();
  setInLocalStorage();
};

//Function that paint the favourite series in the favourite series section

function paintFavourites() {
  let seriesFavouriteResults = "";
  let urlPhotoFavourites =
    "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
  for (let i = 0; i < favouritesList.length; i++) {
    seriesFavouriteResults += `<li class="card" id="${favouritesList[i].show.id}">`;
    seriesFavouriteResults += `<button class="js-button-fav" type="reset"><i class="fas fa-times"></i></button>`;
    seriesFavouriteResults += `<h2 class="card__title">${favouritesList[i].show.name}</h2>`;
    if (favouritesList[i].show.image === null) {
      seriesFavouriteResults += `<img class="card__img" src="${urlPhotoFavourites}" alt="Foto de ${favouritesList[i].show.name}"/>`;
    } else {
      seriesFavouriteResults += `<img class="card__img" src="${favouritesList[i].show.image.medium}" alt="Foto de ${favouritesList[i].show.name}"/>`;
    }
    seriesFavouriteResults += "</li>";
  }
  resultsFavouritesShows.innerHTML = seriesFavouriteResults;
}

//Function to listen the event to select the series

function listenSeries() {
  const seriesItems = document.querySelectorAll(".card");
  for (const serieItem of seriesItems) {
    serieItem.addEventListener("click", favouritesShows);
  }
}

// Local Storage

function setInLocalStorage() {
  const stringifyFavourites = JSON.stringify(favouritesList);
  localStorage.setItem("favourites", stringifyFavourites);
}

function getFromLocalStorage() {
  const localStorageData = localStorage.getItem("favourites");
  if (localStorageData !== null) {
    favouritesList = JSON.parse(localStorageData);
    paintFavourites();
  }
}

//Function to delete the elements from the favourite list

function resetAll() {
  favouritesList = [];
  paintFavourites();
  paintSeries();
  listenSeries();
  window.localStorage.clear();
}

function listenReset() {
  buttonReset.addEventListener("click", resetAll);
}

//start app

function init() {
  listenButton();
  listenReset();
  getFromLocalStorage();
}

init();
