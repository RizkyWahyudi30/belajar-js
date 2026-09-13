import Karakter from "./Karakter.js";

export default class Ksatria extends Karakter {
  constructor(name, hp) {
    super(name, hp);
    this.damage = 15;
  }

  serang(target) {
    target.hp -= this.damage;
    console.log(
      `${this.name}: menyerang ${target.name} sebesar ${this.damage} damage!`,
    );
  }
}
