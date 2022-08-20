import './assets/css/style.css';

import drawHeader from './components/drawHeader';
import openSignIn from './pages/signIn/openSignIn';

drawHeader();

document.querySelector('.login')?.addEventListener('click', () => {
  openSignIn();
});
