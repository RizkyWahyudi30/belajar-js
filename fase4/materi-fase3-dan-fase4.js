// SUB-BAB 3.5 — Menggabungkan class dengan Async/Await, Promise, dan Fetch API

/** Teori: Method di Dalam Class Bisa Jadi Async */
/**

Ini sebenarnya sederhana — method biasa di dalam class bisa ditandai async, persis seperti function biasa yang kamu pelajari di Fase 3. 
Bedanya cuma konteksnya sekarang di dalam class.

*/

class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async ambilData(endpoint) {
    const response = await fetch(`${this.baseURL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP Error! status: ${response.status}`);
    }

    return await response.json();
  }
}

const Api = new ApiService("https://jsonplaceholder.typicode.com");
// Api.ambilData("/users/1").then((data) => console.log(data));

/**
Perhatikan: ambilData di sini return Promise (karena async), jadi cara memakainya dari luar tetap sama seperti function 
async biasa — bisa pakai .then(), atau await kalau dipanggil dari dalam function async lain.

 */

// versi yang menggunakan try/catch di dalam nya
class ApiService2 {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async ambilData(endpoint) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status:`, response.status);
      }

      return await response.json();
    } catch (error) {
      // menangkan network error
      console.log("Gagal melakukan permintaan API:", error.message);

      // melempar kembali error agar pihak pemanggil tahu ada masalah
      throw error;
    }
  }
}

// cara memanggil nya dengan try/catch di dalam class
const Api2 = new ApiService2("https://jsonplaceholder.typicode.com");

async function jalankanService() {
  try {
    const data = await Api2.ambilData("/users/1");
    console.log(`Data berhasil diambil:`, data);
  } catch (err) {
    console.log("Penanganan error di level aplikasi:", err.message);
  }
}

// jalankanService();

/** Kenapa Digabung dengan Class? Apa Untungnya? */
/**
Kalau cuma butuh 1 kali fetch, class terasa berlebihan. Tapi begitu kamu punya beberapa endpoint terkait yang berbagi 
konfigurasi yang sama (base URL, header, API key, dsb), class jadi cara yang rapi untuk mengelompokkan logic yang 
berkaitan — ini pola yang sangat umum di dunia nyata, biasa disebut API Service/Repository Pattern.

 */

class WeatherService {
  constructor() {
    this.geocodingUrl = "https://geocoding-api.open-meteo.com/v1/search";
    this.forecastUrl = "https://api.open-meteo.com/v1/forecast";
  }

  async cariKoordinat(namaKota) {
    const response = await fetch(
      `${this.geocodingUrl}?name=${namaKota}&count=1`,
    );

    if (!response.ok) {
      throw new Error("Gagal menghubungi server geocoding");
    }

    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      throw new Error(`Kota "${namaKota}" tidak ditemukan`);
    }

    const lokasi = data.results[0];
    return {
      latitude: lokasi.latitude,
      longitude: lokasi.longitude,
      nama: lokasi.name,
    };
  }

  async ambilCuaca(latitude, longitude) {
    const url = `${this.forecastUrl}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Gagal mengambil data cuaca");
    }

    const data = await response.json();
    return data.current;
  }

  // method gabungan — orkestrasi 2 langkah di atas jadi 1 pemanggilan
  async cuacaKota(namaKota) {
    const lokasi = await this.cariKoordinat(namaKota);
    const cuaca = await this.ambilCuaca(lokasi.latitude, lokasi.longitude);
    return { kota: lokasi.nama, ...cuaca };
  }
}

const weatherService = new WeatherService();

async function main() {
  try {
    const hasil = await weatherService.cuacaKota("Jakarta");
    console.log(hasil);
  } catch (err) {
    console.log("Error:", err.message);
  }
}

main();

/**
📌 Perhatikan bagaimana cuacaKota() memanggil method lain di class yang sama lewat this.cariKoordinat(...) dan 
this.ambilCuaca(...) — ini pola orkestrasi yang sama persis dengan yang kamu rencanakan di project Weather App Fase 3 
kemarin, cuma sekarang dibungkus rapi sebagai method-method dalam 1 class, bukan function lepas-lepas.

*/
