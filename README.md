🚀 FinansDengem: Yapay Zeka Destekli Çift Modlu Finans Asistanı
FinansDengem, dağınık haldeki finansal hayatınızı tek bir merkezde toplayan, Future Talent 201 bitirme projesi olarak geliştirilmiş yenilikçi bir platformdur.

Günümüzde harcamalar farklı bankalara, yatırımlar ise borsa, döviz ve fiziksel varlıklara (altın vb.) dağılmış durumda. FinansDengem, bu karmaşayı bitirmek ve size bir "finansal yol haritası" sunmak için tasarlandı.

💡 Neden FinansDengem?
Çoğu finans uygulaması ya sadece bütçe takibi yapar ya da sadece portföy yönetir. FinansDengem, bu iki dünyayı birbirine bağlar:

Dağınıklığı Giderir: Birden fazla bankadaki harcamalarınızı ve farklı yerlerdeki yatırımlarınızı tek ekranda konsolide eder.

Fiziksel Varlıkları Unutmaz: Sadece dijital hisseleri değil, "yastık altı" altın veya nakit gibi fiziksel varlıklarınızı da portföyünüze dahil eder.

Zaman Yolculuğu: Yatırımlarınızın gün gün nasıl değiştiğini, kâr/zarar durumunuzu geçmişe dönük grafiklerle analiz etmenizi sağlar.

🌟 Öne Çıkan Özellikler
🎭 Çift Modlu Kullanım (Dual-Mode)
Kullanıcılar ihtiyaçlarına göre iki farklı perspektif arasında geçiş yapabilir:

Normal Mod: "Nereye ne harcadım?" sorusuna odaklanır. Günlük bütçe disiplini sağlar.

Yatırımcı Modu: "Varlıklarım ne kadar büyüdü?" sorusuna odaklanır. Hisse senedi, döviz ve emtia takibi yapar.

🤖 LLM Destekli Akıllı Analiz
Sıradan bir grafik aracından fazlası! Entegre yapay zeka asistanı:

Harcama alışkanlıklarınızı analiz eder.

Gereksiz giderleri tespit eder ve bu parayı yatırıma yönlendirmeniz durumunda potansiyel kazancınızı hesaplar.

Size özel, kişiselleştirilmiş finansal tavsiyeler üretir.

🎯 Kullanıcı Profilleri
Bütçe Takipçileri: "Ay sonu param nereye gitti?" diyen, farklı banka hesapları arasında kaybolan kullanıcılar.

Modern Yatırımcılar: Hem borsada hissesi olan hem de fiziksel altın/döviz biriktiren, portföyünün toplam değerini anlık görmek isteyenler.

Finansal Farkındalık Arayanlar: Yapay zekanın yönlendirmesiyle harcama alışkanlıklarını iyileştirmek isteyenler.

📈 Proje Vizyonu
FinansDengem, sadece bir veri giriş platformu değil; kullanıcısını tanıyan, ona harcama yaparken "dur" diyen, yatırım yaparken yol gösteren bir finansal koç olmayı hedeflemektedir.

🏁 Future Talent 201 Bitirme Projesi
Bu proje, finansal okuryazarlığı artırmak ve karmaşık finansal verileri herkes için anlaşılır kılmak amacıyla geliştirilmiştir.

Geliştirici: Enes Erdem KARADAĞ



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
