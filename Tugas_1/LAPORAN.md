# Laporan Proyek: Kalkulator pH Interaktif

**Mata Kuliah:** Front-End Programming
**Anggota Kelompok:**
- Filbert Ferdinand (535240135)
- Angelo Ardiana Wijaya (535240018)

---

## 1. Latar Belakang dan Tujuan Proyek

Projek ini dibuat untuk menciptakan sebuah alat bantu belajar kimia yang tidak hanya fungsional untuk menghitung pH, tetapi juga interaktif dan edukatif. Aplikasi ini dirancang untuk memudahkan pemahaman konsep asam-basa melalui simulasi perhitungan secara real-time.

---

## 2. Desain dan Arsitektur Aplikasi

Berikut adalah arsitektur dari aplikasi kami:

### a. Struktur HTML (`index.html`)
Struktur utama halaman dibagi menjadi dua bagian besar menggunakan Flexbox dalam sebuah `.main-wrapper`:
- **`.ph-calculator`**: Berisi semua elemen input (pilihan larutan, metode, dan nilai-nilai) serta kontainer untuk menampilkan hasil.
- **`.instruction-panel`**: Panel sisi yang bersifat `sticky` untuk menampilkan informasi, teori, dan panduan penggunaan agar selalu dapat diakses oleh pengguna.

### b. Styling (CSS) (`style.css`)
Pendekatan styling kami berfokus pada desain yang bersih, modern, dan fungsional. Kami tidak menggunakan CSS Framework dan membangun semuanya dari awal. Beberapa teknik utama yang digunakan:
- **Layout Flexbox**: Untuk menciptakan tata letak dua kolom yang responsif.
- **CSS Variables**: Untuk manajemen skema warna yang efisien dan konsisten.
- **Desain Responsif**: Menggunakan `flex-wrap` dan `min-width` untuk memastikan aplikasi tetap nyaman digunakan pada layar yang lebih kecil.

### c. Logika JavaScript (`index.js`)
Logika aplikasi dirancang secara modular agar mudah dibaca dan dikelola. Alur kerja utamanya adalah sebagai berikut:
1.  **Event Listener**: Semua elemen input diberi `event listener` (`change` dan `input`) untuk memicu kalkulasi secara real-time.
2.  **`updateUI()`**: Fungsi ini bertanggung jawab untuk menampilkan/menyembunyikan form input yang relevan berdasarkan pilihan pengguna (misalnya, menampilkan input Ka/Kb hanya untuk asam/basa lemah).
3.  **`calculateAllAndDisplay()`**: Ini adalah fungsi utama yang mengorkestrasi seluruh proses:
    - Memanggil `getInputs()` untuk mengumpulkan semua nilai dari form.
    - Memanggil `getMolarity()` untuk menghitung konsentrasi.
    - Memanggil `calculatePh()` untuk melakukan perhitungan inti berdasarkan jenis larutan.
    - Terakhir, memanggil `displayResult()` untuk menampilkan hasil ke layar, lengkap dengan deskripsi dan warna yang sesuai.
4.  **Validasi Input**: Logika `if-else` di dalam `calculateAllAndDisplay` secara cerdas memeriksa input yang kurang dan memberikan pesan panduan yang spesifik kepada pengguna.

---

## 3. Tantangan dan Solusi

Salah satu tantangan utama dalam proyek ini adalah menciptakan pengalaman pengguna yang mulus dan interaktif. Kami harus memastikan bahwa setiap perubahan kecil pada input langsung memicu perhitungan ulang tanpa perlu menekan tombol "hitung". 

**Solusi:** Kami mengimplementasikan `event listener` pada event `input` dan `change`. Tantangan lanjutannya adalah memberikan pesan error yang relevan saat input tidak lengkap. Ini kami selesaikan dengan membangun logika `if-else if` yang terstruktur di dalam fungsi kalkulasi utama untuk memeriksa kondisi prioritas (misalnya, cek Ka/Kb dulu, baru cek molaritas).

---

## 4. Kesimpulan

Proyek Kalkulator pH ini berhasil dikembangkan sebagai sebuah aplikasi web yang fungsional, interaktif, dan edukatif. Dengan arsitektur kode yang modular dan desain yang berpusat pada pengguna, aplikasi ini tidak hanya memenuhi semua persyaratan fungsional tetapi juga memberikan pengalaman belajar yang positif.
