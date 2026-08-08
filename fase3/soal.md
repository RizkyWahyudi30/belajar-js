# Latihan Soal: Callback → Promise → Async/Await → Fetch API

Soal disusun bertingkat: dimulai dari konsep dasar (kenapa async dibutuhkan), lalu callback, promise, async/await, error handling, dan diakhiri praktik langsung dengan Fetch API ke server sungguhan. Kerjakan urut, jangan loncat — tiap bagian jadi fondasi untuk bagian berikutnya.

---

## Bagian 1 — Kenapa Async Dibutuhkan (Konsep Dasar)

**1.1 (Konsep)**
Jelaskan dengan kata-katamu sendiri: kenapa JavaScript butuh mekanisme async, padahal secara default dia menjalankan kode dari atas ke bawah satu-satu (synchronous)?

**1.2 (Prediksi Output)**
Tanpa menjalankan kode, tebak urutan output yang muncul di console:

```js
console.log("A");
setTimeout(() => {
  console.log("B");
}, 1000);
console.log("C");
```

**1.3 (Prediksi Output — sedikit lebih sulit)**
Tebak urutan outputnya, dan jelaskan kenapa urutannya seperti itu:

```js
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
```

**1.4 (Analisis)**
Sebutkan 1 contoh nyata (di luar `setTimeout`) operasi yang sifatnya async di dunia nyata pemrograman web. Kenapa operasi itu tidak bisa/tidak baik dilakukan secara blocking?

---

## Bagian 2 — Callback

**2.1 (Implementasi)**
Buat fungsi `ambilDataProduk(productId, callback)` yang mensimulasikan pengambilan data dari server pakai `setTimeout` 1.5 detik, lalu memanggil `callback` dengan object `{ id: productId, nama: "Produk " + productId, harga: 50000 }`.

**2.2 (Implementasi — Callback Hell)**
Berdasarkan pola di materi (`ambilDataUser` → `ambilOrderUser` → `ambilDetailPembayaran`), buat sendiri 3 fungsi callback berantai bertema **sekolah**:

- `ambilDataSiswa(id, callback)` → hasil: `{ id, nama }`
- `ambilNilaiSiswa(siswaId, callback)` → hasil: array nilai, misal `[80, 90, 75]`
- `hitungRataRata(nilai, callback)` → hasil: rata-rata nilai

Lalu panggil ketiganya secara **nested** (bersarang) seperti pola callback hell di materi.

**2.3 (Konsep)**
Setelah mengerjakan 2.2, jelaskan: masalah apa yang kamu rasakan sendiri saat menulis kode nested seperti itu? Sebutkan minimal 2 masalah konkret (bukan cuma "susah dibaca").

---

## Bagian 3 — Promise

**3.1 (Konsep)**
Sebutkan 3 status yang mungkin dimiliki sebuah Promise, dan jelaskan singkat kapan masing-masing status itu terjadi.

**3.2 (Implementasi)**
Ubah fungsi `ambilDataSiswa` dari soal 2.2 menjadi versi Promise. Aturan:

- Kalau `id` lebih kecil dari 1 → `reject` dengan pesan `"ID siswa tidak valid!"`
- Kalau valid → `resolve` dengan object `{ id, nama: "Siswa " + id }`

**3.3 (Implementasi — Chaining)**
Ubah `ambilNilaiSiswa` dan `hitungRataRata` dari soal 2.2 juga menjadi versi Promise. Lalu chain ketiganya (`ambilDataSiswa` → `ambilNilaiSiswa` → `hitungRataRata`) memakai `.then()` secara **flat**, diakhiri satu `.catch()`.

**3.4 (Prediksi Output)**
Tebak apa yang tercetak di console:

```js
Promise.resolve(10)
  .then((angka) => angka * 2)
  .then((angka) => {
    throw new Error("Ada yang salah!");
  })
  .then((angka) => console.log("Hasil:", angka))
  .catch((error) => console.log("Ditangkap:", error.message));
```

Jelaskan juga kenapa `.then()` yang berisi `console.log("Hasil:", angka)` tidak pernah jalan.

---

## Bagian 4 — Async/Await

**4.1 (Konsep)**
Betul atau salah, dan jelaskan alasannya:

- a. `await` bisa dipakai di luar fungsi `async`.
- b. Fungsi `async` selalu mengembalikan Promise, walaupun di dalamnya tidak ada `return new Promise()`.
- c. `await` memblokir seluruh thread JavaScript, sehingga bagian lain dari program tidak bisa jalan sama sekali selama menunggu.

**4.2 (Implementasi)**
Tulis ulang chain Promise dari soal 3.3 (`ambilDataSiswa` → `ambilNilaiSiswa` → `hitungRataRata`) menjadi versi `async/await` dengan `try/catch`.

**4.3 (Debug)**
Kode berikut error saat dijalankan. Temukan kesalahannya dan perbaiki:

```js
function prosesSiswa() {
  const siswa = await ambilDataSiswa(1);
  console.log(siswa);
}
prosesSiswa();
```

---

## Bagian 5 — Error Handling pada Async

**5.1 (Implementasi)**
Buat fungsi async `ambilDanProses()` yang memanggil `ambilDataSiswa(-1)` (sengaja invalid supaya reject). Tangani errornya dengan `try/catch`, dan tambahkan `finally` yang mencetak `"Selesai diproses"` — pastikan `finally` tetap jalan walau errornya terjadi.

**5.2 (Analisis Bug)**
Kode berikut punya bug klasik yang disebutkan di materi ("diam-diam gagal"). Temukan bug-nya dan jelaskan dampaknya ke user:

```js
async function ambilData() {
  const response = await fetch("https://api-contoh.com/data");
  const data = response.json();
  tampilkanData(data);
}
ambilData();
```

_(Petunjuk: ada 2 bug berbeda — satu soal `await`, satu soal try/catch)_

**5.3 (Konsep)**
Jelaskan kenapa `fetch()` **tidak** otomatis melempar error (reject) ketika server merespons dengan status 404 atau 500. Lalu, bagaimana cara yang benar untuk mendeteksi kondisi tersebut?

---

## Bagian 6 — Praktik Fetch API Sungguhan 🚀

Untuk bagian ini, gunakan API publik gratis dan tanpa API key: **JSONPlaceholder** (`https://jsonplaceholder.typicode.com`). Jalankan kodenya beneran di browser console, Node.js (versi 18+), atau di editor online seperti CodeSandbox/JSFiddle.

**6.1 (Fetch Dasar)**
Buat fungsi async `ambilSemuaUser()` yang melakukan `fetch` ke:

```
https://jsonplaceholder.typicode.com/users
```

Cetak jumlah user yang didapat dan nama-nama mereka saja (bukan seluruh object).

**6.2 (Fetch dengan Parameter)**
Buat fungsi async `ambilUserById(id)` yang fetch ke:

```
https://jsonplaceholder.typicode.com/users/{id}
```

Cetak `nama`, `email`, dan `nama kota` (ada di `address.city`) dari user tersebut.

**6.3 (Wajib pakai response.ok)**
Modifikasi `ambilUserById(id)` di atas supaya:

- Cek `response.ok` secara eksplisit
- Kalau status di luar 200-299, `throw new Error` dengan pesan yang menyertakan `response.status`
- Tangani error tersebut dengan `try/catch`, tampilkan pesan yang ramah untuk user (bukan cuma technical error)

Uji dengan `id` yang valid (misal `1`) dan `id` yang tidak ada (misal `9999`) — perhatikan bedanya.

**6.4 (Chaining Beberapa Request — Real World Case)**
Ini simulasi kasus nyata seperti di materi (`user → order → payment → shipping`), tapi pakai data sungguhan:

Buat fungsi async `ambilPostDanKomentar(userId)` yang:

1. Fetch data user dari `/users/{userId}`
2. Fetch semua post milik user itu dari `/posts?userId={userId}`
3. Ambil post **pertama** dari hasil langkah 2, lalu fetch komentar-komentarnya dari `/posts/{postId}/comments`
4. Cetak hasil akhir dalam format:
   ```
   User: <nama>
   Judul Post: <judul>
   Jumlah Komentar: <jumlah>
   ```

Gunakan `async/await`, dan bungkus semuanya dalam satu `try/catch` dengan `finally` yang mencetak `"Request selesai"`.

**6.5 (Loading State — UX)**
Materi menyebut pentingnya kasih feedback ke user, bukan cuma `console.log`. Tulis ulang fungsi 6.4 dengan menambahkan simulasi:

- `tampilkanLoading()` sebelum request dimulai (boleh cuma `console.log("Loading...")`)
- `sembunyikanLoading()` yang **pasti** jalan baik sukses maupun gagal
- Kalau gagal, panggil `tampilkanError(pesan)` bukan langsung `console.log(error)` mentah

**6.6 (Tantangan — POST Request)**
JSONPlaceholder juga mendukung simulasi POST. Buat fungsi async `buatPostBaru(judul, isi, userId)` yang mengirim data baru ke:

```
https://jsonplaceholder.typicode.com/posts
```

dengan method `POST`, header `Content-Type: application/json`, dan body berisi `{ title: judul, body: isi, userId: userId }` (di-`JSON.stringify`). Cetak response dari server (server akan membalas dengan data yang kamu kirim plus `id` baru).

**6.7 (Tantangan Final — Gabungan Semua Konsep)**
Buat satu fungsi async `dashboardUser(userId)` yang menggabungkan semua yang sudah dipelajari:

- Fetch data user, post-post nya, dan albumnya (`/albums?userId={id}`) secara **paralel** (petunjuk: cari tahu tentang `Promise.all`)
- Validasi tiap response dengan `response.ok`
- Tangani error dengan baik (try/catch/finally + pesan ramah)
- Cetak ringkasan: nama user, jumlah post, jumlah album

_(Soal ini sengaja memaksa kamu mencari sendiri tentang `Promise.all` — konsep ini belum ada di materi kamu, tapi wajar dipakai kalau butuh beberapa request paralel yang tidak saling bergantung)_

---

## Cara Pakai Soal Ini

- Kerjakan berurutan dari Bagian 1 sampai 6.
- Bagian 1–5 bisa dikerjakan tanpa koneksi internet (pakai `setTimeout` simulasi seperti di materi).
- Bagian 6 **wajib** dijalankan beneran (butuh koneksi internet) supaya kamu merasakan behavior asli fetch API — termasuk delay jaringan sungguhan dan error sungguhan.
- Kalau stuck di satu soal, cek lagi bagian materi yang relevan sebelum lanjut.

Kalau kamu mau, kirim jawabanmu ke saya dan saya bisa review satu-satu.
