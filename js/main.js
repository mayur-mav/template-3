let currentActiveCategory = 'all';
let activeProject = null;
let projectsData = [];

function renderProjectsCatalog() {
  const container = document.getElementById('projectsContainer');
  if (!container) return;
  container.innerHTML = projectsData.map(p => `
    <article class="project-card bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all group flex flex-col snap-start" data-id="${p.id}" data-category="${p.category}" data-search="${(p.title+' '+p.searchLocation).toLowerCase()}">
      <button type="button" class="project-image relative overflow-hidden text-left group" onclick="openPropertyDetail('${p.id}')" aria-label="View ${p.title} details">
        <img src="${p.mainImg}" alt="${p.title}" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
        <span class="absolute top-4 left-4 bg-sobhaNavy text-sobhaGold text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">${p.badge}</span>
        <span class="project-image-overlay absolute inset-0 flex items-center justify-center bg-sobhaNavy/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span class="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-sobhaNavy px-5 py-3 text-xs font-bold uppercase tracking-widest shadow-lg">View Details <span aria-hidden="true">→</span></span>
        </span>
        ${p.reraId ? '<span class="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 rounded bg-white/90 backdrop-blur-sm px-2.5 py-1.5 text-[11px] font-semibold text-sobhaNavy shadow"><span aria-hidden="true" class="text-emerald-600">✓</span> RERA Verified</span>' : ''}
      </button>
      <div class="p-4 sm:p-5 flex flex-col flex-grow">
        <h3 class="font-serif text-xl sm:text-2xl font-bold text-sobhaNavy mb-2">${p.title}</h3>
        <p class="text-gray-500 text-xs mb-4">${p.location}</p>
        <div class="border-t border-gray-100 pt-3 mt-auto flex items-center justify-between gap-3">
          <div class="min-w-0"><p class="text-[10px] text-gray-400 uppercase">Starting From</p><p class="text-lg font-bold text-sobhaNavy">${p.price}</p></div>
          <button onclick="openPropertyDetail('${p.id}')" class="shrink-0 bg-sobhaNavy text-white text-[11px] font-semibold px-3 sm:px-4 py-2 uppercase">View Full Details</button>
        </div>
      </div>
    </article>`).join('');
  applyFilters();
}

function renderEnquiryProjectOptions() {
  const menu = document.getElementById('formProjectMenu');
  if (!menu) return;
  const projects = [...new Map(projectsData.filter(project => project?.title).map(project => [project.title, project])).values()];
  const options = [{ value: 'General Query', label: 'All / General Query' }, ...projects.map(project => ({ value: project.title, label: project.title }))];
  menu.replaceChildren();
  options.forEach((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'project-picker-option';
    button.role = 'option';
    button.dataset.value = option.value;
    button.textContent = option.label;
    button.setAttribute('aria-selected', String(index === 0));
    button.addEventListener('click', () => {
      document.getElementById('formProject').value = option.value;
      document.getElementById('formProjectValue').textContent = option.label;
      menu.querySelectorAll('[role="option"]').forEach(item => item.setAttribute('aria-selected', String(item === button)));
      menu.hidden = true;
      document.getElementById('formProjectToggle').setAttribute('aria-expanded', 'false');
      document.getElementById('formProjectToggle').focus();
    });
    menu.append(button);
  });
}

function renderPopularLocations(locations) {
  const container = document.getElementById('popularLocations');
  const list = document.getElementById('popularLocationList');
  if (!container || !list) return;
  const items = [...new Set((Array.isArray(locations) ? locations : []).map(location => String(location).trim()).filter(Boolean))];
  list.replaceChildren();
  items.forEach((location, index) => {
    if (index) {
      const separator = document.createElement('span');
      separator.className = 'text-gray-400';
      separator.setAttribute('aria-hidden', 'true');
      separator.textContent = '•';
      list.append(separator);
    }
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'hover:text-sobhaGold underline underline-offset-4 transition-colors';
    button.textContent = location;
    button.addEventListener('click', () => quickSearch(location));
    list.append(button);
  });
  container.classList.toggle('hidden', items.length === 0);
}

function renderSidebarUnitOptions(project) {
  const menu = document.getElementById('sidebarUnitMenu');
  const value = document.getElementById('sidebarUnitValue');
  const field = document.getElementById('sidebarUnitSelect');
  if (!menu || !value || !field) return;
  const unitTypes = [...new Set((project.floorPlans || []).map(plan => plan?.type).filter(Boolean))];
  menu.replaceChildren();
  unitTypes.forEach((unitType, index) => {
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'project-picker-option';
    option.setAttribute('role', 'option');
    option.setAttribute('aria-selected', String(index === 0));
    option.textContent = unitType;
    option.addEventListener('click', () => {
      field.value = unitType;
      value.textContent = unitType;
      menu.querySelectorAll('[role="option"]').forEach(item => item.setAttribute('aria-selected', String(item === option)));
      menu.hidden = true;
      document.getElementById('sidebarUnitToggle').setAttribute('aria-expanded', 'false');
      document.getElementById('sidebarUnitToggle').focus();
    });
    menu.append(option);
  });
  field.value = unitTypes[0] || '';
  value.textContent = unitTypes[0] || 'No unit types available';
  document.getElementById('sidebarUnitToggle').disabled = unitTypes.length === 0;
  menu.hidden = true;
  document.getElementById('sidebarUnitToggle').setAttribute('aria-expanded', 'false');
}

function openPropertyDetail(id) {
  const p = projectsData.find(x => x.id === id); if (!p) return;
  activeProject = p;
  const put = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
  put('detailTitle',p.title); put('detailBadge',p.badge); put('detailPrice',p.price); put('detailOverview',p.overview);
  const detailTheme=document.getElementById('detailTheme');
  const detailReraToggle=document.getElementById('detailReraToggle');
  const detailReraValue=document.getElementById('detailReraValue');
  if(detailTheme)detailTheme.textContent=p.reraId?'':p.theme;
  if(detailReraToggle){detailReraToggle.classList.toggle('hidden',!p.reraId);detailReraToggle.setAttribute('aria-expanded','false');}
  if(detailReraValue){detailReraValue.textContent=p.reraId?`RERA ID: ${p.reraId}`:'';detailReraValue.classList.add('hidden');}
  const loc = document.querySelector('#detailLocation span'); if(loc) loc.textContent=p.location;
  ['Possession','LandArea','Config'].forEach((key,i)=>put('spec'+key,[p.specs.possession,p.specs.landArea,p.specs.config][i]));
  put('specRera',p.reraId || 'Not available');
  const main=document.getElementById('mainGalleryImage'); if(main){main.loading='eager';main.fetchPriority='high';main.src=p.gallery[0];}
  p.gallery.slice(0,2).forEach((src,i)=>{const el=document.getElementById('thumb'+i);if(el)el.src=src;});
  setGalleryImage(0);
  const tabs=document.getElementById('floorPlanTabs');
  tabs.innerHTML=p.floorPlans.map((fp,i)=>`<button id="fpBtn-${i}" onclick="selectFloorPlan('${p.id}',${i})" class="fp-tab-btn px-4 py-2 border text-xs font-bold uppercase">${fp.type}</button>`).join('');
  const amenitiesGrid=document.getElementById('amenitiesGrid');
  amenitiesGrid.innerHTML=p.amenities.map(item=>{
    const name=typeof item==='string'?item:item.name;
    const icon=typeof item==='string'?'fa-solid fa-star':item.icon;
    return `<div class="amenity-item bg-sobhaLightBg p-3 sm:p-4 border border-gray-200 text-xs font-semibold text-sobhaNavy rounded"><i class="${icon} text-sobhaGold" aria-hidden="true"></i><span>${name}</span></div>`;
  }).join('');
  addListExpansion(amenitiesGrid, 6, 'amenities');
  const connectivityList=document.getElementById('connectivityList');
  connectivityList.innerHTML=p.connectivity.map(item=>{
    const entry=typeof item==='string'?{label:item,distance:'',icon:'fa-solid fa-location-dot'}:item;
    return `<div class="connectivity-item"><span class="connectivity-label"><i class="${entry.icon||'fa-solid fa-location-dot'} text-sobhaGold" aria-hidden="true"></i><span>${entry.label}</span></span>${entry.distance?`<span class="connectivity-distance">${entry.distance}</span>`:''}</div>`;
  }).join('');
  addListExpansion(connectivityList, 4, 'connectivity');
  renderSidebarUnitOptions(p);
  selectFloorPlan(p.id,0);
  document.getElementById('catalogView').classList.add('hidden'); document.getElementById('detailView').classList.remove('hidden');
  document.getElementById('siteFooter')?.classList.add('hidden');
  document.getElementById('detailBackButton')?.classList.remove('hidden');
  document.getElementById('detailBackButton')?.classList.add('inline-flex');
  closeMobileNavigation();
  window.scrollTo({top:0,behavior:'smooth'});
}

function addListExpansion(list, collapsedLimit, label) {
  list.classList.toggle('list-collapsed', list.children.length > collapsedLimit);
  const oldButton=list.nextElementSibling;
  if(oldButton?.classList.contains('list-expansion-toggle')) oldButton.remove();
  if(list.children.length <= collapsedLimit) return;
  const button=document.createElement('button');
  button.type='button';
  button.className='list-expansion-toggle';
  button.setAttribute('aria-expanded','false');
  button.textContent=`View more ${label}`;
  button.addEventListener('click',()=>{
    const expanded=button.getAttribute('aria-expanded')==='true';
    button.setAttribute('aria-expanded',String(!expanded));
    list.classList.toggle('list-collapsed',expanded);
    button.textContent=expanded?`View more ${label}`:`View less ${label}`;
  });
  list.insertAdjacentElement('afterend',button);
}

function toggleReraId(button){
  const value=button.nextElementSibling;
  if(!value)return;
  const expanded=button.getAttribute('aria-expanded')==='true';
  button.setAttribute('aria-expanded',String(!expanded));
  value.classList.toggle('hidden',expanded);
}

function showCatalogView() {
  document.getElementById('detailView')?.classList.add('hidden'); document.getElementById('catalogView')?.classList.remove('hidden');
  document.getElementById('siteFooter')?.classList.remove('hidden');
  document.getElementById('detailBackButton')?.classList.add('hidden'); document.getElementById('detailBackButton')?.classList.remove('inline-flex'); document.getElementById('headerNavLinks')?.classList.remove('hidden');
  document.getElementById('mobileMenuToggle')?.classList.remove('hidden');
  closeMobileNavigation();
}
function toggleMobileNavigation(){const nav=document.getElementById('mobileNavigation');const button=document.getElementById('mobileMenuToggle');if(!nav||!button)return;const opening=nav.hidden;nav.hidden=!opening;nav.classList.toggle('hidden',!opening);button.setAttribute('aria-expanded',String(opening));button.setAttribute('aria-label',opening?'Close navigation menu':'Open navigation menu');}
function closeMobileNavigation(){const nav=document.getElementById('mobileNavigation');const button=document.getElementById('mobileMenuToggle');if(nav){nav.hidden=true;nav.classList.add('hidden');}button?.setAttribute('aria-expanded','false');button?.setAttribute('aria-label','Open navigation menu');}
function setActiveNavigationItem(id){
  document.querySelectorAll('.nav-section-link').forEach(link=>{
    const active=link.hash===`#${id}`;
    link.classList.toggle('nav-link-active',active);
    if(active)link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  });
}
function navigateToSection(id){
  setActiveNavigationItem(id);
  showCatalogView();
  closeMobileNavigation();
  if (window.location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);
  requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'})));
}
function scrollProjects(direction){
  const rail=document.getElementById('projectsContainer');
  if(!rail)return;
  const card=rail.querySelector('.project-card');
  const gap=parseFloat(getComputedStyle(rail).columnGap)||24;
  const amount=card ? card.getBoundingClientRect().width+gap : rail.clientWidth*.8;
  rail.scrollBy({left:direction*amount,behavior:'smooth'});
}
function updateProjectCarouselArrows(){
  const rail=document.getElementById('projectsContainer');
  const arrows=document.querySelectorAll('.project-carousel-arrow');
  if(!rail||!arrows.length)return;
  const maxScroll=rail.scrollWidth-rail.clientWidth;
  const hasOverflow=maxScroll>1;
  const previous=document.querySelector('.project-carousel-arrow-prev');
  const next=document.querySelector('.project-carousel-arrow-next');
  arrows.forEach(arrow=>{arrow.hidden=!hasOverflow;});
  if(hasOverflow){
    if(previous)previous.disabled=rail.scrollLeft<=1;
    if(next)next.disabled=rail.scrollLeft>=maxScroll-1;
  }
}
function selectFloorPlan(id,index) {
  const p=projectsData.find(x=>x.id===id), fp=p?.floorPlans[index]; if(!fp)return;
  const put=(el,v)=>{const node=document.getElementById(el);if(node)node.textContent=v;};
  const img=document.getElementById('floorPlanImg');img.loading='lazy';img.src=fp.img;
  put('fpTitle',fp.type);put('fpSba',fp.sba);put('fpPrice',fp.price);
  document.querySelectorAll('.fp-tab-btn').forEach((b,i)=>b.className=`fp-tab-btn px-4 py-2 border text-xs font-bold uppercase ${i===index?'bg-sobhaNavy text-white':'bg-white text-gray-700'}`);
  const unitField=document.getElementById('sidebarUnitSelect');
  const unitValue=document.getElementById('sidebarUnitValue');
  const unitMenu=document.getElementById('sidebarUnitMenu');
  if(unitField&&unitValue){unitField.value=fp.type;unitValue.textContent=fp.type;}
  if(unitMenu){unitMenu.hidden=true;unitMenu.querySelectorAll('[role="option"]').forEach(option=>option.setAttribute('aria-selected',String(option.textContent===fp.type)));}
  document.getElementById('sidebarUnitToggle')?.setAttribute('aria-expanded','false');
}
function setGalleryImage(i){
  const img=document.getElementById('mainGalleryImage');
  if(activeProject?.gallery[i]&&img)img.src=activeProject.gallery[i];
  [0,1].forEach(index=>{
    const button=document.getElementById(`thumb${index}`)?.closest('button');
    if(!button)return;
    const selected=index===i;
    button.classList.toggle('ring-2',selected);
    button.classList.toggle('ring-sobhaGold',selected);
    button.setAttribute('aria-pressed',String(selected));
  });
}
function filterProjects(category){currentActiveCategory=category;document.querySelectorAll('.project-filter-btn').forEach(b=>b.setAttribute('aria-pressed',String(b.id===`btn-${category}`)));applyFilters();}
function applyFilters(){const q=(document.getElementById('heroSearchInput')?.value||'').trim().toLowerCase();let count=0;document.querySelectorAll('.project-card').forEach(c=>{const show=(currentActiveCategory==='all'||c.dataset.category===currentActiveCategory)&&(!q||(c.dataset.search||'').includes(q));c.classList.toggle('hidden',!show);if(show)count++;});document.getElementById('noResultsMsg')?.classList.toggle('hidden',count!==0);requestAnimationFrame(updateProjectCarouselArrows);}
function filterBySearch(){showCatalogView();applyFilters();document.getElementById('projects')?.scrollIntoView({behavior:'smooth'});}
function quickSearch(q){document.getElementById('heroSearchInput').value=q;filterBySearch();}
function handleHeroSearch(e){if(e.key==='Enter')filterBySearch();}
function resetFilters(){document.getElementById('heroSearchInput').value='';filterProjects('all');}
function triggerEnquiryScroll(){setActiveNavigationItem('enquiry');showCatalogView();setTimeout(()=>document.getElementById('enquiry')?.scrollIntoView({behavior:'smooth'}),100);}
function requestFloorPlanBrochure(){triggerEnquiryScroll();}
function handleLeadSubmit(e){e.preventDefault();document.getElementById('enquiryAlert')?.classList.remove('hidden');e.target.reset();}
function handleDetailLeadSubmit(e){e.preventDefault();alert('Thank you. Our property advisor will contact you shortly.');e.target.reset();}
function renderBuilderFaq(faqs) {
  const section = document.getElementById('faq');
  const list = document.getElementById('faqList');
  if (!section || !list) return;
  const entries = Array.isArray(faqs) ? faqs.filter(item => item?.question && item?.answer) : [];
  list.replaceChildren();
  const useTwoColumns = entries.length > 5;
  list.className = useTwoColumns ? 'faq-two-column' : 'space-y-4';
  section.hidden = entries.length === 0;
  const columns = useTwoColumns ? [document.createElement('div'), document.createElement('div')] : [list];
  if (useTwoColumns) {
    columns.forEach(column => {
      column.className = 'faq-column';
      list.append(column);
    });
  }

  const renderCard = (item, index, parent) => {
    const card = document.createElement('article');
    card.className = 'bg-white border border-gray-200 shadow-sm transition-all duration-200';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'w-full text-left p-5 sm:p-6 flex justify-between items-center focus:outline-none';
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', `faq-answer-${index}`);
    const question = document.createElement('span');
    question.className = 'font-sans font-semibold text-sobhaNavy text-base sm:text-lg leading-snug';
    question.textContent = item.question;
    const icon = document.createElement('span');
    icon.id = `faq-icon-${index}`;
    icon.className = 'text-sobhaGold font-bold text-xl transition-transform duration-300';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '+';
    button.append(question, icon);
    button.addEventListener('click', () => toggleFaq(index));
    const answer = document.createElement('div');
    answer.id = `faq-answer-${index}`;
    answer.className = 'hidden px-5 sm:px-6 pb-5 sm:pb-6 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-4';
    answer.textContent = item.answer;
    card.append(button, answer);
    parent.append(card);
  };

  entries.forEach((item, index) => {
    const columnIndex = useTwoColumns ? index % columns.length : 0;
    renderCard(item, index, columns[columnIndex]);
  });
}
function toggleFaq(id){
  const answer=document.getElementById(`faq-answer-${id}`);
  const button=document.querySelector(`[aria-controls="faq-answer-${id}"]`);
  if(!answer||!button)return;
  const opening=answer.classList.contains('hidden');
  answer.classList.toggle('hidden',!opening);
  button.closest('article')?.classList.toggle('faq-open', opening);
  button.setAttribute('aria-expanded',String(opening));
  const icon=document.getElementById(`faq-icon-${id}`);
  if(icon)icon.textContent=opening?'−':'+';
}
function loadBuilderData() {
  const builder = (document.body.dataset.builder || '').trim().toLowerCase();
  const errorBox = document.getElementById('projectsContainer');
  if (!/^[a-z0-9_-]+$/.test(builder)) {
    if (errorBox) errorBox.innerHTML = '<p class="col-span-full text-center text-red-700">Set a valid builder name in the body data-builder attribute.</p>';
    return;
  }

  import(`../data/${builder}.js`).then(({ builderData, builderFaq, popularLocations, builderName }) => {
    if (!Array.isArray(builderData)) {
      if (errorBox) errorBox.innerHTML = `<p class="col-span-full text-center text-red-700">data/${builder}.js must export builderData as an array.</p>`;
      return;
    }
    projectsData = builderData;
    const displayedBuilderName = builderName || builder.replace(/[-_]+/g, ' ').replace(/\b\w/g, character => character.toUpperCase());
    document.querySelectorAll('[data-builder-name]').forEach(element => {
      element.textContent = displayedBuilderName;
    });
    const footerPropertyCount = document.getElementById('footerPropertyCount');
    if (footerPropertyCount) footerPropertyCount.textContent = String(builderData.length);
    renderProjectsCatalog();
    renderEnquiryProjectOptions();
    renderBuilderFaq(builderFaq);
    renderPopularLocations(popularLocations);
  }).catch(() => {
    if (errorBox) errorBox.innerHTML = `<p class="col-span-full text-center text-red-700">Could not load data/${builder}.js.</p>`;
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadBuilderData);
else loadBuilderData();

window.addEventListener('resize', updateProjectCarouselArrows);
window.addEventListener('popstate', () => setActiveNavigationItem(window.location.hash.slice(1)));
document.getElementById('projectsContainer')?.addEventListener('scroll', updateProjectCarouselArrows, { passive: true });

setActiveNavigationItem(window.location.hash ? decodeURIComponent(window.location.hash.slice(1)) : 'hero');

document.addEventListener('click', event => {
  if (event.target.closest('#mobileNavigation a')) closeMobileNavigation();
  const toggle = document.getElementById('formProjectToggle');
  const menu = document.getElementById('formProjectMenu');
  if (toggle && menu && !event.target.closest('.project-picker')) {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  }
  const unitToggle = document.getElementById('sidebarUnitToggle');
  const unitMenu = document.getElementById('sidebarUnitMenu');
  if (unitToggle && unitMenu && !event.target.closest('#sidebarUnitPicker')) {
    unitMenu.hidden = true;
    unitToggle.setAttribute('aria-expanded', 'false');
  }
});

document.getElementById('formProjectToggle')?.addEventListener('click', event => {
  const menu = document.getElementById('formProjectMenu');
  const opening = menu.hidden;
  menu.hidden = !opening;
  event.currentTarget.setAttribute('aria-expanded', String(opening));
  if (opening) menu.querySelector('[aria-selected="true"]')?.focus();
});
document.getElementById('formProjectToggle')?.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    document.getElementById('formProjectMenu').hidden = true;
    event.currentTarget.setAttribute('aria-expanded', 'false');
  }
});
document.getElementById('sidebarUnitToggle')?.addEventListener('click', event => {
  const menu = document.getElementById('sidebarUnitMenu');
  const opening = menu.hidden;
  menu.hidden = !opening;
  event.currentTarget.setAttribute('aria-expanded', String(opening));
  if (opening) menu.querySelector('[aria-selected="true"]')?.focus();
});
document.getElementById('sidebarUnitToggle')?.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    document.getElementById('sidebarUnitMenu').hidden = true;
    event.currentTarget.setAttribute('aria-expanded', 'false');
  }
});
document.querySelector('#enquiry form')?.addEventListener('reset', () => {
  const value = document.getElementById('formProjectValue');
  const menu = document.getElementById('formProjectMenu');
  const toggle = document.getElementById('formProjectToggle');
  if (value) value.textContent = 'All / General Query';
  if (menu) {
    menu.hidden = true;
    menu.querySelectorAll('[role="option"]').forEach((item, index) => item.setAttribute('aria-selected', String(index === 0)));
  }
  toggle?.setAttribute('aria-expanded', 'false');
});
document.querySelector('#detailView form')?.addEventListener('reset', () => {
  const menu = document.getElementById('sidebarUnitMenu');
  const field = document.getElementById('sidebarUnitSelect');
  const value = document.getElementById('sidebarUnitValue');
  const toggle = document.getElementById('sidebarUnitToggle');
  const firstOption = menu?.querySelector('[role="option"]');
  if (field) field.value = firstOption?.textContent || '';
  if (value) value.textContent = firstOption?.textContent || 'No unit types available';
  menu?.querySelectorAll('[role="option"]').forEach((item, index) => item.setAttribute('aria-selected', String(index === 0)));
  if (menu) menu.hidden = true;
  toggle?.setAttribute('aria-expanded', 'false');
});
