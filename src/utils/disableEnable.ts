export function disableAllButtons() {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach((button) => button.setAttribute('disabled', 'true'));
  console.log('disabled');
}

export function enableAllButtons() {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach((button) => button.removeAttribute('disabled'));
}
