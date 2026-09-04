/** BAB 3 -- ES6 Class Syntax */

// Teori: Constructor, Method di Class
// membandingkan langsung dengan versi constructor function dari bab 2

// versi bab 2
function Produk(nama, harga) {
  this.nama = nama;
  this.harga = harga;
}

// tidak bisa menggunakan arrow function
Produk.prototype.tampilkanInfo = function () {
  console.log(`${this.nama}: ${this.harga}`);
};

const roti = new Produk("roti", 14000);
roti.tampilkanInfo();

// versi Class (bab 3)
class Produk2 {
  constructor(nama, harga) {
    this.nama = nama;
    this.harga = harga;
  }

  tampilkanData() {
    console.log(`${this.nama}: ${this.harga}`);
  }
}

const kopi = new Produk2("kopi", 3000);
kopi.tampilkanData();
const gorengan = new Produk2("gorengan", 2000);
gorengan.tampilkanData();

/**
• constructor(...) — menggantikan "body" dari function biasa. Ini yang dijalankan setiap kali new Produk(...) dipanggil.

• Method (tampilkanInfo) ditulis langsung di dalam class, tanpa function keyword, tanpa koma antar method. Di baliknya, 
JS otomatis menaruh method ini di Produk.prototype — persis seperti yang kamu tulis manual di sub-bab 2!

 */
// Pembuktian
console.log(typeof Produk2); // function
console.log(Produk2.prototype.tampilkanData); // [Function: tampilkanData] -> ada di prototype!

console.log(kopi.tampilkanData === gorengan.tampilkanData); // true -> tetap 1 salinan

// Class menyelesaikan masalah di bug 2: Lupa new
class Hewan {
  constructor(nama) {
    this.nama = nama;
  }
}

// const kucing = Hewan("Miko"); // Coba tanpa `New`
// error message: TypeError: Class constructor Hewan cannot be invoked without 'new'

/*
📌 Bandingkan dengan constructor function versi lama di soal 2.3 kemarin — errornya muncul belakangan di tempat yang salah 
(kucing.bersuara()), bukan di tempat sebenarnya masalah terjadi. Dengan class, error muncul tepat di titik kesalahan, 
dengan pesan yang jelas menyebut penyebabnya. Ini salah satu alasan kuat kenapa class lebih disukai di kode modern — bukan 
cuma soal gaya penulisan, tapi soal keamanan dari bug.

*/

// get dan set -- Property yang "Berperilaku seperti Method"
// Ini fitur yang tidak ada padanan langsungnya di constructor function versi lama (bisa dibuat manual, tapi jauh lebih
// ribet). get/set memungkinkan kamu mengakses sebuah "property" (tanpa tanda kurung ()), tapi di baliknya sebenarnya
// menjalankan sebuah function.

class Barang {
  constructor(nama, harga, diskonPersen) {
    this.nama = nama;
    this.harga = harga;
    this.diskonPersen = diskonPersen;
  }

  // GET: diakses seperti property biasa (tanpa kurung), tapi hasilnya DIHITUNG
  get hargaSetelahDiskon() {
    return this.harga - (this.harga * this.diskonPersen) / 100;
  }

  // SET: dipakai saat ada yang meng-ASSIGN nilai ke property ini
  set diskon(persen) {
    if (persen < 0 || persen > 100) {
      throw new Error("Diskon harus antara 0-100");
    }
    this.diskonPersen = persen;
  }
}

const pizza = new Barang("pizza", 50000, 13);
console.log(pizza.hargaSetelahDiskon); // 43500 -> diakses tanpa (), tapi function jalan dibaliknya

pizza.diskon = 50; // update diskon nya
console.log(pizza.hargaSetelahDiskon); // 25000

// pizza.diskon = 150;
// error message = Error: Diskon harus antara 0-100

/**
Get -> dipakai untuk nilai turunan (computed value) yang tidak perlu disimpan manual — kamu tidak perlu ingat untuk selalu 
hitungDiskon() ulang setiap kali harga atau diskonPersen berubah, karena get selalu menghitung ulang otomatis setiap kali 
diakses

Set -> dipakai untuk validasi otomatis saat data di-assign — mencegah data yang tidak valid masuk ke object tanpa harus 
mengandalkan orang lain (atau kamu sendiri) untuk selalu ingat memvalidasi manual sebelum assign.

 */

// Contoh Class dengan get / set untuk Validasi
// Ini pola yang sering dipakai di aplikasi nyata (misalnya sistem inventory, e-commerce):

class Inventory {
  constructor(namaProduk, stokAwal) {
    this.namaProduk = namaProduk;
    this._stok = stokAwal; // konvensi: underscore (_) di depan = "private-ish", jangan diakses langsung dari luar
  }

  get stok() {
    return this._stok;
  }

  set stok(nilaiBaru) {
    if (nilaiBaru < 0) {
      throw new Error(`Stok tidak boleh negatif untuk ${this.namaProduk}`);
    }
    this._stok = nilaiBaru;
  }

  get statusStok() {
    if (this._stok === 0) return "Habis";
    if (this._stok < 10) return "Menipis";
    return "Tersedia";
  }
}

const stokKopi = new Inventory("Kopi", 4);
console.log(stokKopi.statusStok);

// ubah nilai stok
stokKopi.stok = 0;
console.log(stokKopi.statusStok);

// Kamu sudah tidak sadar menyentuh sedikit konsep encapsulation di sini (menyembunyikan _stok di balik get/set 
// supaya perubahannya selalu tervalidasi) — ini akan kita bahas formal di Sub-bab 4.

/** KESALAHAN UMUM YANG SERING TERJADI */
// 1. Menambahkan tanda kurung saat memakai get 
// console.log(stokKopi.stok()); // salah 
// error message: TypeError: stokKopi.stok is not a function

console.log(stokKopi.stok); // seharusnya

// 2. Infinite loop, karena nama property sama dengan nama set 
class Test {
  constructor(harga) {
    this.harga = harga;
    // ini akan memicu 'set harga' di bawah, LANGSUNG loop tanpa henti!
  }

  set harga(nilai) {
    this.harga = nilai; 
    // ini juga memanggil 'set harga' lagi, dan lagi, dan lagi...
  }
}

// const testaja = new Test(12)
/**
ERROR MESSAGE: 
this.harga = nilai; 
               ^

RangeError: Maximum call stack size exceeded at set harga


Ini menyebabkan RangeError: Maximum call stack size exceeded (stack overflow). Solusinya: nama property
internal harus beda dari nama get/set-nya — konvensi umum pakai underscore (_harga), seperti contoh Inventory di atas.  

*/

