
function setImageSource(image, src, { loading = 'lazy', priority = 'auto' } = {}) {
  if (!image || !src) return;
  image.loading = loading;
  image.fetchPriority = priority;
  image.decoding = 'async';
  image.src = src;
}

function getCardImageUrl(src) {
  try {
    const url = new URL(src);
    if (url.hostname === 'images.unsplash.com') {
      url.searchParams.set('w', '640');
      url.searchParams.set('q', '72');
    }
    return url.href;
  } catch {
    return src;
  }
}

// Curated luxury architectural imagery for Assetz Property Group developments

const assetzSearchTerms = [
  'Assetz Property Group in Bangalore',
  'Assetz apartments',
  'Assetz builders',
  'Assetz upcoming projects in Bangalore',
  'Assetz property Bangalore',
  'Assetz group Bangalore',
  'apartments for sale in Bangalore',
  'flats for sale in Bangalore',
  'ready to move flats in Bangalore'
];

function formatOverviewList(values) {
  if (!values || values.length === 0) return '';
  if (values.length < 2) return values[0] || '';
  return `${values.slice(0, -1).join(', ')} and ${values[values.length - 1]}`;
}

function createAssetzPropertyOverview(property, allProperties = []) {
  const projectIndex = Array.isArray(allProperties)
    ? allProperties.findIndex(({ id }) => id === property.id)
    : 0;
  const isReady = /ready/i.test(property.category || property.badge || '');
  const searchTerm = isReady
    ? 'ready to move flats in Bangalore'
    : assetzSearchTerms[(projectIndex >= 0 ? projectIndex : 0) % assetzSearchTerms.length];

  const floorPlans = formatOverviewList((property.floorPlans || []).slice(0, 3).map(fp => fp.bhk || fp.type));
  const amenities = formatOverviewList((property.amenities || []).slice(0, 4).map(a => typeof a === 'string' ? a : a.name));
  const nearbyPlaces = formatOverviewList((property.connectivity || []).slice(0, 3).map(c => `${c.label || c.place || c.title} (${c.distance || c.time || 'nearby'})`));

  const baseDescription = property.overview || property.description || `${property.title} is an iconic sustainable development by Assetz Property Group located in ${property.location}.`;

  const para1 = `${baseDescription} Buyers researching ${searchTerm} can explore Assetz Property Group homes in ${property.location}, with project status, location, and configuration details available to compare.`;

  const statusText = property.badge || (property.category === 'ready-to-move' ? 'Ready to Move' : property.category === 'new-launch' ? 'New Launch' : 'Ongoing');
  const reraStr = property.reraId ? ` RERA registration number: ${property.reraId.replace(/\.$/, '')}.` : '';

  const para2 = `${property.title} is listed with ${property.specs?.config || property.bhk || 'luxury residences'} across ${property.specs?.landArea || property.area || 'generous acreage'}, with ${statusText.toLowerCase()} status and possession scheduled for ${property.specs?.possession || property.possession || 'upcoming handover'}. Listed floor plan options include ${floorPlans || property.specs?.config || property.bhk || 'spacious layouts'}. Residents can explore lifestyle amenities such as ${amenities || 'the community’s curated luxury facilities'}, with nearby destinations including ${nearbyPlaces || property.location}. Review this Assetz Property Group project’s floor plans, amenities, and connectivity when comparing homes in Bengaluru.${reraStr}`;

  return [para1, para2];
}

let currentActiveCategory = "all";
let activeProject = null;
let projectsData = [];

function getSiteBasePath() {
  const configuredBase = document.querySelector("base")?.href || window.location.origin + "/";
  const basePath = new URL(configuredBase, window.location.href).pathname;
  return basePath.endsWith("/") ? basePath : `${basePath}/`;
}

function renderProjectsCatalog() {
  const container = document.getElementById("projectsContainer");
  if (!container) return;
  container.innerHTML = projectsData
    .map(
      (p) => {
        const imgSrc = p.mainImg || p.thumbnail || p.gallery?.[0] || "";
        return `
    <article class="project-card cursor-pointer bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all group flex flex-col snap-start" data-id="${p.id}" data-category="${p.category}" data-search="${(p.title + " " + p.searchLocation).toLowerCase()}" tabindex="0" role="link" aria-label="View ${p.title} details">
      <div class="project-image relative overflow-hidden text-left group">
        <img src="${getCardImageUrl(imgSrc)}" alt="${p.title}" class="card-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async">
        <span class="absolute top-4 left-4 bg-sobhaNavy text-[#E4C477] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">${p.badge}</span>
        <span class="project-image-overlay absolute inset-0 flex items-center justify-center bg-sobhaNavy/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span class="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-sobhaNavy px-5 py-3 text-xs font-bold uppercase tracking-widest shadow-lg">View Details <span aria-hidden="true">→</span></span>
        </span>
        ${p.reraId ? '<span class="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 rounded bg-white/90 backdrop-blur-sm px-2.5 py-1.5 text-[11px] font-semibold text-sobhaNavy shadow"><span aria-hidden="true" class="text-emerald-600">✓</span> RERA Verified</span>' : ""}
      </div>
      <div class="p-4 sm:p-5 flex flex-col flex-grow">
        <h3 class="font-serif text-xl sm:text-2xl font-bold text-sobhaNavy mb-2 hover:text-sobhaGold transition-colors">${p.title}</h3>
        <p class="text-gray-500 text-xs mb-4">${p.location}</p>
        <div class="border-t border-gray-100 pt-3 mt-auto flex items-center justify-between gap-3">
          <div class="min-w-0"><p class="text-[10px] text-gray-600 uppercase">Starting From</p><p class="text-lg font-bold text-sobhaNavy">${p.price}</p></div>
          <button type="button" class="shrink-0 bg-sobhaNavy hover:bg-sobhaGold hover:text-sobhaNavy text-white text-[11px] font-semibold px-3 sm:px-4 py-2 uppercase transition-all shadow-sm">View Full Details</button>
        </div>
      </div>
    </article>`;
      }
    )
    .join("");

  container.querySelectorAll(".project-card").forEach((card) => {
    const id = card.dataset.id;
    card.addEventListener("click", () => {
      openPropertyDetail(id);
    });
    card.addEventListener("keydown", (event) => {
      if (event.target !== card) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPropertyDetail(id);
      }
    });
  });

  container.querySelectorAll(".card-img").forEach((cardImage) => {
    cardImage.addEventListener("error", () => {
      const imageWrap = cardImage.closest(".project-image");
      imageWrap?.classList.add("image-unavailable");
    }, { once: true });
  });

  applyFilters();
}

function renderEnquiryProjectOptions() {
  const menu = document.getElementById("formProjectMenu");
  if (!menu) return;
  const projects = [
    ...new Map(
      projectsData
        .filter((project) => project?.title)
        .map((project) => [project.title, project]),
    ).values(),
  ];
  const options = [
    { value: "General Query", label: "All / General Query" },
    ...projects.map((project) => ({
      value: project.title,
      label: project.title,
    })),
  ];
  menu.replaceChildren();
  options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "project-picker-option";
    button.role = "option";
    button.dataset.value = option.value;
    button.textContent = option.label;
    button.setAttribute("aria-selected", String(index === 0));
    button.addEventListener("click", () => {
      document.getElementById("formProject").value = option.value;
      document.getElementById("formProjectValue").textContent = option.label;
      menu
        .querySelectorAll('[role="option"]')
        .forEach((item) =>
          item.setAttribute("aria-selected", String(item === button)),
        );
      menu.hidden = true;
      document
        .getElementById("formProjectToggle")
        .setAttribute("aria-expanded", "false");
      document.getElementById("formProjectToggle").focus();
    });
    menu.append(button);
  });
}

function renderPopularLocations(locations) {
  const container = document.getElementById("popularLocations");
  const list = document.getElementById("popularLocationList");
  if (!container || !list) return;
  const items = [
    ...new Set(
      (Array.isArray(locations) ? locations : [])
        .map((location) => String(location).trim())
        .filter(Boolean),
    ),
  ];
  list.replaceChildren();
  items.forEach((location, index) => {
    if (index) {
      const separator = document.createElement("span");
      separator.className = "text-gray-400";
      separator.setAttribute("aria-hidden", "true");
      separator.textContent = "•";
      list.append(separator);
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className =
      "hover:text-sobhaGold underline underline-offset-4 transition-colors";
    button.textContent = location;
    button.addEventListener("click", () => quickSearch(location));
    list.append(button);
  });
  container.classList.toggle("hidden", items.length === 0);
}

function renderSidebarUnitOptions(project) {
  const menu = document.getElementById("sidebarUnitMenu");
  const value = document.getElementById("sidebarUnitValue");
  const field = document.getElementById("sidebarUnitSelect");
  if (!menu || !value || !field) return;
  const unitTypes = [
    ...new Set(
      (project.floorPlans || []).map((plan) => plan?.type).filter(Boolean),
    ),
  ];
  menu.replaceChildren();
  unitTypes.forEach((unitType, index) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "project-picker-option";
    option.setAttribute("role", "option");
    option.setAttribute("aria-selected", String(index === 0));
    option.textContent = unitType;
    option.addEventListener("click", () => {
      field.value = unitType;
      value.textContent = unitType;
      menu
        .querySelectorAll('[role="option"]')
        .forEach((item) =>
          item.setAttribute("aria-selected", String(item === option)),
        );
      menu.hidden = true;
      document
        .getElementById("sidebarUnitToggle")
        .setAttribute("aria-expanded", "false");
      document.getElementById("sidebarUnitToggle").focus();
    });
    menu.append(option);
  });
  field.value = unitTypes[0] || "";
  value.textContent = unitTypes[0] || "No unit types available";
  document.getElementById("sidebarUnitToggle").disabled =
    unitTypes.length === 0;
  menu.hidden = true;
  document
    .getElementById("sidebarUnitToggle")
    .setAttribute("aria-expanded", "false");
}

function openPropertyDetail(id, updateUrl = true) {
  const p = projectsData.find((x) => x.id === id);
  if (!p) return;
  activeProject = p;
  const put = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };
  put("detailTitle", p.title);
  put("detailBadge", p.badge);
  put("detailPrice", p.price);
  const overEl = document.getElementById("detailOverview");
  if (overEl) {
    const overviewParas = createAssetzPropertyOverview(p, projectsData || []);
        overEl.innerHTML = overviewParas.map((para) => {
      const registration = para.match(/^(.*) RERA registration number: (.+).$/);
      if (!registration) {
        return `<p class="overview-text leading-relaxed text-slate-700 mb-4">${para}</p>`;
      }
      return `<p class="overview-text leading-relaxed text-slate-700 mb-4">${registration[1]}</p>
              <div class="overview-rera-card mt-5 pt-4 border-t border-[#E8E1D5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50/80 p-3.5 sm:p-4 rounded-xl border border-emerald-200/90">
                <div class="flex items-center gap-2.5 text-emerald-900 text-xs sm:text-sm font-semibold">
                  <span class="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-[10px]">
                    <i class="fa-solid fa-check" aria-hidden="true"></i>
                  </span>
                  <span>Official Karnataka RERA Registered</span>
                </div>
                <div class="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  <span class="text-[10px] sm:text-xs uppercase tracking-wider text-emerald-800 font-bold">RERA No:</span>
                  <span class="overview-rera font-mono text-xs font-bold text-slate-900 bg-white px-2.5 py-1 rounded border border-emerald-200 break-all select-all">${registration[2]}</span>
                </div>
              </div>`;
    }).join("");
  }
  const detailTheme = document.getElementById("detailTheme");
  const detailReraToggle = document.getElementById("detailReraToggle");
  const detailReraValue = document.getElementById("detailReraValue");
  if (detailTheme) detailTheme.textContent = p.reraId ? "" : p.theme;
  if (detailReraToggle) {
    detailReraToggle.classList.toggle("hidden", !p.reraId);
    detailReraToggle.setAttribute("aria-expanded", "false");
  }
  if (detailReraValue) {
    detailReraValue.textContent = p.reraId ? `RERA ID: ${p.reraId}` : "";
    detailReraValue.classList.add("hidden");
  }
  const loc = document.querySelector("#detailLocation span");
  if (loc) loc.textContent = p.location;
  ["Possession", "LandArea", "Config"].forEach((key, i) =>
    put(
      "spec" + key,
      [p.specs.possession, p.specs.landArea, p.specs.config][i],
    ),
  );
  put("specRera", p.reraId || "Not available");
  const main = document.getElementById("mainGalleryImage");
  const mainImgSrc = p.mainImg || p.thumbnail || p.gallery?.[0] || "";
  const galleryImgs = Array.isArray(p.gallery) && p.gallery.length ? p.gallery : (p.images || [mainImgSrc]);
  if (main) {
    setImageSource(main, mainImgSrc, { loading: "eager", priority: "high" });
    main.addEventListener("error", () => {
      main.closest(".group")?.classList.add("image-unavailable");
    }, { once: true });
  }
  galleryImgs.slice(0, 2).forEach((src, i) => {
    const el = document.getElementById("thumb" + i);
    if (el) {
      setImageSource(el, src, { loading: "lazy" });
      el.addEventListener("error", () => {
        el.closest("button")?.classList.add("image-unavailable");
      }, { once: true });
    }
  });
  setGalleryImage(0);
  const tabs = document.getElementById("floorPlanTabs");
  tabs.innerHTML = p.floorPlans
    .map(
      (fp, i) =>
        `<button id="fpBtn-${i}" onclick="selectFloorPlan('${p.id}',${i})" class="fp-tab-btn px-4 py-2 border text-xs font-bold uppercase">${fp.type}</button>`,
    )
    .join("");
  const amenitiesGrid = document.getElementById("amenitiesGrid");
  amenitiesGrid.innerHTML = p.amenities
    .map((item) => {
      const name = typeof item === "string" ? item : item.name;
      const icon = typeof item === "string" ? "fa-solid fa-star" : item.icon;
      return `<div class="amenity-item bg-sobhaLightBg p-3 sm:p-4 border border-gray-200 text-xs font-semibold text-sobhaNavy rounded"><i class="${icon} text-sobhaGold" aria-hidden="true"></i><span>${name}</span></div>`;
    })
    .join("");
  addListExpansion(amenitiesGrid, 6, "amenities");
  const connectivityList = document.getElementById("connectivityList");
  connectivityList.innerHTML = p.connectivity
    .map((item) => {
      const entry =
        typeof item === "string"
          ? { label: item, distance: "", icon: "fa-solid fa-location-dot" }
          : item;
      return `<div class="connectivity-item"><span class="connectivity-label"><i class="${entry.icon || "fa-solid fa-location-dot"} text-sobhaGold" aria-hidden="true"></i><span>${entry.label}</span></span>${entry.distance ? `<span class="connectivity-distance">${entry.distance}</span>` : ""}</div>`;
    })
    .join("");
  addListExpansion(connectivityList, 4, "connectivity");
  renderSidebarUnitOptions(p);
  selectFloorPlan(p.id, 0);
  document.getElementById("catalogView").classList.add("hidden");
  document.getElementById("detailView").classList.remove("hidden");
  document.body.removeAttribute("data-property-route-loading");
    document.getElementById("detailBackButton")?.classList.remove("hidden");
  document.getElementById("detailBackButton")?.classList.add("inline-flex");
  closeMobileNavigation();
  if (updateUrl) {
    const basePath = getSiteBasePath();
    const cleanId = encodeURIComponent(id);
    const targetPath = `${basePath}${cleanId}`;
    if (window.location.pathname !== targetPath && window.location.pathname.replace(/\/$/, "") !== `/${cleanId}`) {
      history.pushState({ propertyId: id }, "", targetPath);
    }
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function addListExpansion(list, collapsedLimit, label) {
  list.classList.toggle(
    "list-collapsed",
    list.children.length > collapsedLimit,
  );
  const oldButton = list.nextElementSibling;
  if (oldButton?.classList.contains("list-expansion-toggle"))
    oldButton.remove();
  if (list.children.length <= collapsedLimit) return;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "list-expansion-toggle font-serif";
  button.setAttribute("aria-expanded", "false");
  button.textContent =
    label === "amenities"
      ? "View all amenities →"
      : "Explore connectivity details →";
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    list.classList.toggle("list-collapsed", expanded);
    button.textContent = expanded
      ? label === "amenities"
        ? "View all amenities →"
        : "Explore connectivity details →"
      : label === "amenities"
        ? "Show fewer amenities →"
        : "Show fewer connectivity details →";
  });
  list.insertAdjacentElement("afterend", button);
}

function toggleReraId(button) {
  const value = button.nextElementSibling;
  if (!value) return;
  const expanded = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", String(!expanded));
  value.classList.toggle("hidden", expanded);
}

function showCatalogView(updateUrl = true) {
  if (
    updateUrl &&
    projectsData.some(
      (project) =>
        `/${project.id}` === window.location.pathname.replace(/\/$/, ""),
    )
  )
    history.pushState(null, "", "/");
  document.getElementById("detailView")?.classList.add("hidden");
  document.getElementById("detailSubnavBar")?.classList.remove("is-visible");
  document.getElementById("catalogView")?.classList.remove("hidden");
    document.getElementById("detailBackButton")?.classList.add("hidden");
  document.getElementById("detailBackButton")?.classList.remove("inline-flex");
  document.getElementById("headerNavLinks")?.classList.remove("hidden");
  document.getElementById("mobileMenuToggle")?.classList.remove("hidden");
  closeMobileNavigation();
}
function toggleMobileNavigation() {
  const nav = document.getElementById("mobileNavigation");
  const button = document.getElementById("mobileMenuToggle");
  if (!nav || !button) return;
  const opening = nav.hidden;
  nav.hidden = !opening;
  nav.classList.toggle("hidden", !opening);
  button.setAttribute("aria-expanded", String(opening));
  button.setAttribute(
    "aria-label",
    opening ? "Close navigation menu" : "Open navigation menu",
  );
}
function closeMobileNavigation() {
  const nav = document.getElementById("mobileNavigation");
  const button = document.getElementById("mobileMenuToggle");
  if (nav) {
    nav.hidden = true;
    nav.classList.add("hidden");
  }
  button?.setAttribute("aria-expanded", "false");
  button?.setAttribute("aria-label", "Open navigation menu");
}
function setActiveNavigationItem(id) {
  document.querySelectorAll(".nav-section-link").forEach((link) => {
    const active =
      link.getAttribute("href") ===
      (sectionRoutes[id] ? `/${sectionRoutes[id]}` : "/");
    link.classList.toggle("nav-link-active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}
const sectionRoutes = {
  hero: "",
  projects: "residences",
  legacy: "about",
  enquiry: "contact",
  faq: "faq",
};
const routeSections = {
  "/": "hero",
  "/residences": "projects",
  "/about": "legacy",
  "/contact": "enquiry",
  "/faq": "faq",
};
function navigateToSection(id) {
  setActiveNavigationItem(id);
  showCatalogView(false);
  closeMobileNavigation();
  const route = sectionRoutes[id];
  if (route === undefined) return;
  const nextPath = route ? `/${route}` : "/";
  if (
    window.location.pathname.replace(/\/$/, "") !== nextPath.replace(/\/$/, "")
  )
    history.pushState(null, "", nextPath);
  requestAnimationFrame(() =>
    requestAnimationFrame(() =>
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" }),
    ),
  );
}
function restoreRoute({ scroll = true } = {}) {
  const path =
    decodeURIComponent(window.location.pathname).replace(/\/$/, "") || "/";
  const project = projectsData.find((item) => `/${item.id}` === path);
  if (project) {
    openPropertyDetail(project.id, false);
    return;
  }
  showCatalogView(false);
  const section = routeSections[path] || "hero";
  setActiveNavigationItem(section);
  if (scroll)
    requestAnimationFrame(() =>
      document
        .getElementById(section)
        ?.scrollIntoView({ behavior: "auto", block: "start" }),
    );
}
function scrollProjects(direction) {
  const rail = document.getElementById("projectsContainer");
  if (!rail) return;
  const card = rail.querySelector(".project-card");
  const gap = parseFloat(getComputedStyle(rail).columnGap) || 24;
  const amount = card
    ? card.getBoundingClientRect().width + gap
    : rail.clientWidth * 0.8;
  rail.scrollBy({ left: direction * amount, behavior: "smooth" });
}
function updateProjectCarouselArrows() {
  const rail = document.getElementById("projectsContainer");
  const arrows = document.querySelectorAll(".project-carousel-arrow");
  if (!rail || !arrows.length) return;
  const maxScroll = rail.scrollWidth - rail.clientWidth;
  const hasOverflow = maxScroll > 1;
  const previous = document.querySelector(".project-carousel-arrow-prev");
  const next = document.querySelector(".project-carousel-arrow-next");
  arrows.forEach((arrow) => {
    arrow.hidden = !hasOverflow;
  });
  if (hasOverflow) {
    if (previous) previous.disabled = rail.scrollLeft <= 1;
    if (next) next.disabled = rail.scrollLeft >= maxScroll - 1;
  }
}
function selectFloorPlan(id, index) {
  const p = projectsData.find((x) => x.id === id),
    fp = p?.floorPlans[index];
  if (!fp) return;
  const put = (el, v) => {
    const node = document.getElementById(el);
    if (node) node.textContent = v;
  };
  const img = document.getElementById("floorPlanImg");
  const placeholder = document.getElementById("floorPlanPlaceholder");
  const planSrc = fp.img || fp.image;
  if (img) {
    if (planSrc) {
      img.classList.add("hidden");
      if (placeholder) placeholder.classList.remove("hidden");
      const testImage = new Image();
      testImage.onload = () => {
        setImageSource(img, planSrc, { loading: "lazy" });
        img.classList.remove("hidden");
        if (placeholder) placeholder.classList.add("hidden");
      };
      testImage.onerror = () => {
        img.classList.add("hidden");
        if (placeholder) placeholder.classList.remove("hidden");
      };
      testImage.src = planSrc;
    } else {
      img.classList.add("hidden");
      if (placeholder) placeholder.classList.remove("hidden");
    }
  }
  put("fpTitle", fp.type);
  put("fpSba", fp.sba);
  put("fpPrice", fp.price);
  document
    .querySelectorAll(".fp-tab-btn")
    .forEach(
      (b, i) =>
        (b.className = `fp-tab-btn px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${i === index ? "bg-sobhaNavy text-white shadow-md border-sobhaNavy" : "bg-white text-gray-700 border-gray-200 hover:border-sobhaGold"}`),
    );
  const unitField = document.getElementById("sidebarUnitSelect");
  const unitValue = document.getElementById("sidebarUnitValue");
  const unitMenu = document.getElementById("sidebarUnitMenu");
  if (unitField && unitValue) {
    unitField.value = fp.type;
    unitValue.textContent = fp.type;
  }
  if (unitMenu) {
    unitMenu.hidden = true;
    unitMenu
      .querySelectorAll('[role="option"]')
      .forEach((option) =>
        option.setAttribute(
          "aria-selected",
          String(option.textContent === fp.type),
        ),
      );
  }
  document
    .getElementById("sidebarUnitToggle")
    ?.setAttribute("aria-expanded", "false");
}
function setGalleryImage(i) {
  const img = document.getElementById("mainGalleryImage");
  const galleryImgs = Array.isArray(activeProject?.gallery) && activeProject.gallery.length
    ? activeProject.gallery
    : (activeProject?.images || [activeProject?.mainImg || ""]);
  if (galleryImgs[i] && img) {
    setImageSource(img, galleryImgs[i]);
  }
  [0, 1].forEach((index) => {
    const button = document.getElementById(`thumb${index}`)?.closest("button");
    if (!button) return;
    const selected = index === i;
    button.classList.toggle("ring-2", selected);
    button.classList.toggle("ring-sobhaGold", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}
function filterProjects(category) {
  currentActiveCategory = category;
  document
    .querySelectorAll(".project-filter-btn")
    .forEach((b) =>
      b.setAttribute("aria-pressed", String(b.id === `btn-${category}`)),
    );
  applyFilters();
}
function applyFilters() {
  const q = (document.getElementById("heroSearchInput")?.value || "")
    .trim()
    .toLowerCase();
  let count = 0;
  document.querySelectorAll(".project-card").forEach((c) => {
    const show =
      (currentActiveCategory === "all" ||
        c.dataset.category === currentActiveCategory) &&
      (!q || (c.dataset.search || "").includes(q));
    c.classList.toggle("hidden", !show);
    if (show) count++;
  });
  document
    .getElementById("noResultsMsg")
    ?.classList.toggle("hidden", count !== 0);
  requestAnimationFrame(updateProjectCarouselArrows);
}
function filterBySearch() {
  showCatalogView();
  applyFilters();
  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
}
function quickSearch(q) {
  document.getElementById("heroSearchInput").value = q;
  filterBySearch();
}
function handleHeroSearch(e) {
  if (e.key === "Enter") filterBySearch();
}
function resetFilters() {
  document.getElementById("heroSearchInput").value = "";
  filterProjects("all");
}
function triggerEnquiryScroll() {
  navigateToSection("enquiry");
}
function requestFloorPlanBrochure() {
  triggerEnquiryScroll();
}
function handleLeadSubmit(e) {
  e.preventDefault();
  document.getElementById("enquiryAlert")?.classList.remove("hidden");
  e.target.reset();
}
function handleDetailLeadSubmit(e) {
  e.preventDefault();
  alert("Thank you. Our property advisor will contact you shortly.");
  e.target.reset();
}
function renderBuilderFaq(faqs) {
  const section = document.getElementById("faq");
  const list = document.getElementById("faqList");
  if (!section || !list) return;
  const entries = Array.isArray(faqs)
    ? faqs.filter((item) => item?.question && item?.answer)
    : [];
  list.replaceChildren();
  const useTwoColumns = entries.length > 5;
  list.className = useTwoColumns ? "faq-two-column" : "space-y-4";
  section.hidden = entries.length === 0;
  const columns = useTwoColumns
    ? [document.createElement("div"), document.createElement("div")]
    : [list];
  if (useTwoColumns) {
    columns.forEach((column) => {
      column.className = "faq-column";
      list.append(column);
    });
  }

  const renderCard = (item, index, parent) => {
    const card = document.createElement("article");
    card.className =
      "bg-white border border-gray-200 shadow-sm transition-all duration-200";
    const button = document.createElement("button");
    button.type = "button";
    button.className =
      "w-full text-left p-5 sm:p-6 flex justify-between items-center focus:outline-none";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", `faq-answer-${index}`);
    const question = document.createElement("span");
    question.className =
      "font-sans font-semibold text-sobhaNavy text-base sm:text-lg leading-snug";
    question.textContent = item.question;
    const icon = document.createElement("span");
    icon.id = `faq-icon-${index}`;
    icon.className =
      "text-sobhaGold font-bold text-xl transition-transform duration-300";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "+";
    button.append(question, icon);
    button.addEventListener("click", () => toggleFaq(index));
    const answer = document.createElement("div");
    answer.id = `faq-answer-${index}`;
    answer.className =
      "hidden px-5 sm:px-6 pb-5 sm:pb-6 text-gray-600 text-xs sm:text-sm leading-relaxed border-t border-gray-100 pt-4";
    answer.textContent = item.answer;
    card.append(button, answer);
    parent.append(card);
  };

  entries.forEach((item, index) => {
    const columnIndex = useTwoColumns ? index % columns.length : 0;
    renderCard(item, index, columns[columnIndex]);
  });
}
function toggleFaq(id) {
  const answer = document.getElementById(`faq-answer-${id}`);
  const button = document.querySelector(`[aria-controls="faq-answer-${id}"]`);
  if (!answer || !button) return;
  const opening = answer.classList.contains("hidden");
  answer.classList.toggle("hidden", !opening);
  button.closest("article")?.classList.toggle("faq-open", opening);
  button.setAttribute("aria-expanded", String(opening));
  const icon = document.getElementById(`faq-icon-${id}`);
  if (icon) icon.textContent = opening ? "−" : "+";
}
function loadBuilderData() {
  const builder = (document.body.dataset.builder || "").trim().toLowerCase();
  const errorBox = document.getElementById("projectsContainer");
  if (!/^[a-z0-9_-]+$/.test(builder)) {
    if (errorBox)
      errorBox.innerHTML =
        '<p class="col-span-full text-center text-red-700">Set a valid builder name in the body data-builder attribute.</p>';
    return;
  }

  import(`../data/${builder}.js`)
    .then(({ builderData, builderFaq, popularLocations, builderName }) => {
      if (!Array.isArray(builderData)) {
        if (errorBox)
          errorBox.innerHTML = `<p class="col-span-full text-center text-red-700">data/${builder}.js must export builderData as an array.</p>`;
        return;
      }
      projectsData = builderData;
      const displayedBuilderName =
        builderName ||
        builder
          .replace(/[-_]+/g, " ")
          .replace(/\b\w/g, (character) => character.toUpperCase());
      document.querySelectorAll("[data-builder-name]").forEach((element) => {
        element.textContent = displayedBuilderName;
      });
      const footerPropertyCount = document.getElementById(
        "footerPropertyCount",
      );
      if (footerPropertyCount)
        footerPropertyCount.textContent = String(builderData.length);
      renderProjectsCatalog();
      renderEnquiryProjectOptions();
      renderBuilderFaq(builderFaq);
      renderPopularLocations(popularLocations);
      restoreRoute();
      initDetailSubnav();
    })
    .catch(() => {
      document.body.removeAttribute("data-property-route-loading");
      if (errorBox)
        errorBox.innerHTML = `<p class="col-span-full text-center text-red-700">Could not load data/${builder}.js.</p>`;
    });
}

if (document.readyState === "loading")
  document.addEventListener("DOMContentLoaded", loadBuilderData);
else loadBuilderData();

window.addEventListener("resize", updateProjectCarouselArrows);
window.addEventListener("popstate", () => restoreRoute());
document
  .getElementById("projectsContainer")
  ?.addEventListener("scroll", updateProjectCarouselArrows, { passive: true });

setActiveNavigationItem(
  routeSections[
    decodeURIComponent(window.location.pathname).replace(/\/$/, "") || "/"
  ] || "hero",
);

document.addEventListener("click", (event) => {
  if (event.target.closest("#mobileNavigation a")) closeMobileNavigation();
  const toggle = document.getElementById("formProjectToggle");
  const menu = document.getElementById("formProjectMenu");
  if (toggle && menu && !event.target.closest(".project-picker")) {
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }
  const unitToggle = document.getElementById("sidebarUnitToggle");
  const unitMenu = document.getElementById("sidebarUnitMenu");
  if (unitToggle && unitMenu && !event.target.closest("#sidebarUnitPicker")) {
    unitMenu.hidden = true;
    unitToggle.setAttribute("aria-expanded", "false");
  }
});

document
  .getElementById("formProjectToggle")
  ?.addEventListener("click", (event) => {
    const menu = document.getElementById("formProjectMenu");
    const opening = menu.hidden;
    menu.hidden = !opening;
    event.currentTarget.setAttribute("aria-expanded", String(opening));
    if (opening) menu.querySelector('[aria-selected="true"]')?.focus();
  });
document
  .getElementById("formProjectToggle")
  ?.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.getElementById("formProjectMenu").hidden = true;
      event.currentTarget.setAttribute("aria-expanded", "false");
    }
  });
document
  .getElementById("sidebarUnitToggle")
  ?.addEventListener("click", (event) => {
    const menu = document.getElementById("sidebarUnitMenu");
    const opening = menu.hidden;
    menu.hidden = !opening;
    event.currentTarget.setAttribute("aria-expanded", String(opening));
    if (opening) menu.querySelector('[aria-selected="true"]')?.focus();
  });
document
  .getElementById("sidebarUnitToggle")
  ?.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.getElementById("sidebarUnitMenu").hidden = true;
      event.currentTarget.setAttribute("aria-expanded", "false");
    }
  });
document.querySelector("#enquiry form")?.addEventListener("reset", () => {
  const value = document.getElementById("formProjectValue");
  const menu = document.getElementById("formProjectMenu");
  const toggle = document.getElementById("formProjectToggle");
  if (value) value.textContent = "All / General Query";
  if (menu) {
    menu.hidden = true;
    menu
      .querySelectorAll('[role="option"]')
      .forEach((item, index) =>
        item.setAttribute("aria-selected", String(index === 0)),
      );
  }
  toggle?.setAttribute("aria-expanded", "false");
});
document.querySelector("#detailView form")?.addEventListener("reset", () => {
  const menu = document.getElementById("sidebarUnitMenu");
  const field = document.getElementById("sidebarUnitSelect");
  const value = document.getElementById("sidebarUnitValue");
  const toggle = document.getElementById("sidebarUnitToggle");
  const firstOption = menu?.querySelector('[role="option"]');
  if (field) field.value = firstOption?.textContent || "";
  if (value)
    value.textContent = firstOption?.textContent || "No unit types available";
  menu
    ?.querySelectorAll('[role="option"]')
    .forEach((item, index) =>
      item.setAttribute("aria-selected", String(index === 0)),
    );
  if (menu) menu.hidden = true;
  toggle?.setAttribute("aria-expanded", "false");
});


let subnavRafId = null;
let isProgrammaticScroll = false;
let programmaticScrollTimer = null;

function onWindowScrollForSubnav() {
  if (subnavRafId) return;
  subnavRafId = requestAnimationFrame(() => {
    subnavRafId = null;
    handleSubnavScrollspy();
  });
}

function handleSubnavScrollspy() {
  const detailView = document.getElementById("detailView");
  const subnavBar = document.getElementById("detailSubnavBar");
  if (!detailView || !subnavBar) return;

  if (detailView.classList.contains("hidden") || detailView.offsetParent === null) {
    subnavBar.classList.remove("is-visible");
    return;
  }

  // Reveal threshold: reveal subnavbar when scrolled down past hero banner (~320px)
  const heroSection = detailView.querySelector("section.bg-sobhaNavy");
  const heroBottom = heroSection ? (heroSection.getBoundingClientRect().bottom + window.scrollY - 100) : 320;
  const isPastHero = window.scrollY > heroBottom;
  subnavBar.classList.toggle("is-visible", isPastHero);

  if (!isPastHero) {
    const firstTab = document.querySelector('.subnav-tab[data-target="detailOverviewSection"]');
    if (firstTab && !firstTab.classList.contains("active")) {
      setActiveSubnavTab(firstTab);
    }
    return;
  }

  if (isProgrammaticScroll) return;

  const sectionTargets = [
    "detailOverviewSection",
    "detailFloorPlansSection",
    "detailAmenitiesSection",
    "detailConnectivitySection",
    "detailEnquirySidebar"
  ];

  const visibleSections = sectionTargets
    .map(id => document.getElementById(id))
    .filter(el => el && !el.hidden && el.offsetParent !== null);

  if (!visibleSections.length) return;

  const isNearBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60);

  let currentSection = null;
  if (isNearBottom) {
    currentSection = visibleSections[visibleSections.length - 1];
  } else {
    const triggerLine = 150;
    for (let i = 0; i < visibleSections.length; i++) {
      const rect = visibleSections[i].getBoundingClientRect();
      if (rect.top <= triggerLine) {
        currentSection = visibleSections[i];
      } else {
        break;
      }
    }
    if (!currentSection) currentSection = visibleSections[0];
  }

  if (currentSection) {
    const matchingTab = document.querySelector(`.subnav-tab[data-target="${currentSection.id}"]`);
    if (matchingTab && !matchingTab.classList.contains("active")) {
      setActiveSubnavTab(matchingTab);
    }
  }
}

function setActiveSubnavTab(targetTab) {
  if (!targetTab) return;
  const track = document.getElementById("subnavTrack");
  if (!track) return;

  const allTabs = track.querySelectorAll(".subnav-tab");
  allTabs.forEach(tab => {
    const isActive = tab === targetTab;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", isActive ? "true" : "false");
    tab.setAttribute("tabindex", isActive ? "0" : "-1");
  });

  targetTab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  updateSubnavArrows();
}

function updateSubnavArrows() {
  const track = document.getElementById("subnavTrack");
  const leftBtn = document.getElementById("subnavArrowLeft");
  const rightBtn = document.getElementById("subnavArrowRight");
  if (!track || !leftBtn || !rightBtn) return;

  const maxScroll = track.scrollWidth - track.clientWidth;
  const hasOverflow = maxScroll > 8;

  if (!hasOverflow) {
    leftBtn.style.display = "none";
    rightBtn.style.display = "none";
    return;
  }

  const canScrollLeft = track.scrollLeft > 5;
  const canScrollRight = track.scrollLeft < maxScroll - 5;

  leftBtn.style.display = canScrollLeft ? "inline-flex" : "none";
  leftBtn.disabled = !canScrollLeft;

  rightBtn.style.display = canScrollRight ? "inline-flex" : "none";
  rightBtn.disabled = !canScrollRight;
}

function initDetailSubnav() {
  const subnavBar = document.getElementById("detailSubnavBar");
  const subnavTrack = document.getElementById("subnavTrack");
  const subnavArrowLeft = document.getElementById("subnavArrowLeft");
  const subnavArrowRight = document.getElementById("subnavArrowRight");
  if (!subnavBar || !subnavTrack) return;

  subnavTrack.addEventListener("click", event => {
    const tab = event.target.closest(".subnav-tab");
    if (!tab) return;
    const targetId = tab.dataset.target;
    if (!targetId) return;
    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    event.preventDefault();
    isProgrammaticScroll = true;
    clearTimeout(programmaticScrollTimer);
    programmaticScrollTimer = setTimeout(() => {
      isProgrammaticScroll = false;
    }, 850);

    setActiveSubnavTab(tab);
    window.smoothScrollTo(targetId);
  });

  if (subnavArrowLeft) {
    subnavArrowLeft.addEventListener("click", () => {
      subnavTrack.scrollBy({ left: -140, behavior: "smooth" });
    });
  }
  if (subnavArrowRight) {
    subnavArrowRight.addEventListener("click", () => {
      subnavTrack.scrollBy({ left: 140, behavior: "smooth" });
    });
  }

  subnavTrack.addEventListener("scroll", updateSubnavArrows, { passive: true });
  window.addEventListener("scroll", onWindowScrollForSubnav, { passive: true });
  window.addEventListener("resize", () => {
    updateSubnavArrows();
    onWindowScrollForSubnav();
  }, { passive: true });
}

window.smoothScrollTo = function(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const header = document.querySelector("header");
  const subnav = document.getElementById("detailSubnavBar");
  const headerHeight = header ? header.offsetHeight : 64;
  const subnavHeight = (subnav && subnav.classList.contains("is-visible")) ? subnav.offsetHeight : 48;
  const totalOffset = headerHeight + subnavHeight + 16;
  const elementPosition = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({
    top: Math.max(0, elementPosition - totalOffset),
    behavior: "smooth"
  });
};

window.openPropertyDetail = openPropertyDetail;
window.selectFloorPlan = selectFloorPlan;
window.showCatalogView = showCatalogView;
window.setGalleryImage = setGalleryImage;
window.scrollProjects = scrollProjects;
window.navigateToSection = navigateToSection;
window.toggleMobileNavigation = toggleMobileNavigation;
window.closeMobileNavigation = closeMobileNavigation;
window.triggerEnquiryScroll = triggerEnquiryScroll;
window.filterProjects = filterProjects;
window.applyFilters = applyFilters;
window.filterBySearch = filterBySearch;
window.quickSearch = quickSearch;
window.handleHeroSearch = handleHeroSearch;
window.resetFilters = resetFilters;
window.toggleFaq = toggleFaq;
