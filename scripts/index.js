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

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userOccupationSelector: '.profile__occupation'
});

// обработчик редактирования профиля
const handleEditProfile = () => {
  const { name, occupation } = userInfo.getUserInfo();
  formProfile.name.value = name;
  formProfile.occupation.value = occupation;
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
const handleSubmitCard = ({ title: name, link }) => {
  renderCard({ name, link });
  popupAddCard.close();
};

// обработчик клика по картинке карточки (открыть)
const handleCardClick = (cardImageSrc, cardImageAlt) => {
  popupCardImage.open(cardImageSrc, cardImageAlt);
};

// отрисовать карточку
const renderCard = (data) => {
  const card = new Card(data, cardTemplateSelector, handleCardClick);
  const generatedCard = card.generateCard();
  cardsList.addItem(generatedCard);
}

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
