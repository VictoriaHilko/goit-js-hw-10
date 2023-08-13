import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';
import { Notify } from "notiflix";

const refs = {
    breedSelect: document.querySelector('.breed-select'),
    container: document.querySelector('.cat-info'),
    loaderText: document.querySelector('.loader'),
    errorText: document.querySelector('.error'),
    loaderSpan: document.querySelector('.loader-span'),
};

refs.breedSelect.classList.add('is-hidden');

function createMarkupBreedsSelect(breedList) {
    const markup = breedList
        .map(breed => {
            return `<option value="${breed.id}">${breed.name}</option>`;
        })
        .join("");


    refs.breedSelect.innerHTML = markup;

    refs.breedSelect.classList.remove('is-hidden');
    refs.loaderText.classList.add('is-hidden');
    refs.loaderSpan.classList.add('is-hidden');
}

fetchBreeds()
    .then(selectedBreed => {
        createMarkupBreedsSelect(selectedBreed);
    })
    .catch(err => {
        console.error(err);
        Notify.failure(`❌ ${err}`);
    });


refs.breedSelect.addEventListener('change', onCatBreedSelect);

function onCatBreedSelect(event) {
    refs.container.innerHTML = '';
    refs.loaderText.classList.remove('is-hidden');
    refs.loaderSpan.classList.remove('is-hidden');

    const breedOption = fetchCatByBreed(event.target.value);

    breedOption.then(data => createMarkupInfo(data))
    .catch(err => {
        console.error(err);
        Notify.failure(`❌ ${err}`);
    });
}

function createMarkupInfo(data) {
    const markup = element => {
        return `<div class="info-container">
        <h1 class="title">${element.breeds[0].name}</h1>
    <p class="description"><span class="accent">Description: </span>${element.breeds[0].description}</p>
    <p class="description"><span class="accent">Temperament: </span>${element.breeds[0].temperament}</p>
    <img class="img" src="${element.url}" alt="${element.breeds[0].name}"></img>
    </div>`;
    };
    refs.container.innerHTML = markup(data[0]);
    refs.loaderText.classList.add('is-hidden');
    refs.loaderSpan.classList.add('is-hidden');
}

