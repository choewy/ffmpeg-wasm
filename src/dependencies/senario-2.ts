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
  constructor(private weapon: Weapon = new Axe()) {}

  public attack() {
    this.weapon.attack();
  }
}

const character = new Character();
character.attack();
