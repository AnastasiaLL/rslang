import Constants from '../../../constants/Constants';

export default async function getWord(wordId: string) {
  const url = `${Constants.url}${Constants.path.words}/${wordId}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  const answer = await response.json();
  return answer;
}
