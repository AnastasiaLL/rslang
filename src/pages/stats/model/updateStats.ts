import Constants from '../../../constants/Constants';
import { GameState } from '../../../types/sprint';
import { getStatistics } from './getStats';

function getAnsweredCorrectlyPercentage(gameState: GameState) {
  const correct = gameState.correctAnswers.length;
  const total = [...gameState.correctAnswers, gameState.incorrectAnswers].length;
  return (correct / total) * 100;
}

export default async function updateStatistics(gameState: GameState) {
  const token = window.localStorage.getItem(Constants.localStorageKeys.token);
  const userId = window.localStorage.getItem(Constants.localStorageKeys.userId);

  const url = `${Constants.url}/users/${userId}/statistics`;

  // 1. получаем статистику этого пользователя
  const stats = await getStatistics();
  console.log('stats', stats);

  // 2. Проверяем в статистике дату
  const todayDateObj = new Date();
  const todayDate = todayDateObj.toLocaleDateString();

  if (todayDate !== stats.today) {
    // обнулить статистику до обновления
  }

  // 3. Рассчитываем все нужные результаты

  // TODO как считать новые слова?

  const answeredCorrectlyPercentage = getAnsweredCorrectlyPercentage(gameState);
  const bestSeries = Math.max(...gameState.allSequencesOfSuccess);

  const statData = {
    learnedWords: 0,
    optional: {
      today: todayDate,
      todayStat: {
        sprint: {
          activity: 'sprint',
          newWords: 100, // ??????????????????????????
          answeredCorrectlyPercentage: 60,
          bestSeries: 50,
        },
        audio: {
          activity: 'audioChallenge',
          newWords: 100,
          answeredCorrectlyPercentage: 90,
          bestSeries: 50,
        },
        totalByDay: {
          activity: 'totalByDay',
          newWords: 200,
          studied: 70,
          answeredCorrectlyPercentage: 75,
        },
      },
      newWords: {
        labels: ['22.08.2022', '23.08.2022'],
        data: [10, 20],
      },
      studiedWords: {
        labels: ['22.08.2022', '23.08.2022'],
        data: [10, 20],
      },
    },
  };

  const response = await fetch(url, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statData),
  });

  const answer = await response.json();
  const status = response;

  console.log(status);
  console.log(answer);
}
