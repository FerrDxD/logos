# PROJECT BRIEF: LOGOS

> Prompt ini disusun untuk dieksekusi oleh AI scaffolding tool (Google AI Studio / Gemini) sebagai bagian dari workflow Antigravity. Tujuan: menghasilkan full-stack web app yang siap dikembangkan lebih lanjut.

---

## IDENTITAS PROJECT

**Nama:** LOGOS
**Asal kata:** Yunani Kuno — "kata", "kalimat", "logika", atau "prinsip dasar/asal".
**Akronim:** Laci Optimalisasi Gagasan & Output Spesifik
**Filosofi branding:** Logos adalah akar dari logika. Project ini merepresentasikan inti dari prompting: menyusun kata dan logika yang tepat untuk menghasilkan output yang spesifik. Karakter brand: sederhana, filosofis, to-the-point. Bukan "platform" yang ramai — lebih ke "laci" personal yang tenang, seperti arsip pemikiran.

**Apa yang dibangun:**
Web app personal (single-user, tanpa autentikasi/login) untuk menyimpan dan mengarsipkan pasangan **prompt + output** yang pernah dibuat oleh pemilik (seorang prompt engineer/full-stack developer). Ini BUKAN prompt template library biasa — fokusnya adalah pencatatan hasil kerja nyata: prompt apa yang dipakai, dan apa hasil yang keluar darinya, sebagai arsip referensi di masa depan.

**Target pengguna:** Hanya pemilik sendiri (personal tool). Tidak perlu sistem login/auth sama sekali — aplikasi terbuka langsung ke fungsionalitas utama.

---

## STRUKTUR DATA

Satu entry merepresentasikan satu pasang prompt-output (relasi 1:1, tidak ada versioning/iterasi).

### Tabel: `entries`
| Field | Tipe | Keterangan |
|---|---|---|
| `id` | UUID / serial | Primary key |
| `prompt` | text | Isi prompt, bisa sangat panjang (multi-paragraf) |
| `output_text` | text, nullable | Output berupa teks (kode, scaffold, dokumen, dll) |
| `output_images` | text[] / jsonb, nullable | Array URL gambar hasil output (mendukung lebih dari satu gambar per entry) |
| `ai_tool` | varchar | Nama AI/tool yang dipakai, contoh: "Gemini", "Claude", "Suno", "Midjourney" — harus mendukung input bebas (combobox: pilih dari daftar umum ATAU ketik manual) |
| `tags` | text[] | Multi-tag bebas. Tag bisa merepresentasikan kategori umum (misal "Scaffold", "Lyrics", "Worldbuilding") MAUPUN nama project spesifik (misal "Nawasena", "ARKHE", "SENTRA", "Novel") — tidak ada pemisahan struktural antara keduanya, semua sama-sama tag |
| `created_at` | timestamp | Otomatis saat entry dibuat |
| `updated_at` | timestamp | Otomatis saat entry diedit |

**Catatan penting:** Output bersifat fleksibel — satu entry bisa punya `output_text` saja, `output_images` saja, atau kombinasi keduanya. Form harus mendukung ini secara natural, tidak memaksa salah satu field harus diisi.

---

## FITUR INTI (v1 — MVP)

1. **Tambah Entry** — Form input: prompt (textarea besar), output text (textarea/rich text), upload gambar output (multiple), pilih/ketik AI tool, tambah tags (multi-input dengan autocomplete dari tag yang sudah pernah dipakai).
2. **Daftar Entry** — Tampilan grid atau list semua entry, diurutkan dari terbaru. Setiap card menampilkan preview singkat: potongan prompt, tags, ai_tool, tanggal, dan thumbnail gambar (jika ada).
3. **Pencarian** — Search bar full-text yang mencari di dalam `prompt` dan `output_text`.
4. **Filter Tag** — Filter multi-select berdasarkan tags. Bisa dikombinasikan dengan search.
5. **Detail View** — Klik entry untuk melihat halaman detail penuh: prompt lengkap (dengan tombol copy-to-clipboard), output lengkap, galeri gambar (jika ada, dengan lightbox), semua tags, dan metadata (tool, tanggal).
6. **Edit Entry** — Bisa mengubah semua field dari entry yang sudah ada.
7. **Hapus Entry** — Dengan konfirmasi sebelum hapus permanen.

### Fitur opsional (boleh ditambahkan jika scaffold tool mengizinkan, tapi bukan prioritas v1):
- Sort tambahan (by ai_tool, by jumlah tag)
- Tampilan jumlah total entry per tag (semacam tag cloud)
- Export entry ke markdown/JSON untuk backup

---

## STACK TEKNIS

Stack ini WAJIB diikuti karena harus konsisten dengan ekosistem project lain milik pemilik:

- **Framework:** Next.js 14 (App Router)
- **Bahasa:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Database:** Neon PostgreSQL
- **ORM:** Drizzle ORM
- **File/Image storage:** Vercel Blob Storage (untuk `output_images`)
- **Deployment target:** Vercel

Tidak perlu sistem autentikasi (NextAuth, Clerk, dll) — aplikasi ini single-user tanpa login.

---

## ARAH DESAIN & UI

Karakter visual LOGOS harus terasa **filosofis, sederhana, dan tenang** — kontras dengan branding Nawasena (SENTRA) yang glassmorphism-modern-indigo. LOGOS lebih ke arah "ruang berpikir" pribadi, bukan dashboard yang ramai.

**Arahan spesifik:**
- **Tipografi:** Serif yang berkarakter untuk heading/branding (memberi kesan klasik/filosofis tanpa berlebihan), sans-serif yang bersih untuk body text dan UI. Hindari font yang terlalu playful.
- **Palet warna:** Tenang dan minim saturasi — tone netral (krem, abu hangat, hitam/charcoal) dengan satu accent color yang tenang (misal terracotta, deep blue, atau emas pudar) untuk elemen interaktif. Hindari warna-warna cerah/flashy.
- **Layout:** Banyak whitespace, grid yang rapi, hierarki tipografi yang jelas. Hindari kepadatan visual.
- **Sentuhan tematik (opsional, halus):** Boleh ada detail kecil yang mengisyaratkan tema Yunani/filosofis — misal garis horizontal sederhana seperti pembatas teks klasik, atau motif geometris minimal — tapi jangan sampai jatuh ke tema "kuil Yunani" yang norak. Subtlety adalah kuncinya.
- **Mode:** Dukung light/dark mode dengan CSS custom properties, mengikuti pola yang sudah dipakai di project lain (SENTRA).

---

## CATATAN TAMBAHAN UNTUK AI SCAFFOLDING

- Buatkan struktur folder Next.js App Router yang rapi dan idiomatik (`app/`, `components/`, `lib/db/`, dll).
- Sertakan schema Drizzle lengkap untuk tabel `entries` beserta migration awal.
- Buatkan seed data dummy (2-3 entry contoh) agar tampilan bisa langsung dicek tanpa harus input manual dulu.
- Pastikan komponen form mendukung validasi dasar (misal: prompt tidak boleh kosong).
- Gunakan Server Actions Next.js untuk operasi create/update/delete jika memungkinkan, agar tetap idiomatik dengan App Router.
- Komentar kode boleh singkat dan jelas, tidak perlu berlebihan.

---

**Akhir dari brief.** Tujuannya: hasil akhir adalah aplikasi yang langsung bisa di-`npm install && npm run dev` setelah environment variable database (Neon connection string) dan Vercel Blob token diisi.
