import threeDaysDates from '../../../utils/dates';

export const dayStats = [
  {
    activity: 'sprint',
    newWords: 10,
    answeredCorrectlyPercentage: 60,
    bestSeries: 5,
  },
  {
    activity: 'audioChallenge',
    newWords: 10,
    answeredCorrectlyPercentage: 90,
    bestSeries: 5,
  },
  {
    activity: 'totalByDay',
    newWords: 20,
    studied: 7,
    answeredCorrectlyPercentage: 75,
  },
];

export const newWordsByDayStats = {
  labels: threeDaysDates(),
  data: [65, 80, 40],
};

export const studiedByDayStats = {
  labels: threeDaysDates(),
  data: [10, 16, 36],
};
