import './sass/index.scss';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchRequest } from './js/fetchRequest';

let page = 1;

const form = document.querySelector('.search-form');
const inputEl = document.querySelector('.inputRequest');
const gallery = document.querySelector('.gallery');
const guard = document.querySelector('.js-guard');

const markupReset = request => {
  gallery.innerHTML = '';
};

const inputRequest = async e => {
  e.preventDefault();
  const request = await inputEl.value.trim();
  if (!request) {
    markupReset();
    Notify.failure(
      `Sorry, there are no images matching your search query. Please try again.`
    );
    return;
  }
  try {
    page = 1;
    const data = await fetchRequest(request, page);
    // console.log(data);
    if (!data) {
      // console.dir(data);
      markupReset();
      Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      );

      return;
    } else {
      Notify.success(`Hooray! We found ${data.totalHits} images.`);

      const markup = createNewMarkup(data);
      currentMarkup(markup);

      lightbox.refresh();
      observer.observe(guard);
    }
  } catch (err) {
    errorMsg;
  }
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

const infinityScroll = async elements =>
  elements.forEach(el => {
    // page += 1;
    const request = inputEl.value.trim();
    if (!request) {
      markupReset();
      Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      );
      return;
    }
    try {
      // page += 1;
      // const request = inputEl.value.trim();
      // if (!request) {
      //   markupReset();
      //   Notify.failure(
      //     `Sorry, there are no images matching your search query. Please try again.`
      //   );
      //   return;
      // }
      // else
      if (el.isIntersecting) {
        page += 1;
        fetchRequest(inputEl.value, page).then(data => {
          // page += 1;
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
        });
      }
    } catch (err) {
      errorMsg;
    }
  });
const options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};
const lightbox = new SimpleLightbox('.gallery a');
const loadMarkup = markup => gallery.insertAdjacentHTML('beforeend', markup);
const currentMarkup = markup => (gallery.innerHTML = markup);
const errorMsg = err => Notify.failure(`${err}`);
const observer = new IntersectionObserver(infinityScroll, options);
form.addEventListener('submit', inputRequest);
