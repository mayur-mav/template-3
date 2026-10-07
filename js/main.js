let currentActiveCategory = 'all';
let activeProject = null;
let projectsData = [];

function renderProjectsCatalog() {
  const container = document.getElementById('projectsContainer');
  if (!container) return;
  container.innerHTML = projectsData.map(p => `
    <article class="project-card bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all group flex flex-col snap-start" data-id="${p.id}" data-category="${p.category}" data-search="${(p.title+' '+p.searchLocation).toLowerCase()}">
      <button type="button" class="project-image relative overflow-hidden text-left group" onclick="openPropertyDetail('${p.id}')" aria-label="View ${p.title} details">
        <img src="${p.mainImg}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
        <span class="absolute top-4 left-4 bg-sobhaNavy text-sobhaGold text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">${p.badge}</span>
        <span class="project-image-overlay absolute inset-0 flex items-center justify-center bg-sobhaNavy/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span class="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-sobhaNavy px-5 py-3 text-xs font-bold uppercase tracking-widest shadow-lg">View Details <span aria-hidden="true">→</span></span>
        </span>
      </button>
      <div class="p-4 sm:p-5 flex flex-col flex-grow">
        <p class="text-[11px] font-semibold text-sobhaGold uppercase tracking-wider mb-1">${p.theme}</p>
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

function openPropertyDetail(id) {
  const p = projectsData.find(x => x.id === id); if (!p) return;
  activeProject = p;
  const put = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
  put('detailTitle',p.title); put('detailBadge',p.badge); put('detailTheme',p.theme); put('detailPrice',p.price); put('detailOverview',p.overview);
  const loc = document.querySelector('#detailLocation span'); if(loc) loc.textContent=p.location;
  ['Possession','LandArea','Config','Rera'].forEach((key,i)=>put('spec'+key,[p.specs.possession,p.specs.landArea,p.specs.config,p.specs.rera][i]));
  const main=document.getElementById('mainGalleryImage'); if(main) main.src=p.gallery[0];
  p.gallery.slice(0,2).forEach((src,i)=>{const el=document.getElementById('thumb'+i);if(el)el.src=src;});
  const tabs=document.getElementById('floorPlanTabs');
  tabs.innerHTML=p.floorPlans.map((fp,i)=>`<button id="fpBtn-${i}" onclick="selectFloorPlan('${p.id}',${i})" class="fp-tab-btn px-4 py-2 border text-xs font-bold uppercase">${fp.type}</button>`).join('');
  document.getElementById('amenitiesGrid').innerHTML=p.amenities.map(x=>`<div class="bg-sobhaLightBg p-3 sm:p-4 border border-gray-200 text-xs font-semibold text-sobhaNavy rounded">${x}</div>`).join('');
  document.getElementById('connectivityList').innerHTML=p.connectivity.map(x=>`<div>${x}</div>`).join('');
  document.getElementById('sidebarUnitSelect').innerHTML=p.floorPlans.map(fp=>`<option>${fp.type}</option>`).join('');
  selectFloorPlan(p.id,0);
  document.getElementById('catalogView').classList.add('hidden'); document.getElementById('detailView').classList.remove('hidden');
  document.getElementById('headerNavLinks')?.classList.add('hidden');
  document.getElementById('headerBackContainer')?.classList.remove('hidden');
  document.getElementById('mobileMenuToggle')?.classList.add('hidden');
  closeMobileNavigation();
  window.scrollTo({top:0,behavior:'smooth'});
}

function showCatalogView() {
  document.getElementById('detailView')?.classList.add('hidden'); document.getElementById('catalogView')?.classList.remove('hidden');
  document.getElementById('headerBackContainer')?.classList.add('hidden'); document.getElementById('headerNavLinks')?.classList.remove('hidden');
  document.getElementById('mobileMenuToggle')?.classList.remove('hidden');
  closeMobileNavigation();
}
function toggleMobileNavigation(){const nav=document.getElementById('mobileNavigation');const button=document.getElementById('mobileMenuToggle');if(!nav||!button)return;const opening=nav.hidden;nav.hidden=!opening;nav.classList.toggle('hidden',!opening);button.setAttribute('aria-expanded',String(opening));button.setAttribute('aria-label',opening?'Close navigation menu':'Open navigation menu');}
function closeMobileNavigation(){const nav=document.getElementById('mobileNavigation');const button=document.getElementById('mobileMenuToggle');if(nav){nav.hidden=true;nav.classList.add('hidden');}button?.setAttribute('aria-expanded','false');button?.setAttribute('aria-label','Open navigation menu');}
function navigateToSection(id){
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
  const img=document.getElementById('floorPlanImg');img.src=fp.img;
  put('fpTitle',fp.type);put('fpSba',fp.sba);put('fpCarpet',fp.carpet);put('fpPrice',fp.price);
  document.querySelectorAll('.fp-tab-btn').forEach((b,i)=>b.className=`fp-tab-btn px-4 py-2 border text-xs font-bold uppercase ${i===index?'bg-sobhaNavy text-white':'bg-white text-gray-700'}`);
}
function setGalleryImage(i){const img=document.getElementById('mainGalleryImage');if(activeProject?.gallery[i]&&img)img.src=activeProject.gallery[i];}
function filterProjects(category){currentActiveCategory=category;document.querySelectorAll('.project-filter-btn').forEach(b=>b.setAttribute('aria-pressed',String(b.id===`btn-${category}`)));applyFilters();}
function applyFilters(){const q=(document.getElementById('heroSearchInput')?.value||'').trim().toLowerCase();let count=0;document.querySelectorAll('.project-card').forEach(c=>{const show=(currentActiveCategory==='all'||c.dataset.category===currentActiveCategory)&&(!q||(c.dataset.search||'').includes(q));c.classList.toggle('hidden',!show);if(show)count++;});document.getElementById('noResultsMsg')?.classList.toggle('hidden',count!==0);requestAnimationFrame(updateProjectCarouselArrows);}
function filterBySearch(){showCatalogView();applyFilters();document.getElementById('projects')?.scrollIntoView({behavior:'smooth'});}
function quickSearch(q){document.getElementById('heroSearchInput').value=q;filterBySearch();}
function handleHeroSearch(e){if(e.key==='Enter')filterBySearch();}
function resetFilters(){document.getElementById('heroSearchInput').value='';filterProjects('all');}
function triggerEnquiryScroll(){showCatalogView();setTimeout(()=>document.getElementById('enquiry')?.scrollIntoView({behavior:'smooth'}),100);}
function requestFloorPlanBrochure(){triggerEnquiryScroll();}
function handleLeadSubmit(e){e.preventDefault();document.getElementById('enquiryAlert')?.classList.remove('hidden');e.target.reset();}
function handleDetailLeadSubmit(e){e.preventDefault();alert('Thank you. Our property advisor will contact you shortly.');e.target.reset();}
function switchTab(key){const content={arch:['In-House Architecture','Our in-house team plans every space for natural light, ventilation, and long-term quality.','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'],wood:['Precision Woodworking','Custom joinery and woodworking are crafted with careful attention to materials and finish.','https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80'],metal:['Glazing & Metal','In-house glazing and metalwork bring precision and durability to every residence.','https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=600&q=80']}[key];if(!content)return;document.getElementById('tab-title').textContent=content[0];document.getElementById('tab-desc').textContent=content[1];document.getElementById('tab-image').src=content[2];}
function toggleFaq(id){document.getElementById(`faq-answer-${id}`)?.classList.toggle('hidden');}
function loadBuilderData() {
  const builder = (document.body.dataset.builder || '').trim().toLowerCase();
  const errorBox = document.getElementById('projectsContainer');
  if (!/^[a-z0-9_-]+$/.test(builder)) {
    if (errorBox) errorBox.innerHTML = '<p class="col-span-full text-center text-red-700">Set a valid builder name in the body data-builder attribute.</p>';
    return;
  }

  import(`../data/${builder}.js`).then(({ builderData }) => {
    if (!Array.isArray(builderData)) {
      if (errorBox) errorBox.innerHTML = `<p class="col-span-full text-center text-red-700">data/${builder}.js must export builderData as an array.</p>`;
      return;
    }
    projectsData = builderData;
    renderProjectsCatalog();
  }).catch(() => {
    if (errorBox) errorBox.innerHTML = `<p class="col-span-full text-center text-red-700">Could not load data/${builder}.js.</p>`;
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadBuilderData);
else loadBuilderData();

window.addEventListener('resize', updateProjectCarouselArrows);
document.getElementById('projectsContainer')?.addEventListener('scroll', updateProjectCarouselArrows, { passive: true });

document.addEventListener('click', event => {
  if (event.target.closest('#mobileNavigation a')) closeMobileNavigation();
});
