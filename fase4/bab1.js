/**
 *
 * BAB 1 -- Object Literal & JS Sebenarnya Berbasis Prototype
 * Pembahasan ada di file /fase4/guide.md
 *
 */

// contoh awal
const kucing = {
  nama: "Milo",
  suara: "Meong",
  bunyi() {
    console.log(`${this.nama} berkata: ${this.suara}`);
  },
};
kucing.bunyi();

// setiap object literal punya prototype Object.prototype (itu kenapa kita bisa pakai kucing.toString() padahal tidak pernah
// didefinisikan)
// seperti ini, objeknya secara otomatis mewarisi fungsi-fungsi bawaan dari javascript Object.prototype
console.log(kucing.toString()); // [object Object]

console.log(Object.getPrototypeOf(kucing) === Object.prototype); // true

/** Membuat object dengan prototype custom: Object.create() */
// ini cara paling murni untuk lihat prototype bekerja, kenapa class atau function constructor:
const hewanProto = {
  bunyi() {
    console.log(`${this.nama} mengeluarkan suara!`);
  },
};

const anjing = Object.create(hewanProto); // anning.[[Prototype]] = hewanProto
anjing.nama = "Reki";
anjing.bunyi(); // Reki mengeluarkan suara!

console.log(anjing.hasOwnProperty("nama")); // true (properti sendiri)
console.log(anjing.hasOwnProperty("bunyi")); // false (properti dari prototype)

/**
Insight: anjing sendiri tidak pernah punya method bunyi. Saat dipanggil, JS jalan naik ke prototype chain: anjing -> hewanProto
-> Object.prototype -> null.

Ini yang bisa bikin JS hemat memori -- banyak object bisa "berbagi" method lewat satu prototype, bukan copy-paste ke tiap object

Bisa seperti itu karena object anjing mewariskan method hewanProto melalui Object.create(hewanProto)
 */
