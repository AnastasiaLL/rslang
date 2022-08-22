import { USER } from '../../../types/ResponsesTypes';

export default async function createUser(data: USER) {
  console.log(data);
  const response = await fetch('https://rslang2022q1.herokuapp.com/users', {
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
