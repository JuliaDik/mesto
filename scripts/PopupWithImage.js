import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(cardImageSrc, cardImageAlt) {
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');

    this._image.src = cardImageSrc;
    this._image.alt = cardImageAlt;
    this._caption.textContent = cardImageAlt;

    super.open();
  }
}
