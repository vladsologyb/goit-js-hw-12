import { renderImages, initializeLightbox } from './js/render-functions.js';
import { fetchIcon, limit } from './js/pixabay-api';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const button = document.querySelector(".load-more");
let lightbox;
let page = 1;
let prevQuery = '';
let currentPage = 1

form.addEventListener("submit", onSubmit);
button.addEventListener("click", loadMore);

function onSubmit(e) {
    e.preventDefault();
    const query = form.elements['search'].value;

    currentPage = page;
    if (query !== prevQuery) {
        page = 1; 
        prevQuery = query; 
    }

    gallery.innerHTML = "";
    loader.style.display = "block";
    button.style.display = "none";

    fetchImages(query, page);

    form.reset();
}

function loadMore() {
    loader.style.display = "block";
    page += 1;

    if (page === currentPage + 1) {
        fetchImages(prevQuery, page);
    } else {
        console.log("Сторінка була змінена .");
    }
}

async function fetchImages(query, page) {
    try {
        const data = await fetchIcon(query, page);

        if (!query.trim()) {
            iziToast.error({
                message: 'Заповніть це поле!',
                messageColor: '#FFFFFF',
                backgroundColor: '#B51B1B',
                position: 'topRight',
            });
            loader.style.display = "none";
            return;
        } else if (data.hits.length === 0) {
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'center',
            });
            loader.style.display = "none";
            return;
        } else {
            const imagesHTML = renderImages(data);
            gallery.insertAdjacentHTML("beforeend", imagesHTML);
            loader.style.display = "none";
            if (!lightbox) {
                lightbox = initializeLightbox();
            } else {
                lightbox.refresh();
            }
            scroll();
            currentPage = page;
            const totalImages = data.totalHits;
            const totalPages = Math.ceil(totalImages / limit);
            if (page >= totalPages) {
                button.style.display = "none";
                return iziToast.error({
                     title: 'Error',
                    message: "We're sorry, there are no more images to load",
                     position: "topRight",
                });
            } else {
                button.style.display = "block";
            }
        }
    } catch (error) {
        loader.style.display = "none";
        iziToast.error({
            title: 'Error',
            message: 'Fetch error. Please try again later.',
            position: 'center',
        });
    }
}

function scroll() {
    const cardHeight = gallery.firstElementChild.getBoundingClientRect().height;
    window.scrollBy({ top: 2 * cardHeight, behavior: 'smooth' });
}