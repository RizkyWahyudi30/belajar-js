/**
 *
 * Soal tambahan bab 1 part 2
 *
 */

// 1. Prediksi dulu, baru run. Sebelum run: tebak dulu 3 output-nya apa dan kenapa. Baru run untuk cocokkan.
const kendaraan = {
  jalan: function () {
    console.log(`${this.nama} sedang berjalan`);
  },
};

const mobil = Object.create(kendaraan);
mobil.nama = "Avanza";

mobil.jalan(); // Avanva sedang berjalan
console.log(mobil.hasOwnProperty("jalan")); // false
console.log(mobil.hasOwnProperty("nama")); // true

// 2. Buat rantai prototype 2 tingkat
// Buat 3 object: hewanDasar (punya method bernafas), lalu mamalia yang mewarisi dari hewanDasar (pakai Object.create)
// dan punya method tambahan menyusui, lalu kucing yang mewarisi dari mamalia dan punya property nama = "Miko".

// Setelah itu buktikan kucing bisa akses method dari kedua "induk"-nya:

// const hewanDasar = {
//   bernafas() {
//     console.log(`${this.nama}`);
//   },
// };

// const mamalia = Object.create(hewanDasar);
// mamalia.menyusui = function () {
//   console.log(`${this.nama} sedang menyusui`);
// };

// const kucing = Object.create(mamalia);
// kucing.nama = "Miko";

// kucing.bernafas();
// kucing.menyusui();

// 3. Kenapa ini bug?
// Jelaskan dengan kata-katamu sendiri (bukan cuma tebak outputnya, tapi kenapa hasilnya begitu) — ini soal penting untuk
// memastikan kamu benar-benar paham prototype chain, bukan cuma hafal pola.

const hewanDasar = {
  nama: "Tidak diketahui",
  kenalan: function () {
    console.log(`Halo, aku ${this.nama}`);
  },
};

const kucing1 = Object.create(hewanDasar);
const kucing2 = Object.create(hewanDasar);

kucing1.kenalan(); // "Halo, aku Tidak diketahui"
kucing2.nama = "Miko";
kucing2.kenalan(); // "Halo, aku Miko"

kucing1.kenalan(); // <- jalankan ini, apa hasilnya? kenapa?
// output: Halo, aku Tidak diketahui

// karena kucing1 belum membuat property nama

console.log(kucing1.hasOwnProperty("nama")); // false
console.log(kucing2.hasOwnProperty("nama")); // true
console.log(hewanDasar.nama); // Tidak diketahui
