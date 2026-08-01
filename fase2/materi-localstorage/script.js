// Simpan data
// localStorage.setItem("nama", "Budi");

// ambil data
// const nama = localStorage.getItem("nama");
// console.log(nama);

// remove item
// localStorage.removeItem("nama");

// Masalah utama:
// LocalStorage cuma menyimpan string
const tes = { nama: "wahyu", umur: 12 };
localStorage.setItem("tes", tes);

console.log(localStorage.getItem("tes")); // [object Object]

// ----- Solusi Masalah ------ //
const user = { nama: "Budi", umur: 19, pekerjaan: "Pelajar" };

// SIMPAN: object -> JSON String
localStorage.setItem("user", JSON.stringify(user));
console.log(localStorage.getItem("user"));

// AMBIL: JSON String -> object lagi
const dataUser = JSON.parse(localStorage.getItem("user"));
console.log(dataUser.nama);
console.log(dataUser.umur);
console.log(dataUser.pekerjaan);

// Ini akan menghasilkan null, karna key nya belum ada
const data = localStorage.getItem("belum-pernah-ada");
console.log(data);

function ambilDataAwal() {
  const dataTersimpan = localStorage.getItem("notes");

  // guard clause
  if (!dataTersimpan) {
    return []; // belum ada data tersimpan, mulai dari array kosong
  }

  return JSON.parse(dataTersimpan);
}

let dataInput = ambilDataAwal(); // dipakai sebagai initial state
