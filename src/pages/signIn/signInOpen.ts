import createBLock from '../../components/createBLock';
import signInClose from './signInClose';
import createForm from '../../components/createForm';
import registrationUser from './registrationUser';
import signInUser from './signInUser';

export default function signInOpen(): void {
  const popUpBack = createBLock('div', {
    classList: ['popUp-back'],
    listener: signInClose,
    event: 'click',
  });

  const registrationForm = createForm([{ label: 'Имя', id: 'Name' }, { label: 'Почта', id: 'Email', type: 'email' }, { label: 'Пароль', id: 'Password', type: 'password' }], registrationUser, 'Reg', 'Зарегистрироваться');
  const signInForm = createForm([{ label: 'Почта', id: 'Email', type: 'email' }, { label: 'Пароль', id: 'Password', type: 'password' }], signInUser, 'Sign', 'Войти');
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
