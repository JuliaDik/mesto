import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  open(cardImageSrc, cardImageAlt) {
    this._image.src = cardImageSrc;
    this._image.alt = cardImageAlt;
    this._caption.textContent = cardImageAlt;

    super.open();
  }
}
