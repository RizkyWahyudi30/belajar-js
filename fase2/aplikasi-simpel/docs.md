# Aplikasi Sederhana — User Data & OTP

Aplikasi ini merupakan latihan lanjutan dari Notes App, dengan fokus baru pada **manajemen data user** dan **simulasi kode OTP** yang memiliki batas waktu (time-based token).

---

## 1. Deskripsi Singkat

Aplikasi memungkinkan user menginput data diri melalui form, menampilkan hasil input tersebut secara real-time, serta menyediakan fitur keamanan sederhana berupa kode OTP yang hanya berlaku selama 10 detik.

---

## 2. Alur Aplikasi (Flow)

1. User mengisi field yang tersedia: **Name, Username, Email, No. Handphone, Password**.
2. User menekan tombol submit/tambah data.
3. Data yang diinput akan ditampilkan pada bagian **Hasil Data**, di bawah form input.
4. Password yang ditampilkan pada Hasil Data secara default **disembunyikan** (masking), dan dapat ditampilkan lewat tombol **Tampil Pass**.
5. User dapat meminta **kode OTP** melalui tombol **Minta Kode OTP**.
6. Kode OTP akan tampil beserta **hitung mundur (countdown) dalam detik**, dan otomatis hilang/kadaluarsa setelah 10 detik.
7. User dapat **mengedit** atau **menghapus** data yang sudah tersimpan melalui tombol yang tersedia di bagian Hasil Data.

---

## 3. Struktur Data (Data Model)

Setiap data user disimpan dalam bentuk object dengan struktur sebagai berikut:

| Field               | Tipe           | Keterangan                                     |
| ------------------- | -------------- | ---------------------------------------------- |
| `id`                | number         | Identifier unik, bisa menggunakan `Date.now()` |
| `name`              | string         | Nama lengkap user                              |
| `username`          | string         | Username user                                  |
| `email`             | string         | Email user                                     |
| `noHp`              | string         | Nomor handphone user                           |
| `password`          | string         | Password user                                  |
| `isPasswordVisible` | boolean        | Status tampil/sembunyi password                |
| `otpCode`           | string \| null | Kode OTP aktif milik user ini                  |
| `otpExpiredAt`      | number \| null | Timestamp kapan OTP kadaluarsa                 |

> Catatan: Karena aplikasi mendukung **lebih dari satu user**, seluruh data (termasuk OTP) harus disimpan per-user di dalam array, bukan variabel tunggal global.

---

## 4. Fitur Utama

### 4.1 Input & Tampilkan Data

- Validasi seluruh field wajib diisi sebelum data bisa disubmit.
- Data langsung tampil di bagian **Hasil Data** setelah disubmit.

### 4.2 Hide / Unhide Password

- Password ditampilkan default dalam bentuk tersamar, misal: `••••••`.
- Tombol **Tampil Pass** berfungsi sebagai toggle (tampil ↔ sembunyi), mirip logika toggle `isDone` pada Notes App sebelumnya.

### 4.3 Edit Data

- Tombol **Edit Data** akan memuat ulang data ke dalam form input agar bisa diubah.
- Setelah disimpan, data lama pada array akan digantikan dengan data baru (bukan menambah entri baru).

### 4.4 Hapus Data

- Tombol **Hapus Data** menghapus entri user dari array.
- Disarankan menambahkan konfirmasi (`confirm()`) sebelum data benar-benar dihapus, seperti pada Notes App.

### 4.5 Kode OTP (Fitur Utama Baru)

- Tombol **Minta Kode OTP** akan men-generate kode acak (misal 6 digit).
- Kode OTP **hanya berlaku 10 detik**, dihitung sejak tombol ditekan.
- Selama kode aktif, tampilkan **countdown mundur** (contoh: `Kode: 482913 (9 detik)` → `... (8 detik)` → dst).
- Setelah 10 detik, kode otomatis dianggap kadaluarsa dan tidak dapat digunakan/ditampilkan lagi.
- **Kode OTP antar-user tidak boleh sama** dalam satu waktu aktif — perlu pengecekan saat generate, apakah kode yang baru dibuat sudah dipakai user lain yang OTP-nya masih aktif.

---

## 5. Fungsi-fungsi yang Perlu Dibuat

Berikut daftar fungsi (belum berupa kode, hanya kerangka logika) yang perlu disiapkan:

| Fungsi                   | Tugas                                                                            |
| ------------------------ | -------------------------------------------------------------------------------- |
| `tambahUserBaru()`       | Membuat object data user baru dari input form                                    |
| `tampilkanData()`        | Merender ulang seluruh data user ke tampilan Hasil Data                          |
| `togglePassword(id)`     | Mengubah status `isPasswordVisible` milik user tertentu                          |
| `editData(id)`           | Memuat data user ke form untuk mode edit                                         |
| `hapusData(id)`          | Menghapus data user dari array, dengan konfirmasi                                |
| `generateOtp(id)`        | Membuat kode OTP unik untuk user tertentu, menyimpan waktu expired               |
| `cekOtpUnik(kode)`       | Memastikan kode yang digenerate belum dipakai user lain yang OTP-nya masih aktif |
| `mulaiCountdownOtp(id)`  | Menjalankan `setInterval` untuk hitung mundur, memperbarui tampilan tiap detik   |
| `hapusOtpKadaluarsa(id)` | Mengosongkan `otpCode` dan menghentikan interval saat waktu habis                |
| `resetForm()`            | Mengosongkan form setelah submit atau batal edit                                 |

---

## 6. Hal yang Perlu Diperhatikan (Edge Case)

- Pastikan setiap user punya `setInterval` OTP masing-masing, dan interval tersebut dihentikan (`clearInterval`) saat:
  - waktu sudah habis (10 detik), atau
  - data user dihapus/di-edit sebelum OTP habis.
- Saat generate OTP baru untuk user yang sama, pastikan interval/OTP lama dibersihkan dulu agar tidak tumpang tindih.
- Validasi keunikan OTP hanya perlu dibandingkan dengan OTP milik user **lain yang masih aktif** (OTP yang sudah kadaluarsa tidak perlu dihitung).
- Saat mode edit aktif, sebaiknya tombol OTP/Hapus pada entri tersebut dinonaktifkan sementara (mengikuti pola `disabled` yang sudah kamu terapkan di Notes App).
- Pertimbangkan apakah data disimpan di `localStorage` (persist antar refresh) atau cukup di memori (`array` biasa) — mengingat OTP sifatnya sementara, sedangkan data user (name, email, dst) biasanya perlu persist.

---

## 7. Referensi Desain

Struktur tampilan mengikuti wireframe berikut:

- **Bagian atas**: Form input data (Name, Username, Email, No. Handphone, Password).
- **Bagian bawah**: Hasil Data + tombol aksi (Tampil Pass, Edit Data, Hapus Data, Minta Kode OTP).
- **Catatan aturan OTP** ditampilkan sebagai keterangan di bawah tombol aksi.
