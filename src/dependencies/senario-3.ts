class Weapon {
  public attack() {
    console.log('hit!');
  }
}

class Axe extends Weapon {
  public attack() {
    console.log('chop!');
  }
}

class Character {
  constructor(private weapon: Weapon) {
    this.weapon = weapon;
  }

  public attack() {
    this.weapon.attack();
  }
}

const character = new Character();
character.attack();
