import updateNav from '../../utils/updateNav';

export default function openGamesPage() {
  const zaglushka = 'Здесь скоро будут игры';

  // почистить главный блок

  const mainBlock = document.querySelector('#main-block');

  // записать стр в главный блок

  if (mainBlock) {
    mainBlock.innerHTML = '';
    mainBlock.append(zaglushka);
  }

  // сделать меню активным

  updateNav('games');
}
