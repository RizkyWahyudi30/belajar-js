# SUB-BAB 5 — Module Pattern (import/export ES Modules)

Sejauh ini, semua kode kamu di Fase 4 kemungkinan besar ditulis dalam 1 file (atau dipisah tapi digabung lewat banyak `<script>` tag). Untuk latihan, itu tidak masalah. Tapi bayangkan aplikasi nyata dengan puluhan class (`Karakter, Ksatria, PaymentGateway, WeatherService, dst`) — kalau semua ditumpuk di 1 file, itu akan jadi ribuan baris kode yang susah dinavigasi, dan risiko nama variable/class bentrok (ingat masalah "variable global" dari Fase 1-2) makin besar.

Module menyelesaikan ini: setiap file JS jadi "unit mandiri" dengan scope-nya sendiri. Kamu eksplisit menyatakan apa yang mau "dibagikan" ke file lain (export), dan file lain eksplisit mengambil apa yang dia butuhkan (import).

## Teori: `export` dan `import` Dasar

Named Export — Membagikan Beberapa Hal dari 1 File

```js
// file: karakter.js
export class Karakter {
  constructor(nama, hp) {
    this.nama = nama;
    this.hp = hp;
  }
}

export class Ksatria extends Karakter {
  serang(target) {
    target.hp -= this.damage;
  }
}

export const DAMAGE_DASAR = 10; // bisa export variable/konstanta juga, bukan cuma class
```

```js
// file: main.js
import { Karakter, Ksatria, DAMAGE_DASAR } from "./karakter.js";

const ksatria = new Ksatria("Arthur", 100);
console.log(ksatria);
```

Aturan pentingnya:

- Nama di dalam { } saat import harus persis sama dengan nama yang di-export (bisa banyak sekaligus, dipisah koma).
- Path ("./karakter.js") wajib pakai ./ di depan untuk file lokal (beda dari require() versi lama Node.js yang lebih fleksibel).

Default Export — Membagikan 1 Hal Utama dari File

```js
// file: weatherService.js
export default class WeatherService {
  async cuacaKota(nama) {
    /* ...  */
  }
}
```

```js
// file: main.js
import WeatherService from "./weatherService.js";

const service = new WeatherService();
```

📌 Kapan pakai yang mana? Kalau file itu punya 1 hal utama yang jadi "inti" file tersebut (misal 1 class besar), pakai export default. Kalau file itu berisi beberapa hal terkait yang sama pentingnya (misal kumpulan helper function, atau beberapa class terkait seperti Karakter/Ksatria/Penyihir), pakai named export. Boleh juga dicampur dalam 1 file.

## Contoh Dunia Nyata: Struktur Project RPG yang Dipecah per File

Ini persis pola yang akan kamu pakai di project final nanti:

```
project/
├── index.html
├── main.js
├── characters/
│   ├── Karakter.js
│   ├── Ksatria.js
│   └── Penyihir.js
└── utils/
    └── helpers.js

```

```js
// characters/Karakter.js
export default class Karakter {
  constructor(nama, hp) {
    this.nama = nama;
    this.hp = hp;
  }
  infoStatus() {
    return `${this.nama} - HP: ${this.hp}`;
  }
}
```

```js
// characters/Ksatria.js
import Karakter from "./Karakter.js";

export default class Ksatria extends Karakter {
  serang(target) {
    target.hp = this.damage;
  }
}
```

```js
// main.js
import Ksatria from "./characters/Ksatria.js";
import Penyihir from "./characters/Penyihir.js";

const pasukan = [new Ksatria("Arthur", 100), new Penyihir("Leona", 100)];
```

📌 Dengan struktur ini, kalau kamu mau cari/edit logic Ksatria, kamu langsung buka characters/Ksatria.js — tidak perlu scroll ribuan baris di 1 file raksasa. Ini jauh lebih maintainable untuk project yang berkembang.

## ⚠️ Penting: Cara Menjalankan ES Modules di Browser Butuh Setup Khusus

Ini yang paling sering bikin pemula frustrasi — kode `import/export` tidak akan jalan kalau kamu cuma buka file HTML langsung dari file explorer (`file:///...`), dan tidak akan jalan kalau `<script>` tidak diberi tahu bahwa ini module.

1. Wajib tambahkan type="module" di tag <script>:

```js
<scipt type="module" src="main.js"></scipt>
```

Tanpa `type="module"`, browser akan error `SyntaxError: Cannot use import statement outside a module`.

2. Wajib diakses lewat server (`http://`), bukan `file://`

Module punya aturan keamanan CORS yang memblokir akses langsung dari file system. Solusinya: pakai Live Server (ekstensi VS Code) atau server lokal sederhana lainnya — jangan double-click file HTML langsung.

3. Kalau pakai Node.js (bukan browser), butuh setting di package.json:

```js
{
  "type": "module"
}
```

Tanpa ini, Node.js menganggap file `.js` kamu pakai sistem module yang lebih lama (`CommonJS, require/module.exports`), bukan ES Modules (`import/export`).

## Perbandingan: ES Modules vs CommonJS (Sering Bikin Bingung)

Kamu mungkin pernah lihat kode Node.js lama pakai gaya berbeda:

```js
// CommonJS (gaya LAMA, dipakai default di Node.js sebelum ada setting khusus)
const fs = require("fs");
module.exports = MyClass;
```

```js
// ES Modules (gaya MODERN, dipakai di browser dan Node.js versi baru dengan setting yang tepat)
import fs from "fs";
export default MyClass;
```

📌 Keduanya tidak bisa dicampur langsung dalam 1 file tanpa konfigurasi khusus. Untuk latihan Fase 4 ini, fokus ke ES Modules (import/export) karena itu standar modern yang dipakai di browser dan hampir semua tooling frontend (React, Vue, dll) sekarang.

## Module Pattern Sebelum ES6 Ada — Sedikit Sejarah (Biar Paham Konteks)

Sebelum `import/export` resmi ada di JS (sebelum ES6), orang mensimulasikan "module" pakai closure — ingat konsep ini dari Fase 1!

```js
// Pola lama, disebut "IIFE Module Pattern" (Immediately Invoked Function Expression)
const CounterModule = (function () {
  let count = 0; // private, tidak bisa diakses dari luar IIFE ini

  return {
    increment: function () {
      count++;
      return count;
    },
    reset: function () {
      count = 0;
    },
  };
})();

console.log(CounterModule.increment()); // 1
console.log(CounterModule.count); // undefined -> 'count' aman tersembunyi di closure
```

📌 Ini pembuktian nyata kenapa closure di Fase 1 kamu itu penting — sebelum JS punya module system resmi, closure-lah yang dipakai untuk mensimulasikan enkapsulasi/private data di level "module". import/export modern pada dasarnya menyelesaikan masalah yang sama, tapi dengan cara yang lebih terstruktur dan didukung langsung oleh bahasa (dan tooling seperti bundler).

```js
// file.js
export default class Foo {}
export const BAR = 123;
```

```js
import Foo, { BAR } from "./file.js"; // benar: default TANPA kurung, named DENGAN kurung, dipisah koma
```

3. Circular import (2 file saling import satu sama lain)

```js
// a.js
import { b } from "./b.js";
export const a = "A";
```

```js
// b.js
import { a } from "./a.js"; // ⚠️ saling bergantung, bisa menyebabkan salah satu jadi 'undefined'
export const b = "B";
```

Ini bug yang cukup halus — biasanya menandakan ada masalah desain (2 module yang terlalu saling bergantung). Solusinya biasanya memecah bagian yang dibutuhkan bersama ke file ketiga yang netral.
