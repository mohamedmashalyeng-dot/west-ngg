import { html } from '../lib/html.mjs';
import { picture, sectionHead, breadcrumbs } from './ui.mjs';
import { icon } from './icons.mjs';
import { mission, vision, values } from '../content/company.mjs';

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

export function visionBand({ id = 'mv-title' } = {}) {
  const card = (c) => html`<article class="mv-card">
    <p class="mv-card__en" lang="en" dir="ltr">${c.titleEn}</p>
    <h3>${c.title}</h3>
    <p>${c.text}</p>
  </article>`;
  return html`<section class="section section--navy theme-dark" aria-labelledby="${id}">
    <div class="container">
      <h2 class="sr-only" id="${id}">رؤيتنا ورسالتنا</h2>
      <div class="mv-grid">${card(vision)}${card(mission)}</div>
    </div>
  </section>`;
}

export function valuesSection({ id = 'values-title' } = {}) {
  return html`<section class="section section--paper" aria-labelledby="${id}">
    <div class="container">
      ${sectionHead({ eyebrow: values.titleEn, title: values.title, id })}
      <ul class="values-grid">
        ${values.items.map(
          (v, i) => html`<li class="value-card">
            <span class="value-card__icon">${icon(v.icon, { size: 26 })}</span>
            <span class="value-card__num">${String(i + 1).padStart(2, '0')}</span>
            <h3>${v.title}</h3>
            <p>${v.text}</p>
          </li>`,
        )}
      </ul>
    </div>
  </section>`;
}

// Animated "scroll on" cue linking to the next section.
export const scrollCue = (target, label) =>
  html`<a class="scroll-cue" href="#${target}"><span>${label}</span><span class="scroll-cue__arrow">${icon('down', { size: 22 })}</span></a>`;
