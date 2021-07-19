/* -- General DOM Selectors -- */
const navButton = document.querySelector('.header__button');
const mainGrid = document.getElementById('main-grid');

// Making the button visible as soon as the user scrolls down
window.onscroll = function stick() {
  const sticky = navButton.offsetTop;
  if (window.pageYOffset >= sticky) {
    navButton.classList.add('sticky');
  }
};

// Each photographer object into HTML elements with classes for styling
function addPhotographerPreview(element) {
  const photographerContainer = mainGrid.appendChild(document.createElement('section'));
  photographerContainer.classList.add('photographer__section');

  const photographerImage = photographerContainer.appendChild(document.createElement('img'));
  photographerImage.classList.add('photographer__image');

  const photographerName = photographerContainer.appendChild(document.createElement('p'));
  photographerName.innerHTML = element.name;

  const photographerLocation = photographerContainer.appendChild(document.createElement('p'));
  photographerLocation.innerHTML = `${element.city}, ${element.country}`;

  const photographerTagline = photographerContainer.appendChild(document.createElement('p'));
  photographerTagline.innerHTML = element.tagline;

  const photographerPrice = photographerContainer.appendChild(document.createElement('p'));
  photographerPrice.innerHTML = `${element.price}€/jour`;
  photographerPrice.classList.add('photographer__price');

  const photographerTagList = photographerContainer.appendChild(document.createElement('ul'));
  photographerTagList.style.display = 'flex';

  element.tags.forEach((tag) => {
    const photographerTag = photographerTagList.appendChild(document.createElement('li'));
    photographerTag.innerHTML = `#${tag}`;
    photographerTag.classList.add('tag');
  });
}

// The fetch API will enable loading the data from the JSON file as soon as the page loads
fetch('fisheye_data.json')
  .then((response) => {
      return response.json()
  })
  .then((data) => {
    data.photographers.forEach((photographer) => {
      addPhotographerPreview(photographer);
    });
  })
  .catch(function (err) {
    console.log(err);
  });

/*
 console.log(data['media'][2].title);
    data.media.forEach(element => {
      const foo = document.createElement('p');
      foo.innerText = element.title;
      document.getElementById('test').appendChild(foo);
    });
*/