"use strict";

const resultsShow = document.querySelector(".js-list");

let series = [];

//Función para obtener los datos del API

function getDataFromApi() {
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
    });
}

//Función para pintar

function paintSeries() {
  let seriesResults = "";
  let urlphoto = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
  for (let i = 0; i < series.length; i++) {
    seriesResults += `<li class="card">`;
    seriesResults += `<h2 class="card__title">${series[i].show.name}</h2>`;
    if (series[i].show.image === null) {
      seriesResults += `<img class="card__img" src="${urlphoto}" alt="Foto de ${series[i].show.name}"/>`;
    } else {
      seriesResults += `<img class="card__img" src="${series[i].show.image.medium}" alt="Foto de ${series[i].show.name}"/>`;
    }
    seriesResults += "<li>";
  }
  resultsShow.innerHTML = seriesResults;
}

const buttonSearch = document.querySelector(".js-btnSearch");

function listenButton() {
  buttonSearch.addEventListener("click", getDataFromApi);
}

listenButton();
