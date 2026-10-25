import { html, href, ltr } from '../lib/html.mjs';
import { icon } from '../components/icons.mjs';
import {
  picture, logo, sectionHead, paragraphs, button, textLink, factList, checkList, chips,
  galleryItem, accordion, projectCard, contactHref, contactChannels, enquiryForm, collapseOnMobile,
} from '../components/ui.mjs';
import { missionBand } from '../components/sections.mjs';
import { routes, contact } from '../content/site.mjs';
import {
  facts, companies, intro, reasons, story, philosophy, expertise, process, westCairo,
} from '../content/company.mjs';
import { featured, portfolio, projectBySlug } from '../content/projects.mjs';
import { journey, homeFaqs, faqGroups } from '../content/investment.mjs';

const num = (i) => String(i + 1).padStart(2, '0');

const collapsible = (iconName, title, body) =>
  collapseOnMobile(html`<h3>${icon(iconName)}<span>${title}</span></h3>`, html`<div class="panel__body">${body}</div>`, 'panel panel--collapse');

function hero() {
  return html`<section class="hero theme-dark" aria-labelledby="hero-title">
    <div class="hero__media">${picture('hero-west-cairo', { alt: '', eager: true, sizes: '100vw' })}</div>
    <div class="container hero__inner">
      <div class="hero__content">
        <p class="eyebrow">نبيل غبريال جروب · WEST NGG</p>
        <h1 id="hero-title">مستقبل الغرب</h1>
        <p class="hero__lead">نطوّر وننفّذ مشروعات عقارية في غرب القاهرة، من اختيار الموقع حتى التسليم.</p>
        <p class="hero__text">نجمع التطوير العقاري، والإنشاءات، وإدارة التنفيذ في مجموعة واحدة، ونعمل في حدائق الأهرام و6 أكتوبر والدقي.</p>
        <div class="btn-row">
          ${button('استكشف مشروعاتنا', '#projects', { variant: 'gold' })}
          ${button('تواصل معنا', '#contact', { variant: 'outline-light' })}
        </div>
      </div>
      <aside class="hero-panel" aria-labelledby="hero-panel-title">
        <p class="hero-panel__title" id="hero-panel-title">تحت مظلة نبيل غبريال جروب</p>
        <dl class="hero-panel__list">
          <div><dt lang="en" dir="ltr">${companies.development.name}</dt><dd>تطوير عقاري: اختيار الموقع، والتخطيط، والمتابعة حتى التسليم.</dd></div>
          <div><dt lang="en" dir="ltr">${companies.construction.name}</dt><dd>تنفيذ وإنشاءات بخبرة هندسية من داخل المجموعة.</dd></div>
          <div><dt>تركيزنا</dt><dd>غرب القاهرة، وبدايتنا من حدائق الأهرام.</dd></div>
        </dl>
      </aside>
    </div>
  </section>`;
}

function factsStrip() {
  return html`<section class="facts-wrap" aria-label="معلومات سريعة عن المجموعة">
    <div class="container">
      <ul class="facts-strip">
        ${facts.map(
          (f) => html`<li class="fact">
            <p class="fact__value">${ltr(f.value)} <span>${f.unit}</span></p>
            <p class="fact__label">${f.label}</p>
          </li>`,
        )}
      </ul>
    </div>
  </section>`;
}

function group() {
  const dev = companies.development;
  const con = companies.construction;
  return html`<section class="section section--paper" id="group" aria-labelledby="group-title">
    <div class="container group-grid">
      <div class="group-intro">
        <p class="eyebrow">المجموعة في سطور</p>
        <h2 id="group-title">${intro.title}</h2>
        <p class="lead">${intro.lead}</p>
        <p>${intro.text}</p>
        <ul class="reason-list">
          ${reasons.map((r) => html`<li><h3>${r.title}</h3><p>${r.text}</p></li>`)}
        </ul>
        ${textLink('تعرّف على المجموعة وقصتها', routes.about)}
      </div>
      <div class="org" aria-label="هيكل المجموعة">
        <div class="org__root">
          ${logo('ngg-wordmark', 'navy', { alt: '', height: 30 })}
          <div>
            <p class="org__name">${companies.group.name}</p>
            <p class="org__role">${companies.group.role}</p>
          </div>
        </div>
        <div class="org__branches">
          <article class="org-card org-card--dark theme-dark">
            ${logo('west-development-logo', 'white', { alt: '', height: 58, cls: 'org-card__logo' })}
            <h3 lang="en" dir="ltr">${dev.name}</h3>
            <p class="org-card__role">${dev.role}</p>
            <p>${dev.text}</p>
            ${checkList(dev.points)}
            <p class="org-card__note">${dev.note}</p>
          </article>
          <article class="org-card">
            <span class="org-card__icon" aria-hidden="true">${icon('building', { size: 28 })}</span>
            <h3 lang="en" dir="ltr">${con.name}</h3>
            <p class="org-card__role">${con.role}</p>
            <p>${con.text}</p>
            ${checkList(con.points)}
          </article>
        </div>
      </div>
    </div>
  </section>`;
}

function storySection() {
  return html`<section class="section section--sand" id="story" aria-labelledby="story-title">
    <div class="container split split--media-start">
      <figure class="split__media story-media">
        ${picture('karma-2', { alt: 'عمارة كرمة 2 السكنية في حدائق الأهرام', sizes: '(min-width: 900px) 42vw, 100vw' })}
        <figcaption>كرمة 2، حدائق الأهرام</figcaption>
        <blockquote class="quote-card">
          <p class="quote-card__title">${philosophy.title}</p>
          <p>${philosophy.text}</p>
          <p>${philosophy.steps}</p>
        </blockquote>
      </figure>
      <div class="split__text">
        <p class="eyebrow">قصتنا وطريقتنا</p>
        <h2 id="story-title">${story.title}</h2>
        ${paragraphs(story.text)}
        <ol class="milestones">
          ${story.milestones.map(
            (m, i) => html`<li>
              <span class="milestones__num">${num(i)}</span>
              <div><p class="milestones__name" lang="en" dir="ltr">${m.name}</p><p>${m.text}</p></div>
            </li>`,
          )}
        </ol>
        <p class="story-closing">${story.closing}</p>
      </div>
    </div>
  </section>`;
}

function expertiseSection() {
  return html`<section class="section section--paper" id="expertise" aria-labelledby="xp-title">
    <div class="container">
      ${sectionHead({
        eyebrow: 'مجالات عملنا',
        title: 'نطوّر المشروع، ونبنيه، وندير تنفيذه',
        lead: 'ثلاثة مجالات تعمل معًا تحت سقف واحد، من أول دراسة للموقع حتى التسليم.',
        id: 'xp-title',
      })}
      <div class="xp-grid">
        ${expertise.map(
          (x, i) => html`<article class="xp-card">
            <figure class="xp-card__media">
              ${picture(x.image, { alt: x.alt, sizes: '(min-width: 900px) 30vw, 100vw' })}
              <figcaption>${x.caption}</figcaption>
            </figure>
            <div class="xp-card__body">
              <p class="xp-card__num">${num(i)}</p>
              <h3>${x.title}</h3>
              <p class="xp-card__company">${x.company}</p>
              <p>${x.text}</p>
              ${checkList(x.points)}
            </div>
          </article>`,
        )}
      </div>
    </div>
  </section>`;
}

function projectsSection() {
  return html`<section class="section section--mist" id="projects" aria-labelledby="projects-title">
    <div class="container">
      ${sectionHead({
        eyebrow: 'مشروعاتنا',
        title: 'مشروعاتنا في حدائق الأهرام و6 أكتوبر والدقي',
        lead: 'مشروع تجاري وإداري وطبي من WEST Development، وأربعة مشروعات سكنية نفّذتها المجموعة.',
        id: 'projects-title',
        action: button('كل المشروعات', routes.projects, { variant: 'outline' }),
      })}
      <div class="projects-grid">
        ${projectCard(featured, { variant: 'feature' })}
        ${portfolio.map((p) => projectCard(p))}
      </div>
    </div>
  </section>`;
}

function featuredSection() {
  const p = featured;
  const pick = (labels) => p.facts.filter(([k]) => labels.includes(k));
  return html`<section class="section section--deep theme-dark" id="meeting-point" aria-labelledby="mpm-title">
    <div class="container">
      <div class="feature-head">
        ${logo(p.logo, 'white', { alt: p.nameEn, height: 40, cls: 'feature-head__logo' })}
        <div>
          <p class="eyebrow">المشروع المميز</p>
          <h2 id="mpm-title">${p.name}: ${p.headline}</h2>
          ${paragraphs(p.why.text)}
        </div>
      </div>
      <div class="feature-grid">
        <figure class="feature-media">
          ${picture(p.cover, { alt: p.coverAlt, sizes: '(min-width: 900px) 55vw, 100vw' })}
          <span class="media-note">${p.coverNote}</span>
        </figure>
        <div class="feature-facts">
          <h3>المشروع في أرقام</h3>
          ${factList(pick(['نوع المشروع', 'مساحة الأرض', 'الجراج', 'عدد الأدوار', 'مساحات الوحدات']), { cls: 'fact-list--dark' })}
        </div>
      </div>
      <div class="panel-grid">
        ${collapsible('pin', p.location.title, html`
          <p>${p.location.text}</p>
          <ul class="time-list">
            ${p.location.nearby.map(([place, time]) => html`<li><span>${place}</span><span class="time-list__time">${icon('clock', { size: 16 })}${time}</span></li>`)}
          </ul>
          <p class="note">${p.location.timesNote}</p>`)}
        ${collapsible('building', p.units.title, html`
          <p>${p.units.text}</p>
          <ul class="unit-tiles">${p.units.items.map((u) => html`<li>${u}</li>`)}</ul>
          <p class="range-line">المساحات: من <strong>${ltr(p.units.range.from)} م²</strong> إلى <strong>${ltr(p.units.range.to)} م²</strong></p>
          <p class="note">${p.units.note}</p>`)}
        ${collapsible('layers', p.zones.title, html`
          ${checkList(p.zones.items)}
          <h4>${p.services.title}</h4>
          ${chips(p.services.items, 'chips--light')}`)}
      </div>
      <div class="btn-row feature-actions">
        ${button('كل تفاصيل ميتنج بوينت مول', p.path, { variant: 'gold' })}
        ${button('اسأل عن الوحدات المتاحة', contactHref(p), { variant: 'outline-light' })}
      </div>
    </div>
  </section>`;
}

function westCairoSection() {
  return html`<section class="band theme-dark" id="west-cairo" aria-labelledby="wc-title">
    <div class="band__media">${picture('giza-pyramids-view', { alt: 'إطلالة على أهرامات الجيزة من غرب القاهرة', sizes: '100vw' })}</div>
    <div class="container band__inner">
      <div class="band__card">
        <p class="eyebrow">غرب القاهرة</p>
        <h2 id="wc-title">${westCairo.title}</h2>
        ${paragraphs(westCairo.text)}
        ${chips(westCairo.keywords, 'chips--light')}
      </div>
    </div>
  </section>
  <section class="section section--paper" aria-labelledby="areas-title">
    <div class="container">
      ${sectionHead({
        eyebrow: 'مواقع المشروعات',
        title: 'أين تقع مشروعاتنا؟',
        lead: 'ثلاث مناطق في غرب القاهرة والجيزة، ولكل منطقة طرقها والأماكن القريبة منها.',
        id: 'areas-title',
      })}
      <div class="area-grid">
        ${westCairo.areas.map(
          (a) => html`<article class="area-card">
            <h3>${icon('pin')}<span>${a.name}</span></h3>
            <p>${a.text}</p>
            <p class="area-card__label">مشروعات المنطقة</p>
            <ul class="area-card__projects">
              ${a.projects.map((s) => html`<li><a href="${href(projectBySlug[s].path)}">${projectBySlug[s].name}</a></li>`)}
            </ul>
            ${collapseOnMobile(html`<span class="area-card__label">قريب من</span>`, chips(a.nearby), 'mini-collapse')}
          </article>`,
        )}
      </div>
      <div class="name-note">
        <div>
          <h3>${westCairo.name.title}</h3>
          <p>${westCairo.name.text}</p>
        </div>
        ${button('افتح موقع المقر على الخريطة', contact.mapHref, { variant: 'outline', iconName: 'map', external: true })}
      </div>
    </div>
  </section>`;
}

function processSection() {
  return html`<section class="section section--sand" id="process" aria-labelledby="process-title">
    <div class="container">
      ${sectionHead({ eyebrow: 'طريقة العمل', title: process.title, lead: process.lead, id: 'process-title' })}
      <ol class="pillars">
        ${process.pillars.map(
          (p, i) => html`<li class="pillar"><span class="pillar__num">${num(i)}</span><h3 class="pillar__word">${p.word}</h3><p>${p.text}</p></li>`,
        )}
      </ol>
      <h3 class="steps-title">رحلة المشروع، خطوة بخطوة</h3>
      <ol class="steps">
        ${process.steps.map(
          (s, i) => html`<li class="step"><span class="step__num">${i + 1}</span><h4>${s.title}</h4><p>${s.text}</p></li>`,
        )}
      </ol>
    </div>
  </section>`;
}

function progressSection() {
  const gh = projectBySlug['grand-heights'];
  const wu = projectBySlug['west-university'];
  const wuItems = ['west-uni-site-2', 'west-uni-site-3', 'west-uni-render-2'].map((img) => wu.gallery.find((g) => g.image === img));
  return html`<section class="section section--deep theme-dark" id="progress" aria-labelledby="progress-title">
    <div class="container">
      ${sectionHead({
        eyebrow: 'من موقع العمل',
        title: 'صور حقيقية من مراحل التنفيذ',
        lead: 'من الهيكل الإنشائي إلى الواجهة النهائية، في مشروعين سكنيين بمدينة 6 أكتوبر.',
        id: 'progress-title',
      })}
      <div class="progress-grid">
        <div class="progress-block">
          <h3>${gh.name}: ${gh.progress.title}</h3>
          <p>${gh.progress.text}</p>
          <div class="before-after">
            ${galleryItem({ ...gh.progress.before }, 'progress', { sizes: '(min-width: 900px) 22vw, 50vw', cls: 'is-before' })}
            ${galleryItem({ ...gh.progress.after }, 'progress', { sizes: '(min-width: 900px) 22vw, 50vw', cls: 'is-after' })}
          </div>
          ${textLink(`تفاصيل ${gh.name}`, gh.path)}
        </div>
        <div class="progress-block">
          <h3>${wu.name}: من موقع التنفيذ إلى التصور النهائي</h3>
          <p>مشروع قائم في 6 أكتوبر، وبه وحدات متاحة.</p>
          <div class="progress-strip">
            ${wuItems.map((g) => galleryItem(g, 'progress', { sizes: '(min-width: 900px) 18vw, 33vw' }))}
          </div>
          ${textLink(`تفاصيل ${wu.name}`, wu.path)}
        </div>
      </div>
    </div>
  </section>`;
}

function faqSection() {
  const total = faqGroups.reduce((n, g) => n + g.items.length, 0);
  return html`<section class="section section--paper" id="faq" aria-labelledby="faq-title">
    <div class="container faq-layout">
      <div class="faq-layout__aside">
        <p class="eyebrow">للمستثمرين</p>
        <h2 id="faq-title">قبل أن تشتري: خطوات واضحة وإجابات مباشرة</h2>
        <p class="lead">${journey.text}</p>
        <ol class="journey">
          ${journey.steps.map((s, i) => html`<li><span class="journey__num">${i + 1}</span><div><h3>${s.title}</h3><p>${s.text}</p></div></li>`)}
        </ol>
        ${button('دليل الاستثمار كاملًا', routes.investment, { variant: 'dark' })}
      </div>
      <div class="faq-layout__main">
        <h3 class="faq-layout__title">أسئلة يسألها المستثمرون كثيرًا</h3>
        ${accordion(homeFaqs)}
        ${textLink(`اقرأ كل الأسئلة (${total} سؤالًا)`, `${routes.investment}#faq`)}
      </div>
    </div>
  </section>`;
}

function contactSection() {
  return html`<section class="section section--sand" id="contact" aria-labelledby="contact-title">
    <div class="container contact-layout">
      <div class="contact-layout__info theme-dark">
        <p class="eyebrow">تواصل معنا</p>
        <h2 id="contact-title">تحدّث مع فريق المبيعات</h2>
        <p>تبحث عن وحدة، أو تريد تفاصيل مشروع؟ اتصل بنا، أو راسلنا على واتساب، أو اترك رسالتك هنا.</p>
        ${contactChannels()}
      </div>
      <div class="contact-layout__form" id="enquiry">${enquiryForm()}</div>
    </div>
  </section>`;
}

export function home() {
  return {
    path: '/',
    active: 'home',
    title: 'WEST NGG | نبيل غبريال جروب — تطوير عقاري وإنشاءات في غرب القاهرة',
    description:
      'WEST NGG هي الذراع العقارية لنبيل غبريال جروب. نطوّر وننفّذ مشروعات تجارية وسكنية في غرب القاهرة، منها ميتنج بوينت مول في حدائق الأهرام. تعرّف على مشروعاتنا وتواصل مع فريق المبيعات.',
    body: html`${hero()}${factsStrip()}${group()}${storySection()}${missionBand()}${expertiseSection()}${projectsSection()}${featuredSection()}${westCairoSection()}${processSection()}${progressSection()}${faqSection()}${contactSection()}`,
  };
}
