import signInOpen from './pages/signIn/signInOpen';

document.querySelector('.login')?.addEventListener('click', (event) => {
  (event.target as HTMLElement).classList.add('active');
  signInOpen();
});
