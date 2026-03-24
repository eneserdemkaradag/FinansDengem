# FinansDengem - MVP Task Listesi

## 0) Proje Kurulumu
- [x] Next.js (TypeScript) projesi oluştur
- [x] TailwindCSS kurulumu ve temel tema yapısı
- [x] ESLint/Prettier temel ayarları
- [x] Ortam değişkenleri ve `.env.example` dosyası
- [x] Firebase veya Supabase seçimi ve başlangıç konfigürasyonu (Supabase)

## 1) Kimlik Doğrulama (Auth)
- [x] E-posta/şifre ile kayıt ekranı oluştur
- [x] E-posta/şifre ile giriş ekranı oluştur
- [x] Oturum yönetimi (login/logout + route koruma)
- [x] Kullanıcıya özel veri izolasyonu (her kullanıcı sadece kendi verisini görsün)
- [x] Auth hata mesajları ve temel form validasyonu

## 2) Ortak Uygulama Çatısı
- [x] Uygulama shell/layout yapısını oluştur (header, içerik alanı)
- [x] Üstte büyük mod değiştirici (Normal Mod <-> Yatırımcı Modu) ekle
- [x] Mod değişiminde tema değişimi (Normal: açık, Yatırımcı: koyu)
- [x] Mod tercihinin kullanıcı bazlı saklanması
- [x] İlk açılışta “Hangi modda başlamak istersin?” seçim ekranı

## 3) Normal Mod (Bütçe Takibi)
- [x] Aylık gelir/bütçe tanımlama alanı oluştur
- [x] Harcama ekleme formu (açıklama, tutar, kategori, tarih)
- [x] Kategori seçenekleri: Yemek, Kira, Eğlence, Borç (ve gerekirse Diğer)
- [x] Harcama kayıtlarını listeleme
- [x] Matematiksel özet kartları:
  - [x] Toplam Gelir
  - [x] Toplam Harcama
  - [x] Kalan Bütçe (her zaman görünür)
- [x] Harcama eklendiğinde kalan bütçenin anlık güncellenmesi

## 4) Yatırımcı Modu
- [x] Varlık ekleme formu (varlık tipi, sembol/ad, miktar/lot, alış maliyeti)
- [x] Varlık tipleri: Hisse, Altın, Döviz
- [x] Kullanıcı varlıklarını listeleme
- [x] Güncel fiyat verisi entegrasyonu için servis katmanı oluştur
- [x] Her varlık için günlük kar/zarar hesaplaması
- [x] Tüm yatırımlar için toplam anlık değer (büyük bilanço kartı)

## 5) Veri Modeli ve Backend
- [ ] Temel tablolar/koleksiyonlar:
  - [x] users (profil/tercihler)
  - [x] budgets (aylık gelir)
  - [x] expenses (harcama kayıtları)
  - [x] assets (yatırım varlıkları)
- [x] CRUD servisleri (budget, expense, asset)
- [x] Kullanıcı bazlı güvenlik kuralları (RLS / security rules)

## 6) Kullanıcı Akışı (PRD Senaryosu)
- [x] Login sonrası mod seçim ekranına yönlendirme
- [x] Normal modda + butonu ile harcama ekleme akışı
- [x] Harcama sonrası kalan bütçe güncellemesini doğrula
- [x] Şalter ile Yatırımcı Moduna geçiş
- [x] Yatırımcı modunda günlük değer değişimi görünümünü doğrula

## 7) UI/UX ve Kalite
- [x] Responsive tasarım (mobil + desktop)
- [x] Boş durum ekranları (henüz veri yoksa)
- [x] Yükleniyor/hata durumları
- [x] Erişilebilirlik (form label, klavye erişimi, aria)
- [x] Tutarlı para birimi formatı (TL ve ilgili varlıklar)

## 8) Test ve Yayına Hazırlık
- [x] Kritik hesaplamalar için unit test (kalan bütçe, kar/zarar)
- [x] Temel entegrasyon testleri (auth + expense + asset akışları)
- [x] Manuel MVP test checklist’i oluştur
- [x] Production build ve smoke test
- [x] Deploy (Vercel vb.) + çevre değişkenleri kontrolü

## Milestone Önerisi
- [x] M1: Auth + Ortak Çatı + Mod Değiştirici
- [x] M2: Normal Mod tamamen çalışır durumda
- [x] M3: Yatırımcı Modu tamamen çalışır durumda
- [x] M4: Test, polish ve canlıya çıkış
