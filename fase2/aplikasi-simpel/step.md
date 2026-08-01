Step by Step pembuatan aplikasi nya

1. Pertama kalian harus buat struktur HTML dasar nya dulu di HTML, seperti dibawah ini:

```html
<h2>Input data</h2>

<form action="">
  <div class="field">
    <label for="" id="label-name">Name: </label>
    <input type="text" id="input-name" />
  </div>

  <div class="field">
    <label for="" id="label-username">Username: </label>
    <input type="text" id="input-username" />
  </div>

  <div class="field">
    <label for="" id="label-email">Email: </label>
    <input type="email" id="input-email" />
  </div>

  <div class="field">
    <label for="" id="label-handphone">No. Handphone: </label>
    <input type="text" id="input-handphone" />
  </div>

  <div class="field">
    <label for="" id="label-password">Password: </label>
    <input type="password" id="input-password" />
  </div>

  <button id="kirim-data">Tambahkan user</button>
</form>

<hr />

<h4>Hasil Data</h4>

<ul id="hasil-data"></ul>

<script src="script.js"></script>
```

Dan juga kalian harus buat script dasar di file `script.js` nya seperti dibawah ini:

```js
const inputName = document.getElementById("input-name"); // field
const inputUsername = document.getElementById("input-username"); // field
const inputEmail = document.getElementById("input-email"); // field
const inputHandphone = document.getElementById("input-handphone"); // field
const inputPassword = document.getElementById("input-password"); // field
const btnKirimData = document.getElementById("kirim-data"); // btn tambah
const hasilData = document.getElementById("hasil-data"); // html preview

let allDataUser = [];

function tampilkanHasilData(arrDataUser) {
  hasilData.textContent = "";

  arrDataUser.forEach((dataUser) => {
    const li = document.createElement("li");

    li.innerHTML = `
            <div>
                <p>Name: ${dataUser.name}</p>
                <p>Usn: ${dataUser.username}</p>
                <p>Email: ${dataUser.email}</p>
                <p>Handphone: ${dataUser.handphone}</p>
                <p>Pass: ${dataUser.password}</p>
                <p>OTP</p>
            </div>

            <div>
                <button>Edit Data</button>
                <button>Hapus</button>
                <button>Minta Kode OTP</button>
            </div>
        `;

    hasilData.append(li);
  });
}

function tambahkanDataUserBaru(name, usn, email, handphone, pass) {
  return {
    id: Date.now(),
    name: name,
    username: usn,
    email: email,
    handphone: handphone,
    password: pass,
  };
}

function resetForm() {
  inputName.value = "";
  inputUsername.value = "";
  inputEmail.value = "";
  inputHandphone.value = "";
  inputPassword.value = "";
}

btnKirimData.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    !inputName.value.trim() ||
    !inputUsername.value.trim() ||
    !inputEmail.value.trim() ||
    !inputHandphone.value.trim() ||
    !inputPassword.value.trim()
  ) {
    alert("Harap field diisikan semua nya");
    return;
  }

  const tambahUser = tambahkanDataUserBaru(
    inputName.value,
    inputUsername.value,
    inputEmail.value,
    inputHandphone.value,
    inputPassword.value,
  );

  allDataUser.push(tambahUser);

  tampilkanHasilData(allDataUser);
  resetForm();

  console.log(allDataUser);
});
```

Setelah ini kalian bisa mencoba, aplikasi sederhana html dengan dasar JS DOM dan clean code javascript

2. Selanjutnya akan kita fungsikan button Edit dan Hapus terlebih dahulu, buat kode javascript dibawah ini:

Buat satu variable sebagai penampung id user yang akan dijadikan acuan untuk mode edit maupun hapus:

```js
// taruh diatas [cek file script.js aja]
let idEditUser = null;
```

```js
// Pada bagian function tampilkanHasilData() tambahkan baris kode dibawah dan ubah beberapa kode nya

    const modeEdit = dataUser.id === idEditUser; // tambahkan kode ini

    // kode di dalam nya diubah menjadi seperti ini
    <button class="btn-edit" data-id="${dataUser.id}">${modeEdit ? "Batal Edit" : "Edit"}</button>
    <button class="btn-hapus" data-id="${dataUser.id}" ${modeEdit ? "disabled" : ""}>Hapus</button>
    <button class="btn-otp" data-id="${dataUser.id}" ${modeEdit ? "disabled" : ""}>Minta Kode OTP</button>

```

Lalu buat function baru: `editDataUser()` dan `hapusDataUser()`

```js
function editDataUser(id) {
  if (idEditUser === id) {
    resetForm();
  } else {
    idEditUser = id;
    const user = allDataUser.find((user) => user.id === id);
    if (!user) return;

    btnKirimData.textContent = "Edit data user";
    inputName.value = user.name;
    inputUsername.value = user.username;
    inputEmail.value = user.email;
    inputHandphone.value = user.handphone;
    inputPassword.value = user.password;
  }

  tampilkanHasilData(allDataUser);
}

function hapusDataUser(id) {
  const confirmDelete = confirm("Apakah anda yakin ingin menghapus user ini?");

  if (confirmDelete) {
    allDataUser = allDataUser.filter((user) => user.id !== id);

    if (idEditUser === id) {
      resetForm();
    }
  }

  tampilkanHasilData(allDataUser);
}
```

Jika sudah, lanjut dibagian function `resetForm()` tambahkan baris dibawah ini di dalamnya:

```js
btnKirimData.textContent = "Tambahkan user";
```

Lanjut ubah di `btnKirimData` menjadi seperti dibawah ini kode nya:

```js
btnKirimData.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    !inputName.value.trim() ||
    !inputUsername.value.trim() ||
    !inputEmail.value.trim() ||
    !inputHandphone.value.trim() ||
    !inputPassword.value.trim()
  ) {
    alert("Harap field diisikan semua nya");
    return;
  }

  // ubah dibaris ini, menjadi seperti ini
  if (idEditUser !== null) {
    // MODE EDIT:
    const user = allDataUser.find((user) => user.id === idEditUser);

    user.name = inputName.value;
    user.username = inputUsername.value;
    user.email = inputEmail.value;
    user.handphone = inputHandphone.value;
    user.password = inputPassword.value;

    idEditUser = null;
  } else {
    // MODE TAMBAH:
    const tambahUser = tambahkanDataUserBaru(
      inputName.value,
      inputUsername.value,
      inputEmail.value,
      inputHandphone.value,
      inputPassword.value,
    );

    allDataUser.push(tambahUser);
  }

  tampilkanHasilData(allDataUser);
  resetForm();

  console.log(allDataUser);
});
```

Lalu dipaling bawah, buat kode seperti ini agar dapat memfungsikan button di dalam elemen li :

```js
hasilData.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);

  if (e.target.classList.contains("btn-edit")) {
    editDataUser(id);
  }
  if (e.target.classList.contains("btn-hapus")) {
    hapusDataUser(id);
  }
});
```

Jika sudah ubah kode step 1 menjadi step 2, seharusnya kode nya sudah berjalan, dapat tambah, edit dan hapus
