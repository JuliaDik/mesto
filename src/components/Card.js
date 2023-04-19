export default class Card {
  constructor(cardData, userId, templateSelector, handleCardClick, { handleLikeClick }) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._cardId = cardData._id;
    this._ownerId = cardData.owner._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
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
  putLike(likesArray) {
    this._buttonLike.classList.add('card__like-button_active');
    this._likeCounter.textContent = likesArray.length;
    this._isLiked = true;
  }

  // удалить лайк
  deleteLike(likesArray) {
    this._buttonLike.classList.remove('card__like-button_active');
    this._likeCounter.textContent = likesArray.length;
    this._isLiked = false;
  }

  _isLiked() {
    if (this._likes.some((item) => item._id === this._ownerId)) {
      this._buttonLike.classList.add('card__like-button_active');
      this._isLiked = true;
    } else {
      this._isLiked = false;
    }
  }

  // установить слушатели по клику на корзину, лайк, картинку
  _setEventListeners() {
    this._buttonDelete.addEventListener('click', () => {
      this._handleDelete();
    });

    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick(this._cardId, this._isLiked);
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
    this._likeCounter = this._card.querySelector('.card__like-counter');
    this._likeCounter.textContent = this._likes.length;

    this._setEventListeners();

    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;

    return this._card;
  }
}