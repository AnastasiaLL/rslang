// responses 

export interface WORD {
    id: string;
    group: number; // why number ? 
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
    name: string;
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
    optional: object   //??
}

export interface STATISTIC {
    learnedWords: number;
    optional: object   //??
}

export interface SETTING {
    wordsPerDay: number;
    optional: object   //??
}
