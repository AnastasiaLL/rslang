import { USER } from '../../../types/types';

export default async function signInUser(data: USER) {
  console.log(data);
  const response = await fetch('https://rslang2022q1.herokuapp.com/signin', {
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
