import drawCards from './cards/drawCards';
import Constants from '../../constants/Constants';
import changeButtonStatus from './changeButtonStatus';

export default function changePage(direction: string): () => void {
  return () => {
    const currentPageBlock = document.querySelector('#pagination__active');
    if (currentPageBlock instanceof HTMLElement) {
      const currentPage = Number(currentPageBlock.dataset.pageNumber);
      console.log(currentPage);
      switch (direction) {
        case 'next':
          currentPageBlock.innerHTML = `${currentPage + 1}`;
          break;
        case 'previous':
          currentPageBlock.innerHTML = `${currentPage - 1}`;
          break;
        case 'start':
          currentPageBlock.innerHTML = `${Constants.textBookPage.numberFirstPage + 1}`;
          break;
        case 'end':
          currentPageBlock.innerHTML = `${Constants.textBookPage.numberLastPage}`;
          break;
        default:
          break;
      }
      window.localStorage.setItem(
        Constants.textBookPage.localStorageKeyForPage,
        currentPageBlock.innerHTML,
      );
      currentPageBlock.dataset.pageNumber = currentPageBlock.innerHTML;
      drawCards();
      changeButtonStatus('#ltlt', '#lt', Number(currentPageBlock.innerHTML), Constants.textBookPage.numberFirstPage + 1);
      changeButtonStatus('#gtgt', '#gt', Number(currentPageBlock.innerHTML), Constants.textBookPage.numberLastPage);
    }
  };
}
