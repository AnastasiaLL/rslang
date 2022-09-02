import createBLock from '../../../components/createBLock';
import Constants from '../../../constants/Constants';
import { GameState } from '../../../types/sprint';
import drawNewWord from './drawNewWord';
import finishGame from './finishGame';

export default function drawButtons(gameState: GameState) {
  const registerRightAnswer = () => {
    const newTotalScore = gameState.totalScore + 1;
    Object.assign(gameState, { totalScore: newTotalScore });
    const newSequenceOfSuccess = gameState.sequenceOfSuccess + 1;
    Object.assign(gameState, { sequenceOfSuccess: newSequenceOfSuccess });
    gameState.correctAnswers.push(gameState.currentWord);
  };

  const registerWrongAnswer = () => {
    gameState.allSequencesOfSuccess.push(gameState.sequenceOfSuccess);
    Object.assign(gameState, { sequenceOfSuccess: 0 });
    gameState.incorrectAnswers.push(gameState.currentWord);
  };

  const guessTrue = () => {
    if (gameState.answerFlag) {
      registerRightAnswer();
    } else {
      registerWrongAnswer();
    }
    drawNewWord(gameState);
  };

  const guessFalse = () => {
    if (!gameState.answerFlag) {
      registerRightAnswer();
    } else {
      registerWrongAnswer();
    }
    drawNewWord(gameState);
  };

  const buttonTrue = createBLock('button', {
    classList: ['button', 'secondary-button', 'true-button'],
    children: [Constants.sprintGame.trueButtonText],
    event: 'click',
    listener: guessTrue,
  });

  const buttonFalse = createBLock('button', {
    classList: ['button', 'secondary-button', 'false-button'],
    children: [Constants.sprintGame.falseButtonText],
    event: 'click',
    listener: guessFalse,
  });

  const buttonsBlock = createBLock('div', {
    classList: ['buttons-block'],
    children: [buttonTrue, buttonFalse],
  });

  window.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'ArrowLeft':
        guessTrue();
        break;
      case 'ArrowRight':
        guessFalse();
        break;
      case 'Space':
        finishGame(gameState);
        break;
      default:
        break;
    }
  });

  return buttonsBlock;
}
