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
const buttonsClose = document.querySelectorAll('.popup__close-button');
// попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupCard = document.querySelector('.popup_type_image');
// профиль
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
// карточки
const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template');
// форма редактирования профиля
const formEdit = document.querySelector('.form_type_edit');
const inputName = document.querySelector('.form__input_type_name');
const inputOccupation = document.querySelector('.form__input_type_occupation');
// форма добавления карточки
const formAdd = document.querySelector('.form_type_add');
const inputTitle = document.querySelector('.form__input_type_title');
const inputLink = document.querySelector('.form__input_type_link');

// ФУНКЦИИ
//открыть попап
function openPopup(type) {
  type.classList.add('popup_opened');
  if (type === popupEdit) {
    inputName.value = profileName.textContent;
    inputOccupation.value = profileOccupation.textContent;
  };
};
// закрыть попап
function closePopup(type) {
  type.classList.remove('popup_opened');
};
// создать карточку на основе шаблона
function createNewCard(name, link) {
  const newCard = cardTemplate.content.cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  const cardTitle = newCard.querySelector('.card__title');
  cardImage.src = link;
  cardTitle.textContent = name;
  cardTitle.alt = name;
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
  const popupCardImage = document.querySelector('.popup__image');
  const popupCardCaption = document.querySelector('.popup__image-caption');
  const zoomImage = (name, link) => {
    openPopup(popupCard);
    popupCardImage.src = link;
    popupCardImage.alt = name;
    popupCardCaption.textContent = name;
  };
  cardImage.addEventListener('click', zoomImage);
  return newCard;
};
// добавить карточку в верстку
const renderCard = (name, link) => {
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
  closePopup(popupAdd);
};

// СЛУШАТЕЛИ
// открыть форму
buttonEdit.addEventListener('click', () => openPopup(popupEdit));
buttonAdd.addEventListener('click', () => openPopup(popupAdd));
// сохранить данные формы
formEdit.addEventListener('submit', handleFormEditSubmit);
formAdd.addEventListener('submit', handleFormAddSubmit);
// закрыть форму
buttonsClose.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
