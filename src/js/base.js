import '../sass/index.scss';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import { fetchRequest } from './fetchRequest';

const options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(infinityScroll, options);
let page = 1;

const form = document.querySelector('.search-form');
const inputEl = document.querySelector('.inputRequest');
// const btnSubmit = document.querySelector('.submitBtn');
const gallery = document.querySelector('.gallery');
const guard = document.querySelector('.js-guard');

form.addEventListener('submit', inputRequest);

const inputRequest = e => {
  e.preventDefault();
  const request = inputEl.value.trim();
  if (!request) {
    markupReset();
    return;
  }
  page = 1;
  fetchRequest(name, page).then(data => {
    if (!data) {
      markupReset();
      Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      );
      return;
    } else {
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
    const markup = createNewMarkup(data);
    currentMarkup(markup);
  });
};
const markupReset = list => (list.innerHTML = '');

// console.log(axios.isCancel('something'));
// const BASE_URL =
// `https://pixabay.com/api/?key=32891390-a52999f78b5dd379dfcc20192&q=cat&image_type=photo&orientation=horizontal&safesearch=true
