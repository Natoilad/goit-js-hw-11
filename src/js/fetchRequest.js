import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const KEY_API = '32891390-a52999f78b5dd379dfcc20192';
export async function fetchRequest(request, page) {
  try {
    const responce = await axios.get(
      `${BASE_URL}?key=${KEY_API}&q=${request}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );
    return responce.data;
  } catch (err) {
    throw new Error(console.log(responce.statusText));
  }
}
