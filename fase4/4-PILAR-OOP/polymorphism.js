// PILAR 3 — Polymorphism (Polimorfisme)
/**
Polymorphism artinya "banyak bentuk" — kemampuan object yang berbeda untuk merespons pemanggilan method yang sama dengan 
cara yang berbeda-beda, tergantung jenis object-nya. Kamu sudah lihat contohnya barusan tanpa sadar: 
kucing.bersuara() vs hewan.bersuara() — nama method-nya sama, tapi behaviornya beda tergantung object mana yang 
memanggilnya.

Contoh yang Lebih Jelas Menunjukkan Kekuatan Polymorphism:

*/

class Hewan {
  constructor(nama) {
    this.nama = nama;
  }

  bersuara() {
    console.log(`${this.nama} mengeluarkan suara`);
  }
}

class Anjing extends Hewan {
  bersuara() {
    console.log(`${this.nama}: Guk Guk`);
  }
}

class Kucing extends Hewan {
  bersuara() {
    console.log(`${this.nama}: Meong Meong!`);
  }
}

class Bebek extends Hewan {
  bersuara() {
    console.log(`${this.nama}: Kwek Kwek!`);
  }
}

const daftarNama = [new Anjing("Rex"), new Kucing("Miko"), new Bebek("Donald")];

// INTI polymorphism: loop yang SAMA, tidak perlu tahu jenis spesifik tiap hewan,
// tapi behaviornya otomatis BEDA sesuai jenisnya masing-masing
daftarNama.forEach((hewan) => hewan.bersuara());
/**
output:

Rex: Guk Guk
Miko: Meong Meong!
Donald: Kwek Kwek!

*/

/**
📌 Ini keuntungan nyata polymorphism: kode yang memanggil (daftarHewan.forEach(...)) tidak perlu tahu atau peduli jenis 
spesifik tiap object — dia cukup percaya bahwa semua object di array itu punya method bersuara(), dan JS otomatis 
menjalankan versi yang tepat sesuai class masing-masing. Kalau besok kamu tambah class Sapi extends Hewan baru, 
kode loop di atas tidak perlu diubah sama sekali — cukup tambahkan instance Sapi ke array, otomatis ikut bekerja.

Contoh Dunia Nyata: Sistem Pembayaran

*/

class MetodePembayaran {
  proses() {
    throw new Error(`Method proses() harus di-override oleh subclass`);
  }
}

class KartuKredit extends MetodePembayaran {
  proses(jumlah) {
    console.log(`Memproses Rp${jumlah} lewat kartu kredit...`);
  }
}

class TransferBank extends MetodePembayaran {
  proses(jumlah) {
    console.log(`Memproses Rp${jumlah} lewat Transfer Bank...`);
  }
}

class EWallet extends MetodePembayaran {
  proses(jumlah) {
    console.log(`Memproses Rp${jumlah} lewat E-Wallet...`);
  }
}

function checkout(metodePembayaran, total) {
  metodePembayaran.proses(total); // TIDAK PEDULI jenis spesifiknya, tinggal panggil proses()
}

checkout(new KartuKredit(), 1500000);
checkout(new EWallet(), 50000);
/**
Memproses Rp1500000 lewat kartu kredit...
Memproses Rp50000 lewat E-Wallet...

*/

// Ini pola yang sangat umum di aplikasi e-commerce nyata — checkout() tidak perlu if/else panjang untuk cek
// "kalau kartu kredit lakukan X, kalau transfer bank lakukan Y" — polymorphism menghilangkan kebutuhan itu sama sekali.

/**
Kesalahan Umum:
1. Memakai if/else/switch untuk cek jenis object, padahal polymorphism seharusnya menghilangkan kebutuhan itu:

function bikinBersuara(hewan) {
  if (hewan instanceof Anjing) {
    console.log(`${hewan.nama}: Guk guk!`)
  } else if (hewan instanceof Kucing) {
    console.log(`${hewan.nama}: Meong!`)
  }
  // kalau ada hewan baru function ini harus DIUBAH lagi -> tidak scalable

Ini disebut anti-pattern — kalau kamu menulis if/else/switch berdasarkan jenis object untuk menentukan behavior, 
itu tanda kamu belum memanfaatkan polymorphism dengan benar. Solusinya: biarkan masing-masing class yang mendefinisikan 
bersuara()-nya sendiri (seperti contoh di atas), lalu panggil hewan.bersuara() langsung tanpa pengecekan jenis apapun.
}

*/
