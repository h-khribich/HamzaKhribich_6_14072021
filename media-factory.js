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
        const mediaVideo = mediaContainer.appendChild(document.createElement('video'));
        mediaVideo.setAttribute('controls', '');
        mediaVideo.classList.add('media', 'media__video');
        const videoSource = mediaVideo.appendChild(document.createElement('source'));
        videoSource.setAttribute('src', `assets/${element.photographerId}/${element.video}`);
        videoSource.setAttribute('type', 'video/mp4');
      }
      if (element.image) {
        const mediaImage = mediaContainer.appendChild(document.createElement('img'));
        mediaImage.setAttribute('src', `assets/${element.photographerId}/${element.image}`);
        mediaImage.setAttribute('alt', `${element['alt-text']}`);
        mediaImage.classList.add('media');
      }
      // Media description container, title and likes
      const mediaDescription = mediaContainer.appendChild(document.createElement('div'));
      mediaDescription.classList.add('media__description');

      const mediaTitle = document.createElement('p');
      mediaTitle.innerText = `${element.title}`;
      mediaTitle.classList.add('media__title');

      const mediaLikes = document.createElement('span');
      mediaLikes.innerHTML = `${element.likes} <i class="far fa-heart icon"></i>`;
      mediaLikes.classList.add('media__likes');

      mediaDescription.append(mediaTitle, mediaLikes);

      // Add the filled object to the HTML body
      mediaGallery.appendChild(mediaContainer);

      // Load effect animation
      mediaContainer.animate([
        { opacity: '0' },
        { opacity: '1' },
      ], 1500, 'ease-in-out');
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
