import MediaFactory from './MediaFactory.js';

/* -- General & DOM Selectors -- */
const params = (new URL(window.location)).searchParams;
const pageId = parseInt(params.get('id'), 10);
const mediaGallery = document.getElementById('media-gallery');
let totalLikes = 0;
localStorage.setItem('pageId', pageId);

// Photographer selectors
const photographerName = document.querySelector('.name-block__name');
const photographerLocation = document.querySelector('.name-block__location');
const photographerTagline = document.querySelector('.name-block__tagline');
const photographerTagList = document.querySelector('.name-block__taglist');
const photographerImage = document.querySelector('.photographer__img');
const photographerPrice = document.getElementById('price');
const photographerTotalLikes = document.getElementById('total-likes');

// 'Order-by' selectors
const filterTrigger = document.getElementById('order-by__trigger');
const filterDropdown = document.querySelector('.order-by__options');
const filterContainer = document.getElementById('order-by__container');
const filterArrow = document.getElementById('order-by__arrow');
const filterSelected = document.getElementById('order-by__selected');
const filterOptions = document.querySelectorAll('.option');

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

/* -- 'Order-by' -- */
// Options closing animation
function openAndCloseDropdown() {
  // Opening dropdown
  if (!filterDropdown.classList.contains('open')) {
    filterDropdown.classList.toggle('open');
    filterTrigger.setAttribute('aria-expanded', 'true');
    // Arrow animation
    filterArrow.animate([
      { transform: 'rotate(180deg)' },
    ], { duration: 300, fill: 'forwards' });
  } else {
    // Closing dropdown
    filterArrow.animate([
      { transform: 'rotate(0deg)' },
    ], { duration: 300, fill: 'forwards' });

    const close = function close() {
      filterDropdown.classList.toggle('open');
      filterTrigger.setAttribute('aria-expanded', 'false');
    };
    filterDropdown.animate([
      { opacity: '0', transform: 'translateY(-25px)' },
    ], 360, 'ease-in-out');
    setTimeout(close, 300);
  }
}

// Dropdown click event
filterTrigger.addEventListener('click', (e) => {
  e.preventDefault();
  openAndCloseDropdown();
});

// Closing dropdown if click occurs anywhere else on page
window.addEventListener('click', async (e) => {
  if (filterDropdown.classList.contains('open') && !filterContainer.contains(e.target)) {
    openAndCloseDropdown();
  }
});

// Filtering
filterOptions.forEach((option) => {
  if (option.getAttribute('aria-selected') === 'true') {
    filterSelected.innerText = option.innerText;
    option.classList.add('hidden');
  }

  option.addEventListener('click', (e) => {
    e.preventDefault();
    const filterLastSelected = document.querySelector('.order-by__options > .hidden');

    // Unselect last selected element
    filterLastSelected.setAttribute('aria-selected', 'false');
    filterLastSelected.classList.remove('hidden');

    // Clicked element becomes new slected element
    option.classList.add('hidden');
    option.setAttribute('aria-selected', 'true');
    filterSelected.innerText = option.innerText;
  });
});

/* -- Likes and price -- */
// Photographer's total likes and price per day
function totalLikesAndPrice(element) {
  photographerPrice.innerText = `${element.price} € / jour`;
  photographerTotalLikes.innerHTML = `${totalLikes} <i class="fas fa-heart"></i>`;
}

// Heart animation and total likes incrementation
function animateAndIncrementLikes(elements) {
  elements.forEach((element) => {
    element.addEventListener('click', () => {
      element.classList.toggle('empty');
      element.classList.toggle('full');

      // If the heart is activated, increment total likes, else, decrement
      totalLikes = element.classList.contains('full') ? totalLikes += 1 : totalLikes -= 1;
      photographerTotalLikes.innerHTML = `${totalLikes} <i class='fas fa-heart'></i>`;
    });
  });
}

// The photographer ID enables us to load the data for similar ID JSON object only
fetch('fisheye_data.json')
  .then((response) => response.json())
  .then((data) => {
    const photographerMedia = data.media.filter((m) => m.photographerId === pageId);
    // Calculating number of photographer total likes
    photographerMedia.forEach((media) => {
      totalLikes += media.likes;
    });
    // Filling banner and total likes elements
    const photographer = data.photographers.find((p) => p.id === pageId);
    fillPhotographerBanner(photographer);
    totalLikesAndPrice(photographer);

    // Creating individual media elements
    photographerMedia.forEach((media) => {
      const newMedia = MediaFactory.createMedia(media);
      mediaGallery.insertAdjacentHTML('beforeend', newMedia.display());
    });

    // Total likes incrementation and animation function
    const heartIcons = document.querySelectorAll('.icon');
    animateAndIncrementLikes(heartIcons);
  })
  .catch((err) => (err));
