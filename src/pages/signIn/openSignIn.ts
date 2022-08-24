import createBLock from '../../components/createBLock';
import closeSignIn from './closeSignIn';
import createForm from '../../components/createForm';
import registrationUser from './registrationUser';
import authorizeUser from './authorizeUser';

export default function openSignIn(): void {
  const popUpBack = createBLock('div', {
    classList: ['popUp-back'],
    listener: closeSignIn,
    event: 'click',
  });

  // сменить лейбл
  const registrationForm = createForm([{ label: 'Имя', id: 'name' }, { label: 'Почта', id: 'email', type: 'email' }, { label: 'Пароль', id: 'password', type: 'password' }], registrationUser, 'Reg', 'Зарегистрироваться');
  const signInForm = createForm([{ label: 'Почта', id: 'email', type: 'email' }, { label: 'Пароль', id: 'password', type: 'password' }], authorizeUser, 'Sign', 'Войти');
  const popUp = createBLock('div', {
    classList: ['popUp'],
    children: [signInForm, registrationForm],
  });
  const popUpContainer = createBLock('div', {
    classList: ['popUp-container'],
    children: [popUpBack, popUp],
  });

  document.body.append(popUpContainer);
}
