import './assets/css/style.css';
import drawHeader from './components/drawHeader';
import signInOpen from './pages/signIn/signInOpen';

drawHeader();

document.querySelector('.login')?.addEventListener('click', () => {
  signInOpen();
});
