export default function changeButtonStatus(
  firstSelector: string,
  secondSelector: string,
  currentPage: number,
  borderPage: number,
) {
  const firstBtn = document.querySelector(firstSelector);
  const secondBtn = document.querySelector(secondSelector);
  if (firstBtn instanceof HTMLButtonElement && secondBtn instanceof HTMLButtonElement) {
    if (Number(currentPage) === borderPage) {
      firstBtn.disabled = true;
      secondBtn.disabled = true;
      firstBtn.classList.add('pagination__inactive');
      secondBtn.classList.add('pagination__inactive');
    } else {
      firstBtn.disabled = false;
      secondBtn.disabled = false;
      firstBtn.classList.remove('pagination__inactive');
      secondBtn.classList.remove('pagination__inactive');
    }
  }
}
