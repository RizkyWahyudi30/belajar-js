const inputName = document.getElementById("input-name"); // field
const inputUsername = document.getElementById("input-username"); // field
const inputEmail = document.getElementById("input-email"); // field
const inputHandphone = document.getElementById("input-handphone"); // field
const inputPassword = document.getElementById("input-password"); // field
const btnKirimData = document.getElementById("kirim-data"); // btn tambah
const hasilData = document.getElementById("hasil-data"); // html preview

let allDataUser = [];
let idEditUser = null;

function tampilkanHasilData(arrDataUser) {
  hasilData.textContent = "";

  arrDataUser.forEach((dataUser) => {
    const li = document.createElement("li");
    const modeEdit = dataUser.id === idEditUser;

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
                <button class="btn-edit" data-id="${dataUser.id}">${modeEdit ? "Batal Edit" : "Edit"}</button>
                <button class="btn-hapus" data-id="${dataUser.id}" ${modeEdit ? "disabled" : ""}>Hapus</button>
                <button class="btn-otp" data-id="${dataUser.id}" ${modeEdit ? "disabled" : ""}>Minta Kode OTP</button>
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

function resetForm() {
  idEditUser = null;
  inputName.value = "";
  inputUsername.value = "";
  inputEmail.value = "";
  inputHandphone.value = "";
  inputPassword.value = "";
  btnKirimData.textContent = "Tambahkan user";
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

hasilData.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);

  if (e.target.classList.contains("btn-edit")) {
    editDataUser(id);
  }
  if (e.target.classList.contains("btn-hapus")) {
    hapusDataUser(id);
  }
});
