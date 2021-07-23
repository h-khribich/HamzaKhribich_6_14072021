/* -- General DOM Selectors -- */
const navLink = document.querySelector('.header__link');
const mainGrid = document.getElementById('main-grid');

mainGrid.addEventListener('DOMContentLoaded', (event) => {
  if (event.target.classList.contains('tag')) {
    event.target.addEventListener('click', () => {
      alert('test');
    });
  }
});

// Each photographer object into HTML elements with classes for styling
function addPhotographerPreview(element) {
  const photographerSection = mainGrid.appendChild(document.createElement('section'));
  photographerSection.classList.add('photographer__section');

  const photographerContainer = photographerSection.appendChild(document.createElement('a'));
  photographerContainer.classList.add('photographer__container');
  photographerContainer.setAttribute('href', '');

  const photographerImage = photographerContainer.appendChild(document.createElement('img'));
  photographerImage.classList.add('photographer__img');
  photographerImage.setAttribute('src', `assets/Photographers ID Photos/${element.portrait}`);

  const photographerName = photographerContainer.appendChild(document.createElement('h2'));
  photographerName.innerHTML = element.name;
  photographerName.classList.add('photographer__name');

  const photographerLocation = photographerContainer.appendChild(document.createElement('p'));
  photographerLocation.innerHTML = `${element.city}, ${element.country}`;
  photographerLocation.classList.add('photographer__location');

  const photographerTagline = photographerContainer.appendChild(document.createElement('p'));
  photographerTagline.innerHTML = element.tagline;
  photographerTagline.classList.add('photographer__tagline');

  const photographerPrice = photographerContainer.appendChild(document.createElement('p'));
  photographerPrice.innerHTML = `${element.price}€/jour`;
  photographerPrice.classList.add('photographer__price');

  const photographerTagList = photographerContainer.appendChild(document.createElement('ul'));
  photographerTagList.classList.add('photographer__taglist');
  // Loop through the tags array and push them into a new 'a' tag within an 'li' element
  element.tags.forEach((tag) => {
    const photographerTag = photographerTagList.appendChild(document.createElement('li'));
    const photographerTagLink = photographerTag.appendChild(document.createElement('a'));
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

const activeTagsArray = [];

const tags = document.getElementsByClassName('tag');
const tagsArray = Array.from(tags);

document.addEventListener('DOMContentLoaded', () => {
  tagsArray.forEach((tag) => {
    tag.addEventListener('click', () => {
      alert('test');
    });
  });
});

// Toggling the 'active-tag' CSS class
tagsArray.forEach((tag) => {
  tag.addEventListener('click', () => {
    if (tag.classList.contains('active-tag')) {
      tag.classList.remove('active-tag');
      tag.blur();
      activeTagsArray.pop();
    } else {
      tag.classList.add('active-tag');
      activeTagsArray.push(tag);
    }
  });
});

console.log(document.querySelectorAll('.tag'));