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

2.
