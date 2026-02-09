# Game Boy Birthday Gift 🎮💕

Website interaktif dengan tema Game Boy untuk ulang tahun Fazrina yang ke-17.

## Fitur

- 🎂 **Loading Screen** - Animasi loading dengan tema Game Boy
- 💌 **Message** - Pesan personal untuk Fazrina
- 🎨 **Gallery** - Pixel art heart dengan pesan romantis
- 🎵 **Music Player** - 3 lagu pilihan dengan Spotify embed
- 🎮 **Tetris Game** - Game Tetris dengan pesan akhir yang personal

## Cara Deploy ke GitHub Pages

1. **Buat repository baru di GitHub**
   - Buka GitHub dan buat repository baru
   - Nama repository bisa bebas (contoh: `gameboy-birthday-gift`)

2. **Upload file ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO_NAME.git
   git push -u origin main
   ```

3. **Aktifkan GitHub Pages**
   - Buka repository di GitHub
   - Klik **Settings** → **Pages**
   - Di bagian **Source**, pilih **Deploy from a branch**
   - Pilih branch **main** dan folder **/ (root)**
   - Klik **Save**

4. **Akses Website**
   - Website akan tersedia di: `https://USERNAME.github.io/REPO_NAME/`
   - Tunggu beberapa menit untuk proses deploy selesai

## Cara Menggunakan di Mobile

- **Touch Controls untuk Tetris:**
  - **Swipe kiri** = Pindah kiri
  - **Swipe kanan** = Pindah kanan
  - **Swipe bawah** = Turun cepat
  - **Swipe atas** atau **Tap** = Rotate
  - Atau gunakan tombol di bawah canvas

- **Navigasi:** Gunakan tombol-tombol yang tersedia untuk navigasi antar halaman

## File Structure

```
gameboy-birthday-master/
├── index.html          # File HTML utama
├── script.js           # JavaScript untuk logika aplikasi
├── styles.css          # Styling CSS dengan tema Game Boy
├── images/            # Folder untuk foto-foto
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── ...
└── README.md          # File ini
```

## Catatan

- Pastikan semua file (HTML, CSS, JS, images) sudah di-upload ke GitHub
- Website sudah dioptimasi untuk mobile dan desktop
- Spotify embed memerlukan koneksi internet untuk memutar musik

## Teknologi

- HTML5
- CSS3 (dengan animasi dan responsive design)
- Vanilla JavaScript
- Spotify Web API (embed)

---

Made with ❤️ for Fazrina's 17th Birthday
