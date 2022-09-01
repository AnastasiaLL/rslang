import Constants from '../../../constants/Constants';
import { getStatistics } from './getStats';
import nullStats from './nullStats';
import upsertStats from './upsertStats';

export default async function updateStatistics(
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

  if (!statsObj) {
    statsObj = JSON.parse(JSON.stringify(nullStats));
    console.log('нулевой statsObj', statsObj);
  }

  // 2. Проверяем в статистике дату сегодняшнего дня
  const todayDateObj = new Date();
  const todayDate = todayDateObj.toLocaleDateString();
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

  statsObj.optional.todayStat[game].dayWordsShown = totalWordsShown;
  statsObj.optional.todayStat[game].dayCorrectAnswers = correct;
  statsObj.optional.todayStat[game].answeredCorrectlyPercentage = Math.round((statsObj.optional
    .todayStat[game].dayCorrectAnswers / statsObj.optional.todayStat[game].dayWordsShown) * 100)
    ?? 0;

  statsObj.optional.todayStat.totalByDay.dayWordsShown += totalWordsShown;
  statsObj.optional.todayStat.totalByDay.dayCorrectAnswers += correct;
  statsObj.optional.todayStat.totalByDay.answeredCorrectlyPercentage = Math.round((statsObj.optional
    .todayStat.totalByDay.dayCorrectAnswers / statsObj.optional
    .todayStat.totalByDay.dayWordsShown) * 100) ?? 0;

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
    // есть этот день в этой статистике
    const todaysData = statsObj.optional.studiedWords.data.pop() + todayNewWords;
    statsObj.optional.studiedWords.data.push(todaysData);
  } else {
    statsObj.optional.studiedWords.labels.push(todayDate);
    statsObj.optional.studiedWords.data.push(todayNewWords);
  }

  // 4. Делаем новый объект, куда переписываем все поля пришедшего в том числе обновленнные
  //  иначе бэкенд не берет

  /*
  const newStatsObj = {
    learnedWords: 0,
    optional: {
      today: todayDate,
      todayStat: {
        sprint: {
          dayWordsShown: statsObj.optional.todayStat.sprint.dayWordsShown,
          dayCorrectAnswers: statsObj.optional.todayStat.sprint.dayCorrectAnswers,
          activity: 'sprint',
          newWords: statsObj.optional.todayStat.sprint.newWords,
          answeredCorrectlyPercentage:
                statsObj.optional.todayStat.sprint.answeredCorrectlyPercentage,
          bestSeries: statsObj.optional.todayStat.sprint.bestSeries,
        },
        audio: {
          dayWordsShown: statsObj.optional.todayStat.audio.dayWordsShown,
          dayCorrectAnswers: statsObj.optional.todayStat.audio.dayCorrectAnswers,
          activity: 'audio',
          newWords: statsObj.optional.todayStat.audio.newWords,
          answeredCorrectlyPercentage:
                statsObj.optional.todayStat.audio.answeredCorrectlyPercentage,
          bestSeries: statsObj.optional.todayStat.audio.bestSeries,
        },
        totalByDay: {
          dayWordsShown: statsObj.optional.todayStat.totalByDay.dayWordsShown,
          dayCorrectAnswers: statsObj.optional.todayStat.totalByDay.dayCorrectAnswers,
          activity: 'totalByDay',
          newWords: statsObj.optional.todayStat.totalByDay.newWords,
          studied: statsObj.optional.todayStat.totalByDay.studied,
          answeredCorrectlyPercentage: statsObj.optional
            .todayStat.totalByDay.answeredCorrectlyPercentage,
        },
      },
      newWords: {
        labels: statsObj.optional.newWords.labels,
        data: statsObj.optional.newWords.data,
      },
      studiedWords: {
        labels: statsObj.optional.studiedWords.labels,
        data: statsObj.optional.studiedWords.data,
      },
    },
  };
  */

  const newStatsObj = {
    learnedWords: 0,
    optional: statsObj.optional,
  };

  console.log('newStatsObj before put', newStatsObj);

  upsertStats(userId, token, newStatsObj);
}
