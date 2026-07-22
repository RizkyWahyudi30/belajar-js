/** (TAMBAHAN -> ARRAY OBJECT -- GABUNGAN, AGAK MENANTANG) */

// Diberikan data berikut:
const students = [
  { name: "Andi", scores: [80, 90, 75] },
  { name: "Budi", scores: [60, 55, 70] },
  { name: "Citra", scores: [95, 88, 92] },
];
// Buat kode untuk:
// (a) buat array baru berisi { name, average } untuk setiap student (gunakan map,
// dan di dalamnya hitung average dari scores masing-masing),
// (b) dari hasil itu, filter student yang average-nya di atas 75.

// kode (a)
let dataStudents = students.map((data) => {
  const scores = data.scores.reduce((sum, num) => sum + num, 0);
  let average = scores / data.scores.length;
  return { name: data.name, average };
});
// console.log(dataStudents);
// [
//   { name: "Andi", average: "81.67" },
//   { name: "Budi", average: "61.67" },
//   { name: "Citra", average: "91.67" },
// ];

// kode (b)
let filterStudents = dataStudents.filter((data) => data.average > 75);
// console.log(filterStudents);
// [
//   { name: "Andi", average: "81.67" },
//   { name: "Citra", average: "91.67" },
// ];

filterStudents.forEach((student) =>
  console.log(`${student.name}: ${student.average.toFixed(2)}`),
);
