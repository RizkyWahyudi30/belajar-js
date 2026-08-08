/** LATIHAN SOAL: CALLBACK -> PROMISE -> ASYNC/AWAIT -> FETCH API */

// bagian 3

// 3.1 (konsep)
/*
Jawaban:
yaitu 
- Pending = masih di proses
- Fulfilled = berhasil, ada hasilnya
- Rejected = gagal, ada alasan gagalnya

*/

// 3.2 (Implementasi)
function ambilDataSiswa(id) {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      if (id < 1) {
        rejected("ID siswa tidak valid!");
      } else {
        resolve({ id, nama: "Siswa" + id });
      }
    }, 1000);
  });
}

ambilDataSiswa(1)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

// 3.3 (implementasi -- chaining)
function ambilNilaiSiswa(siswaId) {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      const nilai = [80, 90, 75];
      resolve(nilai);
    }, 1000);
  });
}

function hitungRataRata(nilai) {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      const rata_rata = nilai.reduce((sum, n) => sum + n, 0) / nilai.length;
      resolve(rata_rata);
    }, 1000);
  });
}

ambilDataSiswa(1)
  .then((siswa) => ambilNilaiSiswa(siswa.id))
  .then((nilai) => hitungRataRata(nilai))
  .then((rata) => console.log(rata)) // 81.66666666666667
  .catch((error) => console.log(error));

// 3.4 (Prediksi output)
/*
Jawaban:
Aku menebak output yang ada di console merupakan output dari error.message
Karena sebeleum kode:
.then((angka) => console.log("Hasil:", angka))

ada baris kode yang memeriksa error throw new Error yang akan langsung
melempar nya ke dalam baris kode .catch()

*/
