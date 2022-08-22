import createBLock from '../../components/createBLock';
import updateNav from '../../utils/updateNav';

export default function openTextbook() {
  const textbook = createBLock('div', { classList: ['textbook__page'] });

  textbook.innerHTML = 'Здесь скоро будет учебник';

  // почистить главный блок

  const mainBlock = document.querySelector('#main-block');

  // записать стр в главный блок

  if (mainBlock) {
    mainBlock.innerHTML = '';
    mainBlock.append(textbook);
  }

  // сделать меню активным

  updateNav('textbook');
}
