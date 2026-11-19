import { html, ltr } from '../lib/html.mjs';
import { picture, logo, sectionHead, paragraphs, button, ctaBand } from '../components/ui.mjs';
import { pageHero, visionBand, valuesSection } from '../components/sections.mjs';
import { routes } from '../content/site.mjs';
import { story, origin, companies, principles } from '../content/company.mjs';

const num = (i) => String(i + 1).padStart(2, '0');

export function about() {
  const dev = companies.development;
  const con = companies.construction;
  const body = html`
  ${pageHero({
    crumbs: [{ label: 'الرئيسية', href: '/' }, { label: 'قصتنا' }],
    eyebrow: story.eyebrow,
    title: story.title,
    lead: story.lead,
    image: 'karma-5',
    imageAlt: 'إحدى عمارات الكرمة في حدائق الأهرام',
    actions: html`${button('تصفّح المشروعات', routes.projects, { variant: 'gold', iconName: 'arrow', cls: 'btn-icon-end' })}${button('تواصل معنا', routes.contact, { variant: 'outline-light' })}`,
  })}

  <section class="section section--paper" aria-label="منهج عملنا">
    <div class="container story-intro">
      ${paragraphs(story.text)}
    </div>
  </section>

  <section class="section section--sand" aria-labelledby="origin-title">
    <div class="container">
      <div class="origin">
        <div>
          <p class="eyebrow">Nabil Ghobrial Group – NGG</p>
          <h2 id="origin-title">${origin.title}</h2>
          <p class="lead">${origin.text}</p>
        </div>
        <ul class="origin__stats">
          ${origin.stats.map((s) => html`<li><strong>${ltr(s.value)}</strong><span>${s.label}</span></li>`)}
        </ul>
      </div>
      <div class="company-pair">
        <article class="co-card co-card--dark theme-dark">
          ${logo('west-development-logo', 'white', { alt: '', height: 60, cls: 'co-card__logo' })}
          <h3><span lang="en" dir="ltr">${dev.name}</span> | ${dev.role}</h3>
          <p>${dev.text}</p>
        </article>
        <article class="co-card">
          <p class="co-card__wordmark" lang="en" dir="ltr" aria-hidden="true">WEST<span>Construction</span></p>
          <h3><span lang="en" dir="ltr">${con.name}</span> | ${con.role}</h3>
          <p>${con.text}</p>
        </article>
      </div>
      <p class="origin__closing">${origin.closing}</p>
    </div>
  </section>

  <section class="section section--paper" aria-labelledby="principles-title">
    <div class="container">
      ${sectionHead({ eyebrow: 'كيف نعمل', title: 'من دراسة الموقع حتى التسليم', id: 'principles-title' })}
      <ol class="principles">
        ${principles.map(
          (p, i) => html`<li class="principle">
            <figure class="principle__media">${picture(p.image, { alt: p.alt, sizes: '(min-width: 900px) 40vw, 100vw' })}</figure>
            <div class="principle__text">
              <span class="principle__num">${num(i)}</span>
              <h3>${p.title}</h3>
              ${paragraphs(p.text)}
            </div>
          </li>`,
        )}
      </ol>
    </div>
  </section>

  ${visionBand()}
  ${valuesSection()}

  ${ctaBand({ primary: { label: 'تصفّح المشروعات', href: routes.projects }, title: 'تصفّح مشروعاتنا', text: 'ميتنج بوينت مول في حدائق الأهرام، و WESTEN في غرب الجامعة، وأعمالنا السابقة في الدقي و6 أكتوبر وحدائق الأهرام.' })}`;

  return {
    path: routes.about,
    active: 'about',
    title: 'قصتنا: نطوّر برؤية مدروسة ونبني على خبرة',
    description:
      'قصة WEST Development ضمن مجموعة نبيل غبريال (NGG): أكثر من 20 عامًا في البناء والتشييد، و1,000 وحدة تم تسليمها، وتكامل بين التطوير العقاري و WEST Construction. رؤيتنا ورسالتنا وقيمنا.',
    body,
  };
}
