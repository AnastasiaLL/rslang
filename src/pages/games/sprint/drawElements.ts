import createBLock from '../../../components/createBLock';
import Constants from '../../../constants/Constants';
import { GameState } from '../../../types/sprint';
import drawButtons from './drawButtons';
import finishGame from './finishGame';

export default function drawElements(gameState: GameState) {
  const buttonsBlock = drawButtons(gameState);

  const gameGuess = createBLock('div', {
    classList: ['game-guess'],
    children: [gameState.wordContainer,
      gameState.translationContainer],
  });

  const totalScoreBlock = createBLock('div', {
    classList: ['score'],
    children: [Constants.sprintGame.score, gameState.totalScoreContainer],
  });

  const sequenceOfSuccessBlock = createBLock('div', {
    classList: ['score'],
    children: [Constants.sprintGame.sequenceOfSuccess, gameState.sequenceOfSuccessContainer],
  });

  const scores = createBLock('div', {
    classList: ['scores'],
    children: [totalScoreBlock, sequenceOfSuccessBlock],
  });

  const buttonStop = createBLock('button', {
    classList: ['button', 'secondary-button'],
    children: [Constants.sprintGame.stopButtonText],
    event: 'click',
    listener: () => finishGame(gameState),
  });

  gameState.sprintContainer.append(
    gameState.timerContainer,
    gameGuess,
    buttonsBlock,
    scores,
    buttonStop,
  );
}
