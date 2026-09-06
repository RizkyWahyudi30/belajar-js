// Soal Fase 3 dan Fase 4

// Soal 3.5a — Bikin API Service Class dari nol
/**
Bikin class PostService yang berinteraksi dengan https://jsonplaceholder.typicode.com (API publik gratis untuk latihan, 
tidak butuh API key):
• constructor() — simpan baseUrl = "https://jsonplaceholder.typicode.com".
• async ambilSemuaPost() — fetch ke /posts, return semua data (array of object).
• async ambilPostById(id) — fetch ke /posts/${id}, validasi response.ok, lempar error yang jelas kalau gagal.
• async ambilPostByUserId(userId) — fetch ke /posts?userId=${userId}, return hanya post milik user itu.

Test:

const postService = new PostService();

async function main() {
  const posts = await postService.ambilPostByUserId(1);
  console.log(posts.length); // seharusnya beberapa post milik user id 1
}
main();

 */

class PostService {
  constructor() {
    this.baseURL = "https://jsonplaceholder.typicode.com";
  }

  async ambilSemuaPost() {
    const response = await fetch(`${this.baseURL}/posts`);
    if (!response.ok) throw new Error(`HTTP Error! Error: ${response.status}`);

    return await response.json();
  }

  async ambilPostById(id) {
    const response = await fetch(`${this.baseURL}/posts/${id}`);
    if (!response.ok) throw new Error(`HTTP Error! Error: ${response.status}`);

    return await response.json();
  }

  async ambilPostByUserId(userId) {
    const response = await fetch(`${this.baseURL}/posts?userId=${userId}`);
    if (!response.ok) throw new Error(`HTTP Error! Error: ${response.status}`);

    return await response.json();
  }
}

const postService = new PostService();

async function main() {
  const posts = await postService.ambilPostByUserId(1);
  console.log(posts.length); // output 10
}
// main();

// Soal 3.5b — Debug bug this yang hilang
// Kode ini punya bug klasik yang barusan kita bahas. Temukan, jelaskan kenapa, dan perbaiki:

/**
class Notifikasi {
  constructor(namaUser) {
    this.namaUser = namaUser;
    this.riwayat = [];
  }

  async ambilPesanBaru() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await response.json();

    setTimeout(function () {
      this.riwayat.push(data.title);
      console.log(`${this.namaUser} punya pesan baru: ${data.title}`);
    }, 500);
  }
}

const notif = new Notifikasi("Budi");
notif.ambilPesanBaru();

 */

class Notifikasi {
  constructor(namaUser) {
    this.namaUser = namaUser;
    this.riwayat = [];
  }

  async ambilPesanBaru() {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1",
    );
    const data = await response.json();

    setTimeout(() => {
      this.riwayat.push(data.title);
      console.log(`${this.namaUser} punya pesan baru: ${data.title}`);
    }, 500);
  }
}

const notif = new Notifikasi("Budi");
// notif.ambilPesanBaru(); // output: Budi punya pesan baru: sunt aut facere repellat provident occaecati excepturi optio reprehenderit

/**
Masalah yang diperbaiki: terdapat kesalahan penggunaan, yaitu di setTimeOut menggunakan function biasa yang seharusnya menggunakan
arrow function 

 */

// Soal 3.5c — Loading state + error handling lengkap
/**
Bikin class ProdukService yang mengelola state seperti contoh UserRepository di atas (data, isLoading, error), tapi untuk 
fetch produk dari https://jsonplaceholder.typicode.com/posts (anggap saja "posts" ini "produk", untuk latihan). Tambahkan 
juga method reset() yang mengembalikan ketiga property itu ke kondisi awal (null, false, null).

Test:

const produkService = new ProdukService();

async function main() {
  await produkService.ambilSemuaProduk(); // buat method ini sendiri
  console.log(produkService.data.length); // harus ada isinya
  console.log(produkService.error); // harus null (berhasil)

  produkService.reset();
  console.log(produkService.data); // null lagi
}
main();

*/

class ProductService {
  constructor() {
    this.data = null;
    this.isLoading = false;
    this.error = null;
  }

  async ambilUserProdct() {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
      );
      if (!response.ok) throw new Error("Post tidak ditemukan");

      this.data = await response.json();
    } catch (error) {
      this.error = error.message;
      this.data = null;
    } finally {
      this.isLoading = false;
    }
  }

  reset() {
    this.data = null;
    this.isLoading = false;
    this.error = null;
  }
}
const produkService = new ProductService();

async function main() {
  await produkService.ambilUserProdct(); // buat method ini sendiri
  console.log(produkService.data.length); // harus ada isinya
  console.log(produkService.error); // harus null (berhasil)

  produkService.reset();
  console.log(produkService.data); // null lagi
}
main();

// output saya
/**
100
null
null

*/
