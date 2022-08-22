import './assets/css/style.css';

import drawHeader from './components/drawHeader';
import openSignIn from './pages/signIn/openSignIn';
import openMainPage from './pages/mainPage/openMainPage';
import { clickTeamPage } from './components/drawTeam';

openMainPage();

drawHeader();

document.querySelector('.login')?.addEventListener('click', () => {
  openSignIn();
});

document.querySelector('.logo-title')?.addEventListener('click', () => {
  openMainPage();
});

document.querySelector('#team')?.addEventListener('click', () => {
  clickTeamPage();
});
