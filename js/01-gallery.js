import { galleryItems } from './gallery-items.js';
// Change code below this line

const elForGallery = document.querySelector('div.gallery');
const imageGallery = createImageGallery(galleryItems);

elForGallery.insertAdjacentHTML("afterbegin", imageGallery);
elForGallery.addEventListener('click', onImageGalleryClick);

function createImageGallery(galleryItems){
    return galleryItems
    .map(({preview, original, description}) => {
        return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </div>
        `
    }).join('');
}

function onImageGalleryClick(event){
    event.preventDefault();

    //const isImegeEl = event.target.classList.contains('gallery__image');
    const isImegeEl = (event.target.nodeName === 'IMG');

    if (!isImegeEl){
        return;
    }

    const imageLarge = event.target.dataset.source; 

    onOffImageModal(true, imageLarge);
}

let instance = null;
function onOffImageModal(isOn, imageLink){
    if (isOn){
        instance = basicLightbox.create(`
            <img src="${imageLink}" width="1280">
            `,{
                onShow: createListenerModal,
                onClose: removeListenerModal,
            });
        instance.show();
    }else if (instance){
        instance.close();
        instance = null;
    }
}

function createListenerModal(){
    window.addEventListener('keydown', onModalKeyPress);
}

function removeListenerModal(){
    window.removeEventListener('keydown', onModalKeyPress);
}

function onModalKeyPress(event){
    if (event.code === 'Escape'){
        onOffImageModal(false);
    }
}
