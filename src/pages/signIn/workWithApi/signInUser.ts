import { USER } from '../../../types/ResponsesTypes';
import Constants from '../../../constants/Constants';

export default async function signInUser(data: USER) {
  console.log(data);
  const response = await fetch(`${Constants.url}${Constants.path.signIn}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const answer = await response;
  if (answer.status === 404 || answer.status === 403) {
    return answer;
  }
  const answer2 = answer.json();
  return answer2;
}
