import { WORD } from './ResponsesTypes';

export interface WordPairedWithGuessTranslation extends WORD {
  guessTranslation: string;
}

export interface GameState {
  currentWord: WORD | undefined,
  answerFlag: boolean,
  correctAnswers: (WORD | undefined)[],
  incorrectAnswers: (WORD | undefined)[],
  totalScore: number,
  sequenceOfSuccess: number;
  allSequencesOfSuccess: number[],
  words: WordPairedWithGuessTranslation[],
  wordContainer: HTMLElement,
  translationContainer: HTMLElement,
  totalScoreContainer: HTMLElement,
  sequenceOfSuccessContainer: HTMLElement,
  timerContainer: HTMLElement,
  timer: number,
  sprintContainer: HTMLElement,
}
