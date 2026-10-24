/* Kuaför Randevu - saf iş mantığı (DOM'a bağımlı değil). */
(function (root) {
  'use strict';

  const SERVICES = [
    { id: 'sac-kesim', name: 'Saç Kesimi', duration: 30, price: 250 },
    { id: 'sakal', name: 'Sakal Tıraşı', duration: 20, price: 150 },
    { id: 'boya', name: 'Saç Boyama', duration: 90, price: 900 },
    { id: 'fon', name: 'Fön', duration: 30, price: 200 },
    { id: 'cocuk', name: 'Çocuk Saç Kesimi', duration: 20, price: 180 }
  ];

  function findService(id) {
    return SERVICES.find(function (s) { return s.id === id; }) || null;
  }

  // "HH:MM" -> gün başından itibaren dakika
  function timeToMinutes(time) {
    const m = /^(\d{1,2}):(\d{2})$/.exec(String(time).trim());
    if (!m) throw new Error('Geçersiz saat: ' + time);
    const h = Number(m[1]);
    const min = Number(m[2]);
    if (h > 23 || min > 59) throw new Error('Geçersiz saat: ' + time);
    return h * 60 + min;
  }

  function minutesToTime(total) {
    const h = Math.floor(total / 60);
    const m = total % 60;
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
  }

  function formatPrice(amount) {
    return amount.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' TL';
  }

  function formatDuration(minutes) {
    if (minutes < 60) return minutes + ' dk';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m === 0 ? h + ' sa' : h + ' sa ' + m + ' dk';
  }

  function calculateTotal(appointments) {
    return appointments.reduce(function (sum, a) {
      const s = findService(a.serviceId);
      return sum + (s ? s.price : 0);
    }, 0);
  }

  function appointmentRange(appt) {
    const s = findService(appt.serviceId);
    if (!s) throw new Error('Bilinmeyen hizmet: ' + appt.serviceId);
    const start = timeToMinutes(appt.time);
    return { start: start, end: start + s.duration };
  }

  // Yarı açık aralıklar [başlangıç, bitiş): uç uca değenler çakışmaz.
  // Yeni randevu mevcut aralığın içinden başlasa da (ör. 10:15, dolu 10:00–10:30)
  // iki aralıktan biri diğerine giriyorsa çakışma sayılır.
  function rangesOverlap(newStart, newEnd, exStart, exEnd) {
    return newStart < exEnd && exStart < newEnd;
  }

  // Aynı gün içindeki mevcut randevularla çakışan ilk randevuyu döndürür (yoksa null).
  function findConflict(candidate, existing) {
    const c = appointmentRange(candidate);
    for (const appt of existing) {
      if (appt.date !== candidate.date) continue;
      const e = appointmentRange(appt);
      if (rangesOverlap(c.start, c.end, e.start, e.end)) return appt;
    }
    return null;
  }

  function validateAppointment(appt) {
    const errors = [];
    if (!appt.name || appt.name.trim().length < 2) errors.push('Ad en az 2 karakter olmalı.');
    const digits = String(appt.phone || '').replace(/\D/g, '');
    if (!/^(0?5\d{9})$/.test(digits)) errors.push('Geçerli bir cep telefonu girin (05xx xxx xx xx).');
    if (!findService(appt.serviceId)) errors.push('Hizmet seçin.');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(appt.date || '')) errors.push('Tarih seçin.');
    if (!/^\d{1,2}:\d{2}$/.test(appt.time || '')) errors.push('Saat seçin.');
    return errors;
  }

  const api = {
    SERVICES: SERVICES,
    findService: findService,
    timeToMinutes: timeToMinutes,
    minutesToTime: minutesToTime,
    formatPrice: formatPrice,
    formatDuration: formatDuration,
    calculateTotal: calculateTotal,
    appointmentRange: appointmentRange,
    rangesOverlap: rangesOverlap,
    findConflict: findConflict,
    validateAppointment: validateAppointment
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = api;
  } else {
    root.RandevuLogic = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
