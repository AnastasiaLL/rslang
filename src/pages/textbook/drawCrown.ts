export default function drawCrown() {
  let isCrownPage = true;
  document.querySelectorAll('.word-summary').forEach((card) => {
    if (card instanceof HTMLElement) {
      if (!card.classList.contains('studied')) isCrownPage = false;
    }
  });
  const pageCounter = document.querySelector('#pagination__active');
  if (isCrownPage) pageCounter?.classList.add('page-crown');
  else pageCounter?.classList.remove('page-crown');
}
