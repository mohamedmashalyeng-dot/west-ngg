import { html } from '../lib/html.mjs';
import { button } from '../components/ui.mjs';
import { routes } from '../content/site.mjs';

export function notFound() {
  return {
    path: '/404.html',
    active: '',
    noindex: true,
    title: 'الصفحة غير موجودة',
    description: 'لم نجد الصفحة التي تبحث عنها. انتقل إلى الصفحة الرئيسية أو تصفّح مشروعاتنا.',
    body: html`<section class="section section--paper not-found" aria-labelledby="nf-title">
      <div class="container">
        <p class="eyebrow">خطأ 404</p>
        <h1 id="nf-title">لم نجد هذه الصفحة</h1>
        <p class="lead">ربما تغيّر الرابط أو حُذفت الصفحة. جرّب إحدى هذه الصفحات:</p>
        <div class="btn-row">
          ${button('الصفحة الرئيسية', '/', { variant: 'dark' })}
          ${button('مشروعاتنا', routes.projects, { variant: 'outline' })}
          ${button('تواصل معنا', routes.contact, { variant: 'outline' })}
        </div>
      </div>
    </section>`,
  };
}

// Static redirect stub for old URLs (no server config needed).
export function redirectPage(target) {
  const url = encodeURI(target);
  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<title>تم نقل الصفحة</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="https://westngg.com${url}">
<meta http-equiv="refresh" content="0; url=${url}">
</head>
<body>
<p>تم نقل هذه الصفحة. <a href="${url}">انتقل إلى الصفحة الجديدة</a>.</p>
</body>
</html>
`;
}
