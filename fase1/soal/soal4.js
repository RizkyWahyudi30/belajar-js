/** (ARRAY METHOD -- GABUNGAN) */
// Diberikan array berikut:

const products = [
  { name: "Laptop", price: 12000000, stock: 5 },
  { name: "Mouse", price: 150000, stock: 0 },
  { name: "Keyboard", price: 350000, stock: 10 },
];

// Buat kode untuk:
// (a) filter produk yang stoknya > 0,
// (b) dari hasil itu, hitung total value (price * stock dijumlahkan semua) pakai reduce.

// kode (a)
const filterProduct = products.filter((prod) => prod.stock > 0);
console.log(filterProduct);

// kode (b)
const totalValueProduct = filterProduct.reduce(
  (accumulator, currentVal) =>
    accumulator + currentVal.price * currentVal.stock,
  0,
);
console.log(totalValueProduct); // 63500000
