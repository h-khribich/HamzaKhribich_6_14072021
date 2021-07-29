/* -- General & DOM Selectors -- */
const params = (new URL(window.location)).searchParams;
const pageID = parseInt(params.get('id'), 10);
const photographerName = document.querySelector('.name-block__name');
const photographerLocation = document.querySelector('.name-block__location');
const photographerTagline = document.querySelector('.name-block__tagline');
const photographerTagList = document.querySelector('.name-block__taglist');

function fillPhotographerBanner(element) {
  photographerName.innerText = element.name;
  photographerLocation.innerText = `${element.city}, ${element.country}`;
  photographerTagline.innerText = element.tagline;

  element.tags.forEach((tag) => {
    const photographerTag = photographerTagList.appendChild(document.createElement('li'));
    const photographerSRtag = photographerTag.appendChild(document.createElement('span'));
    photographerSRtag.innerText = 'Tag';
    photographerSRtag.classList.add('screen-reader-only');
    const photographerTagLink = photographerTag.appendChild(document.createElement('a'));
    photographerTagLink.dataset.tagName = tag;
    photographerTagLink.classList.add('tag');
    photographerTagLink.setAttribute('href', '#');
    photographerTagLink.innerText = `#${tag}`;
  });
}

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

// fetch
/*
const artists = [{
  id: 12,
},{
  id: 62,
}];

const id = 62;

const artist = artists.find((el) => el.id === id);
*/