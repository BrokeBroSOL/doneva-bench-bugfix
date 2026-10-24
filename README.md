# doneva-bench-bugfix

Küçük, bağımlılıksız bir **Kuaför Randevu** sayfası (vanilla HTML/CSS/JS). Benchmark amaçlı public test reposudur.

## Dosyalar
- `index.html`, `style.css`, `app.js` — arayüz (randevular tarayıcının `localStorage`'ında tutulur)
- `logic.js` — saf iş mantığı (toplam tutar, saat çakışması kontrolü, biçimlendirme, doğrulama)
- `tests/logic.test.js` — Node'un yerleşik test koşucusu ile testler

## Nasıl açılır
`index.html` dosyasını tarayıcıda açın (sunucu gerekmez). İsterseniz: `python3 -m http.server` ve `http://localhost:8000`.

## Nasıl test edilir
Node.js 18+ gerekir, bağımlılık yoktur:

```
npm test
# veya
node --test
```

Not: GitHub Actions kullanılmaz; testler yerelde çalıştırılır.
