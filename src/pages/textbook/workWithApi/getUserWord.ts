import Constants from '../../../constants/Constants';
import { USERWORD } from '../../../types/ResponsesTypes';

export default async function getUserWord(
  userId: string,
  token: string,
  wordId?: string,
) {
  const url = `${Constants.url}${Constants.path.users}/${userId}${Constants.path.words}`;
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status >= 400) {
        throw new Error(`${res.status}`);
      } else return res;
    })
    .then((res) => res.json())
    .catch((error) => error);
  if (wordId) return response.filter((word: USERWORD) => word.optional.wordId === wordId)[0];
  return response;
}
