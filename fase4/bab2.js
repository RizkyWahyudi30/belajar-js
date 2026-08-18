/** BAB 2 -- CONSTRUCTOR FUNCTION & PROTOTYPE */
/**
 * 
Balik ke soal 1.2 kemarin — bikin kucing butuh 2 langkah manual: Object.create(), lalu isi property satu-satu. 
Sekarang bayangkan kamu bikin aplikasi e-commerce dan butuh bikin 500 object produk dengan struktur yang sama (nama, harga, 
stok). Kalau tiap kali harus nulis Object.create() + assign property manual, itu:

1. Repetitif — kode yang sama ditulis berkali-kali.
2. Rawan human error — gampang lupa 1 property, atau salah ketik nama property di salah satu dari 500 object itu.
3. Tidak ada "cetakan" yang jelas — tidak ada satu tempat yang bisa dibaca orang untuk tahu "seperti apa sih bentuk object 
produk yang valid itu?"

Constructor Function adalah solusi JS untuk masalah ini — sebuah "cetakan" (blueprint) yang bisa dipakai berulang-ulang untuk 
membuat banyak object dengan struktur serupa, tapi isi data berbeda-beda.

 */

/**
 * 
Teori: Constructor Function 
Constructor function itu function biasa, tapi dengan 2 konvensi khusus:

1. Namanya diawali dengan huruf besar (PascalCase) -- ini konvensi, bukan aturan wajib JS, tapi dipatuhi di seluruh industri 
supaya jelas "ini constructor, bukan function biasa"

2. Dipanggil dengan keyword new 

 */

function Produk(nama, harga, stok) {
  ((this.nama = nama), (this.harga = harga), (this.stok = stok));
}

const kopi = new Produk("Kopi", 15000, 80);
const roti = new Produk("Roti", 4500, 100);

console.log(kopi); // Produk { nama: 'Kopi', harga: 15000, stok: 80 }
console.log(roti); // Produk { nama: 'Roti', harga: 4500, stok: 100 }

/**
 * 
Apa yang sebenarnya terjadi saat new Produk(...) dipanggil?
Ini penting dipahami step-by-step, karena new itu melakukan 4 hal otomatis di belakang layar yang sering dianggap "sihir" kalau
tidak dijelaskan:

// Kalau menuliskan 
const kopi = new Produk("Kopi", 15000, 80);

// Di baliknya, JS melakukan kira-kira seperti ini:
// 1. Buat object kosong baru: {}
// 2. Sambungkan prototype object itu ke Produk.prototype
// 3. Panggil Produk(...) dengan 'this' MENUNJUK ke object baru itu
// 4. Return object itu secara otomatis (kecuali function eksplisit return object lain)

 */
