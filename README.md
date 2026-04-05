# Luqman Car Deals KL (Static Multi-Page)

Website statik multi-page untuk lead generation WhatsApp:
- `/` -> `index.html`
- `/proton` -> `proton/index.html` (salinan dari `proton.html`)
- `/perodua` -> `perodua/index.html` (salinan dari `perodua.html`)

Tech stack:
- Pure HTML + CSS + Vanilla JavaScript
- Tiada backend
- Tiada build step

## Struktur Fail

- `index.html` (Homepage)
- `proton.html` (Page Proton source)
- `perodua.html` (Page Perodua source)
- `styles.css` (Shared styling)
- `script.js` (Shared interaction)
- `proton/index.html` (route extensionless `/proton`)
- `perodua/index.html` (route extensionless `/perodua`)
- `assets/` (gambar, PDF brochure, icon jika mahu local)

## Deploy ke Cloudflare Pages

1. Push project ini ke GitHub.
2. Login Cloudflare Dashboard -> **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3. Pilih repo ini.
4. Set deploy config:
- Framework preset: `None`
- Build command: `(kosongkan)`
- Build output directory: `/`
5. Klik **Save and Deploy**.

Nota:
- Jika UI Cloudflare tidak menerima `/`, guna `.` (root project) kerana hasilnya sama untuk project ini.

## Tiada Build Step

Project ini terus serve fail static dari root:
- HTML: route/page
- CSS: `styles.css`
- JS: `script.js`
- Assets: folder `assets/`

## Cara Tukar Brochure PDF

1. Gantikan fail:
- `assets/brochure-proton.pdf`
- `assets/brochure-perodua.pdf`
2. Jika nama fail berubah, update link dalam:
- `proton.html`
- `perodua.html`
- `proton/index.html`
- `perodua/index.html`

## Cara Tukar Gambar Model

1. Letak gambar baru dalam `assets/` ikut nama sedia ada atau nama baru.
2. Jika guna nama baru, update atribut `src` dalam page berkaitan:
- Proton models: `proton.html` + `proton/index.html`
- Perodua models: `perodua.html` + `perodua/index.html`
- Homepage brand preview: `index.html`

## Cara Edit CTA WhatsApp

Link WA berada dalam button/link HTML dan juga fallback/default dalam JS.

1. Update semua URL WhatsApp dalam:
- `index.html`
- `proton.html`
- `perodua.html`
- `proton/index.html`
- `perodua/index.html`

2. Update fallback default dalam `script.js`:
- constant `DEFAULT_WA`

3. Untuk CTA model khusus, edit prefilled text pada link model card setiap page.

## Semakan Cepat Sebelum Publish

- Test menu desktop + hamburger mobile
- Test smooth scroll + reveal animation
- Test floating WhatsApp + back-to-top
- Test kalkulator anggaran bulanan di Proton/Perodua
- Test semua CTA WhatsApp terbuka dengan mesej betul

## Credits

- Icons by Flaticon
