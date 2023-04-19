export default class UserInfo {
  constructor(userNameSelector, userAboutSelector, userAvatarSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo['name'] = this._userName.textContent;
    userInfo['about'] = this._userAbout.textContent;
    return userInfo;
  }

  setUserInfo({ name, about, avatar }) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this._userAvatar.src = avatar;
  }

  setUserAvatar({ avatar }) {
    this._userAvatar.src = avatar;
  }
}
