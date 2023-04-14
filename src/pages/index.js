import './index.css';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {
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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '2ddcea56-4974-44a0-8239-7ed219c4b293',
    'Content-Type': 'application/json'
  }
}); 

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userOccupationSelector: '.profile__occupation'
});

// получить данные о пользователе с сервера
api.getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
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

let cardsList;

// создать отдельную карточку
const createCard = (data) => {
  const card = new Card(data, cardTemplateSelector, handleCardClick);
  return card.generateCard();
}

// отрисовать готовую карточку
const renderCard = (data) => {
  cardsList.addItem(createCard(data));
}

// отрисовать все карточки
const renderInitialCards = (cardsData) => {
  cardsList = new Section({
    items: cardsData,
    renderer: renderCard
  }, cardsContainerSelector);
  cardsList.renderItems();
}

// загрузить начальные карточки с сервера
api.getInitialCards()
  .then((cardsData) => {
    renderInitialCards(cardsData);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  }); 

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
