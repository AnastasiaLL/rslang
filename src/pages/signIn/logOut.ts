export default function logOut() {
  console.log('here');
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('userId');
  window.localStorage.removeItem('refreshToken');
  window.localStorage.removeItem('rslangT86-name');

  console.log('Вы разлогинены');
}
