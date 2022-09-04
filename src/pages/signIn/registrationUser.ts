import createUser from './workWithApi/createUser';
import signInUser from './workWithApi/signInUser';
import closeSignIn from './closeSignIn';
import createErrorAlert from '../../components/createErrorAlert';
import Constants from '../../constants/Constants';

export default function registrationUser(): void {
  const nameBlock = document.querySelector('#nameRegInput');
  const emailBlock = document.querySelector('#emailRegInput');
  const passwordBlock = document.querySelector('#passwordRegInput');
  if (
    nameBlock instanceof HTMLInputElement
    && emailBlock instanceof HTMLInputElement
    && passwordBlock instanceof HTMLInputElement
  ) {
    let isFormValid = true;
    if (nameBlock.value === '') {
      isFormValid = false;
      nameBlock.classList.add('incorrectInput');
      nameBlock.after(createErrorAlert('Поле имя не может быть пустым'));
    }

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if (emailBlock.value === '' || !EMAIL_REGEXP.test(emailBlock.value)) {
      isFormValid = false;
      emailBlock.classList.add('incorrectInput');
      emailBlock.after(createErrorAlert('Введите корректный адрес электронной почты'));
    }

    if (passwordBlock.value.length < 8) {
      isFormValid = false;
      passwordBlock.classList.add('incorrectInput');
      passwordBlock.after(createErrorAlert('Пароль должен быть не меньше 8 символов'));
    }
    if (isFormValid) {
      const data = {
        name: nameBlock.value,
        email: emailBlock.value,
        password: passwordBlock.value,
      };
      createUser(data).then((response) => {
        if (response.error?.status !== 'failed') {
          signInUser({ email: data.email, password: data.password }).then((answer) => {
            window.localStorage.setItem(Constants.localStorageKeys.token, answer.token);
            window.localStorage.setItem(Constants.localStorageKeys.userId, answer.userId);
            window.localStorage.setItem(
              Constants.localStorageKeys.refreshToken,
              answer.refreshToken,
            );
            window.localStorage.setItem(Constants.localStorageKeys.name, answer.name);
            closeSignIn();
          });
        } else {
          throw new Error();
        }
      }).catch(() => {
        emailBlock.classList.add('incorrectInput');
        passwordBlock.classList.add('incorrectInput');
        nameBlock.classList.add('incorrectInput');
        emailBlock.after(createErrorAlert('Эта почта уже занята'));
      });
    }
  }
}
