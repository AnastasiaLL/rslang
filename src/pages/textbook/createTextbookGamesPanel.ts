import createBLock from '../../components/createBLock';
import Constants from '../../constants/Constants';
import { getGameReadyFromTextBook } from '../games/sprint/getGameReady';

export default function createTextbookGamesPanel(): HTMLElement {
  const text = createBLock('span', {
    classList: [],
    children: [Constants.gamesPage.onTextBookPage],
  });

  const buttonAudio = createBLock('button', {
    classList: ['button', 'secondary-button'],
    children: [Constants.gamesPage.audioChallengeHeading],
    event: 'click',
    // listener: ,
  });

  const buttonSprint = createBLock('button', {
    classList: ['button', 'secondary-button'],
    children: [Constants.gamesPage.sprintHeading],
    event: 'click',
    listener: () => getGameReadyFromTextBook(),
  });

  const textbookGames = createBLock('div', {
    classList: ['textbook__games'],
    children: [text, buttonAudio, buttonSprint],
  });

  return textbookGames;
}
