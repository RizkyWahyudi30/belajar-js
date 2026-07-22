/** (TAMBAHAN -> FUNCTION -- REST PARAMETER) */

// Buat function averageScore(...scores) yang menerima jumlah argumen berapa pun,
// lalu return rata-ratanya. Contoh: averageScore(80, 90, 70) harus return 80.

function averageScore(...score) {
  let scores = score.reduce((sum, num) => sum + num, 0);
  return scores / score.length;
}
console.log(averageScore(80, 90, 70)); // 80
