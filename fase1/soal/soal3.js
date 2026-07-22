/** (CLOSURE) */
// Buat function createBankAccount(initialBalance) yang return object dengan dua method: deposit(amount)
// dan withdraw(amount), dimana balance tidak bisa diakses langsung dari luar (harus pakai closure,
// mirip seperti contoh rate limiter di atas).

function createBankAccount(initialBalance) {
  let balance = initialBalance;
  return {
    // method deposit
    deposit: function (amount) {
      if (amount > 0) {
        balance += amount;
        console.log(`Deposit success. Balance: ${balance}`);
      }
    },

    // method withdraw (error kode aku!)
    // Kondisi amount >= 0 itu mengecek apakah amount-nya positif, bukan apakah saldo cukup. Akibatnya:

    // - withdraw(-100) → masuk ke else, muncul "Saldo tidak mencukupi" — padahal masalahnya bukan saldo, tapi amount negatif (pesan errornya menyesatkan)
    // - withdraw(999999999) (jauh lebih besar dari balance) → tetap berhasil karena 999999999 >= 0 itu true, padahal saldo nggak cukup. Coba kamu test ini sendiri, kamu akan lihat balance jadi minus.

    // withdraw: function (amount) {
    //   if (amount >= 0) {
    //     balance -= amount;
    //     console.log(`Withdraw success. Balance: ${balance}`);
    //   } else {
    //     console.log("Saldo tidak mencukupi!");
    //   }
    // },

    // versi sudah dikoreksi
    withdraw: function (amount) {
      if (amount <= 0) {
        console.log("Jumlah penarikan tidak valid!");
      } else if (amount > balance) {
        console.log("Saldo tidak mencukupi!");
      } else {
        balance -= amount;
        console.log(`Withdraw success. Balance: ${balance}`);
      }
    },
  };
}

const bankAccount = createBankAccount(7800000);
// testing method deposit
bankAccount.deposit(2110000); // Deposit success. Balance: 9910000
bankAccount.withdraw(4700000); // Withdraw success. Balance: 5210000

// testing yang lain
bankAccount.withdraw(99999999999); // Saldo tidak mencukupi!
bankAccount.withdraw(-500); // Jumlah penarikan tidak valid!
