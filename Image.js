export default class Image {
  constructor(media) {
    Object.assign(this, media);
  }

  display() {
    return `<div class="media__container" data-tag-name="${this.tags}" aria-haspopup="dialog">
              <img src="assets/${this.photographerId}/${this.image}" alt="${this['alt-text']}" data-id="${this.id}" class="media" tabindex="0" role="button">
              <div class="media__description">
                <p class="media__title">${this.title}</p>
                <div class="media__likes" aria-label="likes">
                  <span class="likes">
                    ${this.likes}
                  </span>
                  <a class="heart" tabindex="0">
                    <i class="fas fa-heart icon empty" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>`;
  }
}
