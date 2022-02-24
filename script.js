'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const inputSearch = document.querySelector('.search-input');
const btnSearch = document.querySelector('.btn-search');
const loadinSpinner = document.querySelector('.lds-spinner');

///////////////////////////////////////

let countries;

function loadData() {
  const request = new XMLHttpRequest();
  loadinSpinner.style.opacity = 1;
  request.open('GET', `https://restcountries.com/v3.1/all`);
  request.send();

  request.addEventListener('load', function () {
    const data = JSON.parse(this.responseText);
    countries = [...data];
    loadinSpinner.style.opacity = 0;
    getAllCountry();
  });
}

loadData();

function getAllCountry() {
  countries.forEach(function (data) {
    const html = `
      <article class="country">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🏙</span>${data.capital}</p>
            <p class="country__row"><span>➕</span>${data.area} sq km</p>
          </div>
        </article>
      `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
}

function getCountry(country) {
  countries
    .filter(coun =>
      coun.name.common.toLowerCase().includes(country.toLowerCase())
    )
    .forEach(function (data) {
      const html = `
  <article class="country">
      <img class="country__img" src="${data.flags.svg}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🏙</span>${data.capital}</p>
        <p class="country__row"><span>➕</span>${data.area} sq km</p>
      </div>
    </article>
  `;

      countriesContainer.insertAdjacentHTML('beforeend', html);
      countriesContainer.style.opacity = 1;
    });
}

inputSearch.addEventListener('keyup', function () {
  if (inputSearch.value !== '') {
    countriesContainer.textContent = '';
    getCountry(inputSearch.value);
  }

  if (inputSearch.value === '') {
    getAllCountry();
  }
});
