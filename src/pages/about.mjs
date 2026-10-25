import { html } from '../lib/html.mjs';
import { icon } from '../components/icons.mjs';
import { picture, logo, sectionHead, paragraphs, button, checkList, chips, ctaBand } from '../components/ui.mjs';
import { pageHero, missionBand } from '../components/sections.mjs';
import { routes, site } from '../content/site.mjs';
import {
  companies, story, philosophy, reasons, difference, westCairo, identity,
} from '../content/company.mjs';

const num = (i) => String(i + 1).padStart(2, '0');

export function about() {
  const dev = companies.development;
  const con = companies.construction;
  const body = html`
  ${pageHero({
    crumbs: [{ label: 'الرئيسية', href: '/' }, { label: 'من نحن' }],
    eyebrow: 'من نحن',
    title: 'نبيل غبريال جروب: نطوّر ونبني في غرب القاهرة',
    lead: 'لسنا شركة تطوير عقاري فقط. بدأنا في الهندسة والإنشاءات منذ أكثر من 20 عامًا، ثم أضفنا التطوير. اليوم نخطط المشروع ونبنيه ونسلّمه بأنفسنا.',
    image: 'karma-5',
    imageAlt: 'عمارة كرمة 5 السكنية في حدائق الأهرام',
    actions: html`${button('استكشف مشروعاتنا', routes.projects, { variant: 'gold' })}${button('تواصل معنا', routes.contact, { variant: 'outline-light' })}`,
  })}

  <section class="section section--paper" aria-labelledby="story-title">
    <div class="container">
      ${sectionHead({ eyebrow: 'قصتنا', title: 'من الإنشاءات إلى تطوير المشروعات', id: 'story-title' })}
      <div class="story-cols">${paragraphs(story.text)}</div>
      <ol class="timeline">
        ${story.milestones.map(
          (m, i) => html`<li class="timeline__item">
            <span class="timeline__num">${num(i)}</span>
            <h3 lang="en" dir="ltr">${m.name}</h3>
            <p>${m.text}</p>
          </li>`,
        )}
      </ol>
      <p class="story-closing">${story.closing}</p>
    </div>
  </section>

  <section class="section section--sand" aria-labelledby="philosophy-title">
    <div class="container split">
      <div class="split__text">
        <p class="eyebrow">فلسفتنا</p>
        <h2 id="philosophy-title">${philosophy.title}</h2>
        <p class="lead">${philosophy.text}</p>
        <ol class="mini-steps">
          <li><span>1</span>التخطيط</li>
          <li><span>2</span>التصميم</li>
          <li><span>3</span>التنفيذ</li>
        </ol>
        <p>${philosophy.steps} والنتيجة مشروع يستحق أن يبقى.</p>
      </div>
      <figure class="split__media">
        ${picture('west-uni-site-2', { alt: 'الهيكل الإنشائي لمشروع غرب الجامعة أثناء التنفيذ', sizes: '(min-width: 900px) 45vw, 100vw' })}
        <figcaption>غرب الجامعة أثناء التنفيذ، 6 أكتوبر</figcaption>
      </figure>
    </div>
  </section>

  <section class="section section--paper" aria-labelledby="companies-title">
    <div class="container">
      ${sectionHead({
        eyebrow: 'شركاتنا',
        title: 'شركتان تعملان على كل مشروع',
        lead: 'شركة WEST Development تخطط وتطوّر، وشركة WEST Construction تبني. والمجموعة تتابع المشروع حتى التسليم.',
        id: 'companies-title',
      })}
      <div class="company-pair">
        <article class="org-card org-card--dark theme-dark">
          ${logo('west-development-logo', 'white', { alt: '', height: 64, cls: 'org-card__logo' })}
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
  </section>

  ${missionBand()}

  <section class="section section--paper" aria-labelledby="name-title">
    <div class="container identity-grid">
      <div>
        <p class="eyebrow">الاسم والهوية</p>
        <h2 id="name-title">${westCairo.name.title}</h2>
        <p class="lead">${westCairo.name.text}</p>
        <h3 class="identity-sub">${identity.title}</h3>
        <p>${identity.text}</p>
        <ol class="identity-list">${identity.elements.map((e, i) => html`<li><span>${num(i)}</span>${e}</li>`)}</ol>
      </div>
      <div class="identity-panel theme-dark" aria-label="شعارات المجموعة">
        ${logo('ngg-logo-ar', 'white', { alt: 'شعار نبيل غبريال جروب', height: 96 })}
        <span class="identity-panel__rule" aria-hidden="true"></span>
        ${logo('west-development-logo', 'white', { alt: 'شعار WEST Development', height: 92 })}
        <p class="identity-panel__slogan" lang="en" dir="ltr">${site.slogan}</p>
      </div>
    </div>
  </section>

  <section class="section section--mist" aria-labelledby="why-title">
    <div class="container">
      ${sectionHead({ eyebrow: 'لماذا WEST NGG', title: 'ما الذي يميز طريقة عملنا؟', lead: `${difference.title}. ${difference.text}`, id: 'why-title' })}
      <ul class="reason-grid">
        ${reasons.map((r, i) => html`<li><span class="reason-grid__num">${num(i)}</span><h3>${r.title}</h3><p>${r.text}</p></li>`)}
      </ul>
      ${chips(westCairo.keywords)}
    </div>
  </section>

  ${ctaBand({ title: 'تعرّف على مشروعاتنا', text: 'مشروعات خططنا لها بخبرة هندسية، ونفّذناها بأنفسنا. اسألنا عن أي مشروع يهمك.' })}`;

  return {
    path: routes.about,
    active: 'about',
    title: 'من نحن: نبيل غبريال جروب وشركتا WEST',
    description:
      'تعرّف على نبيل غبريال جروب: خبرة تزيد على 20 عامًا في الهندسة والإنشاءات، وشركتا WEST Development للتطوير و WEST Construction للتنفيذ. قصتنا ورسالتنا ورؤيتنا وقيمنا.',
    body,
  };
}
