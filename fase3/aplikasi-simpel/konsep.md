# Skenario Project: User Explorer & Post Dashboard

Project latihan mandiri untuk memperdalam konsep **Callback → Promise → Async/Await → Fetch API**, dibangun dengan vanilla JavaScript dan API publik [JSONPlaceholder](https://jsonplaceholder.typicode.com) (gratis, tanpa API key).

---

## 1. Konsep Aplikasi

Aplikasi web sederhana yang memungkinkan pengguna:

- Melihat daftar user
- Melihat detail user beserta post, komentar, dan albumnya
- Membuat post baru

Setiap fitur sengaja dirancang untuk melatih satu konsep spesifik dari materi async JavaScript.

---

## 2. Fitur & Pemetaan ke Konsep

### 2.1 Daftar User (List View)

- Fetch semua user saat halaman dibuka (`GET /users`)
- Tampilkan sebagai list/card berisi nama dan kota
- Tampilkan loading spinner saat fetch berlangsung
- Tampilkan pesan error yang ramah jika fetch gagal (misalnya koneksi terputus)

**Melatih:** fetch dasar, `response.ok`, loading state / UX

### 2.2 Detail User (Detail View)

Saat user diklik dari daftar:

1. Fetch detail user (`GET /users/{id}`)
2. Fetch semua post milik user (`GET /posts?userId={id}`)
3. Fetch komentar dari post yang dipilih (`GET /posts/{postId}/comments`)

**Melatih:** chaining request bertingkat, `async/await`, `try/catch/finally`

### 2.3 Buat Post Baru

- Form sederhana: input judul dan isi
- Submit → kirim `POST` request ke `/posts`
- Body di-`JSON.stringify`, header `Content-Type: application/json`
- Tampilkan hasil dari server (termasuk `id` baru) sebagai notifikasi sukses

**Melatih:** POST request, penyusunan body request

### 2.4 Dashboard Ringkasan per User

Saat detail user dibuka, sekaligus tampilkan secara paralel:

- Jumlah post
- Jumlah album
- Jumlah komentar dari post pertama

**Melatih:** `Promise.all()` untuk request paralel yang tidak saling bergantung

### 2.5 Fitur Tambahan (Opsional / Lanjutan)

| Fitur                                                      | Tujuan Latihan                                      |
| ---------------------------------------------------------- | --------------------------------------------------- |
| Search box dengan debounce (`setTimeout` + `clearTimeout`) | Jembatan kembali ke konsep callback                 |
| Tombol "Coba lagi" saat fetch gagal                        | Melatih alur `try/catch` dalam konteks interaktif   |
| Loading skeleton per section (bukan satu loading global)   | Melatih pengelolaan banyak state loading independen |

---

## 3. Struktur Teknis

Tidak menggunakan framework — fokus tetap pada konsep async/fetch, bukan belajar tooling baru.

```
project/
├── index.html    → struktur halaman (list, detail, form)
├── style.css     → styling dasar
└── app.js        → seluruh logic fetch & rendering
```

---

## 4. Urutan Pengerjaan yang Disarankan

1. Tampilkan daftar user (statis dulu, tanpa detail)
2. Klik user → tampilkan detail sederhana
3. Tambahkan post & komentar (chaining request)
4. Tambahkan loading state & error handling yang rapi
5. Tambahkan form POST untuk buat post baru
6. Refactor bagian dashboard ringkasan memakai `Promise.all()`

---

## 5. Endpoint API yang Digunakan

| Endpoint                   | Method | Kegunaan                     |
| -------------------------- | ------ | ---------------------------- |
| `/users`                   | GET    | Daftar semua user            |
| `/users/{id}`              | GET    | Detail satu user             |
| `/posts?userId={id}`       | GET    | Semua post milik user        |
| `/posts/{postId}/comments` | GET    | Komentar dari sebuah post    |
| `/albums?userId={id}`      | GET    | Semua album milik user       |
| `/posts`                   | POST   | Membuat post baru (simulasi) |

---

## 6. Catatan

- Semua request harus dibungkus `try/catch`, dengan validasi `response.ok` sebelum parsing `.json()`.
- Pesan error yang ditampilkan ke pengguna harus ramah (bukan pesan teknis mentah seperti `HTTP ERROR: STATUS 404`).
- Gunakan `finally` untuk memastikan loading state selalu berhenti, baik request berhasil maupun gagal.
