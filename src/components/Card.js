export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getCardElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  // удалить карточку
  _handleDelete() {
    this._buttonDelete.closest('.card').remove();
  }

  // поставить лайк
  _handleLike() {
    this._buttonLike.classList.toggle('card__like-button_active');
  }

  // установить слушатели по клику на корзину, лайк, картинку
  _setEventListeners() {
    this._buttonDelete.addEventListener('click', () => {
      this._handleDelete();
    });

    this._buttonLike.addEventListener('click', () => {
      this._handleLike();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._cardImage.src, this._cardImage.alt);
    });
  }

  // заполнить шаблон карточки данными, добавить слушатели
  generateCard() {
    this._card = this._getCardElement();

    this._cardImage = this._card.querySelector('.card__image');
    this._cardTitle = this._card.querySelector('.card__title');
    this._buttonDelete = this._card.querySelector('.card__delete-button');
    this._buttonLike = this._card.querySelector('.card__like-button');

    this._setEventListeners();

    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;

    return this._card;
  }
}