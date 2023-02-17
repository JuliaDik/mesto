// МАССИВ
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

// ПЕРЕМЕННЫЕ
// кнопки
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
// попапы
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
const inputName = document.querySelector('.form__input_type_name');
const inputOccupation = document.querySelector('.form__input_type_occupation');
// форма добавления карточки
const cardForm = document.forms['card-form'];
const inputTitle = document.querySelector('.form__input_type_title');
const inputLink = document.querySelector('.form__input_type_link');

// ФУНКЦИИ
//открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
};
// закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};
// создать карточку на основе шаблона
function createNewCard(name, link) {
  const newCard = cardTemplate.content.cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  const cardTitle = newCard.querySelector('.card__title');
  cardImage.src = link;
  cardTitle.textContent = name;
  cardImage.alt = name;
  // поставить лайк
  const buttonLike = newCard.querySelector('.card__like-button');
  buttonLike.addEventListener('click', evt => {
    evt.target.classList.toggle('card__like-button_active');
  });
  // удалить карточку
  const buttonDelete = newCard.querySelector('.card__delete-button');
  buttonDelete.addEventListener('click', evt => {
    evt.target.closest('.card').remove();
  });
  // открыть (увеличить) картинку
  function zoomImage() {
    openPopup(popupCard);
    popupCardImage.src = cardImage.src;
    popupCardImage.alt = cardTitle.alt;
    popupCardCaption.textContent = cardTitle.textContent;
  }
  cardImage.addEventListener('click', zoomImage);
  return newCard;
};
// добавить карточку в верстку
function renderCard(name, link) {
  cards.append(createNewCard(name, link));
};
// добавить карточки в верстку из массива (по умолчанию)
initialCards.forEach((card) => {
  renderCard(card.name, card.link);
});
// сохранить данные формы редактирования профиля
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  closePopup(popupEdit);
};
// сохранить данные формы добавления карточки
function handleFormAddSubmit(evt) {
  evt.preventDefault();
  cards.prepend(createNewCard(inputTitle.value, inputLink.value));
  evt.target.reset();
  closePopup(popupAdd);
};

// СЛУШАТЕЛИ
// открыть форму редактирования профиля
buttonEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  inputName.value = profileName.textContent;
  inputOccupation.value = profileOccupation.textContent;
});
// открыть форму добавления карточки
buttonAdd.addEventListener('click', () => openPopup(popupAdd));
// сохранить данные формы редактирования профиля
profileForm.addEventListener('submit', handleFormEditSubmit);
// сохранить данные формы добавления карточки
cardForm.addEventListener('submit', handleFormAddSubmit);
// закрыть попап
closeButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
