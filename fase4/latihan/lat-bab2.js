// Latihan Bab 2

// Soal 2.1 — Bikin constructor dari nol
/**
Bikin constructor function Buku(judul, penulis, jumlahHalaman). Tambahkan method ringkasan() di .prototype
(bukan di dalam constructor) yang return string seperti: "Laskar Pelangi oleh Andrea Hirata (529 halaman)". 
Buat minimal 2 instance, buktikan buku1.ringkasan === buku2.ringkasan bernilai true.

*/

function Buku(judul, penulis, jumlahHalaman) {
  this.judul = judul;
  this.penulis = penulis;
  this.jumlahHalaman = jumlahHalaman;
}

Buku.prototype.ringkasan = function () {
  return `${this.judul} oleh ${this.penulis} (${this.jumlahHalaman} halaman)`;
};

const buku1 = new Buku("Laskar Pelangi", "Andrea Hirata", 529);
const buku2 = new Buku(
  "Cerita tamu yang bertemu tapi berakhir semu",
  "Sdavincii",
  200,
);

console.log(buku1.ringkasan());
console.log(buku2.ringkasan());

console.log(buku1.ringkasan === buku2.ringkasan);

// Soal 2.2 — Cari & perbaiki bug
/**
Kode berikut punya bug. Temukan dan jelaskan kenapa itu bug, lalu perbaiki:

function Timer() {
  this.detik = 0;
}

Timer.prototype.mulai = function () {
  setInterval(() => {
    this.detik++;
    console.log(this.detik);
  }, 1000);
};

Timer.prototype.riwayat = [];

const timer1 = new Timer();
const timer2 = new Timer();

timer1.riwayat.push("start");
console.log(timer2.riwayat);

// error nya berada di line: Timer.prototype.riwayat = [];

.riwayat di inisialisasi di global, jadi ketika ada sebuah data meng-push ke riwayat, maka riwayat lain yang sebelumnya
dapat terpengaruh

*/

function Timer() {
  this.detik = 0;
  this.riwayat = [];
}

Timer.prototype.mulai = function () {
  setInterval(() => {
    this.detik++;
    console.log(this.detik);
  }, 1000);
};

const timer1 = new Timer();
const timer2 = new Timer();

timer1.riwayat.push("start");
console.log(timer2.riwayat); // output: []

console.log(timer1.riwayat); // [ 'start' ]

// Soal 2.3 — Prediksi dulu, baru jalankan
/**
Tebak dulu: apakah ini akan error? Kalau tidak error, apa yang terjadi? Jelaskan kenapa, kaitkan dengan 
penjelasan soal new di atas.

function Hewan(nama) {
  this.nama = nama;
}

Hewan.prototype.bersuara = function () {
  console.log(`${this.nama} mengeluarkan suara`);
};

const kucing = Hewan("Miko"); // <- baris ini TIDAK error!

console.log(kucing); // undefined
kucing.bersuara(); // <- ERROR terjadi DI SINI, bukan di baris pemanggilan Hewan()

= ya, karena ketika membuat instance baru, tidak menambahkan "new" sebagai faktor utama ketika membuat instance
*/

function Hewan(nama) {
  this.nama = nama;
}

Hewan.prototype.bersuara = function () {
  console.log(`${this.nama} mengeluarkan suara`);
};

const kucing = Hewan("Miko"); // <- baris ini TIDAK error!

console.log(kucing); // undefined
kucing.bersuara(); // <- ERROR terjadi DI SINI, bukan di baris pemanggilan Hewan()
