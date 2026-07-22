/** FASE 1 */

/**
 *
 *
 * POINT 1 : Variable & Tipe Data
 *
 *
 */

// let, const var
var nama = "Budi"; // hindari! function-scoped, bisa di-redeclare, sering bikin bug
let umur = 25; // block-scoped, bisa diubah nilainya
const PI = 3.14; // block-scoped, TIDAK bisa diubah (reassign)

if (true) {
  var x = 10;
}
console.log(x); // 10 -> bocor keluar block! ini bug-prone

if (true) {
  let y = 10;
}
// console.log(y); // ReferenceError -> y terkunci di dalam block, lebih aman

// Primitive & Reference Type

// PRIMITIVE: number, string, boolean, null, undefined, symbol, bigint
let a = 5;
let b = a; // b adalah COPY dari a
b = 10;
console.log(a); // 5, tidak berubah

// REFERENCE: object, array, function
let user1 = { name: "Budi" };
let user2 = user1; // user2 menyimpan REFERENCE/alamat yang sama
user2.name = "Andi";
console.log(user1.name); // "Andi" juga berubah! karena nunjuk objek yang sama

// Type Coercion
console.log("5" + 3); // "53" -> string, karena + dengan string = concatenation
console.log("5" - 3); // 2   -> number, karena - memaksa konversi ke number
console.log(1 + true); // 2   -> true dianggap 1
console.log("" == 0); // true -> ini sebabnya == berbahaya (lanjut ke poin 2)

/**
 *
 *
 * POINT 2 : Operator & Control Flow
 *
 *
 */

console.log(5 == "5"); // true  -> cuma cek value, lakukan type coercion dulu
console.log(5 === "5"); // false -> cek value DAN type, lebih aman & predictable
// 📌 Aturan mentor: selalu pakai === kecuali kamu punya alasan spesifik. Ini standar di industri.

// Logical Operator & Short-circuit
const user = {
  name: "Sinta",
  nickname: undefined,
  isPremium: false,
  discount: 0,
};

// Real-world: tampilkan badge premium hanya jika user adalah premium
const badge = user.isPremium && "⭐ Premium";
console.log(badge); // false (karena short-circuit berhenti di kondisi pertama)

// Real-world: kasih default value
const displayName = user.nickname || "Guest";
console.log(displayName); // "Guest" karena nickname undefined

// Nullish coalescing (lebih aman dari ||)
const discount = user.discount ?? 0; // hanya fallback kalau null/undefined, BUKAN kalau 0

// if/else, switch, ternary
function getShippingCost(weight) {
  if (weight <= 1) {
    return 10000;
  } else if (weight <= 5) {
    return 25000;
  } else {
    return 50000;
  }
}

function getDayName(dayNumber) {
  switch (dayNumber) {
    case 0:
      return "Minggu";
      break;
    case 1:
      return "Senin";
      break;
    default:
      return "Hari tidak valid!";
  }
}

// ternary -> bagus untuk kondisi sederhana atau satu baris saja
const isLoggedIn = true;
const status = isLoggedIn ? "Welcome back" : "Please Login";

/**
 *
 *
 * POINT 3 : Function
 *
 *
 */

// Function Declaration -> di-hoist, bisa dipanggil sebelum didefinisi kan
function calculateTotal(price, qty) {
  return price * qty;
}

// Function Expression -> tidak di-hoist
const calculateTax = function (amount) {
  return amount * 0.11;
};

// Arrow Function -> lebih singkat, tidak punya 'this' sendiri (penting nanti!)
const calculateDiscount = (amount, percent) => amount * (percent / 100);

// Default Parameter
function createUser(name, role = "member") {
  return { name, role };
}
console.log(createUser("Rina")); // { name: Rina, role: member }

// Rest Parameter -> kumpulkan argumen menjadi array
function sumAll(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sumAll(1, 2, 3, 4)); // 10

// Spread Operator -> sebarkan array/object
const baseConfig = { timeout: 5000 };
const customConfig = { ...baseConfig, retries: 3 };
console.log(customConfig); // { timeout: 5000, retries: 3 }

// Scope & Closure -- yang paling sering diskip tapi krusial
function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
// 📌 Kenapa ini penting: count tetap "hidup" walau createCounter() sudah selesai dieksekusi,
// karena inner function masih "mengingat" scope tempat ia dibuat.
// Ini dasar dari banyak pattern di React (useState bekerja dengan prinsip closure),
// module pattern, dan nanti — encapsulation di OOP.

// Contoh dunia nyata: rate limiter sederhana.
function createRateLimiter(maxCalls) {
  let calls = 0;
  return function () {
    if (calls >= maxCalls) {
      console.log("Limit tercapai. Coba lagi nanti");
      return false;
    }
    calls++;
    console.log(`Panggilan ke-${calls}`);
    return true;
  };
}

const apiLimitor = createRateLimiter(2);
apiLimitor(); // Panggilan ke-1
apiLimitor(); // Panggilan ke-2
apiLimitor(); // Limit tercapai

/**
 *
 *
 * POINT 4 : Array & Object Method
 *
 *
 */

const transaction = [
  { id: 1, category: "makanan", amount: 50000 },
  { id: 2, category: "transport", amount: 20000 },
  { id: 3, category: "makanan", amount: 30000 },
];

// map -> ubah tiap item, hasil array baru dengan panjang yang sama
const amounts = transaction.map((t) => t.amount);
console.log(amounts); // [ 50000, 20000, 30000 ]

// filter -> seleksi item yang lolos kondisi
const makanan = transaction.filter((t) => t.category === "makanan");
console.log(makanan); // [{ id: 1, category: "makanan", amount: 50000 }, { id: 3, category: "makanan", amount: 30000 }];

// reduce -> "lipat" array jadi satu nilai
const total = transaction.reduce((sum, t) => sum + t.amount, 0);
console.log(total); // 100000

// forEach -> loop biasa, TIDAK return apa - apa (beda dari map!)
transaction.forEach((t) => console.log(`${t.category}: ${t.amount}`));

// Destructuring
const { id, amount } = transaction[0];
console.log(id, amount); // 1 50000

const [first, ...rest] = transaction;
console.log(first); // item pertama | { id: 1, category: 'makanan', amount: 50000 }
console.log(rest); // sisa nya | [{ id: 2, category: "transport", amount: 20000 }, { id: 3, category: "makanan", amount: 30000 }];

// Spread untuk array
const newTransactions = { id: 4, category: "hiburan", amount: 75000 };
const updateList = [...transaction, newTransactions];
console.log(updateList);
// 📌 Method ini dipakai TERUS di dunia nyata — misal dashboard e-commerce filter produk by kategori,
// lalu reduce untuk total revenue, lalu map untuk tampilkan ke UI.

/**
 *
 *
 * POINT 5 : this keyword
 * Ini memang paling membingungkan karena nilainya tergantung BAGAIMANA function dipanggil, bukan di mana ia ditulis
 *
 */

const user5 = {
  name: "Dimas",
  greet: function () {
    console.log(`Helo, saya ${this.name}`); // `this` = user, karena dipanggil sebagai user.greet()
  },
  greetArrow: () => {
    console.log(`Halo, saya ${this.nama}`); // `this` BUKAN user! arrow function ambil `this` dari scope luar
  },
};

user5.greet(); // "Halo, saya Dimas"
user5.greetArrow(); // "Halo, saya undefined"

// Masalah klasik "this" di callback:
/**
 * 

Const button = {
    label: "Submit",
    clicks: 0,
    handleClick: function () {
        setTimeOut(function () {
            this.clicks++; // ERROR Konsep! 'this' disini bukan 'button'
            console.log(this.clicks); // NaN atau error
        }, 1000);
    }
};

 * 
 * 
 */

// SOLUSI: pakai error function, supaya 'this' ikut scope luar (handleClick)
const buttonFixed = {
  label: "submit",
  clicks: 0,
  handleClick: function () {
    setTimeout(() => {
      this.clicks++; // sekarang 'this' = buttonFixed, benar
      console.log(this.clicks);
    }, 1000);
  },
};
// 📌 Kenapa ini wajib paham sebelum OOP: nanti di class, this akan merujuk ke instance yang sedang dibuat.
// Kalau konsep ini belum solid, OOP JS akan terasa seperti "sihir" yang membingungkan.
