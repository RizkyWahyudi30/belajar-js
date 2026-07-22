/** (FUNCTION & DEFAULT PARAMETER) */
// Buat function createInvoice(itemName, price, qty = 1) yang return object { itemName, price, qty, total }
// dimana total = price * qty.

function createInvoice(itemName, price, qty = 1) {
  let total = price * qty;
  return { itemName, price, qty, total };
}

console.log(createInvoice("Laptop", 11000000));
// { itemName: 'Laptop', price: 11000000, qty: 1, total: 11000000 }
// { itemName: 'Laptop', price: 11000000, qty: 3, total: 33000000 }
