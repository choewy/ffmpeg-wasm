class Weapon {
  public attack() {
    console.log('hit!');
  }
}

class Character {
  constructor(private weapon: Weapon = new Weapon()) {}

  public attack() {
    this.weapon.attack();
  }
}

const character = new Character();
character.attack();
