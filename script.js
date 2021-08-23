/* -- General & DOM Selectors -- */
const navLink = document.querySelector('.header__link');
const mainGrid = document.getElementById('main-grid');
let activeTagsArray = [];

// Toggling the 'active-tag' and filtering relevant photographers
function filterPhotographers(element) {
  element.addEventListener('click', () => {
    const allSimilarTags = document.querySelectorAll(`.tag[data-tag-name="${element.dataset.tagName}"]`);
    element.blur();

    // If a tag is active, all of its siblings (i.e duplicates) become active as well
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

    // If no tag has been selected, show all photographers
    if (activeTagsArray.length <= 0) {
      const elementsToDisplay = document.querySelectorAll('section');
      elementsToDisplay.forEach((elementToDisplay) => {
        elementToDisplay.classList.remove('hidden');
      });
      return;
    }

    // Sections are hidden, only to be shown when a relevant tag has been selected
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      section.classList.add('hidden');
    });

    // If a tag has a sister tag in the active array, his section parent is displayed
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
  photographerLinkContainer.setAttribute('href', `page-photographe.html?id=${element.id}&name=${element.name}`);
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
  photographerName.innerText = element.name;
  photographerName.classList.add('photographer__name');

  const photographerLocation = photographerSection.appendChild(document.createElement('p'));
  photographerLocation.innerText = `${element.city}, ${element.country}`;
  photographerLocation.classList.add('photographer__location');

  const photographerTagline = photographerSection.appendChild(document.createElement('p'));
  photographerTagline.innerText = element.tagline;
  photographerTagline.classList.add('photographer__tagline');

  const photographerPrice = photographerSection.appendChild(document.createElement('p'));
  photographerPrice.innerText = `${element.price}€/jour`;
  photographerPrice.classList.add('photographer__price');

  const photographerTagList = photographerSection.appendChild(document.createElement('ul'));
  photographerTagList.classList.add('photographer__taglist');

  // Loop through the tags array and create HTML elements accordingly
  // A screen reader span tag is added as well for accessibility
  photographerSection.dataset.tags = element.tags.join(',');
  const navTaglist = document.querySelector('.photographer_tags-list');

  element.tags.forEach((tag) => {
    // Prevent nav tag from duplicating
    if (!document.querySelector(`.tag[data-tag-name="${tag}"]`)) {
      const navTag = navTaglist.appendChild(document.createElement('li'));
      const navTagSpan = navTag.appendChild(document.createElement('span'));
      navTagSpan.classList.add('screen-reader-only');
      navTagSpan.innerText = 'Tag';
      const navTagLink = navTag.appendChild(document.createElement('a'));
      navTagLink.setAttribute('href', '#');
      navTagLink.innerText = `#${tag}`;
      navTagLink.classList.add('tag');
      navTagLink.dataset.tagName = tag;
    }
    // Create relevant number of tags according to JSON data
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

/* -- Fetching JSON data to fill the page -- */
fetch('fisheye_data.json')
  .then((response) => response.json())
  .then((data) => {
    data.photographers.forEach((photographer) => {
      addPhotographerPreview(photographer);
    });

    const tags = document.querySelectorAll('.tag');
    tags.forEach((tag) => {
      filterPhotographers(tag);
    });
  })
  .catch((err) => (err));

/* -- Skip to content button -- */
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
