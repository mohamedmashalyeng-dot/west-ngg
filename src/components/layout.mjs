import { html, raw, href, ltr } from '../lib/html.mjs';
import { icon } from './icons.mjs';
import { logo } from './ui.mjs';
import { site, contact, nav, routes, whatsappLink } from '../content/site.mjs';
import { projects } from '../content/projects.mjs';

const canonical = (path) => site.url + encodeURI(path);

function head({ title, description, path, assetVersion, image, noindex }) {
  const fullTitle = path === '/' ? title : `${title} | ${site.name}`;
  const ogImage = site.url + (image || '/assets/img/brand/og-image.jpg');
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    alternateName: [site.groupEn, site.groupAr],
    url: site.url,
    logo: `${site.url}/assets/img/brand/ngg-logo-ar-navy.png`,
    telephone: '+201000101263',
    email: contact.email,
    address: { '@type': 'PostalAddress', streetAddress: contact.address, addressLocality: 'الجيزة', addressCountry: 'EG' },
  };
  return html`<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script>document.documentElement.classList.add('js')</script>
  <title>${fullTitle}</title>
  <meta name="description" content="${description}">
  ${noindex ? raw('<meta name="robots" content="noindex">') : html`<link rel="canonical" href="${canonical(path)}">`}
  <meta property="og:type" content="website">
  <meta property="og:locale" content="ar_EG">
  <meta property="og:site_name" content="${site.name}">
  <meta property="og:title" content="${fullTitle}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical(path)}">
  <meta property="og:image" content="${ogImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#03182F">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/brand/favicon-32.png">
  <link rel="apple-touch-icon" href="/assets/img/brand/favicon-180.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&amp;display=swap">
  <link rel="stylesheet" href="/assets/css/main.css?v=${assetVersion}">
  <script type="application/ld+json">${raw(JSON.stringify(org))}</script>
  <script defer src="/assets/js/main.js?v=${assetVersion}"></script>
</head>`;
}

function projectsDropdown() {
  return html`<div class="dropdown" id="projects-menu" data-dropdown-panel>
    <ul class="dropdown__list">
      ${projects.map(
        (p) => html`<li><a href="${href(p.path)}">
          <span class="dropdown__name">${p.name}</span>
          <span class="dropdown__meta">${p.type} · ${p.area}</span>
        </a></li>`,
      )}
    </ul>
    <a class="dropdown__all" href="${href(routes.projects)}"><span>كل المشروعات في صفحة واحدة</span>${icon('arrow', { size: 18 })}</a>
  </div>`;
}

function header(active) {
  const current = (key) => (key === active ? raw(' aria-current="page"') : '');
  const desktopItems = nav.filter((n) => n.key !== 'contact');
  return html`<a class="skip-link" href="#main">انتقل إلى المحتوى</a>
<div class="topbar theme-dark">
  <div class="container topbar__inner">
    <p class="topbar__note">${site.groupAr} · مشروعات تجارية وسكنية في غرب القاهرة</p>
    <ul class="topbar__links">
      <li><a href="${contact.mapHref}" target="_blank" rel="noopener">${icon('pin', { size: 16 })}<span>${contact.addressShort}</span></a></li>
      <li><a href="${contact.phoneHref}">${icon('phone', { size: 16 })}${ltr(contact.phoneDisplay)}</a></li>
      <li><a href="mailto:${contact.email}">${icon('mail', { size: 16 })}${ltr(contact.email)}</a></li>
    </ul>
  </div>
</div>
<header class="site-header" data-header>
  <div class="container site-header__inner">
    <a class="brand" href="/">${logo('ngg-logo-ar', 'navy', { alt: 'نبيل غبريال جروب · WEST NGG — الصفحة الرئيسية', height: 52 })}</a>
    <nav class="main-nav" aria-label="القائمة الرئيسية">
      <ul class="main-nav__list">
        ${desktopItems.map((n) =>
          n.dropdown
            ? html`<li class="has-dropdown" data-dropdown>
                <a href="${href(n.href)}"${current(n.key)}>${n.label}</a>
                <button class="dropdown-toggle" type="button" aria-expanded="false" aria-controls="projects-menu">
                  ${icon('chevron', { size: 16 })}<span class="sr-only">اعرض قائمة المشروعات</span>
                </button>
                ${projectsDropdown()}
              </li>`
            : html`<li><a href="${href(n.href)}"${current(n.key)}>${n.label}</a></li>`,
        )}
      </ul>
    </nav>
    <div class="site-header__actions">
      <a class="header-phone" href="${contact.phoneHref}">${icon('phone', { size: 18 })}${ltr(contact.phoneDisplay)}</a>
      <a class="btn btn-dark btn-sm header-cta" href="${href(routes.contact)}"${current('contact')}>تواصل معنا</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu">
        <span class="menu-toggle__open">${icon('menu', { size: 24 })}</span>
        <span class="menu-toggle__close">${icon('close', { size: 24 })}</span>
        <span class="sr-only" data-menu-label>افتح القائمة</span>
      </button>
    </div>
  </div>
</header>
<div class="mobile-menu" id="mobile-menu" hidden>
    <nav class="container mobile-menu__inner" aria-label="القائمة على الجوال">
      <ul class="mobile-menu__list">
        ${nav.map(
          (n) => html`<li>
            <a href="${href(n.href)}"${current(n.key)}>${n.label}</a>
            ${n.dropdown
              ? html`<ul class="mobile-menu__sub">${projects.map((p) => html`<li><a href="${href(p.path)}">${p.name}<span>${p.area}</span></a></li>`)}</ul>`
              : ''}
          </li>`,
        )}
      </ul>
      <div class="mobile-menu__contact">
        <a class="btn btn-dark" href="${contact.phoneHref}">${icon('phone')}<span>اتصل ${contact.phoneDisplay}</span></a>
        <a class="btn btn-outline" href="${whatsappLink()}" target="_blank" rel="noopener">${icon('whatsapp')}<span>راسلنا على واتساب</span></a>
      </div>
    </nav>
</div>`;
}

function footer() {
  const year = new Date().getFullYear();
  return html`<footer class="site-footer theme-dark" data-footer>
  <div class="container site-footer__grid">
    <div class="site-footer__brand">
      ${logo('ngg-logo-ar', 'white', { alt: 'نبيل غبريال جروب', height: 64 })}
      <p>${site.summary}</p>
      <p class="motto">${site.motto}</p>
    </div>
    <nav class="site-footer__col" aria-labelledby="ft-company">
      <h2 id="ft-company">الشركة</h2>
      <ul>${nav.filter((n) => n.key !== 'projects').map((n) => html`<li><a href="${href(n.href)}">${n.label}</a></li>`)}</ul>
    </nav>
    <nav class="site-footer__col" aria-labelledby="ft-projects">
      <h2 id="ft-projects">مشروعاتنا</h2>
      <ul>
        ${projects.map((p) => html`<li><a href="${href(p.path)}">${p.name}</a></li>`)}
        <li><a href="${href(routes.projects)}">كل المشروعات</a></li>
      </ul>
    </nav>
    <div class="site-footer__col">
      <h2>تواصل معنا</h2>
      <ul class="site-footer__contact">
        <li>${icon('phone', { size: 18 })}<a href="${contact.phoneHref}">${ltr(contact.phoneDisplay)}</a></li>
        <li>${icon('whatsapp', { size: 18 })}<a href="${whatsappLink()}" target="_blank" rel="noopener">واتساب</a></li>
        <li>${icon('mail', { size: 18 })}<a href="mailto:${contact.email}">${ltr(contact.email)}</a></li>
        <li>${icon('pin', { size: 18 })}<a href="${contact.mapHref}" target="_blank" rel="noopener">${contact.address}</a></li>
      </ul>
    </div>
  </div>
  <div class="container site-footer__bottom">
    <p>جميع الحقوق محفوظة ${ltr(`© ${year} ${site.name}`)}</p>
    <p>تصميم وتطوير <a href="${site.credit.url}" target="_blank" rel="noopener" lang="en">${site.credit.label}</a></p>
  </div>
</footer>
<a class="float-wa" href="${whatsappLink()}" target="_blank" rel="noopener" data-quick-contact>
  ${icon('whatsapp', { size: 24 })}<span class="sr-only">راسلنا على واتساب</span>
</a>
<div class="mobile-bar" data-quick-contact>
  <a class="mobile-bar__btn" href="${contact.phoneHref}">${icon('phone', { size: 18 })}<span>اتصل بنا</span></a>
  <a class="mobile-bar__btn mobile-bar__btn--wa" href="${whatsappLink()}" target="_blank" rel="noopener">${icon('whatsapp', { size: 18 })}<span>واتساب</span></a>
</div>
<dialog class="lightbox" aria-label="عارض الصور" data-lightbox-dialog>
  <figure class="lightbox__figure">
    <img alt="" data-lightbox-img>
    <figcaption data-lightbox-caption></figcaption>
  </figure>
  <p class="lightbox__count" data-lightbox-count></p>
  <button class="lightbox__btn lightbox__close" type="button" data-lightbox-close>${icon('close', { size: 24 })}<span class="sr-only">إغلاق</span></button>
  <button class="lightbox__btn lightbox__prev" type="button" data-lightbox-prev>${icon('arrow', { size: 24, cls: 'flip' })}<span class="sr-only">الصورة السابقة</span></button>
  <button class="lightbox__btn lightbox__next" type="button" data-lightbox-next>${icon('arrow', { size: 24 })}<span class="sr-only">الصورة التالية</span></button>
</dialog>`;
}

export function page({ title, description, path, active, body, assetVersion, image, noindex, bodyClass = '' }) {
  return `<!doctype html>
<html lang="ar" dir="rtl">
${head({ title, description, path, assetVersion, image, noindex })}
<body class="${bodyClass}">
${header(active)}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
</body>
</html>
`;
}
