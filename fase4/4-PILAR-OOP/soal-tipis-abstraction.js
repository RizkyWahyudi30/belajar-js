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
