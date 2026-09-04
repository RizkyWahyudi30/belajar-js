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
    this.jumlahHalaman = jumlahHalaman
  }

  ringkasan() {
    console.log(`${this.judul} oleh ${this.penulis} (${this.jumlahHalaman} halaman)`)
  }
}

const buku1 = new Buku("Laskar Pelangi", "Andrea Hirata", 529);
buku1.ringkasan();
const buku2 = new Buku("Cerita tamu yang bertemu tapi berakhir semu", "Sdavincii", 200);
buku2.ringkasan();

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
    this.saldoAwal = saldoAwal;
  }

  get saldo() {
    return this.saldoAwal;
  }

  set saldo(nilai) {
    if (this.saldoAwal < 0) {
      throw new Error("Saldo tidak boleh negatif")
    }
    this.saldoAwal = nilai
  }

  setor(jumlah) {
    return this.saldoAwal + jumlah;
  }

  tarik(jumlah) {
    if(this.saldoAwal === 0 || this.saldoAwal < jumlah) {
      throw new Error("Saldo tidak cukup")
    }
    return this.saldoAwal - jumlah;
  }
}

const rekening = new RekeningBank("Budi", 100000);
rekening.setor(50000);
console.log(rekening.saldo); // 150000
//rekening.tarik(1000000); // harus GAGAL dengan pesan yang jelas, saldo TIDAK berubah
//console.log(rekening.saldo); // masih 150000