/** LATIHAN SOAL: CALLBACK -> PROMISE -> ASYNC/AWAIT -> FETCH API */

// fetch("https://jsonplaceholder.typicode.com/users/10")
//   .then((response) => response.json())
//   .then((json) => console.log(json));

// Bagian 6

// 6.1 fetch dasar
// async function ambilSemuaUser() {
//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/users");

//     if (!response.ok) {
//       throw new Error("API gagal");
//     }

//     const data = await response.json();

//     const jumlahUser = data.length;
//     console.log(jumlahUser);

//     data.forEach((user) => console.log(`User ${user.id}:`, user.name));
//   } catch (err) {
//     console.log("Error:", err.message);
//   }
// }

// ambilSemuaUser();
// 10
// User 1: Leanne Graham
// User 2: Ervin Howell
// User 3: Clementine Bauch
// User 4: Patricia Lebsack
// User 5: Chelsey Dietrich
// User 6: Mrs. Dennis Schulist
// User 7: Kurtis Weissnat
// User 8: Nicholas Runolfsdottir V
// User 9: Glenna Reichert
// User 10: Clementina DuBuque

// 6.2 - 6.3 fetch dengan parameter - response.ok

async function ambilUserById(id) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP ERROR: STATUS ${response.status}`);
    }

    const data = await response.json();

    console.log(
      `Nama: ${data.name} | Email: ${data.email} | Kota: ${data.address.city}`,
    );
  } catch (err) {
    // masih terlalu teknis, agar bisa lebih dibaca oleh user awam
    // maka bisa diubah
    // console.log("Gagal:", err.message);
    if (err.message.includes("404")) {
      console.log("Data user tidak ditemukan!");
    } else {
      console.log("Terjadi kesalahan, silahkan coba lagi");
    }
  }
}

// ambilUserById(11);
// Nama: Ervin Howell | Email: Shanna@melissa.tv | Kota: Wisokyburgh
// Gagal: HTTP ERROR: STATUS 404

// // 6.4 chaining beberapa request
// async function ambilPostDanKomentar(userId) {
//   try {
//     const user = await fetch(
//       `https://jsonplaceholder.typicode.com/users/${userId}`,
//     );
//     if (!user.ok) {
//       throw new Error(`HTTP GAGAL: STATUS ${user.status}`);
//     }
//     const dataUser = await user.json();
//     // console.log(dataUser);

//     const allPost = await fetch(
//       `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
//     );
//     if (!allPost.ok) {
//       throw new Error(`HTTP GAGAL: STATUS ${allPost.status}`);
//     }
//     const dataPost = await allPost.json();
//     // console.log(dataPost);

//     const postId = dataPost[0].id;

//     const comment = await fetch(
//       `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
//     );
//     if (!comment.ok) {
//       throw new Error(`HTTP GAGAL: STATUS ${comment.status}`);
//     }
//     const dataComment = await comment.json();
//     // console.log(dataComment);

//     console.log(`User: ${dataUser.name}`);
//     console.log(`Judul Post: ${dataPost[0].title}`);
//     console.log(`Jumlah Komentar: ${dataComment.length}`);
//   } catch (err) {
//     console.log(err.message);
//   } finally {
//     console.log("Request selesai");
//   }
// }

// ambilPostDanKomentar(1);

// 6.5 Loading State -- UX
function tampilkanLoading() {
  console.log("Loading...");
}
function sembunyikanLoading() {
  console.log("Loading selesai...");
}
function tampilkanError(message) {
  console.log(message);
}

async function ambilPostDanKomentar(userId) {
  tampilkanLoading();

  try {
    // fetch data user
    const user = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
    );
    if (!user.ok) {
      throw new Error(`http error! status code ${user.status}`);
    }

    const dataUser = await user.json();
    // console.log(dataUser);

    // fetch semua post user
    const post = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    );
    if (!post.ok) {
      throw new Error(`http error! status code ${post.status}`);
    }

    const dataPost = await post.json();
    // console.log(dataPost);

    const postPertama = dataPost[0].id;

    // fetch post pertama dan fetch commentar
    const comment = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postPertama}/comments`,
    );
    if (!comment.ok) {
      throw new Error(`http error! status code ${comment.status}`);
    }

    const dataComment = await comment.json();
    // console.log(dataComment);

    console.log(`User: ${dataUser.name}`);
    console.log(`Judul Post: ${dataPost[0].title}`);
    console.log(`Jumlah komentar: ${dataComment.length}`);
  } catch (err) {
    tampilkanError(err.message);
  } finally {
    sembunyikanLoading();
    console.log("Request selesai");
  }
}

// ambilPostDanKomentar(3);
// Loading...
// User: Clementine Bauch
// Judul Post: fugit labore quia mollitia quas deserunt nostrum sunt
// Jumlah komentar: 5
// Loading selesai...
// Rquest selesai

// 6.6 POST request
async function buatPostBaru(userId, title, body) {
  tampilkanLoading();

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        title: title,
        body: body,
      }),
    });
    if (!response.ok) {
      throw new Error(`http error! status code ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (err) {
    tampilkanError(err.message);
  } finally {
    sembunyikanLoading();
    console.log("Request selesai");
  }
}

// buatPostBaru(10, "Hello world", "Hello world all....");
// Loading...
// {
//   userId: 10,
//   title: 'Hello world',
//   body: 'Hello world all....',
//   id: 101
// }
// Loading selesai...
// Request selesai

// 6.7 Promise.all()
async function dashboardUser(userId) {
  tampilkanLoading();

  try {
    // fetch user, post dan album nya
    const [resUser, resPost, resAlbum] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`),
      fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`),
    ]);

    if (!resUser.ok || !resPost.ok || !resAlbum.ok) {
      throw new Error(
        `Gagal mengambil data user atau data post ataupun data album`,
      );
    }

    // perse json secara bersamaan
    const [dataUser, dataPost, dataAlbum] = await Promise.all([
      resUser.json(),
      resPost.json(),
      resAlbum.json(),
    ]);

    console.log(`Nama user: ${dataUser.name}`);
    console.log(`Jumlah post: ${dataPost.length}`);
    console.log(`Jumlah album: ${dataAlbum.length}`);
  } catch (err) {
    tampilkanError(err.message);
  } finally {
    sembunyikanLoading();
    console.log("Request selesai");
  }
}

// dashboardUser(1);
// Loading...
// Nama user: Leanne Graham
// Jumlah post: 10
// Jumlah album: 10
// Loading selesai...
// Request selesai
