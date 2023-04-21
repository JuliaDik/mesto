export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // для отрисовки массива карточек с сервера
  renderItems(items) {
    items.forEach((item) => {
      this._container.append(this._renderer(item));
    });
  }

  // для добавления карточки через форму
  addItem(element) {
    this._container.prepend(element);
  }
}