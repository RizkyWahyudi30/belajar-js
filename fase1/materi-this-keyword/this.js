// Coba sekarang kerjakan soal kecil ini buat mengetes pemahamanmu
// (boleh dijawab konseptual dulu, atau langsung coding):
// const wallet = {
//   balance: 100000,
//   addMoney(amount) {
//     //
//     setTimeout(function () {
//       this.balance += amount;
//       console.log(this.balance);
//     }, 1000);
//   },
// };

// wallet.addMoney(50000);

// Pertanyaan: apa yang akan ter-print ke console setelah 1 detik,
// dan kenapa? Lalu coba perbaiki kode itu supaya balance benar-benar
// bertambah jadi 150000.

// Jawaban
// Hasil print NaN
// Karena setTimeOut tidak mewarisi nilai this dari addMoney(amount)

// kode yang sudah diperbaiki :
const wallet = {
  balance: 100000,
  addMoney(amount) {
    setTimeout(() => {
      this.balance += amount;
      console.log(this.balance);
    }, 1000);
  },
};

wallet.addMoney(50000); // 150000
