import axios from 'axios';
export async function fetchRequest(name, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY_API = '32891390-a52999f78b5dd379dfcc20192';
  const responce = await axios.get(
    `${BASE_URL}?key=${KEY_API}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
  );
  const test = responce.data;
  console.dir(test);
  return await responce.data;
}
fetchRequest('sparrow', 1);

// const fetchRequest = async (name, page) => {
//   try {
//     const BASE_URL = 'https://pixabay.com/api/';
//     const KEY_API = '32891390-a52999f78b5dd379dfcc20192';
//     const response = await axios.get(
//       `${BASE_URL}?key=${KEY_API}&q=water&image_type=photo&orientation=horizontal&safesearch=true`
//     );
//     const resultRequest = await response.data;
//     console.log(resultRequest);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// fetchRequest();

// 'https://pixabay.com/api/?key=32891390-a52999f78b5dd379dfcc20192&q=water&image_type=photo&orientation=horizontal&safesearch=true';
