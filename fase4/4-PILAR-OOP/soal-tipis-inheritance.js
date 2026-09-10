// Soal 1: Easy (Dasar Pewarisan & Method Overriding)
/**
1. Class Induk: Kendaraan
- Property: merk, kecepatan (kecepatan awal = 0).
- Method gass(): Menambahkan kecepatan sebesar 10 dan mencetak:
    "[merk] melaju dengan kecepatan [kecepatan] km/jam."

2. Class Anak: MobilListrik (turunan dari Kendaraan)
- Memiliki properti tambahan: baterai (persentase, misal: 100).
- Override method gass():
    - Mengurangi baterai sebesar 5.
    - Memanggil method gass() dari parent (Kendaraan) menggunakan super.
    - Mencetak: "Sisa baterai: [baterai]%"
*/

class Kendaraan {
  constructor(merk) {
    this.merk = merk;
    this.kecepatan = 0;
  }

  gass() {
    this.kecepatan += 10;
    console.log(
      `${this.merk} melaju dengan kecepatan ${this.kecepatan} km/jam`,
    );
  }
}

class MobilListrik extends Kendaraan {
  constructor(merk) {
    super(merk);
    this.baterai = 100;
  }

  gass() {
    this.baterai -= 5;
    console.log(`Sisa baterai ${this.baterai}%`);
  }
}

const byd = new MobilListrik("Byd");
// byd.gass(); // Sisa baterai 95%

// Soal 2: Medium (Sistem Karyawan & Tipe Akses)
/**
1. Class Induk: Karyawan
- Constructor menerima nama dan gajiPokok.
- Private field #gajiPokok (gunakan enkapsulasi yang sudah kamu pelajari!).
- Method getGaji(): Mengembalikan nilai #gajiPokok.
- Method hitungBonus(): Mengembalikan bonus sebesar 10% dari gaji pokok.

2. Class Anak: Manager (turunan dari Karyawan)
- Constructor menerima nama, gajiPokok, dan tunjanganTeam.
- Override method hitungBonus():
    - Hitung bonus dasar dari parent (Karyawan) menggunakan super.
    - Kembalikan total: bonus dasar + tunjanganTeam.

*/

class Karyawan {
  #gajiPokok;

  constructor(nama, gajiPokok) {
    this.nama = nama;
    this.#gajiPokok = gajiPokok;
  }

  getGaji() {
    return this.#gajiPokok;
  }

  hitungBonus() {
    return (this.#gajiPokok * 0.1) / 100;
  }
}

class Manager extends Karyawan {
  constructor(nama, gajiPokok, tunjanganTeam) {
    super(nama, gajiPokok);
    this.tunjanganTeam = tunjanganTeam;
  }

  hitungBonus() {
    super.hitungBonus();

    return;
  }
}
