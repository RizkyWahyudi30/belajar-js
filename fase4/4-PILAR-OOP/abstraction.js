// PILAR 4 — Abstraction (Abstraksi)
/**
Teori

Abstraction itu prinsip "sembunyikan kompleksitas, tampilkan cuma interface sederhana ke pemakainya". Ini agak mirip 
dengan encapsulation, tapi fokusnya beda: encapsulation itu soal melindungi data, abstraction itu soal menyembunyikan 
kerumitan proses supaya pemakai class tidak perlu tahu detail implementasinya, cukup tahu "cara pakainya".

Kamu sebenarnya sudah mempraktikkan ini di WeatherService (Sub-bab 3.5) — method cuacaKota() menyembunyikan 
2 langkah rumit (geocoding lalu forecast) di baliknya, pemakainya cukup panggil 1 method saja.

*/

/**
abstract class "Palsu" di JS — Memaksa Subclass Meng-override Method Tertentu

JS tidak punya keyword abstract bawaan (beda dari Java/C#), tapi kamu bisa mensimulasikannya dengan melempar error 
di parent class, seperti yang barusan kamu lihat di contoh MetodePembayaran:

*/

class Bentuk {
  constructor(nama) {
    if (this.constructor === nama) {
      // mencegah class ini di-instantiate LANGSUNG, cuma boleh lewat subclass
      throw new Error(
        "Bentuk adalah abstract class, tidak bisa dibuat instance langsung",
      );
    }

    this.nama = nama;
  }

  hitungLuas() {
    throw new Error("Method hitungLuas() HARUS di-override oleh subclass");
  }
}

class Lingkaran extends Bentuk {
  constructor(radius) {
    super("Lingkaran");
    this.radius = radius;
  }

  hitungLuas() {
    return Math.PI * this.radius ** 2;
  }
}

// const bentuk = new Bentuk("apapun"); // ⚠️ Error! tidak boleh langsung
const lingkaran = new Lingkaran(5);
console.log(lingkaran.hitungLuas()); // 78.54

// ================================================================================================================= //
// TAMBAHAN MATERI DARI GEMINI

/** 1. Abstraksi di JavaScript Modern */
// Di JavaScript modern, Abstraksi biasanya dicapai dengan menggabungkan Encapsulation (menggunakan private method #)
// dan menyediakannya lewat method publik yang bersih.

class MesinKopi {
  // 🔒 Private Methods (Detail internal yang RUMIT disembunyikan)
  #panaskanAir() {
    console.log("Memanaskan air hingga 90°C...");
  }

  #gilingKopi() {
    console.log("Menggiling biji kopi...");
  }

  #ekstrasi() {
    console.log("Mengekstraksi espresso...");
  }

  // 🌐 Public Method (Interface SIMPEL untuk pengguna)
  buatKopi() {
    this.#panaskanAir();
    this.#gilingKopi();
    this.#ekstrasi();
    console.log("☕ Kopi nikmat siap disajikan!");
  }
}

const mesin = new MesinKopi();
// Pengguna cukup panggil 1 method simpel ini:
mesin.buatKopi();

// Pengguna TIDAK BISA (dan tidak perlu) memanggil detail internalnya:
// mesin.#panaskanAir(); // Error: Private field '#panaskanAir' must be declared in an enclosing class

// 2. Abstract Class (Pola Antarmuka Kontrak)
// Bahasa seperti Java atau C# punya kata kunci abstract. JavaScript tidak punya kata kunci abstract secara built-in,
// namun kita bisa menyimulasikannya dengan melemparkan Error di class induk.

// Ini berguna untuk membuat standar / kontrak bahwa setiap class turunan wajib mengimplementasikan method tertentu.

// Class Induk sebagai "Abstract Class" (Tidak boleh di-instantiate langsung)
class DatabaseService {
  constructor() {
    if (this.constructor === DatabaseService) {
      throw new Error(
        "Class DatabaseService adalah Abstract Class dan tidak bisa di-instantiate langsung!",
      );
    }
  }

  // Abstract Method (Kontrak wajib)
  connect() {
    throw new Error("Method connect() harus di-override!");
  }
}

class MyDatabase extends DatabaseService {
  connect() {
    console.log("Terhubung ke database MySQL di port 3306...");
  }
}

// const db = new DatabaseService(); // Error: Class DatabaseService adalah Abstract Class dan tidak bisa di-instantiate langsung!
const mysql = new MyDatabase();
mysql.connect(); // Terhubung ke database MySQL di port 3306...
