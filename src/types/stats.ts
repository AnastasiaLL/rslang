export interface DayStat {
  dayWordsShown: number, // сумма всех показанных за день слов
  dayCorrectAnswers: number, // сумма всех за день правильных ответов
  activity: string, // название блока = название игры или статистика за день
  newWords: number, // сколько новых слов было показано всего в этой игре в этот день
  // новые слова - это слова, которые впервые использовались в мини-играх вне зависимости от того,
  // открывались мини-игры на странице учебника или по ссылке в меню

  answeredCorrectlyPercentage: number, // % dayCorrectAnswers от dayWordsShown
  bestSeries?: number, // серия = правильных ответов в этой игре подряд (самое больщое за день)
  studied?: number, // сумма = сколько слов перешли в изученные по итогам всех игр за день
                          /// + помечены пользователем в учебнике в этот день
}

export interface SeveralDaysStat {
  labels: string[], // ['22.08.2022', '23.08.2022', '24.08.2022']
                    // даты дней в формате  date.toLocaleDateString()

  data: number[], // [10, 20, 30]
                  // количество слов в порядке соотв дням выше
}

export interface AllDayStat {
  sprint: DayStat,
  audio: DayStat,
  totalByDay: DayStat,
}
