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
