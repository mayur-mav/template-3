
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


function getHighlightIcon(text, defaultIcon = "fa-solid fa-circle-check") {
  if (!text || typeof text !== "string") return defaultIcon;
  const lower = text.toLowerCase();
  if (lower.includes("rera") || lower.includes("approv") || lower.includes("certif") || lower.includes("legal") || lower.includes("bda") || lower.includes("bbmp") || lower.includes("bmrda")) return "fa-solid fa-certificate";
  if (lower.includes("wall") || lower.includes("privacy") || lower.includes("security") || lower.includes("gated")) return "fa-solid fa-shield-halved";
  if (lower.includes("road") || lower.includes("location") || lower.includes("connect") || lower.includes("metro") || lower.includes("highway") || lower.includes("expressway") || lower.includes("station") || lower.includes("airport") || lower.includes("tech park")) return "fa-solid fa-location-dot";
  if (lower.includes("acre") || lower.includes("land") || lower.includes("garden") || lower.includes("open space") || lower.includes("landscape") || /\bpark\b/.test(lower) || lower.includes("green")) return "fa-solid fa-tree";
  if (lower.includes("pool") || lower.includes("swim")) return "fa-solid fa-person-swimming";
  if (lower.includes("gym") || lower.includes("fit") || lower.includes("sport") || lower.includes("court") || lower.includes("jog") || lower.includes("arena")) return "fa-solid fa-dumbbell";
  if (lower.includes("club") || lower.includes("amenit") || lower.includes("lifestyle") || lower.includes("hall") || lower.includes("resort") || lower.includes("luxury")) return "fa-solid fa-hotel";
  if (lower.includes("tower") || lower.includes("floor") || lower.includes("high-rise") || lower.includes("architecture") || /\bunits?\b/.test(lower) || lower.includes("structure")) return "fa-solid fa-building";
  if (lower.includes("bhk") || lower.includes("config") || lower.includes("plot") || lower.includes("villa") || lower.includes("flat") || lower.includes("layout") || lower.includes("typolog")) return "fa-solid fa-layer-group";
  if (lower.includes("ready") || lower.includes("possess") || lower.includes("timeline") || lower.includes("launch") || lower.includes("date") || lower.includes("schedul") || lower.includes("move-in") || lower.includes("keys") || lower.includes("handover")) return "fa-solid fa-key";
  if (lower.includes("vastu") || lower.includes("vaastu") || lower.includes("facing")) return "fa-solid fa-compass";
  if (lower.includes("lake") || lower.includes("water") || lower.includes("view") || lower.includes("scenic")) return "fa-solid fa-water";
  if (lower.includes("cable") || lower.includes("led") || lower.includes("solar") || lower.includes("smart") || lower.includes("power") || lower.includes("electric")) return "fa-solid fa-bolt";
  if (lower.includes("price") || lower.includes("offer") || lower.includes("crore") || lower.includes("lakh") || lower.includes("payment") || lower.includes("emi")) return "fa-solid fa-indian-rupee-sign";
  return defaultIcon;
}

function generatePropertyHighlights(property) {
  if (Array.isArray(property.highlights) && property.highlights.length > 0) {
    return property.highlights.map(h => {
      if (typeof h === "string") {
        let title = "";
        let text = h;
        if (h.includes(": ") && !h.startsWith("http")) {
          const parts = h.split(": ");
          if (parts[0].length <= 40) {
            title = parts[0].trim();
            text = parts.slice(1).join(": ").trim();
          }
        }
        return {
          icon: getHighlightIcon(h),
          title: title,
          text: text
        };
      }
      return {
        icon: h.icon || getHighlightIcon(`${h.title || ""} ${h.text || h.description || ""}`),
        title: h.title || h.heading || h.label || "",
        text: h.text || h.description || h.value || ""
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

import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const seoBySlug = {
  assetz: { name: "Assetz Property Group", title: "Assetz Property Group Bangalore | Assetz Apartments", heading: "Assetz Property Group Bangalore", description: "Explore Assetz Property Group Bangalore, Assetz apartments, Assetz East Point Bangalore in Bellandur, and Assetz upcoming projects in Bangalore." },
  bhartiya: { name: "Bhartiya Group", title: "Bhartiya Group Bangalore | Bhartiya City", heading: "Bhartiya Group Bangalore", description: "Explore Bhartiya Group Bangalore and Bhartiya real estate, including Bhartiya City Bangalore, Leela Bhartiya City Bangalore, and Bangalore Bhartiya City." },
  "ds-max": { name: "DS-MAX Properties", title: "DS Max Properties Bangalore | DS Max Apartments", heading: "DS Max Properties Bangalore", description: "Explore DS Max Properties Bangalore, DS Max apartments, and DS Max flats for sale in Bangalore, including DS Max Yelahanka, DS Max Sarjapur, DS Max Sky Fields, and DS Max Sky Sisira." },
  embassy: { name: "Embassy Group", title: "Embassy Group Projects in Bangalore", heading: "Embassy Group Projects in Bangalore", description: "Explore Embassy Group Bangalore and Embassy Group real estate, including Embassy developers Bangalore, Embassy group projects, and Embassy group projects in Bangalore." },
  mana: { name: "Mana Projects", title: "Mana Projects Bangalore | Mana Builders", heading: "Mana Projects Bangalore", description: "Explore Mana Projects Bangalore, Mana Builders Bangalore, Mana Properties Bangalore, and Mana Projects Sarjapur Road." },
  sobha: { name: "SOBHA Limited", title: "Sobha Projects in Bangalore | Sobha Realty", heading: "Sobha Projects in Bangalore", description: "Explore Sobha projects in Bangalore, Sobha apartments Bangalore, Sobha Realty, Sobha Dream Acres Bangalore, Sobha City Bangalore, and Sobha upcoming projects in Bangalore." },
};

async function loadBuilderSeo(dataFile, slug) {
  const source = readFileSync(dataFile, "utf8");
  const dataModule = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
  const properties = Object.values(dataModule).find((value) => Array.isArray(value) && value.some((item) => item?.id && (item?.title || item?.name))) || [];
  return { ...seoBySlug[slug], properties };
}

function seoEscape(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function seoDecode(value = "") {
  return String(value).replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

function seoShorten(value, fallback) {
  const text = String(value || fallback || "").replace(/\s+/g, " ").trim();
  if (text.length <= 155) return text;
  const candidate = text.slice(0, 152);
  const boundary = candidate.lastIndexOf(" ");
  return `${candidate.slice(0, boundary > 110 ? boundary : 152).replace(/[,. ]+$/, "")}...`;
}

function seoReplaceId(html, id, content) {
  const openRegex = new RegExp(`<([a-z][a-z0-9]*)\\b[^>]*\\bid="${id}"[^>]*>`, 'i');
  const openMatch = openRegex.exec(html);
  if (!openMatch) return html;

  const tag = openMatch[1].toLowerCase();
  const startContent = openMatch.index + openMatch[0].length;
  let depth = 1;
  const tagRegex = new RegExp(`</?${tag}\\b[^>]*>`, 'gi');
  tagRegex.lastIndex = startContent;

  let match;
  while ((match = tagRegex.exec(html)) !== null) {
    if (match[0].startsWith('</')) {
      depth--;
      if (depth === 0) {
        return html.slice(0, startContent) + content + html.slice(match.index);
      }
    } else if (!match[0].endsWith('/>')) {
      depth++;
    }
  }

  const elementPattern = new RegExp(`(<([a-z][a-z0-9]*)\\b[^>]*\\bid="${id}"[^>]*>)[\\s\\S]*?(<\\/\\2>)`, 'i');
  return html.replace(elementPattern, `$1${content}$3`);
}

function applyBuilderSeo(html, seo, route, basePath, siteOrigin) {
  const property = seo.properties.find((item) => String(item.id) === String(route));
  const sourceTitle = seoDecode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || seo.title);
  const sourceDescription = seoDecode(html.match(/<meta\s+name="description"[^>]*content="([^"]*)"/i)?.[1] || seo.description);
  const projectName = property?.title || property?.name;
  const title = property ? `${projectName} | ${seo.name}` : sourceTitle;
  const description = property ? seoShorten(property.overview, `Explore ${projectName} by ${seo.name}. ${property.location || ""}`) : sourceDescription;

  if (property) {
    html = seoReplaceId(html, "detailTitle", seoEscape(projectName));
    html = seoReplaceId(html, "detailBadge", seoEscape(property.badge || ""));
    if (property.reraId) {
      html = html.replace(/(<span\b[^>]*\bid="detailReraBadge"[^>]*\bclass=")[^"]*(")/i, `$1bg-sobhaGold text-sobhaNavy text-[10px] font-bold uppercase tracking-widest px-3 py-1 select-none pointer-events-none cursor-default$2`);
    } else {
      html = html.replace(/(<span\b[^>]*\bid="detailReraBadge"[^>]*\bclass=")[^"]*(")/i, `$1hidden bg-sobhaGold text-sobhaNavy text-[10px] font-bold uppercase tracking-widest px-3 py-1 select-none pointer-events-none cursor-default$2`);
    }
    html = seoReplaceId(html, "detailLocation", seoEscape(property.location || ""));
    const overviewParas = createAssetzPropertyOverview(property, seo.properties);
    const overviewHtml = overviewParas.map((para) => {
      const registration = para.match(/^(.*) RERA registration number: (.+)\.$/);
      if (!registration) {
        return `<p class="overview-text leading-relaxed text-slate-700 mb-4">${seoEscape(para)}</p>`;
      }
      return `<p class="overview-text leading-relaxed text-slate-700 mb-4">${seoEscape(registration[1])}</p>
              <div class="overview-rera-card mt-5 pt-4 border-t border-[#E8E1D5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50/80 p-3.5 sm:p-4 rounded-xl border border-emerald-200/90">
                <div class="flex items-center gap-2.5 text-emerald-900 text-xs sm:text-sm font-semibold">
                  <span class="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-[10px]">
                    <i class="fa-solid fa-check" aria-hidden="true"></i>
                  </span>
                  <span>Official Karnataka RERA Registered</span>
                </div>
                <div class="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  <span class="text-[10px] sm:text-xs uppercase tracking-wider text-emerald-800 font-bold">RERA No:</span>
                  <span class="overview-rera font-mono text-xs font-bold text-slate-900 bg-white px-2.5 py-1 rounded border border-emerald-200 break-all select-all">${seoEscape(registration[2])}</span>
                </div>
              </div>`;
    }).join("\n                    ");
    html = seoReplaceId(html, "detailOverview", overviewHtml);
    html = seoReplaceId(html, "detailPrice", seoEscape(property.price || ""));
    html = seoReplaceId(html, "specPossession", seoEscape(property.specs?.possession || ""));
    html = seoReplaceId(html, "specLandArea", seoEscape(property.specs?.landArea || ""));
    html = seoReplaceId(html, "specConfig", seoEscape(property.specs?.config || ""));
        html = seoReplaceId(html, "specRera", seoEscape(property.reraId || ""));

    // Pre-render gallery preview Century style
    const galleryItems = (property.gallery || property.images || []).filter(img => typeof img === 'string' && img.trim());
    const previewImg = property.mainImg || property.thumbnail || galleryItems[0] || "";
    const fpCount = (property.floorPlans || []).length;
    const photoCount = galleryItems.length || 1;
    const countText = `${photoCount} Photos${fpCount > 0 ? ` & ${fpCount} Plans` : ''}`;

    if (previewImg) {
      html = html.replace(/(<img\b[^>]*\bid="projectGalleryPreviewImage"[^>]*\bsrc=")[^"]*(")/i, `$1${seoEscape(previewImg)}$2`);
      html = html.replace(/(<img\b[^>]*\bid="projectGalleryPreviewImage"[^>]*\balt=")[^"]*(")/i, `$1${seoEscape(projectName)} gallery preview$2`);
    }
    html = seoReplaceId(html, "projectGalleryImageCount", seoEscape(countText));


    const highlights = generatePropertyHighlights(property);
    const highlightsHtml = highlights.map(h => `
      <div class="highlight-card">
        <div class="highlight-icon-wrap"><i class="${h.icon}" aria-hidden="true"></i></div>
        <div class="highlight-text-wrap">
          ${h.title ? `<strong class="highlight-title">${seoEscape(h.title)}</strong>` : ""}
          ${h.text ? `<span class="highlight-text">${seoEscape(h.text)}</span>` : ""}
        </div>
      </div>
    `).join("");
    html = seoReplaceId(html, "detailHighlights", highlightsHtml);

    html = seoReplaceId(html, "emiSyncProperty", seoEscape(projectName));

    const others = seo.properties.filter(c => String(c.id) !== String(property.id));
    const similar = others.slice(0, 2);
    const compProjects = [property, ...similar];
    const compHtml = compProjects.map((p, idx) => {
      const isCurr = idx === 0;
      const imgSrc = p.mainImg || p.thumbnail || (p.gallery && p.gallery[0]) || "";
      const pTitle = p.title || p.name;
      return `
        <article class="project-comparison-card${isCurr ? " is-current" : ""}">
          <div class="comparison-project-card">
            <div class="comparison-project-image-wrap">
              <img class="comparison-project-image" src="${seoEscape(imgSrc)}" alt="${seoEscape(pTitle)} project" loading="lazy" decoding="async">
              ${isCurr ? '<span class="comparison-current-label" style="background:#143C47 !important; color:#FFFFFF !important; border:1px solid #C5A059 !important; font-weight:800 !important;">Current Project</span>' : ''}
            </div>
            <div class="comparison-project-name">
              <span>${seoEscape(pTitle)}</span>
              <span class="comparison-project-location">${seoEscape(p.location || "")}</span>
            </div>
            <button type="button" class="comparison-project-link${!isCurr ? " btn-outline" : ""}" ${isCurr ? 'onclick="triggerEnquiryScroll()"' : `onclick="navigateToComparedProperty('${p.id}'); return false;"`}>
              ${isCurr ? '<i class="fa-solid fa-phone" aria-hidden="true"></i> Enquire Now' : '<i class="fa-solid fa-arrow-right" aria-hidden="true"></i> View Details'}
            </button>
            <div class="comparison-project-specs">
              <div class="comparison-project-spec"><span class="comparison-project-spec-label">Starting Price</span><span class="comparison-project-spec-value">${seoEscape(p.price || "On Request")}</span></div>
              <div class="comparison-project-spec"><span class="comparison-project-spec-label">Configuration</span><span class="comparison-project-spec-value">${seoEscape(p.specs?.config || "Luxury Residences")}</span></div>
              <div class="comparison-project-spec"><span class="comparison-project-spec-label">Project Area</span><span class="comparison-project-spec-value">${seoEscape(p.specs?.landArea || "Prime Acres")}</span></div>
              <div class="comparison-project-spec"><span class="comparison-project-spec-label">Status</span><span class="comparison-project-spec-value">${seoEscape(p.badge || "Ongoing")}</span></div>
              <div class="comparison-project-spec"><span class="comparison-project-spec-label">Possession</span><span class="comparison-project-spec-value">${seoEscape(p.specs?.possession || "Coming Soon")}</span></div>
            </div>
          </div>
        </article>
      `;
    }).join("");
    html = seoReplaceId(html, "detailComparisonGrid", compHtml);

    const connItems = (property.connectivity || []).slice(0, 4);
    const connHtml = connItems.map(item => {
      const entry = typeof item === "string" ? { label: item, distance: "", icon: "fa-solid fa-location-dot" } : item;
      return `<div class="connectivity-item loc-item"><span class="connectivity-label"><i class="${entry.icon || "fa-solid fa-location-dot"}" aria-hidden="true"></i><span>${seoEscape(entry.label)}</span></span>${entry.distance ? `<span class="connectivity-distance">${seoEscape(entry.distance)}</span>` : ""}</div>`;
    }).join("");
    html = seoReplaceId(html, "connectivityList", connHtml);

    // Pre-render Floor Plans tabs and initial floor plan details Century style
    if (Array.isArray(property.floorPlans) && property.floorPlans.length > 0) {
      const fpTabsHtml = property.floorPlans.map((fp, i) =>
        `<button id="fpBtn-${i}" onclick="selectFloorPlan('${property.id}',${i})" class="fp-tab-btn px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${i === 0 ? "bg-sobhaNavy text-white shadow-md border-sobhaNavy" : "bg-white text-gray-700 border-gray-200 hover:border-sobhaGold"}">${seoEscape(fp.type)}</button>`
      ).join("");
      html = seoReplaceId(html, "floorPlanTabs", fpTabsHtml);
      const firstFp = property.floorPlans[0];
      html = seoReplaceId(html, "fpTitle", seoEscape(firstFp.type || ""));
      html = seoReplaceId(html, "fpSba", seoEscape(firstFp.sba || ""));
      html = seoReplaceId(html, "fpPrice", seoEscape(firstFp.price || ""));
      const planSrc = firstFp.img || firstFp.image;
      if (planSrc) {
        html = html.replace(/(<img\b[^>]*\bid="floorPlanImg"[^>]*\bsrc=")[^"]*(")/i, `$1${seoEscape(planSrc)}$2`);
        html = html.replace(/id="floorPlanImg"\s+class="hidden\s+/i, 'id="floorPlanImg" class="');
        html = html.replace(/id="floorPlanPlaceholder"\s+class="w-full\s+/i, 'id="floorPlanPlaceholder" class="hidden w-full ');
      }
    }

    // Pre-render Amenities grid Century style
    if (Array.isArray(property.amenities) && property.amenities.length > 0) {
      const amenitiesHtml = property.amenities.map((item) => {
        const name = typeof item === "string" ? item : item.name;
        const icon = typeof item === "string" ? "fa-solid fa-star" : item.icon;
        return `<div class="amenity-item bg-sobhaLightBg p-3 sm:p-4 border border-gray-200 text-xs font-semibold text-sobhaNavy rounded"><i class="${seoEscape(icon)} text-sobhaGold" aria-hidden="true"></i><span>${seoEscape(name)}</span></div>`;
      }).join("");
      html = seoReplaceId(html, "amenitiesGrid", amenitiesHtml);
    }

    // Pre-render gallery images Century style
    const mainImg = property.mainImg || property.thumbnail || property.gallery?.[0] || "";
    const gallery = Array.isArray(property.gallery) && property.gallery.length ? property.gallery : (property.images || [mainImg]);
    if (mainImg) {
      html = html.replace(/(<img\b[^>]*\bid="mainGalleryImage"[^>]*\bsrc=")[^"]*(")/i, `$1${seoEscape(mainImg)}$2`);
      html = html.replace(/<link\s+rel="preload"\s+as="image"[^>]*unsplash[^>]*>/i, "");
      html = html.replace('</head>', `    <link rel="preload" as="image" href="${seoEscape(mainImg)}" fetchpriority="high">\n</head>`);
    }
    if (gallery[0]) {
      html = html.replace(/(<img\b[^>]*\bid="thumb0"[^>]*\bsrc=")[^"]*(")/i, `$1${seoEscape(gallery[0])}$2`);
    }
    if (gallery[1]) {
      html = html.replace(/(<img\b[^>]*\bid="thumb1"[^>]*\bsrc=")[^"]*(")/i, `$1${seoEscape(gallery[1])}$2`);
    }
    html = html.replace("</head>", '<style>body[data-property-route-loading="true"] #catalogView{display:none!important}body[data-property-route-loading="true"] #detailView{display:block!important}</style>\n</head>');
  } else {
    html = html.replace(/(<h1\b[^>]*>)[\s\S]*?(<\/h1>)/i, (_match, opening, closing) => `${opening}${seoEscape(seo.heading)}${closing}`);
    html = html.replace(/(<h1\b[^>]*>[\s\S]*?<\/h1>[\s\S]*?<p\b[^>]*>)[\s\S]*?(<\/p>)/i, (_match, opening, closing) => `${opening}${seoEscape(description)}${closing}`);
  }

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${seoEscape(title)}</title>`);
  html = html.replace(/(<meta\s+name="description"[^>]*content=")[^"]*("[^>]*>)/i, (_match, opening, closing) => `${opening}${seoEscape(description)}${closing}`);
  const ogTitle = `<meta property="og:title" content="${seoEscape(title)}">`;
  const ogDescription = `<meta property="og:description" content="${seoEscape(description)}">`;
  html = /property="og:title"/.test(html) ? html.replace(/<meta\s+property="og:title"[^>]*>/i, ogTitle) : html.replace("</head>", `    ${ogTitle}\n</head>`);
  html = /property="og:description"/.test(html) ? html.replace(/<meta\s+property="og:description"[^>]*>/i, ogDescription) : html.replace("</head>", `    ${ogDescription}\n</head>`);
  html = html.replace(/\s*<link\b(?=[^>]*rel="canonical")(?=[^>]*yourdomain\.com)[^>]*>/i, "");
  if (siteOrigin) {
    const path = property ? `${encodeURIComponent(route)}/` : "";
    const canonical = `${siteOrigin}${basePath}${path}`;
    html = html.replace(/<link\b(?=[^>]*rel="canonical")[^>]*>/i, "");
    html = html.replace(/<meta\b(?=[^>]*property="og:url")[^>]*>/i, "");
    html = html.replace("</head>", `    <link rel="canonical" href="${seoEscape(canonical)}">\n    <meta property="og:url" content="${seoEscape(canonical)}">\n</head>`);
  }
  return html;
}

const projectDir = dirname(fileURLToPath(import.meta.url));
const outputDir = join(projectDir, "dist");
const requestedBasePath = process.argv[2] || "/";
const cleanBase = requestedBasePath.replace(/^\/+|\/+$/g, "");
const basePath = `/${cleanBase}${cleanBase ? "/" : ""}`;
const sourceHtml = readFileSync(join(projectDir, "index.html"), "utf8");
const data = readFileSync(join(projectDir, "data", "assetz.js"), "utf8");
const seoData = await loadBuilderSeo(join(projectDir, "data", "assetz.js"), "assetz");
const propertyIds = seoData.properties.map(({ id }) => String(id));
const sectionRoutes = ["residences", "about", "faq", "contact"];
const allRoutes = [...sectionRoutes, ...propertyIds];
const siteOrigin = process.env.SITE_ORIGIN?.replace(/\/$/, "");
const apacheRules = [
  "Options -MultiViews",
  "RewriteEngine On",
  "RewriteRule ^privacy-policy/?$ privacy-policy.html [L]",
  ...allRoutes.map(
    (route) => `RewriteRule ^${route}/?$ ${route}/index.html [L]`,
  ),
].join("\n");
function routedHtml(route = "") {
  let html = sourceHtml.replace(
    "<head>",
    `<head>\n    <base href="${basePath}">`,
  );
  if (propertyIds.includes(route))
    html = html.replace(/<body\b/i, '<body data-property-route-loading="true"');
  if (siteOrigin)
    html = html.replace(
      "</head>",
      `    <link rel="canonical" href="${siteOrigin}${basePath}${route ? `${route}/` : ""}">\n</head>`,
    );
  return applyBuilderSeo(html, seoData, route, basePath, siteOrigin);
}
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "index.html"), routedHtml());
for (const directory of ["css", "js", "data"])
  cpSync(join(projectDir, directory), join(outputDir, directory), {
    recursive: true,
  });
cpSync(
  join(projectDir, "privacy-policy.html"),
  join(outputDir, "privacy-policy.html"),
);
writeFileSync(join(outputDir, ".htaccess"), `${apacheRules}\n`);
for (const route of allRoutes) {
  const routeDir = join(outputDir, route);
  mkdirSync(routeDir, { recursive: true });
  writeFileSync(join(routeDir, "index.html"), routedHtml(route));
}
if (siteOrigin) {
  const urls = ["", ...propertyIds].map((route) => {
    const path = route ? `${encodeURIComponent(route)}/` : "";
    return `  <url><loc>${siteOrigin}${basePath}${path}</loc></url>`;
  });
  writeFileSync(join(outputDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
}
console.log(
  `Built ASSETZ home page, ${sectionRoutes.length} section routes, and ${propertyIds.length} property routes in ${resolve(outputDir)} (base: ${basePath}).`,
);
