/* -- General DOM Selectors -- */
const navButton = document.querySelector('.header__button');
const mainGrid = document.getElementById('main-grid');

// Making the nav button visible as soon as the user scrolls down
window.onscroll = function stick() {
  const sticky = navButton.offsetTop;
  if (window.pageYOffset >= sticky) {
    navButton.classList.add('sticky');
  }
};

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

  const photographerName = photographerContainer.appendChild(document.createElement('p'));
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

  // Loop through the tags array and push them into a new HTML li element
  element.tags.forEach((tag) => {
    const photographerTag = photographerTagList.appendChild(document.createElement('li'));
    photographerTag.innerHTML = `#${tag}`;
    photographerTag.classList.add('tag');
  });
}

// Executes the addPhotographerPreview function to each 'photographer' object from the JSON file
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
