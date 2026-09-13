import Karakter from "./Karakter.js";
import { DAMAGE_PENYIHIR, MANA_PENYIHIR } from "../utils/gameConfig.js";

export default class Penyihir extends Karakter {
  constructor(name, hp) {
    super(name, hp);
    this.damage = DAMAGE_PENYIHIR;
    this.mana = MANA_PENYIHIR;
  }

  serang(target) {
    if (this.mana > 0) {
      target.hp -= this.damage;
      this.mana -= 1;
      console.log(
        `${this.name}: menyerang ${target.name} sebesar ${this.damage} damage!`,
      );
    } else {
      console.log(`${this.mana} kehabisan mana! tidak bisa menyerang`);
    }
  }
}
