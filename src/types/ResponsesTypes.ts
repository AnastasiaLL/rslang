// responses

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

export interface USERWORD {
    difficulty: string;
    optional: {
      studied: boolean,
      'sprint-new': boolean;
      audiochallengeNew: boolean;
      correctAnswers: number;
      incorrectAnswers: number;
      wordId: string;
    }
}

export interface STATISTIC {
    learnedWords: number;
    optional: object
}

export interface SETTING {
    wordsPerDay: number;
    optional: object
}
