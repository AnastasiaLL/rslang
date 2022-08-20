import './assets/css/style.css';

import openSignIn from './pages/signIn/openSignIn';

document.querySelector('.login')?.addEventListener('click', () => {
  openSignIn();
});
