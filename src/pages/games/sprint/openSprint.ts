import startGame from './startGame';
import Constants from '../../../constants/Constants';
import getWords from '../../textbook/workWithApi/getWords';

export default function startSprintGame() {
  const mainBlock = document.querySelector('#main-block');
  if (mainBlock) {
    mainBlock.innerHTML = '';

    getWords(1, 1).then((wordList) => {
      console.log(wordList);
      startGame(Constants.sprintGame.gameTime, mainBlock, wordList, startSprintGame);
    });
  }
}
