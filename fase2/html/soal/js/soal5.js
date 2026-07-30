const dataJudul = document.getElementById("input-judul");
const dataIsi = document.getElementById("input-isi");
const dataDeskripsi = document.getElementById("input-deskripsi");
const dataTanggal = document.getElementById("input-tanggal");
const btnTambahNote = document.getElementById("tambah-note");

const listNote = document.getElementById("list-note");

const done = document.getElementById("total-done");
const undone = document.getElementById("total-undone");

let dataInput = [];

let editId = null;

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

    li.innerHTML = `
        <div data-class="note-content" class=" ${dataNote.isDone ? "line-through" : ""}">
            <h3>${dataNote.judul}</h3>
            <p>${dataNote.isi}</p>
            <p>${dataNote.deskripsi}</p>
            <p>${dataNote.tanggal}</p>
            <p></p>
        </div>
        <div data-class="note-action">
            <button class="btn-edit" data-id="${dataNote.id}">Edit</button>
            <button class="btn-hapus" data-id="${dataNote.id}">Hapus</button>
            <button class="btn-done" data-id="${dataNote.id}">${dataNote.isDone ? "UnDone" : "Done"}</button>
        </div>  
    `;

    listNote.append(li);
  });

  hitungNoteDone(arrDataNote);
}

function editNote(id) {
  const noteEdit = dataInput.find((note) => note.id === id);

  if (!noteEdit) return;

  dataJudul.value = noteEdit.judul;
  dataIsi.value = noteEdit.isi;
  dataDeskripsi.value = noteEdit.deskripsi;
  dataTanggal.value = noteEdit.tanggal;

  // sedang dalam mode edit, note tidak dihapus dulu
  editId = id;
}

function hapusNote(id) {
  // Simpan data yang ID-nya bukan ID yang dihapus
  dataInput = dataInput.filter((note) => note.id !== id);

  tampilkanData(dataInput);
}

function doneNote(id) {
  const noteDone = dataInput.find((note) => note.id === id);

  if (noteDone) {
    // like as toggle, membalikkan nilai nya
    noteDone.isDone = !noteDone.isDone;

    tampilkanData(dataInput);
  }
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
  if (editId) {
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

  tampilkanData(dataInput);
  console.log(dataInput);

  dataJudul.value = "";
  dataIsi.value = "";
  dataDeskripsi.value = "";
  dataTanggal.value = "";
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
