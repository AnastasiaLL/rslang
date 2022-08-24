import { DayStat, SeveralDaysStat } from '../../../types/stats';
import threeDaysDates from '../../../utils/dates';

export function dayStats(): DayStat[] {
  // тут получаем с сервера
  // или с локалстораджа?
  const data = null;

  // если получили ничего, то нулевые данные, чтобы показались графики
  const initialData = [
    {
      activity: 'sprint',
      newWords: 0,
      answeredCorrectlyPercentage: 0,
      bestSeries: 0,
    },
    {
      activity: 'audioChallenge',
      newWords: 0,
      answeredCorrectlyPercentage: 0,
      bestSeries: 0,
    },
    {
      activity: 'totalByDay',
      newWords: 0,
      studied: 0,
      answeredCorrectlyPercentage: 0,
    },
  ];

  return data ?? initialData;
}

export function newWordsByDayStats(): SeveralDaysStat {
  const data = null;

  const initialData = {
    labels: threeDaysDates(),
    data: [0, 0, 0],
  };

  return data ?? initialData;
}

export function studiedByDayStats(): SeveralDaysStat {
  const data = null;

  const initialData = {
    labels: threeDaysDates(),
    data: [0, 0, 0],
  };

  return data ?? initialData;
}
