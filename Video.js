export default class Video {
  constructor(media) {
    Object.assign(this, media);
  }

  display() {
    return `<div class="media__container">
              <video controls="" class="media media__video">
                <source src="assets/${this.photographerId}/${this.video}" type="video/mp4">
              </video>
              <div class="media__description">
                <p class="media__title">${this.title}</p>
                <div class="media__likes" aria-label="likes">
                  ${this.likes}
                  <a class="heart">
                    <i class="fas fa-heart icon empty" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>`;
  }
}
