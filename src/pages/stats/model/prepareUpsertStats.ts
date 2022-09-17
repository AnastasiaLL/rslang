import { getStatistics } from './getStats';
import nullStats from './nullStats';
import upsertStats from './upsertStats';

export default async function prepareUpsertStats(
  game: string,
  token: string,
  userId: string,
  totalWordsShown: number,
  correct: number,
  maxSequence: number,
  todayNewWords: number,
  todayStudiedWords: number,
) {
  let statsObj = await getStatistics();

  const todayDateObj = new Date();
  const todayDate = todayDateObj.toLocaleDateString();

  if (!statsObj) {
    statsObj = JSON.parse(JSON.stringify(nullStats));
  }

  if (todayDate !== statsObj.optional.today) {
    Object.assign(statsObj.optional.todayStat, nullStats.optional.todayStat);
  }

  statsObj.optional.todayStat[game].newWords += todayNewWords;
  statsObj.optional.todayStat.totalByDay.newWords += todayNewWords;
  statsObj.optional.todayStat.totalByDay.studied += todayStudiedWords;

  if (statsObj.optional.todayStat[game].bestSeries < maxSequence) {
    statsObj.optional.todayStat[game].bestSeries = maxSequence;
  }

  statsObj.optional.todayStat[game].dayWordsShown += totalWordsShown;
  statsObj.optional.todayStat[game].dayCorrectAnswers += correct;
  statsObj.optional.todayStat[game].answeredCorrectlyPercentage = Math.round((statsObj.optional
    .todayStat[game].dayCorrectAnswers / statsObj.optional.todayStat[game].dayWordsShown) * 100);

  if (!statsObj.optional.todayStat[game].answeredCorrectlyPercentage) {
    statsObj.optional.todayStat[game].answeredCorrectlyPercentage = 0;
  }

  statsObj.optional.todayStat.totalByDay.dayWordsShown += totalWordsShown;
  statsObj.optional.todayStat.totalByDay.dayCorrectAnswers += correct;
  statsObj.optional.todayStat.totalByDay.answeredCorrectlyPercentage = Math.round((statsObj.optional
    .todayStat.totalByDay.dayCorrectAnswers / statsObj.optional
    .todayStat.totalByDay.dayWordsShown) * 100);

  if (!statsObj.optional.todayStat.totalByDay.answeredCorrectlyPercentage) {
    statsObj.optional.todayStat.totalByDay.answeredCorrectlyPercentage = 0;
  }

  if (statsObj.optional.newWords.labels.includes(todayDate)) {
    const todaysData = statsObj.optional.newWords.data.pop() + todayNewWords;
    statsObj.optional.newWords.data.push(todaysData);
  } else {
    statsObj.optional.newWords.labels.push(todayDate);
    statsObj.optional.newWords.data.push(todayNewWords);
  }

  if (statsObj.optional.studiedWords.labels.includes(todayDate)) {
    const todaysData = statsObj.optional.studiedWords.data.pop() + todayStudiedWords;
    statsObj.optional.studiedWords.data.push(todaysData);
  } else {
    statsObj.optional.studiedWords.labels.push(todayDate);
    statsObj.optional.studiedWords.data.push(todayStudiedWords);
  }

  const newStatsObj = {
    learnedWords: 0,
    optional: statsObj.optional,
  };

  upsertStats(userId, token, newStatsObj);
}
