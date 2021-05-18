import './sass/main.scss';
import { fetchByName } from './js/fetchCountries';
import countriesList from './handlebars/countriesList.hbs';
import countryDescription from './handlebars/countryDescr.hbs';
import debounce from 'lodash.debounce';
import { alert, error, defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

defaults.delay = 1000;

const containerRef = document.querySelector('.country-list');
const inputRef = document.querySelector('.search');

inputRef.addEventListener('input', debounce(onInputSearch, 500));

function onInputSearch(event) {
  const formRef = event.target.value;

  const inputValue = formRef.toLowerCase().trim();
  containerRef.innerHTML = '';
  if (!inputValue) return;
  fetchByName(formRef)
    .then(user => renderCountries(user))
    .catch(error => renderError(error));
}
const renderError = error => {
  alert({ text: error });
};

const renderCountries = country => {
  if (country.length >= 2 && country.length <= 10) {
    let countriesElems = countriesList(country);
    containerRef.innerHTML = countriesElems;
  }
  if (country.length === 1) {
    let countriesElems = countryDescription(country);
    containerRef.innerHTML = countriesElems;
  }
  if (country.length > 10) {
    alert({
      text: 'Слишком много совпадений!',
    });
  }
};
