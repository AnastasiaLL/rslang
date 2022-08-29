import { GameState } from '../../../types/sprint';
import createBLock from '../../../components/createBLock';
import Constants from '../../../constants/Constants';

export default function finishGame(gameState: GameState) {
  gameState.allSequencesOfSuccess.push(gameState.sequenceOfSuccess);
  console.log('gameState.allSequencesOfSuccess', gameState.allSequencesOfSuccess);
  Object.assign(gameState, { sequenceOfSuccess: 0 });
  console.log('gameState.allSequencesOfSuccess 2', gameState.allSequencesOfSuccess);

  const finishMessage = createBLock('div', {
    classList: ['finish-message'],
    children: ['Your results'],
  });

  const correctAnswersContainer = createBLock('div', {
    classList: ['correct-answers'],
  });

  const incorrectAnswersContainer = createBLock('div', {
    classList: ['incorrect-answers'],
  });

  // TODO updateStatistics();

  const startAgainButton = createBLock('button', {
    classList: ['button', 'secondary-button'],
    children: [Constants.sprintGame.startAgainButtonText],
    // attributes: { id: 'false-button' },
    event: 'click',
    listener: gameState.startSprintGameCallback,
  });

  const container = document.querySelector('#main-block');
  if (container) {
    container.innerHTML = '';
    container.append(
      finishMessage,
      String(gameState.totalScore),
      correctAnswersContainer,
      incorrectAnswersContainer,
      startAgainButton,
    );
    console.log(
      gameState.correctAnswers,
      gameState.incorrectAnswers,
      gameState.allSequencesOfSuccess,
    );
  }
}
