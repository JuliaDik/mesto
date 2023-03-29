export default class Card {
  constructor(item, templateSelector, handleImageCardClick) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
    this._handleImageCardClick = handleImageCardClick;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  // поставить лайк
  _handleLike() {
    this._buttonLike.classList.toggle('card__like-button_active');
  }

  // удалить карточку
  _handleDelete() {
    this._buttonDelete.closest('.card').remove();
  }

  // установить слушатели по клику на лайк, корзину-удалить, картинку
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLike();
    });

    this._buttonDelete.addEventListener('click', () => {
      this._handleDelete();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleImageCardClick(this._name, this._link);
    });
  }

  // заполнить шаблон карточки данными, добавить слушатели
  generateCard() {
    this._element = this._getElement();

    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._buttonLike = this._element.querySelector('.card__like-button');
    this._buttonDelete = this._element.querySelector('.card__delete-button');

    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    return this._element;
  }
}
