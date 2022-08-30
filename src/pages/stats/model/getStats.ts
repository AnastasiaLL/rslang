import { AllDayStat, DayStat, SeveralDaysStat } from '../../../types/stats';
import threeDaysDates from '../../../utils/dates';
import Constants from '../../../constants/Constants';

export async function getStatistics() {
  const token = window.localStorage.getItem(Constants.localStorageKeys.token);
  const userId = window.localStorage.getItem(Constants.localStorageKeys.userId);

  const url = `${Constants.url}/users/${userId}/statistics`;

  const response = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  const answer = await response.json();
  return answer;
}

export async function dayStats(): Promise<AllDayStat> {
  const allStats = await getStatistics();
  const data = allStats.optional.todayStat;

  // если получили ничего, то нулевые данные, чтобы показались графики
  const initialData = {
    sprint: {
      activity: 'sprint',
      newWords: 10,
      answeredCorrectlyPercentage: 60,
      bestSeries: 5,
    },
    audio: {
      activity: 'audioChallenge',
      newWords: 10,
      answeredCorrectlyPercentage: 90,
      bestSeries: 5,
    },
    totalByDay: {
      activity: 'totalByDay',
      newWords: 20,
      studied: 7,
      answeredCorrectlyPercentage: 75,
    },
  };

  return data ?? initialData;
}

export async function newWordsByDayStats(): Promise<SeveralDaysStat> {
  // const data = null;
  const allStats = await getStatistics();
  const data = allStats.optional.newWords;

  const initialData = {
    labels: threeDaysDates(),
    data: [0, 0, 0],
  };

  return data ?? initialData;
}

export async function studiedByDayStats(): Promise<SeveralDaysStat> {
  // const data = null;
  const allStats = await getStatistics();
  const data = allStats.optional.studiedWords;

  const initialData = {
    labels: threeDaysDates(),
    data: [0, 0, 0],
  };

  return data ?? initialData;
}
