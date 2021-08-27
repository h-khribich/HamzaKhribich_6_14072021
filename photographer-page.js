import MediaFactory from './MediaFactory.js';

/* -- General & DOM Selectors -- */
const params = (new URL(window.location)).searchParams;
const pageId = parseInt(params.get('id'), 10);
const pageWrapper = document.getElementById('page-wrapper');
const mediaGallery = document.getElementById('media-gallery');

let activeTagsArray = [];
let nbOfLikes = 0;
let totalLikes = 0;
let chosenOption = [];
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

// Lightbox selectors
const lightboxContainer = document.querySelector('.lightbox-container');
const lightbox = document.getElementById('lightbox');
const closeLightbox = document.getElementById('lightbox__close-lightbox');
const lightboxMediaContainer = document.getElementById('lightbox__media-container');
const lightboxLeftArrow = document.getElementById('lightbox__left-arrow');
const lightboxRightArrow = document.getElementById('lightbox__right-arrow');
let selectedMedia = '';

/* -- PHOTOGRAPHER BANNER -- */
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
    photographerTagLink.setAttribute('href', '#');
    photographerTagLink.classList.add('tag');
    photographerTagLink.dataset.tagName = tag;
    photographerTagLink.innerText = `#${tag}`;
  });
}

/* -- 'ORDER-BY' -- */
// Options closing animation
function openAndCloseDropdown() {
  // Opening dropdown
  if (!filterDropdown.classList.contains('open')) {
    filterDropdown.classList.toggle('open');
    filterTrigger.setAttribute('aria-expanded', 'true');
    // Arrow animation
    filterArrow.animate([
      { transform: 'rotate(0deg)' },
    ], { duration: 300, fill: 'forwards' });
  } else {
    // Closing dropdown
    filterArrow.animate([
      { transform: 'rotate(180deg)' },
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
window.addEventListener('click', (e) => {
  if (filterDropdown.classList.contains('open') && !filterContainer.contains(e.target)) {
    openAndCloseDropdown();
  }
});

// Showing selected option in dropdown
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

/* -- LIKES AND PRICE -- */
// Photographer's total likes and price per day
function totalLikesAndPrice(element) {
  photographerPrice.innerText = `${element.price} € / jour`;
  photographerTotalLikes.innerHTML = `${totalLikes} <i class="fas fa-heart"></i>`;
}

// Heart animation and total likes incrementation
function animateAndIncrementLikes() {
  const heartIcons = document.querySelectorAll('.heart');
  heartIcons.forEach((icon) => {
    icon.addEventListener('click', () => {
      icon.firstElementChild.classList.toggle('empty');
      icon.firstElementChild.classList.toggle('full');

      // If the heart is activated, increment likes and total likes, else, decrement
      const likes = icon.previousElementSibling;
      nbOfLikes = parseInt(icon.previousElementSibling.innerText, 10);
      nbOfLikes = icon.firstElementChild.classList.contains('full') ? nbOfLikes += 1 : nbOfLikes -= 1;
      likes.innerText = `${nbOfLikes}`;

      totalLikes = icon.firstElementChild.classList.contains('full') ? totalLikes += 1 : totalLikes -= 1;
      photographerTotalLikes.innerHTML = `${totalLikes} <i class='fas fa-heart'></i>`;
    });
  });
}

/* -- TAG FILTERING -- */
function filterByTag(element) {
  element.blur();

  // Toggling 'active-tag' and updating active tags array
  if (element.classList.contains('active-tag')) {
    element.classList.remove('active-tag');
    activeTagsArray = activeTagsArray.filter((tag) => !(tag === element.dataset.tagName));
  } else {
    element.classList.add('active-tag');
    activeTagsArray.push(element.dataset.tagName);
  }

  const mediaContainer = document.querySelectorAll('.media__container');
  // If no tags are active, all is displayed
  if (activeTagsArray.length <= 0) {
    mediaContainer.forEach((elementToDisplay) => {
      elementToDisplay.classList.remove('hidden');
    });
    return;
  }

  // Media are hidden, only to be shown when a relevant tag has been selected
  mediaContainer.forEach((media) => {
    media.classList.add('hidden');
  });

  // If a tag has a sister tag in the active array, his parent is displayed
  activeTagsArray.forEach((tag) => {
    const elementsToDisplay = document.querySelectorAll(`div[data-tag-name="${tag}"]`);
    elementsToDisplay.forEach((elementToDisplay) => {
      elementToDisplay.classList.remove('hidden');
      elementToDisplay.animate([
        { opacity: '0' },

        { opacity: '1' },
      ], 400, 'ease-in-out', 'forwards');
    });
  });
}

// Lighbox relevant media display
function lightboxMedia(element) {
  let result = '';
  if (element.image) {
    result = `<img src="assets/${element.photographerId}/${element.image}" alt="${element['alt-text']}" class="lightbox__media">
              <p class="lightbox__description">${element.title}</p>`;
  } else if (element.video) {
    result = `<video controls="" class="lightbox__media">
                <source src="assets/${element.photographerId}/${element.video}" type="video/mp4">
              </video>
              <p class="lightbox__description">${element.title}</p>`;
  }
  lightboxMediaContainer.innerHTML = result;
}

function lightboxClickEvent() {
  // Making lightbox appear and hiding page wrapper
  const mediaImage = document.querySelectorAll('.media__container img, .media__container video');
  mediaImage.forEach((image) => {
    image.addEventListener('click', () => {
      lightboxContainer.classList.remove('hidden');
      lightboxContainer.setAttribute('aria-expanded', 'true');
      lightboxContainer.dataset.status = 'open';
      lightboxContainer.animate([
        { opacity: '0' },

        { opacity: '1' },
      ], 300, 'ease-in-out');
      pageWrapper.setAttribute('aria-hidden', 'true');
      pageWrapper.style.position = 'fixed';

      // Finding and displaying relevant media
      selectedMedia = chosenOption.find((m) => m.id === parseInt(image.dataset.id, 10));
      lightboxMedia(selectedMedia);

      // Bringing focus away from background elements
      lightboxLeftArrow.focus();
      lightboxLeftArrow.blur();

      // Lightbox navigation
      if (lightboxContainer.dataset.status === 'open') {
        // Arrow and escape key navigation
        document.addEventListener('keydown', (event) => {
          const isEscapePressed = event.key === 'Escape' || event.code === 'Escape';
          if (isEscapePressed) {
            closeLightbox.click();
          }
          // Left arrow
          const isLeftArrowPressed = event.key === 'ArrowLeft' || event.code === 'ArrowLeft';
          if (isLeftArrowPressed) {
            lightboxLeftArrow.click();
          }
          // Right arrow
          const isRightArrowPressed = event.key === 'ArrowRight' || event.code === 'ArrowRight';
          if (isRightArrowPressed) {
            lightboxRightArrow.click();
          }
        });
      }
    });
  });

  // Left arrow event
  lightboxLeftArrow.addEventListener('click', () => {
    for (let i = chosenOption.length - 1; i >= 0; i -= 1) {
      if (chosenOption[i].id === selectedMedia.id) {
        if (i === 0) {
          selectedMedia = chosenOption[chosenOption.length - 1];
        } else {
          selectedMedia = chosenOption[i -= 1];
        }
      }
    }
    lightboxMedia(selectedMedia);
  });

  // Right arrow
  lightboxRightArrow.addEventListener('click', () => {
    for (let i = 0; i <= chosenOption.length - 1; i += 1) {
      if (chosenOption[i].id === selectedMedia.id) {
        if (i === chosenOption.length - 1) {
          [selectedMedia] = chosenOption;
        } else {
          selectedMedia = chosenOption[i += 1];
        }
      }
    }
    lightboxMedia(selectedMedia);
  });

  // Closing the lightbox
  closeLightbox.addEventListener('click', () => {
    pageWrapper.animate([
      { opacity: '0' },

      { opacity: '1' },
    ], 300, 'ease-in-out');
    lightboxContainer.classList.add('hidden');
    lightboxContainer.setAttribute('aria-expanded', 'false');
    lightboxContainer.dataset.status = 'closed';
    pageWrapper.removeAttribute('aria-hidden', 'true');
    pageWrapper.style.position = 'relative';
  });

  // Trapping focus inside the lightbox for accessibility
  const lightboxFocusableElements = 'div > button';
  const firstFocusableElement = lightbox.querySelectorAll(lightboxFocusableElements)[0];
  const focusableContent = lightbox.querySelectorAll(lightboxFocusableElements);
  const lastFocusableElement = focusableContent[focusableContent.length - 1];

  document.addEventListener('keydown', (event) => {
    const tabIsNotPressed = null;
    const isEscapePressed = event.key === 'Escape' || event.code === 'Escape';
    const tabIsPressed = event.key === 'Tab' || event.code === 'Tab';
    if (!tabIsPressed) {
      if (isEscapePressed) {
        closeLightbox.click();
      }
      return false;
    }
    // In case of Shift, if the active element is the first, loop back and vice-versa
    if (event.shiftKey) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        event.preventDefault();
      }
    // If pressed key is Tab
    } else if (document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus();
      event.preventDefault();
    }
    return tabIsNotPressed;
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

    // Search by relevant tags
    const tags = document.querySelectorAll('.tag');
    tags.forEach((tag) => {
      tag.addEventListener('click', (e) => {
        e.preventDefault();
        filterByTag(tag);
      });
    });

    /* Each 'sorting' code block enables us to copy the original array
    and create a new element upon which we will call the media factory function
    after having erased the previous HTML sorting
    */
    // Sorting by title
    const sortedByTitle = [...photographerMedia].sort((a, b) => a.title.toUpperCase()
      .localeCompare(b.title.toUpperCase()));

    // Sorting by date
    const sortedByDate = [...photographerMedia].sort((a, b) => new Date(b.date)
     - new Date(a.date));

    // Sorting by popularity
    const sortedByPopularity = [...photographerMedia].sort((a, b) => b.likes - a.likes);

    // Media are sorted by popularity by default
    chosenOption = sortedByPopularity;
    chosenOption.forEach((media) => {
      const newMedia = MediaFactory.createMedia(media);
      mediaGallery.insertAdjacentHTML('beforeend', newMedia.display());
    });

    // Likes incrementation and animation function
    animateAndIncrementLikes();

    // Sorting event listeners
    filterOptions.forEach((option) => {
      option.addEventListener('click', () => {
        // Choosing the correct parameter
        if (option.dataset.value === 'titre') {
          chosenOption = sortedByTitle;
          setTimeout(1000, openAndCloseDropdown());
        } else if (option.dataset.value === 'date') {
          chosenOption = sortedByDate;
          setTimeout(1000, openAndCloseDropdown());
        } else if (option.dataset.value === 'popularite') {
          chosenOption = sortedByPopularity;
          setTimeout(1000, openAndCloseDropdown());
        }
        // Clear previous HTML and Display relevant sorted element
        mediaGallery.innerHTML = '';
        totalLikes = 0;
        chosenOption.forEach((media) => {
          const newMedia = MediaFactory.createMedia(media);
          mediaGallery.insertAdjacentHTML('beforeend', newMedia.display());
          // Clearing previous session's likes
          totalLikes += media.likes;
          photographerTotalLikes.innerHTML = `${totalLikes} <i class='fas fa-heart'></i>`;
          // Functions have to be called again as elements were redisplayed on sorting
          lightboxClickEvent();
        });
        animateAndIncrementLikes();
      });
    });
    // Displaying the lightbox
    lightboxClickEvent();
  })
  .catch((err) => (err));
