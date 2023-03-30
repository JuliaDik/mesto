import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  open(cardImage) {
    this._image.src = cardImage.src;
    this._image.alt = cardImage.alt;
    this._caption.textContent = cardImage.alt;
    super.open();
  }
}
