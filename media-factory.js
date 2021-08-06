/* -- General & DOM Selectors -- */
import pageId from './photographer-page.js';

const photographerMedia = [];

// Media factory function
function mediaFactory(type) {
  if (type === 'video') {
    console.log(type);
  }
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
      // Accessing type of media through key
      let mediaType = '';
      Object.keys(media).forEach((key) => {
        if ((key === 'image') || (key === 'video')) {
          mediaType = key;
        }
      });

      // Calling factory function with media type as a parameter
      mediaFactory(mediaType);
    });
  })
  .catch((err) => err);
