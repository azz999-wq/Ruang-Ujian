# Ruang-Ujian

DenahUjian Pro adalah aplikasi web sederhana untuk menyusun denah tempat duduk ujian dan kartu peserta.

## Menjalankan Aplikasi

Buka `https://azz999-wq.github.io/Ruang-Ujian` di browser, lalu pilih **Mulai buat denah** atau **Buka aplikasi**. Beranda menampilkan pratinjau denah sebelum masuk ke generator. Generator dimulai dengan denah kosong; masukkan peserta sendiri atau impor data JSON. Aplikasi tidak memerlukan proses build atau instalasi package. Koneksi internet diperlukan untuk memuat Google Fonts dan Font Awesome dari CDN.

## Membuat Denah

1. Atur kode dan nama ruang.
2. Pilih orientasi kanvas **Potret** atau **Lanskap**. Orientasi yang dipilih juga digunakan saat mencetak denah.
3. Tentukan jumlah baris dan kolom. Jumlah kolom dapat diatur dari 1 sampai 8; jumlah baris tidak dibatasi dan label berlanjut dari A-Z ke AA, AB, dan seterusnya.
4. Aktifkan atau sembunyikan meja pengawas, pilih posisinya di depan kelas (kiri, tengah, atau kanan), dan tampilkan dengan warna biru.
5. Buka tab **Peserta**, lalu pilih **Kelas Sekolah** atau **Kelas Pengajian**. Di Kelas Sekolah, pilih **SMP** (kelas 7-9), **SMA** (kelas 10-12), atau **SMK**; untuk SMK, tambahkan jurusan lalu isi peserta per tingkat kelas 10-12. Kelas Pengajian memuat SP sampai 4 Tsanawi. Untuk kelas lain, gunakan format `Nama peserta | Nama kelas`. Tambahkan `| merah` atau `| red` untuk menandai status khusus. Ringkasan di atas denah menunjukkan kursi tersedia dan nama peserta yang belum kebagian jika daftar melebihi kapasitas; tambah baris atau kolom jika diperlukan.
6. Pilih metode pengurutan duduk, lalu klik **Terapkan Pembagian Meja**. Metode **Acak, kelas tidak bersebelahan** mengacak peserta dan berusaha memastikan peserta dengan kelas yang sama tidak duduk berdampingan secara horizontal maupun vertikal. Meja juga dapat diedit langsung dengan mengekliknya pada denah.

## Cetak dan Simpan

- Tombol **Cetak** di header generator membuka pilihan untuk mencetak denah, semua kartu peserta, atau satu kartu peserta. **Cetak Denah** membuka dialog cetak browser dengan orientasi F4 sesuai mode kanvas. Untuk menyimpan denah sebagai PDF, pilih **Save as PDF** pada dialog tersebut.
- **Kartu Peserta** mencetak hingga delapan kartu per halaman F4 dalam tata letak dua kolom, dengan margin samping 10 mm agar tidak terpotong. Tombol **Edit Kartu Peserta** di panel **Ruangan & Grid**, tepat di atas pengaturan logo kartu, mengatur judul kartu, jumlah hari ujian (1-10), judul tanda tangan, dan catatan kartu; pengaturan berlaku untuk cetak massal maupun satuan. Setiap kartu memuat kelas, nomor kursi, dan watermark logo opsional.
- **Kartu Satuan** menyediakan pencarian berdasarkan nama, kelas, atau nomor kursi sebelum mencetak satu peserta dengan ukuran kartu yang sama seperti cetak massal. Untuk menyimpan sebagai PDF, pilih **Save as PDF** pada dialog cetak.
- Tidak ada logo bawaan. Logo kartu dapat diunggah sendiri dalam format PNG, JPG, atau WEBP dengan ukuran maksimal 5 MB; logo disimpan di browser yang digunakan.

## Penyimpanan Data

Perubahan disimpan otomatis di penyimpanan lokal browser. Gunakan **Ekspor** untuk mengunduh salinan data berformat JSON dan **Impor** untuk memuatnya kembali.
