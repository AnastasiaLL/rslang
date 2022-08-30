import createBLock from '../../components/createBLock';
import updateNav from '../../utils/updateNav';
import createTextbookHeader from './createTextbookHeader';
import drawCards from './cards/drawCards';
import Constants from '../../constants/Constants';
import changeButtonStatus from './changeButtonStatus';

export default function openTextbook() {
  const textbookHeader = createTextbookHeader();

  const wordList = createBLock('div', {
    classList: ['textbook__words-list'],
  });

  const wordDetails = createBLock('div', {
    classList: ['word-details'],
  });

  const textbookContent = createBLock('div', {
    classList: ['textbook__content'],
    children: [wordDetails, wordList],
  });

  const textbook = createBLock('div', {
    classList: ['textbook__page'],
    children: [textbookHeader, textbookContent],
  });

  const mainBlock = document.querySelector('#main-block');

  // записать стр в главный блок

  if (mainBlock) {
    mainBlock.innerHTML = '';
    mainBlock.append(textbook);
  }

  // вывести карточки
  const localStoragePageNumber = window.localStorage
    .getItem(Constants.textBookPage.localStorageKeyForPage);
  if (localStoragePageNumber) {
    const pageCounterBlock = document.querySelector('#pagination__active');
    if (pageCounterBlock instanceof HTMLButtonElement) {
      pageCounterBlock.innerHTML = localStoragePageNumber;
      pageCounterBlock.dataset.pageNumber = localStoragePageNumber;
      changeButtonStatus('#ltlt', '#lt', Number(localStoragePageNumber), Constants.textBookPage.numberFirstPage + 1);
      changeButtonStatus('#gtgt', '#gt', Number(localStoragePageNumber), Constants.textBookPage.numberLastPage);
    }
  }
  drawCards();

  // сделать меню активным

  updateNav('textbook');
}
