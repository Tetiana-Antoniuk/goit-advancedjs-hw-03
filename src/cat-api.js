import axios from 'axios';
import iziToast from 'izitoast';

export async function fetchBreeds() {
  axios.defaults.headers.common['x-api-key'] =
    'live_DkjqTDSOD0uOwcyk5E7MuJms89zGHMAHzGcGyX0DktQBX5FB2DAgH1fKrExnRumo';

  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    console.log(error);
    iziToast.error({
      title: 'Error',
      message: 'Oops! Something went wrong! Try reloading the page!',
      position: 'topLeft',
    });
    throw error;
  }
}

const baseUrl = 'https://api.thecatapi.com/v1/images/search';
export async function fetchCatByBreed(breedId) {
  const url = `${baseUrl}?breed_ids=${breedId}`;
  try {
    const response = await axios.get(url);
    return response.data[0];
  } catch (error) {
    iziToast.settings({
      title: 'Error',
      message: 'Oops! Something went wrong! Try reloading the page!',
      position: 'topLeft',
    });
    throw error;
  }
}
