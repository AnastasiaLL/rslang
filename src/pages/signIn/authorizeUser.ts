import signInUser from './workWithApi/signInUser';
import closeSignIn from './closeSignIn';
import Constants from '../../constants/Constants';

export default function authorizeUser() {
  const emailBlock = document.querySelector('#emailSignInput');
  const passwordBlock = document.querySelector('#passwordSignInput');
  console.log([emailBlock, passwordBlock]);
  if (
    emailBlock instanceof HTMLInputElement
    && passwordBlock instanceof HTMLInputElement
  ) {
    console.log('sds');
    const data = {
      email: emailBlock.value,
      password: passwordBlock.value,
    };
    signInUser(data).then((answer) => {
      window.localStorage.setItem(Constants.localStorageKeys.token, answer.token);
      window.localStorage.setItem(Constants.localStorageKeys.userId, answer.userId);
      window.localStorage.setItem(Constants.localStorageKeys.refreshToken, answer.refreshToken);
      window.localStorage.setItem(Constants.localStorageKeys.name, answer.name);
      closeSignIn();
    }).catch(() => {
      emailBlock.classList.add('incorrectInput');
      passwordBlock.classList.add('incorrectInput');
    });
  }
}
