import createBLock from '../../../components/createBLock';
import drawButtons from './drawButtons';
import { Word, GameState } from '../../../types/sprint';
import launchTimer from './launchTimer';
import drawNewWord from './drawNewWord';
import makeWordTranslationPairs from './makeWordTranslationPairs';

export default function startGame(
  maxSec: number,
  element: Element,
  originalWords: Word[],
  startSprintGameCallback: () => void,
) {
  const gameState: GameState = {
    currentWord: undefined,
    answerFlag: true,
    correctAnswers: [],
    incorrectAnswers: [],
    totalScore: 0,
    sequenceOfSuccess: 0,
    allSequencesOfSuccess: [],
    startSprintGameCallback,
    words: makeWordTranslationPairs(originalWords),

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
  };

  drawButtons(element, gameState);
  gameState.totalScoreContainer.innerHTML = String(gameState.totalScore);
  launchTimer(maxSec, gameState);
  drawNewWord(gameState);
}
