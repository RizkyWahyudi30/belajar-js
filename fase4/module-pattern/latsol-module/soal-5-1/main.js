import Karakter from "./characters/Karakter.js";
import Ksatria from "./characters/Ksatria.js";
import Penyihir from "./characters/Penyihir.js";

const bos = new Karakter("Boss Monster", 100);
const pahlawan = [new Ksatria("Adolf", 100), new Penyihir("Shin", 100)];

for (let pasukan of pahlawan) {
  pasukan.serang(bos);
}

console.log(bos.infoStatus());
