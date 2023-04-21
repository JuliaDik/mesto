import './index.css';
import { api } from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithСonfirmation from '../components/PopupWithСonfirmation.js';
import FormValidator from '../components/FormValidator.js';
import {
  configValidation,
  buttonEdit,
  buttonAdd,
  avatarEdit,
  formProfile,
  formCard,
  formAvatar,
  popupFormProfileSelector,
  popupFormAvatarSelector,
  popupFormConfirmationSelector,
  popupFormCardSelector,
  popupCardImageSelector,
  userNameSelector,
  userAboutSelector,
  userAvatarSelector,
  cardTemplateSelector,
  cardsContainerSelector
} from '../utils/constants.js';

let userId;

// запрос на сервер:
// получить данные о пользователе
// получить карточки
Promise.all([api.getUserInfo(), api.getCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cards.reverse();
    cardsContainer.renderItems(cards);
  })

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ

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
  popupFormProfile.renderLoading(true);
  // запрос на сервер: обновить данные о пользователе
  api.patchUserInfo(userData)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupFormProfile.close();
    })
    .finally(() => {
      popupFormProfile.renderLoading(false);
    })
};

// ДОБАВЛЕНИЕ КАРТОЧЕК

// клик по картинке
const handleCardClick = (cardImageSrc, cardImageAlt) => {
  popupCardImage.open(cardImageSrc, cardImageAlt);
};

// добавить карточку
const renderCard = (cardData) => {
  const card = new Card(
    cardData,
    userId,
    cardTemplateSelector,
    handleCardClick,
    { handleLikeClick: (cardId, isLiked) => {
        if (isLiked) {
          // запрос на сервер: удалить лайк
          api.deleteLike(cardId)
            .then((cardData) => {
              card.deleteLike(cardData.likes);
            })
        } else {
          // запрос на сервер: поставить лайк
          api.putLike(cardId)
            .then((cardData) => {
              card.putLike(cardData.likes);
            })
        }
      },
      handleDeleteClick: (cardId) => {
        popupFormConfirmation.open();
        popupFormConfirmation.handleSubmit(() => {
          // запрос на сервер: удалить карточку
          api.deleteCard(cardId)
            .then((cardData) => {
              card.deleteCard(cardData._id);
              popupFormConfirmation.close();
            })
        })
      }
    },
  );
  const generatedCard = card.generateCard();
  cardsContainer.addItem(generatedCard);
};

// открыть форму "Новое место"
const handleOpenFormCard = () => {
  formCardValidator.resetValidation();
  popupFormCard.open();
};

// submit + закрыть форму "Новое место"
const handleSubmitFormCard = (cardData) => {
  popupFormCard.renderLoading(true);
  // запрос на сервер: добавить карточку
  api.postCard(cardData)
    .then((cardData) => {
      renderCard(cardData);
      popupFormCard.close();
    })
    .finally(() => {
      popupFormCard.renderLoading(false);
    })
};

// ОБНОВЛЕНИЕ АВАТАРА

// открыть форму "Обновить аватар"
const handleOpenFormAvatar = () => {
  formAvatarValidator.resetValidation();
  popupFormAvatar.open();
};

// submit + закрыть форму "Обновить аватар"
const handleSubmitFormAvatar = (userData) => {
  popupFormAvatar.renderLoading(true);
  // запрос на сервер: обновить аватар пользователя
  api.patchAvatar(userData)
    .then((userData) => {
      userInfo.setUserAvatar(userData);
      popupFormAvatar.close();
    })
    .finally(() => {
      popupFormAvatar.renderLoading(false);
    })
};

// ЭКЗЕМПЛЯРЫ КЛАССОВ

const userInfo = new UserInfo(userNameSelector, userAboutSelector, userAvatarSelector);
const cardsContainer = new Section({ renderer: renderCard }, cardsContainerSelector);
const popupFormProfile = new PopupWithForm(popupFormProfileSelector, handleSubmitFormProfile);
const popupFormAvatar = new PopupWithForm(popupFormAvatarSelector, handleSubmitFormAvatar);
const popupFormConfirmation = new PopupWithСonfirmation(popupFormConfirmationSelector);
const popupFormCard = new PopupWithForm(popupFormCardSelector, handleSubmitFormCard);
const popupCardImage = new PopupWithImage(popupCardImageSelector);
const formProfileValidator = new FormValidator(configValidation, formProfile);
const formCardValidator = new FormValidator(configValidation, formCard);
const formAvatarValidator = new FormValidator(configValidation, formAvatar); 

// ВАЛИДАЦИЯ ФОРМ

formProfileValidator.enableValidation();
formCardValidator.enableValidation();
formAvatarValidator.enableValidation();

// СЛУШАТЕЛИ СОБЫТИЙ

buttonEdit.addEventListener('click', handleOpenFormProfile);
buttonAdd.addEventListener('click', handleOpenFormCard);
avatarEdit.addEventListener('click', handleOpenFormAvatar);
popupFormProfile.setEventListeners();
popupFormAvatar.setEventListeners();
popupFormConfirmation.setEventListeners();
popupFormCard.setEventListeners();
popupCardImage.setEventListeners();