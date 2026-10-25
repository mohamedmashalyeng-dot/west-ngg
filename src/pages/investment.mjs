import { html } from '../lib/html.mjs';
import { icon } from '../components/icons.mjs';
import { picture, sectionHead, paragraphs, button, chips, accordion, ctaBand } from '../components/ui.mjs';
import { pageHero } from '../components/sections.mjs';
import { routes } from '../content/site.mjs';
import { reasons, westCairo } from '../content/company.mjs';
import { investIntro, strengths, journey, faqGroups } from '../content/investment.mjs';

const num = (i) => String(i + 1).padStart(2, '0');

export function investment() {
  const body = html`
  ${pageHero({
    crumbs: [{ label: 'الرئيسية', href: '/' }, { label: 'الاستثمار والأسئلة' }],
    eyebrow: 'الاستثمار والأسئلة الشائعة',
    title: investIntro.title,
    lead: investIntro.lead,
    image: 'giza-pyramids-view',
    imageAlt: 'إطلالة على أهرامات الجيزة من غرب القاهرة',
    actions: html`${button('اقرأ الأسئلة الشائعة', '#faq', { variant: 'gold' })}${button('تحدّث مع فريق المبيعات', routes.contact, { variant: 'outline-light' })}`,
    aside: html`<ol class="approach">${investIntro.approach.map((a, i) => html`<li><span>${i + 1}</span>${a}</li>`)}</ol>`,
  })}

  <section class="section section--paper" aria-labelledby="why-invest">
    <div class="container">
      ${sectionHead({ eyebrow: 'لماذا تستثمر مع WEST؟', title: 'مطوّر يخطط ويبني ويتابع مشروعه حتى التسليم', lead: 'أربعة أسباب تساعدك على اتخاذ قرارك.', id: 'why-invest' })}
      <ul class="reason-grid">
        ${reasons.map((r, i) => html`<li><span class="reason-grid__num">${num(i)}</span><h3>${r.title}</h3><p>${r.text}</p></li>`)}
      </ul>
    </div>
  </section>

  <section class="section section--sand" aria-labelledby="wc-invest">
    <div class="container split">
      <div class="split__text">
        <p class="eyebrow">افهم المكان</p>
        <h2 id="wc-invest">${westCairo.title}</h2>
        ${paragraphs(westCairo.text)}
        ${chips(westCairo.keywords)}
      </div>
      <figure class="split__media">
        ${picture('karma-3', { alt: 'إحدى عمارات الكرمة في حدائق الأهرام', sizes: '(min-width: 900px) 45vw, 100vw' })}
        <figcaption>كرمة 3، حدائق الأهرام</figcaption>
      </figure>
    </div>
  </section>

  <section class="section section--navy theme-dark" aria-labelledby="strengths-title">
    <div class="container">
      ${sectionHead({ eyebrow: 'قيّم الفرصة', title: strengths.title, lead: strengths.text, id: 'strengths-title' })}
      <ul class="strength-grid">
        ${strengths.items.map((s) => html`<li>${icon('check', { size: 20 })}<span>${s}</span></li>`)}
      </ul>
    </div>
  </section>

  <section class="section section--paper" aria-labelledby="journey-title">
    <div class="container">
      ${sectionHead({ eyebrow: 'رحلة المستثمر', title: journey.title, lead: journey.text, id: 'journey-title' })}
      <ol class="steps">
        ${journey.steps.map((s, i) => html`<li class="step"><span class="step__num">${i + 1}</span><h3>${s.title}</h3><p>${s.text}</p></li>`)}
      </ol>
    </div>
  </section>

  <section class="section section--mist" id="faq" aria-labelledby="faq-title">
    <div class="container faq-page">
      <aside class="faq-page__nav">
        <h2 id="faq-title">الأسئلة الشائعة</h2>
        <p>إجابات واضحة عن الاستثمار، والموقع، والشراء والتعاقد، وطريقة عمل WEST.</p>
        <nav aria-label="أقسام الأسئلة">
          <ul>${faqGroups.map((g) => html`<li><a href="#faq-${g.id}">${g.title}<span>${g.items.length}</span></a></li>`)}</ul>
        </nav>
      </aside>
      <div class="faq-page__groups">
        ${faqGroups.map(
          (g) => html`<section class="faq-group" id="faq-${g.id}" aria-labelledby="faq-${g.id}-title">
            <h3 id="faq-${g.id}-title">${g.title}</h3>
            ${accordion(g.items)}
          </section>`,
        )}
        <p class="note">هذه إجابات عامة لمساعدتك على الفهم، وليست وعدًا بعائد محدد. للتفاصيل الخاصة بأي مشروع، تحدّث مع فريق المبيعات.</p>
      </div>
    </div>
  </section>

  ${ctaBand({ title: 'عندك سؤال لم تجد إجابته هنا؟', text: 'فريق المبيعات جاهز للرد على أسئلتك عن الاستثمار في غرب القاهرة.' })}`;

  return {
    path: routes.investment,
    active: 'investment',
    title: 'الاستثمار والأسئلة الشائعة: دليل شراء وحدتك في غرب القاهرة',
    description:
      'لماذا غرب القاهرة؟ وكيف تشتري وحدتك خطوة بخطوة؟ إجابات واضحة من WEST NGG عن الاستثمار والموقع والشراء والتعاقد.',
    body,
  };
}
