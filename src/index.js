import './sass/index.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchRequest } from './js/fetchRequest';

const options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

let page = 1;

const form = document.querySelector('.search-form');
const inputEl = document.querySelector('.inputRequest');
// const btnSubmit = document.querySelector('.submitBtn');
const gallery = document.querySelector('.gallery');
const guard = document.querySelector('.js-guard');

function markupReset(markup) {
  gallery.innerHTML = '';
}

const inputRequest = e => {
  e.preventDefault();
  const request = inputEl.value.trim();
  if (!request) {
    Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );

    markupReset();
    return;
  }
  page = 1;
  fetchRequest(request, page)
    .then(data => {
      if (data.totalHits === 0) {
        Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
        markupReset();

        return;
      } else {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
      const markup = createNewMarkup(data);
      currentMarkup(markup);

      lightbox.refresh();
      observer.observe(guard);
    })
    .catch(errorMsg);
};

const createNewMarkup = data => {
  const markup = data.hits.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => `<a class="gallery_link" href="${largeImageURL}">
          <div class="gallery__item" >
            <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy"  />
            <div class="info">
              <p class="info-item"><b>Likes</b><br/>${likes}</p>
              <p class="info-item"><b>Views</b><br>${views}</p>
              <p class="info-item"><b>Comments</b><br>${comments}</p>
              <p class="info-item"><b>Downloads</b><br>${downloads}</p>
            </div>
          </div>
        </a>
      `
  );
  return markup.join('');
};

const loadMarkup = markup => gallery.insertAdjacentHTML('beforeend', markup);
const currentMarkup = markup => (gallery.innerHTML = markup);
const errorMsg = err => Notify.failure(`${err}`);

const infinityScroll = data =>
  data.forEach(el => {
    if (el.isIntersecting) {
      page += 1;
      fetchRequest(inputEl.value, page)
        .then(data => {
          console.log(page);
          const markup = createNewMarkup(data);
          loadMarkup(markup);
          lightbox.refresh();
          if (data.totalHits / 40 <= page) {
            observer.unobserve(guard);
            Notify.failure(
              `We're sorry, but you've reached the end of search results.`
            );
          }
        })
        .catch(errorMsg);
    }
  });
const observer = new IntersectionObserver(infinityScroll, options);
const lightbox = new SimpleLightbox('.gallery a');
form.addEventListener('submit', inputRequest);
