import themes from './themes';
import PositionedCharacter from './PositionedCharacter';
import Magician from './Magician';
import Bowman from './Bowman';
import Vampire from './Vampire';
import Daemon from './Daemon';
import Swordsman from './Swordsman';
import Undead from './Undead';
import { generateTeam } from './generators';
import GamePlay from './GamePlay';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.boardSize = gamePlay.boardSize;
    this.positions = [];
    this.activeplayer = null;
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.gamePlay.drawUi(themes.prairie);
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));

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
        this.getPositionUser();
      }
    }

    for (let i = 0; i < botTeam.members.length; i += 1) {
      const positionedBotChar = new PositionedCharacter(botTeam.members[i], this.getPositionBot());
      if (positionedBotChar.position !== this.getPositionBot()) {
        positions.push(positionedBotChar);
      } else {
        this.getPositionBot();
      }
    }

    console.log('fff', positions);
    this.positions = positions;
    this.gamePlay.redrawPositions(positions);
    console.log(userTeam.members, botTeam.members);
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
    console.log(index);
    console.log('positions', this.positions);
    const positionChar = this.positions.find((item) => item.position === index);
    console.log('positionChar', positionChar);

    if (positionChar !== undefined) {
      if (this.activeplayer !== null) {
        this.gamePlay.deselectCell(this.activeplayer);
      }
      if (positionChar.character.isUser) {
        this.gamePlay.selectCell(index);
        this.activeplayer = index;
        console.log(this.activeplayer);
      } else {
        GamePlay.showError('Нельзя выбирать персонажа противника');
      }
    } else {
      GamePlay.showError('Выберите своего персонажа');
    }
  }

  onCellEnter(index) {
    // TODO: react to mouse enter

    const positionChar = this.positions.find((item) => item.position === index);
    if (positionChar !== undefined) {
      console.log('наведение', positionChar);
      this.gamePlay.showCellTooltip(`\u1F396${positionChar.character.level} \u2694${positionChar.character.attack} \u1F6E1${positionChar.character.defence} \u2764${positionChar.character.health}`, index);
    }
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}
