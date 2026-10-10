const params = new URLSearchParams(location.search);
const builderSlug = (params.get('builder') || '').toLowerCase();
const pageSlug = params.get('page') || builderSlug;
const safeSlug = /^[a-z0-9-]+$/.test(builderSlug) ? builderSlug : '';
const safePage = /^[a-z0-9-]+$/.test(pageSlug) ? pageSlug : '';
const pageRoot = location.pathname.split('/').filter(Boolean).slice(0, -1).join('/');
const rootPrefix = pageRoot ? `/${pageRoot}/` : '/';
document.getElementById('policy-home').href = `${rootPrefix}${safePage}.html`;
document.getElementById('policy-back').href = `${rootPrefix}${safePage}.html`;
document.getElementById('policy-year').textContent = new Date().getFullYear();

const templateTwoBrands = {
  'abhee-ventures': { mark: 'AV', name: 'ABHEE', tagline: 'VENTURES' },
  birla: { mark: 'BE', name: 'BIRLA', tagline: 'ESTATES' },
  godrej: { mark: 'G', name: 'GODREJ', tagline: 'PROPERTIES' },
  purvankara: { mark: 'PL', name: 'PURVANKARA', tagline: 'LIMITED' },
  sattva: { mark: 'S', name: 'SATTVA', tagline: 'GROUP' },
  'shriram-properties': { mark: 'S', name: 'SHRIRAM', tagline: 'PROPERTIES' }
};
const templateThreeBrands = {
  assetz: { name: 'ASSETZ', tagline: 'LIFE REIMAGINED' },
  bhartiya: { name: 'BHARTIYA GROUP', tagline: 'THE CITY OF JOY' },
  dsmax: { name: 'DS-MAX', tagline: 'The Joy Of Rebirth' },
  embassy: { name: 'EMBASSY', tagline: 'FUTURE FIRST' },
  mana: { name: 'MANA', tagline: 'Live Brilliantly' },
  sobha: { name: 'SOBHA', tagline: 'Passion At Work' }
};

if (safeSlug) {
  import(`../data/${safeSlug}.js`).then(module => {
    const generated = safeSlug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    const builder = module.builderName || module.builderConfig?.name || generated;
    const brand = templateTwoBrands[safeSlug] || templateThreeBrands[safeSlug] || { mark: builder.trim().charAt(0).toUpperCase(), name: builder.toUpperCase(), tagline: 'PROPERTY COLLECTION' };
    document.title = `Privacy Policy | ${builder}`;
    document.getElementById('policy-builder').textContent = brand.name;
    document.getElementById('policy-mark').textContent = brand.mark || '';
    document.getElementById('policy-location').textContent = brand.tagline;
    document.getElementById('policy-attribution').textContent = `${builder.toUpperCase()} PROPERTY ENQUIRY PAGE \u00b7 PUBLISHED BY M&A VENTURES, AUTHORISED CHANNEL PARTNER`;
  }).catch(() => {});
}