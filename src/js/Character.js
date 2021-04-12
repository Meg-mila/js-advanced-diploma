export default class Character {
  constructor(level, type = 'generic') {
    this.level = level;
    this.attack = 0;
    this.defence = 0;
    this.health = 100;
    this.type = type;
    if (new.target.name === 'Character') throw new Error('Нельзя создавать экземпляры класса Character!');
    // TODO: throw error if user use "new Character()"
  }
}
