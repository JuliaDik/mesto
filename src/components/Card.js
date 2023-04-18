export default class Card {
  constructor(cardData, templateSelector, handleCardClick, { handleLikeClick }) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._cardId = cardData._id;
    this._ownerId = cardData.owner._id;
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
    this.isLiked = true;
  }

  // удалить лайк
  deleteLike(likesArray) {
    this._buttonLike.classList.remove('card__like-button_active');
    this._likeCounter.textContent = likesArray.length;
    this.isLiked = false;
  }

  // проверить, стоит ли мой лайк
  isLiked() {
    if (this._likes.some((like) => like._id === this._ownerId)) {
      return true;
    } else {
      return false;
    }
  }

  // установить слушатели по клику на корзину, лайк, картинку
  _setEventListeners() {
    this._buttonDelete.addEventListener('click', () => {
      this._handleDelete();
    });

    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick(this._cardId, this.isLiked);
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