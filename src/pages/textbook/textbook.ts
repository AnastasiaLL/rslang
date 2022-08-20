import createBLock from '../../components/createBLock';

export default function drawTextbook() {
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

  document.querySelector('#textbook')?.classList.add('active');
}
