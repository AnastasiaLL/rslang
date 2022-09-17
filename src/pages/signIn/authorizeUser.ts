import signInUser from './workWithApi/signInUser';
import closeSignIn from './closeSignIn';
import Constants from '../../constants/Constants';
import createErrorAlert from '../../components/createErrorAlert';

export default function authorizeUser() {
  const emailBlock = document.querySelector('#emailSignInput');
  const passwordBlock = document.querySelector('#passwordSignInput');
  if (
    emailBlock instanceof HTMLInputElement
    && passwordBlock instanceof HTMLInputElement
  ) {
    let isFormValid = true;
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if (passwordBlock.value.length < 8) {
      isFormValid = false;
      passwordBlock.classList.add('incorrectInput');
      passwordBlock.after(createErrorAlert('Пароль должен быть не меньше 8 символов'));
    }

    if (emailBlock.value === '' || !EMAIL_REGEXP.test(emailBlock.value)) {
      isFormValid = false;
      emailBlock.classList.add('incorrectInput');
      emailBlock.after(createErrorAlert('Введите корректный адрес электронной почты'));
    }

    if (isFormValid) {
      const data = {
        email: emailBlock.value,
        password: passwordBlock.value,
      };
      signInUser(data).then((answer) => {
        if (answer.status === 404) {
          emailBlock.classList.add('incorrectInput');
          emailBlock.after(createErrorAlert('Пользователя с такой почтой нет'));
        } else if (answer.status === 403) {
          passwordBlock.classList.add('incorrectInput');
          passwordBlock.after(createErrorAlert('Пароль не верен'));
        } else {
          window.localStorage.setItem(Constants.localStorageKeys.token, answer.token);
          window.localStorage.setItem(Constants.localStorageKeys.userId, answer.userId);
          window.localStorage.setItem(Constants.localStorageKeys.refreshToken, answer.refreshToken);
          window.localStorage.setItem(Constants.localStorageKeys.name, answer.name);
          closeSignIn();
          window.location.reload();
        }
      });
    }
  }
}
