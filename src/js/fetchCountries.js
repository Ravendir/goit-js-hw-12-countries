const JSON_BASE_URL = 'https://restcountries.eu/rest/v2';

const fetchData = (request = '/') =>
  fetch(JSON_BASE_URL + request).then(response => response.json());

const fetchByName = name =>
  fetch(`${JSON_BASE_URL}/name/${name}`).then(response => {
    if (response.status === 404) {
      throw new Error(`Страна с именем "${name}" не найдена`);
    }
    return response.json();
  });
// console.log(fetchByName);
export { fetchData, fetchByName };
