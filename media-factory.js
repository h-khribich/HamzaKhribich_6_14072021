/* -- General & DOM Selectors -- */
const pageId = parseInt(localStorage.getItem('pageId'), 10);
const mediaGallery = document.getElementById('media-gallery');
const photographerMedia = [];

// Media factory function
function mediaFactory(element) {
  return {
    createMedia: function createMedia() {
      const mediaContainer = document.createElement('div');
      mediaContainer.classList.add('media__container');
      // Depending on the type of media, a different HTML element is created
      if (element.video) {
        const placeholder = document.createElement('p');
        placeholder.innerText = 'video placeholder';
        mediaContainer.appendChild(placeholder);
      }
      if (element.image) {
        const mediaImage = mediaContainer.appendChild(document.createElement('img'));
        mediaImage.setAttribute('src', `assets/${element.photographerId}/${element.image}`);
        mediaImage.setAttribute('alt', `${element['alt-text']}`);
        mediaImage.classList.add('media', 'media__image');
        // Append element to container
        mediaContainer.appendChild(mediaImage);
      }
      // Media description container, title and likes
      const mediaDescription = mediaContainer.appendChild(document.createElement('div'));
      mediaDescription.classList.add('media__description');

      const mediaTitle = document.createElement('p');
      mediaTitle.innerText = `${element.title}`;
      mediaTitle.classList.add('media__title');

      const mediaLikes = document.createElement('span');
      mediaLikes.innerText = `${element.likes}`;
      mediaLikes.classList.add('media__likes');

      mediaDescription.append(mediaTitle, mediaLikes);

      // Add the filled object to the HTML body
      mediaGallery.appendChild(mediaContainer);
    },
  };
}

fetch('fisheye_data.json')
  .then((response) => response.json())
  .then((data) => {
    // Push all of relevant photographer media into an array
    data.media.forEach((element) => {
      if ((element.photographerId) === pageId) {
        photographerMedia.push(element);
      }
    });

    photographerMedia.forEach((media) => {
      const newMedia = mediaFactory(media);
      newMedia.createMedia();
    });
  })
  .catch((err) => err);

// Accessing type of media through key
/*
let mediaType = '';
Object.keys(media).forEach((key) => {
  if ((key === 'image') || (key === 'video')) {
    mediaType = key;
  }
});
*/
