export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    [].concat(items).forEach((item) => {
      this._container.prepend(this._renderer(item));
    });
  }
}