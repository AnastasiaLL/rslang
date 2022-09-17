import { STATISTICS } from '../../../types/ResponsesTypes';

export default function clearDayStats(statsObj: STATISTICS) {
  const cleared = {
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
  };

  Object.assign(statsObj.optional.todayStat, cleared);
}
