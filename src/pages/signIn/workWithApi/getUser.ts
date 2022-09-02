import Constants from '../../../constants/Constants';

export default async function signInUser(id: string, token: string) {
  const response = await fetch(`${Constants.url}${Constants.path.users}/${id}`, {
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
