import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  open(imageSrc, imageAlt) {
    this._image.src = imageSrc;
    this._image.alt = imageAlt;
    this._caption.textContent = imageAlt;

    super.open();
  }
}
