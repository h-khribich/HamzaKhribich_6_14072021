export default class Video {
  constructor(media) {
    Object.assign(this, media);
  }

  display() {
    return `<div class="media__container" data-tag-name="${this.tags}" aria-haspopup="dialog">
              <video preload="metadata" data-id="${this.id}" class="media media__video" tabindex="0" role="button">
                <source src="assets/${this.photographerId}/${this.video}#t=0.1" type="video/mp4">
              </video>
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
