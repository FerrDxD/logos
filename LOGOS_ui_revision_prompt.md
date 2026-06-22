# PROJECT BRIEF: LOGOS — Revisi UI/UX v2

> Prompt lanjutan untuk merevisi tampilan LOGOS yang sudah ada. Fokus: mengganti navigasi statis menjadi navigasi orbital, dan mengganti palet warna dari dark-glossy menjadi clean-luxury.

---

## KONTEKS

LOGOS adalah direktori personal untuk menyimpan pasangan prompt + output AI (lihat brief v1). Versi saat ini sudah berjalan dengan tema dark mode, tapi terasa generik ("template AI" look) dan secara filosofis kontradiktif — LOGOS seharusnya terasa tenang, filosofis, dan personal, bukan seperti dashboard tech-startup bertema neon.

Revisi ini menyasar dua hal: **pola navigasi** dan **palet warna**. Tidak ada perubahan pada struktur data atau fitur inti — ini murni revisi presentasi (UI/UX layer).

---

## 1. NAVIGASI ORBITAL (Inspirasi Pola Interaksi, BUKAN Visual)

**Inspirasi konseptual:** Pola interaksi radial/orbital seperti yang ditemukan pada hub navigasi game (misal: menu yang mengorbit di sekitar titik pusat, bukan navbar linear konvensional). **PENTING: Ini HANYA mengambil pola UX/pola interaksi. Seluruh elemen visual — warna, ikon, tipografi, motif, efek — harus 100% original milik LOGOS dan TIDAK BOLEH mereferensikan, meniru, atau menyerupai aset visual dari IP/game manapun.** Tidak ada penggunaan istilah, nama karakter, atau elemen grafis dari game tersebut di mana pun dalam kode atau komentar.

**Konsep penerapan di LOGOS:**
- Elemen pusat (center hub) merepresentasikan **LOGOS sendiri** — bisa berupa logo/wordmark "LOGOS" yang diam di tengah sebagai titik fokus, melambangkan "prinsip inti" dari mana segala gagasan berasal (sesuai filosofi nama Logos = prinsip dasar).
- Mengorbit di sekeliling pusat: **kategori/tag utama** atau **shortcut aksi utama** (misal: "Entry Baru", "Cari", "Semua Tag", "Filter AI Tool") — ditampilkan sebagai node-node melingkar yang tersusun di sekitar pusat, bukan sebagai navbar horizontal di atas.
- Saat salah satu node orbital di-hover/klik, beri micro-interaction halus: node tersebut sedikit membesar/menonjol, dengan garis penghubung tipis ke pusat (menyiratkan "semua jalan berawal dari logos").
- Halaman utama (landing/dashboard) menggunakan layout ini sebagai pengganti hero section + navbar konvensional. Untuk halaman detail entry atau form, navigasi orbital ini bisa diringkas menjadi versi kecil di pojok (misal sebagai floating action button orbital) agar tidak mengganggu fokus pada konten.
- Animasi orbit sangat halus dan lambat (jika ada elemen yang benar-benar berputar) — JANGAN membuat node-node berputar terus-menerus secara mengganggu. Gerakan harus terasa "bernapas", tenang, bukan dinamis-energetik.

---

## 2. PALET WARNA BARU: Clean Luxury (Krem-Putih + Gold)

Ganti total tema dark-glossy/neon saat ini dengan palet berikut:

**Light mode (default/utama):**
- Background utama: putih hangat / krem sangat muda (contoh: `#FAF7F2` atau `#FDFBF7`)
- Permukaan kartu/elemen: putih bersih dengan sedikit warm undertone (contoh: `#FFFFFF` atau `#FEFCF9`), dibedakan dari background lewat shadow halus, bukan border tebal
- Teks utama: charcoal gelap hangat, BUKAN hitam pekat (contoh: `#2A2724`)
- Teks sekunder/muted: abu-abu hangat (contoh: `#8A8378`)
- **Accent (gold tipis):** gunakan SANGAT selektif — hanya untuk elemen interaktif kunci (link aktif, border node orbital saat hover, garis pembatas tipis, ikon penting). Contoh warna: `#B8965E` atau `#C9A876` (gold pudar, bukan gold mengilap/metalik). Gold ini TIDAK dipakai sebagai warna background besar, hanya sebagai garis, teks aksen, atau detail kecil.
- Border/divider: abu sangat muda dengan undertone hangat (contoh: `#E8E2D8`), tipis (1px), bukan elemen yang mencolok

**Dark mode (opsional, sebagai alternatif tetap harus tersedia):**
- Background: charcoal hangat gelap (contoh: `#1C1A17`), BUKAN hitam pekat atau abu kebiruan
- Permukaan kartu: sedikit lebih terang dari background (contoh: `#252220`)
- Teks utama: krem pudar (contoh: `#EDE8DF`)
- Accent gold tetap sama, tapi sedikit lebih terang untuk kontras (contoh: `#D4B483`)
- **Hindari sama sekali:** glossy effect, gradient neon, glow/shadow berwarna biru-ungu-cyan, efek glassmorphism yang berat. Dark mode di sini harus tetap terasa "tenang dan elegan", bukan "futuristik/cyberpunk".

**Prinsip keseluruhan:**
- Kontras warna harus tetap memenuhi standar aksesibilitas (WCAG AA minimum untuk teks).
- Gold accent adalah elemen LANGKA dan ISTIMEWA dalam desain — jika semua hal diberi warna gold, dia akan kehilangan makna sebagai penekanan. Gunakan dengan disiplin (aturan praktis: gold hanya muncul di <10% elemen visual pada satu layar).
- Tipografi serif untuk heading (yang sudah ditetapkan di brief v1) harus tetap dipertahankan dan justru akan terlihat lebih elegan dengan palet baru ini.

---

## CATATAN IMPLEMENTASI

- Update CSS custom properties / Tailwind config yang sudah ada untuk merefleksikan palet baru — jangan buat sistem warna baru dari nol jika struktur sebelumnya bisa diadaptasi.
- Navigasi orbital sebaiknya diimplementasikan sebagai komponen React terpisah (misal `OrbitalNav.tsx`) yang reusable, dengan posisi node dihitung menggunakan trigonometri sederhana (sin/cos) berdasarkan jumlah node dan radius yang ditentukan, agar mudah menambah/mengurangi jumlah node di kemudian hari.
- Pastikan navigasi orbital tetap dapat diakses dengan baik di mobile — pada layar kecil, boleh fallback ke navigasi vertikal sederhana (tetap dengan styling clean-luxury yang sama) alih-alih memaksakan orbit yang terlalu padat.
- Tidak perlu mengubah struktur database, schema, atau logic fitur — murni perubahan pada layer presentasi (komponen UI, styling, layout halaman utama).

---

**Akhir dari brief revisi.** Tujuan akhir: LOGOS terasa seperti "ruang berpikir" yang tenang dan personal — bukan dashboard SaaS generik — dengan satu titik fokus sentral yang merepresentasikan prinsip dasarnya sendiri.
