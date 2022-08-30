import Constants from '../../../constants/Constants';

export default async function getUserWord(
  userId: string,
  wordId: string,
  token: string,
) {
  const url = `${Constants.url}${Constants.path.users}/${userId}${Constants.path.words}/${wordId}`;
  console.log(url);
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const answer = await response.json();
  return answer;
}
