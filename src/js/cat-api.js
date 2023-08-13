import axios from 'axios';

const API_KEY = 'live_Ta75mHBja17qRoKdmgGeGQ9ecYMpEULGV5102dQDdSvWakB9DLWYmW3O8W5HjLWV';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';

  return axios.get(url).then(response => response.data);
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return axios.get(url).then(response => response.data);
}