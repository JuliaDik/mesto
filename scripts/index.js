// попапы
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
// профиль
const nameProfile = document.querySelector('.profile__name');
const occupationProfile = document.querySelector('.profile__occupation');
const nameInput = document.querySelector('.form__input_type_name');
const occupationInput = document.querySelector('.form__input_type_occupation');
// карточки
const titleInput = document.querySelector('.form__input_type_title');
const linkInput = document.querySelector('.form__input_type_link');
// кнопки
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonsClose = document.querySelectorAll('.popup__close-button');

// открыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openPopupEdit() {
  nameInput.value = nameProfile.textContent;
  occupationInput.value = occupationProfile.textContent;
  openPopup(popupEdit);
}

function openPopupAdd() {
  titleInput.value = '';
  linkInput.value = '';
  openPopup(popupAdd);
}

buttonEdit.addEventListener('click', openPopupEdit);
buttonAdd.addEventListener('click', openPopupAdd);

// закрыть попап
function closePopup() {
  const index = Array.from(buttonsClose).indexOf(this);
  popups[index].classList.remove('popup_opened');
}
buttonsClose.forEach(btn => btn.addEventListener('click', closePopup));

// создать новую карточку
const newCardCreation = (name, link) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__image').alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  // поставить лайк
  const buttonLike = cardElement.querySelector('.card__like-button');
  buttonLike.addEventListener('click', evt => {
    const evtTarget = evt.target;
    evtTarget.classList.toggle('card__like-button_active');
  });
  // удалить карточку
  const buttonDelete = cardElement.querySelector('.card__delete-button');
  buttonDelete.addEventListener('click', () => {
    cardElement.remove();
  });
  // открыть картинку
  const popupImagePhoto = document.querySelector('.popup__image');
  const popupImageTitle = document.querySelector('.popup__text');
  cardElement.querySelector('.popup__image').addEventListener('click', () => {
    openPopup(popupImage);
    popupImagePhoto.src = cardElement.querySelector('.popup__image').src;
    popupImagePhoto.alt = cardElement.querySelector('.popup__image').alt;
    popupImageTitle.textContent = cardElement.querySelector('."popup__title').textContent;
  });
  return cardElement;
}

// добавить новую карточку в разметку
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
  return cardElement;
});

const renderCard = (name, link) => {
  cardsGallery.append(newCardCreation(name, link));
}

initialCards.forEach((item) => {
  renderCard(item.name, item.link);
});

// submit формы редактирования профиля
const formEdit = document.querySelector('.form_type_edit');
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  occupationProfile.textContent = occupationInput.value;
  closePopup();
}

formEdit.addEventListener('submit', handleFormEditSubmit);

// submit формы добавления карточки
const formAdd = document.querySelector('.form_type_add');
function handleFormAddSubmit(evt) {
  evt.preventDefault();
  cardsGallery.prepend(createCard(titleInput.value, linkInput.value));
  closePopup();
  evt.target.reset();
};

formAdd.addEventListener('submit', handleFormAddSubmit);

// удалить карточку
