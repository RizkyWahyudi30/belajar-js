BELAJAR JAVASCRIPT

FASE 1 -> VARIABLE, DATA TYPE, FUNCTION, SCOPE

- Variabel & tipe data: let, const, var (dan kenapa hindari var), primitive vs reference type, type coercion
- Operator & control flow: comparison (== vs ===), logical operator, if/else, switch, ternary
- Function: function declaration vs expression vs arrow function, parameter default, rest/spread, scope & closure (ini krusial, banyak yang skip)
- Array & Object: method-method penting (map, filter, reduce, forEach, destructuring, spread operator)
- this keyword: konsep yang paling sering bikin bingung, harus dipahami sebelum masuk OOP

Project fase ini: bikin "Expense Tracker" sederhana di console — input array transaksi, lalu hitung total, filter berdasarkan kategori, dan cari transaksi terbesar pakai reduce/filter. Targetnya: lancar mikir functional dengan array method.

FASE 2 -> MANIPULASI HALAMAN, INTERAKSI USER

- DOM selection & manipulation (querySelector, classList, createElement)
- Event handling (addEventListener, event bubbling, event delegation)
- Form handling & validation sederhana
- LocalStorage untuk persist data [Next belajar IndexedDB]

Project: To-Do List dengan localStorage (data nggak hilang saat refresh). Ini project klasik tapi efektif buat melatih DOM + event.

FASE 3 -> PROMISE, ASYNC / AWAIT, FETCH API

- Callback → Promise → async/await (pahami evolusinya, bukan cuma syntax akhirnya)
- fetch API & konsumsi REST API publik
- Error handling (try/catch)
- Event loop dasar (kenapa JS itu "single-threaded tapi non-blocking")

Project: Weather App atau Movie Search App pakai API publik (OMDb, OpenWeather). Ini melatih async + DOM bersamaan.

FASE 4 -> OOP, CLASS, PROTOTYPE, MODUL, PATTERN

- Object literal & cara JS sebenarnya berbasis prototype (bukan class murni seperti Java)
- Constructor function & prototype (pahami ini dulu sebelum syntax class, supaya nggak cuma hafal sintaks)
- class syntax (ES6): constructor, method, get/set
- 4 pilar OOP diterapkan di JS: encapsulation, inheritance (extends, super), polymorphism, abstraction
- Module pattern: import/export (ES Modules)
- Sedikit design pattern umum: Factory, Singleton, Observer (cukup kenal konsepnya)

Project: Library Management System atau Simple Game (RPG battle system) berbasis class — ada class Character, Player extends Character, Enemy extends Character, dengan method battle/attack. Project ini "memaksa" kamu pakai inheritance & polymorphism secara natural.

FASE 5 -> GIT, TESTING, BUILD, DEPLOY

- Git & GitHub (commit, branch, push project ke portofolio)
- Module bundler dasar (Vite)
- Testing dasar (Jest — opsional tapi value tinggi)
- Deploy ke Netlify/Vercel/GitHub Pages
