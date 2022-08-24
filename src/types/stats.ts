export interface DayStat {
  activity: string, // название игры
  newWords: number, // сколько новых слов было показано всего в этой игре в этот день
  // новые слова - это слова, которые впервые использовались в мини-играх вне зависимости от того,
  // открывались мини-игры на странице учебника или по ссылке в меню

  answeredCorrectlyPercentage: number, // % правильных ответов в этой  игре в этот день
  bestSeries?: number, // серия = правильных ответов в этой игре подряд (самое больщое за день)
  studied?: number, // сумма = сколько слов перешли в изученные по итогам всех игр за день
                          /// + помечены пользователем в учебнике в этот день
}

// DayStat - пример данных
// [
//   {
//     activity: 'sprint',
//     newWords: 10,
//     answeredCorrectlyPercentage: 60,
//     bestSeries: 5,
//   },
//   {
//    newWords: 10,
//    answeredCorrectlyPercentage: 90,
//    bestSeries: 5,
//  },
//  {
//    activity: 'totalByDay',
//    newWords: 20,
//    studied: 7,
//    answeredCorrectlyPercentage: 75,
//  },
// ];

export interface SeveralDaysStat {
  labels: string[], // ['22.08.2022', '23.08.2022', '24.08.2022']
                    // даты дней в формате  date.toLocaleDateString()

  data: number[], // [10, 20, 30]
                  // количество слов в порядке соотв дням выше
}
