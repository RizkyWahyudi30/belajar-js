/** LATIHAN SOAL: CALLBACK -> PROMISE -> ASYNC/AWAIT -> FETCH API */

// Bagian 1
// 1.1 (Konsep)
/* 
Jawaban:
Async atau metode non-blocking dibutuhkan oleh javascript karena 
javascript itu menjalankan dari atas ke bawah secara satu persatu.

Masalahnya, jika di pertengahan code terdapat barisan kode yang delay
maka bagian bawah nya tidak akan dijalani sebelum selesai.

*/

// 1.2 (Prediksi Output)
/*
Jawaban:
dijalankan "A" -> "C" -> "B"

*/

// 1.3 (Prediksi Output -- sedikit lebih sulit)
/*
Jawaban:
urutannya "1" -> "2" -> "3" // SALAH
Karena waktu setTimeOut di bagian milidetik nya di set 0 // SALAH

urutannya: "1" -> "3" -> "2"
Meskipun delay 0ms di setTimeOut tetap dimasukkan ke dalam queue terpisah
dan menunggu semua kode synchronous selesai

*/

// 1.4 (analisis)
/*
Jawaban:
-- [aku belum pernah belajar tentang ini, jadi aku tidak tahu]

jawabannya dari claude:
- Membaca file dari disk (misal di Node.js, fs.readFile)
- Query ke database 
- Event dari user, misal klik tombol -- JS engga tahu kapan user bakal 
klik, jadi harus "nunggu" tanpa

*/
