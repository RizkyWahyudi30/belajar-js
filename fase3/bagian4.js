/** LATIHAN SOAL: CALLBACK -> PROMISE -> ASYNC/AWAIT -> FETCH API */

// Bagian 4
// 4.1 konsep
/*
Jawaban:
- a = salah, await bisa dipakai hanya function didefinisikan dengan async
- b = benar, setiap fungsi async otomatis membungkus return value-nya 
jadi Promise, sekalipun kamu cuma return 5; biasa.
- c = tidak, await menjeda fungsi itu sendiri, tapi thread utama JS tetap 
bebas mengerjakan hal lain selama menunggu.

*/

// 4.2 Implementasi
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

async function prosesDataSiswa() {
  try {
    const datasiswa = await ambilDataSiswa(1);
    const nilaisiswa = await ambilNilaiSiswa(datasiswa.id);
    const ratarata = await hitungRataRata(nilaisiswa);

    console.log(ratarata);
  } catch (error) {
    console.log("Error: ", error.message);
  }
}

prosesDataSiswa(); // 81.66666666666667

// 4.3 debug
/*
Jawaban
Kode tersebut awalnya kurang "async" karena await tidak bisa dipakai
jika function tidak didefinisikan dengan async

*/
async function prosesSiswa() {
  const siswa = await ambilDataSiswa(1);
  console.log(siswa);
  // { id: 1, nama: 'Siswa1' }
}
prosesSiswa();
