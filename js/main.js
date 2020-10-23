"use strict";

const resultsShow = document.querySelector(".js-list");

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

const favouritesShows = function (event) {
  console.log("Hola mundo");
  const clicked = parseInt(event.currentTarget.id);
  console.log(clicked);
  const indexFav = favouritesList.indexOf(clicked); // find
  const isFavourite = indexFav !== -1;
  if (isFavourite === false) {
    favouritesList.push(clicked); // guardar el objeto entero
  } else {
    favouritesList.splice(indexFav, 1);
  }
  console.log(favouritesList);
  paintSeries();
  listenSeries();
  //paintFavourites();
};

/* function paintFavourites(){} */

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
