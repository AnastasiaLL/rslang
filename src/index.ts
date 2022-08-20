import './assets/css/style.css';

import drawHeader from './components/drawHeader';
import openSignIn from './pages/signIn/openSignIn';
import openMainPage from './pages/mainPage/openMainPage';

openMainPage();

drawHeader();

document.querySelector('.login')?.addEventListener('click', () => {
  openSignIn();
});

document.querySelector('.logo-title')?.addEventListener('click', () => {
  openMainPage();
});
