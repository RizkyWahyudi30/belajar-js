/** LATIHAN SOAL: CALLBACK -> PROMISE -> ASYNC/AWAIT -> FETCH API */

// bagian 2
// 2.1 (implementasi)
function ambilDataProduk(productId, callback) {
  setTimeout(() => {
    callback({ id: productId, nama: "Produk " + productId, harga: 50000 });
  }, 1500);
}

ambilDataProduk(1, (prod) => {
  console.log(prod);
  //   { id: 1, nama: 'Produk 1', harga: 50000 }
});

// 2.2 (Implementasi -- Callback Hell)
function ambilDataSiswa(id, callback) {
  setTimeout(() => {
    callback({ id: id, nama: "Siswa " + id });
  }, 1000);
}
function ambilNilaiSiswa(siswaId, callback) {
  setTimeout(() => {
    const nilai = [80, 90, 75];
    callback(nilai);
  }, 1000);
}
function hitungRataRata(nilai, callback) {
  setTimeout(() => {
    const nilaiRataRata = nilai.reduce((sum, n) => sum + n, 0) / nilai.length;
    callback(nilaiRataRata);
  }, 1000);
}

ambilDataSiswa(1, (userId) => {
  console.log(userId);
  // { id: 1, nama: 'Siswa 1' }

  ambilNilaiSiswa(userId, (nilai) => {
    console.log(nilai);
    // [80, 90, 75];

    hitungRataRata(nilai, (hasil) => {
      console.log(hasil);
      // { id: 1, nama: 'Produk 1', harga: 50000 }
    });
  });
});

// 2.3 (Konsep)
/*
Jawbaan:
Kalau dari yang aku rasakan :
1. Kode menjadi terlalu panjang dan jika di maintenance atau pencarian 
bug nya menjadi susah, harus satu persatu dari paling atas
2. Kode terlihat menumpuk 

*/
