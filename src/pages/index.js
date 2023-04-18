import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
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
  userNameSelector,
  userAboutSelector,
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

// сервер: получить данные о пользователе
api.getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

// открыть форму "Редактировать профиль"
const handleOpenFormProfile = () => {
  const { name, about } = userInfo.getUserInfo();
  formProfile.name.value = name;
  formProfile.about.value = about;
  formProfileValidator.resetValidation();
  popupFormProfile.open();
};

// submit + закрыть форму "Редактировать профиль"
const handleSubmitFormProfile = (userData) => {
  // сервер: обновить данные о пользователе
  api.patchUserInfo(userData)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupFormProfile.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    }); 
};

// ДОБАВЛЕНИЕ КАРТОЧЕК

// клик по картинке
const handleCardClick = (ImageSrc, ImageAlt) => {
  popupCardImage.open(ImageSrc, ImageAlt);
};

// добавить карточку
const renderCard = (data) => {
  const card = new Card(data, cardTemplateSelector, handleCardClick);
  const generatedCard = card.generateCard();
  cardsContainer.addItem(generatedCard);
}

// открыть форму "Новое место"
const handleOpenFormCard = () => {
  formCardValidator.resetValidation();
  popupFormCard.open();
};

// submit + закрыть форму "Новое место"
const handleSubmitFormCard = (cardData) => {
  api.postCard(cardData)
    .then((cardData) => {
      renderCard(cardData);
      popupFormCard.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    }); 
};

// сервер: загрузить массив карточек
api.getCards()
  .then((cards) => {
    cardsContainer.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

// ЭКЗЕМПЛЯРЫ КЛАССОВ
const userInfo = new UserInfo(userNameSelector, userAboutSelector);
const cardsContainer = new Section({ renderer: renderCard }, cardsContainerSelector);
const popupFormProfile = new PopupWithForm(popupFormProfileSelector, handleSubmitFormProfile);
const popupFormCard = new PopupWithForm(popupFormCardSelector, handleSubmitFormCard);
const popupCardImage = new PopupWithImage(popupCardImageSelector);
const formProfileValidator = new FormValidator(configValidation, formProfile);
const formCardValidator = new FormValidator(configValidation, formCard); 

// ВАЛИДАЦИЯ ФОРМ

formProfileValidator.enableValidation();
formCardValidator.enableValidation();

// СЛУШАТЕЛИ СОБЫТИЙ

buttonEdit.addEventListener('click', handleOpenFormProfile);
buttonAdd.addEventListener('click', handleOpenFormCard);
popupFormProfile.setEventListeners();
popupFormCard.setEventListeners();
popupCardImage.setEventListeners();