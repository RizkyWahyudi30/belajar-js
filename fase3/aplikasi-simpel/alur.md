## Alur Aplikasi Sederhana:

Menggunakan API JSONPlaceholder

alur aplikasi yang diinginkan:
![Logo](img/alur-sederhana-aplikasi.excalidraw.png)

Bedah baris kode!

1. Pertama, buat struktur simpel di html javascript
   di html buat seperti ini

```html
<ul id="list-user"></ul>

<script src="script.js"></script>
```

lalu setelah itu di javascript buat seperti ini:

```js
// guna nya untuk menghubungkan elemen di html dengan javascript nya
const listUser = document.getElementById("list-user");
```

2. Buat fungsi utama, untuk fetch user via API
   buat function `dataUser()` untuk fetch API user

```js
async function dataUser() {
  console.log("Mulai request...");

  try {
    const resUser = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!resUser.ok) {
      throw new Error(`http error! status code ${resUser.status}`);
    }

    const dataUser = await resUser.json();
    console.log(dataUser);

    // ini nanti ada di tahapan ketiga, buat function untuk menampilkan data nya ke HTML
    tampilkanData(dataUser);
  } catch (err) {
    console.log(err.message);
  } finally {
    console.log("Request selesai!");
  }
}
```

Penjelasannya:

- `async/await`: menunggu data HTTP GET Request tanpa memberhentikan browser (bergerak dibelakang)
- `fetch(...)`: meminta data user via API
- `if(!resUser.ok)`: mengecek jika status HTTP bukan 200 - 299 (misal: 404 / 500)
- `resUser.json()`: mengubah data respon JSON menjadi Array object javascript
- `tampilkanData(dataUser)`: melempar data array ke fungsi render HTML

3. Buat fungsi untuk menampilkan data ke HTML
   fungsi ini menerima parameter array

```js
function tampilkanData(arrData) {
  listUser.textContent = "";

  arrData.forEach((user) => {
    const li = document.createElement("li");

    li.innerHTML = `
            <p>Name: ${user.name}</p>
            <p>Usn: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>Address: ${user.address.city}, ${user.address.suite}, ${user.address.street}</p>
            <p>Phone: ${user.phone}</p> 
            <button class="btn-detail" data-id="${user.id}">Lihat Detail</button>

            <!-- sebagai wadah post masing user  -->
            <div class="post-container"></div>
        `;

    const btnDetail = li.querySelector(".btn-detail");
    const postContainer = li.querySelector(".post-container");

    // event click untuk toggle detail
    btnDetail.addEventListener("click", async () => {
      // jika post-container sudah ada isinya/ lagi terbuka
      if (postContainer.innerHTML !== "") {
        postContainer.innerHTML = ""; // kosongkan/sembunyikan
        btnDetail.textContent = "Lihat Detail";
      } else {
        // lagi tertutup / tidak ada isi di dalam post-container
        btnDetail.textContent = "Loading Post...";
        await postUser(user.id, postContainer);
        btnDetail.textContent = "Tututp Detail";
      }
    });
    /**
     *
     * Inti nya kode diatas ini dipahami nya seperti ini:
     * Tombol ini digunakan untuk mengubah aksi user di kondisi selanjutnya, bukan di kondisi saat ini
     *
     * Jadi:
     * Saat layar TERTUTUP --> Tombol tulisannya "Lihat Detail" (Menunggu diklik untuk Buka).
     * Saat layar TERBUKA --> Tombol tulisannya "Tutup Detail" (Menunggu diklik untuk Tutup).
     *
     */

    listUser.append(li);
  });
}
```

Penjelasan:

- `listUser.textContext = ""`: berguna untuk mengosongkan data, agar jika ada data baru tidak terjadi duplikasi
- `arrData.forEach((user) => ...)`: untuk melakukan pengulangan tiap tiap data user yang ada
- `<div class="post-container"></div>`: didalam `li.innerHTML` kode ini berfungsi sebagai penampung dari data Posts user nanti
- `btnDetail.addEventListener("click", ...)`:
  - Teks pada tombol selalu menunjukkan AKSI SANG PENGGUNA SELANJUTNYA, bukan kondisi saat ini.
  - Saat layar TERTUTUP -> Tombol tulisannya "Lihat Detail" (Menunggu diklik untuk Buka).
  - Saat layar TERBUKA -> Tombol tulisannya "Tutup Detail" (Menunggu diklik untuk Tutup).
- `await postUser(user.id, postContainer);`: kode ini untuk memanggil data post dengan id user yang sesuai, lalu postContainer ini sebagai template HTML post nya

4. Buat fungsi untuk mengambil data Post user

```js
// function untuk mengambil data data post dari masing masing user
async function postUser(userId, container) {
  try {
    const resPost = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    );
    if (!resPost.ok) throw new Error(`gagal memuat Post`);
    const dataPosts = await resPost.json();

    const ulPost = document.createElement("ul");

    dataPosts.forEach((posts) => {
      const liPost = document.createElement("li");

      liPost.innerHTML = `
        <h4>Title: ${posts.title}</h4>
        <p>Body: ${posts.body}</p>
        <button class="btn-comment">Lihat komentar</button>

        <div class="comment-container"></div>
      `;

      const btnComment = liPost.querySelector(".btn-comment");
      const commentContainer = liPost.querySelector(".comment-container");

      btnComment.addEventListener("click", async () => {
        if (commentContainer.innerHTML !== "") {
          commentContainer.innerHTML = "";
          btnComment.textContent = "Lihat komentar";
        } else {
          btnComment.textContent = "Loading...";
          await commentPostUser(posts.id, commentContainer);
          btnComment.textContent = "Tutup komentar";
        }
      });

      ulPost.append(liPost);
    });

    container.append(ulPost);
  } catch (err) {
    container.innerHTML = `${err.message}`;
  }
}
```

Penjelasan:

- fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`): untuk mengambil data post berdasarkan id user yang dikirim
- `container.append(ulPost);`: untuk mengirimkan data HTML yang sudah terisi ke parameter container yang di step sebelum nya berisi template untuk data post

5. Buat fungsi untuk mengambil data comment

```js
// function untuk mengambil data ata comment dari masing masing
// post an user
async function commentPostUser(postId, container) {
  try {
    const resComment = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
    );
    if (!resComment.ok) throw new Error("gagal memuat");
    const dataComment = await resComment.json();

    const ulComment = document.createElement("ul");

    dataComment.forEach((comments) => {
      const liComment = document.createElement("li");

      liComment.innerHTML = `
        <p>Name: ${comments.name}</p>
        <p>Email: ${comments.email}</p>
        <p>Body: ${comments.body}</p>
      `;

      ulComment.append(liComment);
    });

    container.append(ulComment);
  } catch (err) {
    container.innerHTML = `${err.message}`;
  }
}
```

Penjelasan:

- fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`,): `/${postId}/` bagian postId didapatkan dari parameter postId, data nya di dapat dari function yang menggunakannya sebagai wadah.
  Pada step 4, baris bagian ini: `await commentPostUser(posts.id, commentContainer);` ini mengirimkan data post.Id ke function commentPostUser

6. Selanjut nya membuat fitur penambahan post (tidak disimpan di storage), berikut script nya:
   Buat 2 function utama:

```js
// function untuk membuat template html posts
function buatElementPost(posts) {}

// function untuk membuat inputan post dan menerima data input yang akan dikirimkan ke template html post
function formPost(userId, ulPost) {}
```

Lalu selanjut

- Pada `function buatElementPost()` buat menjadi seperti ini :

```js
function buatElementPost(posts) {
  // buat element list
  const liPost = document.createElement("li");

  // template html untuk post
  liPost.innerHTML = `
    <h4>Title: ${posts.title}</h4>
    <p>Body: ${posts.body}</p>
    <button class="btn-comment">Lihat komentar</button>

    <div class="comment-container"></div>
  `;

  // mengambil data commanr
  const btnComment = liPost.querySelector(".btn-comment");
  // membuat penampung comment
  const commentContainer = liPost.querySelector(".comment-container");

  btnComment.addEventListener("click", async () => {
    if (commentContainer.innerHTML !== "") {
      commentContainer.innerHTML = "";
      btnComment.innerHTML = "Lihat Komentar";
    } else {
      btnComment.innerHTML = "Loading...";
      await commentPostUser(posts.id, commentContainer);
      btnComment.innerHTML = "Tutup detail";
    }
  });

  return liPost;
}
```

- Pada `function formPost(userId, ulPost)` buat menjadi seperti ini :

```js
function formPost(userId, ulPost) {
  const formBox = document.createElement("div");

  // membuat html untuk inputan data nya
  formBox.innerHTML = `
    <h3>Tambahkan Post Baru</h3>
    <form class="form-tambah-post">
      <div>
        <label for="input-title">Title: </label>
        <input type="text" class="input-title" id="input-title" placeholder="Post Title">
      </div>
      <div>
        <label for="input-body">Body: </label>
        <input type="text" class="input-body" id="input-body" placeholder="Post Body">
      </div>
      <button type="submit" class="btn-submit-post">Tambah Post</button>
    </form>
  `;

  // mengambil id elemen form di html nya
  const form = formBox.querySelector(".form-tambah-post");

  // trigger form kalau ketika submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // untuk mengambil data input di dalam form
    const inputTitle = form.querySelector(".input-title");
    const inputBody = form.querySelector(".input-body");

    // button untuk mengirimkan data nya
    const buttonPost = form.querySelector(".btn-submit-post");

    // membuat data object nya
    const newDataPost = {
      title: inputTitle.value,
      body: inputBody.value,
      userId: userId,
    };

    try {
      buttonPost.textContent = "Sending...";
      // agar user tidak bisa terus terusan mengklik ketika sedang mengirimkan data
      buttonPost.disabled = true;

      // API untuk dengan method POST data
      const resTambahPost = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // ubah dari array object ke string biasa agar bisa dibaca
          body: JSON.stringify(newDataPost),
        },
      );

      if (!resTambahPost.ok) throw new Error("Gagal menambah post");

      // ubah lagi data nya menjadi ke bentuk array object
      const postBaru = await resTambahPost.json();

      // disclaimer!, beberapa kode diatas akan ada yang diubah
      // ulPost berisi function callback, postBaru merupakan argumen pengisi nya
      ulPost(postBaru);

      // menggunakan method .reset() itu mengosongkan field
      form.reset();
      alert("Post berhasil ditambahkan!");
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      buttonPost.textContent = "Kirim Post";
      buttonPost.disabled = false;
    }
  });

  return formBox;
}
```

Function `formPost` diubah menjadi seperti ini:

```js
async function postUser(userId, container) {
  try {
    const resPost = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    );
    if (!resPost.ok) throw new Error(`gagal memuat Post`);
    const dataPosts = await resPost.json();

    const ulPost = document.createElement("ul");

    // =========== Ubah dibagian sini ================
    dataPosts.forEach((posts) => {
      const liPost = buatElementPost(posts);
      ulPost.append(liPost);
    });

    // Pasang callback: "kalau ada post baru terbuat, tolong tempel ke ulPost"
    const formBox = formPost(userId, (postTerbuat) => {
      const liPostBaru = buatElementPost(postTerbuat);
      ulPost.prepend(liPostBaru);
    });
    // =========== Ubah dibagian sini ================

    container.append(formBox, ulPost);
  } catch (err) {
    container.innerHTML = `${err.message}`;
  }
}
```

Sekian alur aplikasi nya
