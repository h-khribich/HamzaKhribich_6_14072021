/* -- General DOM Selectors -- */
const navLink = document.querySelector('.header__link');
const mainGrid = document.getElementById('main-grid');
const activeTagsArray = [];

// Toggling the 'active-tag' CSS class
function activeTag(element) {
  element.addEventListener('click', () => {
    if (element.classList.contains('active-tag')) {
      element.classList.remove('active-tag');
      element.blur();
      activeTagsArray.pop();
    } else {
      element.classList.add('active-tag');
      element.blur();
      activeTagsArray.push(element.innerHTML);
    }
  });
}

// Sorting relevant photographers according to tag click
// if tagList[i] equals activeTagsArray[i]; result++; à la fin, si result === 0; display none

// Each photographer object into HTML elements with classes for styling
function addPhotographerPreview(element) {
  const photographerSection = mainGrid.appendChild(document.createElement('section'));
  photographerSection.classList.add('photographer__section');

  const photographerLinkContainer = photographerSection.appendChild(document.createElement('a'));
  photographerLinkContainer.classList.add('photographer__container');
  photographerLinkContainer.setAttribute('href', '');
  photographerLinkContainer.animate([
    { opacity: '0' },
    { opacity: '1' },
  ], 1000, 'ease-in-out');

  const photographerImage = photographerLinkContainer.appendChild(document.createElement('img'));
  photographerImage.classList.add('photographer__img');
  photographerImage.setAttribute('src', `assets/Photographers ID Photos/${element.portrait}`);

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
  element.tags.forEach((tag) => {
    const photographerTag = photographerTagList.appendChild(document.createElement('li'));
    const photographerTagLink = photographerTag.appendChild(document.createElement('a'));
    const photographerSRtag = photographerTag.appendChild(document.createElement('span'));
    photographerSRtag.innerHTML = 'Tag';
    photographerSRtag.classList.add('screen-reader-only');
    photographerTagLink.setAttribute('href', '#');
    photographerTagLink.innerHTML = `#${tag}`;
    photographerTagLink.classList.add('tag');
  });
}

// Executes the addPhotographerPreview function to each 'photographer' object from the JSON file
fetch('fisheye_data.json')
  .then((response) => response.json())
  .then((data) => {
    data.photographers.forEach((photographer) => {
      addPhotographerPreview(photographer);
    });

    const tags = document.querySelectorAll('.tag');
    const sections = document.querySelectorAll('.photographer__section');

    tags.forEach((tag) => {
      activeTag(tag);
      tag.addEventListener('click', () => {
        sections.forEach((section) => {
          const tagList = section.getElementsByClassName('tag');
          const tagListArray = Array.from(tagList);
                // EFFECTUER TESTS PLUS SIMPLES
          if (activeTagsArray >= 1) {
            let result = false;
            for (let i = 0; i < activeTagsArray.length; i + 1) {
              if (tagListArray.includes(activeTagsArray[i])) {
                result = true;
              }
            }
            if (result === 0) {
              section.classList.add('hidden');
            }
          }
        });
      });
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
  // mainGrid.focus();
});
