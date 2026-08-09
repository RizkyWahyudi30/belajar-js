const listUser = document.getElementById("list-user");

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
        btnDetail.textContent = "Tutup Detail";
      }
    });

    listUser.append(li);
  });
}

// function untuk menampilkan semua data user ketika halaman
// baru terbuka
async function dataUser() {
  console.log("Mulai request...");

  try {
    const resUser = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!resUser.ok) {
      throw new Error(`http error! status code ${resUser.status}`);
    }

    const dataUser = await resUser.json();
    console.log(dataUser);

    tampilkanData(dataUser);
  } catch (err) {
    console.log(err.message);
  } finally {
    console.log("Request selesai!");
  }
}

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
      const liPost = buatElementPost(posts);
      ulPost.append(liPost);
    });

    // Pasang callback: "kalau ada post baru terbuat, tolong tempel ke ulPost"
    const formBox = formPost(userId, (postTerbuat) => {
      const liPostBaru = buatElementPost(postTerbuat);
      ulPost.prepend(liPostBaru);
    });

    container.append(formBox, ulPost);
  } catch (err) {
    container.innerHTML = `${err.message}`;
  }
}

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

dataUser();

function buatElementPost(posts) {
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
      btnComment.innerHTML = "Lihat Komentar";
    } else {
      btnComment.innerHTML = "Loading...";
      await commentPostUser(posts.id, commentContainer);
      btnComment.innerHTML = "Tutup detail";
    }
  });

  return liPost;
}

function formPost(userId, ulPost) {
  const formBox = document.createElement("div");

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

  const form = formBox.querySelector(".form-tambah-post");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const inputTitle = form.querySelector(".input-title");
    const inputBody = form.querySelector(".input-body");
    const buttonPost = form.querySelector(".btn-submit-post");

    const newDataPost = {
      title: inputTitle.value,
      body: inputBody.value,
      userId: userId,
    };

    try {
      buttonPost.textContent = "Sending...";
      buttonPost.disabled = true;

      const resTambahPost = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDataPost),
        },
      );

      if (!resTambahPost.ok) throw new Error("Gagal menambah post");

      const postBaru = await resTambahPost.json();

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
