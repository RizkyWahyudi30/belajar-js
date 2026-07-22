/** (TAMBAHAN -> CLOSURE - LEVEL LANJUT SEDIKIT) */

// Buat function createCounter(start = 0) yang return object dengan 3 method: increment() (nambah 1),
// decrement() (kurang 1), dan getValue() (return nilai sekarang).
// Pastikan nilai counter-nya tidak bisa diubah langsung dari luar (harus lewat method).

function createCounter(start = 0) {
  let count = start;
  return {
    // method increment (nambah 1)
    increment: function () {
      count++;
      console.log(count);
    },

    // method decrement (kurang 1)
    decrement: function () {
      count--;
      console.log(count);
    },

    // method getValue (return nilai sekarang)
    getValue: function () {
      // console.log(count);
      return count;
    },
  };
}

const valCounter = createCounter(10);
valCounter.increment(); // 11
valCounter.decrement(); // 10
console.log(valCounter.getValue()); // 10

// const value = valCounter.getValue(); // 10
// console.log(value); // undefined
