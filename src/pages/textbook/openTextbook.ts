import createBLock from '../../components/createBLock';
import updateNav from '../../utils/updateNav';
import createTextbookHeader from './createTextbookHeader';
import createTextbookDetails from './createTextbookDetails';
import drawCards from './cards/drawCards';

export default function openTextbook() {
  const textbookHeader = createTextbookHeader();

  const wordList = createBLock('div', {
    classList: ['textbook__words-list'],
  });

  const textbookContent = createBLock('div', {
    classList: ['textbook__content'],
    children: [createTextbookDetails(), wordList],
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
  drawCards();

  // сделать меню активным

  updateNav('textbook');
}
