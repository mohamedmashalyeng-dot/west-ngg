import { html, href, ltr } from '../lib/html.mjs';
import { icon } from '../components/icons.mjs';
import {
  picture, logo, sectionHead, paragraphs, button, textLink, bigProjectCard, contactChannels, enquiryForm,
} from '../components/ui.mjs';
import { routes } from '../content/site.mjs';
import { stats, aboutIntro, founder } from '../content/company.mjs';
import { current, areas, projectBySlug } from '../content/projects.mjs';
import { faqIntro, faqTopics } from '../content/investment.mjs';

function hero() {
  return html`<section class="hero theme-dark" aria-labelledby="hero-title">
    <div class="hero__media">${picture('hero-west-cairo', { alt: '', eager: true, sizes: '100vw' })}</div>
    <div class="container hero__inner">
      <div class="hero__content">
        <h1 id="hero-title">
          <span class="hero__brand" lang="en" dir="ltr">West Development</span>
          <span class="hero__group">نبيل غبريال جروب <span class="hero__group-en" lang="en" dir="ltr">Nabil Ghobrial Group</span></span>
        </h1>
        <ul class="hero-stats">
          ${stats.map(
            (s) => html`<li>
              <span class="hero-stats__value">${ltr(s.value)}</span>
              <span class="hero-stats__label">${s.ar}<span lang="en" dir="ltr">${s.en}</span></span>
            </li>`,
          )}
        </ul>
        <div class="btn-row">
          ${button('استكشف مشاريعنا', '#projects', { variant: 'gold' })}
          ${button('تواصل معنا', routes.contact, { variant: 'outline-light' })}
        </div>
      </div>
    </div>
  </section>`;
}

function aboutSection() {
  return html`<section class="section section--paper" id="about" aria-labelledby="about-title">
    <div class="container about-home">
      <div class="about-home__intro">
        <p class="eyebrow">${aboutIntro.eyebrow}</p>
        <h2 id="about-title">${aboutIntro.title}</h2>
        <p class="lead">${aboutIntro.text}</p>
        <ul class="stat-pair">
          ${stats.map((s) => html`<li><strong>${ltr(s.value)}</strong><span>${s.ar}</span></li>`)}
        </ul>
        ${textLink('اقرأ قصتنا', routes.about)}
      </div>
      <article class="founder theme-dark" aria-labelledby="founder-name">
        <div class="founder__mark">${logo('ngg-logo-ar', 'white', { alt: 'نبيل غبريال جروب', height: 74 })}</div>
        <p class="founder__role">${founder.role}</p>
        <h3 id="founder-name" class="founder__name">${founder.name}</h3>
        <p class="founder__title">${founder.title}</p>
        <div class="founder__bio">${paragraphs(founder.bio)}</div>
        <ul class="founder__cos">
          <li><span lang="en" dir="ltr">WEST Development</span><small>التطوير العقاري</small></li>
          <li><span lang="en" dir="ltr">WEST Construction</span><small>البناء والتشييد</small></li>
        </ul>
      </article>
    </div>
  </section>`;
}

function projectsSection() {
  return html`<section class="section section--mist" id="projects" aria-labelledby="projects-title">
    <div class="container">
      ${sectionHead({
        eyebrow: 'مشاريعنا',
        title: 'ما نبنيه اليوم',
        id: 'projects-title',
        action: button('كل المشاريع', routes.projects, { variant: 'outline' }),
      })}
      <div class="big-grid">${current.map((p) => bigProjectCard(p))}</div>
      <div class="areas">
        <p class="areas__text">مشروعات تعكس خبرتنا في التطوير والتنفيذ، نمنحك من خلالها صورة واضحة عن رؤيتنا وخططنا</p>
        <ul class="areas__list">
          ${areas.map(
            (a) => html`<li class="area-tile">
              ${picture(a.image, { alt: '', sizes: '(min-width: 900px) 30vw, 100vw' })}
              <div class="area-tile__body">
                <h3>${icon('pin', { size: 20 })}<span>${a.name}</span></h3>
                <ul>${a.projects.map((s) => html`<li><a href="${href(projectBySlug[s].path)}">${projectBySlug[s].name}</a></li>`)}</ul>
              </div>
            </li>`,
          )}
        </ul>
        ${textLink('أعمالنا السابقة', routes.previous)}
      </div>
    </div>
  </section>`;
}

function faqSection() {
  return html`<section class="section section--paper" id="faq" aria-labelledby="faq-title">
    <div class="container">
      ${sectionHead({
        eyebrow: faqIntro.eyebrow,
        title: faqIntro.title,
        lead: faqIntro.text,
        id: 'faq-title',
        action: button('الأسئلة والاستثمار', routes.investment, { variant: 'dark' }),
      })}
      <ul class="topic-grid">
        ${faqTopics.map(
          (t) => html`<li><a class="topic-card" href="${href(t.path)}">
            <span class="topic-card__icon">${icon(t.icon, { size: 24 })}</span>
            <span class="topic-card__num">${String(t.number).padStart(2, '0')}</span>
            <span class="topic-card__title">${t.title}</span>
            <span class="topic-card__text">${t.text}</span>
            <span class="topic-card__more">${t.items.length} أسئلة ${icon('arrow', { size: 16 })}</span>
          </a></li>`,
        )}
      </ul>
    </div>
  </section>`;
}

function contactSection() {
  return html`<section class="section section--sand" id="contact" aria-labelledby="contact-title">
    <div class="container contact-layout">
      <div class="contact-layout__info theme-dark">
        <p class="eyebrow">تواصل معنا</p>
        <h2 id="contact-title">تحدّث مع فريق المبيعات</h2>
        <p>اسأل عن الوحدات المتاحة في ميتنج بوينت مول و WESTEN، أو اترك رسالتك وسنتواصل معك.</p>
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
    title: 'West Development | نبيل غبريال جروب — خبرة +20 عامًا و+1,000 تسليم',
    description:
      'West Development من نبيل غبريال جروب: خبرة تتجاوز 20 عامًا في الإنشاءات و1,000 وحدة تم تسليمها. اكتشف ميتنج بوينت مول في حدائق الأهرام و WESTEN في غرب الجامعة بمدينة 6 أكتوبر.',
    body: html`${hero()}${aboutSection()}${projectsSection()}${faqSection()}${contactSection()}`,
  };
}
