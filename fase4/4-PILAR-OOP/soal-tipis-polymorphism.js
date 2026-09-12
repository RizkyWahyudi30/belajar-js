// Soal 1: Easy (Bentuk Geometri & Luas)

/**
Buatlah sistem untuk menghitung luas berbagai bentuk geometri:

1. Class Induk: Bentuk
    Memiliki method hitungLuas() yang melempar error: "Method hitungLuas() harus di-override!".

2. Class Anak: Persegi (turunan dari Bentuk)
    - Constructor menerima sisi.
    - Override hitungLuas() untuk mengembalikan hasil sisi * sisi.

3. Class Anak: Lingkaran (turunan dari Bentuk)
    - Constructor menerima jariJari.
    - Override hitungLuas() untuk mengembalikan hasil Math.PI * jariJari * jariJari.

4. Fungsi Utama:
    - Buat fungsi cetakTotalLuas(daftarBentuk) yang menerima sebuah array berisi berbagai objek bentuk.
    - Gunakan loop untuk menjumlahkan dan mencetak total seluruh luasnya menggunakan polymorphism.

*/

class Bentuk {
  hitungLuas() {
    throw new Error("Method hitungLuas() harus di-override!");
  }
}

class Persegi extends Bentuk {
  constructor(sisi) {
    super();
    this.sisi = sisi;
  }

  hitungLuas() {
    return this.sisi * this.sisi;
  }
}

class Lingkaran extends Bentuk {
  constructor(jarijari) {
    super();
    this.jarijari = jarijari;
  }

  hitungLuas() {
    return Math.PI * this.jarijari * this.jarijari;
  }
}

function cetakTotalLuas(daftarBentuk) {
  let totalLuas = 0;

  for (let bentuk of daftarBentuk) {
    totalLuas += bentuk.hitungLuas();
  }

  console.log(`Total luas: ${totalLuas}`);
  return totalLuas;
}

const bentuk = [new Persegi(4), new Lingkaran(2)];
// cetakTotalLuas(bentuk); // output: Total luas: 28.566370614359172

// Soal 2: Medium (Sistem Notifikasi Multi-Channel)
/**
Buatlah sistem pengiriman notifikasi:
1. Class Induk: Notifikasi
  - Method kirim(pesan): melempar error jika tidak di-override.

2 Class Anak:
  - EmailNotifikasi: mencetak "Mengirim Email ke user: [pesan]".
  - SMSNotifikasi: mencetak "Mengirim SMS ke hp: [pesan]".
  - PushNotifikasi: mencetak "Mengirim Push Notification ke app: [pesan]".

3. Class Utama: PengirimNotifikasi
  - Memiliki method broadcast(daftarChannel, pesan) yang menerima array dari berbagai channel notifikasi dan sebuah string pesan.
  - Jalankan metode pengiriman ke seluruh channel tanpa pengecekan tipe/jenis channel (gunakan polymorphism!).

*/

class Notifikasi {
  kirim(pesan) {
    throw new Error("Harus di override!");
  }
}

class EmailNotifikasi extends Notifikasi {
  kirim(pesan) {
    console.log(`Mengirim Email ke user: ${pesan}`);
  }
}

class SMSNotifikasi extends Notifikasi {
  kirim(pesan) {
    console.log(`Mengirim SMS ke HP: ${pesan}`);
  }
}

class PushNotifikasi extends Notifikasi {
  kirim(pesan) {
    console.log(`Mengirim Push Notification ke app: ${pesan}`);
  }
}

class PengirimNotifikasi {
  broadcast(daftarChannel, pesan) {
    // loop untuk menjalankan method ke tiap channel
    for (let channel of daftarChannel) {
      channel.kirim(pesan);
    }
  }
}

const channels = [
  new EmailNotifikasi("halo"),
  new SMSNotifikasi("halo"),
  new PushNotifikasi("halo"),
];

const notif = new PengirimNotifikasi();
// notif.broadcast(channels, "halo");

// Soal 3: Hard / Refactoring (Menghilangkan Anti-Pattern)
/**
Di bawah ini ada kode buruk yang penuh if/else (anti-pattern):

class LaporanGaji {
  cetakGaji(karyawan) {
    if (karyawan.tipe === "Tetap") {
      const total = karyawan.gajiPokok + karyawan.tunjangan;
      console.log(`Gaji Karyawan Tetap (${karyawan.nama}): Rp${total}`);
    } else if (karyawan.tipe === "Kontrak") {
      const total = karyawan.jamKerja * karyawan.tarifPerJam;
      console.log(`Gaji Karyawan Kontrak (${karyawan.nama}): Rp${total}`);
    } else if (karyawan.tipe === "Intern") {
      console.log(`Gaji Intern (${karyawan.nama}): Rp${karyawan.uangSaku}`);
    }
  }
}

Tugas:
Ubah (refactor) kode di atas dengan membuat class KaryawanTetap, KaryawanKontrak, dan KaryawanIntern yang menerapkan 
polymorphism, sehingga method cetakGaji() di class LaporanGaji cukup memanggil satu baris kode tanpa if/else sama sekali!

*/

class Karyawan {
  constructor(nama) {
    this.nama = nama;
  }

  hitungGaji() {
    throw new Error("harus di override");
  }
}

class KaryawanTetap extends Karyawan {
  constructor(nama, gajiPokok, tunjangan) {
    super(nama);
    this.gajiPokok = gajiPokok;
    this.tunjangan = tunjangan;
  }

  hitungGaji() {
    return this.gajiPokok + this.tunjangan;
  }
}

class KaryawanKontrak extends Karyawan {
  constructor(nama, jamKerja, tarifPerjam) {
    super(nama);
    this.jamKerja = jamKerja;
    this.tarifPerjam = tarifPerjam;
  }

  hitungGaji() {
    return this.jamKerja * this.tarifPerjam;
  }
}

class KaryawanIntern extends Karyawan {
  constructor(nama, uangSaku) {
    super(nama);
    this.uangSaku = uangSaku;
  }

  hitungGaji() {
    return this.uangSaku;
  }
}

class LaporanGaji {
  cetakGaji(karyawan) {
    for (let orang of karyawan) {
      console.log(`Gaji ${orang.nama}: Rp${orang.hitungGaji()}`);
    }
  }
}

const karyawan = [
  new KaryawanTetap("kartap", 8000000, 2500000),
  new KaryawanKontrak("kontrak", 9, 100000),
  new KaryawanIntern("intern", 75000),
];

const laporan = new LaporanGaji();
laporan.cetakGaji(karyawan);
/**
output:

Gaji kartap: Rp10500000
Gaji kontrak: Rp900000
Gaji intern: Rp75000

*/
