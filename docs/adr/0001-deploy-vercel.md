# Deploy ke Vercel dengan domain .vercel.app

Satu halaman statis tanpa server runtime, tanpa environment variable, dan acara berlangsung keesokan harinya. Vercel mendeteksi Next.js tanpa konfigurasi dan menyediakan `VERCEL_PROJECT_PRODUCTION_URL` yang dipakai `app/layout.tsx` untuk membentuk URL absolut `og.png`, sehingga preview WhatsApp benar tanpa menulis domain secara manual.

Domain `.vercel.app` dipilih alih-alih domain sendiri karena biaya domain tahunan tidak membeli apa pun untuk link yang dipakai satu kali. Kalau kelak pindah platform, satu-satunya hal yang perlu diganti adalah nilai cadangan `urlDasar` di `app/layout.tsx`.
