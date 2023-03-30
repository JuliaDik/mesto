import Section from './Section.js';
import Card from './Card.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import FormValidator from './FormValidator.js';
import {
  initialCards,
  configValidation,
  popupEditProfileSelector,
  popupAddCardSelector,
  popupCardImageSelector,
  buttonEdit,
  buttonAdd,
  formProfile,
  inputName,
  inputOccupation,
  profileInfo,
  formCard,
  cardTemplateSelector,
  cardsContainerSelector
} from './constants.js';

// валидация формы "Редактировать профиль"
const formProfileValidator = new FormValidator(configValidation, formProfile);
formProfileValidator.enableValidation();

// валидация формы "Новое место"
const formCardValidator = new FormValidator(configValidation, formCard);
formCardValidator.enableValidation();

const userInfo = new UserInfo(profileInfo);

// обработчик редактирования профиля
const handleEditProfile = () => {
  const {name, occupation} = userInfo.getUserInfo();
  inputName.value = name;
  inputOccupation.value = occupation;
  formProfileValidator.resetValidation();
  popupEditProfile.open();
};

// обработчик submit профиля
const handleSubmitProfile = (data) => {
  userInfo.setUserInfo(data);
  popupEditProfile.close();
};

// обработчик добавления карточки
const handleAddCard = () => {
  formCardValidator.resetValidation();
  popupAddCard.open();
};

// обработчик submit карточки
const handleSubmitCard = (data) => {
  renderCard(data);
  popupAddCard.close();
};

// обработчик клика по картинке карточки (открыть)
const handleCardClick = (image) => {
  popupCardImage.open(image);
};

// отрисовать отдельную карточку
const renderCard = (data) => {
  const card = new Card(data, cardTemplateSelector, handleCardClick);
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
};

// отрисовать все карточки
const cardsList = new Section({
  items: initialCards,
  renderer: renderCard
}, cardsContainerSelector);

cardsList.renderItems();

// слушатель клика по кнопке редактировать профиль (открыть)
buttonEdit.addEventListener('click', handleEditProfile);

// слушатель клика по кнопке добавить карточку (открыть)
buttonAdd.addEventListener('click', handleAddCard);

// слушатель submit профиля
const popupEditProfile = new PopupWithForm(popupEditProfileSelector, handleSubmitProfile);
popupEditProfile.setEventListeners();

// слушатель submit карточки
const popupAddCard = new PopupWithForm(popupAddCardSelector, handleSubmitCard);
popupAddCard.setEventListeners();

// слушатель закрытия картинки карточки
const popupCardImage = new PopupWithImage(popupCardImageSelector);
popupCardImage.setEventListeners();
