# BPD Bali CRM Mobile

## Deploy frontend ke Netlify

- Branch: `main`; base directory: root repository (kosong).
- Build command: `node scripts/build-netlify.mjs`.
- Publish directory: `netlify-static`.
- Framework preset: **Other / tidak ada**. Lepaskan plugin Next.js yang dipasang lewat UI jika masih aktif. `NETLIFY_NEXT_PLUGIN_SKIP=true` juga disediakan di `netlify.toml`.
- Gunakan **Deploy latest commit** setelah perubahan masuk; jangan retry commit lama.

Build menyalin `dist/ beserta asetnya` ke `netlify-static/` dan memakai `/api/` pada domain frontend. Netlify meneruskan API ke backend yang sudah online di https://jarivis-crm-focus-cms.aaul72.chatgpt.site. Backend, database D1, dan penyimpanan R2 tidak dipindah. Login menggunakan bearer token yang diteruskan proxy; Origin upstream disetel melalui aturan proxy. Tidak perlu environment secret frontend.

Data yang dibaca dan disimpan merupakan data backend yang sama. Session browser lama pada domain lain tidak ikut pindah; login kembali pada domain Netlify.

## Verifikasi lokal

Jalankan `node scripts/build-netlify.mjs`. Output tidak membutuhkan build framework. Server statis biasa bisa menampilkan UI, tetapi aturan proxy API hanya berjalan di Netlify (atau emulator yang mendukung `netlify.toml`).

## Source

Frontend mobile web responsif: `dist/`. Backend bersama berada di repository CRMCMSBPDBALI. Build Netlify mengubah alamat API hanya pada output, sehingga source Sites tetap dapat memakai backend aslinya.

## Uji setelah deploy

Login AO/SPV/Superadmin, buka leads/nasabah/task/opportunity, buat dan simpan data, muat ulang untuk memastikan tersimpan, serta uji foto dan izin lokasi dari perangkat. Jika API mengembalikan HTML alih-alih JSON, periksa urutan aturan `/api/*` dan konfigurasi publish. Backend yang sekarang harus tetap online.

Database runtime, foto runtime, dan kredensial deployment tidak disertakan dalam repository.
