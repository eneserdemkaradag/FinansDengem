# FinansDengem

Kisisel finans ve yatirim takibi icin iki modlu MVP uygulamasi.

## Ozellikler

- E-posta/sifre ile kayit ve giris
- Ilk giriste mod secimi (Normal / Yatirimci)
- Normal Mod: aylik gelir, harcama ekleme, kategori, kalan butce
- Yatirimci Modu: varlik ekleme, gunluk kar/zarar, toplam anlik deger
- Kullanici bazli veri izolasyonu (Supabase RLS)

## Kurulum

1) Paketleri yukle

```bash
npm install
```

2) Ortam degiskenlerini tanimla (`.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

3) Supabase SQL Editor'de `supabase/schema.sql` dosyasini calistir

4) Uygulamayi baslat

```bash
npm run dev
```

## Test ve Build

```bash
npm run lint
npm run test
npm run build
```

## Deploy Kontrol Listesi

- Vercel projesinde `NEXT_PUBLIC_SUPABASE_URL` tanimli
- Vercel projesinde `NEXT_PUBLIC_SUPABASE_ANON_KEY` tanimli
- Supabase `schema.sql` uygulanmis
- Production build basarili
