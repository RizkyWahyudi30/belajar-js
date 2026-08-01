const dataJudul = document.getElementById("input-judul");
const dataIsi = document.getElementById("input-isi");
const dataDeskripsi = document.getElementById("input-deskripsi");
const dataTanggal = document.getElementById("input-tanggal");
const btnTambahNote = document.getElementById("tambah-note");

const listNote = document.getElementById("list-note");

const done = document.getElementById("total-done");
const undone = document.getElementById("total-undone");

// initialisai key agar konsisten dan menghindari typo
const STORAGE_KEY = "notes-app-data";

let dataInput = loadNotes();

let editId = null;

// LoadNotes: dipanggil sekali diawal, ketika halaman pertama kali dibuka
function loadNotes() {
  // ambil data dari local storage menggunakan key
  const data = localStorage.getItem(STORAGE_KEY);

  // mengembalikkan data dan parsing dari string ke array object
  return data ? JSON.parse(data) : [];
  // jika tidak ada, kembalikkan array kosong
}

// Save: dipanggil setiap kali dataInput berubah
function saveDataNotes(data) {
  // menyimpan ke localstorage dan parsing dari object ke string
  // agar bisa dibaca
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function tambahNoteBaru(judul, isi, deskripsi, tanggal) {
  return {
    id: Date.now(),
    judul: judul,
    isi: isi,
    deskripsi: deskripsi,
    tanggal: tanggal,
    isDone: false,
  };
}

function tampilkanData(arrDataNote) {
  listNote.textContent = "";

  arrDataNote.forEach((dataNote) => {
    const li = document.createElement("li");
    const modeEdit = dataNote.id === editId;

    li.innerHTML = `
        <div data-class="note-content" class=" ${dataNote.isDone ? "line-through" : ""}">
            <h3>${dataNote.judul}</h3>
            <p>${dataNote.isi}</p>
            <p>${dataNote.deskripsi}</p>
            <p>${dataNote.tanggal}</p>
            <p></p>
        </div>
        <div data-class="note-action">
            <button class="btn-edit" data-id="${dataNote.id}">${modeEdit ? "Batal Edit" : "Edit"}</button>
            <button class="btn-hapus" data-id="${dataNote.id}" ${modeEdit ? "disabled" : ""}>Hapus</button>
            <button class="btn-done" data-id="${dataNote.id}" ${modeEdit ? "disabled" : ""}>${dataNote.isDone ? "UnDone" : "Done"}</button>
        </div>  
    `;

    listNote.append(li);
  });

  hitungNoteDone(arrDataNote);
}

function editNote(id) {
  if (editId === id) {
    resetForm(); // panggil function reset
  } else {
    editId = id;
    const note = dataInput.find((n) => n.id === id);
    if (!note) return;

    btnTambahNote.textContent = "Upgrade Note";
    dataJudul.value = note.judul;
    dataIsi.value = note.isi;
    dataDeskripsi.value = note.deskripsi;
    dataTanggal.value = note.tanggal;
  }

  // render ulang ui
  tampilkanData(dataInput);
}

function hapusNote(id) {
  // validasi agar tidak langsung dihapus
  const confirmDelete = confirm("Apakah kamu yakin ingin menghapus ini?");

  if (confirmDelete) {
    // Simpan data yang ID-nya bukan ID yang dihapus
    dataInput = dataInput.filter((note) => note.id !== id);

    // ini untuk membersihkan input, bertujuan untuk User Experience
    if (id === editId) {
      resetForm();
    }
  }

  // save ke localStorage
  saveDataNotes(dataInput);

  // render ulang UI
  tampilkanData(dataInput);
}

function doneNote(id) {
  const noteDone = dataInput.find((note) => note.id === id);

  if (noteDone) {
    // like as toggle, membalikkan nilai nya
    noteDone.isDone = !noteDone.isDone;

    // simpan ke localStorage
    saveDataNotes(dataInput);

    // render ulang
    tampilkanData(dataInput);
  }
}

function resetForm() {
  editId = null;
  dataJudul.value = "";
  dataIsi.value = "";
  dataDeskripsi.value = "";
  dataTanggal.value = "";
  btnTambahNote.textContent = "Tambahkan Note";
}

function hitungNoteDone(arrNote) {
  let noteDone = arrNote.filter((note) => note.isDone === true).length;
  let noteUndone = arrNote.filter((note) => note.isDone === false).length;

  done.textContent = noteDone;
  undone.textContent = noteUndone;
}

btnTambahNote.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    !dataJudul.value.trim() ||
    !dataIsi.value.trim() ||
    !dataDeskripsi.value.trim() ||
    !dataTanggal.value.trim()
  ) {
    alert("Harap isi input dengan benar");
    return;
  }

  // validasi mode edit maupun mode tambah note baru
  if (editId !== null) {
    // MODE EDIT: update note yang sudah ada
    const note = dataInput.find((n) => n.id === editId);

    note.judul = dataJudul.value;
    note.isi = dataIsi.value;
    note.deskripsi = dataDeskripsi.value;
    note.tanggal = dataTanggal.value;

    editId = null; // reset
  } else {
    // MODE TAMBAH: tambah note baru
    const noteBaru = tambahNoteBaru(
      dataJudul.value,
      dataIsi.value,
      dataDeskripsi.value,
      dataTanggal.value,
    );

    dataInput.push(noteBaru);
  }

  saveDataNotes(dataInput);
  tampilkanData(dataInput);
  resetForm();

  console.log(dataInput);
});

listNote.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);

  if (e.target.classList.contains("btn-hapus")) {
    hapusNote(id);
  }

  if (e.target.classList.contains("btn-edit")) {
    editNote(id);
  }

  if (e.target.classList.contains("btn-done")) {
    doneNote(id);
  }
});

// Untuk menampilkan data secara langsung
tampilkanData(dataInput);
