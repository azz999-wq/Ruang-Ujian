# Ruang-Ujian

DenahUjian Pro adalah aplikasi web sederhana untuk menyusun denah tempat duduk ujian dan kartu peserta.

## Menjalankan Aplikasi

Buka `index.html` di browser, lalu pilih **Mulai Buat Denah**. Aplikasi tidak memerlukan proses build atau instalasi package. Koneksi internet diperlukan untuk memuat Tailwind CSS, Google Fonts, dan Font Awesome dari CDN.

## Membuat Denah

1. Atur kode dan nama ruang.
2. Tentukan jumlah baris dan kolom. Jumlah kolom dapat diatur dari 1 sampai 8; jumlah baris tidak dibatasi dan label berlanjut dari A-Z ke AA, AB, dan seterusnya.
3. Buka tab **Peserta** dan masukkan satu nama per baris pada kelas yang sesuai. Untuk kelas lain, gunakan format `Nama peserta | Nama kelas`. Tambahkan `| merah` atau `| red` untuk menandai status khusus.
4. Pilih metode pengurutan duduk, lalu klik **Terapkan Pembagian Meja**. Meja juga dapat diedit langsung dengan mengekliknya pada denah.

## Cetak dan Simpan

- **Cetak Denah** membuka dialog cetak browser. Kanvas pratinjau menggunakan ukuran F4; pilih ukuran kertas F4 pada dialog printer jika tersedia.
- **Kartu Peserta** mencetak semua kartu dalam tata letak dua kolom.
- **Kartu Satuan** memungkinkan pemilihan satu peserta untuk dicetak sendiri dengan ukuran kartu yang sama seperti cetak massal. Untuk menyimpan sebagai PDF, pilih **Save as PDF** pada dialog cetak.
- Logo kartu dapat diunggah dalam format PNG, JPG, atau WEBP dengan ukuran maksimal 5 MB. Logo disimpan di browser yang digunakan.

## Penyimpanan Data

Perubahan disimpan otomatis di penyimpanan lokal browser. Gunakan **Ekspor** untuk mengunduh salinan data berformat JSON dan **Impor** untuk memuatnya kembali.
