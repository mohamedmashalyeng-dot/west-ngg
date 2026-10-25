import { html, href, ltr } from '../lib/html.mjs';
import { icon } from '../components/icons.mjs';
import {
  picture, logo, sectionHead, paragraphs, button, textLink, factList, checkList, placeGroups,
  galleryItem, projectCard, contactHref, ctaBand, collapseOnMobile,
} from '../components/ui.mjs';
import { pageHero, developerNote } from '../components/sections.mjs';
import { routes, whatsappLink } from '../content/site.mjs';
import { projects, featured, portfolio } from '../content/projects.mjs';

const num = (i) => String(i + 1).padStart(2, '0');

/* ---------- /مشاريعنا/ ---------- */

export function projectsIndex() {
  const body = html`
  ${pageHero({
    crumbs: [{ label: 'الرئيسية', href: '/' }, { label: 'مشروعاتنا' }],
    eyebrow: 'مشروعاتنا',
    title: 'مشروعاتنا في غرب القاهرة والجيزة',
    lead: 'مول تجاري وإداري وطبي في حدائق الأهرام من WEST Development، وأربعة مشروعات سكنية نفّذتها المجموعة في حدائق الأهرام و6 أكتوبر والدقي.',
    aside: html`<ul class="jump-list" aria-label="انتقل إلى مشروع">
      ${projects.map((p) => html`<li><a href="${href(p.path)}">${p.name}<span>${p.area}</span></a></li>`)}
    </ul>`,
  })}

  <section class="section section--paper" aria-labelledby="dev-projects">
    <div class="container">
      ${sectionHead({ eyebrow: 'مشروع WEST Development', title: 'ميتنج بوينت مول في حدائق الأهرام', lead: 'مشروع متعدد الاستخدامات يجمع المحلات والمكاتب والعيادات، ويضم مقر WEST Development الرئيسي.', id: 'dev-projects' })}
      ${projectCard(featured, { variant: 'feature' })}
    </div>
  </section>

  <section class="section section--mist" aria-labelledby="portfolio-title">
    <div class="container">
      ${sectionHead({ eyebrow: 'من سجل أعمال المجموعة', title: 'مشروعات سكنية نفّذتها المجموعة', lead: 'عمارات وأبراج سكنية في حدائق الأهرام و6 أكتوبر والدقي. منها مشروع قائم به وحدات متاحة، ومنها ما تم تسليمه.', id: 'portfolio-title' })}
      <div class="projects-grid projects-grid--even">${portfolio.map((p) => projectCard(p))}</div>
    </div>
  </section>

  <section class="section section--paper" aria-labelledby="compare-title">
    <div class="container">
      ${sectionHead({ eyebrow: 'مقارنة سريعة', title: 'ملخص المشروعات في جدول واحد', lead: 'المنطقة والنوع وأهم معلومة عن كل مشروع.', id: 'compare-title' })}
      <div class="table-wrap" role="region" aria-labelledby="compare-title" tabindex="0">
        <table class="compare-table">
          <thead><tr><th scope="col">المشروع</th><th scope="col">المنطقة</th><th scope="col">النوع</th><th scope="col">أهم معلومة</th><th scope="col"><span class="sr-only">التفاصيل</span></th></tr></thead>
          <tbody>
            ${projects.map(
              (p) => html`<tr>
                <th scope="row">${p.name}${p.nameEn ? html`<span class="name-en" lang="en" dir="ltr">${p.nameEn}</span>` : ''}</th>
                <td data-label="المنطقة">${p.area}، ${p.city}</td>
                <td data-label="النوع">${p.type}</td>
                <td data-label="أهم معلومة">${p.keyFact}${p.badge && p.group === 'portfolio' ? html`<span class="table-badge">${p.badge}</span>` : ''}</td>
                <td class="compare-table__link"><a class="text-link" href="${href(p.path)}"><span>التفاصيل<span class="sr-only"> عن ${p.name}</span></span>${icon('arrow', { size: 16 })}</a></td>
              </tr>`,
            )}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  ${ctaBand({ title: 'لم تجد ما تبحث عنه؟', text: 'أخبرنا بالنشاط أو المساحة التي تحتاجها، وسيرد عليك فريق المبيعات بما هو متاح.' })}`;

  return {
    path: routes.projects,
    active: 'projects',
    title: 'مشروعاتنا: ميتنج بوينت مول ومشروعات سكنية في غرب القاهرة',
    description:
      'كل مشروعات WEST NGG في صفحة واحدة: ميتنج بوينت مول في حدائق الأهرام، وغرب الجامعة وجراند هايتس في 6 أكتوبر، وعمارات الكرمة، وبرج جازل في الدقي.',
    body,
  };
}

/* ---------- Single project ---------- */

function overview(p) {
  return html`<section class="section section--paper" aria-labelledby="overview-title">
    <div class="container overview">
      <div class="overview__text">
        <p class="eyebrow">نظرة عامة</p>
        <h2 id="overview-title">${p.headline}</h2>
        ${paragraphs(p.intro)}
        ${p.logo ? logo(p.logo, 'navy', { alt: p.nameEn, height: 44, cls: 'overview__logo' }) : ''}
      </div>
      <aside class="overview__facts" aria-labelledby="facts-title">
        <h3 id="facts-title">المشروع في سطور</h3>
        ${factList(p.facts)}
      </aside>
    </div>
  </section>`;
}

function whySection(p) {
  if (!p.why) return '';
  return html`<section class="section section--sand section--tight" aria-labelledby="why-title">
    <div class="container why-block">
      <h2 id="why-title">${p.why.title}</h2>
      <div>${paragraphs(p.why.text)}</div>
    </div>
  </section>`;
}

function unitsSection(p) {
  const u = p.units;
  const hasFloors = p.floors;
  const hasBuildings = p.buildings;
  if (!u && !hasFloors && !hasBuildings && !p.amenities) return '';
  return html`<section class="section section--mist" aria-labelledby="units-title">
    <div class="container">
      ${hasBuildings
        ? html`${sectionHead({ eyebrow: 'العمارات', title: `${p.buildings.length} عمارات في مواقع مختلفة`, lead: 'لكل عمارة موقعها داخل حدائق الأهرام.', id: 'units-title' })}
          <ul class="building-grid">
            ${p.buildings.map(
              (b, i) => html`<li class="building">
                ${galleryItem({ image: b.image, caption: '', alt: `صورة ${b.name}` }, 'buildings', { sizes: '(min-width: 900px) 30vw, 50vw' })}
                <div class="building__text"><span class="building__num">${num(i)}</span><h3>${b.name}</h3><p>الموقع: ${b.plot}</p></div>
              </li>`,
            )}
          </ul>`
        : ''}
      ${u
        ? html`<div class="units-layout">
            <div>
              <p class="eyebrow">الوحدات</p>
              <h2 id="units-title">${u.title}</h2>
              <p class="lead">${u.text}</p>
              ${u.note ? html`<p class="note">${u.note}</p>` : ''}
            </div>
            <div class="units-figures">
              ${u.items ? html`<ul class="unit-tiles unit-tiles--light">${u.items.map((t, i) => html`<li><span>${num(i)}</span>${t}</li>`)}</ul>` : ''}
              ${u.range
                ? html`<p class="range-card"><span>المساحات</span><strong>من ${ltr(u.range.from)} م² إلى ${ltr(u.range.to)} م²</strong></p>`
                : ''}
              ${u.sizes
                ? html`<ul class="size-cards">${u.sizes.map((s) => html`<li><strong>${ltr(s)}</strong><span>م²</span></li>`)}</ul>`
                : ''}
            </div>
          </div>`
        : ''}
      ${p.amenities
        ? html`<div class="amenities">
            <h3>${p.amenities.title}</h3>
            ${checkList(p.amenities.items, { cls: 'check-list--grid' })}
          </div>`
        : ''}
      ${hasFloors
        ? html`<div class="units-layout">
            <div>
              <p class="eyebrow">مكونات البرج</p>
              <h2 id="units-title">${p.floors.title}</h2>
              <p class="lead">${p.floors.text}</p>
            </div>
            <ol class="floor-stack" aria-label="أدوار البرج من الأعلى إلى الأسفل">
              ${[...p.floors.items].reverse().map((f) => html`<li>${f}</li>`)}
            </ol>
          </div>`
        : ''}
    </div>
  </section>`;
}

function locationSection(p) {
  const l = p.location;
  if (!l) return '';
  return html`<section class="section section--paper" aria-labelledby="location-title">
    <div class="container location">
      <div class="location__text">
        <p class="eyebrow">الموقع</p>
        <h2 id="location-title">${l.title}</h2>
        <p class="lead">${l.text}</p>
        ${l.nearby
          ? html`<ul class="time-list time-list--light">
              ${l.nearby.map(([place, time]) => html`<li><span>${place}</span><span class="time-list__time">${icon('clock', { size: 16 })}${time}</span></li>`)}
            </ul>
            <p class="note">${l.timesNote}</p>`
          : ''}
      </div>
      <div class="location__places">
        ${l.groups
          ? collapseOnMobile(html`<h3 class="places-title">أماكن قريبة من المشروع</h3>`, placeGroups(l.groups), 'mini-collapse mini-collapse--block')
          : ''}
        ${p.axes
          ? collapseOnMobile(
              html`<h3 class="places-title">${p.axes.title}</h3>`,
              html`<ul class="axes">${p.axes.items.map(([n, t]) => html`<li><h4>${n}</h4><p>${t}</p></li>`)}</ul>`,
              'mini-collapse mini-collapse--block axes-block',
            )
          : ''}
        ${p.slug === 'meeting-point-mall'
          ? html`<div class="design-note"><h3>${p.design.title}</h3><p>${p.design.text}</p></div>`
          : ''}
      </div>
    </div>
  </section>`;
}

function featuresSection(p) {
  if (!p.zones) return '';
  return html`<section class="section section--deep theme-dark" aria-labelledby="features-title">
    <div class="container">
      ${sectionHead({ eyebrow: 'المميزات والخدمات', title: 'ما الذي يقدمه المول لزواره وأصحاب الوحدات؟', id: 'features-title' })}
      <div class="features-layout">
        <div class="panel">
          <h3>${icon('layers')}<span>${p.zones.title}</span></h3>
          <ol class="numbered">${p.zones.items.map((z, i) => html`<li><span>${num(i)}</span>${z}</li>`)}</ol>
        </div>
        <div class="panel">
          <h3>${icon('building')}<span>${p.services.title}</span></h3>
          ${checkList(p.services.items)}
        </div>
      </div>
      ${p.highlights
        ? html`<div class="highlights">
            <h3>${p.highlights.title}</h3>
            <ol class="highlight-list">${p.highlights.items.map((h, i) => html`<li><span>${num(i)}</span><p>${h}</p></li>`)}</ol>
          </div>`
        : ''}
    </div>
  </section>`;
}

function progressSection(p) {
  if (!p.progress) return '';
  return html`<section class="section section--deep theme-dark" aria-labelledby="progress-title">
    <div class="container">
      ${sectionHead({ eyebrow: 'من موقع العمل', title: p.progress.title, lead: p.progress.text, id: 'progress-title' })}
      <div class="before-after before-after--wide">
        ${galleryItem(p.progress.before, 'project', { sizes: '(min-width: 900px) 40vw, 50vw', cls: 'is-before' })}
        ${galleryItem(p.progress.after, 'project', { sizes: '(min-width: 900px) 40vw, 50vw', cls: 'is-after' })}
      </div>
    </div>
  </section>`;
}

function gallerySection(p) {
  const items = (p.gallery || []).filter((g) => g.image !== p.cover || p.gallery.length > 1);
  if (items.length < 2) return '';
  return html`<section class="section section--sand" aria-labelledby="gallery-title">
    <div class="container">
      ${sectionHead({ eyebrow: 'معرض الصور', title: `صور ${p.name}`, lead: 'اضغط على أي صورة لعرضها بحجم أكبر.', id: 'gallery-title' })}
      <div class="gallery gallery--${Math.min(items.length, 6)}">
        ${items.map((g) => galleryItem(g, 'project', { sizes: '(min-width: 900px) 33vw, 50vw' }))}
      </div>
    </div>
  </section>`;
}

function storySection(p) {
  if (!p.story) return '';
  return html`<section class="section section--paper section--tight" aria-labelledby="pstory-title">
    <div class="container why-block">
      <h2 id="pstory-title">${p.story.title}</h2>
      <div>${paragraphs(p.story.text)}</div>
    </div>
  </section>`;
}

function otherProjects(p) {
  const others = projects.filter((o) => o.slug !== p.slug);
  return html`<section class="section section--mist section--tight" aria-labelledby="others-title">
    <div class="container">
      ${sectionHead({ title: 'مشروعات أخرى', id: 'others-title', action: textLink('كل المشروعات', routes.projects) })}
      <ul class="other-projects">
        ${others.map(
          (o) => html`<li><a href="${href(o.path)}">
            ${picture(o.cover, { alt: '', sizes: '120px' })}
            <span><strong>${o.name}</strong><span>${o.type} · ${o.area}</span></span>
          </a></li>`,
        )}
      </ul>
    </div>
  </section>`;
}

export function projectPage(p) {
  const waText = `مرحبًا، أريد معرفة المزيد عن ${p.name}.`;
  const body = html`
  ${pageHero({
    crumbs: [{ label: 'الرئيسية', href: '/' }, { label: 'مشروعاتنا', href: routes.projects }, { label: p.name }],
    eyebrow: `${p.type} · ${p.area}، ${p.city}`,
    title: p.name,
    titleEn: p.nameEn,
    lead: p.summary,
    image: p.cover,
    imageAlt: p.coverAlt,
    imageNote: p.coverNote,
    actions: html`${button('اسأل عن هذا المشروع', contactHref(p), { variant: 'gold' })}${button('راسلنا على واتساب', whatsappLink(waText), { variant: 'outline-light', iconName: 'whatsapp', external: true })}`,
    aside: p.badge ? html`<p class="badge badge--light">${p.badge}</p>` : '',
  })}
  ${overview(p)}
  ${whySection(p)}
  ${unitsSection(p)}
  ${locationSection(p)}
  ${featuresSection(p)}
  ${progressSection(p)}
  ${gallerySection(p)}
  ${storySection(p)}
  ${ctaBand({ ...p.cta, project: p })}
  ${developerNote()}
  ${otherProjects(p)}`;

  return {
    path: p.path,
    active: 'projects',
    title: `${p.name}${p.nameEn ? ` (${p.nameEn})` : ''}: ${p.headline}`,
    description: p.summary,
    image: undefined,
    body,
  };
}
