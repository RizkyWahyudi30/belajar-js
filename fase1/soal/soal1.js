/** (VARIABLE & OPERATOR) */

// Buat function checkDiscount(price) yang return "Diskon 20%" jika harga di atas 100000,
// "Diskon 10%" jika di atas 50000, selain itu "Tidak ada diskon". Gunakan if/else.

function checkDiscount(price) {
  if (price > 100000) return "Diskon 20%";
  else if (price > 50000) return "Diskon 10%";
  else return "Tidak ada diskon";
}
console.log(checkDiscount(150000)); // Diskon 20%
console.log(checkDiscount(70000)); // Diskon 10%
console.log(checkDiscount(10000)); // Tidak ada diskon
