import './assets/css/style.css';

import signInOpen from './pages/signIn/signInOpen';

document.querySelector('.login')?.addEventListener('click', (event) => {
  signInOpen();
});
