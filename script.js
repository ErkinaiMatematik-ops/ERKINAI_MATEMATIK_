'use strict';
 
/* Мобильное меню */
const burger = document.querySelector('.burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }
});
 
/* Фото: если файла нет, показываем аккуратную заглушку */
document.querySelectorAll('[data-photo]').forEach(box => {
  const img = box.querySelector('img');
  const fail = () => box.classList.add('empty');
  img.addEventListener('error', fail);
  if (img.complete && img.naturalWidth === 0) fail();
});
 
/* График функции y = A·sin(B·x) */
(function () {
  const canvas = document.getElementById('graph');
  const ctx = canvas.getContext('2d');
  const amp = document.getElementById('amp');
  const freq = document.getElementById('freq');
  const label = document.getElementById('formula');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const W = canvas.width, H = canvas.height;
  const unit = 40;               // пикселей на единицу
  let phase = 0;
 
  function draw() {
    const A = +amp.value, B = +freq.value;
    ctx.clearRect(0, 0, W, H);
 
    // сетка
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#d3dfec';
    ctx.beginPath();
    for (let x = W / 2 % unit; x < W; x += unit) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
    for (let y = H / 2 % unit; y < H; y += unit) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
    ctx.stroke();
 
    // оси
    ctx.strokeStyle = '#10213f';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2);
    ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H);
    ctx.stroke();
 
    // кривая
    ctx.strokeStyle = '#d62f2f';
    ctx.lineWidth = 4;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    for (let px = 0; px <= W; px += 2) {
      const x = (px - W / 2) / unit;
      const y = A * Math.sin(B * x + phase);
      const py = H / 2 - y * unit;
      px === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();
 
    label.textContent = `y = ${A.toFixed(1)}·sin(${B.toFixed(1)}·x)`;
  }
 
  function loop() {
    phase += 0.02;
    draw();
    requestAnimationFrame(loop);
  }
 
  [amp, freq].forEach(el => el.addEventListener('input', draw));
  draw();
  if (!reduce) requestAnimationFrame(loop);
})();
 
/* Мини-задача по математике */
(function () {
  const buttons = document.querySelectorAll('#quiz .opts button');
  const res = document.getElementById('res');
  buttons.forEach(btn => btn.addEventListener('click', () => {
    const ok = btn.dataset.ok === '1';
    btn.classList.add(ok ? 'right' : 'wrong');
    if (ok) {
      res.textContent = 'Верно! 2x = 14 − 6 = 8, значит x = 4.';
      buttons.forEach(b => b.disabled = true);
    } else {
      res.textContent = 'Пока нет. Перенесите 6 вправо и разделите на 2.';
      btn.disabled = true;
    }
  }));
})();
 
/* Запись через WhatsApp. Впишите настоящий номер: только цифры, с кодом страны */
const PHONE = '996508444505';
document.getElementById('wa-link').href = `https://wa.me/${PHONE}`;
document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const text = `Здравствуйте, Эркинай эже! Меня зовут ${f.get('name')}. Интересует: ${f.get('topic')}.` +
    (f.get('msg') ? ` ${f.get('msg')}` : '');
  window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});
 
/* Год в подвале */
document.getElementById('year').textContent = new Date().getFullYear();