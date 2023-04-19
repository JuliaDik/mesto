import './index.css';
import Api from '../components/Api.js';
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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '2ddcea56-4974-44a0-8239-7ed219c4b293',
    'Content-Type': 'application/json'
  }
});

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ

// запрос на сервер: получить данные о пользователе
api.getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
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
  popupFormProfile.renderLoading(true);
  // запрос на сервер: обновить данные о пользователе
  api.patchUserInfo(userData)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      popupFormProfile.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
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
          api.deleteLike(cardId)
            .then((cardData) => {
              card.deleteLike(cardData.likes);
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
        } else {
          api.putLike(cardId)
            .then((cardData) => {
              card.putLike(cardData.likes);
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
        }
      },
      handleDeleteClick: (cardId) => {
        popupFormConfirmation.open();
        popupFormConfirmation.handleSubmit(() => {
          api.deleteCard(cardId)
          .then((cardData) => {
            card.deleteCard(cardData._id);
            popupFormConfirmation.close();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
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
  api.postCard(cardData)
    .then((cardData) => {
      renderCard(cardData);
      popupFormCard.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupFormCard.renderLoading(false);
    })
};

// запрос на сервер: загрузить массив карточек
api.getCards()
  .then((cards) => {
    cards.reverse();
    cardsContainer.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

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
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupFormAvatar.renderLoading(false);
    })
}

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