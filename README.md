# BPD Bali CRM Mobile

Aplikasi CRM mobile web BPD Bali. Source statis berada di `dist/`.

## Menjalankan

Jalankan `python3 -m http.server 8080 --directory dist`, kemudian buka http://localhost:8080.

Backend bersama ada di repository CRMCMSBPDBALI. Alamat backend dikonfigurasi melalui `API_ORIGIN` di `dist/connected.js`. Konfigurasi hosting Sites ada di `.openai/hosting.json`.

Fitur mencakup leads, nasabah, task, opportunity, pengajuan, persetujuan, absen, lokasi/journey, simulasi alur, dan guidance tour. Akses mengikuti role AO, SPV, dan Superadmin.

Source versi 15 Oktober 2026. Database dan foto runtime tidak disertakan.
