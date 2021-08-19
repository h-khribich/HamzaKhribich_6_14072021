export default class Image {
  constructor(media) {
    Object.assign(this, media);
  }

  display() {
    return `<div class="media__container" data-tag-name="${this.tags}">
              <img src="assets/${this.photographerId}/${this.image}" alt="${this['alt-text']}" class="media">
              <div class="media__description">
                <p class="media__title">${this.title}</p>
                <div class="media__likes" aria-label="likes">
                  <span class="likes">
                    ${parseInt(this.likes, 10)}
                  </span>
                  <a class="heart">
                    <i class="fas fa-heart icon empty" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>`;
  }
}
