export function disableAllButtons() {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach((button) => button.setAttribute('disabled', 'true'));
}

export function enableAllButtons() {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach((button) => button.removeAttribute('disabled'));
}
