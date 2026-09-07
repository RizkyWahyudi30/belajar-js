// PILAR 2 — Inheritance (Pewarisan)

/**

Teori
Ini pilar yang sudah kamu praktikkan secara manual di Sub-bab 1 (Object.create()). Inheritance memungkinkan sebuah 
class "mewarisi" property dan method dari class lain, supaya tidak perlu menulis ulang logic yang sama berkali-kali. 
Di ES6, ini dilakukan dengan keyword extends dan super.

Perbedaan antara extends dan super di inheritance:
- extends bertugas menghubungkan antar class
- super bertugas memanggil / mengakses elemen milik class induk

*/

class Hewan {
  constructor(nama) {
    this.nama = nama;
  }

  makan() {
    console.log(`${this.nama} sedang makan.`);
  }

  bersuara() {
    console.log(`${this.nama} mengeluarkan suara.`);
  }
}

// Kucing MEWARISI semua dari Hewan
class Kucing extends Hewan {
  constructor(nama, warnaBulu) {
    super(nama); // WAJIB dipanggil DULUAN, ini memanggil constructor Hewan
    this.warnaBulu = warnaBulu;
  }

  bersuara() {
    // OVERRIDE -> menimpa method bersuara() milik Hewan
    console.log(`${this.nama} berkata: Meong!`);
  }
}

const malik = new Kucing("Malik", "Oren");
malik.makan();
malik.bersuara();

/**
Output:
Malik sedang makan.
Malik berkata: Meong!

*/

/** Kenapa super(nama) Wajib Dipanggil Duluan? */
/**

class Kucing extends Hewan {
  constructor(nama, warnaBulu) {
    this.warnaBulu = warnaBulu; // ⚠️ ReferenceError: Must call super constructor before accessing 'this'
    super(nama);
  }
}
  
Ini aturan ketat di JS: kalau sebuah class extends class lain, kamu tidak boleh memakai this sebelum memanggil 
super(...). Alasannya: this (object baru) belum sepenuhnya "siap" sampai constructor dari parent class (Hewan) 
selesai menjalankan setup-nya sendiri lewat super().

super Juga Dipakai untuk Memanggil Method Parent yang Ditimpa

class Kucing extends Hewan {
  bersuara() {
    super.bersuara(); // panggil dulu versi ASLI dari Hewan
    console.log("...tapi lebih spesifiknya: Meong!"); // lalu tambahkan sesuatu
  }
}

const kucing2 = new Kucing("Coco");
kucing2.bersuara();
// "Coco mengeluarkan suara"
// "...tapi lebih spesifiknya: Meong!"

📌 Berguna kalau kamu mau menambahkan behavior tanpa membuang behavior asli dari parent — bukan cuma menimpa total.

*/

/**
1. extends (Membangun Hubungan Pewarisan)
extends digunakan saat mendefinisikan class baru (class anak/child) untuk menyatakan bahwa class tersebut mewarisi 
semua sifat dan method dari class lain (class induk/parent).

- Fungsi utama: Membuat hubungan "is-a" (Class B adalah turunan dari Class A).

*/

// Class Induk (Parent)
class Hewan2 {
  makan() {
    console.log("Sedang makan...");
  }
}

// Class Anak (Child) meminjam semua sifat Hewan pakai 'extends'
class Kelinci extends Hewan2 {
  meong() {
    console.log(".... (kelinci)");
  }
}

const puss = new Kelinci();
puss.meong(); // Berhasil! (Mewarisi method makan() dari Hewan)
puss.makan(); // Berhasil!

/**
2. super (Memanggil Konstruktor atau Method Induk)
super adalah kata kunci yang digunakan di dalam class anak untuk memanggil constructor atau method milik class induk.

Ada dua cara penggunaan super:
- super(...) di dalam constructor: 
  Memanggil constructor milik class induk agar properti induk dapat diinisialisasi terlebih dahulu.
  (Aturan wajib: Jika class anak punya constructor, kamu harus memanggil super() sebelum menggunakan kata kunci this).

- super.method() di dalam method biasa:
  Memanggil method spesifik milik class induk (sering dipakai saat melakukan method overriding).

*/

class Hewan3 {
  constructor(nama) {
    this.nama = nama;
  }

  bersuara() {
    console.log(`${this.nama} membuat suara.`);
  }
}

class Anjing extends Hewan3 {
  constructor(nama, ras) {
    // 1. Memanggil constructor Hewan2(nama) agar this.nama terisi
    super(nama);

    // 2. Baru kemudian membuat properti khusus milik Anjing
    this.ras = ras;
  }

  bersuara() {
    // Memanggil method bersuara() milik Hewan terlebih dahulu
    super.bersuara();

    // Menambahkan perilaku khusus Anjing
    console.log(`${this.nama} (ras ${this.ras}) menggonggong: Guk Guk!`);
  }
}

const doggy = new Anjing("Milo", "Golden Retriever");
doggy.bersuara();

/**
Output:
Milo membuat suara.
Milo (ras Golden Retriever) menggonggong: Guk Guk!

*/

// Contoh Dunia Nyata: Hierarki Role User
class User {
  constructor(nama, email) {
    this.nama = nama;
    this.email = email;
  }

  getPermission() {
    return ["read"];
  }
}

class Admin extends User {
  constructor(nama, email, level) {
    super(nama, email);
    this.level = level;
  }

  getPermission() {
    return [...super.getPermission(), "write", "delete"]; // ambil izin + tambahan
  }
}

const user = new User("Budi", "budi@email.com");
const admin = new Admin("Sinta", "sinta@email.com", "super");

console.log(user.getPermission()); // [ 'read' ]
console.log(admin.getPermission()); // [ 'read', 'write', 'delete' ]

// Ini pola yang sangat umum dipakai di sistem autentikasi/otorisasi dunia nyata.

/** Kesalahan Umum */

// 1. Lupa super() sama sekali di constructor child class
/**
class Kucing extends Hewan {
  constructor(nama, warnaBulu) {
    this.warnaBulu = warnaBulu; // ⚠️ Error langsung, super() wajib dipanggil kalau ada constructor sendiri
  }
}
*/

// 2. Inheritance yang "dipaksakan" padahal relasinya tidak masuk akal (over-engineering)
/**
class Mobil extends Roda { } // ⚠️ Mobil bukan "jenis dari" Roda, mobil PUNYA roda (relasi "has-a", bukan "is-a")

Aturan praktis: pakai inheritance kalau relasinya "is-a" (Kucing adalah jenis Hewan). Kalau relasinya "has-a" 
(Mobil punya Roda, tapi bukan jenis dari Roda), sebaiknya pakai composition (Mobil punya property berisi instance Roda), 
bukan extends. Ini kesalahan desain yang sangat umum di kalangan yang baru belajar OOP — terlalu senang pakai 
inheritance untuk semua relasi.

*/
