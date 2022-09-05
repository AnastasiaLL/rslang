import { USER } from '../../../types/ResponsesTypes';
import Constants from '../../../constants/Constants';

export default async function createUser(data: USER) {
  const response = await fetch(`${Constants.url}${Constants.path.users}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const answer = await response.json();
  return answer;
}
