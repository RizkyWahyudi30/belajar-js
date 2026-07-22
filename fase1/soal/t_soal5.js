/** (SOAL TAMBAHAN -> OPERATOR & TERNARY) */

// Buat function getMembershipStatus(points) yang return "Gold" jika points >= 1000, "Silver" jika points >= 500,
// selain itu "Bronze". Tapi kali ini,
// coba pakai ternary bersarang (nested ternary), bukan if/else.

function getMembershipStatus(points) {
  return points >= 1000 ? "Gold" : points >= 500 ? "Silver" : "Bronze";
}
console.log(getMembershipStatus(2000)); // Gold
console.log(getMembershipStatus(890)); // Silver
console.log(getMembershipStatus(10)); // Bronze
