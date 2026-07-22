const transactions = [
  { id: 1, description: "Makan siang", category: "makanan", amount: 45000 },
  {
    id: 2,
    description: "Grab ke kantor",
    category: "transport",
    amount: 32000,
  },
  { id: 3, description: "Kopi Starbucks", category: "makanan", amount: 65000 },
  { id: 4, description: "Token listrik", category: "tagihan", amount: 150000 },
  { id: 5, description: "Indomaret", category: "makanan", amount: 28000 },
  { id: 6, description: "Bensin", category: "transport", amount: 80000 },
  { id: 7, description: "Netflix", category: "tagihan", amount: 54000 },
  { id: 8, description: "Makan malam", category: "makanan", amount: 72000 },
];

// Fitur 1
let total_transaksi = transactions.reduce((sum, data) => sum + data.amount, 0);
console.log(`Total pengeluaran: Rp ${total_transaksi.toLocaleString("id-ID")}`);
// Output: Total pengeluaran: Rp 526.000

// Fitur 2
function getByCategory(transactions, category) {
  let filter_transactions = transactions.filter(
    (data) => data.category === category,
  );

  console.log(`Transaksi kategori ${category}`);
  filter_transactions.forEach((data) =>
    console.log(
      `- ${data.description}: Rp ${data.amount.toLocaleString("id-ID")}`,
    ),
  );
}

getByCategory(transactions, "makanan");
// Transaksi kategori makanan
// - Makan siang: Rp 45.000
// - Kopi Starbucks: Rp 65.000
// - Indomaret: Rp 28.000
// - Makan malam: Rp 72.000

// Fitur 3
let transaksi_terbesar = transactions.reduce((accAmount, currAmount) => {
  return accAmount.amount > currAmount.amount ? accAmount : currAmount;
});
console.log(
  `Pengeluaran terbesar: ${transaksi_terbesar.description} (Rp ${transaksi_terbesar.amount})`,
);

// Fitur 4
function totalByCategory(productTransaction) {
  let totals = productTransaction.reduce((acc, currProd) => {
    // kategori product
    let category_product = currProd.category;

    // jika kategori belum ada dalam object acc, buat baru dengan nilai 0;
    if (!acc[category_product]) {
      acc[category_product] = 0;
    }

    // tambahkan amount ke kategori yang sesuai
    acc[category_product] += currProd.amount;

    return acc;
  }, {}); // nilai awal adalah objek kosong {}

  console.log("Ringkasan per kategori");
  for (let category in totals) {
    console.log(
      `- ${category}: Rp ${totals[category].toLocaleString("id-ID")}`,
    );
  }
}
totalByCategory(transactions);
// Ringkasan per kategori
// - makanan: Rp 210.000
// - transport: Rp 112.000
// - tagihan: Rp 204.00
