/* -- General & DOM Selectors -- */
const params = (new URL(window.location)).searchParams;
const pageID = parseInt(params.get('id'), 10);

// Photographer selectors
const photographerName = document.querySelector('.name-block__name');
const photographerLocation = document.querySelector('.name-block__location');
const photographerTagline = document.querySelector('.name-block__tagline');
const photographerTagList = document.querySelector('.name-block__taglist');
const photographerImage = document.querySelector('.photographer__img');

/* -- Photographer banner -- */
function fillPhotographerBanner(element) {
  photographerName.innerText = element.name;
  photographerLocation.innerText = `${element.city}, ${element.country}`;
  photographerTagline.innerText = element.tagline;
  photographerImage.setAttribute('src', `assets/Photographers ID Photos/${element.portrait}`);
  photographerImage.alt = element.name;

  // For each tag, HTML elements are created and classes are added
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

// The photographer ID enables us to load the data for similar ID JSON object only
fetch('fisheye_data.json')
  .then((response) => response.json())
  .then((data) => {
    data.photographers.forEach((photographer) => {
      if (photographer.id === pageID) {
        fillPhotographerBanner(photographer);
      }
    });
  })
  .catch((err) => (err));
