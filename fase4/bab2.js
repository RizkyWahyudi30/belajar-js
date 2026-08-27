/** BAB 2 -- CONSTRUCTOR FUNCTION & PROTOTYPE */
/**
 * 
Balik ke soal 1.2 kemarin — bikin kucing butuh 2 langkah manual: Object.create(), lalu isi property satu-satu. 
Sekarang bayangkan kamu bikin aplikasi e-commerce dan butuh bikin 500 object produk dengan struktur yang sama (nama, harga, 
stok). Kalau tiap kali harus nulis Object.create() + assign property manual, itu:

1. Repetitif — kode yang sama ditulis berkali-kali.
2. Rawan human error — gampang lupa 1 property, atau salah ketik nama property di salah satu dari 500 object itu.
3. Tidak ada "cetakan" yang jelas — tidak ada satu tempat yang bisa dibaca orang untuk tahu "seperti apa sih bentuk object 
produk yang valid itu?"

Constructor Function adalah solusi JS untuk masalah ini — sebuah "cetakan" (blueprint) yang bisa dipakai berulang-ulang untuk 
membuat banyak object dengan struktur serupa, tapi isi data berbeda-beda.

 */

/**
 * 
Teori: Constructor Function 
Constructor function itu function biasa, tapi dengan 2 konvensi khusus:

1. Namanya diawali dengan huruf besar (PascalCase) -- ini konvensi, bukan aturan wajib JS, tapi dipatuhi di seluruh industri 
supaya jelas "ini constructor, bukan function biasa"

2. Dipanggil dengan keyword new 

 */

// function Produk(nama, harga, stok) {
//   this.nama = nama;
//   this.harga = harga;
//   this.stok = stok;
// }

// const kopi = new Produk("Kopi", 15000, 80);
// const roti = new Produk("Roti", 4500, 100);

// console.log(kopi); // Produk { nama: 'Kopi', harga: 15000, stok: 80 }
// console.log(roti); // Produk { nama: 'Roti', harga: 4500, stok: 100 }

/**
 * 
Apa yang sebenarnya terjadi saat new Produk(...) dipanggil?
Ini penting dipahami step-by-step, karena new itu melakukan 4 hal otomatis di belakang layar yang sering dianggap "sihir" kalau
tidak dijelaskan:

// Kalau menuliskan 
const kopi = new Produk("Kopi", 15000, 80);

// Di baliknya, JS melakukan kira-kira seperti ini:
// 1. Buat object kosong baru: {}
// 2. Sambungkan prototype object itu ke Produk.prototype
// 3. Panggil Produk(...) dengan 'this' MENUNJUK ke object baru itu
// 4. Return object itu secara otomatis (kecuali function eksplisit return object lain)

 */

/** Masalah: Method di Dalam Constructor = Boros Materi */
// Kesalahan umum:
// function Produk(nama, harga) {
//   this.nama = nama;
//   this.harga = harga;
//   this.tampilkanData = function () {
//     console.log(`${this.nama} ${this.harga}`);
//   };
// }

// const kopi = new Produk("Kopi", 5000);
// const roti = new Produk("Roti", 3000);

// console.log(kopi.tampilkanData === roti.tampilkanData); // false

/**
 * 
Setiap kali new Produk(...) dipanggil, function tampilkanInfo dibuat ulang dari nol, jadi tiap object punya salinan 
sendiri-sendiri di memori — walau isinya identik persis. Kalau kamu punya 10.000 produk, itu 10.000 salinan function yang 
sama, buang-buang memori.
 */

/** Solusi: Taruh Method di .prototype, bukan didalam Constructor */
function Produk(nama, harga, stok) {
  this.nama = nama;
  this.harga = harga;
  this.stok = stok;
}

Produk.prototype.tampilkanData = function () {
  console.log(`${this.nama} ${this.harga} ${this.stok}`);
};

const kopi = new Produk("kopi", 5000, 10);
const roti = new Produk("Roti", 3500, 20);

console.log(kopi.tampilkanData === roti.tampilkanData); // true

kopi.tampilkanData();
roti.tampilkanData();

/**
 * 
📌 Aturan praktis yang dipakai di industri: apa yang beda-beda per instance (data) taruh di dalam constructor lewat this.xxx. 
Apa yang sama untuk semua instance (behavior/logic) taruh di .prototype. Ini sebenarnya persis prinsip yang sama seperti soal 
2.2 dulu (pisahkan data dari logic) — cuma sekarang dalam konteks OOP.

 */

/** Contoh Dunia Nyata: Sistem User dengan Role */
// Ini pola yang umum dipakai di aplikasi nyata — beberapa "jenis" object yang punya struktur dasar sama, tapi ada behavior
// tambahan per jenis.

function User(nama, email) {
  this.nama = nama;
  this.email = email;
  this.createdAt = new Date();
}

User.prototype.getInfo = function () {
  return `${this.nama} (${this.email})`;
};

User.prototype.login = function () {
  console.log(`${this.nama} berhasil login!`);
};

const user1 = new User("Sinta", "sinta@example.com");
const user2 = new User("Dimas", "dimas@example.com");

console.log(user1.getInfo()); // Sinta (sinta@example.com)
user2.login(); // Dimas berhasil login!

console.log(user1.createdAt !== user2.createdAt); // true, karena new Date dipanggil terpisah tiap instance (hasil)

// Ini "cetakan" yang bisa dipakai berulang-ulang untuk bikin ribuan user, dengan struktur konsisten dan behavior yang
// dijamin sama, tanpa boros memori.

// MASALAH: Method di dalam constructor = Boros memori
// kesalahan ketika awal:
function Produk(nama, harga) {
  this.nama = nama;
  this.harga = harga;
  this.tampilkanInfo = function () {
    console.log(`${this.nama}: ${this.harga}`);
  };
}

const pizza = new Produk("Pizza", 10000);
const ubi = new Produk("Ubi", 3000);

console.log(pizza.tampilkanInfo === ubi.tampilkanInfo); // false

/**
Setiap kali new Produk(...) dipanggil, function tampilkanInfo dibuat ulang dari nol, jadi tiap object punya salinan 
sendiri-sendiri di memori — walau isinya identik persis. Kalau kamu punya 10.000 produk, itu 10.000 salinan function yang 
sama, buang-buang memori.

Solusi: Taruh Method di .prototype, Bukan di Dalam Constructor

 */
