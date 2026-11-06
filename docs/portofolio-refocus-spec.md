# Spec: Refocus portofolio ke Cloud Engineer + Solution Architecture

Dokumen ini adalah spesifikasi sebelum implementasi. Keputusan di sini sudah disetujui lewat
round klarifikasi 2026-11-06. **Update 2026-11-06 (round 2): §1, §5, dan §7 sudah di-finalisasi —
lihat Decision Log di bawah.**

Dokumen terkait: [README.md](../README.md)

---

## Decision Log (2026-11-06)

| # | Item | Putusan |
|---|---|---|
| D1 | Hero H1 | **Varian A** — "I'm a Cloud Engineer designing / production-grade architecture" |
| D2 | Case study | **Sebut Reservasi.Online apa adanya** (brand + link, bukan anonim) |
| D3 | Ikon skill baru | **Download logo brand resmi** — hanya yang ada bukti di repo (§5) |
| D4 | Section Certifications | **Tidak dibuat.** Ditambah nanti setelah sertifikat benar-benar ada |
| D5 | Ikon tanpa bukti | Terraform, Kubernetes, Nginx, Grafana **tidak dipakai** — tidak ketemu satu pun file `.tf` / manifest k8s / stack monitoring di semua project (`find` di `../` , 2026-11-06) |
| D6 | Sisa yang belum dijawab | Homelab detail (§7.1), metrik (§7.5), `<title>`/meta (§7.6) — blok kode Home/About ditahan sampai ini dijawab |

---

## 1. Keputusan positioning

| Item | Keputusan | Alasan |
|---|---|---|
| Judul utama (hero) | **Cloud Engineer** *(D1)* | Jujur buat fresh SMK graduate 2026, tetap searchable, tidak inflated. |
| Solution architecture | **Layer 2** — muncul sebagai *cara kerja* + *case study*, bukan sebagai title utama | Klaim "architect" tanpa posisi kerja resmi berisiko dibaca sebagai overclaim; dibuktikan lewat proyek, bukan lewat nama. |
| IoT & hardware | **Dipertahankan**, diposisikan sebagai "gw bisa nge-design arsitektur IoT juga, bukan cuma cloud" | Diferensiasi nyata: ESP32/Arduino/MQTT + edge-to-cloud adalah skill architect yang jarang di level entry. |
| Fullstack / web dev | **Secondary skill**, tetap ada di halaman About | Architect yang bisa ngoding itu nilai plus; jangan sampai hilang, tapi jangan jadi identitas. |
| Photography & desain | **Keluar dari section utama**, pindah ke blok "Off-screen / hobbies" di About | Tidak mendukung positioning, tapi tetap bikin profil terasa manusia. |
| Sertifikasi | **Tidak ditulis sebagai pencapaian.** Hanya boleh muncul sebagai baris "in progress" kalau memang sudah ada yang terdaftar | Belum ada sertifikat — klaim kosong justru merusak kredibilitas. |
| Theme visual | **Tidak berubah** (GSAP, cursor custom, tirai, locomotive scroll, hitam-putih, tipografi Inter) | Permintaan eksplisit: theme tetap sama. |

### Batasan klaim (hard rules)
1. Jangan tulis angka tahun pengalaman yang tidak bisa dibuktikan. Yang dipakai sekarang: "1+ years hands-on frontend engineering" → ganti ke bentuk yang benar: pengalaman dari proyek produk sendiri + klien.
2. Kata yang boleh dipakai: *designed*, *built*, *deployed*, *self-hosted*, *operated*.
3. Kata yang dilarang sampai ada buktinya: *certified*, *enterprise*, *led a team*, *managed production for X clients* (kecuali memang klien).

---

## 2. Bukti yang bisa dipakai (hasil audit repo, 2026-11-06)

Semua ini ada di repo lokal, jadi aman dijadikan isi portofolio.

**A. Reservasi.Online — multi-tenant booking SaaS** (sumber: `../reservasi-online/`)
- Edge gateway sendiri: Caddy di dalam Docker, gabung ke network eksternal Dokploy
  ([`caddy-production-gateway/docker-compose.yml`](file:///C:/Users/salma/OneDrive/Desktop/coding/reservasi-online/caddy-production-gateway/docker-compose.yml)).
- **On-demand TLS untuk custom domain per tenant**: sertifikat di-issue otomatis, tapi
  divalidasi dulu lewat callback `/api/domain/verify` + token auth, dan route internal di-arahkan
  bypass gateway untuk menghindari loop (`on_demand_tls.ask`)
  ([`caddy-production-gateway/Caddyfile`](file:///C:/Users/salma/OneDrive/Desktop/coding/reservasi-online/caddy-production-gateway/Caddyfile)).
- Routing per lingkungan: prod vs staging dipisah by port, staging pakai wildcard cert via DNS-challenge Cloudflare,
  dan traffic ke app container di-handle lewat Traefik/Dokploy network.
- **Async notification worker** sebagai service terpisah: BullMQ + Redis (`ioredis`), template email
  React Email + Mailtrap, state di Postgres
  ([`email-worker/package.json`](file:///C:/Users/salma/OneDrive/Desktop/coding/reservasi-online/email-worker/package.json)).
- Kanal WhatsApp lewat WAHA di network internal (port di-bind ke `127.0.0.1`, dashboard ber-password,
  session volume persisten, webhook di-verify HMAC-SHA512)
  ([`email-worker/docker-compose.waha.yml`](file:///C:/Users/salma/OneDrive/Desktop/coding/reservasi-online/email-worker/docker-compose.waha.yml)).
- Angka yang boleh dipakai: **1 gateway edge + N service (frontend Next.js, worker notifikasi, worker WhatsApp) di satu host self-managed**.

**B. Homelab yang jalan 24/7** (sumber: aset ikon `public/skill2/`: `casaos.svg`, `nextcloud.png`, `pnet.png`, `orangepi.png`, `cloudflare.png`, `espressif.png`)
- CasaOS + Nextcloud + pfSense (`pnet`) di Orange Pi — ini cerita "small-scale production": reverse proxy,
  storage pribadi, network routing, plus Cloudflare di depan DNS/tunnel.
- ⚠️ Perlu konfirmasi user (lihat §7): detail拓扑, service apa saja yang jalan, uptime.

**C. Dashboard monitoring** (sumber: `../dashboard-monitoring/`, ada `PRD.md` + Dockerfile)
- Bahan buat studi kasus observability. ⚠️ Belum diaudit isinya — masuk tahap 2.

**D. Proyek sekolah/klien yang arsitekturnya gw rancang**
- Absensi RFID, TrashGo, Traditional Instrument (gambar di `public/project/`) + project IoT ESP32/Arduino/MQTT.
- ⚠️ Judul/summary project ini lives di Supabase, bukan di kode → perbaikan copy-nya masuk tahap 2.

---

## 3. Informasi & struktur yang berubah

### 3.1 Home (`src/pages/Home.jsx`)

| Section | Sekarang | Jadi |
|---|---|---|
| Hero H1 (L256–266) | "I'm a **Fullstack** Software Engineer building *scalable systems*" | **D1 — varian A**: "I'm a **Cloud** Engineer designing *production-grade architecture*" (layout & line-break tetap) |
| Hero paragraph (L267–269) | "…Fullstack Software Engineer based in Jakarta. I focus on building digital products…" | Fokus ke: rancang arsitektur → rakit service → jalanin di production. Sebut latar SMK Negeri 26 (jaringan) sekali. |
| Tag vertikal kanan (L245–250) | Entrepreneur / Fast Learner / Tech Enthusiast / Photographer | `Cloud Engineer` / `Architecture-first` / `Homelab 24/7` / `Photographer` |
| About-me SubHead (L299–303) | Sudah tulis lulus 2022–2026 tapi masih "As a Fullstack Software Engineer" | Ubah identitas ke Cloud Engineer; hubungkan jurusan *Information Systems and Network Applications* sebagai fondasi jaringan/cloud. |
| "What you can expect from me?" (L306–319) | Paragraf umum + klaim "1+ years frontend" | **3 pillar** (copy di §4.3): Design / Build / Run — jadi alasan positioning architect sebagai layer 2. |
| Skill slider (2 baris) | Baris 1 fullstack, baris 2 infra campur Adobe | Kurasi di §5 |
| Section baru: **Case study strip** | — | Satu blok compact setelah slider: "Architecture I actually run — Reservasi.Online", 4 kotak edge/service/data/ops + link `/projects`. Gaya: hitam-putih, pakai divider bundar yang sudah ada. Jangan tambah library baru. |
| Footer | `Copyrigth©2024` (typo di Home), `Copyright©2024` (About/Projects) | `Copyright © 2026` di 3 file |

### 3.2 About (`src/pages/About.jsx`)

| Section | Aksi |
|---|---|
| Introduction (L110–114) | Rewrite: Cloud Engineer, lulusan SMK Negeri 26 Jakarta, self-hosted-first. |
| Education (L129–142) | Tetap 2022–2026. Deskripsi di-*reposition*: tekunin jaringan & sistem (bukan "web development" dulu), karena itu yang jadi modal cloud. |
| Skills & Technologies (L157–219) | **Grid 6 → 6, tapi isi disusun ulang**: (1) Cloud & Infrastructure *(baru)*, (2) Architecture & Design *(baru)*, (3) Backend & APIs, (4) IoT & Edge, (5) Databases, (6) Frontend. "Soft Skills" diganti jadi blok teks pendek di bawah / dihapus. |
| **Baru: Certifications** | Hanya kalau user kasih daftar (lihat §7). Slot-nya di bawah Skills, bentuk list sederhana + status "in progress". Kalau belum ada, blok ini tidak dibuat. |
| **Baru: Reference architecture** | Blok cerita Reservasi.Online (diagram kotak hitam-putih, tanpa library diagram). Isi = daftar di §2A. |
| **Baru: Homelab** | 4–6 baris: perangkat, service, dan apa yang dipelajari soal ops (backup, DNS, reverse proxy, uptime). |
| What I Do (L236–269) | 4 blok → 4 blok, urutan ulang: **Solution Architecture** (naik ke 1) → Cloud & Deployment → IoT & Edge Systems → Fullstack Product Build. Blok *Photography* pindah dari sini. |
| **Baru: Off-screen** | Photography + desain masuk sini, 2 kalimat, di dekat bawah sebelum Contact. |
| Personality (L285–319) | Tetap 4 kartu, tapi "Fast Learner" dan "Tech Enthusiast" di-rewrite biar nyambung ke arsitektur/cloud; "Entrepreneur Mindset" tetap (itu founder angle, masih valid). |

### 3.3 Projects (`src/pages/Projects.jsx`) + `src/components/Project.jsx`
Struktur halaman tetap. Copy per-project (title/summary/roles/category) **tidak ada di JSX** — dibaca dari
Supabase (`project_with_categories`), lihat §6.

---

## 4. Copy plan

### 4.1 Hero H1 — pilih satu (layout tidak berubah)

**A (rekomendasi)** — tegas, tidak overclaim:
```
I'm a [Cloud] Engineer designing
production-grade architecture
```

**B** — menonjolkan proses:
```
I'm a [Cloud] Engineer who designs first,
then ships
```

**C** — paling sederhana:
```
I'm a [Cloud] Engineer building
systems that scale
```

### 4.2 Hero paragraph (rekomendasi = A)

**A**
> I'm **Salman Fikri**, a Cloud Engineer based in Jakarta. I design the architecture, wire the services, and keep them running in production. Graduate of SMK Negeri 26 Jakarta, Information Systems and Network Applications.

**B**
> I'm **Salman Fikri**. I plan how a system should look before building it — cloud infra, services, and the IoT devices talking to them. Based in Jakarta, self-hosted first.

### 4.3 Tiga pillar "What you can expect from me?"

| Pillar | Copy |
|---|---|
| **Design** | I start with the architecture: what the system needs, which services, where they run, and what breaks when traffic grows. |
| **Build** | Then I build it — frontend, backend, queues, and IoT/edge devices when the problem needs hardware. |
| **Run** | And I operate it: Docker, reverse proxy, TLS for custom domains, self-hosted on my own server. |

Intro line replacing "With 1+ years of hands-on frontend engineering experience…":
> I work architecture-first. On Reservasi.Online I designed the whole layout — the edge gateway, the services, the async workers — then built and deployed it myself. That habit is what I bring to every project.

### 4.4 Case study strip — 4 kotak

| Kotak | Judul | Isi |
|---|---|---|
| 1 | Edge | Caddy gateway on Docker. On-demand TLS, per-tenant custom domain validated by an app endpoint. |
| 2 | Services | Next.js app + separate notification worker + WhatsApp worker, split by responsibility. |
| 3 | Data | Postgres as the shared state, Redis + BullMQ for async jobs and retries. |
| 4 | Ops | Dokploy/Traefik for deployment, staging on a wildcard cert via Cloudflare DNS challenge. |

---

## 5. Kurasi skill slider

Prinsip: yang tidak mendukung positioning keluar dari slider. Aset ikon baru = kerja terpisah (§7).

**Baris 1 — `InfiniteSlider.jsx`** (runtime/backend, tetap `public/skill/`)
Masuk: `node`, `express`, `bun`, `elysiajs`, `go`, `rust`, `react`, `svelte`, `next`, `tailwind`, `java`, `springboot`, `laravel`, `adonis`, `tauri`.
Tidak ada yang dihapus — baris ini sudah bersih.

**Baris 2 — `InfiniteSliderReverse.jsx`** (infra/cloud, `public/skill2/`)
Masuk: `aws`, `cloudflare`, `casaos`, `nextcloud`, `pnet`, `orangepi`, `espressif`, `arduino`.
**Keluar** (pindah ke blok Off-screen/hobby, bukan ke skill): `photoshop`, `illustrator`, `lightroom`, `alightmotion`, `figma`.

**Ikon baru — sudah diunduh 2026-11-06 ke `public/skill2/` (SVG, sumber Simple Icons CDN)** *(D3)*.
Cuma yang ada bukti di repo:

| File | Bukti |
|---|---|
| `docker.svg` | 9 file `docker-compose*` di project lu; gateway & worker jalan di container |
| `caddy.svg` | `caddy-production-gateway/` (Caddyfile + Dockerfile + compose) |
| `traefikmesh.svg` | `dokploy-traefik` di-gabung sebagai upstream internal di Caddyfile |
| `postgresql.svg` | `pg` di email-worker + Supabase di portofolio ini |
| `redis.svg` | `ioredis` + `bullmq` di email-worker |
| `linux.svg` | host self-managed (VPS Linux, IP publik di Caddyfile) |

**Yang sengaja TIDAK dipasang** *(D5)*: `terraform`, `kubernetes`, `nginx`, `grafana`.
Alasan: tidak ada satu pun file `.tf`, `Chart.yaml`/`kustomization.yaml`, atau stack Grafana/Prometheus
di seluruh folder `coding/` (dashboard-monitoring isinya Next.js + Recharts, bukan Grafana).
Dua file ikon yang sempat ke-download (nginx, grafana) sudah dihapus lagi dari `public/skill2/`.
Kalau nanti lu memang pakai salah satunya, tinggal bilang — ikonnya gampang ditambah.

---

## 6. Tahap 2 — data Supabase (tidak dikerjakan di tahap 1)

Kategori & isi project adalah data produksi. Tidak ada yang diubah tanpa approval eksplisit.
Yang diusulkan:

1. **Kategori** (table `categories`, `name`/`slug`/`description`) — grouping baru supaya filter chips di Home/Projects ikut bercerita architect:
   - `solution-architecture` → "Architecture & Design"
   - `cloud-infrastructure` → "Cloud & Self-hosted"
   - `iot-edge` → "IoT & Edge"
   - `web-apps` → "Web Products"
   - kategori lama tetap `is_active = false` dulu (bukan dihapus) supaya bisa rollback.
2. **Copy per project**: title + `summary` + `body` + `roles` ditulis ulang dengan pola *Context → Constraints → Design decision → Result*. Contoh case study Reservasi.Online masuk sebagai project `is_featured`.
3. **Migration SQL** akan ditaruh di `supabase/` sebagai file idempotent (pattern `insert … on conflict do nothing`), dijalankan manual oleh user, bukan dari aplikasi.

Rencana detail tahap 2 ditulis setelah tahap 1 live dan terlihat arahnya benar.

---

## 7. Status pertanyaan terbuka

| # | Pertanyaan | Status |
|---|---|---|
| 1 | **Homelab**: device apa yang jalan sekarang, service apa, sudah berapa lama? | ❓ **masih butuh jawaban lu** — section Homelab di About belum bisa ditulis truthful |
| 2 | Sebut brand Reservasi.Online atau anonim? | ✅ **D2: sebut apa adanya** |
| 3 | Ikon skill baru: download logo vs badge teks? | ✅ **D3: download logo** — sudah terpasang, lihat §5 |
| 4 | Section Certifications? | ✅ **D4: tidak dibuat sekarang** |
| 5 | **Metrik nyata** (tenant aktif, uptime, request/hari, jumlah device ESP32 terpasang)? | ❓ **masih butuh jawaban lu** — dipakai di case study strip & Projects |
| 6 | `<title>` halaman: sekarang masih `slmnfkr`. Ganti jadi "Salman Fikri — Cloud Engineer & Solution Architecture"? | ❓ **masih butuh jawaban lu** (ada efek ke SEO/link preview) |
| 7 | URL publik Reservasi.Online yang mau di-link di case study? | ❓ perlu konfirmasi (gw lihat `reservasi.online` + `staging.reservasi.online` di Caddyfile — pakai yang prod?) |

Satu angka nyata lebih kuat dari lima paragraf klaim. Kalau belum ada angka yang bisa
dipertanggungjawabkan, case study tetap jalan — pakai fakta arsitektur (jumlah service, edge gateway,
custom-domain TLS) yang memang terbukti di §2.

---

## 8. Rencana kerja tahap 1 (kalau spec ini di-approve)

Urutan, semua di frontend saja:

1. `Home.jsx`: hero (H1 varian A, paragraph, tag), About-me SubHead, 3-pillar block, case study strip, footer year.
2. `About.jsx`: Introduction, Education, skills grid 6 blok baru, Reference architecture, Homelab, What I Do urutan baru, Off-screen, Personality rewrite, footer year.
3. `InfiniteSliderReverse.jsx`: kurasi keluar aset desain; `InfiniteSlider.jsx` tetap. *(ikon baru sudah terpasang — §5)*
4. `index.html`: title + meta description (keputusan no. 6 — **menunggu jawaban**).
5. Jalanin `npm run dev` dan cek sendiri di browser: desktop + mobile, semua animasi (tirai, cursor, slider, ScrollTrigger) masih jalan, tidak ada teks yang kepotong. Screenshot hasilnya buat review.

**Gate sebelum mulai:** §7 no. 1, 5, 6, 7 harus dijawab dulu — section Homelab, angka di case study, dan
`<title>` tidak boleh di-karang. Sisa (§3.1 hero/pillar, §5 slider, About copy yang nggak butuh fakta baru)
boleh langsung dikerjain.

---

## 9. Implementasi tahap 1 — DONE 2026-11-06 (catatan deviasi)

Dikerjakan dengan default (§8 gate) karena jawaban §7 belum masuk. Semua deviasi ditandai di sini,
bukan di-rewrite diam-diam.

| # | Yang berubah dari spec | Alasan |
|---|---|---|
| I1 | Hero H1: `xl:text-8xl` **dihapus**, cap jadi `lg:text-7xl` ([Home.jsx:256](../src/pages/Home.jsx)) | Di 1440px teksnya jadi 5 baris dan melebar sampai ke kolom foto. Sekarang 4 baris, tetap proporsional di 1440 + 390. |
| I2 | Tag hero ke-3: ~~`Homelab 24/7`~~ → `Self Hosted` | Fakta homelab (§7.1) belum dikonfirmasi. "Self-hosted" terbukti dari Caddyfile/Dokploy. |
| I3 | **Section Homelab di About tidak dibuat** (§3.2) | Same reason — menunggu jawaban §7.1. Sebagai gantinya ada 2 kalimat umum ("Tinkering with homelab gear") di blok Off-screen, tanpa klaim device/uptime. |
| I4 | Case study strip **tanpa angka metrik** | Default §7.5. Hanya fakta arsitektur yang terbukti di §2A. |
| I5 | `<title>` → "Salman Fikri — Cloud Engineer & Solution Architecture" + meta description baru ([index.html:7-11](../index.html)) | §7.6, dianggap "boleh" dari jawaban implementasi. Ganti kalau mau balik ke `slmnfkr`. |
| I6 | Link case study → `https://reservasi.online` (prod, `target="_blank"`) | §7.7, default prod URL. |
| I7 | Copy tambahan di luar spec (typo/grammar yang memang rusak): heading project Home `SOME THE MOST IMPRESIVE PROJECT I HAVE WORKED` → `THE SYSTEMS I HAVE DESIGNED AND RUN`; paragraf hero Projects; `Copyrigth©2024` → `Copyright © 2026` di Home/About/Projects | Ini typo, bukan keputusan positioning. |
| I8 | `next.png` ditambah ke slider baris 1 | Asetnya sudah ada di `public/skill/` tapi tidak pernah dipakai, padahal Next.js dipakai di Reservasi.Online. |

### Hasil verifikasi visual
Dijalankan di `vite` port 5177, dicek via browser pada **1440×900** dan **390×844**: hero (4 baris, tidak
overflow), 3-pillar, kedua slider (ikon baru ter-render), case study strip (4 kartu → stack vertikal di
mobile), seluruh About page (Introduction, Education, 6 blok skills, Reference Architecture 5 layer,
What I Do urutan baru, Personality, Off-screen, footer). Animasi tirai/cursor/ScrollTrigger tidak berubah.

### Belum disentuh (pre-existing, bukan dari perubahan ini)
- `eslint` error `no-unused-vars` variabel `body` di [About.jsx:29](../src/pages/About.jsx#L29) dan
  [Projects.jsx:181](../src/pages/Projects.jsx#L181).
- Console error React `validateDOMNesting` — `SubHead` me-render `<div>` di dalam `<p>`. Sudah ada sejak
  sebelum perubahan ini; belum gw benerin karena itu ngubah komponen yang dipakai di mana-mana.
- **`public/salman.png` masih pakai word-art "coding / Laravel / PHP / Javascript / Golang"** — ini
  kontradiksi paling kelihatan dengan positioning baru. Perlu aset hero baru (foto polos, atau word-art
  versi cloud: Docker/Caddy/AWS/Linux). Ini kerjaan sendiri, tinggal bilang.
- §6 (Supabase categories + copy project) = tahap 2, belum dimulai.

Tidak ada perubahan: theme/CSS, GSAP setup, locomotive scroll, komponen Supabase/dashboard, routing, dependensi baru.
