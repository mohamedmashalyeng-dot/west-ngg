// Site-wide facts. Everything here comes from the published westngg.com pages.

export const site = {
  name: 'WEST NGG',
  groupAr: 'نبيل غبريال جروب',
  groupEn: 'Nabil Ghabrial Group',
  url: 'https://westngg.com',
  lang: 'ar',
  motto: 'نبني. نطوّر. نسلّم.',
  slogan: 'The Future of WEST',
  summary:
    'WEST NGG هي الذراع العقارية لنبيل غبريال جروب. نطوّر وننفّذ مشروعات تجارية وسكنية في غرب القاهرة، من اختيار الموقع حتى التسليم.',
  credit: { label: 'Orvann', url: 'http://orvann.com' },
};

export const contact = {
  phoneDisplay: '01000101263',
  phoneHref: 'tel:+201000101263',
  whatsappHref: 'https://wa.me/201000101263',
  whatsappText: 'مرحبًا، أريد معرفة المزيد عن مشروعاتكم.',
  email: 'info@westngg.com',
  address: '122 ج، حدائق الأهرام، البوابة الأولى، الجيزة',
  addressShort: '122 ج، حدائق الأهرام، الجيزة',
  mapHref:
    'https://www.google.com/maps/search/?api=1&query=122%20%D8%AC%20%D8%AD%D8%AF%D8%A7%D8%A6%D9%82%20%D8%A7%D9%84%D8%A3%D9%87%D8%B1%D8%A7%D9%85%20%D8%A7%D9%84%D8%A8%D9%88%D8%A7%D8%A8%D8%A9%20%D8%A7%D9%84%D8%A3%D9%88%D9%84%D9%89%20%D8%A7%D9%84%D8%AC%D9%8A%D8%B2%D8%A9',
};

export const whatsappLink = (text = contact.whatsappText) =>
  `${contact.whatsappHref}?text=${encodeURIComponent(text)}`;

// Existing routes on westngg.com are kept exactly as published.
export const routes = {
  home: '/',
  about: '/من-نحن/',
  projects: '/مشاريعنا/',
  investment: '/الأسئلة-والاستثمار/',
  contact: '/تواصل-معنا/',
};

// Old links that 404 on the live site; the build writes redirects for them.
export const redirects = {
  '/about/': routes.about,
  '/investment-faq/': routes.investment,
  '/projects/meeting-point-mall/': '/projects/',
};

export const nav = [
  { key: 'home', label: 'الرئيسية', href: routes.home },
  { key: 'about', label: 'من نحن', href: routes.about },
  { key: 'projects', label: 'مشروعاتنا', href: routes.projects, dropdown: true },
  { key: 'investment', label: 'الاستثمار والأسئلة', href: routes.investment },
  { key: 'contact', label: 'تواصل معنا', href: routes.contact },
];

// The existing WordPress contact plugin (admin-ajax actions wngg_contact_init /
// wngg_contact_send). It only answers same-origin requests on westngg.com.
export const contactForm = {
  endpoint: '/wp-admin/admin-ajax.php',
  initAction: 'wngg_contact_init',
  sendAction: 'wngg_contact_send',
  interests: [
    { value: 'general', label: 'استفسار عام' },
    { value: 'projects', label: 'تفاصيل المشروعات' },
    { value: 'investment', label: 'فرص الاستثمار' },
    { value: 'visit', label: 'حجز موعد' },
  ],
  messages: {
    name: 'اكتب اسمك بالكامل.',
    phone: 'اكتب رقم هاتف صحيحًا من 7 إلى 15 رقمًا.',
    email: 'اكتب بريدًا إلكترونيًا صحيحًا، أو اترك الحقل فارغًا.',
    interest: 'اختر موضوع الاستفسار.',
    message: 'اكتب رسالة من 10 أحرف على الأقل.',
    consent: 'وافق على التواصل معك حتى نستطيع الرد عليك.',
    sending: 'جارٍ إرسال رسالتك…',
    success: 'وصلتنا رسالتك. سيتواصل معك فريق المبيعات.',
    unavailable:
      'النموذج غير متاح الآن. تواصل معنا بالهاتف أو واتساب أو البريد الإلكتروني.',
    timeout:
      'لم يصلنا رد من الخادم، فلا نعرف إن كانت رسالتك قد وصلت. بياناتك ما زالت في النموذج. حاول مرة أخرى أو راسلنا على واتساب.',
    network: 'تعذّر الاتصال. تأكد من الإنترنت ثم حاول مرة أخرى. بياناتك ما زالت في النموذج.',
    failed: 'لم نتمكن من إرسال رسالتك الآن. حاول لاحقًا أو تواصل معنا بالهاتف أو واتساب.',
  },
};
