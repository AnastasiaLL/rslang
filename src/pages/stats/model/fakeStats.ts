import threeDaysDates from '../../../utils/dates';

export const dayStats = {
  sprint: {
    dayWordsShown: 20,
    dayCorrectAnswers: 12,
    activity: 'sprint',
    newWords: 10,
    answeredCorrectlyPercentage: 60,
    bestSeries: 5,
  },
  audio: {
    dayWordsShown: 20,
    dayCorrectAnswers: 18,
    activity: 'audio',
    newWords: 10,
    answeredCorrectlyPercentage: 90,
    bestSeries: 5,
  },
  totalByDay: {
    dayWordsShown: 100,
    dayCorrectAnswers: 75,
    activity: 'totalByDay',
    newWords: 20,
    studied: 7,
    answeredCorrectlyPercentage: 75,
  },
};

export const newWordsByDayStats = {
  labels: threeDaysDates(),
  data: [65, 80, 40],
};

export const studiedByDayStats = {
  labels: threeDaysDates(),
  data: [10, 16, 36],
};
