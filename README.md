# Ruang-Ujian

DenahUjian Pro adalah aplikasi web sederhana untuk menyusun denah tempat duduk ujian dan kartu peserta.

## Menjalankan Aplikasi

Buka `index.html` di browser, lalu pilih **Mulai buat denah** atau **Buka aplikasi**. Beranda menampilkan pratinjau contoh denah sebelum masuk ke generator. Aplikasi tidak memerlukan proses build atau instalasi package. Koneksi internet diperlukan untuk memuat Google Fonts dan Font Awesome dari CDN.

## Membuat Denah

1. Atur kode dan nama ruang.
2. Pilih orientasi kanvas **Potret** atau **Lanskap**. Orientasi yang dipilih juga digunakan saat mencetak denah.
3. Tentukan jumlah baris dan kolom. Jumlah kolom dapat diatur dari 1 sampai 8; jumlah baris tidak dibatasi dan label berlanjut dari A-Z ke AA, AB, dan seterusnya.
4. Aktifkan atau sembunyikan meja pengawas, pilih posisinya di depan kelas (kiri, tengah, atau kanan), dan tampilkan dengan warna biru.
5. Buka tab **Peserta** dan masukkan satu nama per baris pada kelas yang sesuai. Untuk kelas lain, gunakan format `Nama peserta | Nama kelas`. Tambahkan `| merah` atau `| red` untuk menandai status khusus.
6. Pilih metode pengurutan duduk, lalu klik **Terapkan Pembagian Meja**. Metode **Acak, kelas tidak bersebelahan** mengacak peserta dan berusaha memastikan peserta dengan kelas yang sama tidak duduk berdampingan secara horizontal maupun vertikal. Meja juga dapat diedit langsung dengan mengekliknya pada denah.

## Cetak dan Simpan

- Menu **Cetak** mengelompokkan aksi cetak denah, semua kartu peserta, dan kartu satuan di header generator. **Cetak Denah** membuka dialog cetak browser dengan orientasi F4 sesuai mode kanvas. Untuk menyimpan denah sebagai PDF, pilih **Save as PDF** pada dialog tersebut.
- **Kartu Peserta** mencetak hingga delapan kartu per halaman F4 dalam tata letak dua kolom, dengan margin samping 10 mm agar tidak terpotong. Setiap kartu memuat kelas, nomor kursi, area tanda tangan pengawas untuk lima hari, dan watermark logo opsional.
- **Kartu Satuan** menyediakan pencarian berdasarkan nama, kelas, atau nomor kursi sebelum mencetak satu peserta dengan ukuran kartu yang sama seperti cetak massal. Untuk menyimpan sebagai PDF, pilih **Save as PDF** pada dialog cetak.
- Tidak ada logo bawaan. Logo kartu dapat diunggah sendiri dalam format PNG, JPG, atau WEBP dengan ukuran maksimal 5 MB; logo disimpan di browser yang digunakan.

## Penyimpanan Data

Perubahan disimpan otomatis di penyimpanan lokal browser. Gunakan **Ekspor** untuk mengunduh salinan data berformat JSON dan **Impor** untuk memuatnya kembali.
