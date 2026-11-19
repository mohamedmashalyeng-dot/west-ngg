import { raw } from '../lib/html.mjs';

// 24×24 stroke icons; decorative unless a label is passed.
const paths = {
  phone:
    '<path d="M5 4h3.2l1.6 4-2 1.3a11 11 0 0 0 4.9 4.9l1.3-2 4 1.6V17a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3.5 6 8.5 7 8.5-7"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  whatsapp:
    '<path d="M4 20l1.3-4A8 8 0 1 1 8.4 19L4 20Z"/><path d="M9.2 8.6c.2-.5.6-.6.9-.6h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .5-.1.6l-.5.6c.6 1.2 1.6 2.1 2.8 2.7l.6-.6c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.6v.4c0 .6-.5 1.3-1.4 1.4-1 .1-2.9-.4-4.7-2.2S8.8 10.2 9 9.3l.2-.7Z"/>',
  arrow: '<path d="M19 12H5m6-6-6 6 6 6"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  building:
    '<path d="M4 21V5.5L12 3v18M12 8.5l8 2.5v10M3 21h18M7 8h2M7 12h2M7 16h2M15 13h2M15 17h2"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
  ruler: '<path d="M3 16.5 16.5 3 21 7.5 7.5 21 3 16.5Z"/><path d="m7 12.5 1.5 1.5M10 9.5l1.5 1.5M13 6.5 14.5 8"/>',
  map: '<path d="m9 4-6 2.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5L9 4Z"/><path d="M9 4v13.5M15 6.5V20"/>',
  expand: '<path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  down: '<path d="M12 5v14m-6-6 6 6 6-6"/>',
  road: '<path d="M8 3 4 21M16 3l4 18M12 4v3M12 11v3M12 18v2"/>',
  users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 19.5c.6-3.3 3-5 6-5s5.4 1.7 6 5"/><path d="M15.5 5.2a3 3 0 0 1 0 5.6M17.5 14.8c1.8.6 3 2.2 3.4 4.7"/>',
  shield: '<path d="M12 3 5 6v5.5c0 4.4 3 7.9 7 9.5 4-1.6 7-5.1 7-9.5V6l-7-3Z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
  chart: '<path d="M4 20h16M6 16.5l4.5-5 3.5 3L19 8"/><path d="M15 8h4v4"/>',
  bus: '<rect x="5" y="3.5" width="14" height="14" rx="2.5"/><path d="M5 11h14M8.5 21v-3.5M15.5 21v-3.5"/><circle cx="8.5" cy="14.3" r=".6"/><circle cx="15.5" cy="14.3" r=".6"/>',
  cart: '<path d="M3 4h2.5l2.2 10.5h10.1L20 7.5H6.4"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>',
  food: '<path d="M7 3v8m-2.5-8v4.5A2.5 2.5 0 0 0 7 10a2.5 2.5 0 0 0 2.5-2.5V3M7 11v10M17 21V3c-2.2 1.2-3.5 3.6-3.5 7v3.5H17"/>',
  school: '<path d="m2.5 9 9.5-5 9.5 5-9.5 5-9.5-5Z"/><path d="M6.5 11.2v4.6c1.6 1.5 3.4 2.2 5.5 2.2s3.9-.7 5.5-2.2v-4.6M21.5 9v5.5"/>',
  sport: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17M3.5 12h17M6 6c2.5 3 2.5 9 0 12M18 6c-2.5 3-2.5 9 0 12"/>',
  health: '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M12 8v8M8 12h8"/>',
  home: '<path d="m3.5 11 8.5-7 8.5 7"/><path d="M5.5 9.5V20h13V9.5M10 20v-5.5h4V20"/>',
  star: '<path d="m12 3.5 2.6 5.3 5.9.8-4.3 4.1 1 5.8L12 16.8l-5.2 2.7 1-5.8L3.5 9.6l5.9-.8L12 3.5Z"/>',
  key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 9-9M17 6l2.5 2.5M14.5 8.5 16.5 10.5"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8"/>',
  bed: '<path d="M3 19V6M3 15h18v4M21 15v-3a3 3 0 0 0-3-3h-7v6"/><circle cx="7" cy="11" r="1.8"/>',
  tree: '<path d="M12 21v-6M12 15c-4 0-6.5-2.3-6.5-5.2C5.5 6.7 8.4 3.5 12 3.5s6.5 3.2 6.5 6.3c0 2.9-2.5 5.2-6.5 5.2Z"/>',
  car: '<path d="M4 16.5V12l2-5h12l2 5v4.5M4 12h16M3 16.5h18v2.5H3z"/><circle cx="7.5" cy="14.3" r=".7"/><circle cx="16.5" cy="14.3" r=".7"/>',
  send: '<path d="M20 4 3 11l7 3 3 7 7-17ZM10 14 20 4"/>',
};

export function icon(name, { label, size = 20, cls = '' } = {}) {
  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true" focusable="false"';
  return raw(
    `<svg class="icon icon-${name}${cls ? ` ${cls}` : ''}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" ${a11y}>${paths[name]}</svg>`,
  );
}
