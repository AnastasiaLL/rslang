import Constants from '../../../constants/Constants';
import { USERWORD } from '../../../types/ResponsesTypes';

export default async function createUserWord(
  userId: string,
  wordId: string,
  data: USERWORD,
  token: string,
) {
  console.log(token);
  const response = await fetch(`${Constants.url}${Constants.path.users}/${userId}${Constants.path.words}/${wordId}`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const answer = await response.json();
  return answer;
}
