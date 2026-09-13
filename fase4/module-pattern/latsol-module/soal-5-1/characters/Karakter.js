export default class Karakter {
  constructor(name, hp) {
    this.name = name;
    this.hp = hp;
  }

  serang(target) {
    throw new Error("Method harus di override!");
  }

  infoStatus() {
    return `Info HP: ${this.hp}`;
  }
}
