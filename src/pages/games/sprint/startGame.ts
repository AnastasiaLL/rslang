import createBLock from '../../../components/createBLock';
import drawElements from './drawElements';
import { GameState, WordPairedWithGuessTranslation } from '../../../types/sprint';
import launchTimer from './launchTimer';
import drawNewWord from './drawNewWord';

export default function startGame(
  maxSec: number,
  sprintContainer: HTMLElement,
  originalWords: WordPairedWithGuessTranslation[],
) {
  const gameState: GameState = {
    currentWord: undefined,
    answerFlag: true,
    correctAnswers: [],
    incorrectAnswers: [],
    totalScore: 0,
    sequenceOfSuccess: 0,
    allSequencesOfSuccess: [],
    words: originalWords,

    wordContainer: createBLock('div', {
      classList: ['word'],
    }),
    translationContainer: createBLock('div', {
      classList: ['translation'],
    }),

    totalScoreContainer: createBLock('div', {
      classList: ['total-score'],
    }),

    sequenceOfSuccessContainer: createBLock('div', {
      classList: ['sequence-of-success'],
    }),

    timerContainer: createBLock('div', {
      classList: ['timer'],
    }),

    timer: 0,

    sprintContainer,
  };

  launchTimer(maxSec, gameState);
  drawElements(gameState);
  gameState.totalScoreContainer.innerHTML = String(gameState.totalScore);
  drawNewWord(gameState);
}
