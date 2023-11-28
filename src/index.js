import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import Choices from 'choices.js';
import iziToast from 'izitoast';

const elements = {
  select: document.getElementById('choices'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  info: document.querySelector('.cat-info'),
};

elements.loader.classList.remove('visually-hidden');

function breedsSelect(breeds) {
  const select = elements.select;

  breeds.forEach(breed => {
    const option = new Option(breed.name, breed.id);
    select.add(option);
  });

  new Choices(select, {
    itemSelectText: '',
  });
}

fetchBreeds()
  .then(breeds => {
    elements.select.classList.remove('visually-hidden');
    elements.loader.classList.add('visually-hidden');
    breedsSelect(breeds);
  })
  .catch(error => {
    elements.loader.classList.add('visually-hidden');
    // elements.error.classList.remove('visually-hidden');
  });

elements.select.addEventListener('change', handlerSelect);

function handlerSelect() {
  elements.info.innerHTML = '';
  const breedCatId = this.value;
  elements.loader.classList.remove('visually-hidden');
  fetchCatByBreed(breedCatId)
    .then(data => {
      elements.loader.classList.add('visually-hidden');
      elements.info.innerHTML = `
      <div class="description">
      <div class="cat-info__image-wrapper">
    <img class="cat-info__image" width="400" src="${data.url}" alt="${data.breeds[0].name}" />
    </div>
    <div class="text">
      <p class="cat-info__name">Breed: ${data.breeds[0].name}</p>
      <p class="cat-info__description"><span class="cat-info__title">Description: </span>${data.breeds[0].description}</p>
      <p class="cat-info__temperament"><span class="cat-info__title">Temperament: </span>${data.breeds[0].temperament}</p>
      </div>
      </div>
    `;
    })
    .catch(error => {
      console.error(error);
      iziToast.error({
        title: 'Error',
        message: 'Oops! Something went wrong! Try reloading the page!',
        position: 'topLeft',
      });
      // elements.info.innerHTML = `<p class="error">Failed to fetch cat information.</p>`;
    });
}
