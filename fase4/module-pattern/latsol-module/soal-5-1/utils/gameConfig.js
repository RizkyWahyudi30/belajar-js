export const DAMAGE_KSATRIA = 15;
export const DAMAGE_PENYIHIR = 20;
export const MANA_PENYIHIR = 3;

export function hitungSisaHP(hpSekarang, damage) {
  return Math.max(0, hpSekarang - damage); // hp tidak boeh negatif
}
