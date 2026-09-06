// PILAR 1 — Encapsulation (Enkapsulasi)

/**

Teori
Encapsulation itu prinsip "sembunyikan detail internal, tampilkan cuma apa yang perlu diakses dari luar". 
Tujuannya: melindungi data supaya tidak bisa diubah sembarangan dari luar tanpa lewat "pintu resmi" (method) 
yang sudah divalidasi.

Kamu sebenarnya sudah mempraktikkan ini tanpa sadar — ingat _saldo di RekeningBank dan _celcius di Suhu? 
Itu konvensi enkapsulasi manual: underscore menandakan "jangan diakses langsung dari luar, pakai getter/setter". 
Tapi konvensi cuma "aturan tidak tertulis" — secara teknis, orang tetap bisa mengakses _saldo langsung 
dan merusak enkapsulasinya

JS Modern Punya "Private Field" Beneran — #
*/

class RekeningBank {
  #saldo; // property PRIVATE beneran, ditandai dengan '#'

  constructor(pemilik, saldoAwal) {
    this.pemilik = pemilik;
    this.#saldo = saldoAwal;
  }

  get saldo() {
    return this.#saldo;
  }

  setor(jumlah) {
    if (jumlah <= 0) throw new Error("Jumlah setoran harus positif");
    this.#saldo += jumlah;
  }

  tarik(jumlah) {
    if (jumlah > this.#saldo) throw new Error("Saldo tidak cukup");
    this.#saldo -= jumlah;
  }
}

const rekening = new RekeningBank("Budi", 100000);
console.log(rekening.saldo); // 100000, akses lewat getter -> OK

// console.log(rekening.#saldo);

/**

📌 Beda krusial dari _saldo (konvensi doang): #saldo benar-benar diblokir oleh JavaScript sendiri di level 
bahasa — bukan cuma "aturan sopan santun" antar programmer, tapi proteksi teknis yang sesungguhnya. 
Ini # (private field) baru masuk standar JS beberapa tahun terakhir dan sekarang jadi cara yang direkomendasikan
di industri, menggantikan konvensi underscore yang lama.

Contoh dunia nyata

*/

class ShopingCart {
  #items = [];

  tambahItem(nama, harga) {
    if (harga < 0) throw new Error("Harga tidak valid");
    this.#items.push({ nama, harga });
  }

  get totalHarga() {
    return this.#items.reduce((total, item) => total + item.harga, 0);
  }

  get jumlahItem() {
    return this.#items.length;
  }
}

const cart = new ShopingCart();
cart.tambahItem("Kopi", 15000);
cart.tambahItem("Roti", 13000);

console.log(cart.totalHarga); // 28000

/**
Tanpa enkapsulasi, siapapun bisa langsung cart.items.push(...) dengan data sembarangan (harga negatif, dsb), 
melewati semua validasi yang sudah kamu buat. Dengan #items, satu-satunya cara mengubah isi keranjang wajib 
lewat method tambahItem() yang sudah tervalidasi.

*/
