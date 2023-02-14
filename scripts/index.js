const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const inputName = document.querySelector('.form__input_type_name');
const inputOccupation = document.querySelector('.form__input_type_occupation');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonImage = document.querySelector('.card__image');
const buttonsClose = document.querySelectorAll('.popup__close-button');
const formEdit = document.querySelector('.form_type_edit');
const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content;

// Открытие попапа popupEdit
function openEditPopup() {
  popupEdit.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;
}

// Открытие попапа popupAdd
function openAddPopup() {
  popupAdd.classList.add('popup_opened');
}

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Сохранение и отправка формы popupEdit
function handleFormSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileOccupation.textContent = inputOccupation.value;
    closePopup(popupEdit);
}

// Добавление карточек из массива initialCards
initialCards.forEach(function (element) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__image').src = element.link;
  cards.append(cardElement);
});

buttonEdit.addEventListener('click', openEditPopup);
buttonAdd.addEventListener('click', openAddPopup);
formEdit.addEventListener('submit', handleFormSubmit);
buttonsClose.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
