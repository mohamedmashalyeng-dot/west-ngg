import { html, href } from '../lib/html.mjs';
import { icon } from '../components/icons.mjs';
import { picture, sectionHead, button, accordion, ctaBand } from '../components/ui.mjs';
import { pageHero } from '../components/sections.mjs';
import { routes } from '../content/site.mjs';
import { faqIntro, faqTopics, projectLinks } from '../content/investment.mjs';
import { projectBySlug } from '../content/projects.mjs';

const pad = (n) => String(n).padStart(2, '0');
const total = faqTopics.reduce((n, t) => n + t.items.length, 0);

function topicGrid() {
  return html`<ul class="topic-grid">
    ${faqTopics.map(
      (t) => html`<li><a class="topic-card" href="${href(t.path)}">
        <span class="topic-card__icon">${icon(t.icon, { size: 24 })}</span>
        <span class="topic-card__num">${pad(t.number)}</span>
        <span class="topic-card__title">${t.title}</span>
        <span class="topic-card__text">${t.text}</span>
        <span class="topic-card__more">${t.items.length} أسئلة ${icon('arrow', { size: 16 })}</span>
      </a></li>`,
    )}
  </ul>`;
}

function projectExample(slug) {
  const p = projectBySlug[slug];
  return html`<li><a class="example" href="${href(p.path)}">
    ${picture(p.cover, { alt: '', sizes: '120px' })}
    <span class="example__text">
      <strong>${p.nameEn ? html`<span lang="en" dir="ltr">${p.nameEn}</span>` : html`<span lang="en" dir="ltr">${p.name}</span>`}</strong>
      <span>${projectLinks[slug]}</span>
    </span>
  </a></li>`;
}

export function investment() {
  const body = html`
  ${pageHero({
    crumbs: [{ label: 'الرئيسية', href: '/' }, { label: 'الأسئلة والاستثمار' }],
    eyebrow: faqIntro.eyebrow,
    title: faqIntro.pageTitle,
    lead: faqIntro.text,
    image: 'karma-3',
    imageAlt: 'إحدى عمارات الكرمة في حدائق الأهرام',
    aside: html`<p class="hero-count"><strong>${total}</strong> سؤالًا في <strong>${faqTopics.length}</strong> محاور</p>`,
  })}

  <section class="section section--paper" id="topics" aria-labelledby="topics-title">
    <div class="container">
      ${sectionHead({ eyebrow: faqIntro.title, title: 'اختر المحور الذي يهمك', lead: 'لكل محور صفحة مستقلة فيها تعريف قصير وأسئلة يمكنك فتحها وإغلاقها.', id: 'topics-title' })}
      ${topicGrid()}
    </div>
  </section>

  <section class="section section--mist" aria-labelledby="examples-title">
    <div class="container">
      ${sectionHead({
        eyebrow: 'أمثلة تطبيقية',
        title: 'مشروعات WEST NGG داخل الإجابات',
        lead: 'لا نذكر المشروعات لمجرد الترويج، بل نستخدمها كأمثلة تطبيقية توضح الإجابات.',
        id: 'examples-title',
      })}
      <ul class="examples">${Object.keys(projectLinks).map(projectExample)}</ul>
    </div>
  </section>

  ${ctaBand({ title: 'عندك سؤال لم تجد إجابته هنا؟', text: 'فريق المبيعات جاهز للرد على أسئلتك عن الأسعار وأنظمة السداد ومواعيد التسليم لكل مشروع.' })}`;

  return {
    path: routes.investment,
    active: 'investment',
    title: 'الأسئلة الشائعة حول الاستثمار والسوق العقاري',
    description:
      'إجابات واضحة عن الاستثمار العقاري في 6 محاور: فهم السوق، اختيار الموقع، أنواع العقارات، التطوير وجودة التنفيذ، WEST NGG ومشروعاتها، والشراء والتملك.',
    body,
  };
}

export function topicPage(t) {
  const i = faqTopics.indexOf(t);
  const prev = faqTopics[i - 1];
  const next = faqTopics[i + 1];
  const body = html`
  ${pageHero({
    crumbs: [{ label: 'الرئيسية', href: '/' }, { label: 'الأسئلة والاستثمار', href: routes.investment }, { label: t.title }],
    eyebrow: `المحور ${pad(t.number)} من ${pad(faqTopics.length)}`,
    title: t.title,
    lead: t.text,
  })}

  <section class="section section--paper" aria-labelledby="q-title">
    <div class="container faq-page">
      <aside class="faq-page__nav">
        <h2 class="faq-page__heading">المحاور</h2>
        <nav aria-label="محاور الأسئلة">
          <ul>${faqTopics.map(
            (o) => html`<li><a href="${href(o.path)}"${o === t ? html` aria-current="page"` : ''}><span class="faq-page__n">${pad(o.number)}</span><span>${o.title}</span></a></li>`,
          )}</ul>
        </nav>
      </aside>
      <div class="faq-page__main">
        <h2 id="q-title" class="faq-page__title">${icon(t.icon, { size: 26 })}<span>أسئلة ${t.title}</span></h2>
        ${accordion(t.items, { numbered: true, open: 0 })}
        <div class="topic-examples">
          <h3>أمثلة من مشروعاتنا</h3>
          <ul class="examples examples--compact">${t.projects.map(projectExample)}</ul>
        </div>
        <nav class="pager" aria-label="المحور السابق والتالي">
          ${prev ? html`<a class="pager__link" href="${href(prev.path)}"><span>المحور السابق</span><strong>${prev.title}</strong></a>` : html`<span></span>`}
          ${next ? html`<a class="pager__link pager__link--next" href="${href(next.path)}"><span>المحور التالي</span><strong>${next.title}</strong></a>` : button('كل المحاور', routes.investment, { variant: 'outline' })}
        </nav>
        <p class="note">هذه إجابات عامة لمساعدتك على الفهم واتخاذ قرار مدروس. للتفاصيل المحدثة الخاصة بأي مشروع، تحدّث مع فريق المبيعات.</p>
      </div>
    </div>
  </section>

  ${ctaBand({ title: 'تحتاج إجابة خاصة بمشروع معين؟', text: 'تواصل مع فريق المبيعات للحصول على التفاصيل المحدثة بشأن الأسعار وأنظمة السداد ومواعيد التسليم.' })}`;

  return {
    path: t.path,
    active: 'investment',
    title: `${t.title} | الأسئلة الشائعة`,
    description: `${t.text} ${t.items.length} أسئلة وإجابات من WEST NGG: ${t.items.map((q) => q.q).slice(0, 2).join(' ')}`,
    body,
  };
}
