// добавить 6 карточек из массива
const cardsGallery = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content;
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

initialCards.forEach(item => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__image').src = item.link;
  cardsGallery.append(cardElement);
});

// открыть попап
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const nameProfile = document.querySelector('.profile__name');
const occupationProfile = document.querySelector('.profile__occupation');
const nameInput = document.querySelector('.popup__input_type_name');
const occupationInput = document.querySelector('.popup__input_type_occupation');
const titleInput = document.querySelector('.popup__input_type_title');
const linkInput = document.querySelector('.popup__input_type_link');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openEditPopup() {
  nameInput.value = nameProfile.textContent;
  occupationInput.value = occupationProfile.textContent;
  openPopup(popupEdit);
}

function openAddPopup() {
  titleInput.value = '';
  linkInput.value = '';
  openPopup(popupAdd);
}

buttonEdit.addEventListener('click', openEditPopup);
buttonAdd.addEventListener('click', openAddPopup);

// закрыть попап
const popups = document.querySelectorAll('.popup');
const buttonsClose = document.querySelectorAll('.popup__close-button');
function closePopup() {
  const index = Array.from(buttonsClose).indexOf(this);
  popups[index].classList.remove('popup_opened');
}

buttonsClose.forEach(btn => btn.addEventListener('click', closePopup));

// сохранить и отправить форму редактирования профиля
const formElement = document.querySelector('.popup__edit-form');
function handleFormSubmit (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  occupationProfile.textContent = occupationInput.value;
  popupEdit.classList.remove('popup_opened');
}
formElement.addEventListener('submit', handleFormSubmit);
