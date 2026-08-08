/** 1. Kenapa async itu sangat dibutuhkan */

// function fetchDataSecaraBlocking() {}
// console.log("mulai");
// const data = fetchDataSecaraBlocking();
// setTimeout(() => {
//   console.log("ini munculnya belakangan");
// }, 3000);
// console.log("berakhir");
/**
 *
 * // const data = fetchDataSecaraBlocking();
 *
 * Javascript biasanya menjalankan nya dari atas kebawah
 * Bisa dibilang = selesaikan satu persatu
 *
 * Jika salah satu bagian ada yang lama, membuat bagian lainnya
 * lama tereksekusi
 *
 *
 */

/** Evolusi: Callback -> Promise -> Async/Await */

// * Era Callback (cara paling awal)
// function ambilDataUser(userId, callback) {
//   setTimeout(() => {
//     const user = { id: userId, name: "Budi" };
//     callback(user);
//   }, 2000);
// }

// ambilDataUser(1, (user) => {
//   console.log(user);
// });

/**
 *
 * Masalah nya jika ada beberapa operasi async yang saling
 * bergantung. Contoh nya:
 *
 * ambil user -> pakai user untuk ambil daftar order
 * -> ambil daftar order untuk pembayaran
 *
 * Itulah yang disebut "CALLBACK HELL"
 *
 */

// ambilDataUser(1, (user) => {
//   ambilOrderUser(user.id, (orders) => {
//     ambilDetailPembayaran(orders[0].id, (payment) => {
//       ambilStatusPengiriman(payment.id, (shipping) => {
//         console.log(shipping); // 4 level nested dan bisa makin dalam
//         // error handling disini juga jadi mimpi buruk
//       });
//     });
//   });
// });

// kode nya juga bisa disebut "Pyramid of doom"

// * Era Promise (Solusi untuk callback hell)
/**
 *
 * Promise adalah object yang mewakili "hasil dari operasi async",
 * yang belum sekarang, tapi nanti.
 *
 * Promise punya 3 kemungkinan status:
 * 1. pending -- masih di proses
 * 2. fulfilled -- berhasil, ada hasilnya
 * 3. rejected -- gagal, ada alasan kegagalannya
 *
 */

// function ambilDataUser(userId, userName) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (userId <= 0) {
//         reject("User ID tidak valid!");
//       } else {
//         resolve({ id: userId, name: userName });
//       }
//     }, 1000);
//   });
// }

// ambilDataUser(1, "Budi")
//   .then((user) => console.log(user)) // kalo resolve / valid
//   .catch((error) => console.log(error)); // kalo reject / tidak valid
// { id: 1, name: 'Budi' }
// User ID tidak valid!

// Keunggulan utama: bisa di-chain secara FLAT, jadinya tidak nested
// ambilDataUser(1, budi)
//   .then((user) => ambilOrderUser(user.id))
//   .then((orders) => ambilDetailPembayaran(orders[0].id))
//   .then((payment) => ambilStatusPengiriman(payment.id))
//   .then((shipping) => console.log(shipping))
//   .catch((error) => console.log(error));
// 1 .catch() menangani semua langkah

// * Era Async/Await(syntactic sugar di atas promise)

// Async/await bukan teknologi baru - dia cuma membaca Promise seolah
// seolah synchronous, tapi dibaliknya tetap Promise

// async function prosesData() {
//   try {
//     const user = await ambilDataUser(1, "Budi");
//     const order = await ambilOrderUser(user.id);
//     const payment = await ambilDetailPembayaran(order[0].id);
//     const shipping = await ambilStatusPengiriman(payment.id);
//     console.log(shipping);
//   } catch (error) {
//     console.log("Ada error: ", error);
//   }
// }

// prosesData();
/**
 *
 * Aturan yang berlaku:
 * - await hanya bisa digunakan didalam function yang dideklarasikan async
 * - await "menjeda" eksekusi function itu sampai Promise selesai -- tapi
 *   tidak memblok thread utama, bagian lain tetap responsif
 * - async function selalu return Promise, walau tidak menulis 'return new Promise()'
 *
 */

/** Fetch API -- Konsumsi REST API Publik */
// fetch() adalah cara modern untuk melakukan http request dari javascript
// fetch() itu return Promise

// fetch("https://api.example.com/users/v1")
//   .then((response) => response.json()) // parsing body jadi JS object, INI juga bentuk promise!
//   .then((data) => console.log(data))
//   .catch((error) => console.log("Fetch gagal:", error));

// versi async/await -nya
// async function ambilUser(id) {
//   try {
//     const response = await fetch(`https://api.example.com/users/${id}`);
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.log("Fetch gagal:", error);
//   }
// }

// ambilUser(1);

/**
 *
 * fetch() tidak reject di HTTP error (404, 500, dll)
 *
 * fetch() hanya reject kalau ada masalah jaringan -- HTTP Error status
 * tetap dianggap "berhasil" dari sudut pandang fetch
 *
 */

// async function ambilUser(id) {
//   const response = await fetch(`https://api.example.com/users/${id}`);

//   // kalau server 404, kode tetap lanjut ke baris berikut nya, tidak masuk
//   // ke catch
//   const data = response.json();
//   console.log(data); // bisa jadi { error: "not found"} dari server, tapi
//   // diperlakukan seoalah data valid
// }

// perbaikannya: wajib selalu cek response.ok secara eksplisit

// async function ambilUser(id) {
//   try {
//     const response = await fetch(`https://api.example.com/users/${id}`);

//     if (!response.ok) {
//       // response.ok bernilai false kalau status di luar 200-299 (misal 404, 505)
//       throw new Error(`HTTP ERROR! STATUS: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.log("Gagal fetch:", error.message);
//   }
// }

// throw didalam try block akan langsung "dilempar" ke catch terdekat
// mekanismen sama seperti melempar error manual, dan ini yang memungkinkan
// mendeteksi HTTP error yang seharusnya dianggal gagal

/** Error Handling -- try/catch untuk Async */

// Pola dasar
// async function contoh() {
//   try {
//     const hasil = await operasiAsync();
//     console.log(hasil);
//   } catch (error) {
//     console.log("Error:", error.message);
//   } finally {
//     console.log("Ini selalu jalan, baik sukses maupun gagal");
//     // biasa dipakai suka matiin loading spinner
//   }
// }

// Kesalahan umum: lupa try/catch, aplikasi "diam - diam gagal" tanpa pesan
// jelas ke user

// TANPA try/catch: kalau fetch gagal (misal user offline),
// error muncul di console tapi di user layar tidak tau apa apa
// async function ambilData() {
//   const response = await fetch("https://api-yang-mungkin-down.com/data");
//   const data = response.json();
//   tampilkanData(data);
// }

// Kalau fetch gagal (network error), function berhenti di titik
// itu — tampilkanData tidak pernah kepanggil, tapi user di layar tidak
// melihat apapun, tidak ada pesan error, cuma layar kosong/loading yang
// tidak pernah selesai. UX yang buruk

// Perbaikan: selalu beri feedback ke user, bukan cuma console.log
// async function ambilData() {
//   tampilkanLoading(); // kasih tau sedang proses

//   try {
//     const response = await fetch("https://api-yang-mungkin-down.com/data");
//     if (!response) throw new Error(`Server down: ${response.status}`);

//     const data = response.json();
//     tampilkanData(data);
//   } catch (error) {
//     tampilkanError("Gagal memuat data, coba lagi nanti");
//   } finally {
//     sembunyikanLoading(); // apapun hasilnya, loading harus berhenti
//   }
// }
