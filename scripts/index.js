// кнопки
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');

// попапы
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupCard = document.querySelector('.popup_type_image');
const popupCardImage = document.querySelector('.popup__image');
const popupCardCaption = document.querySelector('.popup__caption');

// профиль
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

// карточки
const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template');

// форма редактирования профиля
const profileForm = document.forms['profile-form'];
const inputName = document.querySelector('.popup__input_type_name');
const inputOccupation = document.querySelector('.popup__input_type_occupation');

// форма добавления карточки
const cardForm = document.forms['card-form'];
const inputTitle = document.querySelector('.popup__input_type_title');
const inputLink = document.querySelector('.popup__input_type_link');

// валидаторы форм
const profileFormValidator = new FormValidator(configValidation, profileForm);
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(configValidation, cardForm);
cardFormValidator.enableValidation();

//открыть попап
const openPopup = popup => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEsc);
};

// закрыть попап
const closePopup = popup => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEsc);
};

// обработчик Escape
const handleEsc = evt => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
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

  // установить слушатели по клику на лайк, корзину, картинку
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLike();
    });

    this._buttonDelete.addEventListener('click', () => {
      this._handleDelete();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  // создать карточку на основе шаблона
  generateCard() {
    this._element = this._getTemplate();

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

// обработчик клика по карточке
const handleCardClick = (name, link) => {
  popupCardImage.src = link;
  popupCardImage.alt = name;
  popupCardCaption.textContent = name;
  openPopup(popupCard);
}

// создать карточку
const generateCard = (data) => {
  const card = new Card(data, '.card-template', handleCardClick);
  const generatedCard = card.generateCard();
  return generatedCard;
}

// добавить карточку
const renderCard = (data) => {
  const cardElement = generateCard(data);
  cards.prepend(cardElement);
}

// добавить карточки из массива
initialCards.forEach(card => {
  renderCard(card);
});

// обработчик формы "Редактировать профиль"
const handleFormEditSubmit = () => {
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  closePopup(popupEdit);
};

// обработчик формы "Новое место"
const handleFormAddSubmit = evt => {
  const card = {
    name: inputTitle.value,
    link: inputLink.value
  };
  renderCard(card);
  evt.target.reset();
  cardFormValidator.enableValidation();
  closePopup(popupAdd);
};

// открыть форму "Редактировать профиль"
buttonEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;
});

// сохранить форму "Редактировать профиль"
profileForm.addEventListener('submit', handleFormEditSubmit);

// открыть форму "Новое место"
buttonAdd.addEventListener('click', () => openPopup(popupAdd));

// сохранить форму "Новое место"
cardForm.addEventListener('submit', handleFormAddSubmit);

// закрыть попап кликом на оверлей или крестик
popups.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});
