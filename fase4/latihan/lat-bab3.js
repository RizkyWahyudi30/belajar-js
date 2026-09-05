// Latihan Bab 3

// 1. Soal 3.1 — Konversi dari Constructor Function ke class
/**
Ambil constructor function Buku yang kamu buat di soal 2.1 kemarin, ubah jadi class. Struktur dan hasilnya harus tetap sama 
(method ringkasan() tetap return string yang sama).

*/
class Buku {
  constructor(judul, penulis, jumlahHalaman) {
    this.judul = judul;
    this.penulis = penulis;
    this.jumlahHalaman = jumlahHalaman;
  }

  ringkasan() {
    return `${this.judul} oleh ${this.penulis} (${this.jumlahHalaman} halaman)`;
  }
}

const buku1 = new Buku("Laskar Pelangi", "Andrea Hirata", 529);
console.log(buku1.ringkasan());
const buku2 = new Buku(
  "Cerita tamu yang bertemu tapi berakhir semu",
  "Sdavincii",
  200,
);
console.log(buku2.ringkasan());

// 2. Soal 3.2 — Tambahkan get/set dengan validasi
/**
Bikin class RekeningBank dengan:

• constructor(pemilik, saldoAwal).
• get saldo — return saldo saat ini.
• set saldo — lempar error kalau ada yang coba mengubah saldo jadi negatif (misal throw new Error("Saldo tidak boleh negatif")).
• Method setor(jumlah) — menambah saldo.
• Method tarik(jumlah) — mengurangi saldo, tapi tidak boleh membuat saldo jadi negatif (pakai guard clause, ingat pola dari Fase 1!).
• Test dengan skenario:

const rekening = new RekeningBank("Budi", 100000);
rekening.setor(50000);
console.log(rekening.saldo); // 150000
rekening.tarik(1000000); // harus GAGAL dengan pesan yang jelas, saldo TIDAK berubah
console.log(rekening.saldo); // masih 150000

*/
class RekeningBank {
  constructor(pemilik, saldoAwal) {
    this.pemilik = pemilik;
    this._saldo = saldoAwal;
  }

  get saldo() {
    return this._saldo;
  }

  set saldo(nilai) {
    if (nilai < 0) {
      throw new Error("Saldo tidak boleh negatif");
    }
    this._saldo = nilai;
  }

  setor(jumlah) {
    this.saldo += jumlah;
  }

  tarik(jumlah) {
    if (this.saldo === 0 || this.saldo < jumlah) {
      throw new Error("Saldo tidak cukup");
    }
    this.saldo -= jumlah;
  }
}

const rekening = new RekeningBank("Budi", 100000);
rekening.setor(50000);
console.log(rekening.saldo); // 150000
// rekening.tarik(1000000); // harus GAGAL dengan pesan yang jelas, saldo TIDAK berubah
/**
error: 

D:\coding\javascript\fase4\latihan\lat-bab3.js:73
      throw new Error("Saldo tidak cukup");
      ^

Error: Saldo tidak cukup

 */
console.log(rekening.saldo); // masih 150000
// output: 150000 (sama)

rekening.tarik(50000);
console.log(rekening.saldo);

// Soal 3.3 — Debug: kenapa ini infinite loop?
// class Suhu {
//   constructor(celcius) {
//     this.celcius = celcius;
//   }

//   get fahrenheit() {
//     return this.celcius * 1.8 + 32;
//   }

//   set celcius(nilai) {
//     this.celcius = nilai;
//   }
// }

// const suhu = new Suhu(30);
/**
error message:

D:\coding\javascript\fase4\latihan\lat-bab3.js:107
    this.celcius = nilai;

RangeError: Maximum call stack size exceeded

ini error infinite loop karena nama property (this.celcius) sama dengan penamaan set celcius yang sama, mengakibatkan setter memanggil this.celcius terus menerus

 */

// Soal Tambahan //

// 3.4 — Konversi + Tambahan (mirip 3.1, tapi lebih lengkap)
/*
Bikin class Karyawan dengan:
• constructor(nama, gajiPokok, jabatan).
• Method slipGaji() yang return string seperti: "Budi (Staff) - Gaji Pokok: Rp5000000". Jangan pakai console.log di dalam method-nya (ingat koreksi soal 3.1).
• Buat minimal 2 instance dengan jabatan berbeda, dan buktikan bahwa karyawan1.slipGaji === karyawan2.slipGaji bernilai true.
• Bonus wajib: tambahkan method naikGaji(persen) yang menambah gajiPokok sebesar persentase yang diberikan (misal naikGaji(10) menaikkan gaji 10%). 
  Panggil method ini, lalu panggil slipGaji() lagi, pastikan angkanya sudah ter-update.

*/
class Karyawan {
  constructor(nama, gajiPokok, jabatan) {
    this.nama = nama;
    this._gaji = gajiPokok;
    this.jabatan = jabatan;
  }

  slipGaji() {
    return `${this.nama} (${this.jabatan}) - Gaji Pokok: Rp${this._gaji}`;
  }

  naikGaji(persen) {
    this._gaji = this._gaji + this._gaji * (persen / 100);
  }
}

const Budi = new Karyawan("Budi", 4500000, "staff");
console.log(Budi.slipGaji());
const Nata = new Karyawan("Nata", 12500000, "arsitek");
console.log(Nata.slipGaji());

console.log(Budi.slipGaji === Nata.slipGaji); // true

Budi.naikGaji(15);
console.log(Budi.slipGaji()); // otuput: Budi (staff) - Gaji Pokok: Rp5175000

// Soal 3.5 — get/set dengan validasi (mirip 3.2, kasus berbeda)
class Suhu {
  constructor(celcius) {
    this._celcius = celcius;
  }

  get celcius() {
    return this._celcius;
  }

  set celcius(nilai) {
    if (nilai < -273.15) {
      throw new Error("Suhu tidak mungkin dibawah -273.15");
    }
    this._celcius = nilai;
  }

  get fahrenheit() {
    return (this.celcius *= 1.8) + 32;
  }

  set fahrenheit(nilai) {
    this.celcius = (nilai - 32) / 1.8;
  }
}

const suhu = new Suhu(25);
console.log(suhu.fahrenheit); // output yang diharapkan: 77

suhu.fahrenheit = 32;
console.log(suhu.celcius); // output yang diharapkan: 0

// suhu.fahrenheit = -500; // ini seharusnya GAGAL, karena hasil konversinya di bawah -273.15°C
/**
error message:

D:\coding\javascript\fase4\latihan\lat-bab3.js:175
      throw new Error("Suhu tidak mungkin dibawah -273.15");
      ^

Error: Suhu tidak mungkin dibawah -273.15
 */

// soal 3.6 — Debug: cari 2 bug sekaligus
/**
Kode ini kelihatan "jalan", tapi punya 2 bug tersembunyi (mirip pola yang barusan kita temukan di RekeningBank kamu). Temukan dan jelaskan keduanya 
sebelum memperbaiki:

class Baterai {
  constructor(kapasitas) {
    this.kapasitas = kapasitas;
    this.levelSaatIni = kapasitas;
  }

  get level() {
    return this.levelSaatIni;
  }

  set level(nilai) {
    if (nilai < 0) {
      throw new Error("Level tidak boleh negatif");
    }
    if (nilai > this.kapasitas) {
      throw new Error("Level tidak boleh melebihi kapasitas");
    }
    this.levelSaatIni = nilai;
  }

  gunakan(jumlah) {
    this.levelSaatIni = this.levelSaatIni - jumlah;
  }

  cas(jumlah) {
    return this.levelSaatIni + jumlah;
  }
}

const baterai = new Baterai(100);
baterai.gunakan(150); // pakai baterai lebih dari yang tersedia
console.log(baterai.level);

baterai.cas(50);
console.log(baterai.level);

Tebak dulu output dari kedua console.log itu, baru jalankan untuk cocokkan. Lalu jelaskan kenapa masing-masing itu bug (kaitkan dengan pelajaran dari
RekeningBank tadi), dan perbaiki class-nya supaya validasi benar-benar konsisten dipakai di seluruh method.

*/
class Baterai {
  constructor(kapasitas) {
    this.kapasitas = kapasitas;
    this.levelSaatIni = kapasitas;
  }

  get level() {
    return this.levelSaatIni;
  }

  set level(nilai) {
    if (nilai < 0) {
      throw new Error("Level tidak boleh negatif");
    }
    if (nilai > this.kapasitas) {
      throw new Error("Level tidak boleh melebihi kapasitas");
    }
    this.levelSaatIni = nilai;
  }

  gunakan(jumlah) {
    this.level = this.levelSaatIni - jumlah;
  }

  cas(jumlah) {
    this.level = this.levelSaatIni + jumlah;
  }
}

const baterai = new Baterai(100);
baterai.gunakan(90); // pakai baterai lebih dari yang tersedia
console.log(baterai.level); // output awal: -50
// error message
/**
D:\coding\javascript\fase4\latihan\lat-bab3.js:263
      throw new Error("Level tidak boleh negatif");
      ^

Error: Level tidak boleh negatif

// ini output dari kode yang sudah diperbaiki

 */

baterai.cas(50);
console.log(baterai.level); // output awal: -50
// error message:
/**
D:\coding\javascript\fase4\latihan\lat-bab3.js:266
      throw new Error("Level tidak boleh melebihi kapasitas");
      ^

Error: Level tidak boleh melebihi kapasitas

// kalau di tes nya dengan > 100
 */

// 3.7 — Bikin dari nol, sekaligus gabungkan constructor + get/set + method biasa

/**
Bikin class Antrian (queue) untuk simulasi antrian nomor tiket:
• constructor(namaLoket) — mulai dengan daftarAntrian = [] (array kosong) dan nomorSaatIni = 0.
• Method tambahAntrian(namaCustomer) — nambah customer ke daftarAntrian, nomorSaatIni bertambah 1, dan setiap customer punya nomor tiketnya masing-masing.
• Method panggilBerikutnya() — mengeluarkan (dan return) customer paling depan dari antrian (ingat: array method yang cocok untuk ambil dari depan sambil menghapusnya — jangan pakai index manual, cari method array yang sesuai).
• get jumlahMenunggu — return berapa banyak orang yang masih mengantre.
• Constraint penting: kalau panggilBerikutnya() dipanggil saat antrian kosong, jangan sampai error/crash — return sebuah pesan yang masuk akal, misal "Antrian kosong".

*/
