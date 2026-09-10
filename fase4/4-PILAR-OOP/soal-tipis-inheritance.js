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
    super.gass();
    console.log(`Sisa baterai ${this.baterai}%`);
  }
}

const byd = new MobilListrik("Byd");
// byd.gass();

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
    return this.#gajiPokok * 0.1;
  }
}

class Manager extends Karyawan {
  constructor(nama, gajiPokok, tunjanganTeam) {
    super(nama, gajiPokok);
    this.tunjanganTeam = tunjanganTeam;
  }

  hitungBonus() {
    const bonusDasar = super.hitungBonus(); // tampung hasil dari parent

    return bonusDasar + this.tunjanganTeam; // tambahkan dengan tunjangan
  }
}

const maki = new Manager("Maki", 17000000, 6500000);
// console.log(maki.hitungBonus());

// Soal 3: Hard / Analisis Design (Bug Hunting & Concept)
/**
Perhatikan dua potongan kode di bawah ini:

Kasus A (Troubleshooting Error):

class Bentuk {
  constructor(warna) {
    this.warna = warna;
  }
}

class Persegi extends Bentuk {
  constructor(warna, sisi) {
    this.sisi = sisi;
    super(warna);
  }
}

const box = new Persegi("Merah", 4);

Kasus B (Analisis Relasi / Design Pattern):
Seorang developer membuat struktur class berikut:

class Mesin {
  nyalakan() {
    console.log("Mesin menyala...");
  }
}

class Pesawat extends Mesin {
  terbang() {
    console.log("Pesawat terbang...");
  }
}

1. Pada Kasus A, kode tersebut akan menghasilkan error. Error apa yang terjadi dan bagaimana cara memperbaikinya?
2. Pada Kasus B, apakah penerapan extends di situ sudah tepat secara konsep OOP (relasi is-a vs has-a)? Jelaskan alasanmu!

*/

// Kasus A
class Bentuk {
  constructor(warna) {
    this.warna = warna;
  }
}

class Persegi extends Bentuk {
  constructor(warna, sisi) {
    super(warna); // super(...) harus dipanggil duluan
    this.sisi = sisi;
  }

  output() {
    console.log(`Warna: ${this.warna} | sisi: ${this.sisi}`);
  }
}

const box = new Persegi("Merah", 4);
box.output(); // output: Warna: Merah | sisi: 4

// Kasus B
class Mesin {
  nyalakan() {
    console.log("Mesin menyala...");
  }
}

class Pesawat {
  constructor() {
    this.mesin = new Mesin(); // relasi "has-a" (Pesawat PUNYA Mesin)
  }

  terbang() {
    this.mesin.nyalakan();
    console.log("Pesawat terbang...");
  }
}

const air = new Pesawat();
air.terbang();
/**
Output:
Mesin menyala...
Pesawat terbang

*/
