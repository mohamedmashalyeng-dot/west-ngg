// Minimal tagged-template HTML helper. Interpolated values are escaped
// unless they come from `html` itself or are wrapped with `raw`.

class SafeHtml {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return this.value;
  }
}

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ESCAPES[c]);

export const raw = (value) => new SafeHtml(String(value));

function render(value) {
  if (value === null || value === undefined || value === false) return '';
  if (Array.isArray(value)) return value.map(render).join('');
  if (value instanceof SafeHtml) return value.value;
  return esc(value);
}

export function html(strings, ...values) {
  let out = strings[0];
  values.forEach((value, i) => {
    out += render(value) + strings[i + 1];
  });
  return new SafeHtml(out);
}

// Site paths contain Arabic slugs; hrefs are percent-encoded like WordPress does.
export const href = (path) => (/^(https?:|mailto:|tel:|#)/.test(path) ? path : encodeURI(path));

// Left-to-right fragment (phone numbers, emails, Latin names) inside RTL text.
export const ltr = (text, lang) =>
  html`<bdi dir="ltr"${lang ? raw(` lang="${esc(lang)}"`) : ''}>${text}</bdi>`;
