const test = require('node:test');
const assert = require('node:assert/strict');
const L = require('../logic.js');

test('timeToMinutes / minutesToTime', () => {
  assert.equal(L.timeToMinutes('09:30'), 570);
  assert.equal(L.timeToMinutes('00:00'), 0);
  assert.equal(L.minutesToTime(570), '09:30');
  assert.equal(L.minutesToTime(L.timeToMinutes('17:05')), '17:05');
  assert.throws(() => L.timeToMinutes('25:00'));
  assert.throws(() => L.timeToMinutes('abc'));
});

test('formatDuration', () => {
  assert.equal(L.formatDuration(30), '30 dk');
  assert.equal(L.formatDuration(60), '1 sa');
  assert.equal(L.formatDuration(90), '1 sa 30 dk');
});

test('formatPrice Türkçe biçimde', () => {
  const s = L.formatPrice(1250);
  assert.match(s, /TL$/);
  assert.match(s, /1\.?250,00/);
});

test('calculateTotal hizmet fiyatlarını toplar', () => {
  assert.equal(L.calculateTotal([]), 0);
  assert.equal(L.calculateTotal([{ serviceId: 'sac-kesim' }, { serviceId: 'sakal' }]), 400);
  assert.equal(L.calculateTotal([{ serviceId: 'boya' }, { serviceId: 'yok' }]), 900);
});

test('appointmentRange hizmet süresine göre bitişi hesaplar', () => {
  assert.deepEqual(L.appointmentRange({ serviceId: 'boya', time: '14:00' }), { start: 840, end: 930 });
});

test('findConflict: aynı saatte randevu çakışır', () => {
  const existing = [{ id: '1', date: '2026-11-02', time: '10:00', serviceId: 'sac-kesim' }];
  const c = L.findConflict({ date: '2026-11-02', time: '10:00', serviceId: 'sakal' }, existing);
  assert.equal(c && c.id, '1');
});

test('findConflict: mevcut randevuya sarkan önceki randevu çakışır', () => {
  const existing = [{ id: '1', date: '2026-11-02', time: '10:00', serviceId: 'sac-kesim' }];
  assert.ok(L.findConflict({ date: '2026-11-02', time: '09:45', serviceId: 'sac-kesim' }, existing));
});

test('findConflict: uç uca randevular çakışmaz', () => {
  const existing = [{ id: '1', date: '2026-11-02', time: '10:00', serviceId: 'sac-kesim' }];
  assert.equal(L.findConflict({ date: '2026-11-02', time: '10:30', serviceId: 'sakal' }, existing), null);
  assert.equal(L.findConflict({ date: '2026-11-02', time: '09:30', serviceId: 'sac-kesim' }, existing), null);
});

test('findConflict: farklı gün çakışmaz', () => {
  const existing = [{ id: '1', date: '2026-11-02', time: '10:00', serviceId: 'sac-kesim' }];
  assert.equal(L.findConflict({ date: '2026-11-03', time: '10:00', serviceId: 'sac-kesim' }, existing), null);
});

test('validateAppointment', () => {
  const ok = { name: 'Ayşe Yılmaz', phone: '0532 000 00 00', serviceId: 'fon', date: '2026-11-02', time: '11:00' };
  assert.deepEqual(L.validateAppointment(ok), []);
  const bad = L.validateAppointment({ name: 'A', phone: '123', serviceId: '', date: '', time: '' });
  assert.equal(bad.length, 5);
});
