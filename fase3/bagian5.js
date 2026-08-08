/** LATIHAN SOAL: CALLBACK -> PROMISE -> ASYNC/AWAIT -> FETCH API */

// Bagian 5

// 5.1 implementasi
function ambilDataSiswa(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id < 1) {
        reject(new Error("Data id invalid!"));
      } else {
        resolve({ id: id, nama: "Siswa " + id });
      }
    }, 1000);
  });
}

async function ambilDanProses() {
  try {
    const datasiswa = await ambilDataSiswa(-1);
    console.log(datasiswa);
  } catch (error) {
    console.log("Message error:", error.message);
  } finally {
    console.log("Selesai diproses");
  }
}

ambilDanProses();

// 5.2 analisis bug
// async function ambilData() {
//   const response = await fetch("https://api-contoh.com/data");
//   const data = response.json();
//   tampilkanData(data);
// }
// ambilData();

/*
Jawaban :
1. bug await
- [aku tidak menemukannya, dibagian manakah errornya?]

2. bug try/catch 
fetch api tidak dibungkus dalam try/catch, jika api mengalami masalah
ditengah jalan, maka tidak akan memberikan response apapun, hanya tampilan
kosong.

ini bisa berbahaya jika sudah menerapakan UI/UX, membuat layar blank 

*/

// 5.3 konsep
/*
Jawaban:
fetch() hanya akan reject (masuk ke catch) kalau ada masalah jaringan 
(network failure, DNS gagal, CORS diblokir, dll). Kalau request-nya 
berhasil sampai ke server dan server balas — meskipun status-nya 404 
atau 500 — fetch() tetap dianggap sukses (resolve), karena secara 
teknis komunikasi HTTP-nya berhasil. Status kode itu cuma bagian dari 
response, bukan alasan untuk reject.


cara mengatasi bisa dengan membuat kode jadi seperti ini:
async function ambilData() {
  try {
    const response = await fetch("https://api-contoh.com/data");
    
    // tambahkan validasi disini, untuk mengecek apakah API error di
    HTTP
    if (!response.ok) {
      throw new Error("error di API");
    }

    const data = response.json();
    tampilkanData(data);
  } catch (error) {
    console.log(error);
  }
}
ambilData();

*/
