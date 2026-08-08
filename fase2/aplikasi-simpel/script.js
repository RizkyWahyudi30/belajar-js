const inputName = document.getElementById("input-name"); // field
const inputUsername = document.getElementById("input-username"); // field
const inputEmail = document.getElementById("input-email"); // field
const inputHandphone = document.getElementById("input-handphone"); // field
const inputPassword = document.getElementById("input-password"); // field
const btnKirimData = document.getElementById("kirim-data"); // btn tambah
const hasilData = document.getElementById("hasil-data"); // html preview

// inisialisasi key untuk localstorage
const STORAGE_KEY = "data-user";

let allDataUser = getDataUser();
let idEditUser = null;
let showPasswords = [];

// function untuk mengirimkan data ke localstorage dan parsing array object ke string
function saveToStorage(dataUser) {
  // kirim ke localstorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataUser));
}

// function untuk mengambil data dari localstorage dan parsing ke string menjadi array object
function getDataUser() {
  // ambil data dari key di localstorage
  const getData = localStorage.getItem(STORAGE_KEY);

  // mengembalikkan data untuk ditampilkan
  return getData ? JSON.parse(getData) : [];
}

// function untuk membuat sistem toggle hide/unhide
function showPassword(id) {
  // cek apakah ID sudah ada di dalam penampung
  if (showPasswords.includes(id)) {
    // jika sudah ada, hapus ID nya (password nya di hide kembali)
    showPasswords = showPasswords.filter((user) => user !== id);
  } else {
    showPasswords.push(id);
  }

  // render ulang tampilan UI
  tampilkanHasilData(allDataUser);
}

function tampilkanHasilData(arrDataUser) {
  hasilData.textContent = "";

  const waktuSekarang = Date.now();

  arrDataUser.forEach((dataUser) => {
    const li = document.createElement("li");
    const modeEdit = dataUser.id === idEditUser;

    // Cek sisa waktu (dalam detik)
    // Jika properti otpExpired ada nilai nya, dan nilai nya lebih besar dari waktu sekarang
    // maka hitung sisa detik nya
    const siswaWaktuTOP = dataUser.otpExpired
      ? Math.max(0, Math.ceil((dataUser.otpExpired - waktuSekarang) / 1000))
      : 0;

    const otpAktif = siswaWaktuTOP > 0;

    // cek apakah ID ada di dalam array showPassword
    const isShowPass = showPasswords.includes(dataUser.id);

    // jika true, tampilkan password asli, jika false, ubah jadi "********"
    const displayPassword = isShowPass
      ? dataUser.password
      : "*".repeat(dataUser.password.length);

    li.innerHTML = `
            <div>
                <p>Name: ${dataUser.name}</p>
                <p>Usn: ${dataUser.username}</p>
                <p>Email: ${dataUser.email}</p>
                <p>Handphone: ${dataUser.handphone}</p>
                <p>
                  Pass: ${displayPassword}
                  <button class="btn-show-pass" data-id="${dataUser.id}">
                    ${isShowPass ? "Sembunyikan" : "Tampilkan"}
                  </button>
                </p>
                <p>OTP: ${otpAktif ? `${dataUser.otp}` : "-"} [sisa waktu: ${siswaWaktuTOP} detik]</p>
            </div>

            <div>
                <button class="btn-edit" data-id="${dataUser.id}">${modeEdit ? "Batal Edit" : "Edit"}</button>
                <button class="btn-hapus" data-id="${dataUser.id}" ${modeEdit ? "disabled" : ""}>Hapus</button>
                <button class="btn-otp" data-id="${dataUser.id}" ${modeEdit || otpAktif ? "disabled" : ""}>
                  ${otpAktif ? `${siswaWaktuTOP}s` : "Minta kode OTP"}
                </button>
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
    otp: null, // didapat ketika user meminta kode OTP saja
    otpExpired: null, // menyimpan timestamp kadaluarsa
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

  saveToStorage(allDataUser);
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

// membuat kode otp secara acak
function generateKodeOTP() {
  let otpBaru;
  let otpSudahDipakai = true;

  // Lakukkan perulangan terus sampai menemukan kode yang belum pernah dipakai
  while (otpSudahDipakai) {
    // buat otp baru yang acak
    otpBaru = Math.floor(100000 + Math.random() * 900000).toString();

    // Cek apakah angka dari otp nya masih ada yang aktif di dalam data user
    otpSudahDipakai = allDataUser.some(
      (user) => user.otp === otpBaru && user.otpExpired > Date.now(),
    );
  }

  // mengembalikkan kode otp yang unique
  return otpBaru;
}

// function untuk ambil kode otp
function getOTP(id) {
  const user = allDataUser.find((user) => user.id === id);

  if (user) {
    const DURASI_OTP_DETIK = 30;

    user.otp = generateKodeOTP();

    // Date.now() = waktu sekarang dalam milidetik
    // DURASI * 1000 = mengubah detik ke milidetik
    user.otpExpired = Date.now() + DURASI_OTP_DETIK * 1000;

    saveToStorage(allDataUser);
    tampilkanHasilData(allDataUser);

    console.log(`User [${user.name}] berhasil mendapat OTP!`);
  }
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

  saveToStorage(allDataUser);
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
  if (e.target.classList.contains("btn-otp")) {
    getOTP(id);
  }
  if (e.target.classList.contains("btn-show-pass")) {
    showPassword(id);
  }
});

// menjalankan function tampilkan data agar dapat memunculkan data tanpa harus klik btn
tampilkanHasilData(allDataUser);

// Buat fungsi untuk hitung mundur secara real-time
// Menjalankan fungsi ini setiap 1 detik (1000ms) untuk memperbarui hitungan mundur di UI
setInterval(() => {
  const waktuSekarang = Date.now();
  let adaPerubahanData = false;

  // 1. bersihkan data user yang otp nya sudah kadaluarsa
  allDataUser.forEach((user) => {
    if (user.otpExpired && user.otpExpired <= waktuSekarang) {
      user.otp = null;
      user.otpExpired = null;
      adaPerubahanData = true; // menandai ada bahwa data yang berubah ke null
    }
  });

  // 2. cek apakah masih ada user yang otp-nya sedang aktif
  const cekUserOTPAktif = allDataUser.some(
    (user) => user.otpExpired && user.otpExpired > Date.now(),
  );

  // jika ada perubahan (OTP baru saja expired & di null-kan) simpan ke localstorage
  if (adaPerubahanData) {
    saveToStorage(allDataUser);
  }

  // render ulang UI:
  // - jika ada OTP sedang hitung mundur
  // - jika baru saja ada otp yang kadaluarsa
  if (cekUserOTPAktif || adaPerubahanData) {
    tampilkanHasilData(allDataUser);
  }
}, 1000);
