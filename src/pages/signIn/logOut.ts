export default function logOut() {
  window.localStorage.removeItem('rslangT86-token');
  window.localStorage.removeItem('rslangT86-userId');
  window.localStorage.removeItem('rslangT86-refreshToken');
  window.localStorage.removeItem('rslangT86-name');
  window.location.reload();
}
