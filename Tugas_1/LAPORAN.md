# Laporan Proyek: Kalkulator pH Interaktif

**Mata Kuliah:** Front-End Programming

**Anggota Kelompok:**
- Filbert Ferdinand (535240135)
- Angelo Ardiana Wijaya (535240018)

---

## 1. Latar Belakang dan Tujuan Proyek

Projek ini dibuat untuk melakukan perhitungan pH secara realtime dan juga interaktif, di mana seorarng user dapat langsung mengkalkulasikan nilai pH dengan menambahkan data input yang diminta dan hasilnya akan langsung dikeluarkan. Selain itu, kelebihan dari kalkulator ini mampu untuk langsung mengganti hasil dari nilai pH seandainya nilai data tersebut diubah secara real-time

---

## 2. Desain dan Arsitektur Aplikasi

Berikut adalah arsitektur dari aplikasi kami:

### a. Struktur HTML (`index.html`)
Struktur utama halaman dibagi menjadi dua bagian besar
- **`.ph-calculator`**: Berisi semua elemen input, yakni pilihan jenis larutan (asam/basa kuat/lemah), metode input (massa dan volume atau konsentrasi), dan form untuk menerima nilai input tersebut, serta kontainer untuk menampilkan hasil perhitungan pH, deskripsi pH, dan juga nilai pOH.
- **`.instruction-panel`**: Panel ini berada di sebelah kanan untuk menampilkan panduan cara menggunakan kalkulator kami dan dasar teori perhitungan yang digunakan dalam perhitungan atau logika dari projek ini

### b. Styling (CSS) (`style.css`)
Dalam melakukan styling, kami menggunakan beberapa hal yang menjadi fondasi utama untuk website kami:
- **Flexbox**: Untuk menciptakan tata letak dua kolom yang responsif (pada layar komputer, kalkulator berada di sisi kiri dan instruction panel berada di kanan)
- **Color**: Kami menggunakan warna yang cukup terang untuk elemen-elemen utama kami, ditujukan agar user lebih tertarik saat menggunakan kalkulatornya
- **Desain Responsif**: Menggunakan `flex-wrap` dan `min-width` agar website tetap ramah untuk berbagai jenis perangkat, baik handphone, tablet, maupun laptop sekalipun

### c. JavaScript (`index.js`)
Logika aplikasi dirancang secara modular agar mudah dibaca dan dikelola. Alur kerja utamanya adalah sebagai berikut:
1.  **Event Listener**: Semua elemen input diberi `event listener` (`change` dan `input`) untuk memicu kalkulasi secara real-time.
2.  **`updateUI()`**: Fungsi ini bertanggung jawab untuk menampilkan/menyembunyikan form input yang berdasarkan pilihan pengguna (misalnya, menampilkan input Ka/Kb hanya untuk asam/basa lemah atau valensi hanya untuk asam/basa kuat).
3.  **`calculateAllAndDisplay()`**: Ini adalah fungsi utama yang mengorkestrasi seluruh proses:
    - `getInputs()` untuk mengumpulkan semua nilai dari form.
    - `getMolarity()` untuk menghitung konsentrasi.
    - `calculatePh()` untuk melakukan pH dari larutan, berdasarkan nilai `getInputs()` dan `getMolarity()`.
    - `displayResult()` untuk menampilkan hasil ke layar, lengkap dengan deskripsi dan warna dari deskripsinya.
4.  **Validasi Input**: Kami menambahkan logika `if-else` di dalam `calculateAllAndDisplay` untuk memeriksa apakah terdapat input yang kurang, sekaligus memberikan instruksi untuk mengisi nilai yang kurang tersebut pada bagian hasil.

---

## 3. Kesimpulan

Proyek Kalkulator pH ini berhasil dikembangkan sebagai sebuah aplikasi web yang fungsional, interaktif, dan edukatif. Dengan arsitektur kode yang cili[ modular dan desain yang berpusat pada pengguna, diharapkan aplikasi ini tidak hanya berguna untuk membantu proses perhitungan tapi juga mampu meningkatkan proses pembelajaran lewat fitur perhitungan real-time yang telah kami siapkanmemberikan pengalaman belajar yang positif.
