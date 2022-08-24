import createBLock from '../../components/createBLock';
import updateNav from '../../utils/updateNav';
import createTextbookHeader from './createTextbookHeader';
import createTextbookDetails from './createTextbookDetails';
import createWordList from './createWordList';

export default function openTextbook() {
  const textbookHeader = createTextbookHeader();

  const textbookContent = createBLock('div', {
    classList: ['textbook__content'],
    children: [createTextbookDetails(), createWordList()],
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

  // сделать меню активным

  updateNav('textbook');
}
