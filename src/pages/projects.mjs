import { html, raw, href, ltr } from '../lib/html.mjs';
import { icon } from '../components/icons.mjs';
import {
  picture, logo, sectionHead, paragraphs, button, textLink, chips, galleryItem, bigProjectCard,
  iconTile, contactHref, ctaBand, nameEn,
} from '../components/ui.mjs';
import { pageHero, scrollCue } from '../components/sections.mjs';
import { routes, whatsappLink } from '../content/site.mjs';
import { mall, westen, previous, previousIntro, current } from '../content/projects.mjs';

const num = (i) => String(i + 1).padStart(2, '0');
const mapEmbed = (q) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=14&hl=ar&output=embed`;
const mapLink = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const crumbs = (label) => [{ label: 'الرئيسية', href: '/' }, { label: 'مشاريعنا', href: routes.projects }, { label }];

// Full-bleed photo hero used by the project landing pages.
function landingHero({ image, alt, note, crumbsFor, children }) {
  return html`<section class="landing-hero theme-dark" aria-labelledby="page-title">
    <div class="landing-hero__media">${picture(image, { alt, eager: true, sizes: '100vw' })}</div>
    ${note ? html`<span class="media-note">${note}</span>` : ''}
    <div class="container landing-hero__inner">
      <nav class="crumbs" aria-label="مسار التصفح"><ol>
        ${crumbsFor.map((c, i) => (i === crumbsFor.length - 1 ? html`<li><span aria-current="page">${c.label}</span></li>` : html`<li><a href="${href(c.href)}">${c.label}</a></li>`))}
      </ol></nav>
      <div class="landing-hero__content">${children}</div>
    </div>
  </section>`;
}

function otherProjects(slug) {
  const items = [...current, { slug: 'previous', name: 'أعمالنا السابقة', path: routes.previous, cover: 'grand-heights-after', type: 'جراند هايتس · الكرمة · جازل' }]
    .filter((p) => p.slug !== slug);
  return html`<section class="section section--mist section--tight" aria-labelledby="others-title">
    <div class="container">
      ${sectionHead({ title: 'استكشف المزيد', id: 'others-title', action: textLink('كل المشاريع', routes.projects) })}
      <ul class="other-projects">
        ${items.map(
          (o) => html`<li><a href="${href(o.path)}">
            ${picture(o.cover, { alt: '', sizes: '120px' })}
            <span><strong>${o.name}</strong><span>${o.type}${o.area ? ` · ${o.area}` : ''}</span></span>
          </a></li>`,
        )}
      </ul>
    </div>
  </section>`;
}

/* ---------- /مشاريعنا/ ---------- */

export function projectsIndex() {
  const body = html`
  ${pageHero({
    crumbs: [{ label: 'الرئيسية', href: '/' }, { label: 'مشاريعنا' }],
    eyebrow: 'مشاريعنا',
    title: 'ما نبنيه اليوم',
    lead: 'مشروعات تعكس خبرتنا في التطوير والتنفيذ، نمنحك من خلالها صورة واضحة عن رؤيتنا وخططنا في الدقي و6 أكتوبر وحدائق الأهرام.',
    aside: html`<ul class="jump-list" aria-label="انتقل إلى مشروع">
      <li><a href="${href(mall.path)}">${mall.name}<span>${mall.area}</span></a></li>
      <li><a href="${href(westen.path)}"><span lang="en" dir="ltr" class="jump-list__name">WESTEN</span><span>غرب الجامعة، 6 أكتوبر</span></a></li>
      <li><a href="${href(routes.previous)}">أعمالنا السابقة<span>جراند هايتس · الكرمة · جازل</span></a></li>
    </ul>`,
  })}

  <section class="section section--paper" aria-labelledby="current-title">
    <div class="container">
      ${sectionHead({ eyebrow: 'مشروعات WEST Development', title: 'مشروعاتنا الحالية', id: 'current-title' })}
      <div class="big-grid">${current.map((p) => bigProjectCard(p))}</div>
    </div>
  </section>

  <section class="section section--mist" aria-labelledby="prev-title">
    <div class="container">
      ${sectionHead({
        eyebrow: 'أعمالنا السابقة',
        title: previousIntro.title,
        lead: previousIntro.text,
        id: 'prev-title',
        action: button('كل الأعمال السابقة', routes.previous, { variant: 'outline' }),
      })}
      <ul class="prev-grid">
        ${previous.map(
          (p) => html`<li><a class="prev-tile" href="${href(p.path)}">
            ${picture(p.cover, { alt: '', sizes: '(min-width: 900px) 30vw, 100vw' })}
            <span class="prev-tile__body">
              <span class="prev-tile__name">${p.name} <span lang="en" dir="ltr">${p.nameEn}</span></span>
              <span class="prev-tile__meta">${p.type} – ${p.area}</span>
              <span class="prev-tile__fact">${p.keyFact}</span>
            </span>
          </a></li>`,
        )}
      </ul>
    </div>
  </section>

  ${ctaBand({ title: 'تبحث عن وحدة أو فرصة استثمار؟', text: 'أخبرنا بالنشاط أو المساحة التي تحتاجها، وسيرد عليك فريق المبيعات بما هو متاح.' })}`;

  return {
    path: routes.projects,
    active: 'projects',
    title: 'مشاريعنا: ميتنج بوينت مول و WESTEN وأعمالنا السابقة',
    description:
      'مشروعات WEST Development: ميتنج بوينت مول أول مول مرخص في حدائق الأهرام، و WESTEN في غرب الجامعة بمدينة 6 أكتوبر، وأعمالنا السابقة جراند هايتس والكرمة وجازل.',
    body,
  };
}

/* ---------- Meeting Point Mall ---------- */

export function mallPage() {
  const p = mall;
  const l = p.location;
  const waText = `مرحبًا، أريد معرفة المزيد عن ${p.name}.`;
  const body = html`
  ${landingHero({
    image: p.cover,
    alt: p.coverAlt,
    note: p.coverNote,
    crumbsFor: crumbs(p.name),
    children: html`
      ${logo(p.logo, 'white', { alt: '', height: 44, cls: 'landing-hero__logo' })}
      <h1 id="page-title">${p.name} ${nameEn(p.nameEn)}</h1>
      <p class="landing-hero__tagline">${p.tagline}</p>
      <div class="btn-row">
        ${button('إستثمر الآن', contactHref(p), { variant: 'gold' })}
        ${button('راسلنا على واتساب', whatsappLink(waText), { variant: 'outline-light', iconName: 'whatsapp', external: true })}
      </div>`,
  })}

  <section class="section section--paper mall-intro" aria-label="تعريف بالمشروع">
    <div class="container mall-intro__inner">
      <div class="mall-intro__text">
        ${paragraphs(p.intro)}
        ${chips(p.uses, 'chips--gold')}
      </div>
      <ul class="figure-cards">
        ${p.figures.map((f) => html`<li><strong>${ltr(f.value)}<span>${f.unit}</span></strong><p>${f.label}</p></li>`)}
      </ul>
    </div>
    <div class="container cue-wrap">${scrollCue('features', 'مميزات المول')}</div>
  </section>

  <section class="section section--deep theme-dark" id="features" aria-labelledby="features-title">
    <div class="container">
      ${sectionHead({ eyebrow: p.nameEn, title: 'مميزات المول', id: 'features-title' })}
      <ol class="feature-cards">
        ${p.features.map(
          (f, i) => html`<li class="feature-card">
            <span class="feature-card__num">${num(i)}</span>
            <span class="feature-card__icon">${icon(f.icon, { size: 26 })}</span>
            <p>${f.text}</p>
          </li>`,
        )}
      </ol>
    </div>
  </section>

  <section class="section section--paper" id="location" aria-labelledby="location-title">
    <div class="container">
      <div class="loc-head">
        <div>
          <p class="eyebrow">الموقع</p>
          <h2 id="location-title">${l.title}</h2>
        </div>
        <div class="loc-head__text">${paragraphs(l.text)}</div>
      </div>
      <div class="loc-layout">
        <div class="loc-groups">
          ${l.groups.map(
            (g) => html`<div class="loc-group">
              <h3>${icon(g.icon, { size: 22 })}<span>${g.title}</span></h3>
              <ul>${g.items.map((i) => html`<li>${i}</li>`)}</ul>
            </div>`,
          )}
        </div>
        <div class="loc-map">
          <iframe src="${mapEmbed(l.mapQuery)}" title="خريطة موقع ${p.name}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          <div class="loc-map__bar">
            <p>${l.closing}</p>
            ${button(l.mapCta, mapLink(l.mapQuery), { variant: 'dark', iconName: 'map', external: true })}
          </div>
        </div>
      </div>
      <figure class="pyramids-strip">
        ${picture('giza-pyramids-view', { alt: 'إطلالة على أهرامات الجيزة', sizes: '100vw' })}
        <figcaption>إطلالة على أهرامات الجيزة، وعلى بُعد نحو 3 دقائق من المتحف المصري الكبير</figcaption>
      </figure>
    </div>
  </section>

  ${ctaBand({ title: 'عنوان نشاطك القادم في حدائق الأهرام', text: 'اسأل فريق المبيعات عن الوحدات المتاحة والمساحات المناسبة لنشاطك، من 39 إلى 900 م².', project: p })}
  ${otherProjects(p.slug)}`;

  return {
    path: p.path,
    active: 'projects',
    title: 'ميتنج بوينت مول (Meeting Point Mall) في قلب حدائق الأهرام',
    description:
      'Meeting Point Mall أول مول تجاري إداري طبي متكامل في حدائق الأهرام، أمام نادي حدائق الأهرام. أرض 3,000 م²، جراج 6,000 م²، ووحدات من 39 إلى 900 م².',
    body,
  };
}

/* ---------- WESTEN ---------- */

const placeName = (item) => (typeof item === 'string' ? item : item.name);
const placeQuery = (item) => (typeof item === 'string' ? `${item}، 6 أكتوبر، الجيزة` : item.q);

export function westenPage() {
  const p = westen;
  const a = p.advantages;
  const d = p.details;
  const waText = 'مرحبًا، أريد معرفة المزيد عن مشروع WESTEN في غرب الجامعة.';
  const body = html`
  ${landingHero({
    image: p.cover,
    alt: p.coverAlt,
    crumbsFor: crumbs('WESTEN | غرب الجامعة'),
    children: html`
      <p class="landing-hero__eyebrow" lang="ar">${p.hero.eyebrow}</p>
      <h1 id="page-title">${p.hero.title}</h1>
      <p class="landing-hero__lead">${p.hero.text}</p>
      <p class="landing-hero__by">${p.hero.by}</p>
      <div class="btn-row">
        <a class="btn btn-gold btn-bounce" href="#destinations"><span>${p.hero.cta}</span><span class="btn-bounce__arrow">${icon('down', { size: 20 })}</span></a>
        ${button('راسلنا على واتساب', whatsappLink(waText), { variant: 'outline-light', iconName: 'whatsapp', external: true })}
      </div>`,
  })}

  <section class="section section--paper" id="destinations" aria-labelledby="dest-title">
    <div class="container">
      ${sectionHead({
        eyebrow: 'الموقع',
        title: 'وجهات ومعالم محيطة بالمشروع',
        lead: 'اختر أي وجهة لعرضها على الخريطة.',
        id: 'dest-title',
      })}
      <div class="dest-layout" data-map-explorer>
        <div class="dest-list">
          ${p.destinations.map(
            (g, gi) => html`<details class="dest-group"${gi < 2 ? raw(' open') : ''}>
              <summary>${icon(g.icon, { size: 22 })}<span class="dest-group__title">${g.title}</span><span class="dest-group__count">${g.items.length}</span><span class="accordion-sign" aria-hidden="true"></span></summary>
              <ul>
                ${g.items.map(
                  (item) => html`<li><a class="dest-place" href="${mapLink(placeQuery(item))}" target="_blank" rel="noopener" data-map-q="${placeQuery(item)}">${icon('pin', { size: 16 })}<span>${placeName(item)}</span></a></li>`,
                )}
              </ul>
            </details>`,
          )}
        </div>
        <div class="dest-map">
          <div class="dest-map__frame">
            <iframe src="${mapEmbed(p.mapCenter)}" title="خريطة موقع WESTEN والوجهات المحيطة" loading="lazy" referrerpolicy="no-referrer-when-downgrade" data-map-frame></iframe>
          </div>
          <div class="dest-map__bar">
            <p data-map-label aria-live="polite">يعرض الآن: <strong>WESTEN · غرب الجامعة – أكتوبر بارك</strong></p>
            <button class="btn btn-outline btn-sm" type="button" data-map-reset data-map-q="${p.mapCenter}" hidden>العودة إلى المشروع</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--sand" aria-labelledby="adv-title">
    <div class="container">
      ${sectionHead({ eyebrow: a.eyebrow, title: a.title, lead: a.lead, id: 'adv-title' })}
      <ul class="adv-grid">${a.items.map((i) => iconTile(i))}</ul>
      <div class="adv-closing">
        <p>${a.text}</p>
        <p class="adv-closing__line">${a.closing}</p>
      </div>
    </div>
  </section>

  <section class="section section--paper" id="details" aria-labelledby="details-title">
    <div class="container">
      ${sectionHead({ eyebrow: 'WESTEN', title: d.title, lead: d.text, id: 'details-title' })}
      <div class="details-layout">
        <div class="building-stack" aria-label="مكونات المبنى">
          <p class="building-stack__label">${d.composition}</p>
          <ol class="floor-stack">
            ${[...d.floors].reverse().map((f) => html`<li>${f}</li>`)}
          </ol>
        </div>
        <div class="unit-cards">
          ${d.units.map(
            (u) => html`<article class="unit-card">
              <p class="unit-card__size"><strong>${ltr(u.size)}</strong><span>م²</span></p>
              <h3>وحدات بمساحة ${ltr(u.size)} م²</h3>
              <ul class="unit-card__facts">
                <li>${icon('layers', { size: 18 })}<span>تقع ${u.floor === 'الدور الأرضي' ? 'بالدور الأرضي' : 'بالأدوار المتكررة'}</span></li>
                <li>${icon('bed', { size: 18 })}<span>${u.rooms}</span></li>
                ${u.extra ? html`<li>${icon('tree', { size: 18 })}<span>${u.extra}</span></li>` : ''}
              </ul>
            </article>`,
          )}
          <article class="unit-card unit-card--garage">
            <span class="unit-card__icon">${icon('car', { size: 30 })}</span>
            <div><h3>${d.garage.title}</h3><p>${d.garage.text}</p></div>
          </article>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--mist" aria-labelledby="gallery-title">
    <div class="container">
      ${sectionHead({ eyebrow: 'معرض الصور', title: 'WESTEN من التصور إلى التنفيذ', lead: 'اضغط على أي صورة لعرضها بحجم أكبر.', id: 'gallery-title' })}
      <div class="gallery gallery--6">
        ${p.gallery.map((g) => galleryItem(g, 'westen', { sizes: '(min-width: 900px) 33vw, 50vw' }))}
      </div>
    </div>
  </section>

  ${ctaBand({ title: 'اكتشف وحدتك في WESTEN', text: 'اسأل فريق المبيعات عن الوحدات المتاحة بمساحات 168 و180 م².', project: p })}
  ${otherProjects(p.slug)}`;

  return {
    path: p.path,
    active: 'projects',
    title: 'WESTEN | غرب الجامعة – أكتوبر بارك: وحدات سكنية في 6 أكتوبر',
    description:
      'WESTEN من WEST Development في غرب الجامعة – أكتوبر بارك بمدينة 6 أكتوبر، قرب وصلة دهشور. وحدات 168 م² بحديقة خاصة 115 م² و180 م² بثلاث غرف نوم، وجراج مخصص.',
    body,
  };
}

/* ---------- أعمالنا السابقة ---------- */

function previousCard(p, i) {
  const bodyId = `${p.slug}-more`;
  return html`<article class="work-card" id="${p.slug}" aria-labelledby="${p.slug}-title">
    <div class="work-card__gallery work-card__gallery--${Math.min(p.gallery.length, 6)}">
      ${p.gallery.map((g) => galleryItem(g, p.slug, { sizes: '(min-width: 900px) 30vw, 50vw' }))}
    </div>
    <div class="work-card__body">
      <span class="work-card__num">${num(i)}</span>
      <h2 id="${p.slug}-title">${p.name} <span class="work-card__en" lang="en" dir="ltr">| ${p.nameEn}</span></h2>
      <p class="work-card__type">${icon('pin', { size: 17 })}<span>${p.type} – ${p.area}</span></p>
      <p class="work-card__summary">${p.summary}</p>
      <div class="more" data-more>
        <div class="more__body" id="${bodyId}">
          <h3 class="more__title">تفاصيل المشروع</h3>
          <div class="more__grid">
            ${p.blocks.map(
              (b) => html`<div class="more__block">
                <h4>${b.title}</h4>
                ${b.text ? html`<p>${b.text}</p>` : ''}
                <ul class="dot-list">${b.items.map((it) => html`<li>${it}</li>`)}</ul>
              </div>`,
            )}
            ${p.floors
              ? html`<div class="more__block">
                  <h4>مكونات المبنى</h4>
                  <ol class="floor-stack floor-stack--sm">${p.floors.map((f) => html`<li>${f}</li>`)}</ol>
                </div>`
              : ''}
          </div>
          <h3 class="more__title">الموقع والوجهات المحيطة</h3>
          <div class="place-groups">
            ${p.nearby.map((g) => html`<div class="place-group"><h4>${g.title}</h4>${chips(g.items)}</div>`)}
          </div>
        </div>
        <button class="more__toggle" type="button" aria-expanded="false" aria-controls="${bodyId}" hidden>
          <span data-more-label>عرض تفاصيل المشروع</span>${icon('chevron', { size: 20 })}
        </button>
      </div>
    </div>
  </article>`;
}

export function previousPage() {
  const body = html`
  <section class="collage-hero theme-dark" aria-labelledby="page-title">
    <div class="collage-hero__media" aria-hidden="true">
      ${picture('grand-heights-after', { alt: '', eager: true, sizes: '40vw' })}
      ${picture('karma-4', { alt: '', eager: true, sizes: '30vw' })}
      ${picture('gazel-photo', { alt: '', eager: true, sizes: '30vw' })}
    </div>
    <div class="container collage-hero__inner">
      <nav class="crumbs" aria-label="مسار التصفح"><ol>
        <li><a href="/">الرئيسية</a></li><li><a href="${href(routes.projects)}">مشاريعنا</a></li><li><span aria-current="page">أعمالنا السابقة</span></li>
      </ol></nav>
      <p class="eyebrow">أعمالنا السابقة</p>
      <h1 id="page-title">${previousIntro.title}</h1>
      <p class="collage-hero__names">${previousIntro.names}</p>
      <p class="collage-hero__names-en" lang="en" dir="ltr">${previousIntro.namesEn}</p>
      <ul class="jump-list" aria-label="انتقل إلى مشروع">
        ${previous.map((p) => html`<li><a href="#${p.slug}">${p.name}<span>${p.area}</span></a></li>`)}
      </ul>
    </div>
  </section>

  <section class="section section--paper section--tight" aria-labelledby="prev-intro">
    <div class="container why-block">
      <h2 id="prev-intro">${previousIntro.heading}</h2>
      <p class="lead">${previousIntro.text}</p>
    </div>
  </section>

  <section class="section section--mist" aria-label="المشروعات">
    <div class="container work-list">${previous.map((p, i) => previousCard(p, i))}</div>
  </section>

  ${ctaBand({ primary: { label: 'مشروعاتنا الحالية', href: routes.projects }, title: 'خبرة سابقة.. ومشروعات جديدة', text: 'تعرّف على مشروعاتنا الحالية: ميتنج بوينت مول في حدائق الأهرام و WESTEN في 6 أكتوبر.' })}
  ${otherProjects('previous')}`;

  return {
    path: routes.previous,
    active: 'projects',
    title: 'أعمالنا السابقة: جراند هايتس والكرمة وجازل',
    description:
      'خبرة بُنيت على أرض الواقع: جراند هايتس في 6 أكتوبر بوحدات من 225 إلى 370 م²، و6 عمارات الكرمة في حدائق الأهرام، ومبنى جازل متعدد الاستخدامات في الدقي.',
    body,
  };
}
