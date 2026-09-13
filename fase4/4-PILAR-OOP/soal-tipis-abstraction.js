/** Soal Latihan Abstraksi */

// Soal 1: Easy (Private Methods & Public Interface)
/**
Buatlah class SistemPemesanan yang memiliki:
1. Private method #cekStok(item): mencetak "Mengecek stok item..." dan mengembalikan true.
2. Private method #prosesPembayaran(total): mencetak "Memproses pembayaran Rp[total]...".
3. Private method #kirimResi(): mencetak "Resi pengiriman telah dibuat.".
4. Public method pesan(item, total): menjalankan ketiga private method di atas secara berurutan dan mencetak "Pemesanan berhasil!".

*/

class SistemPemesanan {
  #cekStock(item) {
    console.log("Mengecek stok item...");
    return true;
  }

  #prosesPembyaran(total) {
    console.log(`Memproses pembayaran Rp${total}`);
  }

  #kirimResi() {
    console.log("Resi pengiriman telah dibuat.");
  }

  pesan(item, total) {
    this.#cekStock(item);
    this.#prosesPembyaran(total);
    this.#kirimResi();
    console.log("Pemesanan berhasil!");
  }
}

const pesan = new SistemPemesanan();
pesan.pesan("americano", 3);
/** 
output:

Mengecek stok item...
Memproses pembayaran Rp3
Resi pengiriman telah dibuat.
Pemesanan berhasil!

*/

// Soal 2: Medium / Analisis (Abstract Class Simulation)
/**

class Notifier {
  constructor() {
    if (this.constructor === Notifier) {
      throw new Error("Notifier adalah Abstract Class!");
    }
  }

  send() {
    throw new Error("Method send() wajib di-override!");
  }
}

class EmailNotifier extends Notifier {}

const email = new EmailNotifier();
email.send();

Pertanyaan:
1. Apa yang akan terjadi saat kode const email = new EmailNotifier(); dijalankan? (Apakah error atau lolos?)
2. Apa yang akan terjadi saat email.send() dipanggil? Jelaskan alasannya!

*/

class Notifier {
  constructor() {
    if (this.constructor === Notifier) {
      throw new Error("Notifier adalah Abstract Class!");
    }
  }

  send() {
    throw new Error("Method send() wajib di-override!");
  }
}

class EmailNotifier extends Notifier {}

const email = new EmailNotifier();
// email.send();

// error:
/**

jawaban pertanyaan 1:
tidak error


jawaban pertanyaan 2:
D:\coding\javascript\fase4\4-PILAR-OOP\soal-tipis-abstraction.js:81
    throw new Error("Method send() wajib di-override!");
    ^

Error: Method send() wajib di-override!

*/

// ================= SOAL DARI CLAUDE ======================= //

// Soal 4.1 — Encapsulation: Private Field
/**

Bikin class Password dengan:
1. #hash (private field) yang menyimpan "hash" password (untuk latihan, cukup simulasikan hash-nya dengan membalik 
    string password, misal "rahasia" jadi "aisahar" — tidak perlu library crypto asli).
2. Method set(passwordBaru) — simpan hash-nya.
3. Method cocok(passwordCoba) — return true/false, cek apakah passwordCoba (setelah di-"hash" juga) sama dengan #hash yang tersimpan.
4. Buktikan bahwa password.#hash tidak bisa diakses langsung dari luar class (akan SyntaxError).

*/

class Password {
  #hash = "";

  #hashPassword(pass) {
    return pass.split("").reverse().join("");
  }

  set(passwordBaru) {
    this.#hash = this.#hashPassword(passwordBaru);
  }

  cocok(passwordCoba) {
    if (this.#hashPassword(passwordCoba) === this.#hash) {
      return true;
    } else {
      return false;
    }
  }
}

const user = new Password();
// user.#hash; // error: property '#hash' is not not accessible outside class 'password' because it has a private identifier
user.set("rahasia");
console.log(user.cocok("rahasia"));

// Soal 4.2 — Inheritance + Polymorphism (RPG sederhana, pemanasan sebelum project final)
/**

Bikin class Karakter dengan nama, hp (health point), method serang(target) yang mengurangi hp target sebesar angka 
tetap (misal 10), dan method infoStatus() yang return string status hp saat ini.

Bikin class Ksatria extends Karakter dan class Penyihir extends Karakter, masing-masing override serang() dengan 
damage berbeda (misal Ksatria 15, Penyihir 20 tapi hanya bisa menyerang 3 kali sebelum "kehabisan mana" — bebas kreasi, 
yang penting overriding-nya terlihat jelas).

Buktikan polymorphism-nya: buat array berisi campuran Ksatria dan Penyihir, loop dan panggil serang(musuh) untuk 
semuanya tanpa if/else pengecekan jenis apapun.

*/

class Karakter {
  constructor(nama, hp) {
    this.nama = nama;
    this.hp = hp;
  }

  serang(target) {
    throw new Error("Harus di override");
  }

  infoStatus() {
    return `HP: ${this.hp}`;
  }
}

class Ksatria extends Karakter {
  constructor(nama, hp) {
    super(nama, hp);
    this.damage = 15;
  }

  serang(target) {
    target.hp -= this.damage;
    console.log(
      `${this.nama}: menyerang ${target.nama} sebesar ${this.damage} damage!`,
    );
  }
}

class Penyihir extends Karakter {
  constructor(nama, hp) {
    super(nama, hp);
    this.damage = 20;
    this.mana = 3;
  }

  serang(target) {
    if (this.mana > 0) {
      this.mana -= 1;
      target.hp -= this.damage;
      console.log(
        `${this.nama}: menyerang ${target.nama} sebesar ${this.damage} damage!`,
      );
    } else {
      console.log(`${this.mana} kehabisan mana! tidak bisa menyerang`);
    }
  }
}

// const penyihir = new Karakter("Andalf", 100);
// const char = new Ksatria("Houme", 100);

// char.serang(penyihir);
// console.log(penyihir.infoStatus());

const bos = new Karakter("Monster", 100);

const pasukan = [
  new Ksatria("Houme", 100),
  new Penyihir("Andalf", 100),
  new Ksatria("Arthur", 100),
];

for (let pahlawan of pasukan) {
  pahlawan.serang(bos);
  pahlawan.serang(bos);
  pahlawan.serang(bos);
  pahlawan.serang(bos);
}

console.log(bos.infoStatus());

// Soal 4.3 — Abstraction: Payment Gateway
/**

Bikin class PaymentGateway (abstract) dengan method bayar(jumlah) yang wajib di-override (lempar error kalau tidak). 
Cegah juga class ini di-instantiate langsung (pola this.constructor === PaymentGateway).

Bikin minimal 2 subclass (Midtrans, Xendit — atau nama bebas) yang masing-masing meng-override bayar() dengan pesan berbeda. 
Buktikan:

- new PaymentGateway() harus error.
- new Midtrans().bayar(50000) harus jalan normal.

*/

class PaymentGateway {
  constructor() {
    if (this.constructor === PaymentGateway) {
      throw new Error(
        "Payment Gateway dalah Abstract Class dan tidak bisa di-instantiate langsung!",
      );
    }
  }

  bayar(jumlah) {
    throw new Error("Harus di override!");
  }
}

class Midtrans extends PaymentGateway {
  bayar(jumlah) {
    console.log(`Jumlah pembayaran: ${jumlah}`);
  }
}

class Xendit extends PaymentGateway {
  bayar(jumlah) {
    console.log(`Jumlah pembayaran: ${jumlah}`);
  }
}

// const payment = new PaymentGateway();
// error: Error: Payment Gateway dalah Abstract Class dan tidak bisa di-instantiate langsung!

const midtrans = new Midtrans();
midtrans.bayar(5000000);
