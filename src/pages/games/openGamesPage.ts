import createBLock from '../../components/createBLock';
import updateNav from '../../utils/updateNav';

export default function openGamesPage() {
    const mainBlock = document.querySelector('#main-block');

    const paragraph = createBLock('h3', {
      classList: ['start-games__description'],
      children: [ 'Закрепи новые слова при помощи игр'],
    });

    const H1 = createBLock('h1', {
      classList: ['start-games__h'],
      children: [ 'ИГРЫ'],
    });


//===========================Аудиовызов===========================
    const audiocallH1 = createBLock('h3', {
      classList: ['audiocall__h1'],
      children: [ 'Аудиовызов' ],
    });
    const audiocallP = createBLock('p', {
      classList: ['audiocall__p'],
      children: [ 'Игра Аудиовызов улучшает восприятие речи на слух' ],
    });

    const audiocallWrapper = createBLock('div', {
      classList: ['audiocall__wrapper', 'game'],
      children: [audiocallH1, audiocallP],
    });

//==========================Спринт============================
    const sprintH1 = createBLock('h3', {
      classList: ['sprint__h1'],
      children: [ 'Спринт' ],
    });
    const sprintP = createBLock('p', {
      classList: ['sprint__p'],
      children: [ 'Игра Спринт учит быстро переводить слова' ],
    });

    const sprintWrapper = createBLock('div', {
      classList: ['sprint__wrapper', 'game'],
      children: [sprintH1, sprintP],
    });
    
    


    
    const gamesWrapper = createBLock('div', {
      classList: ['games__wrapper'],
      children: [audiocallWrapper, sprintWrapper ],
    });

    const infoGames = createBLock('div', {
      classList: ['info-games'],
      children: [H1, paragraph, gamesWrapper ],
      // children: [gamesWrapper ],
    });

    const startGames = createBLock('div', {
      classList: ['start-games'],
      children: [infoGames],
    });

  if (mainBlock) {
    mainBlock.innerHTML = '';
    mainBlock.append(startGames );
  }

  // сделать меню активным

  updateNav('games');
}
