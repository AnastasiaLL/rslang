export default function closeSignIn() {
  window.location.reload();
  document.querySelector('.popUp-container')?.remove();
}
