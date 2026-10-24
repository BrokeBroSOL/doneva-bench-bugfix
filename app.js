(function () {
  'use strict';
  const L = window.RandevuLogic;
  const STORAGE_KEY = 'kuafor-randevular';

  const form = document.getElementById('appointment-form');
  const errorsEl = document.getElementById('form-errors');
  const successEl = document.getElementById('form-success');
  const listEl = document.getElementById('appointment-list');
  const totalEl = document.getElementById('total');

  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (e) { return []; }
  }
  function save(list) { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }

  function renderServices() {
    const tbody = document.querySelector('#service-table tbody');
    const select = form.elements.serviceId;
    select.innerHTML = '<option value="">Seçiniz…</option>';
    L.SERVICES.forEach(function (s) {
      const tr = document.createElement('tr');
      tr.innerHTML = '<td></td><td></td><td></td>';
      tr.children[0].textContent = s.name;
      tr.children[1].textContent = L.formatDuration(s.duration);
      tr.children[2].textContent = L.formatPrice(s.price);
      tbody.appendChild(tr);
      const opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = s.name + ' (' + L.formatDuration(s.duration) + ', ' + L.formatPrice(s.price) + ')';
      select.appendChild(opt);
    });
  }

  function renderAppointments() {
    const list = load().slice().sort(function (a, b) {
      return (a.date + a.time).localeCompare(b.date + b.time);
    });
    listEl.innerHTML = '';
    if (list.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'Henüz randevu yok.';
      listEl.appendChild(li);
    }
    list.forEach(function (a) {
      const s = L.findService(a.serviceId);
      const r = L.appointmentRange(a);
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = a.date + ' ' + L.minutesToTime(r.start) + '–' + L.minutesToTime(r.end) +
        ' · ' + a.name + ' · ' + s.name + ' · ' + L.formatPrice(s.price);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = 'İptal';
      btn.addEventListener('click', function () {
        save(load().filter(function (x) { return x.id !== a.id; }));
        renderAppointments();
      });
      li.appendChild(span);
      li.appendChild(btn);
      listEl.appendChild(li);
    });
    totalEl.textContent = L.formatPrice(L.calculateTotal(list));
  }

  function showErrors(errors) {
    errorsEl.innerHTML = '';
    errors.forEach(function (msg) {
      const li = document.createElement('li');
      li.textContent = msg;
      errorsEl.appendChild(li);
    });
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    successEl.hidden = true;
    const appt = {
      id: String(Date.now()),
      name: form.elements.name.value.trim(),
      phone: form.elements.phone.value.trim(),
      serviceId: form.elements.serviceId.value,
      date: form.elements.date.value,
      time: form.elements.time.value
    };
    const errors = L.validateAppointment(appt);
    if (errors.length === 0) {
      const existing = load();
      const conflict = L.findConflict(appt, existing);
      if (conflict) {
        const r = L.appointmentRange(conflict);
        errors.push('Bu saat dolu: ' + L.minutesToTime(r.start) + '–' + L.minutesToTime(r.end) + ' arasında başka bir randevu var.');
      }
    }
    if (errors.length) { showErrors(errors); return; }
    showErrors([]);
    const list = load();
    list.push(appt);
    save(list);
    form.reset();
    successEl.hidden = false;
    renderAppointments();
  });

  renderServices();
  renderAppointments();
})();
