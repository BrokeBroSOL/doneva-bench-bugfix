(function () {
  "use strict";

  var STORAGE_LANG = "vera-lang";
  var STORAGE_THEME = "vera-theme";
  var STORAGE_APPTS = "vera-appts";

  var SERVICES = [
    { id: "cut", mins: 45, price: 1450 },
    { id: "color", mins: 120, price: 3200 },
    { id: "balayage", mins: 180, price: 4800 },
    { id: "care", mins: 60, price: 1900 },
    { id: "men", mins: 40, price: 950 },
    { id: "bridal", mins: 150, price: 6500 }
  ];

  var STYLISTS = [
    { id: "any" },
    { id: "ece", name: "Ece Yılmaz", initials: "EY", years: 12 },
    { id: "deniz", name: "Deniz Kara", initials: "DK", years: 9 },
    { id: "mert", name: "Mert Aydın", initials: "MA", years: 8 },
    { id: "selin", name: "Selin Öztürk", initials: "SÖ", years: 10 }
  ];

  var I18N = {
    tr: {
      "meta.title": "Atelier Vera — Kuaför randevu",
      "meta.description": "Atelier Vera, Moda Kadıköy. Kesim, renk ve bakım için tek kişilik kuaför randevusu. Kayıt bu tarayıcıda kalır.",
      "skip": "İçeriğe geç",
      "nav.label": "Sayfa",
      "nav.services": "Hizmetler",
      "nav.gallery": "Galeri",
      "nav.team": "Ekip",
      "nav.booking": "Randevu",
      "nav.visit": "Salon",
      "menu.open": "Menü",
      "menu.close": "Menüyü kapat",
      "lang.switch": "Dil",
      "theme.toDark": "Karanlık mod",
      "theme.toLight": "Aydınlık mod",
      "hero.kicker": "Moda, Kadıköy",
      "hero.title": "Saçınız için sakin bir atölye.",
      "hero.lead": "Kesim, renk ve bakım. Her randevu tek misafire ayrılır.",
      "hero.cta": "Randevu al",
      "hero.gallery": "Çalışmalara bak",
      "hero.today": "Bugün",
      "hero.addressLink": "Moda Caddesi No: 42",
      "hero.open": "Açık",
      "hero.closed": "Kapalı",
      "hero.opensAt": "Açılış {time}",
      "hero.nextOpen": "Sonraki açık gün",
      "day.0": "Pazar",
      "day.1": "Pazartesi",
      "day.2": "Salı",
      "day.3": "Çarşamba",
      "day.4": "Perşembe",
      "day.5": "Cuma",
      "day.6": "Cumartesi",
      "hours.weekday": "Salı – Cumartesi",
      "hours.weekday.time": "10:00 – 19:00",
      "hours.sunday": "Pazar",
      "hours.sunday.time": "11:00 – 17:00",
      "hours.monday": "Pazartesi",
      "hours.monday.time": "Kapalı",
      "services.title": "Hizmetler",
      "services.lead": "Süreler tek kişilik randevuya göredir. Ücretler sabittir.",
      "service.cut.name": "Kesim ve şekillendirme",
      "service.cut.desc": "Yüz hatlarına göre kesim, yıkama ve bitiş.",
      "service.color.name": "Renk",
      "service.color.desc": "Tek renk, dip boya ya da kırık yansıma.",
      "service.balayage.name": "Balyaj",
      "service.balayage.desc": "Elle açılan, bakımlı geçişler.",
      "service.care.name": "Bakım ve gloss",
      "service.care.desc": "Onarım maskesi ve cam parlaklık.",
      "service.men.name": "Erkek kesim",
      "service.men.desc": "Makas, makine ve sakal hattı.",
      "service.bridal.name": "Gelin saçı",
      "service.bridal.desc": "Prova dahil topuz veya yumuşak dalga.",
      "gallery.title": "Galeri",
      "gallery.lead": "Renk ve form etütleri. Büyütmek için bir karta dokunun.",
      "gallery.count": "{n} çalışma",
      "gallery.empty": "Bu grupta çalışma yok.",
      "gallery.close": "Kapat",
      "gallery.prev": "Önceki",
      "gallery.next": "Sonraki",
      "filter.all": "Tümü",
      "filter.cut": "Kesim",
      "filter.color": "Renk",
      "filter.care": "Bakım",
      "filter.bridal": "Gelin",
      "filter.label": "Galeri süzgeci",
      "look.bob.kicker": "Kesim",
      "look.bob.title": "Küt bob",
      "look.bob.text": "Çene hizasında net bir küt hat. Ağırlık uçlarda, ense temiz.",
      "look.copper.kicker": "Renk",
      "look.copper.title": "Bakır balyaj",
      "look.copper.text": "Dipten bakıra eriyen, elle açılmış sıcak bir geçiş.",
      "look.ash.kicker": "Renk",
      "look.ash.title": "Küllü sarı",
      "look.ash.text": "Serin ve yumuşak bir sarı. Kök sakin, uçlar ipeksi.",
      "look.gloss.kicker": "Bakım",
      "look.gloss.title": "Cam parlaklık",
      "look.gloss.text": "Düz bir formun üstüne binen şeffaf, cam gibi bir parlaklık.",
      "look.chignon.kicker": "Gelin",
      "look.chignon.title": "Alçak topuz",
      "look.chignon.text": "Alçak bir topuz ve iki serbest tutam. Gelin provasına uygun.",
      "look.crop.kicker": "Kesim",
      "look.crop.title": "Dokulu crop",
      "look.crop.text": "Yanlar kısa, üst kısım parçalı ve hafif.",
      "look.chocolate.kicker": "Renk",
      "look.chocolate.title": "Koyu çikolata",
      "look.chocolate.text": "Hareketli, derin bir kahverengi. Parlaklık sıcak kalır.",
      "look.waves.kicker": "Gelin",
      "look.waves.title": "Yumuşak dalga",
      "look.waves.text": "Fırçalanmış gevşek dalgalar ve birkaç inci tokası.",
      "team.title": "Ekip",
      "team.lead": "Randevuda stilist seçebilir ya da bize bırakabilirsiniz.",
      "team.years": "{n} yıl",
      "stylist.any": "Fark etmez",
      "stylist.ece.role": "Kesim ve balyaj",
      "stylist.deniz.role": "Renk",
      "stylist.mert.role": "Erkek kesim",
      "stylist.selin.role": "Gelin ve şekil",
      "booking.title": "Randevu",
      "booking.lead": "Günü ve saati seçin. Kayıt bu tarayıcıda kalır; bir sunucuya gönderilmez.",
      "booking.privacy": "Kaydettiğinizde bilgi bu cihazda kalır.",
      "form.name": "Ad soyad",
      "form.phone": "Telefon",
      "form.email": "E-posta",
      "form.optional": "isteğe bağlı",
      "form.service": "Hizmet",
      "form.stylist": "Stilist",
      "form.date": "Tarih",
      "form.time": "Saat",
      "form.note": "Not",
      "form.note.ph": "İstediğiniz boy, renk veya hassasiyet",
      "form.submit": "Randevuyu kaydet",
      "form.choose": "Seçin",
      "form.pickDate": "Önce bir tarih seçin.",
      "form.pickService": "Saatleri görmek için bir hizmet seçin.",
      "form.noSlots": "Bu hizmet seçilen güne sığmıyor.",
      "form.closed": "Pazartesi kapalıyız. Başka bir gün seçin.",
      "summary.title": "Özet",
      "summary.service": "Hizmet",
      "summary.duration": "Süre",
      "summary.price": "Ücret",
      "summary.stylist": "Stilist",
      "summary.date": "Gün",
      "summary.time": "Saat",
      "summary.empty": "—",
      "saved.title": "Kayıtlı randevular",
      "saved.empty": "Henüz kayıt yok.",
      "saved.cancel": "İptal et",
      "saved.confirm": "Kalıcı olarak sil",
      "saved.undo": "Vazgeç",
      "appt.past": "Geçti",
      "success.title": "Randevu kaydedildi",
      "success.body": "Referans {ref}. Bu kayıt yalnızca bu tarayıcıda durur.",
      "success.again": "Yeni randevu",
      "error.name": "Ad soyad en az 2 karakter olmalı.",
      "error.phone": "Telefon en az 10 rakam içermeli.",
      "error.email": "E-posta biçimi geçersiz.",
      "error.service": "Bir hizmet seçin.",
      "error.date": "Bir tarih seçin.",
      "error.past": "Geçmiş bir gün seçilemez.",
      "error.closed": "Pazartesi kapalıyız.",
      "error.time": "Bir saat seçin.",
      "error.conflict": "Bu saat seçilen stilist için dolu.",
      "error.storage": "Tarayıcı yerel kaydı engelledi. Randevu saklanamadı.",
      "visit.title": "Salon",
      "visit.lead": "Moda Caddesi üzerinde, randevu ile çalışırız.",
      "visit.address.label": "Adres",
      "visit.address": "Caferağa Mah. Moda Cad. No: 42",
      "visit.city": "Kadıköy / İstanbul",
      "visit.phone.label": "Telefon",
      "visit.email.label": "E-posta",
      "visit.hours": "Saatler",
      "visit.noteTitle": "Not",
      "visit.note": "Kapıdan randevusuz alınmıyor. Gelin provası için not alanına tarihi yazın.",
      "footer.note": "Atelier Vera kurgusal bir salondur. Randevular sunucuya gitmez; tarayıcınızın yerel kaydında durur."
    },
    en: {
      "meta.title": "Atelier Vera — Book a visit",
      "meta.description": "Atelier Vera in Moda, Kadıköy. One-guest appointments for cut, color, and care. Bookings stay in this browser.",
      "skip": "Skip to content",
      "nav.label": "Page",
      "nav.services": "Services",
      "nav.gallery": "Gallery",
      "nav.team": "Stylists",
      "nav.booking": "Book",
      "nav.visit": "Salon",
      "menu.open": "Menu",
      "menu.close": "Close menu",
      "lang.switch": "Language",
      "theme.toDark": "Dark mode",
      "theme.toLight": "Light mode",
      "hero.kicker": "Moda, Kadıköy",
      "hero.title": "A quiet atelier for your hair.",
      "hero.lead": "Cuts, color, and care. Each appointment is held for one guest.",
      "hero.cta": "Book a visit",
      "hero.gallery": "View the gallery",
      "hero.today": "Today",
      "hero.addressLink": "Moda Caddesi No: 42",
      "hero.open": "Open",
      "hero.closed": "Closed",
      "hero.opensAt": "Opens at {time}",
      "hero.nextOpen": "Next open day",
      "day.0": "Sunday",
      "day.1": "Monday",
      "day.2": "Tuesday",
      "day.3": "Wednesday",
      "day.4": "Thursday",
      "day.5": "Friday",
      "day.6": "Saturday",
      "hours.weekday": "Tuesday – Saturday",
      "hours.weekday.time": "10:00 – 19:00",
      "hours.sunday": "Sunday",
      "hours.sunday.time": "11:00 – 17:00",
      "hours.monday": "Monday",
      "hours.monday.time": "Closed",
      "services.title": "Services",
      "services.lead": "Times are for a one-guest appointment. Prices are fixed.",
      "service.cut.name": "Cut and finish",
      "service.cut.desc": "A cut for your face shape, plus wash and finish.",
      "service.color.name": "Color",
      "service.color.desc": "All-over color, roots, or a broken highlight.",
      "service.balayage.name": "Balayage",
      "service.balayage.desc": "Hand-painted, grown-out transitions.",
      "service.care.name": "Treatment and gloss",
      "service.care.desc": "A repair mask and a glass-like shine.",
      "service.men.name": "Men’s cut",
      "service.men.desc": "Scissors, clipper, and beard line.",
      "service.bridal.name": "Bridal hair",
      "service.bridal.desc": "A chignon or soft waves, trial included.",
      "gallery.title": "Gallery",
      "gallery.lead": "Studies of color and shape. Open a card to look closer.",
      "gallery.count": "{n} studies",
      "gallery.empty": "Nothing in this group.",
      "gallery.close": "Close",
      "gallery.prev": "Previous",
      "gallery.next": "Next",
      "filter.all": "All",
      "filter.cut": "Cut",
      "filter.color": "Color",
      "filter.care": "Care",
      "filter.bridal": "Bridal",
      "filter.label": "Gallery filter",
      "look.bob.kicker": "Cut",
      "look.bob.title": "Blunt bob",
      "look.bob.text": "A precise jaw-length line. Weight through the ends, nape kept close.",
      "look.copper.kicker": "Color",
      "look.copper.title": "Copper balayage",
      "look.copper.text": "Hand-painted warmth that starts darker at the root and melts to copper.",
      "look.ash.kicker": "Color",
      "look.ash.title": "Ash blonde",
      "look.ash.text": "A cool, soft blonde with a quiet root and a silky finish.",
      "look.gloss.kicker": "Care",
      "look.gloss.title": "Glass gloss",
      "look.gloss.text": "A clear shine laid over a sleek, straight shape.",
      "look.chignon.kicker": "Bridal",
      "look.chignon.title": "Low chignon",
      "look.chignon.text": "A low knot with two loose strands. Suitable for a wedding trial.",
      "look.crop.kicker": "Cut",
      "look.crop.title": "Textured crop",
      "look.crop.text": "Short on the sides, piece-y through the top.",
      "look.chocolate.kicker": "Color",
      "look.chocolate.title": "Dark chocolate",
      "look.chocolate.text": "A deep brown with soft movement and a warm shine.",
      "look.waves.kicker": "Bridal",
      "look.waves.title": "Soft waves",
      "look.waves.text": "Loose, brushed-out waves with a few pearl pins.",
      "team.title": "Stylists",
      "team.lead": "Choose a stylist for your visit, or leave it with us.",
      "team.years": "{n} years",
      "stylist.any": "No preference",
      "stylist.ece.role": "Cut and balayage",
      "stylist.deniz.role": "Color",
      "stylist.mert.role": "Men’s cut",
      "stylist.selin.role": "Bridal and styling",
      "booking.title": "Book",
      "booking.lead": "Choose a day and time. The booking stays in this browser and is never sent to a server.",
      "booking.privacy": "What you save stays on this device.",
      "form.name": "Full name",
      "form.phone": "Phone",
      "form.email": "Email",
      "form.optional": "optional",
      "form.service": "Service",
      "form.stylist": "Stylist",
      "form.date": "Date",
      "form.time": "Time",
      "form.note": "Note",
      "form.note.ph": "Length, color, or anything we should know",
      "form.submit": "Save appointment",
      "form.choose": "Choose",
      "form.pickDate": "Choose a date first.",
      "form.pickService": "Choose a service to see times.",
      "form.noSlots": "This service does not fit on the selected day.",
      "form.closed": "We are closed on Mondays. Choose another day.",
      "summary.title": "Summary",
      "summary.service": "Service",
      "summary.duration": "Duration",
      "summary.price": "Price",
      "summary.stylist": "Stylist",
      "summary.date": "Day",
      "summary.time": "Time",
      "summary.empty": "—",
      "saved.title": "Saved appointments",
      "saved.empty": "Nothing saved yet.",
      "saved.cancel": "Cancel",
      "saved.confirm": "Delete permanently",
      "saved.undo": "Keep",
      "appt.past": "Past",
      "success.title": "Appointment saved",
      "success.body": "Reference {ref}. This booking stays in this browser.",
      "success.again": "New appointment",
      "error.name": "Enter a name of at least 2 characters.",
      "error.phone": "Enter a phone number with at least 10 digits.",
      "error.email": "That email does not look valid.",
      "error.service": "Choose a service.",
      "error.date": "Choose a date.",
      "error.past": "Past days cannot be booked.",
      "error.closed": "We are closed on Mondays.",
      "error.time": "Choose a time.",
      "error.conflict": "That time is already taken for the selected stylist.",
      "error.storage": "This browser blocked local storage, so the appointment was not saved.",
      "visit.title": "The salon",
      "visit.lead": "On Moda Caddesi. Visits are by appointment.",
      "visit.address.label": "Address",
      "visit.address": "Caferağa Mah. Moda Cad. No: 42",
      "visit.city": "Kadıköy / İstanbul",
      "visit.phone.label": "Phone",
      "visit.email.label": "Email",
      "visit.hours": "Hours",
      "visit.noteTitle": "Note",
      "visit.note": "Walk-ins are not taken. For a bridal trial, add the wedding date in the note.",
      "footer.note": "Atelier Vera is a fictional salon. Appointments are stored only in this browser."
    }
  };

  var state = {
    lang: "tr",
    themeExplicit: null,
    filter: "all",
    selectedTime: "",
    confirmingId: null,
    lightboxId: null
  };

  function t(key) {
    var pack = I18N[state.lang] || I18N.tr;
    return Object.prototype.hasOwnProperty.call(pack, key) ? pack[key] : key;
  }

  function portrait(o) {
    return (
      '<svg viewBox="0 0 320 420" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<rect width="320" height="420" fill="' + o.bg + '"/>' +
      '<path fill="' + o.cloth + '" d="M36 430 L36 358 C72 310 108 292 160 292 C212 292 248 310 284 358 L284 430 Z"/>' +
      '<ellipse cx="108" cy="174" rx="11" ry="15" fill="' + o.skin + '"/>' +
      '<ellipse cx="212" cy="174" rx="11" ry="15" fill="' + o.skin + '"/>' +
      '<path fill="' + o.skin + '" d="M136 206 h48 v64 c-8 10-40 10-48 0 Z"/>' +
      o.hair +
      '<ellipse cx="160" cy="168" rx="46" ry="58" fill="' + o.skin + '"/>' +
      (o.front || "") +
      "</svg>"
    );
  }

  var LOOKS = [
    {
      id: "bob",
      cat: "cut",
      art: function () {
        return portrait({
          bg: "#f3eadf",
          cloth: "#241c18",
          skin: "#efcbb3",
          hair: '<path fill="#1b1614" d="M98 156 C90 74 116 30 160 30 C204 30 230 74 222 156 L232 248 H88 Z"/>',
          front: '<path fill="#1b1614" d="M116 146 C128 108 192 108 204 146 C186 134 174 158 160 140 C146 158 134 134 116 146 Z"/><path d="M92 248 H228" stroke="#f3eadf" stroke-width="2"/>'
        });
      }
    },
    {
      id: "copper",
      cat: "color",
      art: function () {
        return portrait({
          bg: "#f6efe6",
          cloth: "#6e2e2a",
          skin: "#e2b08a",
          hair: '<path fill="#3a241c" d="M104 150 C96 68 122 28 160 28 C198 28 224 68 216 150 L242 404 H78 Z"/>',
          front: '<path fill="#d06a3a" d="M78 300 C110 270 124 320 118 404 H78 Z"/><path fill="#e39a62" d="M242 286 C206 270 196 330 208 404 H242 Z"/><path d="M160 46 C158 100 164 140 160 176" stroke="#f6efe6" stroke-width="2" fill="none" opacity=".75"/>'
        });
      }
    },
    {
      id: "ash",
      cat: "color",
      art: function () {
        return portrait({
          bg: "#2a312e",
          cloth: "#1a1f1d",
          skin: "#f0d2bc",
          hair: '<path fill="#d9c7a2" d="M104 150 C96 68 122 28 160 28 C198 28 224 68 216 150 L242 404 H78 Z"/>',
          front: '<path d="M112 210 C140 250 100 290 128 340 C150 380 120 395 132 404" stroke="#f7f3ea" stroke-width="5" fill="none" stroke-linecap="round" opacity=".75"/><path d="M200 200 C170 250 214 290 186 340 C160 386 206 392 190 404" stroke="#efe6cf" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/><path d="M160 44 V170" stroke="#2a312e" stroke-width="2" fill="none" opacity=".45"/>'
        });
      }
    },
    {
      id: "gloss",
      cat: "care",
      art: function () {
        return portrait({
          bg: "#ece8e2",
          cloth: "#3a332c",
          skin: "#d09574",
          hair: '<path fill="#161412" d="M108 148 C100 66 124 26 160 26 C196 26 220 66 212 148 L228 404 H92 Z"/>',
          front: '<path d="M172 64 C176 140 168 220 176 330" stroke="#f7f4ef" stroke-width="3.5" fill="none" stroke-linecap="round"/>'
        });
      }
    },
    {
      id: "chignon",
      cat: "bridal",
      art: function () {
        return portrait({
          bg: "#f7efe8",
          cloth: "#fbf7f2",
          skin: "#f0cbb4",
          hair: '<path fill="#5c2e2a" d="M114 172 C106 100 128 66 160 66 C192 66 214 100 206 172 C194 148 126 148 114 172 Z"/><circle cx="160" cy="58" r="28" fill="#5c2e2a"/>',
          front: '<circle cx="160" cy="58" r="9" fill="#e6d2a4"/><path d="M198 100 C228 150 210 220 230 300" stroke="#5c2e2a" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M122 112 C96 156 112 210 98 270" stroke="#5c2e2a" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="214" cy="156" r="3.5" fill="#e6d2a4"/><circle cx="224" cy="174" r="3" fill="#e6d2a4"/><path d="M128 300 C150 328 176 328 198 300" stroke="#e4cfc4" stroke-width="2" fill="none"/>'
        });
      }
    },
    {
      id: "crop",
      cat: "cut",
      art: function () {
        return portrait({
          bg: "#e6eee9",
          cloth: "#1e3a34",
          skin: "#e0b088",
          hair: '<path fill="#2c2824" d="M120 158 C114 102 132 70 160 68 C188 70 206 102 200 158 C186 136 134 136 120 158 Z"/>',
          front: '<path d="M130 104 C142 92 152 112 162 98 C172 114 184 94 198 108" stroke="#8a8176" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M140 292 L160 324 L180 292" fill="none" stroke="#d5e0da" stroke-width="2"/>'
        });
      }
    },
    {
      id: "chocolate",
      cat: "color",
      art: function () {
        return portrait({
          bg: "#f6f1ea",
          cloth: "#241c18",
          skin: "#a56b56",
          hair: '<path fill="#4a2b22" d="M102 152 C94 70 120 28 160 28 C200 28 226 70 218 152 L246 404 H74 Z"/>',
          front: '<path d="M108 220 C150 250 90 300 130 360 C155 395 118 400 138 404" stroke="#7a4634" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M206 210 C170 260 220 300 186 360" stroke="#6a3d30" stroke-width="6" fill="none" stroke-linecap="round" opacity=".85"/>'
        });
      }
    },
    {
      id: "waves",
      cat: "bridal",
      art: function () {
        return portrait({
          bg: "#f8eef0",
          cloth: "#fbf6f4",
          skin: "#f3d0c4",
          hair: '<path fill="#2a211c" d="M104 150 C96 68 122 28 160 28 C198 28 224 68 216 150 L240 404 H80 Z"/>',
          front: '<path d="M112 200 C148 236 96 280 132 330 C160 372 118 390 136 404" stroke="#5c463e" stroke-width="5" fill="none" stroke-linecap="round" opacity=".55"/><path d="M196 190 C160 236 214 286 178 340 C150 382 200 390 184 404" stroke="#5c463e" stroke-width="4" fill="none" stroke-linecap="round" opacity=".5"/><circle cx="210" cy="150" r="4" fill="#f2d2d6"/><circle cx="222" cy="168" r="3.2" fill="#f7e4e6"/><circle cx="214" cy="186" r="3" fill="#f2d2d6"/><path d="M124 304 C152 334 176 334 198 304" stroke="#f0d0d4" stroke-width="2" fill="none"/>'
        });
      }
    }
  ];

  function $(id) { return document.getElementById(id); }

  function serviceById(id) {
    for (var i = 0; i < SERVICES.length; i++) if (SERVICES[i].id === id) return SERVICES[i];
    return null;
  }

  function stylistById(id) {
    for (var i = 0; i < STYLISTS.length; i++) if (STYLISTS[i].id === id) return STYLISTS[i];
    return null;
  }

  function lookById(id) {
    for (var i = 0; i < LOOKS.length; i++) if (LOOKS[i].id === id) return LOOKS[i];
    return null;
  }

  function stylistLabel(id) {
    if (id === "any") return t("stylist.any");
    var s = stylistById(id);
    return s ? s.name : t("summary.empty");
  }

  function pad(n) { return String(n).padStart(2, "0"); }

  function todayISO() {
    var d = new Date();
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  function parseISODate(iso) {
    var parts = String(iso || "").split("-");
    if (parts.length !== 3) return null;
    var y = Number(parts[0]);
    var m = Number(parts[1]);
    var d = Number(parts[2]);
    if (!y || !m || !d) return null;
    var date = new Date(y, m - 1, d);
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
    return date;
  }

  function formatHM(mins) {
    return pad(Math.floor(mins / 60)) + ":" + pad(mins % 60);
  }

  function toMinutes(hhmm) {
    var parts = String(hhmm).split(":");
    return Number(parts[0]) * 60 + Number(parts[1]);
  }

  function hoursFor(day) {
    if (day === 1) return null;
    if (day === 0) return { open: 11 * 60, close: 17 * 60 };
    return { open: 10 * 60, close: 19 * 60 };
  }

  function hoursLabel(range) {
    if (!range) return t("hero.closed");
    return formatHM(range.open) + " – " + formatHM(range.close);
  }

  function money(amount) {
    var locale = state.lang === "tr" ? "tr-TR" : "en-GB";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0
    }).format(amount);
  }

  function duration(mins) {
    return state.lang === "tr" ? mins + " dk" : mins + " min";
  }

  function formatDay(iso) {
    var date = parseISODate(iso);
    if (!date) return t("summary.empty");
    return new Intl.DateTimeFormat(state.lang === "tr" ? "tr-TR" : "en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date);
  }

  function readStorage(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  function writeStorage(key, value) {
    localStorage.setItem(key, value);
  }

  function loadAppts() {
    try {
      var raw = JSON.parse(readStorage(STORAGE_APPTS) || "[]");
      if (!Array.isArray(raw)) return [];
      return raw.filter(function (a) {
        return a && typeof a.id === "string" && typeof a.date === "string" && typeof a.time === "string" &&
          serviceById(a.serviceId) && stylistById(a.stylistId);
      });
    } catch (e) {
      return [];
    }
  }

  function overlaps(aStart, aMins, bStart, bMins) {
    return aStart < bStart + bMins && bStart < aStart + aMins;
  }

  function hasConflict(appts, draft) {
    var start = toMinutes(draft.time);
    return appts.some(function (a) {
      if (a.date !== draft.date) return false;
      var svc = serviceById(a.serviceId);
      if (!svc) return false;
      if (!overlaps(start, draft.mins, toMinutes(a.time), svc.mins)) return false;
      if (draft.stylistId === "any" || a.stylistId === "any") return true;
      return draft.stylistId === a.stylistId;
    });
  }

  function slotStarts() {
    var slots = [];
    for (var m = 10 * 60; m <= 18 * 60; m += 30) slots.push(m);
    return slots;
  }

  function availableSlots(dateISO, service, stylistId) {
    var date = parseISODate(dateISO);
    if (!date || !service) return [];
    var range = hoursFor(date.getDay());
    if (!range) return [];
    var appts = loadAppts();
    return slotStarts().filter(function (start) {
      if (start < range.open || start + service.mins > range.close) return false;
      return !hasConflict(appts, {
        date: dateISO,
        time: formatHM(start),
        mins: service.mins,
        stylistId: stylistId || "any"
      });
    });
  }

  function applyStaticText() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    document.title = t("meta.title");
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("meta.description"));
    $("lang-switch").setAttribute("aria-label", t("lang.switch"));
    $("lang-tr").setAttribute("aria-pressed", state.lang === "tr" ? "true" : "false");
    $("lang-en").setAttribute("aria-pressed", state.lang === "en" ? "true" : "false");
    $("site-nav").setAttribute("aria-label", t("nav.label"));
    document.querySelector(".filters").setAttribute("aria-label", t("filter.label"));
  }

  function renderThemeButton() {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    var btn = $("theme-toggle");
    var label = t(dark ? "theme.toLight" : "theme.toDark");
    btn.setAttribute("aria-pressed", dark ? "true" : "false");
    btn.setAttribute("aria-label", label);
    $("theme-label").textContent = label;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#12100e" : "#f4efe6");
  }

  function updateMenuLabel() {
    var open = $("site-nav").classList.contains("is-open");
    var text = t(open ? "menu.close" : "menu.open");
    $("menu-label").textContent = text;
    $("menu-toggle").setAttribute("aria-label", text);
  }

  function renderServices() {
    var list = $("service-list");
    list.replaceChildren();
    SERVICES.forEach(function (svc, index) {
      var row = document.createElement("article");
      row.className = "service";
      var no = document.createElement("span");
      no.className = "service-no";
      no.textContent = pad(index + 1);
      var copy = document.createElement("div");
      var title = document.createElement("h3");
      title.textContent = t("service." + svc.id + ".name");
      var desc = document.createElement("p");
      desc.textContent = t("service." + svc.id + ".desc");
      copy.append(title, desc);
      var mins = document.createElement("span");
      mins.className = "service-mins";
      mins.textContent = duration(svc.mins);
      var price = document.createElement("span");
      price.className = "service-price";
      price.textContent = money(svc.price);
      row.append(no, copy, mins, price);
      list.append(row);
    });
  }

  function visibleLooks() {
    return LOOKS.filter(function (look) {
      return state.filter === "all" || look.cat === state.filter;
    });
  }

  function renderGallery() {
    var items = visibleLooks();
    var grid = $("gallery-grid");
    grid.replaceChildren();
    items.forEach(function (look) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "look";
      btn.dataset.look = look.id;
      var art = document.createElement("span");
      art.className = "look-art";
      art.innerHTML = look.art();
      var meta = document.createElement("span");
      meta.className = "look-meta";
      var index = document.createElement("span");
      index.className = "look-index";
      index.textContent = pad(LOOKS.indexOf(look) + 1);
      var kicker = document.createElement("span");
      kicker.className = "look-kicker";
      kicker.textContent = t("look." + look.id + ".kicker");
      var title = document.createElement("strong");
      title.textContent = t("look." + look.id + ".title");
      meta.append(index, kicker, title);
      btn.append(art, meta);
      grid.append(btn);
    });
    $("gallery-count").textContent = t("gallery.count").replace("{n}", String(items.length));
    $("gallery-empty").hidden = items.length !== 0;
    if (state.lightboxId && !items.some(function (look) { return look.id === state.lightboxId; })) {
      var dialog = $("lightbox");
      if (dialog.open) dialog.close();
      state.lightboxId = null;
    } else if (state.lightboxId && $("lightbox").open) {
      renderLightbox();
    }
  }

  function renderTeam() {
    var list = $("team-list");
    list.replaceChildren();
    STYLISTS.forEach(function (person) {
      if (person.id === "any") return;
      var card = document.createElement("article");
      card.className = "member";
      var role = document.createElement("p");
      role.textContent = t("stylist." + person.id + ".role");
      var name = document.createElement("h3");
      name.textContent = person.name;
      var years = document.createElement("p");
      years.className = "years";
      years.textContent = t("team.years").replace("{n}", String(person.years));
      var initials = document.createElement("p");
      initials.className = "initials";
      initials.textContent = person.initials;
      card.append(role, name, years, initials);
      list.append(card);
    });
  }

  function fillSelect(select, options, current) {
    var previous = current != null ? current : select.value;
    select.replaceChildren();
    options.forEach(function (opt) {
      var node = document.createElement("option");
      node.value = opt.value;
      node.textContent = opt.label;
      select.append(node);
    });
    if ([].some.call(select.options, function (opt) { return opt.value === previous; })) {
      select.value = previous;
    }
  }

  function fillFormChoices() {
    fillSelect($("field-service"), [{ value: "", label: t("form.choose") }].concat(SERVICES.map(function (svc) {
      return { value: svc.id, label: t("service." + svc.id + ".name") };
    })));
    fillSelect($("field-stylist"), STYLISTS.map(function (person) {
      return { value: person.id, label: stylistLabel(person.id) };
    }), $("field-stylist").value || "any");
  }

  function renderSlots() {
    var box = $("slots");
    var message = $("slots-message");
    var dateISO = $("field-date").value;
    var service = serviceById($("field-service").value);
    var stylistId = $("field-stylist").value || "any";
    box.replaceChildren();
    message.classList.remove("is-error");
    if (!dateISO) {
      state.selectedTime = "";
      message.textContent = t("form.pickDate");
      return;
    }
    var date = parseISODate(dateISO);
    if (!date) {
      state.selectedTime = "";
      message.textContent = t("error.date");
      return;
    }
    if (dateISO < todayISO()) {
      state.selectedTime = "";
      message.textContent = t("error.past");
      return;
    }
    if (!hoursFor(date.getDay())) {
      state.selectedTime = "";
      message.textContent = t("form.closed");
      return;
    }
    if (!service) {
      state.selectedTime = "";
      message.textContent = t("form.pickService");
      return;
    }
    var slots = availableSlots(dateISO, service, stylistId);
    if (slots.indexOf(toMinutes(state.selectedTime)) === -1) state.selectedTime = "";
    if (!slots.length) {
      message.textContent = t("form.noSlots");
      return;
    }
    message.textContent = "";
    slots.forEach(function (start) {
      var label = formatHM(start);
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "slot";
      btn.dataset.time = label;
      btn.setAttribute("role", "radio");
      btn.setAttribute("aria-checked", label === state.selectedTime ? "true" : "false");
      btn.textContent = label;
      box.append(btn);
    });
  }

  function renderSummary() {
    var service = serviceById($("field-service").value);
    var dateISO = $("field-date").value;
    var empty = t("summary.empty");
    $("summary-service").textContent = service ? t("service." + service.id + ".name") : empty;
    $("summary-duration").textContent = service ? duration(service.mins) : empty;
    $("summary-price").textContent = service ? money(service.price) : empty;
    $("summary-stylist").textContent = stylistLabel($("field-stylist").value || "any");
    $("summary-date").textContent = dateISO ? formatDay(dateISO) : empty;
    $("summary-time").textContent = state.selectedTime || empty;
  }

  function renderSaved() {
    var items = loadAppts().slice().sort(function (a, b) {
      return (a.date + a.time).localeCompare(b.date + b.time);
    });
    var list = $("saved-list");
    list.replaceChildren();
    $("saved-empty").hidden = items.length !== 0;
    var title = t("saved.title");
    $("saved-title").textContent = items.length ? title + " (" + items.length + ")" : title;
    items.forEach(function (appt) {
      var svc = serviceById(appt.serviceId);
      var li = document.createElement("li");
      li.className = "appt" + (isPast(appt) ? " is-past" : "");
      li.dataset.id = appt.id;
      var copy = document.createElement("div");
      var ref = document.createElement("p");
      ref.className = "appt-ref";
      ref.textContent = appt.id;
      var name = document.createElement("p");
      name.className = "appt-title";
      name.textContent = t("service." + svc.id + ".name");
      if (isPast(appt)) {
        var tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = t("appt.past");
        name.append(tag);
      }
      var meta = document.createElement("p");
      meta.className = "appt-meta";
      meta.textContent = stylistLabel(appt.stylistId) + " · " + formatDay(appt.date) + " · " + appt.time;
      copy.append(ref, name, meta);
      if (appt.note) {
        var note = document.createElement("p");
        note.className = "appt-note";
        note.textContent = appt.note;
        copy.append(note);
      }
      var actions = document.createElement("div");
      actions.className = "appt-actions";
      if (state.confirmingId === appt.id) {
        actions.append(actionButton("confirm-delete", t("saved.confirm")), actionButton("undo", t("saved.undo")));
      } else {
        actions.append(actionButton("cancel", t("saved.cancel")));
      }
      li.append(copy, actions);
      list.append(li);
    });
  }

  function actionButton(act, label) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.dataset.act = act;
    btn.textContent = label;
    return btn;
  }

  function isPast(appt) {
    var date = parseISODate(appt.date);
    if (!date) return false;
    var parts = appt.time.split(":");
    date.setHours(Number(parts[0]), Number(parts[1]), 0, 0);
    return date.getTime() < Date.now();
  }

  function nextOpenDate(from) {
    for (var i = 1; i <= 7; i++) {
      var next = new Date(from.getFullYear(), from.getMonth(), from.getDate() + i);
      if (hoursFor(next.getDay())) return next;
    }
    return null;
  }

  function renderToday() {
    var now = new Date();
    var range = hoursFor(now.getDay());
    var nowMins = now.getHours() * 60 + now.getMinutes();
    var dot = $("hero-dot");
    var next = $("hero-next");
    $("hero-day").textContent = t("day." + now.getDay());
    var openLater = range && nowMins < range.open;
    var openNow = range && nowMins >= range.open && nowMins < range.close;
    if (openNow || openLater) {
      dot.classList.remove("is-closed");
      $("hero-status").textContent = openNow ? t("hero.open") : t("hero.opensAt").replace("{time}", formatHM(range.open));
      $("hero-hours").textContent = hoursLabel(range);
      next.hidden = true;
      next.textContent = "";
      return;
    }
    dot.classList.add("is-closed");
    $("hero-status").textContent = t("hero.closed");
    $("hero-hours").textContent = range ? hoursLabel(range) : t("hours.monday.time");
    var upcoming = nextOpenDate(now);
    var upcomingRange = upcoming ? hoursFor(upcoming.getDay()) : null;
    next.hidden = false;
    next.textContent = t("hero.nextOpen") + ": " + t("day." + upcoming.getDay()) + " · " + hoursLabel(upcomingRange);
  }

  function renderLightbox() {
    var look = lookById(state.lightboxId);
    if (!look) return;
    $("lb-art").innerHTML = look.art();
    $("lb-kicker").textContent = t("look." + look.id + ".kicker");
    $("lb-title").textContent = t("look." + look.id + ".title");
    $("lb-text").textContent = t("look." + look.id + ".text");
    var items = visibleLooks();
    var index = items.findIndex(function (item) { return item.id === look.id; });
    $("lb-prev").disabled = items.length < 2;
    $("lb-next").disabled = items.length < 2;
    $("lb-prev").dataset.index = String(index);
    $("lb-next").dataset.index = String(index);
  }

  function openLook(id) {
    state.lightboxId = id;
    renderLightbox();
    var dialog = $("lightbox");
    if (!dialog.open) dialog.showModal();
  }

  function stepLightbox(delta) {
    var items = visibleLooks();
    if (!items.length || !state.lightboxId) return;
    var index = items.findIndex(function (item) { return item.id === state.lightboxId; });
    var next = (index + delta + items.length) % items.length;
    state.lightboxId = items[next].id;
    renderLightbox();
  }

  function clearFieldError(key) {
    var input = $("field-" + key);
    var err = $("err-" + key);
    if (input) input.removeAttribute("aria-invalid");
    if (err) {
      err.hidden = true;
      err.textContent = "";
    }
    if (key === "time") {
      $("slots").removeAttribute("aria-invalid");
      $("slots-message").classList.remove("is-error");
    }
  }

  function setFieldError(key, message) {
    if (key === "time") {
      $("slots").setAttribute("aria-invalid", "true");
      var hint = $("slots-message");
      hint.textContent = message;
      hint.classList.add("is-error");
      return;
    }
    var input = $("field-" + key);
    var err = $("err-" + key);
    if (input) input.setAttribute("aria-invalid", "true");
    if (err) {
      err.hidden = false;
      err.textContent = message;
    }
  }

  function validate() {
    var errors = {};
    var name = $("field-name").value.trim();
    var phone = $("field-phone").value;
    var email = $("field-email").value.trim();
    var service = serviceById($("field-service").value);
    var dateISO = $("field-date").value;
    var date = parseISODate(dateISO);
    if (name.length < 2) errors.name = t("error.name");
    var digits = phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 13) errors.phone = t("error.phone");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = t("error.email");
    if (!service) errors.service = t("error.service");
    if (!dateISO || !date) errors.date = t("error.date");
    else if (dateISO < todayISO()) errors.date = t("error.past");
    else if (!hoursFor(date.getDay())) errors.date = t("error.closed");
    if (!errors.date && service) {
      var openSlots = availableSlots(dateISO, service, $("field-stylist").value || "any");
      if (!state.selectedTime) errors.time = openSlots.length ? t("error.time") : t("form.noSlots");
      else if (openSlots.indexOf(toMinutes(state.selectedTime)) === -1) errors.time = t("error.conflict");
    }
    return { ok: Object.keys(errors).length === 0, errors: errors, name: name, email: email, service: service, dateISO: dateISO };
  }

  function makeRef(existing) {
    var alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    var ref = "";
    do {
      ref = "VERA-";
      for (var i = 0; i < 4; i++) ref += alphabet[Math.floor(Math.random() * alphabet.length)];
    } while (existing.some(function (appt) { return appt.id === ref; }));
    return ref;
  }

  function resetForm() {
    $("booking-form").reset();
    state.selectedTime = "";
    fillFormChoices();
    ["name", "phone", "email", "service", "date", "time"].forEach(clearFieldError);
    renderSlots();
    renderSummary();
  }

  function onSubmit(event) {
    event.preventDefault();
    ["name", "phone", "email", "service", "date", "time"].forEach(clearFieldError);
    var result = validate();
    Object.keys(result.errors).forEach(function (key) {
      setFieldError(key, result.errors[key]);
    });
    if (!result.ok) {
      var first = ["name", "phone", "email", "service", "date", "time"].find(function (key) { return result.errors[key]; });
      var focus = first === "time" ? $("slots") : $("field-" + first);
      if (focus && focus.focus) focus.focus();
      $("form-status").textContent = result.errors[first];
      return;
    }
    var appts = loadAppts();
    var appt = {
      id: makeRef(appts),
      name: result.name,
      phone: $("field-phone").value.trim(),
      email: result.email,
      note: $("field-note").value.trim(),
      serviceId: result.service.id,
      stylistId: $("field-stylist").value || "any",
      date: result.dateISO,
      time: state.selectedTime
    };
    appts.push(appt);
    try {
      writeStorage(STORAGE_APPTS, JSON.stringify(appts));
    } catch (e) {
      setFieldError("time", t("error.storage"));
      $("form-status").textContent = t("error.storage");
      return;
    }
    $("success-body").dataset.ref = appt.id;
    $("success-body").textContent = t("success.body").replace("{ref}", appt.id);
    $("booking-success").hidden = false;
    $("form-status").textContent = $("success-body").textContent;
    resetForm();
    renderSaved();
    $("booking-success").querySelector("h3").focus();
  }

  function bind() {
    $("lang-tr").addEventListener("click", function () { applyLanguage("tr"); });
    $("lang-en").addEventListener("click", function () { applyLanguage("en"); });
    $("theme-toggle").addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      state.themeExplicit = next;
      try { writeStorage(STORAGE_THEME, next); } catch (e) {}
      renderThemeButton();
    });
    var themeMedia = window.matchMedia("(prefers-color-scheme: dark)");
    themeMedia.addEventListener("change", function (event) {
      if (state.themeExplicit) return;
      document.documentElement.setAttribute("data-theme", event.matches ? "dark" : "light");
      renderThemeButton();
    });
    $("menu-toggle").addEventListener("click", function () {
      var nav = $("site-nav");
      nav.classList.toggle("is-open");
      var open = nav.classList.contains("is-open");
      $("menu-toggle").setAttribute("aria-expanded", open ? "true" : "false");
      updateMenuLabel();
    });
    $("site-nav").addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        $("site-nav").classList.remove("is-open");
        $("menu-toggle").setAttribute("aria-expanded", "false");
        updateMenuLabel();
      }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && $("site-nav").classList.contains("is-open")) {
        $("site-nav").classList.remove("is-open");
        $("menu-toggle").setAttribute("aria-expanded", "false");
        updateMenuLabel();
        $("menu-toggle").focus();
      }
      if (!$("lightbox").open) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        stepLightbox(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        stepLightbox(-1);
      }
    });
    document.querySelectorAll("[data-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.filter = btn.getAttribute("data-filter");
        document.querySelectorAll("[data-filter]").forEach(function (other) {
          other.setAttribute("aria-pressed", other === btn ? "true" : "false");
        });
        renderGallery();
      });
    });
    $("gallery-grid").addEventListener("click", function (event) {
      var btn = event.target.closest("[data-look]");
      if (btn) openLook(btn.dataset.look);
    });
    $("lb-close").addEventListener("click", function () { $("lightbox").close(); });
    $("lb-prev").addEventListener("click", function () { stepLightbox(-1); });
    $("lb-next").addEventListener("click", function () { stepLightbox(1); });
    $("lightbox").addEventListener("click", function (event) {
      if (event.target === $("lightbox")) $("lightbox").close();
    });
    $("lightbox").addEventListener("close", function () { state.lightboxId = null; });
    var form = $("booking-form");
    form.addEventListener("submit", onSubmit);
    form.addEventListener("input", onEdit);
    form.addEventListener("change", onEdit);
    $("slots").addEventListener("click", function (event) {
      var btn = event.target.closest(".slot");
      if (!btn) return;
      state.selectedTime = btn.dataset.time;
      clearFieldError("time");
      renderSlots();
      renderSummary();
    });
    $("saved-list").addEventListener("click", function (event) {
      var btn = event.target.closest("button");
      if (!btn) return;
      var item = btn.closest("[data-id]");
      if (!item) return;
      var id = item.dataset.id;
      if (btn.dataset.act === "cancel") {
        state.confirmingId = id;
        renderSaved();
        return;
      }
      if (btn.dataset.act === "undo") {
        state.confirmingId = null;
        renderSaved();
        return;
      }
      if (btn.dataset.act === "confirm-delete") {
        var next = loadAppts().filter(function (appt) { return appt.id !== id; });
        try { writeStorage(STORAGE_APPTS, JSON.stringify(next)); } catch (e) { return; }
        state.confirmingId = null;
        renderSaved();
        renderSlots();
      }
    });
    $("success-again").addEventListener("click", function () {
      $("booking-success").hidden = true;
      $("field-name").focus();
    });
    var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
    if ("IntersectionObserver" in window) {
      var links = Array.prototype.slice.call(document.querySelectorAll("#site-nav a"));
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (link) {
            if (link.getAttribute("href") === "#" + entry.target.id) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        });
      }, { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 });
      sections.forEach(function (section) { observer.observe(section); });
    }
  }

  function onEdit(event) {
    var target = event.target;
    if (!target.id || target.id.indexOf("field-") !== 0) return;
    var key = target.id.slice(6);
    clearFieldError(key);
    if (key === "date" || key === "service" || key === "stylist") {
      clearFieldError("time");
      renderSlots();
    }
    renderSummary();
  }

  function initTheme() {
    var saved = readStorage(STORAGE_THEME);
    if (saved === "dark" || saved === "light") {
      state.themeExplicit = saved;
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      state.themeExplicit = null;
      var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.setAttribute("data-theme", systemDark ? "dark" : "light");
    }
  }

  function applyLanguage(lang) {
    state.lang = lang === "en" ? "en" : "tr";
    try { writeStorage(STORAGE_LANG, state.lang); } catch (e) {}
    applyStaticText();
    renderThemeButton();
    updateMenuLabel();
    renderServices();
    renderGallery();
    renderTeam();
    fillFormChoices();
    renderSlots();
    renderSummary();
    renderSaved();
    renderToday();
    if ($("booking-success") && !$("booking-success").hidden && $("success-body").dataset.ref) {
      $("success-body").textContent = t("success.body").replace("{ref}", $("success-body").dataset.ref);
    }
  }

  function init() {
    initTheme();
    var savedLang = readStorage(STORAGE_LANG);
    state.lang = savedLang === "en" ? "en" : "tr";
    $("year").textContent = String(new Date().getFullYear());
    $("field-date").min = todayISO();
    var success = $("booking-success").querySelector("h3");
    success.tabIndex = -1;
    bind();
    applyLanguage(state.lang);
  }

  try {
    init();
  } finally {
    document.documentElement.classList.add("ready");
  }
})();
