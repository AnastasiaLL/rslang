export default function logOut() {
  console.log('here');
  window.localStorage.removeItem('rslangT86-token');
  window.localStorage.removeItem('rslangT86-userId');
  window.localStorage.removeItem('rslangT86-refreshToken');
  window.localStorage.removeItem('rslangT86-name');

  console.log('Вы разлогинены');
}
