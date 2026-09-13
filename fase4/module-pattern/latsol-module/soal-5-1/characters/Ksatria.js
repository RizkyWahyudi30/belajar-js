import Karakter from "./Karakter.js";
import { DAMAGE_KSATRIA } from "../utils/gameConfig.js";

export default class Ksatria extends Karakter {
  constructor(name, hp) {
    super(name, hp);
    this.damage = DAMAGE_KSATRIA;
  }

  serang(target) {
    target.hp -= this.damage;
    console.log(
      `${this.name}: menyerang ${target.name} sebesar ${this.damage} damage!`,
    );
  }
}
