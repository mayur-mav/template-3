
function updatePageMetadata(title, description) {
  if (title) document.title = title;
  if (description) {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }
}
if (typeof window !== "undefined" && "scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}


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


/* ==================== PROJECT HIGHLIGHTS ==================== */
function getHighlightIcon(text, defaultIcon = "fa-solid fa-circle-check") {
  if (!text || typeof text !== "string") return defaultIcon;
  const lower = text.toLowerCase();
  if (lower.includes("rera") || lower.includes("approv") || lower.includes("certif") || lower.includes("legal") || lower.includes("bda") || lower.includes("bbmp")) return "fa-solid fa-certificate";
  if (lower.includes("wall") || lower.includes("privacy") || lower.includes("security") || lower.includes("gated")) return "fa-solid fa-shield-halved";
  if (lower.includes("road") || lower.includes("location") || lower.includes("connect") || lower.includes("metro") || lower.includes("highway") || lower.includes("expressway") || lower.includes("airport") || lower.includes("tech park")) return "fa-solid fa-location-dot";
  if (lower.includes("acre") || lower.includes("land") || lower.includes("garden") || lower.includes("open space") || lower.includes("landscape") || /\bpark\b/.test(lower) || lower.includes("green")) return "fa-solid fa-tree";
  if (lower.includes("pool") || lower.includes("swim")) return "fa-solid fa-person-swimming";
  if (lower.includes("gym") || lower.includes("fit") || lower.includes("sport") || lower.includes("court") || lower.includes("jog")) return "fa-solid fa-dumbbell";
  if (lower.includes("club") || lower.includes("amenit") || lower.includes("lifestyle") || lower.includes("hall")) return "fa-solid fa-hotel";
  if (lower.includes("bhk") || lower.includes("config") || lower.includes("plot") || lower.includes("villa") || lower.includes("flat") || lower.includes("layout")) return "fa-solid fa-layer-group";
  if (lower.includes("possess") || lower.includes("timeline") || lower.includes("launch") || lower.includes("date") || lower.includes("schedul")) return "fa-solid fa-calendar-check";
  return defaultIcon;
}

function generatePropertyHighlights(property) {
  if (Array.isArray(property.highlights) && property.highlights.length > 0) {
    return property.highlights.map(h => {
      if (typeof h === "string") {
        return {
          icon: getHighlightIcon(h),
          title: "Key Feature",
          text: h
        };
      }
      return {
        icon: h.icon || getHighlightIcon(`${h.title || ""} ${h.text || ""}`),
        title: h.title || "Key Feature",
        text: h.text || h.description || ""
      };
    });
  }

  const items = [];

  // 1. RERA
  if (property.reraId) {
    items.push({
      icon: "fa-solid fa-certificate",
      title: "RERA Registered",
      text: `Officially registered with Karnataka RERA: ${property.reraId}. Fully approved with clear titles.`
    });
  }

  // 2. Land Area / Master Plan
  if (property.specs?.landArea) {
    items.push({
      icon: "fa-solid fa-tree",
      title: "Master Land Parcel",
      text: `Sprawling across ${property.specs.landArea} with open landscaped green spaces and recreational avenues.`
    });
  }

  // 3. Configurations
  if (property.specs?.config) {
    items.push({
      icon: "fa-solid fa-layer-group",
      title: "Curated Typologies",
      text: `Thoughtfully planned ${property.specs.config} homes with expansive floor plans and cross-ventilation.`
    });
  }

  // 4. Possession Timeline
  if (property.specs?.possession) {
    items.push({
      icon: "fa-solid fa-calendar-check",
      title: "Handover Timeline",
      text: `Possession scheduled for ${property.specs.possession} with structured milestone-linked construction.`
    });
  }

  // 5. Exclusive Amenities
  const firstAmenity = property.amenities?.[0];
  const amenityName = typeof firstAmenity === "string" ? firstAmenity : firstAmenity?.name;
  if (amenityName) {
    items.push({
      icon: "fa-solid fa-hotel",
      title: "World-Class Living",
      text: `Includes ${amenityName} alongside wellness zones, children's play areas, and sports facilities.`
    });
  }

  // 6. Strategic Location
  const firstConn = property.connectivity?.[0];
  const connLabel = typeof firstConn === "string" ? firstConn : firstConn?.label;
  if (connLabel) {
    items.push({
      icon: "fa-solid fa-location-dot",
      title: "Strategic Corridor",
      text: `Convenient proximity to ${connLabel} with seamless connectivity across major IT & economic hubs.`
    });
  }

  return items;
}

function renderPropertyHighlights(property) {
  const container = document.getElementById("detailHighlights");
  if (!container) return;
  const highlights = generatePropertyHighlights(property);
  container.replaceChildren();

  highlights.forEach(h => {
    const card = document.createElement("div");
    card.className = "highlight-card";

    const iconWrap = document.createElement("div");
    iconWrap.className = "highlight-icon-wrap";
    const icon = document.createElement("i");
    icon.className = h.icon || "fa-solid fa-circle-check";
    icon.setAttribute("aria-hidden", "true");
    iconWrap.appendChild(icon);

    const textWrap = document.createElement("div");
    textWrap.className = "highlight-text-wrap";

    const title = document.createElement("strong");
    title.className = "highlight-title";
    title.textContent = h.title;

    const text = document.createElement("span");
    text.className = "highlight-text";
    text.textContent = h.text;

    textWrap.append(title, text);
    card.append(iconWrap, textWrap);
    container.appendChild(card);
  });
}

/* ==================== HOME LOAN EMI CALCULATOR ==================== */
let emiBasePrice = 10100000;
let emiCurrentPropertyName = "Assetz City of Palms";
let emiUserModifiedPrice = false;

function parseIndianPrice(priceStr) {
  if (!priceStr || typeof priceStr !== "string") return null;
  const clean = priceStr.replace(/,/g, "").trim();
  const crMatch = clean.match(/([\d.]+)\s*(?:cr|crore)/i);
  if (crMatch) {
    const val = parseFloat(crMatch[1]);
    if (!isNaN(val) && val > 0) return Math.round(val * 10000000);
  }
  const lMatch = clean.match(/([\d.]+)\s*(?:l|lac|lakh)/i);
  if (lMatch) {
    const val = parseFloat(lMatch[1]);
    if (!isNaN(val) && val > 0) return Math.round(val * 100000);
  }
  const numMatch = clean.match(/(\d+)/);
  if (numMatch) {
    const val = parseInt(numMatch[1], 10);
    if (!isNaN(val) && val > 0) return val;
  }
  return null;
}

function formatINR(val) {
  if (isNaN(val) || val === null || val === undefined) return "₹0";
  return "₹" + Math.round(val).toLocaleString("en-IN");
}

function formatINRShort(val) {
  if (isNaN(val) || val <= 0) return "₹0";
  if (val >= 10000000) {
    const cr = (val / 10000000).toFixed(2).replace(/\.00$/, "").replace(/(\.[1-9])0$/, "$1");
    return `₹${cr} Cr`;
  }
  if (val >= 100000) {
    const l = (val / 100000).toFixed(2).replace(/\.00$/, "").replace(/(\.[1-9])0$/, "$1");
    return `₹${l} L`;
  }
  return "₹" + Math.round(val).toLocaleString("en-IN");
}

function calculateEmi(principal, annualRate, tenureYears) {
  if (principal <= 0 || tenureYears <= 0) {
    return { emi: 0, totalPayment: 0, totalInterest: 0, principalPct: 50, interestPct: 50 };
  }
  const r = (annualRate / 12) / 100;
  const n = tenureYears * 12;
  if (r === 0) {
    const emi = Math.round(principal / n);
    return { emi, totalPayment: principal, totalInterest: 0, principalPct: 100, interestPct: 0 };
  }
  const factor = Math.pow(1 + r, n);
  const emi = Math.round(principal * r * (factor / (factor - 1)));
  const totalPayment = emi * n;
  const totalInterest = Math.max(0, totalPayment - principal);
  const principalPct = totalPayment > 0 ? (principal / totalPayment) * 100 : 50;
  const interestPct = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 50;
  return { emi, totalPayment, totalInterest, principalPct, interestPct };
}

function getPropertySliderLimits(price) {
  if (!price || price <= 0) return { min: 2500000, max: 250000000, step: 100000 };
  let min, max, step;
  if (price < 15000000) {
    min = Math.max(2500000, Math.floor((price * 0.4) / 500000) * 500000);
    max = Math.ceil((price * 2.5) / 2500000) * 2500000;
    step = 100000;
  } else if (price < 50000000) {
    min = Math.floor((price * 0.4) / 1000000) * 1000000;
    max = Math.ceil((price * 2.2) / 5000000) * 5000000;
    step = 100000;
  } else {
    min = Math.floor((price * 0.4) / 2500000) * 2500000;
    max = Math.ceil((price * 2.0) / 10000000) * 10000000;
    step = 500000;
  }
  return { min, max, step };
}

function updateSliderTrack(slider) {
  if (!slider) return;
  const min = parseFloat(slider.min) || 0;
  const max = parseFloat(slider.max) || 100;
  const val = parseFloat(slider.value) || 0;
  const percentage = Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));
  slider.style.background = `linear-gradient(to right, #C5A059 0%, #C5A059 ${percentage}%, #E2E8F0 ${percentage}%, #E2E8F0 100%)`;
}

function updateEmiCalculator() {
  const propSlider = document.getElementById("emiPropSlider");
  const downSlider = document.getElementById("emiDownSlider");
  const tenureSlider = document.getElementById("emiTenureSlider");
  const rateSlider = document.getElementById("emiRateSlider");
  if (!propSlider || !downSlider || !tenureSlider || !rateSlider) return;

  const propVal = parseFloat(propSlider.value) || 0;
  const downPct = parseFloat(downSlider.value) || 20;
  const tenureYears = parseInt(tenureSlider.value, 10) || 20;
  const rate = parseFloat(rateSlider.value) || 8.5;

  const downPaymentAmt = Math.round(propVal * (downPct / 100));
  const loanAmount = Math.max(0, propVal - downPaymentAmt);
  const result = calculateEmi(loanAmount, rate, tenureYears);

  // Property value displays
  const propDisplay = document.getElementById("emiPropDisplay");
  const propSub = document.getElementById("emiPropSub");
  if (propDisplay) propDisplay.textContent = formatINR(propVal);
  if (propSub) propSub.textContent = `(${formatINRShort(propVal)})`;

  // Down payment displays
  const downPctDisplay = document.getElementById("emiDownPctDisplay");
  const downAmountDisplay = document.getElementById("emiDownAmountDisplay");
  const loanAmountDisplay = document.getElementById("emiLoanAmount");
  if (downPctDisplay) downPctDisplay.textContent = `${Math.round(downPct)}%`;
  if (downAmountDisplay) downAmountDisplay.textContent = formatINR(downPaymentAmt);
  if (loanAmountDisplay) loanAmountDisplay.textContent = formatINR(loanAmount);

  // Tenure displays
  const tenureDisplay = document.getElementById("emiTenureDisplay");
  const tenureMonths = document.getElementById("emiTenureMonths");
  if (tenureDisplay) tenureDisplay.textContent = `${tenureYears} Years`;
  if (tenureMonths) tenureMonths.textContent = `(${tenureYears * 12} Months)`;

  // Rate displays
  const rateDisplay = document.getElementById("emiRateDisplay");
  if (rateDisplay) rateDisplay.textContent = `${rate.toFixed(2)}%`;

  // Results: Hero Card
  const monthlyOutput = document.getElementById("emiMonthlyOutput");
  const heroFootnote = document.getElementById("emiHeroFootnote");
  if (monthlyOutput) { monthlyOutput.textContent = formatINR(result.emi); monthlyOutput.style.color = "#FFFFFF"; }
  if (heroFootnote) { heroFootnote.textContent = `*For ${formatINRShort(loanAmount)} loan at ${rate.toFixed(2)}% for ${tenureYears} yrs`; heroFootnote.style.color = "#FFFFFF"; }

  // SVG Donut Chart (Circumference = 2 * PI * 38 = 238.761)
  const C = 238.761;
  const principalLength = Math.max(0, Math.min(C, (result.principalPct / 100) * C));
  const interestLength = Math.max(0, C - principalLength);

  const donutPrincipal = document.getElementById("emiDonutPrincipal");
  const donutInterest = document.getElementById("emiDonutInterest");
  if (donutPrincipal) {
    donutPrincipal.setAttribute("stroke-dasharray", `${principalLength.toFixed(2)} ${C.toFixed(2)}`);
    donutPrincipal.setAttribute("stroke-dashoffset", "0");
  }
  if (donutInterest) {
    donutInterest.setAttribute("stroke-dasharray", `${interestLength.toFixed(2)} ${C.toFixed(2)}`);
    donutInterest.setAttribute("stroke-dashoffset", `-${principalLength.toFixed(2)}`);
  }

  // Center total
  const centerVal = document.getElementById("emiDonutCenterVal");
  if (centerVal) centerVal.textContent = formatINRShort(result.totalPayment);

  // Legend
  const legPrincipalVal = document.getElementById("emiLegendPrincipalVal");
  const legPrincipalPct = document.getElementById("emiLegendPrincipalPct");
  const legInterestVal = document.getElementById("emiLegendInterestVal");
  const legInterestPct = document.getElementById("emiLegendInterestPct");
  if (legPrincipalVal) legPrincipalVal.textContent = formatINR(loanAmount);
  if (legPrincipalPct) legPrincipalPct.textContent = `(${Math.round(result.principalPct)}%)`;
  if (legInterestVal) legInterestVal.textContent = formatINR(result.totalInterest);
  if (legInterestPct) legInterestPct.textContent = `(${Math.round(result.interestPct)}%)`;

  // Breakdown table
  const tableDown = document.getElementById("emiTableDown");
  const tableDownPct = document.getElementById("emiTableDownPct");
  const tablePrincipal = document.getElementById("emiTablePrincipal");
  const tableInterest = document.getElementById("emiTableInterest");
  const tableTotal = document.getElementById("emiTableTotal");
  if (tableDown) tableDown.textContent = formatINR(downPaymentAmt);
  if (tableDownPct) tableDownPct.textContent = `(${Math.round(downPct)}%)`;
  if (tablePrincipal) tablePrincipal.textContent = formatINR(loanAmount);
  if (tableInterest) tableInterest.textContent = formatINR(result.totalInterest);
  const totalAmountPayable = downPaymentAmt + result.totalPayment;
  if (tableTotal) tableTotal.textContent = formatINR(totalAmountPayable);

  // Update slider tracks
  updateSliderTrack(propSlider);
  updateSliderTrack(downSlider);
  updateSliderTrack(tenureSlider);
  updateSliderTrack(rateSlider);
}

function initEmiCalculator() {
  const calcSection = document.getElementById("detailEmiSection");
  if (!calcSection) return;

  const propSlider = document.getElementById("emiPropSlider");
  const downSlider = document.getElementById("emiDownSlider");
  const tenureSlider = document.getElementById("emiTenureSlider");
  const rateSlider = document.getElementById("emiRateSlider");
  const resetBtn = document.getElementById("emiResetPriceBtn");

  if (propSlider) {
    propSlider.addEventListener("input", () => {
      emiUserModifiedPrice = true;
      const syncLabel = document.getElementById("emiSyncProperty");
      if (syncLabel) {
        syncLabel.textContent = `${emiCurrentPropertyName} (Custom Value)`;
      }
      updateEmiCalculator();
    });
  }

  if (downSlider) {
    downSlider.addEventListener("input", updateEmiCalculator);
  }

  if (tenureSlider) {
    tenureSlider.addEventListener("input", () => {
      const years = parseInt(tenureSlider.value, 10);
      document.querySelectorAll(".emi-chip").forEach((chip) => {
        chip.classList.toggle("active", parseInt(chip.dataset.years, 10) === years);
      });
      updateEmiCalculator();
    });
  }

  if (rateSlider) {
    rateSlider.addEventListener("input", updateEmiCalculator);
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      emiUserModifiedPrice = false;
      if (propSlider) {
        const limits = getPropertySliderLimits(emiBasePrice);
        propSlider.min = String(limits.min);
        propSlider.max = String(limits.max);
        propSlider.step = String(limits.step);
        propSlider.value = String(emiBasePrice);

        const minLbl = document.getElementById("emiPropMinLbl");
        const maxLbl = document.getElementById("emiPropMaxLbl");
        if (minLbl) minLbl.textContent = formatINRShort(limits.min);
        if (maxLbl) maxLbl.textContent = formatINRShort(limits.max);
      }
      const syncLabel = document.getElementById("emiSyncProperty");
      if (syncLabel) {
        syncLabel.textContent = emiCurrentPropertyName;
      }
      updateEmiCalculator();
    });
  }

  document.querySelectorAll(".emi-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".emi-chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const years = parseInt(chip.dataset.years, 10);
      if (tenureSlider) {
        tenureSlider.value = String(years);
      }
      updateEmiCalculator();
    });
  });

  updateEmiCalculator();
}

function syncEmiCalculatorWithProperty(property) {
  if (!property) return;
  emiCurrentPropertyName = property.title || property.name;
  const parsed = parseIndianPrice(property.price);
  if (parsed) {
    emiBasePrice = parsed;
  }
  emiUserModifiedPrice = false;

  const propSlider = document.getElementById("emiPropSlider");
  if (propSlider && parsed) {
    const limits = getPropertySliderLimits(parsed);
    propSlider.min = String(limits.min);
    propSlider.max = String(limits.max);
    propSlider.step = String(limits.step);
    propSlider.value = String(parsed);

    const minLbl = document.getElementById("emiPropMinLbl");
    const maxLbl = document.getElementById("emiPropMaxLbl");
    if (minLbl) minLbl.textContent = formatINRShort(limits.min);
    if (maxLbl) maxLbl.textContent = formatINRShort(limits.max);
  }

  const syncLabel = document.getElementById("emiSyncProperty");
  if (syncLabel) {
    syncLabel.textContent = emiCurrentPropertyName;
  }

  updateEmiCalculator();
}

function syncEmiCalculatorWithFloorPlan(fp) {
  if (!fp || emiUserModifiedPrice) return;
  const parsed = parseIndianPrice(fp.price);
  if (parsed) {
    emiBasePrice = parsed;
    const propSlider = document.getElementById("emiPropSlider");
    if (propSlider) {
      const limits = getPropertySliderLimits(parsed);
      propSlider.min = String(limits.min);
      propSlider.max = String(limits.max);
      propSlider.step = String(limits.step);
      propSlider.value = String(parsed);

      const minLbl = document.getElementById("emiPropMinLbl");
      const maxLbl = document.getElementById("emiPropMaxLbl");
      if (minLbl) minLbl.textContent = formatINRShort(limits.min);
      if (maxLbl) maxLbl.textContent = formatINRShort(limits.max);
    }
    const syncLabel = document.getElementById("emiSyncProperty");
    if (syncLabel) {
      syncLabel.textContent = `${emiCurrentPropertyName} (${fp.type})`;
    }
    updateEmiCalculator();
  }
}

/* ==================== PROJECT COMPARISON ==================== */
function getSimilarProjects(item) {
  if (!Array.isArray(projectsData)) return [];
  const others = projectsData.filter((candidate) => candidate.id !== item.id);
  return others
    .map((candidate) => {
      let score = 0;
      if (candidate.category === item.category) score += 3;
      if (candidate.badge === item.badge) score += 2;
      const itemLoc = (item.searchLocation || item.location || "").toLowerCase();
      const candLoc = (candidate.searchLocation || candidate.location || "").toLowerCase();
      const itemWords = itemLoc.split(/\s+/).filter(w => w.length > 3);
      itemWords.forEach(w => {
        if (candLoc.includes(w)) score += 1;
      });
      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map(({ candidate }) => candidate);
}

function renderProjectComparison(item) {
  const container = document.getElementById("detailComparisonGrid");
  if (!container) return;
  const similar = getSimilarProjects(item);
  const projects = [item, ...similar];
  container.replaceChildren();

  projects.forEach((project, index) => {
    const projectCard = document.createElement("article");
    projectCard.className = `project-comparison-card${index === 0 ? " is-current" : ""}`;

    const card = document.createElement("div");
    card.className = "comparison-project-card";

    const imageWrap = document.createElement("div");
    imageWrap.className = "comparison-project-image-wrap";
    const image = document.createElement("img");
    image.className = "comparison-project-image";
    image.src = project.mainImg || project.thumbnail || (project.gallery && project.gallery[0]) || "";
    image.alt = `${project.title} project`;
    image.loading = "lazy";
    image.decoding = "async";
    imageWrap.appendChild(image);

    if (index === 0) {
      const currentLabel = document.createElement("span");
      currentLabel.className = "comparison-current-label";
      currentLabel.style.cssText = "background:#143C47 !important; color:#FFFFFF !important; border:1px solid #C5A059 !important; font-weight:800 !important;";
      currentLabel.textContent = "Current Project";
      imageWrap.appendChild(currentLabel);
    }
    card.appendChild(imageWrap);

    const name = document.createElement("div");
    name.className = "comparison-project-name";
    const projectName = document.createElement("span");
    projectName.textContent = project.title;
    const location = document.createElement("span");
    location.className = "comparison-project-location";
    location.textContent = project.location;
    name.append(projectName, location);
    card.appendChild(name);

    const projectAction = document.createElement("button");
    projectAction.type = "button";
    projectAction.className = `comparison-project-link${index !== 0 ? " btn-outline" : ""}`;
    if (index === 0) {
      projectAction.innerHTML = '<i class="fa-solid fa-phone" aria-hidden="true"></i> Enquire Now';
      projectAction.setAttribute("aria-label", `Enquire about ${project.title}`);
      projectAction.onclick = () => triggerEnquiryScroll();
    } else {
      projectAction.innerHTML = '<i class="fa-solid fa-arrow-right" aria-hidden="true"></i> View Details';
      projectAction.setAttribute("aria-label", `View ${project.title} details`);
      projectAction.onclick = () => navigateToComparedProperty(project.id);
    }
    card.appendChild(projectAction);

    const specs = document.createElement("div");
    specs.className = "comparison-project-specs";
    const rows = [
      ["Starting Price", project.price || "On Request"],
      ["Configuration", project.specs?.config || "Luxury Residences"],
      ["Project Area", project.specs?.landArea || "Prime Acres"],
      ["Status", project.badge || "Ongoing"],
      ["Possession", project.specs?.possession || "Coming Soon"]
    ];

    rows.forEach(([label, value]) => {
      const row = document.createElement("div");
      row.className = "comparison-project-spec";
      const specLabel = document.createElement("span");
      specLabel.className = "comparison-project-spec-label";
      specLabel.textContent = label;
      const specValue = document.createElement("span");
      specValue.className = "comparison-project-spec-value";
      specValue.textContent = value;
      row.append(specLabel, specValue);
      specs.appendChild(row);
    });

    card.appendChild(specs);
    projectCard.appendChild(card);
    container.appendChild(projectCard);
  });
}


/* ==================== PROJECT GALLERY LOGIC ==================== */
let projectGalleryImages = [];
let currentGalleryCategory = 'photo';
let currentGalleryIndex = 0;
let projectGalleryTrigger = null;

function getProjectGalleryImages(item) {
  if (!item) return [];
  const galleryImages = (item.gallery || item.images || [])
    .filter(image => typeof image === 'string' && image.trim())
    .map((src, index) => ({ src, alt: `${item.title} project image ${index + 1}`, type: 'photo' }));
  
  const thumbnail = (item.mainImg || item.thumbnail) && !galleryImages.some(image => image.src === (item.mainImg || item.thumbnail))
    ? [{ src: item.mainImg || item.thumbnail, alt: `${item.title} project view`, type: 'photo' }]
    : [];

  const floorPlanImages = (item.floorPlans || [])
    .filter(plan => typeof (plan.img || plan.image) === 'string' && (plan.img || plan.image).trim())
    .map(plan => ({ src: plan.img || plan.image, alt: `${item.title} ${plan.type || plan.bhk} floor plan`, type: 'floor-plan' }));

  return [...thumbnail, ...galleryImages, ...floorPlanImages];
}

function getGalleryCategoryImages(category = currentGalleryCategory) {
  return projectGalleryImages.filter(image => image.type === category);
}

function renderProjectGallerySection(item) {
  const section = document.getElementById('detailGallerySection');
  if (!section) return;
  projectGalleryImages = getProjectGalleryImages(item);
  const preview = projectGalleryImages.find(image => image.type === 'photo') || projectGalleryImages[0];
  const previewImage = document.getElementById('projectGalleryPreviewImage');
  if (previewImage) {
    previewImage.src = preview?.src || '';
    previewImage.alt = preview?.alt || `${item.title} gallery preview`;
  }
  const countEl = document.getElementById('projectGalleryImageCount');
  if (countEl) {
    const photoCount = projectGalleryImages.filter(i => i.type === 'photo').length;
    const fpCount = projectGalleryImages.filter(i => i.type === 'floor-plan').length;
    countEl.textContent = `${photoCount} Photos${fpCount > 0 ? ` & ${fpCount} Plans` : ''}`;
  }
}

function openProjectGallery(trigger) {
  const dialog = document.getElementById('projectGalleryDialog');
  if (!dialog || dialog.open || !projectGalleryImages.length) return;
  projectGalleryTrigger = trigger;
  const titleEl = document.getElementById('projectGalleryTitle');
  if (titleEl) titleEl.textContent = activeProject?.title || 'Project Gallery';
  dialog.showModal();
  const initialCategory = projectGalleryImages.some(image => image.type === 'photo') ? 'photo' : 'floor-plan';
  setProjectGalleryCategory(initialCategory);
  document.getElementById('projectGalleryClose')?.focus();
}

function closeProjectGallery() {
  const dialog = document.getElementById('projectGalleryDialog');
  if (dialog?.open) dialog.close();
}

function setProjectGalleryCategory(category) {
  const selectedCategory = category === 'floor-plan' ? 'floor-plan' : 'photo';
  const images = getGalleryCategoryImages(selectedCategory);
  if (!images.length) return;
  currentGalleryCategory = selectedCategory;
  currentGalleryIndex = 0;
  const dialog = document.getElementById('projectGalleryDialog');
  if (dialog) dialog.classList.toggle('is-floor-plan', selectedCategory === 'floor-plan');

  const projectTab = document.getElementById('projectGalleryProjectTab');
  const floorPlanTab = document.getElementById('projectGalleryFloorPlanTab');
  if (projectTab) projectTab.hidden = !getGalleryCategoryImages('photo').length;
  if (floorPlanTab) floorPlanTab.hidden = !getGalleryCategoryImages('floor-plan').length;
  [projectTab, floorPlanTab].forEach(tab => {
    if (!tab) return;
    const selected = tab.dataset.galleryCategory === selectedCategory;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });

  const thumbnails = document.getElementById('projectGalleryThumbnails');
  if (thumbnails) {
    thumbnails.replaceChildren();
    images.forEach((image, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `project-gallery-thumbnail${selectedCategory === 'floor-plan' ? ' is-floor-plan' : ''}`;
      button.dataset.galleryIndex = String(index);
      button.setAttribute('aria-label', `Show ${image.alt}`);
      button.setAttribute('aria-pressed', String(index === 0));
      const thumbnailImage = document.createElement('img');
      thumbnailImage.src = image.src;
      thumbnailImage.alt = '';
      thumbnailImage.loading = 'lazy';
      thumbnailImage.decoding = 'async';
      button.appendChild(thumbnailImage);
      thumbnails.appendChild(button);
    });
  }

  updateProjectGalleryImage();
}

function selectProjectGalleryImage(index) {
  const images = getGalleryCategoryImages();
  if (!images[index]) return;
  currentGalleryIndex = index;
  updateProjectGalleryImage();
}

function updateProjectGalleryImage() {
  const images = getGalleryCategoryImages();
  const image = images[currentGalleryIndex];
  if (!image) return;
  const currentImage = document.getElementById('projectGalleryCurrentImage');
  if (currentImage) {
    currentImage.src = image.src;
    currentImage.alt = image.alt;
    currentImage.loading = 'eager';
    currentImage.decoding = 'async';
    currentImage.classList.toggle('is-floor-plan', currentGalleryCategory === 'floor-plan');
  }
  const counter = document.getElementById('projectGalleryCounter');
  if (counter) {
    counter.textContent = `${currentGalleryIndex + 1} / ${images.length}`;
  }
  document.querySelectorAll('.project-gallery-thumbnail').forEach((thumbnail, index) => {
    thumbnail.setAttribute('aria-pressed', String(index === currentGalleryIndex));
    if (index === currentGalleryIndex) {
      thumbnail.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
  });
}

function changeProjectGalleryImage(direction) {
  const images = getGalleryCategoryImages();
  if (!images.length) return;
  currentGalleryIndex = (currentGalleryIndex + direction + images.length) % images.length;
  updateProjectGalleryImage();
}

function initProjectGalleryListeners() {
  document.getElementById('projectGalleryPreview')?.addEventListener('click', event => openProjectGallery(event.currentTarget));
  document.getElementById('projectGalleryClose')?.addEventListener('click', closeProjectGallery);
  document.getElementById('projectGalleryDialog')?.addEventListener('click', event => {
    if (event.target === event.currentTarget) closeProjectGallery();
  });
  document.querySelectorAll('.project-gallery-tab').forEach(tab => {
    tab.addEventListener('click', () => setProjectGalleryCategory(tab.dataset.galleryCategory));
  });
  document.getElementById('projectGalleryThumbnails')?.addEventListener('click', event => {
    const thumbnail = event.target.closest('[data-gallery-index]');
    if (thumbnail) selectProjectGalleryImage(Number(thumbnail.dataset.galleryIndex));
  });
  document.getElementById('projectGalleryPrevious')?.addEventListener('click', () => changeProjectGalleryImage(-1));
  document.getElementById('projectGalleryNext')?.addEventListener('click', () => changeProjectGalleryImage(1));
  document.addEventListener('keydown', event => {
    const dialog = document.getElementById('projectGalleryDialog');
    if (!dialog?.open) return;
    if (event.key === 'Escape') closeProjectGallery();
    if (event.key === 'ArrowLeft') changeProjectGalleryImage(-1);
    if (event.key === 'ArrowRight') changeProjectGalleryImage(1);
  });
}

/* ==================== STRATEGIC CONNECTIVITY & LEAFLET MAP LOGIC ==================== */
let connectivityLeafletMap = null;
let connectivityPreviewMap = null;
let connectivityOriginMarker = null;
let connectivityPreviewMarker = null;
let connectivityRouteLayer = null;
let connectivityMapPropertyId = null;
let connectivityMapPlaces = [];
const connectivityRouteCache = new Map();
let connectivityRouteController = null;
let connectivityRouteRequestId = 0;
let connectivitySearchTimer = null;

function ensureCoordinates(item) {
  if (item?.coordinates?.lat && item?.coordinates?.lon) {
    return item.coordinates;
  }
  return { lat: 13.0, lon: 77.6 };
}

function getConnectivityDestination(place) {
  if (!place) return '';
  return place.destination || `${place.label}, Bengaluru, Karnataka`;
}

function getConnectivityDirectionsUrl(item, place) {
  const url = new URL('https://www.google.com/maps/dir/');
  url.searchParams.set('api', '1');
  const coords = ensureCoordinates(item);
  const origin = item.mapsQuery || `${coords.lat},${coords.lon}`;
  url.searchParams.set('origin', origin);
  url.searchParams.set('destination', getConnectivityDestination(place));
  url.searchParams.set('travelmode', 'driving');
  return url.href;
}

function initializeConnectivityPreview(item) {
  if (!window.L || !item) return;
  const previewElement = document.getElementById('connectivity-map-preview-canvas');
  if (!previewElement) return;
  const coords = ensureCoordinates(item);

  if (!connectivityPreviewMap) {
    connectivityPreviewMap = window.L.map(previewElement, {
      attributionControl: true,
      boxZoom: false,
      dragging: false,
      doubleClickZoom: false,
      keyboard: false,
      scrollWheelZoom: false,
      touchZoom: false,
      zoomControl: false
    }).setView([coords.lat, coords.lon], 13);
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(connectivityPreviewMap);
  } else {
    connectivityPreviewMap.setView([coords.lat, coords.lon], 13);
    connectivityPreviewMarker?.remove();
  }

  connectivityPreviewMarker = window.L.circleMarker([coords.lat, coords.lon], {
    radius: 9,
    color: '#FFFFFF',
    weight: 3,
    fillColor: '#143C47',
    fillOpacity: 1
  }).addTo(connectivityPreviewMap);
  connectivityPreviewMarker.bindTooltip(item.title);
  requestAnimationFrame(() => connectivityPreviewMap?.invalidateSize());
}

function initializeConnectivityMap(item) {
  const status = document.getElementById('connectivity-map-route-status');
  if (!window.L) {
    if (status) status.textContent = 'The interactive map could not be loaded. Use Google Maps directions instead.';
    return false;
  }

  const mapElement = document.getElementById('connectivity-map-canvas');
  if (!mapElement) return false;
  const coords = ensureCoordinates(item);

  const propertyPlaces = [
    [coords.lat, coords.lon],
    ...connectivityMapPlaces
      .map(place => place.coordinates ? [place.coordinates.lat, place.coordinates.lon] : null)
      .filter(Boolean)
  ];
  const projectBounds = window.L.latLngBounds(propertyPlaces.length > 1 ? propertyPlaces : [[coords.lat, coords.lon]]);

  if (!connectivityLeafletMap) {
    connectivityLeafletMap = window.L.map(mapElement, { scrollWheelZoom: false }).fitBounds(
      projectBounds,
      { padding: [30, 30], maxZoom: 14 }
    );
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a> | Routing: <a href="https://project-osrm.org/" target="_blank" rel="noopener noreferrer">OSRM</a>'
    }).addTo(connectivityLeafletMap);
    connectivityRouteLayer = window.L.layerGroup().addTo(connectivityLeafletMap);
  } else if (connectivityMapPropertyId !== item.id) {
    connectivityRouteLayer.clearLayers();
    connectivityOriginMarker?.remove();
    connectivityLeafletMap.fitBounds(projectBounds, { padding: [30, 30], maxZoom: 14 });
  }

  if (connectivityMapPropertyId !== item.id || !connectivityOriginMarker) {
    connectivityOriginMarker = window.L.circleMarker([coords.lat, coords.lon], {
      radius: 9,
      color: '#FFFFFF',
      weight: 3,
      fillColor: '#143C47',
      fillOpacity: 1
    }).addTo(connectivityLeafletMap);
    connectivityOriginMarker.bindTooltip(`${item.title} (Property)`);
  }
  connectivityMapPropertyId = item.id;
  requestAnimationFrame(() => connectivityLeafletMap?.invalidateSize());
  return true;
}

function renderConnectivityDestinationMarker(place) {
  if (!place.coordinates || !connectivityRouteLayer) return;
  const destinationMarker = window.L.circleMarker([place.coordinates.lat, place.coordinates.lon], {
    radius: 7,
    color: '#FFFFFF',
    weight: 3,
    fillColor: '#C5A059',
    fillOpacity: 1
  }).addTo(connectivityRouteLayer);
  destinationMarker.bindTooltip(place.label);
}

function renderConnectivityRoute(item, place, route) {
  if (!connectivityRouteLayer) return;
  connectivityRouteLayer.clearLayers();
  const routeCoordinates = route.geometry.coordinates.slice();
  const originCoord = ensureCoordinates(item);
  const originCoordinate = [originCoord.lon, originCoord.lat];
  const destinationCoordinate = [place.coordinates.lon, place.coordinates.lat];

  const firstRouteCoordinate = routeCoordinates[0];
  const lastRouteCoordinate = routeCoordinates[routeCoordinates.length - 1];

  if (firstRouteCoordinate[0] !== originCoordinate[0] || firstRouteCoordinate[1] !== originCoordinate[1]) {
    routeCoordinates.unshift(originCoordinate);
  }
  if (lastRouteCoordinate[0] !== destinationCoordinate[0] || lastRouteCoordinate[1] !== destinationCoordinate[1]) {
    routeCoordinates.push(destinationCoordinate);
  }

  const routeLine = window.L.geoJSON({
    ...route.geometry,
    coordinates: routeCoordinates
  }, {
    style: {
      color: '#143C47',
      weight: 5,
      opacity: 0.85
    }
  }).addTo(connectivityRouteLayer);

  renderConnectivityDestinationMarker(place);
  const routeBounds = routeLine.getBounds();
  if (routeBounds.isValid()) {
    connectivityLeafletMap.fitBounds(routeBounds, { padding: [48, 48], maxZoom: 16 });
  }
}

async function updateConnectivityRoute(item, place) {
  const status = document.getElementById('connectivity-map-route-status');
  if (!place.coordinates || !initializeConnectivityMap(item)) {
    if (!place.coordinates && status) {
      status.textContent = `A map location is not available for ${place.label}. Open Google Maps for directions.`;
    }
    return;
  }

  connectivityRouteController?.abort();
  connectivityRouteController = new AbortController();
  const requestId = ++connectivityRouteRequestId;
  connectivityRouteLayer?.clearLayers();
  renderConnectivityDestinationMarker(place);
  const routeKey = `${item.id}:${place.id}`;
  const cachedRoute = connectivityRouteCache.get(routeKey);
  if (cachedRoute) {
    renderConnectivityRoute(item, place, cachedRoute);
    if (status) status.textContent = `Route to ${place.label}`;
    return;
  }

  if (status) status.textContent = `Loading route to ${place.label}…`;
  const origin = ensureCoordinates(item);
  const destination = place.coordinates;
  const routeUrl = `https://router.project-osrm.org/route/v1/driving/${origin.lon},${origin.lat};${destination.lon},${destination.lat}?overview=full&geometries=geojson&steps=false`;

  try {
    const response = await fetch(routeUrl, { signal: connectivityRouteController.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    const route = result.routes?.[0];
    if (result.code !== 'Ok' || !route?.geometry?.coordinates?.length) {
      throw new Error('No route');
    }
    connectivityRouteCache.set(routeKey, route);
    if (requestId !== connectivityRouteRequestId) return;
    renderConnectivityRoute(item, place, route);
    if (status) status.textContent = `Route to ${place.label}`;
  } catch (error) {
    if (error.name === 'AbortError' || requestId !== connectivityRouteRequestId) return;
    // Fallback: draw straight polyline between origin and destination
    if (connectivityRouteLayer) {
      window.L.polyline([[origin.lat, origin.lon], [destination.lat, destination.lon]], {
        color: '#143C47',
        weight: 4,
        dashArray: '6, 8',
        opacity: 0.8
      }).addTo(connectivityRouteLayer);
    }
    if (status) status.textContent = `Direct line to ${place.label}. Open Google Maps for turn-by-turn directions.`;
  }
}

function selectConnectivityMapPlace(placeId) {
  const place = connectivityMapPlaces.find(candidate => candidate.id === placeId);
  if (!activeProject || !place) return;

  const directionsLink = document.getElementById('connectivity-map-directions-link');
  if (directionsLink) {
    directionsLink.href = getConnectivityDirectionsUrl(activeProject, place);
    directionsLink.textContent = `Directions to ${place.label} in Google Maps →`;
  }

  document.querySelectorAll('.connectivity-map-place').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.connectivityPlace === placeId));
  });

  updateConnectivityRoute(activeProject, place);
}

function renderConnectivityMapPlaces(query = '') {
  const list = document.getElementById('connectivity-map-list');
  if (!list) return;
  const normalizedQuery = query.trim().toLowerCase();
  const places = connectivityMapPlaces.filter(place =>
    `${place.label} ${place.distance || ''}`.toLowerCase().includes(normalizedQuery)
  );
  list.replaceChildren();
  const countEl = document.getElementById('connectivity-map-count');
  if (countEl) countEl.textContent = `${places.length} places`;

  if (!places.length) {
    const empty = document.createElement('p');
    empty.className = 'connectivity-map-no-results';
    empty.textContent = 'No listed destinations match your search.';
    list.appendChild(empty);
    return;
  }

  places.forEach((place, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'connectivity-map-place';
    button.dataset.connectivityPlace = place.id;
    button.setAttribute('aria-pressed', String(index === 0));

    const icon = document.createElement('span');
    icon.className = 'connectivity-map-place-icon';
    const iconElement = document.createElement('i');
    iconElement.className = place.icon || 'fa-solid fa-location-dot';
    iconElement.setAttribute('aria-hidden', 'true');
    icon.appendChild(iconElement);

    const details = document.createElement('span');
    details.className = 'connectivity-map-place-details';
    const name = document.createElement('span');
    name.textContent = place.label;
    const distance = document.createElement('span');
    distance.textContent = place.distance || 'Nearby';
    details.append(name, distance);

    button.append(icon, details);
    list.appendChild(button);
  });
}

function openConnectivityMap() {
  if (!activeProject) return;
  const map = document.getElementById('connectivity-map');
  const search = document.getElementById('connectivity-map-search-input');
  if (!map) return;

  const projectTitle = document.getElementById('connectivity-map-project');
  if (projectTitle) {
    projectTitle.textContent = `${activeProject.title} · ${activeProject.location}`;
  }

  const coords = ensureCoordinates(activeProject);
  connectivityMapPlaces = (activeProject.connectivity || []).map((place, index) => {
    const raw = typeof place === 'string' ? { label: place, distance: '' } : place;
    // Derive offset coordinates if destination doesn't have explicit coords
    const offsetLat = coords.lat + (index % 2 === 0 ? 0.012 : -0.012) * ((index + 1) * 0.6);
    const offsetLon = coords.lon + (index % 3 === 0 ? 0.015 : -0.015) * ((index + 1) * 0.6);
    return {
      ...raw,
      id: `${activeProject.id}-conn-${index + 1}`,
      coordinates: raw.coordinates || { lat: offsetLat, lon: offsetLon }
    };
  });

  if (search) search.value = '';
  map.hidden = false;
  document.body.classList.add('connectivity-map-open');

  initializeConnectivityMap(activeProject);
  renderConnectivityMapPlaces('');

  const directionsLink = document.getElementById('connectivity-map-directions-link');
  if (directionsLink) {
    const query = activeProject.mapsQuery || `${coords.lat},${coords.lon}`;
    directionsLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    directionsLink.textContent = 'Open property location in Google Maps →';
  }

  if (connectivityMapPlaces.length > 0) {
    selectConnectivityMapPlace(connectivityMapPlaces[0].id);
  }
  document.getElementById('connectivity-map-close')?.focus();
}

function closeConnectivityMap() {
  const map = document.getElementById('connectivity-map');
  if (!map || map.hidden) return;
  map.hidden = true;
  document.body.classList.remove('connectivity-map-open');
  connectivityRouteRequestId++;
  connectivityRouteController?.abort();
  clearTimeout(connectivitySearchTimer);
}

function initConnectivityMapListeners() {
  document.getElementById('connectivity-map-open')?.addEventListener('click', openConnectivityMap);
  document.getElementById('connectivity-map-close')?.addEventListener('click', closeConnectivityMap);
  document.getElementById('connectivity-map-search-input')?.addEventListener('input', event => {
    clearTimeout(connectivitySearchTimer);
    connectivitySearchTimer = setTimeout(() => renderConnectivityMapPlaces(event.target.value), 250);
  });
  document.getElementById('connectivity-map-list')?.addEventListener('click', event => {
    const placeButton = event.target.closest('[data-connectivity-place]');
    if (!placeButton) return;
    event.preventDefault();
    selectConnectivityMapPlace(placeButton.dataset.connectivityPlace);
  });
}


function navigateToComparedProperty(targetId) {
  if (activeProject) {
    const curPath = window.location.pathname;
    const previousId = activeProject.id;
    try {
      history.replaceState({
        propertyId: previousId,
        returnToSection: "detailComparisonSection"
      }, "", curPath);
      sessionStorage.setItem("assetz_return_to_section_" + previousId, "detailComparisonSection");
      sessionStorage.setItem("assetz_navigated_from_comparison", "true");
    } catch (e) {}
  }
  openPropertyDetail(targetId, true, { fromComparison: true, smooth: true });
}

function handleDetailBackClick(event) {
  if (event) event.preventDefault();
  showCatalogView(true);
}

function openPropertyDetail(id, updateUrl = true, options = {}) {
  const p = projectsData.find((x) => x.id === id);
  if (!p) return;
  const previousProject = activeProject;
  activeProject = p;

  const displayedBuilderName = document.body.dataset.builderName || "Assetz Property Group";
  updatePageMetadata(
    `${p.title} | ${displayedBuilderName} Bangalore`,
    p.overview || `Explore ${p.title} by ${displayedBuilderName} in ${p.location}.`
  );

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
  if (connectivityList) {
    const oldConnToggle = connectivityList.nextElementSibling;
    if (oldConnToggle?.classList.contains("list-expansion-toggle")) {
      oldConnToggle.remove();
    }
    const connItems = (p.connectivity || []).slice(0, 4);
    connectivityList.innerHTML = connItems
      .map((item) => {
        const entry =
          typeof item === "string"
            ? { label: item, distance: "", icon: "fa-solid fa-location-dot" }
            : item;
        return `<div class="connectivity-item loc-item"><span class="connectivity-label"><i class="${entry.icon || "fa-solid fa-location-dot"}" aria-hidden="true"></i><span>${entry.label}</span></span>${entry.distance ? `<span class="connectivity-distance">${entry.distance}</span>` : ""}</div>`;
      })
      .join("");
  }
  renderSidebarUnitOptions(p);
  renderPropertyHighlights(p);
  renderProjectGallerySection(p);
  initializeConnectivityPreview(p);
  syncEmiCalculatorWithProperty(p);
  renderProjectComparison(p);
  selectFloorPlan(p.id, 0);

  document.getElementById("catalogView").classList.add("hidden");
  document.getElementById("detailView").classList.remove("hidden");
  document.body.removeAttribute("data-property-route-loading");
  document.getElementById("detailBackButton")?.classList.remove("hidden");
  document.getElementById("detailBackButton")?.classList.add("inline-flex");
  closeMobileNavigation();

  const detailViewEl = document.getElementById("detailView");

  if (updateUrl) {
    const basePath = getSiteBasePath();
    const cleanId = encodeURIComponent(id);
    const targetPath = `${basePath}${cleanId}`;
    if (window.location.pathname !== targetPath && window.location.pathname.replace(/\/$/, "") !== `/${cleanId}`) {
      if (previousProject && options.fromComparison) {
        history.replaceState({
          propertyId: activeProject.id,
          returnToSection: "detailComparisonSection"
        }, "", window.location.pathname);
      }
      history.pushState({ propertyId: id, fromComparison: Boolean(options.fromComparison) }, "", targetPath);
    }
  }

  // Handle Target Scroll (Comparison return vs. Smooth Top Redirect)
  const targetSection = options.targetSection || null;
  const isSmooth = options.smooth !== false;

  if (detailViewEl && isSmooth) {
    detailViewEl.classList.add("is-transitioning");
    setTimeout(() => detailViewEl.classList.remove("is-transitioning"), 220);
  }

  if (targetSection) {
    const scrollToSection = () => {
      const el = document.getElementById(targetSection);
      if (el) {
        if (typeof window.smoothScrollTo === "function") {
          window.smoothScrollTo(targetSection);
        } else {
          el.scrollIntoView({ behavior: isSmooth ? "smooth" : "auto", block: "start" });
        }
      }
    };
    requestAnimationFrame(() => {
      scrollToSection();
      setTimeout(scrollToSection, 80);
      setTimeout(scrollToSection, 200);
    });
  } else {
    // Smooth scroll to top of page
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: isSmooth ? "smooth" : "auto" });
      const subnav = document.getElementById("detailSubnavBar");
      if (subnav) subnav.classList.remove("is-visible");
      const track = document.getElementById("subnavTrack");
      if (track) track.scrollLeft = 0;
      const firstTab = document.querySelector('.subnav-tab[data-target="detailOverviewSection"]');
      if (firstTab) {
        document.querySelectorAll(".subnav-tab").forEach(t => t.classList.remove("active"));
        firstTab.classList.add("active");
      }
    };
    scrollToTop();
    requestAnimationFrame(scrollToTop);
    setTimeout(scrollToTop, 50);
  }
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
  if (updateUrl) {
    navigateToSection("projects");
    return;
  }
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
function restoreRoute({ scroll = true, state = null } = {}) {
  const currentState = state !== null && state !== undefined ? state : window.history.state;
  const path =
    decodeURIComponent(window.location.pathname).replace(/\/$/, "") || "/";
  const project = projectsData.find((item) => `/${item.id}` === path);
  if (project) {
    let returnSection = currentState?.returnToSection;
    if (!returnSection) {
      try {
        returnSection = sessionStorage.getItem("assetz_return_to_section_" + project.id);
        if (returnSection) {
          sessionStorage.removeItem("assetz_return_to_section_" + project.id);
        }
      } catch (e) {}
    }
    openPropertyDetail(project.id, false, {
      targetSection: returnSection || null,
      smooth: true
    });
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
  syncEmiCalculatorWithFloorPlan(fp);
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
      initEmiCalculator();
      initProjectGalleryListeners();
      initConnectivityMapListeners();
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
window.addEventListener("popstate", (event) => restoreRoute({ state: event.state }));
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
    "detailHighlightsSection",
    "detailGallerySection",
    "detailFloorPlansSection",
    "detailEmiSection",
    "detailAmenitiesSection",
    "detailConnectivitySection",
    "detailComparisonSection",
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

  if (track && targetTab) {
    const targetLeft = targetTab.offsetLeft - (track.clientWidth - targetTab.clientWidth) / 2;
    track.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
  }
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

function smoothScrollTo(elementId) {
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

window.smoothScrollTo = smoothScrollTo;
window.navigateToComparedProperty = navigateToComparedProperty;
window.handleDetailBackClick = handleDetailBackClick;
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
window.initEmiCalculator = initEmiCalculator;
window.updateEmiCalculator = updateEmiCalculator;
window.openProjectGallery = openProjectGallery;
window.closeProjectGallery = closeProjectGallery;
window.openConnectivityMap = openConnectivityMap;
window.closeConnectivityMap = closeConnectivityMap;
