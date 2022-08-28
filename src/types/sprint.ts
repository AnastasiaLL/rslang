export interface Word {
  id: string;
  word: string;
  wordTranslate: string;
}

export interface WordPairedWithGuessTranslation {
  id: string;
  word: string;
  wordTranslate: string;
  guessTranslation: string;
}

export interface GameState {
  currentWord: Word | undefined,
  answerFlag: boolean,
  correctAnswers: (Word | undefined)[],
  incorrectAnswers: (Word | undefined)[],
  totalScore: number,
  sequenceOfSuccess: number;
  allSequencesOfSuccess: number[],
  startSprintGameCallback: () => void,
  words: WordPairedWithGuessTranslation[],
  wordContainer: Element,
  translationContainer: Element,
  totalScoreContainer: Element,
  sequenceOfSuccessContainer: Element,
  timerContainer: Element,
  timer: number,
}
