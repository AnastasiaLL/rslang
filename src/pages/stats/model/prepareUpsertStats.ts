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
  // 1. получаем/создаем объект статистики этого пользователя
  let statsObj = await getStatistics();

  const todayDateObj = new Date();
  const todayDate = todayDateObj.toLocaleDateString();

  if (!statsObj) {
    statsObj = JSON.parse(JSON.stringify(nullStats));
  }

  // 2. Проверяем в статистике дату сегодняшнего дня
  if (todayDate !== statsObj.optional.today) {
    // обнулить статистику дня всю, до обновления
    Object.assign(statsObj.optional.todayStat, nullStats.optional.todayStat);
  }

  // 3. Рассчитываем все нужные для статистики результаты и кладем в пришедший объект

  // 3.1. Новые слова за день
  statsObj.optional.todayStat[game].newWords += todayNewWords;
  statsObj.optional.todayStat.totalByDay.newWords += todayNewWords;

  // 3.2. Изученные слова за день
  statsObj.optional.todayStat.totalByDay.studied += todayStudiedWords;

  // 3.3. Правильных ответов подряд
  if (statsObj.optional.todayStat[game].bestSeries < maxSequence) {
    statsObj.optional.todayStat[game].bestSeries = maxSequence;
  }

  // 3.4. correct/total %

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

  // 3.5 Новые слова в статистике за несколько дней

  if (statsObj.optional.newWords.labels.includes(todayDate)) {
    // есть этот день в этой статистике
    const todaysData = statsObj.optional.newWords.data.pop() + todayNewWords;
    statsObj.optional.newWords.data.push(todaysData);
  } else {
    statsObj.optional.newWords.labels.push(todayDate);
    statsObj.optional.newWords.data.push(todayNewWords);
  }

  // 3.6 Изученные слова в статистике за несколько дней

  if (statsObj.optional.studiedWords.labels.includes(todayDate)) {
    // есть ли этот день в этой статистике
    const todaysData = statsObj.optional.studiedWords.data.pop() + todayStudiedWords;
    statsObj.optional.studiedWords.data.push(todaysData);
  } else {
    statsObj.optional.studiedWords.labels.push(todayDate);
    statsObj.optional.studiedWords.data.push(todayStudiedWords);
  }

  // 4. Делаем новый объект, куда переписываем все поля пришедшего в том числе обновленнные
  //  иначе бэкенд не берет

  const newStatsObj = {
    learnedWords: 0,
    optional: statsObj.optional,
  };

  console.log('newStatsObj before put', newStatsObj);

  upsertStats(userId, token, newStatsObj);
}
