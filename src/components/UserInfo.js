export default class UserInfo {
  constructor({ userNameSelector, userOccupationSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userOccupation = document.querySelector(userOccupationSelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo['name'] = this._userName.textContent;
    userInfo['occupation'] = this._userOccupation.textContent;
    return userInfo;
  }

  setUserInfo({ name, about }) {
    this._userName.textContent = name;
    this._userOccupation.textContent = about;
  }
}
