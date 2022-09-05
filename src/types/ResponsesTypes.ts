import { AllDayStat, SeveralDaysStat } from './stats';

export interface WORD {
    id: string;
    group: number;
    page: number;
    word: string;
    image: string;
    audio: string;
    audioMeaning: string;
    audioExample: string;
    textMeaning: string;
    textExample: string;
    transcription: string;
    wordTranslate: string;
    textMeaningTranslate: string;
    textExampleTranslate: string
}

export interface USER {
    name?: string;
    email: string;
    password: string
}

export interface AUTH {
    message: string;
    token: string;
    refreshToken: string;
    userId: string;
    name: string
}

export interface UserWordOptional {
  [key: string]: string | number | boolean,
  correctAnswersSequence: number,
  sprintShown: number,
  audioShown: number,
  studied: boolean,
  sprintNew: boolean,
  audioNew: boolean,
  correctAnswers: number,
  incorrectAnswers: number,
  wordId: string,
}

export interface USERWORD {
    difficulty: string;
    optional: UserWordOptional,
}

export interface STATISTICS {
  learnedWords: number,
  optional: {
    today: Date,
    todayStat: AllDayStat,
    newWords: SeveralDaysStat,
    studiedWords: SeveralDaysStat,
  }
}

export interface SETTING {
    wordsPerDay: number;
    optional: object
}
