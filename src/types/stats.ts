export interface DayStat {
  dayWordsShown: number,
  dayCorrectAnswers: number,
  activity: string,
  newWords: number,

  answeredCorrectlyPercentage: number,
  bestSeries?: number,
  studied?: number,
}

export interface SeveralDaysStat {
  labels: string[],
  data: number[],
}

export interface AllDayStat {
  sprint: DayStat,
  audio: DayStat,
  totalByDay: DayStat,
}
