import createUser from './workWithApi/createUser';
import signInUser from './workWithApi/signInUser';
import closeSignIn from './closeSignIn';

export default function registrationUser(): void {
  const nameBlock = document.querySelector('#nameRegInput');
  const emailBlock = document.querySelector('#emailRegInput');
  const passwordBlock = document.querySelector('#passwordRegInput');
  if (
    nameBlock instanceof HTMLInputElement
    && emailBlock instanceof HTMLInputElement
    && passwordBlock instanceof HTMLInputElement
  ) {
    const data = {
      name: nameBlock.value,
      email: emailBlock.value,
      password: passwordBlock.value,
    };
    createUser(data).then((response) => {
      if (response.error?.status !== 'failed') {
        signInUser({ email: data.email, password: data.password }).then(() => {
          closeSignIn();
        });
      } else {
        throw new Error();
      }
    }).catch(() => {
      emailBlock.classList.add('incorrectInput');
      passwordBlock.classList.add('incorrectInput');
      nameBlock.classList.add('incorrectInput');
    });
  }
}
