"use strict";

console.log("Hola mundo");

let series = [];

//Función para obtener los datos del API

function getDataFromApi() {
  const inputSearch = document.querySelector(".js-input");
  const inputValue = inputSearch.value;
  console.log(inputValue);
  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (const serie of data) {
        series.push(serie.show);
        console.log(series);
      }
    });
}

const buttonSearch = document.querySelector(".js-btnSearch");
buttonSearch.addEventListener("click", getDataFromApi);

//borrar antes de subir

buttonSearch.click();
