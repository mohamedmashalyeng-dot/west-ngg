/* WEST NGG — progressive enhancements. Every page works without this file. */
(function () {
  'use strict';

  var doc = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function each(list, fn) { Array.prototype.forEach.call(list, fn); }

  /* ---------- Sticky header shadow ---------- */
  function initHeader() {
    var header = document.querySelector('[data-header]');
    if (!header) return;
    var update = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ---------- Projects dropdown ---------- */
  function initDropdowns() {
    each(document.querySelectorAll('[data-dropdown]'), function (item) {
      var toggle = item.querySelector('.dropdown-toggle');
      var panel = item.querySelector('[data-dropdown-panel]');
      var closeTimer;
      var pinned = false; // opened by click or keyboard, so hover-out must not close it
      var canHover = window.matchMedia('(hover: hover)').matches;

      function setOpen(open) {
        item.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        if (!open) pinned = false;
      }
      toggle.addEventListener('click', function () {
        // A hover may already have opened the menu; the click then keeps it open.
        if (pinned) { setOpen(false); return; }
        pinned = true;
        setOpen(true);
      });
      if (canHover) {
        item.addEventListener('mouseenter', function () { clearTimeout(closeTimer); setOpen(true); });
        item.addEventListener('mouseleave', function () {
          if (pinned) return;
          closeTimer = setTimeout(function () { setOpen(false); }, 160);
        });
      }
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && item.classList.contains('is-open')) {
          setOpen(false);
          toggle.focus();
        }
      });
      item.addEventListener('focusout', function (e) {
        if (!item.contains(e.relatedTarget)) setOpen(false);
      });
      document.addEventListener('click', function (e) {
        if (!item.contains(e.target)) setOpen(false);
      });
      panel.addEventListener('click', function (e) {
        if (e.target.closest('a')) setOpen(false);
      });
    });
  }

  /* ---------- Mobile menu ---------- */
  function initMobileMenu() {
    var toggle = document.querySelector('.menu-toggle');
    var menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;
    var label = toggle.querySelector('[data-menu-label]');

    function focusables() {
      return Array.prototype.filter.call(menu.querySelectorAll('a, button'), function (el) {
        return el.offsetParent !== null;
      });
    }
    function setOpen(open, restoreFocus) {
      toggle.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
      doc.classList.toggle('menu-open', open);
      if (label) label.textContent = open ? 'أغلق القائمة' : 'افتح القائمة';
      if (open) {
        var first = focusables()[0];
        if (first) first.focus();
      } else if (restoreFocus) {
        toggle.focus();
      }
    }
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true', true);
    });
    document.addEventListener('keydown', function (e) {
      if (menu.hidden) return;
      if (e.key === 'Escape') { setOpen(false, true); return; }
      if (e.key !== 'Tab') return;
      // Keep focus inside the open menu (the toggle counts as part of it).
      var items = [toggle].concat(focusables());
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false, false);
    });
    window.matchMedia('(min-width: 961px)').addEventListener('change', function (mq) {
      if (mq.matches) setOpen(false, false);
    });
  }

  /* ---------- Panels that collapse on phones only ---------- */
  function initMobileCollapse() {
    var items = document.querySelectorAll('[data-collapse-mobile]');
    if (!items.length) return;
    var mq = window.matchMedia('(max-width: 720px)');
    function apply() {
      each(items, function (d) {
        var summary = d.querySelector('summary');
        d.open = !mq.matches;
        // On wide screens the panel is always open, so its summary is not a control.
        if (mq.matches) summary.removeAttribute('tabindex'); else summary.setAttribute('tabindex', '-1');
      });
    }
    each(items, function (d) {
      d.querySelector('summary').addEventListener('click', function (e) {
        if (!mq.matches) e.preventDefault();
      });
    });
    apply();
    mq.addEventListener('change', apply);
  }

  /* ---------- Lightbox ---------- */
  function initLightbox() {
    var dialog = document.querySelector('[data-lightbox-dialog]');
    var links = document.querySelectorAll('[data-lightbox]');
    if (!dialog || !links.length || typeof dialog.showModal !== 'function') return;
    var img = dialog.querySelector('[data-lightbox-img]');
    var caption = dialog.querySelector('[data-lightbox-caption]');
    var count = dialog.querySelector('[data-lightbox-count]');
    var prev = dialog.querySelector('[data-lightbox-prev]');
    var next = dialog.querySelector('[data-lightbox-next]');
    var group = [];
    var index = 0;
    var opener = null;

    function show(i) {
      index = (i + group.length) % group.length;
      var link = group[index];
      var thumb = link.querySelector('img');
      img.src = link.getAttribute('href');
      img.alt = thumb ? thumb.alt : '';
      caption.textContent = link.getAttribute('data-caption') || '';
      count.textContent = group.length > 1 ? 'الصورة ' + (index + 1) + ' من ' + group.length : '';
      prev.hidden = next.hidden = group.length < 2;
    }
    each(links, function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var name = link.getAttribute('data-lightbox');
        group = Array.prototype.filter.call(links, function (l) { return l.getAttribute('data-lightbox') === name; });
        opener = link;
        show(group.indexOf(link));
        dialog.showModal();
        doc.classList.add('lightbox-open');
      });
    });
    prev.addEventListener('click', function () { show(index - 1); });
    next.addEventListener('click', function () { show(index + 1); });
    dialog.querySelector('[data-lightbox-close]').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('keydown', function (e) {
      // RTL: the left arrow moves forward.
      if (e.key === 'ArrowLeft') show(index + 1);
      if (e.key === 'ArrowRight') show(index - 1);
    });
    dialog.addEventListener('close', function () {
      doc.classList.remove('lightbox-open');
      img.removeAttribute('src');
      if (opener) opener.focus();
    });
  }

  /* ---------- Gentle reveal on scroll ---------- */
  function initReveal() {
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    var targets = document.querySelectorAll(
      'main .section-head, .xp-card, .project-card, .area-card, .pillar, .panel, .mv-card, .org-card, .reason-grid li, .timeline__item, .building, .faq-group'
    );
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    var viewportBottom = window.innerHeight;
    each(targets, function (el) {
      // Anything already on screen stays visible; only content below the fold animates.
      if (el.getBoundingClientRect().top < viewportBottom) return;
      el.classList.add('reveal');
      observer.observe(el);
    });
    doc.classList.add('reveal-ready');
    // Safety net that does not rely on the observer: anything on screen (or
    // already scrolled past) is always shown.
    var queued = false;
    function sweep() {
      queued = false;
      each(document.querySelectorAll('.reveal:not(.is-visible)'), function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-visible');
      });
    }
    window.addEventListener('scroll', function () {
      if (!queued) { queued = true; window.requestAnimationFrame(sweep); }
    }, { passive: true });
    window.addEventListener('beforeprint', function () {
      each(document.querySelectorAll('.reveal'), function (el) { el.classList.add('is-visible'); });
    });
    window.setTimeout(sweep, 1500);
  }

  /* ---------- Quick contact (desktop circle / mobile bar) ----------
     Hidden wherever contact options are already on screen, so it never sits
     on top of the contact section, CTA bands or footer. */
  function initQuickContact() {
    var controls = document.querySelectorAll('[data-quick-contact]');
    if (!controls.length || !('IntersectionObserver' in window)) return;
    var zones = document.querySelectorAll('[data-footer], #contact, #enquiry, .cta-band');
    var visible = new Set();
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.add(entry.target); else visible.delete(entry.target);
      });
      var hide = visible.size > 0;
      each(controls, function (el) {
        el.classList.toggle('is-hidden', hide);
        el.inert = hide;
      });
    });
    each(zones, function (z) { observer.observe(z); });
  }

  /* ---------- Enquiry form (existing WordPress endpoint) ---------- */
  function initEnquiryForm() {
    var form = document.getElementById('enquiry-form');
    var configNode = document.getElementById('enquiry-config');
    if (!form || !configNode) return;

    var config;
    try { config = JSON.parse(configNode.textContent); } catch (e) { return; }
    var m = config.messages;
    var button = form.querySelector('.btn-submit');
    var buttonLabel = button.querySelector('[data-label]');
    var defaultLabel = buttonLabel.textContent;
    var status = document.getElementById('enquiry-status');
    var message = form.elements.message;
    var counter = form.querySelector('[data-count]');
    var busy = false;
    var credentials = null;
    var issuedAt = 0;
    var initPromise = null;

    var endpoint = null;
    try {
      var url = new URL(config.endpoint, window.location.href);
      if (url.origin === window.location.origin) endpoint = url.href;
    } catch (e) { endpoint = null; }

    function showStatus(text, state, focus) {
      status.hidden = false;
      status.textContent = text;
      status.setAttribute('data-state', state || 'info');
      if (focus) status.focus();
    }

    if (!endpoint) {
      showStatus(m.unavailable, 'error');
      return;
    }
    button.disabled = false;

    // Pre-fill when arriving from a project page (?project=slug).
    var params = new URLSearchParams(window.location.search);
    var project = params.get('project');
    if (project && config.projects[project]) {
      form.elements.interest.value = 'projects';
      if (!message.value) message.value = 'أريد معرفة تفاصيل ' + config.projects[project] + ' والوحدات المتاحة.';
      counter.textContent = message.value.length;
    }

    function normalizePhone(value) {
      return value
        .replace(/[٠-٩]/g, function (n) { return String(n.charCodeAt(0) - 1632); })
        .replace(/[۰-۹]/g, function (n) { return String(n.charCodeAt(0) - 1776); })
        .replace(/[\s()\-]/g, '');
    }

    function setError(name, text) {
      var wrap = form.querySelector('[data-field="' + name + '"]');
      if (!wrap) return;
      var control = wrap.querySelector('input, select, textarea');
      var error = wrap.querySelector('.field-error');
      if (text) {
        control.setAttribute('aria-invalid', 'true');
        error.textContent = text;
        error.hidden = false;
      } else {
        control.removeAttribute('aria-invalid');
        error.textContent = '';
        error.hidden = true;
      }
    }

    function validate() {
      var errors = {};
      var phone = normalizePhone(form.elements.phone.value.trim());
      var email = form.elements.email.value.trim();
      if (form.elements.full_name.value.trim().length < 2) errors.name = m.name;
      if (!/^\+?[0-9]{7,15}$/.test(phone)) errors.phone = m.phone;
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = m.email;
      if (!form.elements.interest.value) errors.interest = m.interest;
      if (message.value.trim().length < 10) errors.message = m.message;
      if (!form.elements.consent.checked) errors.consent = m.consent;
      ['name', 'phone', 'email', 'interest', 'message', 'consent'].forEach(function (k) { setError(k, errors[k]); });
      return { ok: Object.keys(errors).length === 0, phone: phone, first: Object.keys(errors)[0] };
    }

    async function request(values) {
      var controller = new AbortController();
      var timeout = window.setTimeout(function () { controller.abort(); }, 25000);
      try {
        var response = await fetch(endpoint, {
          method: 'POST',
          credentials: 'same-origin',
          cache: 'no-store',
          body: new URLSearchParams(values),
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });
        var result;
        try { result = await response.json(); } catch (e) { throw new Error(m.failed); }
        if (!response.ok || !result || result.success !== true) {
          var failure = new Error((result && result.data && result.data.message) || m.failed);
          failure.code = result && result.data && result.data.code;
          throw failure;
        }
        return result.data;
      } finally {
        window.clearTimeout(timeout);
      }
    }

    function prepare() {
      if (initPromise) return initPromise;
      initPromise = request({ action: config.initAction })
        .then(function (data) {
          if (!data || !data.nonce || !data.token) throw new Error(m.failed);
          credentials = data;
          issuedAt = Date.now();
          return data;
        })
        .finally(function () { initPromise = null; });
      return initPromise;
    }

    message.addEventListener('input', function () { counter.textContent = message.value.length; });
    form.addEventListener('input', function (e) {
      var wrap = e.target.closest('[data-field]');
      if (wrap && e.target.getAttribute('aria-invalid') === 'true') setError(wrap.getAttribute('data-field'), '');
    });
    form.addEventListener('change', function (e) {
      var wrap = e.target.closest('[data-field]');
      if (wrap && e.target.getAttribute('aria-invalid') === 'true') setError(wrap.getAttribute('data-field'), '');
    });
    // Fetch a fresh token only once the visitor starts using the form.
    form.addEventListener('focusin', function () { prepare().catch(function () {}); }, { once: true });

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (busy) return;
      var check = validate();
      if (!check.ok) {
        var firstWrap = form.querySelector('[data-field="' + check.first + '"]');
        var control = firstWrap && firstWrap.querySelector('input, select, textarea');
        if (control) control.focus();
        return;
      }
      busy = true;
      button.disabled = true;
      form.setAttribute('aria-busy', 'true');
      buttonLabel.textContent = m.sending;
      showStatus(m.sending, 'info');
      try {
        if (!credentials || Date.now() - issuedAt > 90 * 60 * 1000) await prepare();
        // The server rejects tokens younger than two seconds.
        var wait = 2200 - (Date.now() - issuedAt);
        if (wait > 0) await new Promise(function (r) { window.setTimeout(r, wait); });
        var values = {};
        new FormData(form).forEach(function (value, key) { values[key] = value; });
        values.phone = check.phone;
        values.action = config.sendAction;
        values.nonce = credentials.nonce;
        values.token = credentials.token;
        await request(values);
        // Success is shown only after the server confirms it.
        showStatus(m.success, 'success', true);
        form.reset();
        counter.textContent = '0';
        credentials = null;
      } catch (error) {
        if (error.code === 'expired') credentials = null;
        var text = error.name === 'AbortError' ? m.timeout : error instanceof TypeError ? m.network : error.message || m.failed;
        showStatus(text, 'error', true);
      } finally {
        busy = false;
        button.disabled = false;
        form.removeAttribute('aria-busy');
        buttonLabel.textContent = defaultLabel;
      }
    });
  }

  function start() {
    initHeader();
    initDropdowns();
    initMobileMenu();
    initMobileCollapse();
    initLightbox();
    initQuickContact();
    initEnquiryForm();
    initReveal();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
