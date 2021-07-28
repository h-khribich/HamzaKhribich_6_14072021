/* -- General DOM Selectors -- */
const navLink = document.querySelector('.header__link');
const mainGrid = document.getElementById('main-grid');
let activeTagsArray = [];

// Toggling the 'active-tag' CSS class
function activeTag(element) {
  element.addEventListener('click', () => {
    const allSimilarTags = document.querySelectorAll(`.tag[data-tag-name="${element.dataset.tagName}"]`);
    element.blur();
    if (element.classList.contains('active-tag')) {
      allSimilarTags.forEach((similarTag) => {
        similarTag.classList.remove('active-tag');
      });
      activeTagsArray = activeTagsArray.filter((tag) => !(tag === element.dataset.tagName));
    } else {
      allSimilarTags.forEach((similarTag) => {
        similarTag.classList.add('active-tag');
      });
      activeTagsArray.push(element.dataset.tagName);
    }

    if (activeTagsArray.length <= 0) {
      const elementsToDisplay = document.querySelectorAll('section');
      elementsToDisplay.forEach((elementToDisplay) => {
        elementToDisplay.classList.remove('hidden');
      });
      return;
    }

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      section.classList.add('hidden');
    });

    activeTagsArray.forEach((tag) => {
      const elementsToDisplay = document.querySelectorAll(`section[data-tags*="${tag}"]`);
      elementsToDisplay.forEach((elementToDisplay) => {
        elementToDisplay.classList.remove('hidden');
      });
    });
  });
}

// Each photographer object into HTML elements with classes for styling
function addPhotographerPreview(element) {
  const photographerSection = mainGrid.appendChild(document.createElement('section'));
  photographerSection.classList.add('photographer__section');

  const photographerLinkContainer = photographerSection.appendChild(document.createElement('a'));
  photographerLinkContainer.classList.add('photographer__link-container');
  photographerLinkContainer.setAttribute('href', `page-photographe.html?id=${element.id}`);
  photographerLinkContainer.setAttribute('id', `${element.id}`);
  photographerLinkContainer.setAttribute('aria-label', `${element.name}`);
  photographerLinkContainer.animate([
    { opacity: '0' },
    { opacity: '1' },
  ], 1000, 'ease-in-out');

  const photographerImage = photographerLinkContainer.appendChild(document.createElement('img'));
  photographerImage.classList.add('photographer__img');
  photographerImage.setAttribute('src', `assets/Photographers ID Photos/${element.portrait}`);
  photographerImage.alt = '';

  const photographerName = photographerLinkContainer.appendChild(document.createElement('h2'));
  photographerName.innerHTML = element.name;
  photographerName.classList.add('photographer__name');

  const photographerLocation = photographerSection.appendChild(document.createElement('p'));
  photographerLocation.innerHTML = `${element.city}, ${element.country}`;
  photographerLocation.classList.add('photographer__location');

  const photographerTagline = photographerSection.appendChild(document.createElement('p'));
  photographerTagline.innerHTML = element.tagline;
  photographerTagline.classList.add('photographer__tagline');

  const photographerPrice = photographerSection.appendChild(document.createElement('p'));
  photographerPrice.innerHTML = `${element.price}€/jour`;
  photographerPrice.classList.add('photographer__price');

  const photographerTagList = photographerSection.appendChild(document.createElement('ul'));
  photographerTagList.classList.add('photographer__taglist');

  // Loop through the tags array and push them into a new 'a' tag within an 'li' element
  // A screen reader span tag is added as well
  photographerSection.dataset.tags = element.tags.join(',');
  const navTaglist = document.querySelector('.photographer_tags-list');

  element.tags.forEach((tag) => {
    if (!document.querySelector(`.tag[data-tag-name="${tag}"]`)) {
      const navTag = navTaglist.appendChild(document.createElement('li'));
      navTag.innerText = `#${tag}`;
      navTag.classList.add('tag');
      navTag.dataset.tagName = tag;
    }
    // Ajouter span tag text
    const photographerTag = photographerTagList.appendChild(document.createElement('li'));
    photographerTag.dataset.tagName = tag;
    photographerTag.classList.add('tag');
    const photographerSRtag = photographerTag.appendChild(document.createElement('span'));
    const photographerTagLink = photographerTag.appendChild(document.createElement('a'));
    photographerSRtag.innerText = 'Tag';
    photographerSRtag.classList.add('screen-reader-only');
    photographerTagLink.setAttribute('href', '#');
    photographerTagLink.innerText = `#${tag}`;
  });
}

// Using JSON data to fill the photographer page with the corresponding photographer
function fillPhotographerPage(element) {
    console.log('test');
}

// Executes the addPhotographerPreview function to each 'photographer' object from the JSON file
fetch('fisheye_data.json')
  .then((response) => response.json())
  .then((data) => {
    data.photographers.forEach((photographer) => {
      addPhotographerPreview(photographer);
    });

    const tags = document.querySelectorAll('.tag');
    tags.forEach((tag) => {
      activeTag(tag);
    });
  })
  .catch((err) => (err));

// Making the nav link visible as soon as the user scrolls down
window.addEventListener('scroll', () => {
  const sticky = navLink.offsetTop;
  if (window.pageYOffset >= sticky) {
    navLink.classList.add('sticky');
  }
});

// Making the nav link focus on main content and preventing page reload
navLink.addEventListener('click', (event) => {
  event.preventDefault();
  const focusOnFirstElement = document.querySelector('.photographer__link-container');
  focusOnFirstElement.focus();
});
