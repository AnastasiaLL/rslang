import threeDaysDates from '../../../utils/dates';

const nullStats = {
  learnedWords: 0,
  optional: {
    today: new Date().toLocaleDateString(),
    todayStat: {
      sprint: {
        dayWordsShown: 0,
        dayCorrectAnswers: 0,
        activity: 'sprint',
        newWords: 0,
        answeredCorrectlyPercentage: 0,
        bestSeries: 0,
      },
      audio: {
        dayWordsShown: 0,
        dayCorrectAnswers: 0,
        activity: 'audio',
        newWords: 0,
        answeredCorrectlyPercentage: 0,
        bestSeries: 0,
      },
      totalByDay: {
        dayWordsShown: 0,
        dayCorrectAnswers: 0,
        activity: 'totalByDay',
        newWords: 0,
        studied: 0,
        answeredCorrectlyPercentage: 0,
      },
    },
    newWords: {
      labels: threeDaysDates(),
      data: [0, 0, 0],
    },
    studiedWords: {
      labels: threeDaysDates(),
      data: [0, 0, 0],
    },
  },
};

export default nullStats;
