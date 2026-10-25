import { readFileSync } from 'node:fs';
import { html, raw, href, ltr } from '../lib/html.mjs';
import { icon } from './icons.mjs';
import { contact, contactForm, routes, whatsappLink } from '../content/site.mjs';
import { projects } from '../content/projects.mjs';

const manifest = JSON.parse(
  readFileSync(new URL('../assets/img/manifest.json', import.meta.url), 'utf8'),
);

/* ---------- Images ---------- */

export function picture(name, { alt = '', sizes = '100vw', cls = '', eager = false } = {}) {
  const m = manifest[name];
  if (!m) throw new Error(`Unknown image: ${name}`);
  const files = Object.entries(m.files)
    .map(([w, file]) => [Number(w), file])
    .sort((a, b) => a[0] - b[0]);
  const [largestW, largest] = files[files.length - 1];
  const srcset = files.map(([w, file]) => `/assets/img/photos/${file} ${w}w`).join(', ');
  return html`<img class="${cls}" src="/assets/img/photos/${largest}" srcset="${srcset}" sizes="${sizes}"
    width="${largestW}" height="${Math.round((largestW * m.h) / m.w)}" alt="${alt}"
    ${eager ? raw('fetchpriority="high"') : raw('loading="lazy"')} decoding="async">`;
}

export const imageUrl = (name) => {
  const files = Object.entries(manifest[name].files).sort((a, b) => Number(a[0]) - Number(b[0]));
  return `/assets/img/photos/${files[files.length - 1][1]}`;
};

export function logo(name, tone, { alt = '', height = 48, cls = '' } = {}) {
  const m = manifest[`brand/${name}`];
  const width = Math.round((height * m.w) / m.h);
  return html`<img class="${cls}" src="/assets/img/brand/${name}-${tone}.png" alt="${alt}" width="${width}" height="${height}">`;
}

/* ---------- Text blocks ---------- */

export function sectionHead({ eyebrow, title, lead, id, action, cls = '' }) {
  return html`<div class="section-head ${cls}">
    <div class="section-head__text">
      ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ''}
      <h2 ${id ? raw(`id="${id}"`) : ''}>${title}</h2>
      ${lead ? html`<p class="lead">${lead}</p>` : ''}
    </div>
    ${action ? html`<div class="section-head__action">${action}</div>` : ''}
  </div>`;
}

export const paragraphs = (list) => list.map((p) => html`<p>${p}</p>`);

export function button(label, link, { variant = 'gold', iconName, external = false, cls = '', size } = {}) {
  const ext = external ? raw(' target="_blank" rel="noopener"') : '';
  return html`<a class="btn btn-${variant}${size ? ` btn-${size}` : ''} ${cls}" href="${href(link)}"${ext}>
    ${iconName ? icon(iconName) : ''}<span>${label}</span>
  </a>`;
}

export const textLink = (label, link) =>
  html`<a class="text-link" href="${href(link)}"><span>${label}</span>${icon('arrow', { size: 18 })}</a>`;

export function factList(rows, { cls = '' } = {}) {
  return html`<dl class="fact-list ${cls}">
    ${rows.map(([k, v]) => html`<div class="fact-row"><dt>${k}</dt><dd>${v}</dd></div>`)}
  </dl>`;
}

export function checkList(items, { cls = '' } = {}) {
  return html`<ul class="check-list ${cls}">${items.map((i) => html`<li>${icon('check', { size: 18 })}<span>${i}</span></li>`)}</ul>`;
}

export const chips = (items, cls = '') =>
  html`<ul class="chips ${cls}">${items.map((i) => html`<li>${i}</li>`)}</ul>`;

export function placeGroups(groups) {
  return html`<div class="place-groups">
    ${groups.map((g) => html`<div class="place-group"><h4>${g.title}</h4>${chips(g.items)}</div>`)}
  </div>`;
}

export function breadcrumbs(items) {
  return html`<nav class="crumbs" aria-label="مسار التصفح"><ol>
    ${items.map((c, i) =>
      i === items.length - 1
        ? html`<li><span aria-current="page">${c.label}</span></li>`
        : html`<li><a href="${href(c.href)}">${c.label}</a></li>`,
    )}
  </ol></nav>`;
}

/* ---------- Gallery & accordion ---------- */

export function galleryItem(item, group, { sizes = '(min-width: 900px) 33vw, 100vw', cls = '' } = {}) {
  return html`<figure class="gallery-item ${cls}">
    <a class="gallery-link" href="${imageUrl(item.image)}" data-lightbox="${group}" data-caption="${item.caption || item.alt}">
      ${picture(item.image, { alt: item.alt || item.caption, sizes })}
      <span class="gallery-zoom">${icon('expand', { size: 18 })}<span class="sr-only">تكبير الصورة</span></span>
    </a>
    ${item.caption ? html`<figcaption>${item.caption}</figcaption>` : ''}
  </figure>`;
}

// Secondary details: open on desktop and without JS; main.js collapses them on phones.
export const collapseOnMobile = (summary, body, cls = '') => html`<details class="${cls}" open data-collapse-mobile>
  <summary>${summary}<span class="accordion-sign" aria-hidden="true"></span></summary>
  ${body}
</details>`;

export function accordion(items, { cls = '' } = {}) {
  return html`<div class="accordion ${cls}">
    ${items.map(
      (item) => html`<details class="accordion-item">
        <summary><span class="accordion-q">${item.q}</span><span class="accordion-sign" aria-hidden="true"></span></summary>
        <div class="accordion-a"><p>${item.a}</p></div>
      </details>`,
    )}
  </div>`;
}

/* ---------- Projects ---------- */

export function projectMeta(p) {
  return html`<ul class="project-meta">
    <li>${icon('pin', { size: 17 })}<span>${p.area}، ${p.city}</span></li>
    <li>${icon('building', { size: 17 })}<span>${p.type}</span></li>
    ${p.keyFact ? html`<li>${icon('ruler', { size: 17 })}<span>${p.keyFact}</span></li>` : ''}
  </ul>`;
}

export function projectName(p, tag = 'h3') {
  return raw(
    `<${tag} class="project-name">${html`${p.name}${p.nameEn ? html` <span class="name-en" lang="en" dir="ltr">${p.nameEn}</span>` : ''}`}</${tag}>`,
  );
}

export function projectCard(p, { variant = 'compact', sizes } = {}) {
  return html`<article class="project-card project-card--${variant}">
    <a class="project-card__media" href="${href(p.path)}" tabindex="-1" aria-hidden="true">
      ${picture(p.cover, { alt: '', sizes: sizes || (variant === 'feature' ? '(min-width: 900px) 58vw, 100vw' : '(min-width: 900px) 24vw, 100vw') })}
      ${p.coverNote ? html`<span class="media-note">${p.coverNote}</span>` : ''}
    </a>
    <div class="project-card__body">
      ${p.badge ? html`<p class="badge">${p.badge}</p>` : ''}
      ${projectName(p)}
      ${projectMeta(p)}
      <p class="project-card__summary">${p.summary}</p>
      <a class="text-link" href="${href(p.path)}"><span>تفاصيل ${p.name}</span>${icon('arrow', { size: 18 })}</a>
    </div>
  </article>`;
}

export const contactHref = (p) => `${routes.contact}?project=${p.slug}#enquiry`;

/* ---------- Contact ---------- */

export function contactChannels({ cls = '' } = {}) {
  return html`<ul class="channels ${cls}">
    <li><a class="channel" href="${contact.phoneHref}">
      <span class="channel__icon">${icon('phone')}</span>
      <span class="channel__text"><span class="channel__label">اتصل بفريق المبيعات</span><span class="channel__value">${ltr(contact.phoneDisplay)}</span></span>
    </a></li>
    <li><a class="channel" href="${whatsappLink()}" target="_blank" rel="noopener">
      <span class="channel__icon">${icon('whatsapp')}</span>
      <span class="channel__text"><span class="channel__label">واتساب</span><span class="channel__value">ابدأ محادثة الآن</span></span>
    </a></li>
    <li><a class="channel" href="mailto:${contact.email}">
      <span class="channel__icon">${icon('mail')}</span>
      <span class="channel__text"><span class="channel__label">البريد الإلكتروني</span><span class="channel__value">${ltr(contact.email)}</span></span>
    </a></li>
    <li><a class="channel" href="${contact.mapHref}" target="_blank" rel="noopener">
      <span class="channel__icon">${icon('pin')}</span>
      <span class="channel__text"><span class="channel__label">المقر · افتح الخريطة</span><span class="channel__value">${contact.address}</span></span>
    </a></li>
  </ul>`;
}

export function ctaBand({ title, text, project } = {}) {
  const waText = project ? `مرحبًا، أريد معرفة المزيد عن ${project.name}.` : undefined;
  return html`<section class="cta-band theme-dark" aria-labelledby="cta-title">
    <div class="container cta-band__inner">
      <div>
        <h2 id="cta-title">${title}</h2>
        <p>${text}</p>
      </div>
      <div class="btn-row">
        ${button('أرسل استفسارك', project ? contactHref(project) : `${routes.contact}#enquiry`, { variant: 'gold' })}
        ${button('راسلنا على واتساب', whatsappLink(waText), { variant: 'outline-light', iconName: 'whatsapp', external: true })}
        ${button(contact.phoneDisplay, contact.phoneHref, { variant: 'outline-light', iconName: 'phone', cls: 'btn-ltr' })}
      </div>
    </div>
  </section>`;
}

export function enquiryForm({ heading = 'أرسل استفسارك', headingId = 'enquiry-title' } = {}) {
  const m = contactForm.messages;
  const config = {
    endpoint: contactForm.endpoint,
    initAction: contactForm.initAction,
    sendAction: contactForm.sendAction,
    messages: m,
    projects: Object.fromEntries(projects.map((p) => [p.slug, p.name])),
  };
  const field = (id, label, control, { optional = false, hint } = {}) => html`<div class="field" data-field="${id}">
      <label for="f-${id}">${label}${optional ? html` <span class="optional">(اختياري)</span>` : html` <span class="req" aria-hidden="true">*</span>`}</label>
      ${control}
      ${hint ? html`<p class="field-hint" id="f-${id}-hint">${hint}</p>` : ''}
      <p class="field-error" id="f-${id}-error" hidden></p>
    </div>`;
  return html`<form class="enquiry-form" id="enquiry-form" method="post" action="#enquiry" novalidate aria-labelledby="${headingId}">
    <script type="application/json" id="enquiry-config">${raw(JSON.stringify(config).replace(/</g, '\\u003c'))}</script>
    <div class="enquiry-form__head">
      <h3 id="${headingId}">${heading}</h3>
      <p>اكتب بياناتك وسؤالك، وسيتواصل معك فريق المبيعات. الحقول المعلّمة بـ <span aria-hidden="true">*</span> مطلوبة.</p>
    </div>
    <div class="hp-field" aria-hidden="true">
      <label for="f-website">اترك هذا الحقل فارغًا</label>
      <input id="f-website" name="website" type="text" tabindex="-1" autocomplete="off">
    </div>
    <div class="form-grid">
      ${field('name', 'الاسم بالكامل', raw('<input id="f-name" name="full_name" type="text" autocomplete="name" minlength="2" maxlength="100" required aria-describedby="f-name-error">'))}
      ${field('phone', 'رقم الهاتف', raw('<input id="f-phone" name="phone" type="tel" dir="ltr" class="ltr-input" placeholder="010XXXXXXXX" autocomplete="tel" inputmode="tel" maxlength="30" required aria-describedby="f-phone-error">'))}
      ${field('email', 'البريد الإلكتروني', raw('<input id="f-email" name="email" type="email" dir="ltr" class="ltr-input" placeholder="name@example.com" autocomplete="email" maxlength="254" aria-describedby="f-email-error">'), { optional: true })}
      ${field(
        'interest',
        'موضوع الاستفسار',
        html`<select id="f-interest" name="interest" required aria-describedby="f-interest-error">
          <option value="" selected disabled>اختر الموضوع</option>
          ${contactForm.interests.map((o) => html`<option value="${o.value}">${o.label}</option>`)}
        </select>`,
      )}
      <div class="field field--wide" data-field="message">
        <label for="f-message">رسالتك <span class="req" aria-hidden="true">*</span></label>
        <textarea id="f-message" name="message" rows="4" minlength="10" maxlength="3000" required placeholder="اكتب سؤالك أو ما تبحث عنه…" aria-describedby="f-message-hint f-message-error"></textarea>
        <p class="field-hint" id="f-message-hint"><span>10 أحرف على الأقل.</span> <span class="counter" dir="ltr" aria-hidden="true"><span data-count>0</span> / 3000</span></p>
        <p class="field-error" id="f-message-error" hidden></p>
      </div>
    </div>
    <div class="field field--consent" data-field="consent">
      <label class="consent" for="f-consent">
        <input type="checkbox" id="f-consent" name="consent" value="1" required aria-describedby="f-consent-error">
        <span>أوافق على أن يتواصل معي فريق WEST NGG بخصوص هذا الاستفسار. <span class="req" aria-hidden="true">*</span></span>
      </label>
      <p class="field-error" id="f-consent-error" hidden></p>
    </div>
    <div class="form-actions">
      <button class="btn btn-dark btn-submit" type="submit" disabled>
        ${icon('send')}<span data-label>أرسل الرسالة</span>
      </button>
      <p class="form-alt">تفضّل الحديث مباشرة؟ <a href="${contact.phoneHref}">${ltr(contact.phoneDisplay)}</a> أو <a href="${whatsappLink()}" target="_blank" rel="noopener">واتساب</a>.</p>
    </div>
    <div class="form-status" id="enquiry-status" role="status" aria-live="polite" tabindex="-1" hidden></div>
    <noscript><p class="form-status" data-state="error">لإرسال النموذج فعّل JavaScript، أو راسلنا على <a href="mailto:${contact.email}">${contact.email}</a>.</p></noscript>
  </form>`;
}
