import themes from './themes';
import PositionedCharacter from './PositionedCharacter';
import Magician from './Magician';
import Bowman from './Bowman';
import Vampire from './Vampire';
import Daemon from './Daemon';
import Swordsman from './Swordsman';
import Undead from './Undead';
import { generateTeam } from './generators';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.boardSize = gamePlay.boardSize;
  }

  init() {
    this.gamePlay.drawUi(themes.prairie);
    console.log(`${'размер поля' + ': '}${this.boardSize}`);
    const userTeam = generateTeam([Magician, Bowman, Swordsman], 4, 2);
    const botTeam = generateTeam([Vampire, Daemon, Undead], 4, 2);
    console.log(this.getPositionUser(), this.getPositionBot());
    const positions = [];

    for (let i = 0; i < userTeam.members.length; i += 1) {
      const positionedUserChar = new PositionedCharacter(userTeam.members[i], this.getPositionUser());
      if (positionedUserChar.position !== this.getPositionUser()) {
        positions.push(positionedUserChar);
      } else {
        return this.getPositionUser();
      }
    }

    for (let i = 0; i < botTeam.members.length; i += 1) {
      const positionedBotChar = new PositionedCharacter(botTeam.members[i], this.getPositionBot());
      if (positionedBotChar.position !== this.getPositionBot()) {
        positions.push(positionedBotChar);
      } else {
        return this.getPositionBot();
      }
    }

    console.log('fff', positions);

    this.gamePlay.redrawPositions(positions);
    console.log(userTeam.members, botTeam.members);
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
  }

  getPositionUser() {
    const board = this.boardSize ** 2;
    const index = Math.floor(Math.random() * board);
    if (index % this.boardSize === 0 || index % this.boardSize === 1) {
      return index;
    }
    return this.getPositionUser();
  }

  getPositionBot() {
    const board = this.boardSize ** 2;
    const index = Math.floor(Math.random() * board);
    if ((index + 1) % this.boardSize === 0 || (index + 1) % this.boardSize === (this.boardSize - 1)) {
      return index;
    }
    return this.getPositionBot();
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}
