# FASE 4: OOP, Class, Prototype, Module, Design Pattern (JavaScript)

> Tujuan fase ini: kamu **paham konsep di balik layar**, bukan cuma hafal `class` dan `extends`. JavaScript itu prototype-based, dan `class` cuma "gula sintaksis" (syntactic sugar) di atasnya. Kalau kamu ngerti prototype dulu, `class` akan terasa jelas, bukan sihir.

---

## Daftar Isi

1. Object Literal & Prototype-based Nature JS
2. Constructor Function & Prototype
3. ES6 Class Syntax
4. 4 Pilar OOP di JavaScript
5. Module Pattern (ES Modules)
6. Design Pattern: Factory, Singleton, Observer
7. Project Akhir: RPG Battle System

Setiap bab: **Teori → Contoh Kode → Best Practice → Latihan**.

---

# BAB 1 — Object Literal & JS Sebenarnya Berbasis Prototype

## 1.1 Teori

Di bahasa seperti Java/C#, kelas itu **blueprint** yang harus ada duluan sebelum bikin object — ini disebut **class-based OOP**.

Banyak orang belajar OOP JS langsung loncat ke `class`, karena syntax-nya mirip bahasa OOP lain (Java, C#, dll). Masalahnya: `class` di JS itu bukan fitur OOP asli — dia cuma "topeng" yang lebih enak dibaca di atas mekanisme yang sudah ada sejak awal JS diciptakan, yaitu **prototype**. Kalau kamu hafal syntax `class` tanpa paham prototype di baliknya, kamu akan gampang bingung saat ketemu behavior aneh nanti (misal soal this, soal kenapa method "dibagi" antar instance, dll).

JavaScript **beda**. JS itu **prototype-based**: setiap object punya link tersembunyi (`[[Prototype]]`) ke object lain, dan kalau kamu akses properti yang nggak ada di object itu sendiri, JS akan **naik ke prototype-nya** untuk cari. Ini disebut **prototype chain**.

Object literal `{}` adalah cara paling dasar bikin object di JS — tanpa class sama sekali.

```javascript
const kucing = {
  nama: "Milo",
  suara: "Meong",
  bunyi() {
    console.log(`${this.nama} berkata: ${this.suara}`);
  },
};

kucing.bunyi(); // Milo berkata: Meong
```

Ini object dengan property (nama, suara) dan method (bersuara). Simpel — tapi masalahnya: kalau kamu punya 100 kucing, kamu harus tulis ulang struktur ini 100 kali. Tidak scalable. Ini masalah yang OOP coba selesaikan — nanti.

## Setiap Object di JS Punya "Rantai" ke Object Lain -- Ini Namanya Prototype

Ini bagian intinya. Coba jalankan ini:

```js
const kucing = { nama: "Miko" };

console.log(kucing.toString()); // "[object Object]"
```

Pertanyaan penting: dari mana `toString()` ini muncul? Kamu tidak pernah menulis method `toString` di object kucing. Jawabannya: JS **otomatis** menyambungkan setiap object ke sebuah object "induk" bernama `Object.prototype`, yang berisi method-method dasar seperti `toString`, `hasOwnProperty`, dll. Kalau kamu akses property/method yang **tidak ada** di object itu sendiri, JS akan **naik ke atas**, cari di prototype-nya. Kalau masih tidak ketemu, naik lagi ke prototype dari prototype-nya. Ini yang disebut **Prototype Chain**.

```js
const kucing = { nama: "Miko" };

console.log(kucing.hasOwnProperty("nama")); // true -> "nama" MEMANG ada di kucing sendiri
console.log(kucing.hasOwnProperty("toString")); // false -> "toString" TIDAK ada di kucing, dia numpang dari prototype
console.log(Object.getPrototypeOf(kucing) === Object.prototype); // true -> ini pembuktian rantainya
```

### Membuat object dengan prototype custom: `Object.create()`

Ini cara **paling murni** untuk lihat prototype bekerja, tanpa `class` atau `function` constructor:

```javascript
const hewanProto = {
  bunyi() {
    console.log(`${this.nama} mengeluarkan suara`);
  },
};

const anjing = Object.create(hewanProto); // anjing.[[Prototype]] = hewanProto
anjing.nama = "Rex";
anjing.bunyi(); // Rex mengeluarkan suara

console.log(anjing.hasOwnProperty("nama")); // true  (properti sendiri)
console.log(anjing.hasOwnProperty("bunyi")); // false (properti dari prototype)
```

**Insight penting:** `anjing` sendiri **tidak punya** method `bunyi`. Saat dipanggil, JS jalan naik ke prototype chain: `anjing` → `hewanProto` → `Object.prototype` → `null`. Ini yang bikin JS hemat memori — banyak object bisa "berbagi" method lewat satu prototype, bukan copy-paste ke tiap object.

📌 Ini poin paling penting di sub-bab ini: **"inheritance" di JS pada dasarnya cuma "menyambungkan" satu object ke object lain lewat prototype chain**, supaya object yang di bawah bisa "meminjam" property/method dari object di atasnya, tanpa harus punya sendiri. Nanti waktu kita sampai ke `class Kucing extends Hewan`, itu cuma syntax yang lebih enak dibaca untuk melakukan hal yang persis sama seperti `Object.create()` ini di balik layar.

## Kesalahan Umum Pemula di Tahap Ini

1. Mengira setiap object punya salinan sendiri dari method di prototype

```js
const a = Object.create(hewanDasar);
const b = Object.create(hewanDasar);

console.log(a.makan === b.makan); // true! -> method yang SAMA PERSIS, bukan 2 salinan berbeda
```

Ini justru keuntungan **prototype — hemat memori**. Kalau kamu punya 1000 kucing, method makan cuma ada 1 kali di memori (di hewanDasar), bukan 1000 salinan.

2. Bingung antara `Object.getPrototypeOf(obj)` dan `obj.prototype`

```js
const kucing = Object.create(hewanDasar);
console.log(kucing.prototype); // undefined! -> ini bukan cara akses yang benar

console.log(Object.getPrototypeOf(kucing)); // { makan: [Function] } -> ini cara yang benar
```

`.prototype` itu property yang **hanya ada di function** (kita bahas ini di sub-bab 2), bukan di object biasa. Untuk object biasa, cara mengecek "siapa induknya" adalah `Object.getPrototypeOf().`

## 1.2 Best Practice

- Pakai object literal untuk data sederhana / one-off object (konfigurasi, single instance).
- Jangan pakai object literal kalau kamu butuh **banyak object dengan struktur sama** — itu tandanya kamu butuh constructor/class (Bab 2 & 3).
- Selalu ingat: `this` di dalam method object literal merujuk ke object yang **memanggil**, bukan yang mendefinisikan.

## 1.3 Latihan Bab 1

1. Buat object literal `mobil` dengan properti `merk`, `kecepatan` (mulai 0), dan method `gas(tambahan)` yang menambah `kecepatan`, lalu `console.log` kecepatan sekarang.
2. Buat object `kendaraanProto` yang punya method `deskripsi()` yang mencetak `"Ini adalah <jenis>"`. Lalu buat 2 object pakai `Object.create(kendaraanProto)`: `motor` dan `mobil`, masing-masing isi properti `jenis` berbeda, panggil `deskripsi()` dari keduanya.
3. **Konsep**: Jelaskan dengan kata-katamu sendiri — apa bedanya properti yang ada di object itu sendiri (_own property_) vs properti yang didapat lewat prototype chain? Berikan 1 contoh nyata pakai `hasOwnProperty`.

_(Kerjakan dulu, nanti kirim jawabanmu ke aku untuk direview sebelum lanjut ke Bab 2.)_

---

# BAB 2 — Constructor Function & Prototype

## 2.1 Teori

Sebelum `class` ada di ES6 (2015), cara bikin "blueprint" object di JS adalah **constructor function** — function biasa yang dipanggil dengan `new`.

```javascript
function Karakter(nama, hp) {
  this.nama = nama;
  this.hp = hp;
}

const hero = new Karakter("Aria", 100);
console.log(hero.nama); // Aria
```

### Apa yang sebenarnya terjadi saat `new Karakter(...)` dipanggil?

1. JS bikin object kosong baru `{}`.
2. Object itu di-link ke `Karakter.prototype` sebagai `[[Prototype]]`-nya.
3. `this` di dalam function di-set ke object baru itu.
4. Function dijalankan (properti di-assign ke `this`).
5. Object itu di-return otomatis (kecuali function eksplisit return object lain).

### Kenapa method harus taruh di `.prototype`, bukan di dalam constructor?

```javascript
// ❌ BORoS: setiap instance punya COPY method sendiri (buang memori)
function KarakterBuruk(nama) {
  this.nama = nama;
  this.serang = function () {
    console.log(`${this.nama} menyerang!`);
  };
}

// ✅ BENAR: semua instance BERBAGI 1 method lewat prototype
function Karakter(nama, hp) {
  this.nama = nama;
  this.hp = hp;
}

Karakter.prototype.serang = function () {
  console.log(`${this.nama} menyerang!`);
};

const a = new Karakter("Aria", 100);
const b = new Karakter("Budi", 90);

console.log(a.serang === b.serang); // true -> method yang sama, di-share
```

Ini adalah **inti dari inheritance di JS**: `a` dan `b` tidak punya `serang` di diri mereka sendiri, tapi mendapatkannya lewat `Karakter.prototype`.

### Inheritance manual pakai prototype (sebelum ada `extends`)

```javascript
function Musuh(nama, hp, damage) {
  Karakter.call(this, nama, hp); // panggil "constructor induk" manual
  this.damage = damage;
}

// hubungkan prototype Musuh ke prototype Karakter
Musuh.prototype = Object.create(Karakter.prototype);
Musuh.prototype.constructor = Musuh;

Musuh.prototype.serangSpesial = function () {
  console.log(
    `${this.nama} melancarkan serangan spesial ${this.damage} damage!`,
  );
};

const goblin = new Musuh("Goblin", 50, 15);
goblin.serang(); // dari Karakter.prototype -> "Goblin menyerang!"
goblin.serangSpesial(); // dari Musuh.prototype
```

Kode di atas **inilah yang disederhanakan `class ... extends ...` di Bab 3**. Kalau kamu paham blok ini, `class` bakal terasa masuk akal — bukan hafalan.

## 2.2 Best Practice

- Method → selalu di prototype, bukan di dalam constructor (kecuali kamu sengaja butuh closure private, dibahas di Bab 4).
- Jangan panggil constructor function tanpa `new` — `this` akan salah target (di strict mode malah error).
- Gunakan `instanceof` untuk cek apakah object berasal dari constructor tertentu: `goblin instanceof Karakter` → `true`.

## 2.3 Latihan Bab 2

1. Buat constructor function `Buku(judul, penulis)` dengan method di prototype bernama `info()` yang mencetak `"<judul> oleh <penulis>"`.
2. Buat constructor `Ebook(judul, penulis, ukuranFile)` yang **mewarisi** `Buku` secara manual (pakai `Buku.call()` dan `Object.create()`, seperti contoh `Musuh` di atas). Tambahkan method `infoUkuran()` yang mencetak ukuran file.
3. **Konsep**: Kenapa `Musuh.prototype.constructor = Musuh;` perlu ditulis setelah `Musuh.prototype = Object.create(Karakter.prototype)`? Coba hapus baris itu, lalu `console.log(goblin.constructor)` — apa yang terjadi dan kenapa?

---

# BAB 3 — ES6 Class Syntax

## 3.1 Teori

`class` di ES6 **bukan** paradigma baru — dia cuma sintaks yang lebih rapi untuk pola constructor function + prototype yang barusan kita tulis manual di Bab 2.

```javascript
class Karakter {
  constructor(nama, hp) {
    this.nama = nama;
    this.hp = hp;
  }

  // method otomatis masuk ke Karakter.prototype
  serang() {
    console.log(`${this.nama} menyerang!`);
  }

  // getter & setter
  get status() {
    return this.hp > 0 ? "Hidup" : "Kalah";
  }

  set tambahHp(jumlah) {
    if (jumlah > 0) this.hp += jumlah;
  }
}

const hero = new Karakter("Aria", 100);
hero.serang(); // Aria menyerang!
console.log(hero.status); // Hidup (dipanggil TANPA kurung, seperti properti)
hero.tambahHp = 20; // dipanggil seperti assignment, bukan function call
```

Buktikan ini cuma "gula sintaksis":

```javascript
console.log(typeof Karakter); // "function"  <- class itu function juga!
console.log(hero.serang === Karakter.prototype.serang); // true
```

## 3.2 Static Method & Static Property

Static itu milik **class-nya sendiri**, bukan milik instance.

```javascript
class Karakter {
  static jumlahKarakter = 0;

  constructor(nama) {
    this.nama = nama;
    Karakter.jumlahKarakter++;
  }

  static buatAcak() {
    const namaAcak = ["Aria", "Budi", "Citra"][Math.floor(Math.random() * 3)];
    return new Karakter(namaAcak);
  }
}

new Karakter("A");
new Karakter("B");
console.log(Karakter.jumlahKarakter); // 2
const acak = Karakter.buatAcak(); // factory-style creation
```

## 3.3 Best Practice

- Pakai `class` untuk kode production modern — lebih mudah dibaca tim lain dibanding manual prototype.
- Tapi **selalu ingat** apa yang terjadi di baliknya (Bab 2) — supaya waktu debug error prototype chain, kamu nggak bingung.
- Getter/setter cocok untuk validasi atau computed value, jangan dipakai berlebihan untuk hal simpel.

## 3.4 Latihan Bab 3

1. Ubah jawaban Bab 2 nomor 1 & 2 (`Buku`, `Ebook`) menjadi versi `class` dengan `extends` dan `super()`.
2. Tambahkan getter `ringkasan` di class `Buku` yang mengembalikan string gabungan judul + penulis.
3. Tambahkan static method `Buku.buatDariObjek(obj)` yang menerima `{judul, penulis}` dan mengembalikan instance `Buku` baru (ini nyicip Factory Pattern, nanti dibahas detail di Bab 6).

---

# BAB 4 — 4 Pilar OOP di JavaScript

## 4.1 Encapsulation (Enkapsulasi)

**Konsep**: sembunyikan detail internal, hanya expose apa yang perlu diakses dari luar.

```javascript
class RekeningBank {
  #saldo; // private field (ES2022+) - TIDAK BISA diakses dari luar class

  constructor(saldoAwal) {
    this.#saldo = saldoAwal;
  }

  setor(jumlah) {
    if (jumlah <= 0) throw new Error("Jumlah setor harus positif");
    this.#saldo += jumlah;
  }

  tarik(jumlah) {
    if (jumlah > this.#saldo) throw new Error("Saldo tidak cukup");
    this.#saldo -= jumlah;
  }

  get saldo() {
    return this.#saldo; // akses terkontrol lewat getter
  }
}

const rek = new RekeningBank(100000);
rek.setor(50000);
console.log(rek.saldo); // 150000
console.log(rek.#saldo); // ❌ SyntaxError - tidak bisa diakses dari luar
```

**Kenapa penting?** Tanpa enkapsulasi, siapapun bisa `rek.saldo = -999999999` langsung tanpa validasi. Encapsulation melindungi _invariant_ (aturan) data.

## 4.2 Inheritance (`extends`, `super`)

```javascript
class Karakter {
  constructor(nama, hp) {
    this.nama = nama;
    this.hp = hp;
  }

  serang(target) {
    console.log(`${this.nama} menyerang ${target.nama}`);
  }
}

class Player extends Karakter {
  constructor(nama, hp, mana) {
    super(nama, hp); // WAJIB dipanggil sebelum pakai `this` di constructor turunan
    this.mana = mana;
  }

  sihir(target) {
    if (this.mana < 10) return console.log("Mana tidak cukup!");
    this.mana -= 10;
    console.log(`${this.nama} melancarkan sihir ke ${target.nama}`);
  }
}

const player = new Player("Aria", 100, 30);
player.serang({ nama: "Goblin" }); // method warisan dari Karakter
player.sihir({ nama: "Goblin" }); // method milik Player sendiri
```

`super(nama, hp)` memanggil constructor `Karakter`. Kalau kamu lupa panggil `super()` sebelum akses `this`, JS akan **error** — ini aturan ketat di class (beda dengan constructor function manual di Bab 2 yang lebih fleksibel tapi rawan bug).

## 4.3 Polymorphism (Polimorfisme)

**Konsep**: object berbeda merespons **method dengan nama sama** dengan cara berbeda-beda (_method overriding_).

```javascript
class Karakter {
  serang(target) {
    console.log(`${this.nama} menyerang biasa ke ${target.nama}`);
  }
}

class Player extends Karakter {
  serang(target) {
    console.log(`${this.nama} menebas ${target.nama} dengan pedang!`);
  }
}

class Enemy extends Karakter {
  serang(target) {
    console.log(`${this.nama} mencakar ${target.nama} dengan cakar tajam!`);
  }
}

const daftarKarakter = [
  Object.assign(new Player("Aria", 100, 30), { nama: "Aria" }),
  Object.assign(new Enemy(), { nama: "Goblin" }),
];

// SATU LOOP, method sama dipanggil, HASIL BEDA - ini polymorphism
daftarKarakter.forEach((k) => k.serang({ nama: "Target" }));
```

Ini kenapa polymorphism powerful: kode pemanggil (`k.serang(...)`) **tidak perlu tahu** apakah `k` itu Player atau Enemy — dia cukup percaya semua "Karakter" punya method `serang`.

## 4.4 Abstraction (Abstraksi)

JS tidak punya keyword `abstract` bawaan seperti Java, tapi kita bisa **simulasikan** lewat convention + error guard:

```javascript
class Karakter {
  constructor(nama) {
    if (new.target === Karakter) {
      throw new Error(
        "Karakter adalah class abstrak, tidak boleh di-instantiate langsung!",
      );
    }
    this.nama = nama;
  }

  serang() {
    throw new Error("Method serang() harus di-override oleh subclass!");
  }
}

class Player extends Karakter {
  serang() {
    console.log(`${this.nama} menyerang dengan pedang`);
  }
}

new Karakter("Test"); // ❌ Error: class abstrak
const p = new Player("Aria");
p.serang(); // ✅ OK
```

**Intinya abstraksi**: sembunyikan kompleksitas implementasi, dan paksa subclass mengikuti "kontrak" (harus punya method tertentu).

## 4.5 Best Practice 4 Pilar

- Encapsulation: default-kan properti jadi `#private`, expose lewat getter/setter kalau perlu.
- Inheritance: pakai `extends` hanya kalau relasinya benar-benar "is-a" (Player **is a** Karakter). Kalau relasinya "has-a", pakai composition, bukan inheritance.
- Polymorphism: rancang method dengan nama sama di parent, override sesuai kebutuhan subclass — hindari `if (tipe === "player") ... else if (tipe === "enemy")` yang panjang.
- Abstraction: jangan over-engineer di project kecil. Simulasi abstract class berguna kalau tim kamu besar dan butuh "kontrak" yang jelas.

## 4.6 Latihan Bab 4

1. Buat class `Kendaraan` dengan private field `#bensin`. Buat method `isiBensin(jumlah)` dan `jalan(jarak)` yang mengurangi bensin berdasarkan jarak (misal 1 km = 0.1 liter), dengan validasi bensin tidak boleh minus.
2. Buat `Motor extends Kendaraan` dan `Mobil extends Kendaraan`, masing-masing override method `jalan()` dengan konsumsi bensin per km yang beda (polymorphism).
3. Tambahkan guard di constructor `Kendaraan` supaya tidak bisa di-instantiate langsung (abstraction), hanya lewat subclass.
4. **Konsep**: Jelaskan skenario nyata (bukan dari materi ini) di mana kamu akan pilih **composition** ketimbang **inheritance**. Kenapa?

---

# BAB 5 — Module Pattern (ES Modules)

## 5.1 Teori

Sebelum ES Modules ada, JS tidak punya sistem module bawaan — semua variabel gampang bentrok di scope global. **Module pattern** menyelesaikan ini dengan cara membungkus kode supaya punya scope sendiri dan hanya expose apa yang memang perlu di-_export_.

### Named export & import

```javascript
// file: karakter.js
export class Karakter {
  constructor(nama, hp) {
    this.nama = nama;
    this.hp = hp;
  }
}

export const MAX_HP = 100;

export function buatKarakterAcak() {
  return new Karakter("Random", MAX_HP);
}
```

```javascript
// file: main.js
import { Karakter, MAX_HP, buatKarakterAcak } from "./karakter.js";

const k = new Karakter("Aria", MAX_HP);
console.log(k);
```

### Default export

```javascript
// file: player.js
export default class Player {
  constructor(nama) {
    this.nama = nama;
  }
}
```

```javascript
// file: main.js
import Player from "./player.js"; // TANPA kurung kurawal, bebas kasih nama apapun
```

### Kombinasi & re-export

```javascript
// file: index.js (barrel file - pusat export)
export { Karakter } from "./karakter.js";
export { default as Player } from "./player.js";
export { default as Enemy } from "./enemy.js";
```

```javascript
// file: main.js jadi rapi:
import { Karakter, Player, Enemy } from "./index.js";
```

## 5.2 Module Pattern "klasik" (sebelum ES Modules, pakai IIFE)

Kamu mungkin nemu ini di kode lama — penting dikenal biar paham sejarah & kode legacy:

```javascript
const KarakterModule = (function () {
  let counter = 0; // private, tersembunyi di closure

  function buat(nama) {
    counter++;
    return { nama, id: counter };
  }

  return {
    buat,
    getJumlah: () => counter,
  }; // hanya ini yang di-expose ke luar
})();

KarakterModule.buat("Aria");
console.log(KarakterModule.getJumlah()); // 1
console.log(KarakterModule.counter); // undefined -> private, aman
```

## 5.3 Best Practice

- Selalu pakai **named export** untuk banyak hal dari 1 file (lebih eksplisit & mudah di-refactor lewat auto-import IDE).
- Pakai **default export** hanya kalau file itu memang punya 1 "hal utama" (misal 1 file = 1 class/component).
- Hindari `export *` sembarangan — bikin sulit lacak dari mana suatu identifier berasal.
- Satu file = satu tanggung jawab jelas (_single responsibility_) — jangan taruh 5 class tidak berhubungan dalam 1 file.

## 5.4 Latihan Bab 5

1. Pisahkan class `Buku` dan `Ebook` dari Bab 3 ke file terpisah (`buku.js`, `ebook.js`), lalu import keduanya di `main.js` dan buat beberapa instance.
2. Buat 1 file `constants.js` yang meng-export beberapa nilai konstan (misal `MAX_PINJAM = 3`), import & gunakan di file lain.
3. **Konsep**: Apa masalah yang diselesaikan module pattern IIFE di atas, dan kenapa ES Modules native sekarang lebih disarankan dibanding IIFE?

---

# BAB 6 — Design Pattern Umum: Factory, Singleton, Observer

Kamu cukup **paham konsepnya dan kapan makainya** — belum perlu hafal implementasi rumit.

## 6.1 Factory Pattern

**Masalah yang diselesaikan**: logika pembuatan object rumit/bervariasi, dan kamu tidak mau kode pemanggil harus tahu detail `new ClassApa(...)` mana yang dipakai.

```javascript
class Player {
  constructor(nama) {
    this.nama = nama;
    this.tipe = "Player";
  }
}
class Enemy {
  constructor(nama) {
    this.nama = nama;
    this.tipe = "Enemy";
  }
}

class KarakterFactory {
  static buat(tipe, nama) {
    switch (tipe) {
      case "player":
        return new Player(nama);
      case "enemy":
        return new Enemy(nama);
      default:
        throw new Error("Tipe tidak dikenal");
    }
  }
}

const musuh1 = KarakterFactory.buat("enemy", "Goblin");
const player1 = KarakterFactory.buat("player", "Aria");
```

Kode pemanggil (`KarakterFactory.buat(...)`) tidak perlu tahu class mana persisnya yang dipakai — dia cukup kasih "tipe", dan factory yang urus.

## 6.2 Singleton Pattern

**Masalah yang diselesaikan**: kamu butuh **hanya 1 instance** dari sesuatu di seluruh aplikasi (misal: koneksi database, konfigurasi global, game state manager).

```javascript
class GameManager {
  static #instance;

  constructor() {
    if (GameManager.#instance) {
      throw new Error("GameManager sudah ada! Pakai GameManager.getInstance()");
    }
    this.skor = 0;
    GameManager.#instance = this;
  }

  static getInstance() {
    if (!GameManager.#instance) {
      GameManager.#instance = new GameManager();
    }
    return GameManager.#instance;
  }
}

const g1 = GameManager.getInstance();
const g2 = GameManager.getInstance();
console.log(g1 === g2); // true -> sama-sama nunjuk 1 object yang sama
```

⚠️ **Catatan penting**: Singleton sering di-**overuse** dan dianggap anti-pattern kalau dipakai sembarangan (bikin state global susah di-test). Pakai hanya kalau memang **benar-benar** butuh 1 instance saja secara arsitektural.

## 6.3 Observer Pattern

**Masalah yang diselesaikan**: 1 object (_subject_) perlu memberi tahu banyak object lain (_observers/subscribers_) setiap kali ada perubahan/event — tanpa subject harus tahu detail siapa saja observernya.

```javascript
class EventEmitter {
  #listeners = {};

  on(event, callback) {
    if (!this.#listeners[event]) this.#listeners[event] = [];
    this.#listeners[event].push(callback);
  }

  emit(event, data) {
    (this.#listeners[event] || []).forEach((cb) => cb(data));
  }
}

const battleEvents = new EventEmitter();

// Observer 1: UI update
battleEvents.on("karakterKalah", (nama) => {
  console.log(`[UI] Tampilkan animasi kalah untuk ${nama}`);
});

// Observer 2: logging
battleEvents.on("karakterKalah", (nama) => {
  console.log(`[LOG] ${nama} telah kalah di pertarungan`);
});

// Subject men-trigger event, tidak peduli siapa yang dengar
battleEvents.emit("karakterKalah", "Goblin");
```

Ini pola yang sama dipakai `addEventListener` di browser DOM — kamu sudah pakai Observer pattern tanpa sadar!

## 6.4 Best Practice Design Pattern

- Design pattern itu **solusi untuk masalah berulang**, bukan checklist yang harus dipaksa dipakai semua.
- Jangan pakai pattern kalau masalahnya belum benar-benar muncul (_"you aren't gonna need it"_) — pattern yang dipaksakan bikin kode lebih rumit, bukan lebih baik.
- Factory cocok kalau logika pembuatan object bervariasi/kompleks.
- Singleton pakai hati-hati, prefer dependency injection kalau project besar.
- Observer sangat cocok untuk sistem event/notifikasi (game, UI reaktif, real-time app).

## 6.5 Latihan Bab 6

1. Buat `BukuFactory.buat(tipe, data)` yang bisa menghasilkan `Buku` atau `Ebook` (dari Bab 3) tergantung `tipe`.
2. Buat class `Perpustakaan` sebagai Singleton — pastikan kalau dipanggil `new Perpustakaan()` dua kali secara langsung akan error, dan harus lewat `Perpustakaan.getInstance()`.
3. Tambahkan `EventEmitter` sederhana ke `Perpustakaan`: emit event `"bukuDipinjam"` setiap kali ada buku dipinjam, dan buat 2 observer — satu untuk log ke console, satu untuk "kirim notifikasi" (simulasi `console.log` juga tidak apa).

---

# PROJECT AKHIR — RPG Battle System

Sekarang gabungkan **semua** yang sudah dipelajari: class, inheritance, polymorphism, encapsulation, module, dan boleh selipkan 1 design pattern (misal Factory untuk membuat musuh acak).

## Requirement

1. **Class `Character`** (bisa dianggap abstrak, tidak boleh langsung di-instantiate):
   - Private field: `#hp`, `#maxHp`
   - Properti: `nama`, `attackPower`
   - Method: `attack(target)`, `takeDamage(jumlah)`, `isAlive()`, getter `hp`
2. **Class `Player extends Character`**:
   - Tambahan: `mana`, method `specialAttack(target)` (pakai mana, damage lebih besar)
   - Override `attack()` untuk pesan yang beda dari base class
3. **Class `Enemy extends Character`**:
   - Tambahan: properti `expReward`
   - Override `attack()` dengan gaya serangan berbeda
4. **Battle Loop**: function/class `Battle` yang menerima 1 `Player` dan 1 `Enemy`, jalankan turn-based sampai salah satu `isAlive()` menjadi `false`.
5. **Modul**: pisahkan `Character.js`, `Player.js`, `Enemy.js`, `Battle.js`, dan `main.js` sebagai entry point, gunakan `import`/`export`.
6. **Bonus (opsional)**: pakai `EnemyFactory` untuk generate musuh acak dengan stat berbeda (Goblin, Orc, Dragon — masing-masing beda `hp` dan `attackPower`).

## Kerangka Awal (starter code, silakan lanjutkan sendiri)

```javascript
// Character.js
export class Character {
  #hp;
  #maxHp;

  constructor(nama, hp, attackPower) {
    if (new.target === Character) {
      throw new Error("Character tidak boleh di-instantiate langsung.");
    }
    this.nama = nama;
    this.#hp = hp;
    this.#maxHp = hp;
    this.attackPower = attackPower;
  }

  get hp() {
    return this.#hp;
  }

  takeDamage(jumlah) {
    this.#hp = Math.max(0, this.#hp - jumlah);
  }

  isAlive() {
    return this.#hp > 0;
  }

  attack(target) {
    // Base behaviour - subclass WAJIB override untuk gaya masing-masing
    console.log(`${this.nama} menyerang ${target.nama}`);
    target.takeDamage(this.attackPower);
  }
}
```

```javascript
// Player.js
import { Character } from "./Character.js";

export class Player extends Character {
  constructor(nama, hp, attackPower, mana) {
    super(nama, hp, attackPower);
    this.mana = mana;
  }

  attack(target) {
    console.log(`⚔️  ${this.nama} menebas ${target.nama}!`);
    target.takeDamage(this.attackPower);
  }

  specialAttack(target) {
    const biayaMana = 15;
    if (this.mana < biayaMana) {
      console.log(`${this.nama} kehabisan mana, serang biasa saja.`);
      return this.attack(target);
    }
    this.mana -= biayaMana;
    const damage = this.attackPower * 2;
    console.log(
      `✨ ${this.nama} melancarkan SERANGAN SPESIAL ke ${target.nama}!`,
    );
    target.takeDamage(damage);
  }
}
```

_(Silakan lanjutkan `Enemy.js`, `Battle.js`, dan `main.js` sendiri berdasarkan requirement di atas — kirim hasilnya ke aku untuk aku review.)_

## Kriteria "sudah selesai dengan baik" (checklist self-review)

- [ ] `Character` tidak bisa di-instantiate langsung
- [ ] `Player` dan `Enemy` masing-masing override `attack()` dengan gaya berbeda (bukti polymorphism)
- [ ] `#hp` tidak bisa diakses/diubah langsung dari luar class (bukti encapsulation)
- [ ] `Battle` loop bisa jalan sampai salah satu kalah, tanpa infinite loop
- [ ] Semua file terpisah rapi & pakai `import`/`export` (bukti module pattern)
- [ ] Tidak ada `if (karakter instanceof Player) ... else if (karakter instanceof Enemy)` yang panjang di `Battle` — kalau ada, itu tanda kamu belum manfaatkan polymorphism dengan benar

---

## Cara Kita Lanjut

Kerjakan **Bab 1 dulu** (jangan loncat), kirim jawabanmu, aku review + kasih feedback sebelum kamu lanjut ke bab berikutnya. Kalau ada konsep yang masih ngambang, tanya aja — jangan dihafal, dipahami. 🚀
