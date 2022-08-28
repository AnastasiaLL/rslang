import createBLock from '../../../components/createBLock';
import Constants from '../../../constants/Constants';
import { GameState } from '../../../types/sprint';
import drawNewWord from './drawNewWord';

export default function drawButtons(container: Element, gameState: GameState) {
  const registerRightAnswer = () => {
    const newTotalScore = gameState.totalScore + 1;
    Object.assign(gameState, { totalScore: newTotalScore });

    const newSequenceOfSuccess = gameState.sequenceOfSuccess + 1;
    Object.assign(gameState, { sequenceOfSuccess: newSequenceOfSuccess });

    console.log(gameState.sequenceOfSuccess);

    gameState.correctAnswers.push(gameState.currentWord);
  };

  const registerWrongAnswer = () => {
    gameState.allSequencesOfSuccess.push(gameState.sequenceOfSuccess);
    console.log('gameState.allSequencesOfSuccess', gameState.allSequencesOfSuccess);
    Object.assign(gameState, { sequenceOfSuccess: 0 });
    console.log('gameState.allSequencesOfSuccess 2', gameState.allSequencesOfSuccess);

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
    // attributes: {'id': 'true-button'},
    children: [Constants.sprintGame.trueButtonText],
    event: 'click',
    listener: guessTrue,
  });

  const buttonFalse = createBLock('button', {
    classList: ['button', 'secondary-button', 'false-button'],
    // attributes: { id: 'false-button' },
    children: [Constants.sprintGame.falseButtonText],
    event: 'click',
    listener: guessFalse,
  });

  container.append(
    gameState.totalScoreContainer,
    gameState.sequenceOfSuccessContainer,
    gameState.timerContainer,
    gameState.wordContainer,
    gameState.translationContainer,
    buttonTrue,
    buttonFalse,
  );
}
