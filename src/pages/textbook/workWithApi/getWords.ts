import Constants from '../../../constants/Constants';

export default async function getWords(page: string, group: string) {
  const response = await fetch(`${Constants.url}${Constants.path.words}?page=${page}&group=${group}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  const answer = await response.json();
  return answer;
}
