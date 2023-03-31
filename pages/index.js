import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {
  initialCards,
  configValidation,
  buttonEdit,
  buttonAdd,
  formProfile,
  formCard,
  popupFormProfileSelector,
  popupFormCardSelector,
  popupCardImageSelector,
  cardTemplateSelector,
  cardsContainerSelector
} from '../utils/constants.js';

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userOccupationSelector: '.profile__occupation'
});

// обработчик открытия формы "Редактировать профиль"
const handleEditProfile = () => {
  const { name, occupation } = userInfo.getUserInfo();
  formProfile.name.value = name;
  formProfile.occupation.value = occupation;
  formProfileValidator.resetValidation();
  popupFormProfile.open();
};

// обработчик submit/закрытия формы "Редактировать профиль"
const handleSubmitProfile = (data) => {
  userInfo.setUserInfo(data);
  popupFormProfile.close();
};

// ДОБАВЛЕНИЕ КАРТОЧКИ

// обработчик открытия формы "Новое место"
const handleAddCard = () => {
  formCardValidator.resetValidation();
  popupFormCard.open();
};

// обработчик submit/закрытия формы "Новое место"
const handleSubmitCard = ({ title: name, link }) => {
  renderCard({ name, link });
  popupFormCard.close();
};

// КАРТИНКА КАРТОЧКИ

// обработчик открытия картинки карточки
const handleCardClick = (cardImageSrc, cardImageAlt) => {
  popupCardImage.open(cardImageSrc, cardImageAlt);
};

// ОТРИСОВКА КАРТОЧЕК

// отрисовать отдельную карточку
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

// ВАЛИДАЦИЯ ФОРМ

// валидация формы "Редактировать профиль"
const formProfileValidator = new FormValidator(configValidation, formProfile);
formProfileValidator.enableValidation();

// валидация формы "Новое место"
const formCardValidator = new FormValidator(configValidation, formCard);
formCardValidator.enableValidation();

// СЛУШАТЕЛИ СОБЫТИЙ

// слушатель click по кнопке редактировать профиль
buttonEdit.addEventListener('click', handleEditProfile);

// слушатель click по кнопке добавить карточку
buttonAdd.addEventListener('click', handleAddCard);

// слушатель submit формы "Редактировать профиль"
const popupFormProfile = new PopupWithForm(popupFormProfileSelector, handleSubmitProfile);
popupFormProfile.setEventListeners();

// слушатель submit формы "Новое место"
const popupFormCard = new PopupWithForm(popupFormCardSelector, handleSubmitCard);
popupFormCard.setEventListeners();

// слушатель close картинки карточки
const popupCardImage = new PopupWithImage(popupCardImageSelector);
popupCardImage.setEventListeners();
