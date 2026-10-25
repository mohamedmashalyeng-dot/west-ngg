import { html } from '../lib/html.mjs';
import { button, textLink, contactChannels, enquiryForm } from '../components/ui.mjs';
import { pageHero } from '../components/sections.mjs';
import { routes, contact } from '../content/site.mjs';

export function contactPage() {
  const body = html`
  ${pageHero({
    crumbs: [{ label: 'الرئيسية', href: '/' }, { label: 'تواصل معنا' }],
    eyebrow: 'تواصل معنا',
    title: 'تحدّث مع فريق المبيعات',
    lead: 'تبحث عن وحدة أو فرصة استثمار، أو تريد معرفة المزيد عن مشروعاتنا؟ اتصل بنا، أو راسلنا على واتساب، أو اترك رسالتك وسنتواصل معك.',
  })}

  <section class="section section--sand" aria-label="وسائل التواصل ونموذج الاستفسار">
    <div class="container contact-layout">
      <div class="contact-layout__info theme-dark">
        <h2>اختر الطريقة الأسهل لك</h2>
        <p>فريقنا متاح عبر الهاتف وواتساب والبريد الإلكتروني.</p>
        ${contactChannels()}
      </div>
      <div class="contact-layout__form" id="enquiry">${enquiryForm()}</div>
    </div>
  </section>

  <section class="section section--paper section--tight" aria-labelledby="visit-title">
    <div class="container visit">
      <div>
        <h2 id="visit-title">مقرنا في حدائق الأهرام</h2>
        <p>${contact.address}. وهو العنوان نفسه لمشروع ميتنج بوينت مول.</p>
      </div>
      <div class="btn-row">
        ${button('افتح الموقع على الخريطة', contact.mapHref, { variant: 'dark', iconName: 'map', external: true })}
        ${textLink('تفاصيل ميتنج بوينت مول', '/projects/')}
      </div>
    </div>
  </section>

  <section class="section section--mist section--tight" aria-labelledby="before-title">
    <div class="container visit">
      <div>
        <h2 id="before-title">تريد أن تقرأ أولًا؟</h2>
        <p>تصفّح مشروعاتنا، أو اقرأ إجابات أهم أسئلة المستثمرين.</p>
      </div>
      <div class="btn-row">
        ${button('تصفّح المشروعات', routes.projects, { variant: 'outline' })}
        ${button('الأسئلة الشائعة', `${routes.investment}#faq`, { variant: 'outline' })}
      </div>
    </div>
  </section>`;

  return {
    path: routes.contact,
    active: 'contact',
    title: 'تواصل معنا: فريق مبيعات WEST NGG',
    description:
      'اتصل بفريق مبيعات WEST NGG على 01000101263، أو راسلنا على واتساب أو البريد الإلكتروني، أو أرسل استفسارك. المقر: 122 ج، حدائق الأهرام، البوابة الأولى، الجيزة.',
    body,
  };
}
