const imageCdnPrefix = 'https://media.justflip.in/builder-brand-pages/';
const assetzImage = suffix => `${imageCdnPrefix}${suffix.replace(/^\/+/, '')}`;

export const builderData = [
  {
    id: "assetz-city-of-palms",
    reraId: "PRM/KA/RERA/1250/303/PR/300626/008780",
    title: "Assetz City of Palms",
    badge: "New Launch",
    category: "new-launch",
    theme: "Sustainable Luxury Plotted Enclave amidst Wide Green Spaces",
    coordinates: { lat: 13.2384, lon: 77.6892 },
    mapsQuery: "Assetz City of Palms, Devanahalli, Bengaluru",
    location:
      "Doddacheemanahalli, Off IVC Road & Chapparakallu Road, Devanahalli, North Bengaluru",
    searchLocation:
      "devanahalli ivc road doddacheemanahalli chapparkallu road north bengaluru airport corridor",
    price: "₹ 1.01 Cr*",
    mainImg: assetzImage('assetz/assetz-city-of-palms/thumbnail.webp'),
    gallery: [
      assetzImage('assetz/assetz-city-of-palms/gallery/exterior-view.webp'),
      assetzImage('assetz/assetz-city-of-palms/gallery/interior-view.webp'),
      assetzImage('assetz/assetz-city-of-palms/gallery/amenities-1.webp'),
    ],
    overview:
      "Assetz City of Palms is a premium luxury residential plotted development by Assetz Property Group located off IVC Road in Devanahalli, North Bengaluru. Spanning a massive 35-acre master development (with Phase 1 covering ~25 acres and offering 442 plots out of a total 642 plots), the gated community features expansive green parks, wide paved internal roads, underground utility cabling, and a modern clubhouse designed for custom luxury villa construction.",
    highlights: [
      "Prime 40-Acre Plotted Master Development with 620 Premium Villa Plots",
      "Strategic Location right off IVC Road with Swift Airport & KIADB Access",
      "World-Class 25,000 Sq. Ft. Lifestyle Clubhouse with Sports Arena",
      "Underground Cabling, Paved Walkways & 100% LED Street Infrastructure",
      "Over 50% Dedicated to Tree-Lined Greenery, Organic Gardens & Parks",
      "Officially Karnataka RERA Approved with Clear BIAAPA Sanctions"
    ],
    specs: {
      possession: "February 2029",
      landArea: "35.00 Acres (Total Master Plan)",
      config: "Residential Villa Plots — 620 Total Plots",
    },
    floorPlans: [
      {
        type: "30 x 40 Plot",
        sba: "1,200 Sq. Ft.",
        carpet: "",
        price: "₹ 1.01 Cr*",
        img: assetzImage('assetz/assetz-city-of-palms/floor-plans/plan-1.webp'),
      },
      {
        type: "30 x 50 Plot",
        sba: "1,500 Sq. Ft.",
        carpet: "",
        price: "₹ 1.35 Cr*",
        img: assetzImage('assetz/assetz-city-of-palms/floor-plans/plan-2.webp'),
      },
      {
        type: "40 x 60 Plot",
        sba: "2,400 Sq. Ft.",
        carpet: "",
        price: "₹ 2.10 Cr*",
        img: assetzImage('assetz/assetz-city-of-palms/floor-plans/plan-3.webp'),
      },
      {
        type: "Odd Plots",
        sba: "5,074 Sq. Ft.",
        carpet: "",
        price: "₹ 4.57 Cr*",
        img: assetzImage('assetz/assetz-city-of-palms/floor-plans/plan-4.webp'),
      },
    ],
    amenities: [
      {
        name: "Modern Lifestyle Clubhouse & Multipurpose Hall",
        icon: "fa-solid fa-building-user",
      },
      { name: "Swimming Pool & Sun Deck", icon: "fa-solid fa-person-swimming" },
      {
        name: "Fully Equipped Gymnasium & Yoga Deck",
        icon: "fa-solid fa-dumbbell",
      },
      {
        name: "66% Open Spaces & Landscaped Green Parks",
        icon: "fa-solid fa-tree",
      },
      {
        name: "Skating Rink & Outdoor Sports Courts",
        icon: "fa-solid fa-person-skating",
      },
      {
        name: "Children's Adventure Play Area",
        icon: "fa-solid fa-child-reaching",
      },
      {
        name: "Underground Power, Water & Sewage Infrastructure",
        icon: "fa-solid fa-plug",
      },
      {
        name: "24/7 Gated Security & Wide Paved Roads",
        icon: "fa-solid fa-shield-halved",
      },
    ],
    connectivity: [
      {
        label: "Chapparakallu Road / IVC Road",
        destination: "Chapparakallu Road, IVC Road Corridor, Devanahalli, Bengaluru, Karnataka 562110",
        coordinates: { lat: 13.2355, lon: 77.683 },
        distance: "0.5 km",
        icon: "fa-solid fa-route",
      },
      {
        label: "Cambridge Institute of Technology North Campus",
        destination: "Cambridge Institute of Technology North Campus, Kundana, Devanahalli, Bengaluru, Karnataka 562110",
        coordinates: { lat: 13.232, lon: 77.696 },
        distance: "1.0 km",
        icon: "fa-solid fa-school",
      },
      {
        label: "National Highway 44 (NH 44)",
        destination: "National Highway 44 (NH 44), Devanahalli Bypass, Bengaluru, Karnataka 562110",
        coordinates: { lat: 13.245, lon: 77.712 },
        distance: "6.0 km",
        icon: "fa-solid fa-route",
      },
      {
        label: "Devanahalli Town / Fort",
        destination: "Devanahalli Fort, Devanahalli, Bengaluru Rural, Karnataka 562110",
        coordinates: { lat: 13.2482, lon: 77.7128 },
        distance: "7.0 km",
        icon: "fa-solid fa-location-dot",
      },
      {
        label: "Manipal Hospital Devanahalli",
        destination: "Manipal Hospital, NH 44, Devanahalli, Bengaluru, Karnataka 562110",
        coordinates: { lat: 13.234, lon: 77.715 },
        distance: "12.0 km",
        icon: "fa-solid fa-hospital",
      },
      {
        label: "Kempegowda International Airport",
        destination: "Kempegowda International Airport, Devanahalli, Bengaluru, Karnataka 560300",
        coordinates: { lat: 13.1986, lon: 77.7066 },
        distance: "16.0 km",
        icon: "fa-solid fa-plane",
      },
      {
        label: "KIADB Aerospace SEZ & Foxconn Facility",
        destination: "KIADB Aerospace SEZ, Foxconn Facility, Devanahalli, Bengaluru, Karnataka 562149",
        coordinates: { lat: 13.189, lon: 77.734 },
        distance: "14.0 km",
        icon: "fa-solid fa-briefcase",
      },
    ],
  },
  {
    id: "assetz-miru-and-miyo",
    reraId: "PRM/KA/RERA/1251/472/PR/050526/008621",
    title: "Assetz Miru & Miyo",
    badge: "New Launch",
    category: "new-launch",
    theme: "Japanese-Inspired Biophilic Eco-Luxe Luxury Residences",
    coordinates: { lat: 13.1492, lon: 77.5684 },
    mapsQuery: "Assetz Miru and Miyo, Doddaballapur Road, Yelahanka, Bengaluru",
    location:
      "Singanayakanahalli / Honnenahalli, Off Doddaballapur Road, Yelahanka, North Bengaluru",
    searchLocation:
      "yelahanka singanayakanahalli honnenahalli doddaballapur road north bengaluru airport corridor",
    price: "₹ 2.04 Cr*",
    mainImg: assetzImage('assetz/assetz-miru-and-miyo/thumbnail.webp'),
    gallery: [
      assetzImage('assetz/assetz-miru-and-miyo/gallery/exterior-view.webp'),
      assetzImage('assetz/assetz-miru-and-miyo/gallery/interior-view.webp'),
      assetzImage('assetz/assetz-miru-and-miyo/gallery/amenities-1.webp'),
    ],
    overview:
      "Assetz Miru & Miyo is a Japanese-inspired biophilic eco-luxe residential project by Assetz Property Group, located off Doddaballapur Road in Yelahanka, North Bengaluru. Spanning 6.35 acres with 77% dedicated open green space, the project features 3 high-rise towers (2B + G + 19 Floors) housing approximately 350 spacious 3 BHK luxury residences. Centered around a 23,000 sq. ft. modern clubhouse and 30+ lifestyle amenities, the homes feature zero-waste water management, laminated wooden flooring in bedrooms, and 3-track UPVC sliding doors with mosquito mesh.",
    highlights: [
      "Japanese-Inspired Biophilic Architecture with Zen Gardens & Reflective Ponds",
      "Expansive 3 BHK Luxury Apartments with 3-Sided Open Ventilation",
      "Multi-Tier Clubhouse featuring Heated Indoor Pool, Spa & Co-Working Lounge",
      "15 Minutes to Kempegowda International Airport & Devanahalli Business Hubs",
      "Extensive 78% Open Green Spaces with Bamboo Groves & Reflexology Pathways",
      "Advanced Smart Home Automation & 3-Tier Electronic Surveillance"
    ],
    specs: {
      possession: "March 2031",
      landArea: "6.35 Acres",
      config: "Spacious 3 BHK Luxury Residences (350 Units)",
    },
    floorPlans: [
      {
        type: "3 BHK Comfort (Type 1)",
        sba: "1,774 Sq. Ft.",
        carpet: "",
        price: "₹ 2.04 Cr*",
        img: assetzImage('assetz/assetz-miru-and-miyo/floor-plans/plan-1.webp'),
      },
      {
        type: "3 BHK Grand (Type 2)",
        sba: "1,800 Sq. Ft.",
        carpet: "",
        price: "₹ 2.07 Cr*",
        img: assetzImage('assetz/assetz-miru-and-miyo/floor-plans/plan-2.webp'),
      },
      {
        type: "3 BHK Luxe (Type 3)",
        sba: "1,898 Sq. Ft.",
        carpet: "",
        price: "₹ 2.18 Cr*",
        img: assetzImage('assetz/assetz-miru-and-miyo/floor-plans/plan-3.webp'),
      },
      {
        type: "3 BHK Luxury (Type 4)",
        sba: "1,970 Sq. Ft.",
        carpet: "",
        price: "₹ 2.27 Cr*",
        img: assetzImage('assetz/assetz-miru-and-miyo/floor-plans/plan-4.webp'),
      },
    ],
    amenities: [
      {
        name: "23,000 Sq. Ft. Japanese-Inspired Resident Clubhouse",
        icon: "fa-solid fa-building-user",
      },
      {
        name: "77% Open Green Space & Zen Botanical Gardens",
        icon: "fa-solid fa-tree",
      },
      {
        name: "Outdoor Swimming Pool & Children's Splash Pool",
        icon: "fa-solid fa-person-swimming",
      },
      {
        name: "Fully Equipped Gymnasium & Yoga Pavilion",
        icon: "fa-solid fa-dumbbell",
      },
      {
        name: "Indoor Sports Courts & Table Tennis Zone",
        icon: "fa-solid fa-table-tennis-paddle-ball",
      },
      {
        name: "Multipurpose Party Hall & Senior Citizen Sitting Deck",
        icon: "fa-solid fa-people-roof",
      },
      {
        name: "Children's Adventure Play Area & Skating Rink",
        icon: "fa-solid fa-child-reaching",
      },
      {
        name: "Biophilic Water Recycling & Solar Power Systems",
        icon: "fa-solid fa-leaf",
      },
    ],
    connectivity: [
      {
        label: "ORCHIDS The International School",
        destination: "ORCHIDS The International School, Doddaballapur Main Road, Yelahanka, Bengaluru, Karnataka 560064",
        coordinates: { lat: 13.146, lon: 77.569 },
        distance: "0.5 km",
        icon: "fa-solid fa-school",
      },
      {
        label: "Doddaballapur Main Road",
        destination: "Doddaballapur Main Road, Rajanukunte, Bengaluru, Karnataka 560064",
        coordinates: { lat: 13.152, lon: 77.567 },
        distance: "1.0 km",
        icon: "fa-solid fa-route",
      },
      {
        label: "Rajanukunte Railway Station",
        destination: "Rajanukunte Railway Station, Rajanukunte, Bengaluru Rural, Karnataka 560064",
        coordinates: { lat: 13.168, lon: 77.558 },
        distance: "3.5 km",
        icon: "fa-solid fa-train",
      },
      {
        label: "Yelahanka Junction Railway Station",
        destination: "Yelahanka Junction Railway Station, Yelahanka, Bengaluru, Karnataka 560064",
        coordinates: { lat: 13.1008, lon: 77.5963 },
        distance: "6.0 km",
        icon: "fa-solid fa-train",
      },
      {
        label: "Manipal Hospital Yelahanka",
        destination: "Manipal Hospital Yelahanka, NH 44, Bengaluru, Karnataka 560064",
        coordinates: { lat: 13.1114, lon: 77.5896 },
        distance: "7.5 km",
        icon: "fa-solid fa-hospital",
      },
      {
        label: "KIADB Aerospace SEZ & Hardware Park",
        destination: "KIADB Aerospace SEZ & Hardware Park, Bagalur, Bengaluru, Karnataka 562149",
        coordinates: { lat: 13.185, lon: 77.728 },
        distance: "15.0 km",
        icon: "fa-solid fa-briefcase",
      },
      {
        label: "Kempegowda International Airport",
        destination: "Kempegowda International Airport, Devanahalli, Bengaluru, Karnataka 560300",
        coordinates: { lat: 13.1986, lon: 77.7066 },
        distance: "22.0 km",
        icon: "fa-solid fa-plane",
      },
    ],
  },
  {
    id: "assetz-muse-and-maison",
    reraId: "PRM/KA/RERA/1251/310/PR/040526/008618",
    title: "Assetz Muse & Maison",
    badge: "New Launch",
    category: "new-launch",
    theme: "Boutique Low-Density Eco-Luxe High-Rise Residences",
    coordinates: { lat: 12.8941, lon: 77.7082 },
    mapsQuery: "Assetz Muse and Maison, Gattahalli, Sarjapur Road, Bengaluru",
    location: "Gattahalli, Off Hosa Road / Sarjapur Road, South-East Bengaluru",
    searchLocation:
      "gattahalli hosa road sarjapur road electronic city south east bengaluru",
    price: "₹ 2.11 Cr*",
    mainImg: assetzImage('assetz/assetz-muse-and-maison/thumbnail.webp'),
    gallery: [
      assetzImage('assetz/assetz-muse-and-maison/gallery/exterior-view.webp'),
      assetzImage('assetz/assetz-muse-and-maison/gallery/interior-view.webp'),
      assetzImage('assetz/assetz-muse-and-maison/gallery/amenities-1.webp'),
    ],
    overview:
      "Assetz Muse & Maison is a high-end, low-density boutique residential project by Assetz Property Group located in Gattahalli, off Hosa Road and Sarjapur Road in South-East Bengaluru. Spread across 2.14 acres with 78% open spaces, the development comprises a single high-rise tower (Basement + Ground + 16 Floors) housing just 128 exclusive 3 BHK luxury residences. Anchored by a 13,000 sq. ft. modern clubhouse, the project features temperature-controlled swimming pools, padel tennis courts, biophilic design elements, and terracotta jaali screens for passive cooling.",
    highlights: [
      "Boutique Low-Density Living with Only 128 Exclusive 3 BHK High-Rise Homes",
      "Zero Wall Sharing Design for Ultimate Privacy and Natural Daylight",
      "Grand Rooftop Sky Lounge with Panoramic Skyline Views & Infinity Edge Pool",
      "5 Minutes to Wipro Corporate Office, RGA Tech Park & Sarjapur Corridor",
      "Double-Height Grand Entrance Lobby with Concierge & Valet Reception",
      "Eco-Friendly IGBC Gold Rated Construction with Solar Lighting & STP"
    ],
    specs: {
      possession: "March 2030",
      landArea: "2.14 Acres",
      config: "3 BHK Boutique High-Rise Residences (128 Units)",
    },
    floorPlans: [
      {
        type: "3 BHK Middle Unit",
        sba: "1,830 Sq. Ft.",
        carpet: "",
        price: "₹ 2.11 Cr*",
        img: assetzImage('assetz/assetz-muse-and-maison/floor-plans/plan-1.webp'),
      },
      {
        type: "3 BHK Corner Unit",
        sba: "1,881 Sq. Ft.",
        carpet: "",
        price: "₹ 2.17 Cr*",
        img: assetzImage('assetz/assetz-muse-and-maison/floor-plans/plan-2.webp'),
      },
    ],
    amenities: [
      {
        name: "13,000 Sq. Ft. Boutique Resident Clubhouse",
        icon: "fa-solid fa-building-user",
      },
      {
        name: "78% Open Spaces & Zen Landscaped Gardens",
        icon: "fa-solid fa-tree",
      },
      {
        name: "Temperature-Controlled Swimming Pool & Sun Deck",
        icon: "fa-solid fa-person-swimming",
      },
      {
        name: "Padel Tennis Court & Pickleball Courts",
        icon: "fa-solid fa-table-tennis-paddle-ball",
      },
      {
        name: "Fully Equipped Gymnasium & Fitness Center",
        icon: "fa-solid fa-dumbbell",
      },
      {
        name: "Multipurpose Celebration Hall",
        icon: "fa-solid fa-people-roof",
      },
      {
        name: "Children's Adventure Play Zone & Toddler Green",
        icon: "fa-solid fa-child-reaching",
      },
      {
        name: "Terracotta Jaali Screens & Zero-Waste Water Systems",
        icon: "fa-solid fa-leaf",
      },
    ],
    connectivity: [
      {
        label: "Sarjapur Main Road",
        destination: "Sarjapur Main Road, Carmelaram, Bengaluru, Karnataka 560035",
        coordinates: { lat: 12.898, lon: 77.705 },
        distance: "3.0 km",
        icon: "fa-solid fa-route",
      },
      {
        label: "Electronic City Phase 1",
        destination: "Electronic City Phase 1, Bengaluru, Karnataka 560100",
        coordinates: { lat: 12.845, lon: 77.66 },
        distance: "4.5 km",
        icon: "fa-solid fa-briefcase",
      },
      {
        label: "Hosa Road Metro Station (Yellow Line)",
        destination: "Hosa Road Metro Station, Hosur Road, Bengaluru, Karnataka 560100",
        coordinates: { lat: 12.879, lon: 77.653 },
        distance: "5.5 km",
        icon: "fa-solid fa-train-subway",
      },
      {
        label: "Outer Ring Road (ORR) / Bellandur Hub",
        destination: "Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103",
        coordinates: { lat: 12.926, lon: 77.6762 },
        distance: "8.0 km",
        icon: "fa-solid fa-location-dot",
      },
      {
        label: "Koramangala Commercial Hub",
        destination: "Koramangala 5th Block, Bengaluru, Karnataka 560095",
        coordinates: { lat: 12.9352, lon: 77.6245 },
        distance: "11.0 km",
        icon: "fa-solid fa-store",
      },
      {
        label: "Kempegowda International Airport",
        destination: "Kempegowda International Airport, Devanahalli, Bengaluru, Karnataka 560300",
        coordinates: { lat: 13.1986, lon: 77.7066 },
        distance: "48.0 km",
        icon: "fa-solid fa-plane",
      },
    ],
  },
  {
    id: "assetz-mizumi-reserve",
    reraId: "PRM/KA/RERA/1251/310/PR/040226/008450",
    title: "Assetz Mizumi Reserve",
    badge: "New Launch",
    category: "new-launch",
    theme: "80-Acre Japanese-Inspired Nature Sanctuary & Lakefront Living",
    coordinates: { lat: 12.8872, lon: 77.6621 },
    mapsQuery: "Assetz Mizumi Reserve, Kudlu, HSR Extension, Bengaluru",
    location:
      "Kudlu Main Road / Choodasandra, Off HSR Layout Extension & Hosur Road, South-East Bengaluru",
    searchLocation:
      "kudlu choodasandra hsr layout extension hosur road hosa road south east bengaluru",
    price: "₹ 2.56 Cr*",
    mainImg: assetzImage('assetz/assetz-mizumi-reserve/thumbnail.webp'),
    gallery: [
      assetzImage('assetz/assetz-mizumi-reserve/gallery/exterior-view.webp'),
      assetzImage('assetz/assetz-mizumi-reserve/gallery/interior-view.webp'),
      assetzImage('assetz/assetz-mizumi-reserve/gallery/amenities-1.webp'),
    ],
    overview:
      "Assetz Mizumi Reserve is a expansive 80-acre Japanese-inspired lakeside residential township development by Assetz Property Group, located in Kudlu / Choodasandra off HSR Layout Extension and Hosur Road. Featuring 77% open green spaces, Phase 1 spans over 9.5 acres with 3 high-rise towers (22 floors) housing 440 luxury 3 & 4 BHK residences. Anchored by a grand 63,000 sq. ft. clubhouse, units feature large living balconies (up to 170 sq. ft.), laminated wooden flooring in bedrooms, and 3-track UPVC sliding doors with mosquito mesh.",
    highlights: [
      "Serene Lakefront Living with Unobstructed Views of Choodasandra Lake",
      "Ultra-Spacious 3 & 4 BHK Palatial Homes with Deep Viewing Sundecks",
      "Lakeside Promenade, Floating Gazebos & Sunset Viewing Decks",
      "Prime Proximity to HSR Layout, Koramangala & Electronic City Flyover",
      "Over 45 Lifestyle Amenities across a Signature 35,000 Sq. Ft. Club",
      "RERA Certified Sustainable Architecture with Zero-Carbon Water Recycling"
    ],
    specs: {
      possession: "December 2030",
      landArea: "80.00 Acres (Township Master Plan)",
      config:
        "3 & 4 BHK Luxury Lakefront High-Rise Apartments (440 Units in Phase 1)",
    },
    floorPlans: [
      {
        type: "3 BHK Comfort",
        sba: "1,901 Sq. Ft.",
        carpet: "",
        price: "₹ 2.56 Cr*",
        img: assetzImage('assetz/assetz-mizumi-reserve/floor-plans/plan-1.webp'),
      },
      {
        type: "3 BHK Grand",
        sba: "2,165 Sq. Ft.",
        carpet: "",
        price: "₹ 2.85 Cr*",
        img: assetzImage('assetz/assetz-mizumi-reserve/floor-plans/plan-2.webp'),
      },
      {
        type: "4 BHK + Maid's Signature",
        sba: "2,477 Sq. Ft.",
        carpet: "",
        price: "₹ 3.21 Cr*",
        img: assetzImage('assetz/assetz-mizumi-reserve/floor-plans/plan-3.webp'),
      },
    ],
    amenities: [
      {
        name: "63,000 Sq. Ft. Grand Lifestyle Clubhouse",
        icon: "fa-solid fa-building-user",
      },
      {
        name: "77% Open Spaces & Zen Botanical Greenery",
        icon: "fa-solid fa-tree",
      },
      {
        name: "Outdoor Swimming Pools & Toddlers' Splash Deck",
        icon: "fa-solid fa-person-swimming",
      },
      {
        name: "Fully Equipped Gymnasium & Fitness Center",
        icon: "fa-solid fa-dumbbell",
      },
      {
        name: "Large Living Balconies (Up to 170 Sq. Ft.)",
        icon: "fa-solid fa-house-chimney-window",
      },
      {
        name: "Padel, Badminton & Basketball Sports Courts",
        icon: "fa-solid fa-basketball",
      },
      { name: "Pet Park, Library & Amphitheatre", icon: "fa-solid fa-dog" },
      {
        name: "3-Track UPVC Windows & Eco Water Recycling",
        icon: "fa-solid fa-leaf",
      },
    ],
    connectivity: [
      {
        label: "Hosur Main Road",
        destination: "Hosur Main Road, Kudlu Gate, Bengaluru, Karnataka 560068",
        coordinates: { lat: 12.885, lon: 77.65 },
        distance: "1.2 km",
        icon: "fa-solid fa-route",
      },
      {
        label: "Hosa Road Junction / Metro Station (Yellow Line)",
        destination: "Hosa Road Metro Station, Hosur Road, Bengaluru, Karnataka 560100",
        coordinates: { lat: 12.879, lon: 77.653 },
        distance: "1.5 km",
        icon: "fa-solid fa-train-subway",
      },
      {
        label: "HSR Layout Sector 1",
        destination: "HSR Layout Sector 1, Bengaluru, Karnataka 560102",
        coordinates: { lat: 12.911, lon: 77.651 },
        distance: "3.5 km",
        icon: "fa-solid fa-location-dot",
      },
      {
        label: "Outer Ring Road (ORR) Hub",
        destination: "Outer Ring Road Hub, Silk Board / HSR Layout, Bengaluru, Karnataka 560068",
        coordinates: { lat: 12.917, lon: 77.643 },
        distance: "4.0 km",
        icon: "fa-solid fa-route",
      },
      {
        label: "Electronic City Phase 1",
        destination: "Electronic City Phase 1, Bengaluru, Karnataka 560100",
        coordinates: { lat: 12.845, lon: 77.66 },
        distance: "6.0 km",
        icon: "fa-solid fa-briefcase",
      },
      {
        label: "Silk Board Junction",
        destination: "Central Silk Board Junction, Hosur Road, Bengaluru, Karnataka 560068",
        coordinates: { lat: 12.9176, lon: 77.6233 },
        distance: "7.5 km",
        icon: "fa-solid fa-location-dot",
      },
      {
        label: "Kempegowda International Airport",
        destination: "Kempegowda International Airport, Devanahalli, Bengaluru, Karnataka 560300",
        coordinates: { lat: 13.1986, lon: 77.7066 },
        distance: "48.0 km",
        icon: "fa-solid fa-plane",
      },
    ],
  },
  {
    id: "assetz-melodies-of-life-apartments",
    reraId: "PRM/KA/RERA/1251/310/PR/061225/008321",
    title: "Assetz Melodies of Life Apartments",
    badge: "New Launch",
    category: "new-launch",
    theme: "Carbon-Healing Sustainable Eco-Luxe High-Rise Enclave",
    coordinates: { lat: 12.8963, lon: 77.6985 },
    mapsQuery: "Assetz Melodies of Life Apartments, Choodasandra, Sarjapur Road, Bengaluru",
    location:
      "Choodasandra, Off Hosa Road & Sarjapur Road, South-East Bengaluru",
    searchLocation:
      "choodasandra hosa road sarjapur road electronic city hsr layout south east bengaluru",
    price: "₹ 2.38 Cr*",
    mainImg: assetzImage('assetz/assetz-melodies-of-life-apartments/thumbnail.webp'),
    gallery: [
      assetzImage('assetz/assetz-melodies-of-life-apartments/gallery/exterior-view.webp'),
      assetzImage('assetz/assetz-melodies-of-life-apartments/gallery/interior-view.webp'),
      assetzImage('assetz/assetz-melodies-of-life-apartments/gallery/amenities-1.webp'),
    ],
    overview:
      "Assetz Melodies of Life Apartments is a carbon-healing, sustainable luxury residential apartment enclave by Assetz Property Group, located in Choodasandra, off Hosa Road and Sarjapur Road in South-East Bengaluru. Built on a 3.03-acre land parcel, the project comprises 2 high-rise towers (B + G + 13 Floors) offering exclusive 3 BHK residences. The development is part of the larger Melodies of Life township ecosystem, featuring biophilic design, carbon-healing landscapes, energy-efficient fixtures, and access to dual 38,000 sq. ft. clubhouses.",
    highlights: [
      "Harmonious Eco-Luxe Residences Designed around Natural Flora & Water Features",
      "Smart 3 BHK Configurations with High-Ceiling Living Areas & Glass Balconies",
      "Resort-Grade Swimming Pool, Olympic Badminton Courts & Open Amphitheater",
      "Seamless Connectivity to Sarjapur Tech Corridor, Electronic City & Outer Ring Road",
      "75% Open Green Landscaped Grounds with Butterfly Garden & Jogging Circuit",
      "Comprehensive Multi-Tiered Security with Smart Access Intercom"
    ],
    specs: {
      possession: "November 2030",
      landArea: "3.03 Acres (Apartment Parcel)",
      config: "3 BHK Eco-Luxe High-Rise Apartments",
    },
    floorPlans: [
      {
        type: "3 BHK (Type 1)",
        sba: "1,853 Sq. Ft.",
        carpet: "",
        price: "₹ 2.41 Cr*",
        img: assetzImage('assetz/assetz-melodies-of-life-apartments/floor-plans/plan-1.webp'),
      },
      {
        type: "3 BHK (Type 2)",
        sba: "1,827 Sq. Ft.",
        carpet: "",
        price: "₹ 2.38 Cr*",
        img: assetzImage('assetz/assetz-melodies-of-life-apartments/floor-plans/plan-2.webp'),
      },
    ],
    amenities: [
      {
        name: "Dual 38,000 Sq. Ft. Lifestyle & Wellness Clubhouses",
        icon: "fa-solid fa-building-user",
      },
      {
        name: "15,000 Sq. Ft. Miyawaki Urban Forest & Green Cover",
        icon: "fa-solid fa-tree",
      },
      {
        name: "Outdoor Swimming Pool & Children's Splash Pool",
        icon: "fa-solid fa-person-swimming",
      },
      {
        name: "Fully Equipped Gymnasium & Aerobics Studio",
        icon: "fa-solid fa-dumbbell",
      },
      {
        name: "Badminton Courts, Table Tennis & Squash Court",
        icon: "fa-solid fa-table-tennis-paddle-ball",
      },
      {
        name: "Multipurpose Community Celebration Hall",
        icon: "fa-solid fa-people-roof",
      },
      {
        name: "Children's Play Area & Senior Citizen Park",
        icon: "fa-solid fa-child-reaching",
      },
      {
        name: "Zero-Waste Water Management & Solar Common Lighting",
        icon: "fa-solid fa-leaf",
      },
    ],
    connectivity: [
      {
        label: "Notre Dame Academy",
        destination: "Notre Dame Academy, Choodasandra, Bengaluru, Karnataka 560099",
        coordinates: { lat: 12.895, lon: 77.694 },
        distance: "0.8 km",
        icon: "fa-solid fa-school",
      },
      {
        label: "Hosa Road Junction / Metro Station (Yellow Line)",
        destination: "Hosa Road Metro Station, Hosur Road, Bengaluru, Karnataka 560100",
        coordinates: { lat: 12.879, lon: 77.653 },
        distance: "2.5 km",
        icon: "fa-solid fa-train-subway",
      },
      {
        label: "Wipro Corporate Campus (Sarjapur Road)",
        destination: "Wipro Limited Corporate Office, Doddakannelli, Sarjapur Main Road, Bengaluru, Karnataka 560035",
        coordinates: { lat: 12.912, lon: 77.689 },
        distance: "3.5 km",
        icon: "fa-solid fa-briefcase",
      },
      {
        label: "Sarjapur Main Road",
        destination: "Sarjapur Main Road, Carmelaram, Bengaluru, Karnataka 560035",
        coordinates: { lat: 12.898, lon: 77.705 },
        distance: "4.0 km",
        icon: "fa-solid fa-route",
      },
      {
        label: "Electronic City Phase 1",
        destination: "Electronic City Phase 1, Bengaluru, Karnataka 560100",
        coordinates: { lat: 12.845, lon: 77.66 },
        distance: "5.5 km",
        icon: "fa-solid fa-briefcase",
      },
      {
        label: "HSR Layout Sector 1",
        destination: "HSR Layout Sector 1, Bengaluru, Karnataka 560102",
        coordinates: { lat: 12.911, lon: 77.651 },
        distance: "6.0 km",
        icon: "fa-solid fa-location-dot",
      },
      {
        label: "Kempegowda International Airport",
        destination: "Kempegowda International Airport, Devanahalli, Bengaluru, Karnataka 560300",
        coordinates: { lat: 13.1986, lon: 77.7066 },
        distance: "48.0 km",
        icon: "fa-solid fa-plane",
      },
    ],
  },
  {
    id: "assetz-meru-and-meadow",
    reraId: "PRM/KA/RERA/1251/310/PR/130625/007828",
    title: "Assetz Meru & Meadow",
    badge: "Ongoing",
    category: "ongoing",
    theme: "Sustainable High-Rise Nature Sanctuary with 87% Open Space",
    coordinates: { lat: 12.8864, lon: 77.5452 },
    mapsQuery: "Assetz Meru and Meadow, Doddakallasandra, Kanakapura Road, Bengaluru",
    location: "Doddakallasandra, Off Kanakapura Main Road, South Bengaluru",
    searchLocation:
      "kanakapura road doddakallasandra vasanthapura south bengaluru nice road metro",
    price: "₹ 2.55 Cr*",
    mainImg: assetzImage('assetz/assetz-meru-and-meadow/thumbnail.webp'),
    gallery: [
      assetzImage('assetz/assetz-meru-and-meadow/gallery/exterior-view.webp'),
      assetzImage('assetz/assetz-meru-and-meadow/gallery/interior-view.webp'),
      assetzImage('assetz/assetz-meru-and-meadow/gallery/amenities-1.webp'),
    ],
    overview:
      "Assetz Meru & Meadow is a premium eco-luxe high-rise residential development by Assetz Property Group located just off Kanakapura Road near Doddakallasandra in South Bengaluru. Spread across 5 acres with an impressive 87% open green area, the project comprises 2 high-rise towers (2B + Ground + 30 Floors) offering around 520 spacious luxury 3 BHK residences. Anchored by a massive 63,000 sq. ft. clubhouse and over 30 lifestyle amenities, the development emphasizes sustainable design, high carpet efficiency, and seamless connectivity via the nearby Namma Metro line.",
    highlights: [
      "Majestic High-Rise Towers Overlooking the Turahalli Forest Reserve",
      "3 BHK Residences with French Windows and Wide Private Terraces",
      "Walking Distance to Doddakallasandra Metro Station (Green Line)",
      "Signature Clubhouse with Squash Court, Billiards & Aerobics Studio",
      "Pedestrian-Friendly Podium with Lush Meadow Gardens & Senior Citizen Pavilion",
      "100% Vaastu Compliant Homes with Premium CP Fittings & Vitrified Finishes"
    ],
    specs: {
      possession: "December 2030",
      landArea: "5.00 Acres",
      config: "Spacious 3 BHK Luxury High-Rise Apartments (520 Units)",
    },
    floorPlans: [
      {
        type: "3 BHK Comfort",
        sba: "1,897 Sq. Ft.",
        carpet: "",
        price: "₹ 2.55 Cr*",
        img: assetzImage('assetz/assetz-meru-and-meadow/floor-plans/plan-1.webp'),
      },
      {
        type: "3 BHK Grand",
        sba: "2,061 Sq. Ft.",
        carpet: "",
        price: "₹ 2.72 Cr*",
        img: assetzImage('assetz/assetz-meru-and-meadow/floor-plans/plan-2.webp'),
      },
      {
        type: "3 BHK Signature",
        sba: "2,111 Sq. Ft.",
        carpet: "",
        price: "₹ 2.95 Cr*",
        img: assetzImage('assetz/assetz-meru-and-meadow/floor-plans/plan-3.webp'),
      },
    ],
    amenities: [
      {
        name: "63,000 Sq. Ft. Grand Lifestyle Clubhouse",
        icon: "fa-solid fa-building-user",
      },
      {
        name: "87% Open Green Spaces & Landscaped Parks",
        icon: "fa-solid fa-tree",
      },
      {
        name: "Temperature-Controlled Infinity Pool & Kids' Pool",
        icon: "fa-solid fa-person-swimming",
      },
      {
        name: "Fully Equipped Gymnasium & Yoga Deck",
        icon: "fa-solid fa-dumbbell",
      },
      {
        name: "Padel Tennis, Pickleball & Badminton Courts",
        icon: "fa-solid fa-table-tennis-paddle-ball",
      },
      {
        name: "Co-Working Spaces & Multipurpose Party Hall",
        icon: "fa-solid fa-laptop",
      },
      { name: "Dedicated Pet Park & Amphitheatre", icon: "fa-solid fa-dog" },
      {
        name: "Solar Water Heating & Rainwater Harvesting Systems",
        icon: "fa-solid fa-solar-panel",
      },
    ],
    connectivity: [
      {
        label: "Doddakallasandra Metro Station",
        destination: "Doddakallasandra Metro Station, Kanakapura Road, Bengaluru, Karnataka 560062",
        coordinates: { lat: 12.886, lon: 77.545 },
        distance: "0.1 km",
        icon: "fa-solid fa-train-subway",
      },
      {
        label: "Kanakapura Main Road",
        destination: "Kanakapura Main Road (NH 948), Bengaluru, Karnataka 560062",
        coordinates: { lat: 12.887, lon: 77.546 },
        distance: "0.2 km",
        icon: "fa-solid fa-route",
      },
      {
        label: "Forum South Bangalore Mall (Kanakapura Road)",
        destination: "Forum South Bangalore Mall, Kanakapura Road, Konanakunte, Bengaluru, Karnataka 560062",
        coordinates: { lat: 12.895, lon: 77.552 },
        distance: "2.0 km",
        icon: "fa-solid fa-store",
      },
      {
        label: "NICE Road Junction",
        destination: "NICE Road Junction, Kanakapura Road, Bengaluru, Karnataka 560062",
        coordinates: { lat: 12.868, lon: 77.542 },
        distance: "3.0 km",
        icon: "fa-solid fa-road",
      },
      {
        label: "Banashankari",
        destination: "Banashankari Bus Station / Temple, Bengaluru, Karnataka 560070",
        coordinates: { lat: 12.9255, lon: 77.5468 },
        distance: "5.6 km",
        icon: "fa-solid fa-location-dot",
      },
      {
        label: "Electronic City via NICE Road",
        destination: "Electronic City via NICE Peripheral Ring Road, Bengaluru, Karnataka 560100",
        coordinates: { lat: 12.845, lon: 77.66 },
        distance: "13.3 km",
        icon: "fa-solid fa-briefcase",
      },
      {
        label: "Kempegowda International Airport",
        destination: "Kempegowda International Airport, Devanahalli, Bengaluru, Karnataka 560300",
        coordinates: { lat: 13.1986, lon: 77.7066 },
        distance: "47.0 km",
        icon: "fa-solid fa-plane",
      },
    ],
  },
  {
    id: "assetz-zen-and-sato",
    reraId: "PRM/KA/RERA/1251/472/PR/080525/007728",
    title: "Assetz Zen & Sato",
    badge: "New Launch",
    category: "new-launch",
    theme: "Quiet Luxury & Japanese-Inspired Eco-Luxe High-Rise Enclave",
    coordinates: { lat: 13.1245, lon: 77.6324 },
    mapsQuery: "Assetz Zen and Sato, Sathanur, Bagalur Road, Yelahanka, Bengaluru",
    location: "Sathanur, Off Bagalur Main Road, Yelahanka, North Bengaluru",
    searchLocation:
      "yelahanka sathanur bagalur main road cogelu cross airport corridor north bengaluru",
    price: "₹ 2.98 Cr*",
    mainImg: assetzImage('assetz/assetz-zen-and-sato/thumbnail.webp'),
    gallery: [
      assetzImage('assetz/assetz-zen-and-sato/gallery/exterior-view.webp'),
      assetzImage('assetz/assetz-zen-and-sato/gallery/interior-view.webp'),
      assetzImage('assetz/assetz-zen-and-sato/gallery/amenities-1.webp'),
    ],
    overview:
      "Assetz Zen & Sato is a Japanese-inspired quiet luxury high-rise residential project by Assetz Property Group, located in Sathanur off Bagalur Main Road in Yelahanka, North Bengaluru. Spanning 7.0 acres with 74% open green spaces, the project features 4 high-rise towers (2B + G + 14 Floors) comprising 412 spacious luxury residences. Designed around biophilic principles with large living balconies (up to 216 sq. ft.), the development offers dedicated padel and pickleball courts, a community farmers' market, and high carpet efficiency.",
    highlights: [
      "Contemporary Minimalist Japanese Architectural Philosophy with Natural Light",
      "Expansive 3 & 4 BHK Luxury Residences with Dedicated Work-From-Home Niches",
      "10 Minutes to North Bengaluru IT Investment Region (ITIR) & Airport Toll",
      "Clubhouse with Indoor Badminton, Bowling Alley, Sauna & Yoga Pavilion",
      "Over 80% Verdant Open Space Featuring Zen Stone Gardens & Water Cascades",
      "Comprehensive 24/7 Security with Biometric Access & CCTV Coverage"
    ],
    specs: {
      possession: "May 2030",
      landArea: "7.00 Acres",
      config: "3 & 4 BHK High-Rise Luxury Residences (412 Units)",
    },
    floorPlans: [
      {
        type: "3 BHK",
        sba: "2,159 Sq. Ft.",
        carpet: "",
        price: "₹ 2.98 Cr*",
        img: assetzImage('assetz/assetz-zen-and-sato/floor-plans/plan-1.webp'),
      },
      {
        type: "4 BHK",
        sba: "2,955 Sq. Ft.",
        carpet: "",
        price: "₹ 4.13 Cr*",
        img: assetzImage('assetz/assetz-zen-and-sato/floor-plans/plan-2.webp'),
      },
    ],
    amenities: [
      {
        name: "Grand Modern Lifestyle Clubhouse",
        icon: "fa-solid fa-building-user",
      },
      {
        name: "74% Open Spaces & Zen Botanical Podium Gardens",
        icon: "fa-solid fa-tree",
      },
      {
        name: "Outdoor Swimming Pool & Children's Splash Deck",
        icon: "fa-solid fa-person-swimming",
      },
      {
        name: "Dedicated Padel & Pickleball Courts",
        icon: "fa-solid fa-table-tennis-paddle-ball",
      },
      {
        name: "Fully Equipped Gymnasium & Yoga Deck",
        icon: "fa-solid fa-dumbbell",
      },
      {
        name: "Community Farmers' Market Space",
        icon: "fa-solid fa-basket-shopping",
      },
      {
        name: "Large Living Balconies (Up to 216 Sq. Ft.)",
        icon: "fa-solid fa-house-chimney-window",
      },
      {
        name: "Zero-Waste Water Management & Sponge-Effect Design",
        icon: "fa-solid fa-leaf",
      },
    ],
    connectivity: [
      {
        label: "REVA University",
        destination: "REVA University, Kattigenahalli, Yelahanka, Bengaluru, Karnataka 560064",
        coordinates: { lat: 13.114, lon: 77.635 },
        distance: "1.0 km",
        icon: "fa-solid fa-school",
      },
      {
        label: "Bagalur Main Road",
        destination: "Bagalur Main Road, Sathanur, Bengaluru, Karnataka 560064",
        coordinates: { lat: 13.129, lon: 77.638 },
        distance: "1.2 km",
        icon: "fa-solid fa-route",
      },
      {
        label: "Delhi Public School (Yelahanka)",
        destination: "Delhi Public School Bangalore North, Bagalur Post, Yelahanka, Bengaluru, Karnataka 560064",
        coordinates: { lat: 13.128, lon: 77.615 },
        distance: "3.5 km",
        icon: "fa-solid fa-school",
      },
      {
        label: "Bellary Road (NH 44)",
        destination: "Bellary Road (NH 44), Sahakar Nagar, Bengaluru, Karnataka 560092",
        coordinates: { lat: 13.085, lon: 77.595 },
        distance: "5.0 km",
        icon: "fa-solid fa-route",
      },
      {
        label: "Yelahanka Junction Railway Station",
        destination: "Yelahanka Junction Railway Station, Yelahanka, Bengaluru, Karnataka 560064",
        coordinates: { lat: 13.1008, lon: 77.5963 },
        distance: "6.5 km",
        icon: "fa-solid fa-train",
      },
      {
        label: "Manyata Tech Park",
        destination: "Manyata Embassy Business Park, Nagawara, Bengaluru, Karnataka 560045",
        coordinates: { lat: 13.048, lon: 77.62 },
        distance: "11.0 km",
        icon: "fa-solid fa-briefcase",
      },
      {
        label: "Kempegowda International Airport",
        destination: "Kempegowda International Airport, Devanahalli, Bengaluru, Karnataka 560300",
        coordinates: { lat: 13.1986, lon: 77.7066 },
        distance: "18.0 km",
        icon: "fa-solid fa-plane",
      },
    ],
  },
  {
    id: "assetz-the-secret-lake",
    reraId: "PRM/KA/RERA/1250/303/PR/020425/007646",
    title: "Assetz The Secret Lake",
    badge: "Ongoing",
    category: "ongoing",
    theme: "191-Acre Lakeside Eco-Luxe Plotted Community Sanctuary",
    coordinates: { lat: 13.2421, lon: 77.6954 },
    mapsQuery: "Assetz The Secret Lake, IVC Road, Devanahalli, Bengaluru",
    location: "Off IVC Road, Devanahalli, North Bengaluru",
    searchLocation:
      "devanahalli ivc road airport corridor north bengaluru plots",
    price: "₹ 78.00 L*",
    mainImg: assetzImage('assetz/assetz-the-secret-lake/thumbnail.webp'),
    gallery: [
      assetzImage('assetz/assetz-the-secret-lake/gallery/exterior-view.webp'),
      assetzImage('assetz/assetz-the-secret-lake/gallery/interior-view.webp'),
      assetzImage('assetz/assetz-the-secret-lake/gallery/amenities-1.webp'),
    ],
    overview:
      "Assetz The Secret Lake is a premium, nature-infused residential plotted development by Assetz Property Group, situated off IVC Road in Devanahalli, North Bengaluru. Bordering a natural 191-acre lake, the master-planned project spans over 44.18 acres with 20+ acres dedicated to lush green open spaces and forest corridors. Featuring 701 villa plots, the gated enclave is anchored by a 19,000 sq. ft. modern lifestyle clubhouse and wide chamber-free internal road networks designed for custom luxury villa living.",
    highlights: [
      "Exclusive 701-Unit Gated Plotted Enclave Surrounding a Natural Lake",
      "Ready-to-Construct Villa Plots with Individual Water, Power & Fiber Ducts",
      "Private Waterfront Promenade, Boardwalks & Angling Pavilions",
      "Quick 15-Minute Drive to Kempegowda International Airport Terminals",
      "Grand 30,000 Sq. Ft. Resort Club with Squash, Tennis & Banquet Lawn",
      "Karnataka RERA Registered with Clear BDA / BIAAPA Title Approvals"
    ],
    specs: {
      possession: "March 2030",
      landArea: "45 Acres",
      config: "Residential Villa Plots — 701 Total Plots",
    },
    floorPlans: [
      {
        type: "30 x 40 Plot",
        sba: "1,200 Sq. Ft.",
        carpet: "",
        price: "₹ 78.00 L*",
        img: assetzImage('assetz/assetz-the-secret-lake/floor-plans/plan-1.webp'),
      },
      {
        type: "30 x 50 Plot",
        sba: "1,500 Sq. Ft.",
        carpet: "",
        price: "₹ 97.50 L*",
        img: assetzImage('assetz/assetz-the-secret-lake/floor-plans/plan-2.webp'),
      },
      {
        type: "30 x 60 Plot",
        sba: "2,400 Sq. Ft. ",
        carpet: "",
        price: "₹ 1.56 Cr*",
        img: assetzImage('assetz/assetz-the-secret-lake/floor-plans/plan-3.webp'),
      },
      {
        type: "Odd Plots",
        sba: "3,200 Sq. Ft.",
        carpet: "",
        price: "₹ 2.08 Cr*",
        img: assetzImage('assetz/assetz-the-secret-lake/floor-plans/plan-4.webp'),
      },
    ],
    amenities: [
      {
        name: "19,000 Sq. Ft. Grand Lifestyle Clubhouse",
        icon: "fa-solid fa-building-user",
      },
      {
        name: "191-Acre Natural Lake View Promenade",
        icon: "fa-solid fa-water",
      },
      {
        name: "20+ Acres Dedicated Greenery & Forest Parks",
        icon: "fa-solid fa-tree",
      },
      {
        name: "Adults' Swimming Pool & Kids' Splash Deck",
        icon: "fa-solid fa-person-swimming",
      },
      {
        name: "Fully Equipped Gymnasium & Fitness Center",
        icon: "fa-solid fa-dumbbell",
      },
      {
        name: "Dedicated Cycling Tracks & Pedestrian Pathways",
        icon: "fa-solid fa-person-biking",
      },
      {
        name: "Children's Adventure Play Area & Pet Park",
        icon: "fa-solid fa-child-reaching",
      },
      {
        name: "Underground Power, Water & Sewage Networks",
        icon: "fa-solid fa-plug",
      },
    ],
    connectivity: [
      {
        label: "IVC Road Corridor",
        destination: "IVC Road Corridor, Devanahalli, Bengaluru, Karnataka 562110",
        coordinates: { lat: 13.238, lon: 77.692 },
        distance: "0.5 km",
        icon: "fa-solid fa-route",
      },
      {
        label: "Doddaballapura Main Road",
        destination: "Doddaballapura Main Road (SH 9), Bengaluru Rural, Karnataka 561203",
        coordinates: { lat: 13.22, lon: 77.565 },
        distance: "3.2 km",
        icon: "fa-solid fa-route",
      },
      {
        label: "National Highway 44 (NH 44)",
        destination: "National Highway 44 (NH 44), Devanahalli Bypass, Bengaluru, Karnataka 562110",
        coordinates: { lat: 13.245, lon: 77.712 },
        distance: "11.0 km",
        icon: "fa-solid fa-route",
      },
      {
        label: "Padukone-Dravid Centre for Sports Excellence",
        destination: "Padukone-Dravid Centre for Sports Excellence, Bettahalasuru, Bengaluru, Karnataka 562157",
        coordinates: { lat: 13.189, lon: 77.648 },
        distance: "11.0 km",
        icon: "fa-solid fa-volleyball",
      },
      {
        label: "KIADB Aerospace SEZ & Hardware Park",
        destination: "KIADB Aerospace SEZ & Hardware Park, Bagalur, Bengaluru, Karnataka 562149",
        coordinates: { lat: 13.185, lon: 77.728 },
        distance: "15.0 km",
        icon: "fa-solid fa-briefcase",
      },
      {
        label: "Bengaluru Signature Business Park",
        destination: "Bengaluru Signature Business Park, Devanahalli, Bengaluru, Karnataka 562300",
        coordinates: { lat: 13.208, lon: 77.712 },
        distance: "17.7 km",
        icon: "fa-solid fa-building",
      },
      {
        label: "Kempegowda International Airport",
        destination: "Kempegowda International Airport, Devanahalli, Bengaluru, Karnataka 560300",
        coordinates: { lat: 13.1986, lon: 77.7066 },
        distance: "20.0 km",
        icon: "fa-solid fa-plane",
      },
    ],
  },
  {
    id: "assetz-trees-and-tandem",
    reraId: "PRM/KA/RERA/1251/308/PR/280325/007636",
    title: "Assetz Trees & Tandem",
    badge: "New Launch",
    category: "new-launch",
    theme:
      "Biophilic Sustainable Eco-Luxe High-Rise Enclave with 90% Open Space",
    coordinates: { lat: 12.8893, lon: 77.7215 },
    mapsQuery: "Assetz Trees and Tandem, Kodathi, Sarjapur Road, Bengaluru",
    location: "Kodathi / Chokkasandra, Off Sarjapur Road, South-East Bengaluru",
    searchLocation:
      "kodathi chokkasandra sarjapur road huskur road rga tech park south east bengaluru",
    price: "₹ 2.26 Cr*",
    mainImg: assetzImage('assetz/assetz-trees-and-tandem/thumbnail.webp'),
    gallery: [
      assetzImage('assetz/assetz-trees-and-tandem/gallery/exterior-view.webp'),
      assetzImage('assetz/assetz-trees-and-tandem/gallery/interior-view.webp'),
      assetzImage('assetz/assetz-trees-and-tandem/gallery/amenities-1.webp'),
    ],
    overview:
      "Assetz Trees & Tandem is a biophilic, eco-conscious high-rise residential project by Assetz Property Group, located in Kodathi / Chokkasandra off Sarjapur Road in South-East Bengaluru. Spanning 7.0 acres with a rare 90% open green space cover, the development features 2 high-rise towers (22 floors) housing 364 luxury 3 BHK residences. Designed with private elevated garden spaces, wide living balconies (115 to 170 sq. ft.), laminated wooden bedroom flooring, and 3-track UPVC sliding windows, the project is anchored by a grand 3-acre clubhouse and 30+ lifestyle amenities.",
    highlights: [
      "Nature-Centric Urban Living with over 1,000 Mature Trees on Site",
      "Airy 3 BHK Apartments with Generous Balconies Overlooking Canopy Greens",
      "Direct Access to Sarjapur Main Road, Carmelarampura Station & Top Schools",
      "Elevated Skywalk, Treehouse Cabanas & Children's Forest Adventure Trail",
      "State-of-the-Art Wellness Club with Temperature-Controlled Lap Pool",
      "Rainwater Harvesting, Organic Waste Converters & Solar Common Lighting"
    ],
    specs: {
      possession: "August 2029",
      landArea: "7.00 Acres",
      config: "Spacious 3 BHK Luxury High-Rise Residences (364 Units)",
    },
    floorPlans: [
      {
        type: "3 BHK (Type A)",
        sba: "2,142 Sq. Ft.",
        carpet: "",
        price: "₹ 2.46 Cr*",
        img: assetzImage('assetz/assetz-trees-and-tandem/floor-plans/plan-1.webp'),
      },
      {
        type: "3 BHK (Type B)",
        sba: "1,885 Sq. Ft.",
        carpet: "",
        price: "₹ 2.26 Cr*",
        img: assetzImage('assetz/assetz-trees-and-tandem/floor-plans/plan-2.webp'),
      },
    ],
    amenities: [
      {
        name: "3-Acre Grand Lifestyle Clubhouse",
        icon: "fa-solid fa-building-user",
      },
      {
        name: "90% Dedicated Open Green Spaces & Organic Gardens",
        icon: "fa-solid fa-tree",
      },
      {
        name: "Outdoor Swimming Pool & Children's Splash Deck",
        icon: "fa-solid fa-person-swimming",
      },
      {
        name: "Fully Equipped Gymnasium & Yoga Deck",
        icon: "fa-solid fa-dumbbell",
      },
      {
        name: "Tennis, Badminton Courts & Skating Rink",
        icon: "fa-solid fa-basketball",
      },
      {
        name: "Co-Working Lounge & Multipurpose Party Hall",
        icon: "fa-solid fa-laptop",
      },
      {
        name: "Children's Play Area & Outdoor Amphitheatre",
        icon: "fa-solid fa-child-reaching",
      },
      {
        name: "3-Track UPVC Windows & Zero-Waste Water Systems",
        icon: "fa-solid fa-leaf",
      },
    ],
    connectivity: [
      {
        label: "Sarjapur Main Road",
        destination: "Sarjapur Main Road, Carmelaram, Bengaluru, Karnataka 560035",
        coordinates: { lat: 12.898, lon: 77.705 },
        distance: "1.5 km",
        icon: "fa-solid fa-route",
      },
      {
        label: "RGA Tech Park",
        destination: "RGA Tech Park, Sarjapur Main Road, Carmelaram, Bengaluru, Karnataka 560035",
        coordinates: { lat: 12.898, lon: 77.729 },
        distance: "5.5 km",
        icon: "fa-solid fa-briefcase",
      },
      {
        label: "Wipro Corporate Office (Sarjapur Road)",
        destination: "Wipro Corporate Office, Doddakannelli, Sarjapur Road, Bengaluru, Karnataka 560035",
        coordinates: { lat: 12.912, lon: 77.689 },
        distance: "6.0 km",
        icon: "fa-solid fa-briefcase",
      },
      {
        label: "Decathlon Sarjapur",
        destination: "Decathlon Sarjapur, Doddakannelli, Bengaluru, Karnataka 560035",
        coordinates: { lat: 12.906, lon: 77.698 },
        distance: "7.0 km",
        icon: "fa-solid fa-store",
      },
      {
        label: "Electronic City Phase 1",
        destination: "Electronic City Phase 1, Bengaluru, Karnataka 560100",
        coordinates: { lat: 12.845, lon: 77.66 },
        distance: "9.0 km",
        icon: "fa-solid fa-briefcase",
      },
      {
        label: "Outer Ring Road (ORR) / Bellandur Hub",
        destination: "Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103",
        coordinates: { lat: 12.926, lon: 77.6762 },
        distance: "10.0 km",
        icon: "fa-solid fa-location-dot",
      },
      {
        label: "Kempegowda International Airport",
        destination: "Kempegowda International Airport, Devanahalli, Bengaluru, Karnataka 560300",
        coordinates: { lat: 13.1986, lon: 77.7066 },
        distance: "49.0 km",
        icon: "fa-solid fa-plane",
      },
    ],
  },
  {
    id: "assetz-ren-and-rei",
    reraId: "PRM/KA/RERA/1251/446/PR/130225/007501",
    title: "Assetz Ren & Rei",
    badge: "Ongoing",
    category: "ongoing",
    theme: "Boutique Japanese-Inspired Uncrowded Eco-Luxe High-Rise Living",
    coordinates: { lat: 12.8914, lon: 77.7023 },
    mapsQuery: "Assetz Ren and Rei, Gattahalli, Sarjapur Road, Bengaluru",
    location:
      "Gattahalli, Off Rayasandra Main Road & Hosa Road / Sarjapur Road, South-East Bengaluru",
    searchLocation:
      "gattahalli rayasandra main road hosa road sarjapur road electronic city hsr layout south east bengaluru",
    price: "₹ 1.89 Cr*",
    mainImg: assetzImage('assetz/assetz-ren-and-rei/thumbnail.webp'),
    gallery: [
      assetzImage('assetz/assetz-ren-and-rei/gallery/exterior-view.webp'),
      assetzImage('assetz/assetz-ren-and-rei/gallery/interior-view.webp'),
      assetzImage('assetz/assetz-ren-and-rei/gallery/amenities-1.webp'),
    ],
    overview:
      "Assetz Ren & Rei is a Japanese-inspired boutique high-rise residential project by Assetz Property Group, located in Gattahalli, off Rayasandra Main Road and Hosa Road near Sarjapur Road in South-East Bengaluru. Spanning 3.79 acres with over 73% open spaces, the development features 2 high-rise towers (Basement + Ground + 13 Floors) housing just 218 premium 3 BHK residences (only 4 units per floor per core). Anchored by a 14,000 sq. ft. clubhouse and biophilic landscaping, the homes are designed with zero wasted corridor space, laminated wooden bedroom flooring, and 3-track UPVC windows.",
    highlights: [
      "Exclusive Boutique Enclave with Only 218 Handcrafted 3 BHK Units",
      "Japanese Aesthetic with Clean Linear Profiles and Acoustic Double Glazing",
      "Proximity to Decathlon, Greenwood High, Inventure Academy & Primus",
      "Rooftop Wellness Spa, Hydrotherapy Pool & Outdoor Screening Deck",
      "Zero Vehicular Movement on Ground Level for Safe Family Strolls",
      "Full Power Backup, EV Charging Points & Dedicated Delivery Bays"
    ],
    specs: {
      possession: "January 2029",
      landArea: "3.79 Acres",
      config: "Exclusive 3 BHK Boutique High-Rise Residences (218 Units)",
    },
    floorPlans: [
      {
        type: "3 BHK (Type 1)",
        sba: "1,796 Sq. Ft.",
        carpet: "",
        price: "₹ 1.89 Cr*",
        img: assetzImage('assetz/assetz-ren-and-rei/floor-plans/plan-1.webp'),
      },
      {
        type: "3 BHK (Type 2)",
        sba: "1,821 Sq. Ft.",
        carpet: "",
        price: "₹ 1.92 Cr*",
        img: assetzImage('assetz/assetz-ren-and-rei/floor-plans/plan-2.webp'),
      },
    ],
    amenities: [
      {
        name: "14,000 Sq. Ft. Japanese-Inspired Resident Clubhouse",
        icon: "fa-solid fa-building-user",
      },
      {
        name: "73% Open Spaces & Zen Botanical Landscaped Gardens",
        icon: "fa-solid fa-tree",
      },
      {
        name: "Outdoor Swimming Pool & Children's Splash Pool",
        icon: "fa-solid fa-person-swimming",
      },
      {
        name: "Fully Equipped Gymnasium & Fitness Center",
        icon: "fa-solid fa-dumbbell",
      },
      { name: "Steam, Sauna & Wellness Spa", icon: "fa-solid fa-spa" },
      {
        name: "Indoor Games Zone & Multipurpose Party Lounge",
        icon: "fa-solid fa-people-roof",
      },
      {
        name: "Children's Play Area & Dedicated Pet Park",
        icon: "fa-solid fa-dog",
      },
      {
        name: "3-Track UPVC Windows & Zero-Waste Water Systems",
        icon: "fa-solid fa-leaf",
      },
    ],
    connectivity: [
      {
        label: "PES University (Electronic City Campus)",
        destination: "PES University Electronic City Campus, Hosur Road, Bengaluru, Karnataka 560100",
        coordinates: { lat: 12.883, lon: 77.695 },
        distance: "1.0 km",
        icon: "fa-solid fa-school",
      },
      {
        label: "Hosa Road / Rayasandra Main Road Junction",
        destination: "Rayasandra Main Road, Hosa Road Junction, Bengaluru, Karnataka 560099",
        coordinates: { lat: 12.881, lon: 77.689 },
        distance: "1.5 km",
        icon: "fa-solid fa-route",
      },
      {
        label: "Hosa Road Metro Station (Yellow Line)",
        destination: "Hosa Road Metro Station, Hosur Road, Bengaluru, Karnataka 560100",
        coordinates: { lat: 12.879, lon: 77.653 },
        distance: "3.0 km",
        icon: "fa-solid fa-train-subway",
      },
      {
        label: "Electronic City Phase 1 & 2",
        destination: "Electronic City Phase 1 & 2, Bengaluru, Karnataka 560100",
        coordinates: { lat: 12.845, lon: 77.665 },
        distance: "3.2 km",
        icon: "fa-solid fa-briefcase",
      },
      {
        label: "Sarjapur Main Road Hub",
        destination: "Sarjapur Main Road Commercial Hub, Bengaluru, Karnataka 560035",
        coordinates: { lat: 12.902, lon: 77.708 },
        distance: "4.5 km",
        icon: "fa-solid fa-route",
      },
      {
        label: "Outer Ring Road (ORR) / Bellandur",
        destination: "Outer Ring Road Bellandur Flyover, Bengaluru, Karnataka 560103",
        coordinates: { lat: 12.926, lon: 77.6762 },
        distance: "8.5 km",
        icon: "fa-solid fa-location-dot",
      },
      {
        label: "Kempegowda International Airport",
        destination: "Kempegowda International Airport, Devanahalli, Bengaluru, Karnataka 560300",
        coordinates: { lat: 13.1986, lon: 77.7066 },
        distance: "48.0 km",
        icon: "fa-solid fa-plane",
      },
    ],
  },
  {
    id: "assetz-22-and-crest",
    reraId: "PRM/KA/RERA/1251/309/PR/170915/000219",
    title: "Assetz 22 & Crest",
    badge: "Ready to Move",
    category: "ready-to-move",
    theme: "Ultra-Luxury Urban High-Rise Sanctuary with 79% Open Space",
    coordinates: { lat: 13.0182, lon: 77.5512 },
    mapsQuery: "Assetz 22 and Crest, Yeshwanthpur, Bengaluru",
    location:
      "Yeshwanthpur Industrial Suburb, Near Mahalakshmi Layout, Yeshwanthpur, West Bengaluru",
    searchLocation:
      "yeshwanthpur mahalakshmi layout chord road west bengaluru metro station",
    price: "₹ 2.58 Cr*",
    mainImg: assetzImage('assetz/assetz-22-and-crest/thumbnail.webp'),
    gallery: [
      assetzImage('assetz/assetz-22-and-crest/gallery/exterior-view.webp'),
      assetzImage('assetz/assetz-22-and-crest/gallery/interior-view.webp'),
      assetzImage('assetz/assetz-22-and-crest/gallery/amenities-1.webp'),
    ],
    overview:
      "Assetz 22 & Crest is a luxury high-rise residential project by Assetz Property Group, located in the Yeshwanthpur Industrial Suburb near Mahalakshmi Layout in West Bengaluru. Spanning 1.79 acres with 79% dedicated open green space, the project comprises 2 high-rise towers featuring 122 spacious 3 BHK luxury residences. Designed to optimize natural light and airflow, the community offers state-of-the-art sports facilities, a modern clubhouse, and rapid access to major transit hubs and commercial centers.",
    highlights: [
      "Iconic High-Rise Landmark Situated in the Heart of Yeshwanthpur",
      "5 Minutes to Sandal Soap Factory & Yeshwanthpur Metro Stations",
      "Luxury 3 BHK Homes with Panoramic City Skyline Views from High Floors",
      "Sky Fitness Center, Heated Swimming Pool & Executive Business Lounge",
      "Direct Connectivity to Malleshwaram, Rajajinagar & Columbia Asia Hospital",
      "World-Class Acoustical Isolation and Mivan High-Precision Construction"
    ],
    specs: {
      possession: "March 2022",
      landArea: "1.79 Acres",
      config: "3 BHK Luxury High-Rise Apartments",
    },
    floorPlans: [
      {
        type: "3 BHK 2T",
        sba: "1,518 Sq. Ft.",
        carpet: "",
        price: "₹ 2.58 Cr*",
        img: assetzImage('assetz/assetz-22-and-crest/floor-plans/plan-1.webp'),
      },
      {
        type: "3 BHK 3T",
        sba: "1,931 Sq. Ft.",
        carpet: "",
        price: "₹ 3.28 Cr*",
        img: assetzImage('assetz/assetz-22-and-crest/floor-plans/plan-2.webp'),
      },
    ],
    amenities: [
      {
        name: "Modern Resident Clubhouse & Multipurpose Hall",
        icon: "fa-solid fa-building-user",
      },
      {
        name: "79% Dedicated Open Green Spaces & Landscaped Gardens",
        icon: "fa-solid fa-tree",
      },
      {
        name: "Swimming Pool & Kids' Pool",
        icon: "fa-solid fa-person-swimming",
      },
      {
        name: "Fully Equipped Fitness Center & Gymnasium",
        icon: "fa-solid fa-dumbbell",
      },
      { name: "Steam, Sauna Room & Spa Lounge", icon: "fa-solid fa-spa" },
      {
        name: "Table Tennis & Indoor Games Recreation Zone",
        icon: "fa-solid fa-table-tennis-paddle-ball",
      },
      {
        name: "Children's Adventure Play Area & Garden Lounge",
        icon: "fa-solid fa-child-reaching",
      },
      {
        name: "24/7 Gated Security & Complete Power Backup",
        icon: "fa-solid fa-shield-halved",
      },
    ],
    connectivity: [
      {
        label: "Yeshwanthpur Metro Station (Green Line)",
        destination: "Yeshwanthpur Metro Station, Tumkur Road, Bengaluru, Karnataka 560022",
        coordinates: { lat: 13.023, lon: 77.55 },
        distance: "1.0 km",
        icon: "fa-solid fa-train-subway",
      },
      {
        label: "Yeshwanthpur Junction Railway Station",
        destination: "Yeshwanthpur Junction Railway Station, Bengaluru, Karnataka 560022",
        coordinates: { lat: 13.024, lon: 77.551 },
        distance: "1.5 km",
        icon: "fa-solid fa-train",
      },
      {
        label: "Orion Mall & World Trade Center (Rajajinagar)",
        destination: "Orion Mall, Brigade Gateway, Dr Rajkumar Road, Rajajinagar, Bengaluru, Karnataka 560055",
        coordinates: { lat: 13.011, lon: 77.555 },
        distance: "2.5 km",
        icon: "fa-solid fa-store",
      },
      {
        label: "Manipal Hospital Rajajinagar",
        destination: "Manipal Hospital Malleshwaram / Rajajinagar, Bengaluru, Karnataka 560003",
        coordinates: { lat: 12.998, lon: 77.557 },
        distance: "3.0 km",
        icon: "fa-solid fa-hospital",
      },
      {
        label: "ISKCON Temple Rajajinagar",
        destination: "ISKCON Temple Bangalore, Hare Krishna Hill, Rajajinagar, Bengaluru, Karnataka 560010",
        coordinates: { lat: 13.009, lon: 77.551 },
        distance: "3.2 km",
        icon: "fa-solid fa-gopuram",
      },
      {
        label: "Majestic Railway Station / Bus Stand",
        destination: "Krantivira Sangolli Rayanna (Majestic) Railway Station, Bengaluru, Karnataka 560023",
        coordinates: { lat: 12.977, lon: 77.571 },
        distance: "8.0 km",
        icon: "fa-solid fa-location-dot",
      },
      {
        label: "Kempegowda International Airport",
        destination: "Kempegowda International Airport, Devanahalli, Bengaluru, Karnataka 560300",
        coordinates: { lat: 13.1986, lon: 77.7066 },
        distance: "35.0 km",
        icon: "fa-solid fa-plane",
      },
    ],
  },
  {
    id: "assetz-melodies-of-life",
    reraId: "PRM/KA/RERA/1251/310/PR/300124/006594",
    title: "Assetz Melodies of Life",
    badge: "Ready to Move",
    category: "ready-to-move",
    theme:
      "39-Acre Nature-Centric Plotted Sanctuary with Miyawaki Urban Forest",
    coordinates: { lat: 12.8963, lon: 77.6985 },
    mapsQuery: "Assetz Melodies of Life, Choodasandra, Sarjapur Road, Bengaluru",
    location:
      "Choodasandra, Off Hosa Road & Sarjapur Road, South-East Bengaluru",
    searchLocation:
      "choodasandra hosa road sarjapur road electronic city hsr layout south east bengaluru plots",
    price: "₹ 1.44 Cr*",
    mainImg: assetzImage('assetz/assetz-melodies-of-life/thumbnail.webp'),
    gallery: [
      assetzImage('assetz/assetz-melodies-of-life/gallery/exterior-view.webp'),
      assetzImage('assetz/assetz-melodies-of-life/gallery/interior-view.webp'),
      assetzImage('assetz/assetz-melodies-of-life/gallery/amenities-1.webp'),
    ],
    overview:
      "Assetz Melodies of Life is a premier 39-acre nature-inspired residential plotted township by Assetz Property Group, located in Choodasandra, off Hosa Road and Sarjapur Road in South-East Bengaluru. Featuring over 505 villa-sized plots amidst 1,000+ planted trees and a 15,000 sq. ft. Miyawaki urban forest, the master-planned layout dedicates over 45% of its land to open green spaces and avenues. Anchored by a grand 22,000+ sq. ft. lifestyle clubhouse with 25+ amenities, it provides seamless dual entry/exit access connecting both Electronic City and the Sarjapur IT corridor.",
    highlights: [
      "Gated 505-Plot Plotted Community in the Established Sarjapur Growth Triangle",
      "Plug-and-Play Infrastructure with Underground Utility Conduits & Wide Roads",
      "Thematic Music Gardens, Outdoor Sound Pods & Sensory Reflexology Paths",
      "10 Minutes to Electronic City Phase 1 & Bellandur Tech Hubs",
      "Lavish Clubhouse with Multi-Purpose Sports Court & Party Lawn",
      "Strictly Guarded 24/7 Gated Perimeter with Smart RFID Boom Barriers"
    ],
    specs: {
      possession: "August 2026",
      landArea: "39.00 Acres",
      config: "Exclusive Residential Villa Plots 505 Units",
    },
    floorPlans: [
      {
        type: "30 x 40 Plot",
        sba: "1,200 Sq. Ft.",
        carpet: "",
        price: "₹ 1.44 Cr*",
        img: assetzImage('assetz/assetz-melodies-of-life/floor-plans/plan-1.webp'),
      },
      {
        type: "30 x 50 Plot",
        sba: "1,500 Sq. Ft.",
        carpet: "",
        price: "₹ 1.80 Cr*",
        img: assetzImage('assetz/assetz-melodies-of-life/floor-plans/plan-2.webp'),
      },
      {
        type: "30 x 60 Plot",
        sba: "1,800 Sq. Ft.",
        carpet: "",
        price: "₹ 2.16 Cr*",
        img: assetzImage('assetz/assetz-melodies-of-life/floor-plans/plan-3.webp'),
      },
      {
        type: "40 x 60 Plot",
        sba: "2,400 Sq. Ft.",
        carpet: "",
        price: "₹ 3.07 Cr*",
        img: assetzImage('assetz/assetz-melodies-of-life/floor-plans/plan-4.webp'),
      },
    ],
    amenities: [
      {
        name: "22,000+ Sq. Ft. Grand Resident Clubhouse",
        icon: "fa-solid fa-building-user",
      },
      {
        name: "Miyawaki Urban Forest & 1000+ Tree Cover",
        icon: "fa-solid fa-tree",
      },
      {
        name: "Outdoor Swimming Pool & Lounge Deck",
        icon: "fa-solid fa-person-swimming",
      },
      {
        name: "Fully Equipped Gymnasium & Yoga Pavilion",
        icon: "fa-solid fa-dumbbell",
      },
      {
        name: "Multipurpose Sports, Padel & Box Cricket Courts",
        icon: "fa-solid fa-baseball",
      },
      {
        name: "Community Amphitheatre & Pergola Seating",
        icon: "fa-solid fa-masks-theater",
      },
      {
        name: "Children's Play Area & Dedicated Pet Park",
        icon: "fa-solid fa-dog",
      },
      {
        name: "Underground Power, Fibre-Optic & STP Infrastructure",
        icon: "fa-solid fa-plug",
      },
    ],
    connectivity: [
      {
        label: "Notre Dame Academy",
        destination: "Notre Dame Academy, Choodasandra, Bengaluru, Karnataka 560099",
        coordinates: { lat: 12.895, lon: 77.694 },
        distance: "0.8 km",
        icon: "fa-solid fa-school",
      },
      {
        label: "Hosa Road Junction / Metro Station (Yellow Line)",
        destination: "Hosa Road Metro Station, Hosur Road, Bengaluru, Karnataka 560100",
        coordinates: { lat: 12.879, lon: 77.653 },
        distance: "2.5 km",
        icon: "fa-solid fa-train-subway",
      },
      {
        label: "Wipro Corporate Campus (Sarjapur Road)",
        destination: "Wipro Limited Corporate Office, Doddakannelli, Sarjapur Main Road, Bengaluru, Karnataka 560035",
        coordinates: { lat: 12.912, lon: 77.689 },
        distance: "3.5 km",
        icon: "fa-solid fa-briefcase",
      },
      {
        label: "Sarjapur Main Road",
        destination: "Sarjapur Main Road, Carmelaram, Bengaluru, Karnataka 560035",
        coordinates: { lat: 12.898, lon: 77.705 },
        distance: "4.0 km",
        icon: "fa-solid fa-route",
      },
      {
        label: "Electronic City Phase 1",
        destination: "Electronic City Phase 1, Bengaluru, Karnataka 560100",
        coordinates: { lat: 12.845, lon: 77.66 },
        distance: "5.5 km",
        icon: "fa-solid fa-briefcase",
      },
      {
        label: "HSR Layout Sector 1",
        destination: "HSR Layout Sector 1, Bengaluru, Karnataka 560102",
        coordinates: { lat: 12.911, lon: 77.651 },
        distance: "6.0 km",
        icon: "fa-solid fa-location-dot",
      },
      {
        label: "Kempegowda International Airport",
        destination: "Kempegowda International Airport, Devanahalli, Bengaluru, Karnataka 560300",
        coordinates: { lat: 13.1986, lon: 77.7066 },
        distance: "48.0 km",
        icon: "fa-solid fa-plane",
      },
    ],
  },
  {
    id: "assetz-sora-and-saki",
    reraId: "PRM/KA/RERA/1251/309/PR/060324/006692",
    title: "Assetz Sora & Saki",
    badge: "New Launch",
    category: "new-launch",
    theme:
      "Japanese-Inspired Eco-Luxe Integrated Township with 50,000 Sq. Ft. Retail",
    coordinates: { lat: 13.1652, lon: 77.6923 },
    mapsQuery: "Assetz Sora and Saki, KIADB Aerospace Park, Bagalur, Bengaluru",
    location:
      "Gummanahalli, KIADB Aerospace Park, Off Bagalur Main Road, North Bengaluru",
    searchLocation:
      "gummanahalli bagalur kiadb aerospace park north bengaluru airport corridor",
    price: "₹ 2.04 Cr*",
    mainImg: assetzImage('assetz/assetz-sora-and-saki/thumbnail.webp'),
    gallery: [
      assetzImage('assetz/assetz-sora-and-saki/gallery/exterior-view.webp'),
      assetzImage('assetz/assetz-sora-and-saki/gallery/interior-view.webp'),
      assetzImage('assetz/assetz-sora-and-saki/gallery/amenities-1.webp'),
    ],
    overview:
      "Assetz Sora & Saki is a Japanese-inspired eco-luxury residential and integrated retail township by Assetz Property Group, located in Gummanahalli within the KIADB Aerospace Park off Bagalur Main Road in North Bengaluru. Spanning 11.28 acres with 74% dedicated open green space, the development features 7 high-rise towers (Basement + Ground + 18 Floors) housing over 900 luxury 3 & 4 BHK apartments. Designed around biophilic principles, the project integrates 50,000 sq. ft. of high-street retail, a 2.5-acre central amenity park, expansive living balconies (up to 135 sq. ft.), and zero-waste environmental infrastructure.",
    highlights: [
      "High-Growth Investment Corridors Adjacent to Shell, Boeing & Foxconn Campuses",
      "Large-Format 3 & 4 BHK Residences with Wide Panoramic Balconies",
      "Twin Clubhouses Spread across 50,000+ Sq. Ft. of Recreational Space",
      "10 Minutes to Airport Road Expressway & Upcoming Blue Line Metro Station",
      "Extensive 80% Open Greenery with Multi-Sport Courts & Skating Rink",
      "Certified IGBC Platinum Sustainable Building with Low Carbon Footprint"
    ],
    specs: {
      possession: "September 2028",
      landArea: "11.28 Acres",
      config: "Spacious 3 & 4 BHK Luxury High-Rise Apartments (900+ Units)",
    },
    floorPlans: [
      {
        type: "3 BHK (Type 1)",
        sba: "1,670 Sq. Ft.",
        carpet: "",
        price: "₹ 2.04 Cr*",
        img: assetzImage('assetz/assetz-sora-and-saki/floor-plans/plan-1.webp'),
      },
      {
        type: "3 BHK (Type 2)",
        sba: "1,785 Sq. Ft.",
        carpet: "",
        price: "₹ 2.21 Cr*",
        img: assetzImage('assetz/assetz-sora-and-saki/floor-plans/plan-2.webp'),
      },
      {
        type: "4 BHK",
        sba: "2,168 Sq. Ft.",
        carpet: "",
        price: "₹ 2.64 Cr*",
        img: assetzImage('assetz/assetz-sora-and-saki/floor-plans/plan-3.webp'),
      },
    ],
    amenities: [
      {
        name: "50,000 Sq. Ft. Integrated High-Street Retail Avenue",
        icon: "fa-solid fa-store",
      },
      {
        name: "2.5-Acre Central Amenity Park & Zen Landscaped Gardens",
        icon: "fa-solid fa-tree",
      },
      {
        name: "Grand Modern Lifestyle Clubhouse",
        icon: "fa-solid fa-building-user",
      },
      {
        name: "Outdoor Swimming Pool & Children's Splash Pool",
        icon: "fa-solid fa-person-swimming",
      },
      {
        name: "Tennis, Futsal & Box Cricket Courts",
        icon: "fa-solid fa-baseball",
      },
      {
        name: "Fully Equipped Gymnasium & Yoga Studio",
        icon: "fa-solid fa-dumbbell",
      },
      {
        name: "Children's Play Zone & Dedicated Pet Park",
        icon: "fa-solid fa-dog",
      },
      {
        name: "Zero-Waste Water Recycling & Solar Common Lighting",
        icon: "fa-solid fa-leaf",
      },
    ],
    connectivity: [
      {
        label: "KIADB Aerospace & Hardware Park",
        destination: "KIADB Aerospace Park, Bagalur, North Bengaluru, Karnataka 562149",
        coordinates: { lat: 13.185, lon: 77.728 },
        distance: "0.1 km",
        icon: "fa-solid fa-briefcase",
      },
      {
        label: "Bagalur Main Road",
        destination: "Bagalur Main Road, Sathanur, Bengaluru, Karnataka 560064",
        coordinates: { lat: 13.129, lon: 77.638 },
        distance: "2.4 km",
        icon: "fa-solid fa-route",
      },
      {
        label: "REVA University",
        destination: "REVA University, Kattigenahalli, Yelahanka, Bengaluru, Karnataka 560064",
        coordinates: { lat: 13.114, lon: 77.635 },
        distance: "5.5 km",
        icon: "fa-solid fa-school",
      },
      {
        label: "Upcoming Bagalur Cross Metro Station (Blue Line)",
        destination: "Bagalur Cross Metro Station (ORR-Airport Blue Line), Bengaluru, Karnataka 560064",
        coordinates: { lat: 13.135, lon: 77.625 },
        distance: "7.0 km",
        icon: "fa-solid fa-train-subway",
      },
      {
        label: "Kempegowda International Airport",
        destination: "Kempegowda International Airport, Devanahalli, Bengaluru, Karnataka 560300",
        coordinates: { lat: 13.1986, lon: 77.7066 },
        distance: "10.7 km",
        icon: "fa-solid fa-plane",
      },
      {
        label: "Bhartiya City Mall",
        destination: "Mall of Asia / Bhartiya Mall of Bengaluru, Thanisandra Main Road, Bengaluru, Karnataka 560064",
        coordinates: { lat: 13.078, lon: 77.637 },
        distance: "11.0 km",
        icon: "fa-solid fa-store",
      },
      {
        label: "Hebbal Flyover Junction",
        destination: "Hebbal Flyover Junction, Bellary Road, Bengaluru, Karnataka 560024",
        coordinates: { lat: 13.036, lon: 77.597 },
        distance: "18.0 km",
        icon: "fa-solid fa-location-dot",
      },
    ],
  },
  {
    id: "assetz-66-and-shibui",
    reraId: "PRM/KA/RERA/1251/446/PR/300124/006601",
    title: "Assetz 66 & Shibui",
    badge: "Ongoing",
    category: "ongoing",
    theme:
      "The Black Series - Japanese 'Shibui' Minimalist Ultra-Luxury High-Rise Sanctuary",
    coordinates: { lat: 12.9694, lon: 77.7491 },
    mapsQuery: "Assetz 66 and Shibui, Whitefield Main Road, Bengaluru",
    location:
      "Whitefield Main Road, Sathya Sai Layout, Whitefield, East Bengaluru",
    searchLocation:
      "whitefield main road sathya sai layout hoodi itpl nexus mall east bengaluru",
    price: "₹ 4.28 Cr*",
    mainImg: assetzImage('assetz/assetz-66-and-shibui/thumbnail.webp'),
    gallery: [
      assetzImage('assetz/assetz-66-and-shibui/gallery/exterior-view.webp'),
      assetzImage('assetz/assetz-66-and-shibui/gallery/interior-view.webp'),
      assetzImage('assetz/assetz-66-and-shibui/gallery/amenities-1.webp'),
    ],
    overview:
      "Assetz 66 & Shibui (The Black Series) is an ultra-exclusive, Japanese Shibui-inspired luxury residential project by Assetz Property Group, located directly on Whitefield Main Road in Sathya Sai Layout, East Bengaluru. Spanning 2 acres, this boutique high-density development comprises a single 12-storey tower featuring only 96 bespoke 3 & 4 BHK signature residences. Defined by its striking black clay tile exterior façade, Italian marble flooring in living spaces, and expansive balconies, the project offers a tranquil sanctuary right next to Nexus Whitefield Mall and major IT corridors.",
    highlights: [
      "Ultra-Exclusive Boutique Development of Just 96 Bespoke Residences",
      "Walking Distance to Whitefield Main Road, Metro Station & Forum Mall",
      "Curated Shibui Interiors Featuring Natural Wood & Stone Textures",
      "Private Elevator Lobbies with Direct Access to Individual Residences",
      "Rooftop Horizon Pool with Jacuzzi, Cigar Lounge & Private Dining Rooms",
      "Unmatched Prime Whitefield Address in a Quiet, Leafy By-Lane"
    ],
    specs: {
      possession: "June 2028",
      landArea: "2.00 Acres",
      config: "Ultra-Luxury Boutique High-Rise Residences (96 Units)",
    },
    floorPlans: [
      {
        type: "3 BHK",
        sba: "2,154 Sq. Ft.",
        carpet: "",
        price: "₹ 3.25 Cr*",
        img: assetzImage('assetz/assetz-66-and-shibui/floor-plans/plan-1.webp'),
      },
      {
        type: "4 BHK",
        sba: "3,044 Sq. Ft.",
        carpet: "",
        price: "₹ 4.28 Cr*",
        img: assetzImage('assetz/assetz-66-and-shibui/floor-plans/plan-2.webp'),
      },
    ],
    amenities: [
      {
        name: "Boutique Resident Clubhouse & Multipurpose Lounge",
        icon: "fa-solid fa-building-user",
      },
      {
        name: "Italian Marble Flooring & Premium Veneer Finishes",
        icon: "fa-solid fa-gem",
      },
      {
        name: "Swimming Pool & Sun Lounger Deck",
        icon: "fa-solid fa-person-swimming",
      },
      {
        name: "State-of-the-Art Fitness Center & Gym",
        icon: "fa-solid fa-dumbbell",
      },
      {
        name: "Meditation Deck, Reflexology Path & Sensory Garden",
        icon: "fa-solid fa-spa",
      },
      {
        name: "Tennis Court & Outdoor Sports Pitch",
        icon: "fa-solid fa-table-tennis-paddle-ball",
      },
      {
        name: "Kids' Outdoor Adventure Play Area",
        icon: "fa-solid fa-child-reaching",
      },
      {
        name: "Digital Smart Locks & 24/7 Gated Security",
        icon: "fa-solid fa-shield-halved",
      },
    ],
    connectivity: [
      {
        label: "Nexus Whitefield Mall (Forum Neighborhood Mall)",
        destination: "Nexus Whitefield Mall, Prestige Ozone, Whitefield Main Road, Bengaluru, Karnataka 560066",
        coordinates: { lat: 12.959, lon: 77.746 },
        distance: "0.3 km",
        icon: "fa-solid fa-store",
      },
      {
        label: "Pattandur Agrahara / Kadugodi Metro Station",
        destination: "Kadugodi Tree Park / Pattandur Agrahara Metro Station, Whitefield, Bengaluru, Karnataka 560066",
        coordinates: { lat: 12.986, lon: 77.755 },
        distance: "1.2 km",
        icon: "fa-solid fa-train-subway",
      },
      {
        label: "ITPL (International Tech Park Bangalore)",
        destination: "International Tech Park Bangalore (ITPL), Whitefield Main Road, Bengaluru, Karnataka 560066",
        coordinates: { lat: 12.9865, lon: 77.7375 },
        distance: "2.0 km",
        icon: "fa-solid fa-briefcase",
      },
      {
        label: "Manipal Hospital Whitefield",
        destination: "Manipal Hospital Whitefield, ITPL Main Road, Bengaluru, Karnataka 560066",
        coordinates: { lat: 12.988, lon: 77.731 },
        distance: "2.5 km",
        icon: "fa-solid fa-hospital",
      },
      {
        label: "Hoodi Junction",
        destination: "Hoodi Junction, Whitefield Road, Bengaluru, Karnataka 560048",
        coordinates: { lat: 12.992, lon: 77.716 },
        distance: "3.5 km",
        icon: "fa-solid fa-route",
      },
      {
        label: "Outer Ring Road (ORR) / Marathahalli Hub",
        destination: "Marathahalli Bridge / ORR Junction, Bengaluru, Karnataka 560037",
        coordinates: { lat: 12.955, lon: 77.701 },
        distance: "8.5 km",
        icon: "fa-solid fa-location-dot",
      },
      {
        label: "Kempegowda International Airport",
        destination: "Kempegowda International Airport, Devanahalli, Bengaluru, Karnataka 560300",
        coordinates: { lat: 13.1986, lon: 77.7066 },
        distance: "38.0 km",
        icon: "fa-solid fa-plane",
      },
    ],
  },
  {
    id: "assetz-promise-of-spring",
    reraId: "PRM/KA/RERA/1251/309/PR/030424/006771",
    title: "Assetz Promise of Spring",
    badge: "Ongoing",
    category: "ongoing",
    theme: "23-Acre Sustainable Nature-Infused Plotted Sanctuary",
    coordinates: { lat: 13.2651, lon: 77.7123 },
    mapsQuery: "Assetz Promise of Spring, NH 44, Devanahalli, Bengaluru",
    location:
      "NH 44, Avathi Village, Kasaba Hobli, Devanahalli, North Bengaluru",
    searchLocation:
      "devanahalli nh 44 avathi village airport corridor north bengaluru plots",
    price: "₹ 1.26 Cr*",
    mainImg: assetzImage('assetz/assetz-promise-of-spring/thumbnail.webp'),
    gallery: [
      assetzImage('assetz/assetz-promise-of-spring/gallery/exterior-view.webp'),
      assetzImage('assetz/assetz-promise-of-spring/gallery/interior-view.webp'),
      assetzImage('assetz/assetz-promise-of-spring/gallery/amenities-1.webp'),
    ],
    overview:
      "Assetz Promise of Spring is an expansive 23-acre eco-luxe residential plotted development by Assetz Property Group, located right off NH 44 near Avathi Village in Devanahalli, North Bengaluru. Featuring 320 custom villa plots amidst 47% open green spaces, 5,000+ planted trees, and a dedicated 1-acre central park, the community is anchored by a lavish 3-acre clubhouse and comprehensive underground infrastructure designed for sustainable luxury villa living near the airport corridor.",
    highlights: [
      "Picturesque 320-Unit Plotted Haven Along the North Bengaluru Aerotropolis",
      "Floral Theme with Seasonal Cherry Blossom & Jacaranda Tree Avenues",
      "Direct Frontage Access from National Highway 44 with Zero Toll Bottlenecks",
      "Grand Clubhouse with Swimming Pool, Badminton Courts & Cafe",
      "Broad 40-Ft and 30-Ft Concrete Roads with Tree-Lined Cobblestone Walkways",
      "Clear BIAAPA & RERA Approvals for Hassle-Free Bank Loan Assistance"
    ],
    specs: {
      possession: "October 2026",
      landArea: "23.00 Acres",
      config: "Residential Villa Plots — 320 Total Units",
    },
    floorPlans: [
      {
        type: "30 x 40 Plot",
        sba: "1,200 Sq. Ft.",
        carpet: "",
        price: "₹ 78.00 L*",
        img: assetzImage('assetz/assetz-promise-of-spring/floor-plans/plan-1.webp'),
      },
      {
        type: "30 x 50 Plot",
        sba: "1,500 Sq. Ft.",
        carpet: "",
        price: "₹ 99.00 L*",
        img: assetzImage('assetz/assetz-promise-of-spring/floor-plans/plan-2.webp'),
      },
      {
        type: "40 x 50 Plot",
        sba: "2,000 Sq. Ft.",
        carpet: "",
        price: "₹ 1.30 Cr*",
        img: assetzImage('assetz/assetz-promise-of-spring/floor-plans/plan-3.webp'),
      },
      {
        type: "Odd Plot",
        sba: "3,300 Sq. Ft.",
        carpet: "",
        price: "₹ 2.15 Cr*",
        img: assetzImage('assetz/assetz-promise-of-spring/floor-plans/plan-4.webp'),
      },
    ],
    amenities: [
      {
        name: "Lavish 3-Acre Resident Clubhouse",
        icon: "fa-solid fa-building-user",
      },
      {
        name: "1-Acre Central Park & 5000+ Tree Cover",
        icon: "fa-solid fa-tree",
      },
      {
        name: "Swimming Pool & Kids' Splash Deck",
        icon: "fa-solid fa-person-swimming",
      },
      {
        name: "Fully Equipped Gymnasium & Steam/Sauna",
        icon: "fa-solid fa-dumbbell",
      },
      {
        name: "Banquet Hall & Activity Yoga Deck",
        icon: "fa-solid fa-people-roof",
      },
      {
        name: "Multiple Outdoor Sports Courts",
        icon: "fa-solid fa-basketball",
      },
      {
        name: "Dedicated Children's Play Area & Pet Park",
        icon: "fa-solid fa-dog",
      },
      {
        name: "Underground Power, Water & Fibre-Optic Networks",
        icon: "fa-solid fa-plug",
      },
    ],
    connectivity: [
      {
        label: "National Highway 44 (NH 44)",
        destination: "National Highway 44 (NH 44), Devanahalli Bypass, Bengaluru, Karnataka 562110",
        coordinates: { lat: 13.245, lon: 77.712 },
        distance: "0.5 km",
        icon: "fa-solid fa-route",
      },
      {
        label: "Devanahalli Railway Station",
        destination: "Devanahalli Railway Station, Devanahalli, Bengaluru Rural, Karnataka 562110",
        coordinates: { lat: 13.242, lon: 77.708 },
        distance: "4.0 km",
        icon: "fa-solid fa-train",
      },
      {
        label: "Kempegowda International Airport",
        destination: "Kempegowda International Airport, Devanahalli, Bengaluru, Karnataka 560300",
        coordinates: { lat: 13.1986, lon: 77.7066 },
        distance: "10.2 km",
        icon: "fa-solid fa-plane",
      },
      {
        label: "KIADB Aerospace SEZ & Hardware Park",
        destination: "KIADB Aerospace SEZ & Hardware Park, Bagalur, Bengaluru, Karnataka 562149",
        coordinates: { lat: 13.185, lon: 77.728 },
        distance: "14.0 km",
        icon: "fa-solid fa-briefcase",
      },
      {
        label: "Manyata Tech Park",
        destination: "Manyata Embassy Business Park, Nagawara, Bengaluru, Karnataka 560045",
        coordinates: { lat: 13.048, lon: 77.62 },
        distance: "28.7 km",
        icon: "fa-solid fa-briefcase",
      },
      {
        label: "KR Puram Railway Station",
        destination: "Krishnarajapuram (KR Puram) Railway Station, Bengaluru, Karnataka 560036",
        coordinates: { lat: 13.001, lon: 77.697 },
        distance: "32.5 km",
        icon: "fa-solid fa-train",
      },
    ],
  },
  {
    id: "assetz-canvas-and-cove",
    reraId: "PRM/KA/RERA/1251/310/PR/071223/006454",
    title: "Assetz Canvas & Cove",
    badge: "Ongoing",
    category: "ongoing",
    theme: "Lakefront Eco-Luxe High-Rise Sanctuary with 69% Open Space",
    coordinates: { lat: 12.8712, lon: 77.6254 },
    mapsQuery: "Assetz Canvas and Cove, Begur, NICE Road, Bengaluru",
    location: "Near NICE Ring Road, AECS C Block, Begur, South Bengaluru",
    searchLocation:
      "begur aecs c block nice ring road singasandra hosur road south bengaluru",
    price: "₹ 1.86 Cr*",
    mainImg: assetzImage('assetz/assetz-canvas-and-cove/thumbnail.webp'),
    gallery: [
      assetzImage('assetz/assetz-canvas-and-cove/gallery/exterior-view.webp'),
      assetzImage('assetz/assetz-canvas-and-cove/gallery/interior-view.webp'),
      assetzImage('assetz/assetz-canvas-and-cove/gallery/amenities-1.webp'),
    ],
    overview:
      "Assetz Canvas & Cove is a premium lakefront high-rise residential township by Assetz Property Group located near Begur Lake and the NICE Ring Road in South Bengaluru. Spanning 17 acres with 69% open green spaces, the project features 7 high-rise towers (Basement + Ground + 28 Floors) housing spacious 3 and 4 BHK luxury residences. Designed for sustainable living, the enclave offers scenic lake views, large living balconies, and comprehensive fitness and recreation infrastructure.",
    highlights: [
      "Vibrant Lakefront Living Overlooking 23 Acres of Scenic Waterbody",
      "Diverse Studio, 2 & 3 BHK Layouts with Optimized Space Utilization",
      "Direct Connectivity to NICE Road, Electronic City & Bannerghatta Road",
      "Signature Club with 30+ Resort Amenities, Cricket Pitch & Futsal Arena",
      "Expansive 85% Open Space with Lakeside Amphitheater & Camping Lawns",
      "Advanced Water Recycling and Solar Powered Common Area Utilities"
    ],
    specs: {
      possession: "March 2028",
      landArea: "17.00 Acres",
      config: "Studio, 2 & 3 BHK Lakefront High-Rise Apartments",
    },
    floorPlans: [
      {
        type: "Studio",
        sba: "447 Sq. Ft.",
        carpet: "",
        price: "₹ 60 L*",
        img: assetzImage('assetz/assetz-canvas-and-cove/floor-plans/plan-1.webp'),
      },
      {
        type: "2 BHK",
        sba: "983 Sq. Ft.",
        carpet: "",
        price: "₹ 1.20 Cr*",
        img: assetzImage('assetz/assetz-canvas-and-cove/floor-plans/plan-2.webp'),
      },
      {
        type: "3 BHK",
        sba: "1,898 Sq. Ft.",
        carpet: "",
        price: "₹ 1.80 Cr*",
        img: assetzImage('assetz/assetz-canvas-and-cove/floor-plans/plan-3.webp'),
      },
    ],
    amenities: [
      {
        name: "Grand Resident Clubhouse & Fitness Studio",
        icon: "fa-solid fa-building-user",
      },
      {
        name: "69% Open Spaces & Lakefront Promenade",
        icon: "fa-solid fa-water",
      },
      {
        name: "Outdoor Swimming Pool & Sun Lounge Deck",
        icon: "fa-solid fa-person-swimming",
      },
      {
        name: "Fully Equipped Gymnasium & Yoga Pavilion",
        icon: "fa-solid fa-dumbbell",
      },
      {
        name: "Badminton Court & Indoor Games Room",
        icon: "fa-solid fa-table-tennis-paddle-ball",
      },
      {
        name: "Multipurpose Community Celebration Hall",
        icon: "fa-solid fa-people-roof",
      },
      {
        name: "Children's Play Area & Jogging Tracks",
        icon: "fa-solid fa-child-reaching",
      },
      {
        name: "EV Charging Stations & Water Recycling Systems",
        icon: "fa-solid fa-leaf",
      },
    ],
    connectivity: [
      {
        label: "NICE Ring Road Junction",
        destination: "NICE Ring Road Junction, Electronic City / Hosur Road, Bengaluru, Karnataka 560100",
        coordinates: { lat: 12.868, lon: 77.621 },
        distance: "0.5 km",
        icon: "fa-solid fa-road",
      },
      {
        label: "Singasandra Metro Station (Yellow Line)",
        destination: "Singasandra Metro Station, Hosur Road, Bengaluru, Karnataka 560068",
        coordinates: { lat: 12.88, lon: 77.648 },
        distance: "2.3 km",
        icon: "fa-solid fa-train-subway",
      },
      {
        label: "D-Mart Akshayanagar",
        destination: "DMart Akshayanagar, Hulimavu, Bengaluru, Karnataka 560068",
        coordinates: { lat: 12.875, lon: 77.616 },
        distance: "3.4 km",
        icon: "fa-solid fa-store",
      },
      {
        label: "Hosur Main Road",
        destination: "Hosur Main Road, Kudlu Gate, Bengaluru, Karnataka 560068",
        coordinates: { lat: 12.885, lon: 77.65 },
        distance: "3.5 km",
        icon: "fa-solid fa-route",
      },
      {
        label: "Electronic City Phase 1",
        destination: "Electronic City Phase 1, Bengaluru, Karnataka 560100",
        coordinates: { lat: 12.845, lon: 77.66 },
        distance: "8.0 km",
        icon: "fa-solid fa-briefcase",
      },
      {
        label: "Silk Board Junction",
        destination: "Central Silk Board Junction, Hosur Road, Bengaluru, Karnataka 560068",
        coordinates: { lat: 12.9176, lon: 77.6233 },
        distance: "9.0 km",
        icon: "fa-solid fa-location-dot",
      },
      {
        label: "Kempegowda International Airport",
        destination: "Kempegowda International Airport, Devanahalli, Bengaluru, Karnataka 560300",
        coordinates: { lat: 13.1986, lon: 77.7066 },
        distance: "47.0 km",
        icon: "fa-solid fa-plane",
      },
    ],
  },
  {
    id: "assetz-soho-and-sky",
    reraId: "PRM/KA/RERA/1251/472/PR/250322/004785",
    title: "Assetz Soho & Sky",
    badge: "Ongoing",
    category: "ongoing",
    theme:
      "New York SoHo-Inspired Architecture & Carbon-Healing Eco-Luxe High-Rise Enclave",
    coordinates: { lat: 13.0762, lon: 77.5983 },
    mapsQuery: "Assetz Soho and Sky, Jakkur, Bengaluru",
    location: "Jakkur, North Bengaluru",
    searchLocation:
      "jakkur north bengaluru hebbal manyata tech park airport corridor",
    price: "₹ 2.66 Cr*",
    mainImg: assetzImage('assetz/assetz-soho-and-sky/thumbnail.webp'),
    gallery: [
      assetzImage('assetz/assetz-soho-and-sky/gallery/exterior-view.webp'),
      assetzImage('assetz/assetz-soho-and-sky/gallery/interior-view.webp'),
      assetzImage('assetz/assetz-soho-and-sky/gallery/amenities-1.webp'),
    ],
    overview:
      "Assetz Soho & Sky is an upscale residential high-rise development by Assetz Property Group inspired by the iconic architectural character of New York's SoHo district, located in Jakkur, North Bengaluru. Spanning 4.51 acres with roughly 78% open green spaces, the low-density community features 5 high-rise towers comprising thoughtfully crafted luxury 3 and 4 BHK residences. The project is anchored by a 16,000 sq. ft. lifestyle clubhouse, zero-waste organic conversion systems, and advanced water conservation infrastructure.",
    highlights: [
      "New York Soho-Inspired Industrial Chic Architecture with Exposed Brick Accents",
      "Spacious 3 & 4 BHK Sky Homes with 11-Ft High Ceilings & Large Terraces",
      "Unobstructed Views of Jakkur Flying Club & Surrounding Lake Greens",
      "5 Minutes to Bellary Road Highway & Kempegowda Airport Corridor",
      "Rooftop Sky Deck with Cocktail Bar, Astronomy Zone & Infinity Pool",
      "Comprehensive Smart Home Automation for Lighting, ACs & Digital Locks"
    ],
    specs: {
      possession: "September 2026",
      landArea: "4.51 Acres",
      config: "3 & 4 BHK Luxury High-Rise Apartments",
    },
    floorPlans: [
      {
        type: "3 BHK Comfort",
        sba: "2,015 Sq. Ft.",
        carpet: "",
        price: "₹ 2.66 Cr*",
        img: assetzImage('assetz/assetz-soho-and-sky/floor-plans/plan-1.webp'),
      },
      {
        type: "3 BHK Grand",
        sba: "2,489 Sq. Ft.",
        carpet: "",
        price: "₹ 3.28 Cr*",
        img: assetzImage('assetz/assetz-soho-and-sky/floor-plans/plan-2.webp'),
      },
      {
        type: "4 BHK Signature",
        sba: "2,799 Sq. Ft.",
        carpet: "",
        price: "₹ 3.69 Cr*",
        img: assetzImage('assetz/assetz-soho-and-sky/floor-plans/plan-3.webp'),
      },
    ],
    amenities: [
      {
        name: "16,000 Sq. Ft. Lifestyle Clubhouse",
        icon: "fa-solid fa-building-user",
      },
      {
        name: "78% Open Green Spaces & Landscaped Parks",
        icon: "fa-solid fa-tree",
      },
      {
        name: "Swimming Pool & Kids' Splash Deck",
        icon: "fa-solid fa-person-swimming",
      },
      {
        name: "Fully Equipped Gymnasium & Fitness Center",
        icon: "fa-solid fa-dumbbell",
      },
      {
        name: "Dedicated Crèche / Day Care Facility",
        icon: "fa-solid fa-child-reaching",
      },
      {
        name: "Outdoor Sports Courts & Amphitheatre",
        icon: "fa-solid fa-basketball",
      },
      { name: "Indoor Games Room & Party Lounge", icon: "fa-solid fa-chess" },
      {
        name: "Organic Waste Converters & Water Conservation Systems",
        icon: "fa-solid fa-leaf",
      },
    ],
    connectivity: [
      {
        label: "Jakkur Main Road / Lake",
        destination: "Jakkur Lake / Jakkur Main Road, Bengaluru, Karnataka 560064",
        coordinates: { lat: 13.078, lon: 77.605 },
        distance: "1.0 km",
        icon: "fa-solid fa-water",
      },
      {
        label: "Bellary Road (NH 44)",
        destination: "Bellary Road (NH 44), Sahakar Nagar, Bengaluru, Karnataka 560092",
        coordinates: { lat: 13.085, lon: 77.595 },
        distance: "2.0 km",
        icon: "fa-solid fa-route",
      },
      {
        label: "Manyata Tech Park",
        destination: "Manyata Embassy Business Park, Nagawara, Bengaluru, Karnataka 560045",
        coordinates: { lat: 13.048, lon: 77.62 },
        distance: "7.0 km",
        icon: "fa-solid fa-briefcase",
      },
      {
        label: "Hebbal Flyover Junction",
        destination: "Hebbal Flyover Junction, Bellary Road, Bengaluru, Karnataka 560024",
        coordinates: { lat: 13.036, lon: 77.597 },
        distance: "8.5 km",
        icon: "fa-solid fa-location-dot",
      },
      {
        label: "Elements Mall",
        destination: "Elements Mall, Thanisandra Main Road, Nagawara, Bengaluru, Karnataka 560077",
        coordinates: { lat: 13.044, lon: 77.632 },
        distance: "5.3 km",
        icon: "fa-solid fa-store",
      },
      {
        label: "Kempegowda International Airport",
        destination: "Kempegowda International Airport, Devanahalli, Bengaluru, Karnataka 560300",
        coordinates: { lat: 13.1986, lon: 77.7066 },
        distance: "22.0 km",
        icon: "fa-solid fa-plane",
      },
    ],
  },
  {
    id: "assetz-18-and-oak",
    reraId: "TN/30/BUILDING/0426/2022",
    title: "Assetz 18 & Oak",
    badge: "Ready to Move",
    category: "ready-to-move",
    theme: "177-Acre Golf-Centric Ultra-Luxury Villa & Plotted Sanctuary",
    coordinates: { lat: 12.8361, lon: 77.7652 },
    mapsQuery: "Assetz 18 and Oak, Sevaganapalli, Sarjapur-Attibele Road, Bengaluru",
    location: "Sevaganapalli, Off Sarjapur-Attibele Road, South-East Bengaluru",
    searchLocation:
      "sarjapur attibele road sevaganapalli clover greens golf course south east bengaluru",
    price: "₹ 3.68 Cr*",
    mainImg: assetzImage('assetz/assetz-18-and-oak/thumbnail.webp'),
    gallery: [
      assetzImage('assetz/assetz-18-and-oak/gallery/exterior-view.webp'),
      assetzImage('assetz/assetz-18-and-oak/gallery/interior-view.webp'),
      assetzImage('assetz/assetz-18-and-oak/gallery/amenities-1.webp'),
    ],
    overview:
      "Assetz 18 & Oak is a premier 177-acre golf-centric ultra-luxury villa and plotted township by Assetz Property Group, located in Sevaganapalli off Sarjapur-Attibele Road in South-East Bengaluru. Set right around an 18-hole championship golf course (Clover Greens), the development features 246 bespoke 3, 4, and 5 BHK luxury golf villas and estate plots with panoramic fairway views. The community offers an uncrowded environment anchored by a full-fledged golf club, swimming pools, tennis courts, and high-end lifestyle amenities.",
    highlights: [
      "Prestigious 246-Unit Golf Villa Community Surrounding a Private Executive Course",
      "Expansive 4 & 5 BHK Triplex Villas with Private Swimming Pools & Lawns",
      "Championship Golf Putting Greens, Driving Nets & Clubhouse Pro Shop",
      "Serene Countryside Setting Minutes Away from Sarjapur Tech Hubs",
      "Lush Oak-Lined Boulevards with Cycling Tracks and Underground Services",
      "Full Gated Estate Security with 24/7 Patrols & Concierge Services"
    ],
    specs: {
      possession: "Ready to Move",
      landArea: "177 Acres",
      config: "4 & 5 BHK Golf Villas & Estate Plots — 246 Units",
    },
    floorPlans: [
      {
        type: "4 BHK Villa",
        sba: "3,425 Sq. Ft. - 5,492 Sq. Ft.",
        carpet: "",
        price: "₹ 3.68 Cr*",
        img: assetzImage('assetz/assetz-18-and-oak/floor-plans/plan-1.webp'),
      },
      {
        type: "5 BHK Villa",
        sba: "6,755 Sq. Ft.",
        carpet: "",
        price: "₹ 7.56 Cr*",
        img: assetzImage('assetz/assetz-18-and-oak/floor-plans/plan-2.webp'),
      },
    ],
    amenities: [
      {
        name: "18-Hole Championship Golf Course & Driving Range",
        icon: "fa-solid fa-golf-ball-tee",
      },
      {
        name: "Grand Country Golf Clubhouse & Lounge",
        icon: "fa-solid fa-building-user",
      },
      {
        name: "Swimming Pool & Resort-Style Sun Deck",
        icon: "fa-solid fa-person-swimming",
      },
      {
        name: "Fully Equipped Fitness Center & Wellness Spa",
        icon: "fa-solid fa-dumbbell",
      },
      {
        name: "Tennis, Badminton & Squash Courts",
        icon: "fa-solid fa-table-tennis-paddle-ball",
      },
      {
        name: "Fine Dining Restaurant & Banquet Hall",
        icon: "fa-solid fa-utensils",
      },
      {
        name: "Children's Play Area & Landscaped Parks",
        icon: "fa-solid fa-child-reaching",
      },
      {
        name: "Underground Power, Water & 24/7 Gated Security",
        icon: "fa-solid fa-shield-halved",
      },
    ],
    connectivity: [
      {
        label: "Sarjapur-Attibele Road",
        destination: "Sarjapur-Attibele Road, Anekal Taluk, Bengaluru, Karnataka 562125",
        coordinates: { lat: 12.825, lon: 77.778 },
        distance: "2.0 km",
        icon: "fa-solid fa-route",
      },
      {
        label: "Sarjapur Town Junction",
        destination: "Sarjapur Town Police Station Circle, Bengaluru, Karnataka 562125",
        coordinates: { lat: 12.86, lon: 77.788 },
        distance: "7.5 km",
        icon: "fa-solid fa-location-dot",
      },
      {
        label: "Attibele Industrial Hub / Hosur Road",
        destination: "Attibele Industrial Area, Hosur Road (NH 44), Bengaluru, Karnataka 562107",
        coordinates: { lat: 12.781, lon: 77.772 },
        distance: "9.0 km",
        icon: "fa-solid fa-briefcase",
      },
      {
        label: "Electronic City Phase 1 & 2",
        destination: "Electronic City Phase 1 & 2, Bengaluru, Karnataka 560100",
        coordinates: { lat: 12.845, lon: 77.665 },
        distance: "16.0 km",
        icon: "fa-solid fa-briefcase",
      },
      {
        label: "Outer Ring Road (ORR) / Bellandur",
        destination: "Outer Ring Road Bellandur Flyover, Bengaluru, Karnataka 560103",
        coordinates: { lat: 12.926, lon: 77.6762 },
        distance: "22.0 km",
        icon: "fa-solid fa-location-dot",
      },
      {
        label: "Kempegowda International Airport",
        destination: "Kempegowda International Airport, Devanahalli, Bengaluru, Karnataka 560300",
        coordinates: { lat: 13.1986, lon: 77.7066 },
        distance: "52.0 km",
        icon: "fa-solid fa-plane",
      },
    ],
  },
];

export const builderFaq = [
  {
    question: "Who is the owner of Assetz?",
    answer:
      "Assetz Property Group was founded in 2006 by Rajpal Singh Chaudhary and Ben Salmon, and is led by key executives including Chairman Michael David Holland and Managing Director Akshay Kishore Dewani.",
  },
  {
    question: "What is the assetz property group?",
    answer:
      "Assetz Property Group is a prominent, design-led real estate development and asset management company headquartered in Singapore with its primary operational base in Bengaluru, India.",
  },
  {
    question: "Is investing in an Assetz property considered safe?",
    answer:
      "Assetz is consistently ranked among the top five real estate developers in Bengaluru by sales value. They are widely respected for their financial backing, track record of executing over 50 million square feet of assets, and premium construction quality. [1, 2]",
  },
  {
    question:
      "Which major financial institutions approve home loans for Assetz properties?",
    answer:
      "Because the builder is a Tier-1 developer, almost all major tier-1 national and private banks provide seamless loan sanctions. Approved banks typically include SBI, HDFC Bank, ICICI Bank, Axis Bank, Kotak Mahindra Bank, and Canara Bank.",
  },
  {
    question: "What is the focus of an Assetz township layout?",
    answer:
      "Assetz differentiates its properties by focusing heavily on eco-friendly features and low-density layouts. Their townships typically dedicate 65% to 75% of the total acreage entirely to open green spaces, integrated water conservation, and landscaped amenities.",
  },
  {
    question: "What are Assetz's most prominent commercial projects?",
    answer:
      "Before transitioning heavily into luxury residential, Assetz developed major IT parks in Bengaluru. Their most notable project is Vrindavan Tech Village (now widely known as Embassy TechVillage), India's first LEED Platinum-certified SEZ spanning 106 acres. They also co-developed Thimphu TechPark, which is Bhutan’s very first IT park.",
  },
  {
    question: "How does Assetz manage water shortages in its townships?",
    answer:
      "Because water availability is a critical factor in Bengaluru, Assetz integrates heavy rainwater harvesting infrastructure, dual-piped plumbing configurations (separating potable water from recycled flush water), and dedicated sewage treatment plants (STPs) into their townships to optimize water recycling and ensure consistent 24/7 utility flow.",
  },
  {
    question: "What does the average monthly maintenance fee cover?",
    answer:
      "Maintenance charges vary by project size but typically cover round-the-clock gated security, CCTV surveillance, multi-tiered clubhouse upkeep, waste management, landscaping maintenance, and localized power backup for common zones.",
  },
];

export const popularLocations = ["Sarjapur Road", "Devanahalli", "Whitefield"];

export const builderName = "ASSETZ PROPERTY";
