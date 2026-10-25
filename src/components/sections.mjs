import { html } from '../lib/html.mjs';
import { picture, sectionHead, chips, breadcrumbs, textLink } from './ui.mjs';
import { mission, vision, values } from '../content/company.mjs';
import { routes, site } from '../content/site.mjs';

// Inner-page hero: image on the side on desktop, stacked on mobile.
export function pageHero({ eyebrow, title, titleEn, lead, crumbs, image, imageAlt = '', imageNote, actions, aside }) {
  return html`<section class="page-hero theme-dark" aria-labelledby="page-title">
    <div class="container page-hero__inner${image ? '' : ' page-hero__inner--text'}">
      <div class="page-hero__content">
        ${crumbs ? breadcrumbs(crumbs) : ''}
        ${eyebrow ? html`<p class="eyebrow">${eyebrow}</p>` : ''}
        <h1 id="page-title">${title}${titleEn ? html` <span class="name-en" lang="en" dir="ltr">${titleEn}</span>` : ''}</h1>
        ${lead ? html`<p class="page-hero__lead">${lead}</p>` : ''}
        ${actions ? html`<div class="btn-row">${actions}</div>` : ''}
        ${aside || ''}
      </div>
      ${image
        ? html`<figure class="page-hero__media">
            ${picture(image, { alt: imageAlt, eager: true, sizes: '(min-width: 900px) 46vw, 100vw' })}
            ${imageNote ? html`<span class="media-note">${imageNote}</span>` : ''}
          </figure>`
        : ''}
    </div>
  </section>`;
}

export function missionBand({ id = 'mv-title' } = {}) {
  return html`<section class="section section--navy theme-dark" aria-labelledby="${id}">
    <div class="container">
      ${sectionHead({ eyebrow: 'ما نؤمن به', title: 'رسالتنا ورؤيتنا وقيمنا', id })}
      <div class="mv-grid">
        <article class="mv-card"><h3>${mission.title}</h3><p>${mission.text}</p></article>
        <article class="mv-card"><h3>${vision.title}</h3><p>${vision.text}</p></article>
        <article class="mv-card mv-card--values"><h3>قيمنا</h3>${chips(values, 'chips--light')}</article>
      </div>
    </div>
  </section>`;
}

// Shared closing note on project pages, from the "من البناء إلى التطوير" block.
export function developerNote() {
  return html`<section class="section section--sand section--tight" aria-labelledby="dev-note-title">
    <div class="container dev-note">
      <div>
        <p class="eyebrow">من البناء إلى التطوير</p>
        <h2 id="dev-note-title">${site.motto}</h2>
      </div>
      <p>بدأت WEST بالبناء والتنفيذ عبر WEST Construction. ومع الخبرة وفهم السوق، انتقلنا إلى تطوير المشروعات عبر WEST Development: من فهم المكان واختيار الموقع والتخطيط، حتى التنفيذ والتسليم.</p>
      ${textLink('تعرّف على قصة المجموعة', routes.about)}
    </div>
  </section>`;
}
