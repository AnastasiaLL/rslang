import Constants from '../../../constants/Constants';
import { STATISTICS } from '../../../types/ResponsesTypes';

export default async function upsertStats(userId: string, token: string, newStatsObj: STATISTICS) {
  const url = `${Constants.url}/users/${userId}/statistics`;

  const response = await fetch(url, {
    method: 'PUT',
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newStatsObj),
  });

  const answer = await response.json();
  const status = response;

  console.log(status);
  console.log(answer);
}
