import { AllDayStat, SeveralDaysStat } from '../../../types/stats';
import { STATISTICS } from '../../../types/ResponsesTypes';
import threeDaysDates from '../../../utils/dates';
import Constants from '../../../constants/Constants';
import nullStats from './nullStats';

export async function getStatistics() {
  const token = window.localStorage.getItem(Constants.localStorageKeys.token);
  const userId = window.localStorage.getItem(Constants.localStorageKeys.userId);

  const url = `${Constants.url}/users/${userId}/statistics`;

  try {
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
  } catch {
    return null;
  }
}

export async function dayStats(allStats: STATISTICS): Promise<AllDayStat> {
  if (allStats) {
    return allStats.optional.todayStat;
  }
  // если получили ничего, то нулевые данные, чтобы показались графики

  return nullStats.optional.todayStat;
}

export async function newWordsByDayStats(allStats: STATISTICS): Promise<SeveralDaysStat> {
  if (allStats) {
    return allStats.optional.newWords;
  }
  return nullStats.optional.newWords;
}

export async function studiedByDayStats(allStats: STATISTICS): Promise<SeveralDaysStat> {
  if (allStats) {
    return allStats.optional.studiedWords;
  }
  return nullStats.optional.studiedWords;
}
