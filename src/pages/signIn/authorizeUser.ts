import signInUser from './workWithApi/signInUser';
import closeSignIn from './closeSignIn';

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
      window.localStorage.setItem('token', answer.token);
      window.localStorage.setItem('userId', answer.userId);
      window.localStorage.setItem('refreshToken', answer.refreshToken);
      window.localStorage.setItem('rslangT86-name', answer.name);
      closeSignIn();
    }).catch(() => {
      emailBlock.classList.add('incorrectInput');
      passwordBlock.classList.add('incorrectInput');
    });
  }
}
