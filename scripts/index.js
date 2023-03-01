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
// создать карточку на основе шаблона
const createNewCard = (name, link) => {
  const newCard = cardTemplate.content.querySelector('.card').cloneNode(true);
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
  const zoomImage = () =>{
    openPopup(popupCard);
    popupCardImage.src = cardImage.src;
    popupCardImage.alt = cardTitle.alt;
    popupCardCaption.textContent = cardTitle.textContent;
  }
  cardImage.addEventListener('click', zoomImage);
  return newCard;
};
// добавить карточки из массива
initialCards.forEach(card => {
  cards.append(createNewCard(card.name, card.link));
});
// обработчик формы "Редактировать профиль"
const handleFormEditSubmit = () => {
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputOccupation.value;
  closePopup(popupEdit);
};
// обработчик формы "Новое место"
const handleFormAddSubmit = evt => {
  cards.prepend(createNewCard(inputTitle.value, inputLink.value));
  evt.target.reset();
  const buttonSubmit = popupAdd.querySelector('.popup__submit-button');
  disableButton(buttonSubmit, configValidation);
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
