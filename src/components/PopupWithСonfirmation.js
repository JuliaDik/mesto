import Popup from './Popup.js';

export default class PopupWithСonfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  handleSubmit(action) {
    this._submitHandler = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler();
    });
  }
}