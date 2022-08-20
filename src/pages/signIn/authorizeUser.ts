import signInUser from './workWithApi/signInUser';
import signInClose from './signInClose';

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
      window.localStorage.setItem('rslangT86-token', answer.token);
      window.localStorage.setItem('rslangT86-userId', answer.userId);
      window.localStorage.setItem('rslangT86-refreshToken', answer.refreshToken);
      window.localStorage.setItem('rslangT86-name', answer.name);
      signInClose();
    }).catch(() => {
      emailBlock.classList.add('incorrectInput');
      passwordBlock.classList.add('incorrectInput');
    });
  }
}
