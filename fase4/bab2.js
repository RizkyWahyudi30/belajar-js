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
