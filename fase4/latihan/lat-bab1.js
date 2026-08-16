// Latihan bab 1

// 1. Buat object literal mobil dengan properti merk, kecepatan (mulai 0), dan method gas(tambahan) yang menambah kecepatan,
// lalu console.log kecepatan sekarang.
const mobils = {
  merk: "Toyota",
  kecepatan: 120,
  gas(tambahan) {
    this.kecepatan += tambahan;

    console.log(
      `Kecepatan awal: ${this.kecepatan} ditambahkan ${tambahan} menjadi: ${this.kecepatan}`,
    );
  },
};
mobils.gas(130); // Kecepatan awal: 120 ditambahkan 130 menjadi: 250

// 2. Buat object kendaraanProto yang punya method deskripsi() yang mencetak "Ini adalah <jenis>". Lalu buat 2 object
// pakai Object.create(kendaraanProto): motor dan mobil, masing-masing isi properti jenis berbeda, panggil deskripsi()
// dari keduanya.

const kendaraanProto = {
  deskripsi() {
    console.log(`Ini adalah ${this.jenis}`);
  },
};

const mobil = Object.create(kendaraanProto);
const motor = Object.create(kendaraanProto);

mobil.jenis = "Balap";
mobil.deskripsi(); // Ini adalah Balap

motor.jenis = "Offroad";
motor.deskripsi(); // Ini adalah Offroad

// 3. Konsep: Jelaskan dengan kata-katamu sendiri — apa bedanya properti yang ada di object itu sendiri (own property)
// vs properti yang didapat lewat prototype chain? Berikan 1 contoh nyata pakai hasOwnProperty.

/**
 * 
Properti yang ada di object itu sendiri berarti dia memiliki nya sendiri, tidak diwarisi atau meminjam dari Object.prototype
diatas nya 
 * 
 */

// contoh di soal 1 dan soal 2
console.log(mobils.hasOwnProperty("gas")); // true

console.log(motor.hasOwnProperty("deskripsi")); // false
// tapi berbeda dengan menggunakan 'in' yang mengecek hingga ke prototype nya
console.log("deskripsi" in motor); // true
