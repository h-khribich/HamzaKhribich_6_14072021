/* -- General & DOM Selectors -- */
const params = (new URL(window.location)).searchParams;
const pageID = parseInt(params.get('id'), 10);

const photographerName = document.querySelector('.name-block__name');
const photographerLocation = document.querySelector('.name-block__location');
const photographerTagline = document.querySelector('.name-block__tagline');
const photographerTagList = document.querySelector('.name-block__taglist');
const photographerImage = document.querySelector('.photographer__img');
const modalBackground = document.getElementById('modal-background');
const contactButton = document.querySelector('.contact-button');
const contactModal = document.getElementById('contact-modal');
const closeButton = document.getElementById('close-modal');
const modalName = document.getElementById('modal__name');
const submitButton = document.getElementById('submit-button');

/* -- Photographer banner -- */
function fillPhotographerBanner(element) {
  photographerName.innerText = element.name;
  photographerLocation.innerText = `${element.city}, ${element.country}`;
  photographerTagline.innerText = element.tagline;
  photographerImage.setAttribute('src', `assets/Photographers ID Photos/${element.portrait}`);
  photographerImage.alt = element.name;

  element.tags.forEach((tag) => {
    const photographerTag = photographerTagList.appendChild(document.createElement('li'));
    const photographerSRtag = photographerTag.appendChild(document.createElement('span'));
    photographerSRtag.innerText = 'Tag';
    photographerSRtag.classList.add('screen-reader-only');
    const photographerTagLink = photographerTag.appendChild(document.createElement('a'));
    photographerTagLink.dataset.tagName = tag;
    photographerTagLink.classList.add('tag');
    photographerTagLink.setAttribute('href', `index.html?tag=${tag}`);
    photographerTagLink.innerText = `#${tag}`;
  });
}

fetch('fisheye_data.json')
  .then((response) => response.json())
  .then((data) => {
    data.photographers.forEach((photographer) => {
      if (photographer.id === pageID) {
        fillPhotographerBanner(photographer);
        // Adding modal title dynamically
        modalName.innerText = `${photographerName.innerText}`;
        contactModal.setAttribute('aria-label', `Contact me ${photographer.name}`);
      }
    });
  })
  .catch((err) => (err));

/* -- Contact modal -- */
// Opening the modal
contactButton.addEventListener('click', () => {
  contactModal.toggleAttribute('open');
  contactModal.classList.add('opened__contact-modal');
  // modalBackground.style.display = 'block';
});

// Closing the modal
closeButton.addEventListener('click', () => {
  contactModal.toggleAttribute('open');
  contactModal.classList.remove('opened__contact-modal');
  // modalBackground.style.display = 'none';
});

submitButton.addEventListener('click', () => {
  // contactModal validate and animate
  contactModal.toggleAttribute('open');
  contactModal.classList.remove('opened__contact-modal');
  // modalBackground.style.display = 'none';
});
