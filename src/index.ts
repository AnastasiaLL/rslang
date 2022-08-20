import './assets/css/style.css';

import openSignIn from './pages/signIn/openSignIn';
import openMainPage from './pages/mainPage/openMainPage';

openMainPage();

document.querySelector('.login')?.addEventListener('click', () => {
  openSignIn();
});

document.querySelector('.logo-title')?.addEventListener('click', () => {
  openMainPage();
});
