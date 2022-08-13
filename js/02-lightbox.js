import { galleryItems } from './gallery-items.js';
// Change code below this line

const elForGallery = document.querySelector('ul.gallery');
const imageGallery = createImageGallery(galleryItems);

elForGallery.insertAdjacentHTML("afterbegin", imageGallery);
elForGallery.addEventListener('click', onImageGalleryClick);

useForGallerySimpleLightbox();

function createImageGallery(galleryItems){
    return galleryItems
    .map(({preview, original, description}) => {
        return `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img class="gallery__image" src="${preview}" alt="${description}" />
            </a>
        </li>
        `
    }).join('');
}

function onImageGalleryClick(event){
    event.preventDefault();
}

function useForGallerySimpleLightbox(){
    new SimpleLightbox('.gallery a', { 
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
    });
}