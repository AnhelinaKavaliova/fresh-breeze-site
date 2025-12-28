(function () {
  const $ = (s) => document.querySelector(s);

  // Highlight active nav item
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('[data-nav]').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path) a.classList.add('active');
  });

  // Smooth scroll for in-page anchors
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Fill service details on service.html using query param
  const details = {
    regular: {
      title: "Регулярная уборка",
      price: "от 99 zł",
      bullets: ["Пылесос и влажная уборка", "Кухня и санузел", "Вынос мусора", "Средства и инвентарь включены"],
      desc: "Подойдёт для поддержания чистоты 1–2 раза в неделю. Быстро, аккуратно, без лишней суеты."
    },
    general: {
      title: "Генеральная уборка",
      price: "от 199 zł",
      bullets: ["Тщательная уборка всех поверхностей", "Кухня (фасады, плита, фартук)", "Санузел (дезинфекция)", "Мытьё труднодоступных мест"],
      desc: "Когда нужно «как после ремонта», но без ремонта. Идеально перед гостями или после длительного перерыва."
    },
    renovation: {
      title: "После ремонта",
      price: "от 299 zł",
      bullets: ["Удаление строительной пыли", "Мытьё пола и плинтусов", "Очистка следов краски/затирки (бережно)", "Проветривание и финальная проверка"],
      desc: "Фокус на строительной пыли и мелких загрязнениях. Подбираем средства под покрытия и материалы."
    },
    windows: {
      title: "Мойка окон",
      price: "от 59 zł",
      bullets: ["Окна и рамы", "Подоконники", "Стеклянные двери/перегородки (по запросу)", "Без разводов"],
      desc: "Быстро наведём прозрачность. Можно как отдельной услугой, так и дополнением к уборке."
    }
  };

  const serviceRoot = document.body.getAttribute('data-page');
  if (serviceRoot === 'service') {
    const params = new URLSearchParams(location.search);
    const key = (params.get('s') || 'general').toLowerCase();
    const d = details[key] || details.general;

    const t = $('#serviceTitle'); if (t) t.textContent = d.title;
    const p = $('#servicePrice'); if (p) p.textContent = d.price;
    const ds = $('#serviceDesc'); if (ds) ds.textContent = d.desc;

    const ul = $('#serviceBullets');
    if (ul) {
      ul.innerHTML = '';
      d.bullets.forEach(b => {
        const li = document.createElement('li');
        li.textContent = b;
        ul.appendChild(li);
      });
    }

    // prefill select in form
    const sel = $('#orderService');
    if (sel) sel.value = key in details ? key : 'general';
  }

  // Simple "submit" for demo (no backend)
  const form = $('#leadForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = ($('#name')?.value || '').trim();
      const phone = ($('#phone')?.value || '').trim();
      const ok = name.length >= 2 && phone.length >= 6;

      const notice = $('#formNotice');
      if (notice) {
        notice.style.display = 'block';
        notice.textContent = ok
          ? "Спасибо! Заявка принята. Мы свяжемся с вами в ближайшее время."
          : "Проверьте, пожалуйста, имя и телефон (минимум 2 и 6 символов).";
      }
      if (ok) form.reset();
    });
  }
})();
