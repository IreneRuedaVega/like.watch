"use strict";

console.log("Hola mundo");

const buttonSearch = document.querySelector(".js-btnSearch");

function getDataFromApi() {
  const inputSearch = document.querySelector(".js-input");
  const inputValue = inputSearch.value;
  console.log(inputValue);
  fetch("http://api.tvmaze.com/search/shows?q=")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      /* for(const show of data.show) */
    });
}

buttonSearch.addEventListener("click", getDataFromApi);
