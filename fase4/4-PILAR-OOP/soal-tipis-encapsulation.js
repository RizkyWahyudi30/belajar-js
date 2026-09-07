// Soal 1: Easy (Membuat Class Baru)

/**

Buatlah sebuah class bernama AkunPengguna yang memiliki:
1. Private field #password.
2. Property publik username.
3. Constructor untuk menerima username dan password.
4. Method gantiPassword(passwordLama, passwordBaru):
5. Jika passwordLama cocok dengan #password, ubah #password menjadi passwordBaru dan tampilkan/return pesan sukses.
6. Jika passwordLama salah, berikan error atau pesan kegagalan.

Catatan: Jangan buat getter untuk #password (karena password tidak boleh dibaca langsung dari luar).

*/

class AkunPengguna {
  #password;

  constructor(username, password) {
    this.username = username;
    this.#password = password;
  }

  gantiPassword(passwordLama, passwordBaru) {
    if (passwordLama === this.#password) {
      this.#password = passwordBaru;
      return "Ganti Password Sukses!";
    } else {
      throw new Error("Password Lama Salah!");
    }
  }
}

const akunBaru = new AkunPengguna("Wahyu", "lamaaja");
// console.log(akunBaru.gantiPassword("lamaAja", "Lama banget nih"));

/**
error message:

D:\coding\javascript\fase4\4-PILAR-OOP\soal-tipis-encapsulation.js:30
        throw new Error("Password Lama Salah!");
        ^

Error: Password Lama Salah!

*/

// Soal 2: Medium (Validasi & Refactoring)
/**
Di bawah ini ada kode JavaScript yang masih menggunakan konvensi lama (_) dan rentan diacak-acak dari luar:

class DompetDigital {
  constructor(nama, saldoAwal) {
    this.nama = nama;
    this._saldo = saldoAwal;
    this._pin = "1234";
  }

  bayar(jumlah, pin) {
    if (pin === this._pin && this._saldo >= jumlah) {
      this._saldo -= jumlah;
      return true;
    }
    return false;
  }
}

Tugas kamu:
1/ Ubah (refactor) class DompetDigital di atas agar:
2. Menggunakan private field (#) sesungguhnya untuk #saldo dan #pin.
3. Tambahkan getter untuk saldo (sehingga saldo bisa dilihat dari luar, tetapi tidak bisa diubah langsung).
4. Tambahkan method ubahPin(pinLama, pinBaru) dengan validasi bahwa pinBaru harus berupa string 4 digit angka.

*/

class DompetDigital {
  #saldo;
  #pin;

  constructor(nama, saldoAwal) {
    this.nama = nama;
    this.#saldo = saldoAwal;
    this.#pin = "1234";
  }

  get saldo() {
    return this.#saldo;
  }

  bayar(jumlah, pin) {
    if (pin === this.#pin && this.#saldo >= jumlah) {
      this.#saldo -= jumlah;
      return "Pembayaran sukses!";
    }
    return "Pembyaran Gagal";
  }

  ubahPin(pinLama, pinBaru) {
    if (pinLama !== this.#pin) {
      throw new Error("Pin Salah!");
    }

    // validasi pin baru: harus string, tepat 4 digit angka
    const validasiPin = typeof pinBaru === "string" && /^\d{4}$/.test(pinBaru);

    if (!validasiPin) {
      throw new Error("PIN harus berupa string dan 4 digit angka");
    }

    this.#pin = pinBaru;
    return "PIN berhasil diubah";
  }
}

const dompetSatu = new DompetDigital("Dompet Satu", 150000);
console.log(dompetSatu.saldo); // 150000

console.log(dompetSatu.bayar(10000, "1234")); // Pembayaran sukses!

console.log(dompetSatu.saldo); // 140000

console.log(dompetSatu.ubahPin("1234", "2345")); // PIN berhasil diubah
