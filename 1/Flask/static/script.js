let _isHovering = false;

const CASE_DATA = [
    /* ── NON-SEVERE CASES (13) ──────────────────────────── */
    {
        id: 1,  name: "Optimal Growth",          severe: false,
        image: "/static/images/cases/NON-SEVERE CASES/case1/plant.jpg",
        visual: "Broad, dark green, upright leaves; thick stems; compact and healthy plant",
        reason: "No stress",
        params: {
            temp:     { label: "Temperature",   value: "Optimal", status: "good"    },
            humidity: { label: "Humidity",      value: "Optimal", status: "good"    },
            soil:     { label: "Soil Moisture", value: "Optimal", status: "good"    },
            light:    { label: "Light",         value: "Optimal", status: "good"    }
        }
    },
    {
        id: 2,  name: "Heat Stress",              severe: false,
        image: "/static/images/cases/NON-SEVERE CASES/case2/plant.jpg",
        visual: "Top leaves wilt, edges curl downward, lighter green, early bolting",
        reason: "Early wilting, reversible if cooled",
        params: {
            temp:     { label: "Temperature",   value: "High",   status: "danger" },
            humidity: { label: "Humidity",      value: "Normal", status: "good"   },
            soil:     { label: "Soil Moisture", value: "Normal", status: "good"   },
            light:    { label: "Light",         value: "Normal", status: "good"   }
        }
    },
    {
        id: 3,  name: "Hot + Humid Stress",       severe: false,
        image: "/static/images/cases/NON-SEVERE CASES/case3/plant.jpg",
        visual: "Soft, pale green leaves; wet/slimy look; fungal spots appear",
        reason: "Mild fungal risk but still recoverable",
        params: {
            temp:     { label: "Temperature",   value: "High",   status: "danger" },
            humidity: { label: "Humidity",      value: "High",   status: "danger" },
            soil:     { label: "Soil Moisture", value: "Normal", status: "good"   },
            light:    { label: "Light",         value: "Normal", status: "good"   }
        }
    },
    {
        id: 4,  name: "Hot + Dry Air",            severe: false,
        image: "/static/images/cases/NON-SEVERE CASES/case4/plant.jpg",
        visual: "Dry, crispy leaf edges; upward curling; tip burn",
        reason: "Leaf edge drying only",
        params: {
            temp:     { label: "Temperature",   value: "High",   status: "danger"  },
            humidity: { label: "Humidity",      value: "Low",    status: "warning" },
            soil:     { label: "Soil Moisture", value: "Normal", status: "good"    },
            light:    { label: "Light",         value: "Normal", status: "good"    }
        }
    },
    {
        id: 9,  name: "Cold Stress",              severe: false,
        image: "/static/images/cases/NON-SEVERE CASES/case9/plant.jpg",
        visual: "Thick, dark leaves; compact but slow growth",
        reason: "Slows growth but no damage yet",
        params: {
            temp:     { label: "Temperature",   value: "Low",    status: "danger" },
            humidity: { label: "Humidity",      value: "Normal", status: "good"   },
            soil:     { label: "Soil Moisture", value: "Normal", status: "good"   },
            light:    { label: "Light",         value: "Normal", status: "good"   }
        }
    },
    {
        id: 10, name: "Cold + Humid",             severe: false,
        image: "/static/images/cases/NON-SEVERE CASES/case10/plant.jpg",
        visual: "Water-soaked spots; fungal lesions; slight curling",
        reason: "Early fungal spotting",
        params: {
            temp:     { label: "Temperature",   value: "Low",    status: "danger" },
            humidity: { label: "Humidity",      value: "High",   status: "danger" },
            soil:     { label: "Soil Moisture", value: "Normal", status: "good"   },
            light:    { label: "Light",         value: "Normal", status: "good"   }
        }
    },
    {
        id: 11, name: "Cold + Dry Air",           severe: false,
        image: "/static/images/cases/NON-SEVERE CASES/case11/plant.jpg",
        visual: "Firm leaves; inward curling; reduced expansion",
        reason: "Minor leaf curling",
        params: {
            temp:     { label: "Temperature",   value: "Low",    status: "danger"  },
            humidity: { label: "Humidity",      value: "Low",    status: "warning" },
            soil:     { label: "Soil Moisture", value: "Normal", status: "good"    },
            light:    { label: "Light",         value: "Normal", status: "good"    }
        }
    },
    {
        id: 14, name: "Low Light / Etiolation",   severe: false,
        image: "/static/images/cases/NON-SEVERE CASES/case14/plant.jpg",
        visual: "Tall, thin, pale leaves; weak stems (leggy)",
        reason: "Weak growth but plant survives",
        params: {
            temp:     { label: "Temperature",   value: "Optimal", status: "good"    },
            humidity: { label: "Humidity",      value: "Normal",  status: "good"    },
            soil:     { label: "Soil Moisture", value: "Normal",  status: "good"    },
            light:    { label: "Light",         value: "Low",     status: "warning" }
        }
    },
    {
        id: 15, name: "Excess Light Stress",      severe: false,
        image: "/static/images/cases/NON-SEVERE CASES/case15/plant.jpg",
        visual: "Thick, darker leaves; possible leaf burn at edges",
        reason: "Slight burn, still functional",
        params: {
            temp:     { label: "Temperature",   value: "Optimal", status: "good"   },
            humidity: { label: "Humidity",      value: "Normal",  status: "good"   },
            soil:     { label: "Soil Moisture", value: "Normal",  status: "good"   },
            light:    { label: "Light",         value: "High",    status: "danger" }
        }
    },
    {
        id: 16, name: "Humid + Low Light",        severe: false,
        image: "/static/images/cases/NON-SEVERE CASES/case16/plant.jpg",
        visual: "Pale, soft, elongated leaves; fungal spots",
        reason: "Stretching + mild fungal risk",
        params: {
            temp:     { label: "Temperature",   value: "Optimal", status: "good"    },
            humidity: { label: "Humidity",      value: "High",    status: "danger"  },
            soil:     { label: "Soil Moisture", value: "Normal",  status: "good"    },
            light:    { label: "Light",         value: "Low",     status: "warning" }
        }
    },
    {
        id: 17, name: "Dry Air + High Light",     severe: false,
        image: "/static/images/cases/NON-SEVERE CASES/case17/plant.jpg",
        visual: "Dry edges; curled leaves; darker but stressed",
        reason: "Mild dehydration stress",
        params: {
            temp:     { label: "Temperature",   value: "Optimal", status: "good"    },
            humidity: { label: "Humidity",      value: "Low",     status: "warning" },
            soil:     { label: "Soil Moisture", value: "Normal",  status: "good"    },
            light:    { label: "Light",         value: "High",    status: "danger"  }
        }
    },
    {
        id: 18, name: "Low Water + Low Light",    severe: false,
        image: "/static/images/cases/NON-SEVERE CASES/case18/plant.jpg",
        visual: "Small, pale, droopy plant; weak growth",
        reason: "Weak growth but not critical yet",
        params: {
            temp:     { label: "Temperature",   value: "Optimal", status: "good"    },
            humidity: { label: "Humidity",      value: "Normal",  status: "good"    },
            soil:     { label: "Soil Moisture", value: "Low",     status: "warning" },
            light:    { label: "Light",         value: "Low",     status: "warning" }
        }
    },
    {
        id: 22, name: "Hot + Humid + Low Light",  severe: false,
        image: "/static/images/cases/NON-SEVERE CASES/case22/plant.jpg",
        visual: "Pale, stretched leaves; fungal spots; weak plant",
        reason: "Weak + stretched, but not collapsing yet",
        params: {
            temp:     { label: "Temperature",   value: "High",   status: "danger"  },
            humidity: { label: "Humidity",      value: "High",   status: "danger"  },
            soil:     { label: "Soil Moisture", value: "Normal", status: "good"    },
            light:    { label: "Light",         value: "Low",    status: "warning" }
        }
    },

    /* ── SEVERE CASES (10) ──────────────────────────────── */
    {
        id: 5,  name: "Hot + Drought",                    severe: true,
        image: "/static/images/cases/SEVERE CASES/case5/plant.jpg",
        visual: "Whole plant wilts; drooping stems; yellowing outer leaves",
        reason: "Whole-plant wilting, dehydration",
        params: {
            temp:     { label: "Temperature",   value: "High",   status: "danger" },
            humidity: { label: "Humidity",      value: "Normal", status: "good"   },
            soil:     { label: "Soil Moisture", value: "Low",    status: "danger" },
            light:    { label: "Light",         value: "Normal", status: "good"   }
        }
    },
    {
        id: 6,  name: "Hot + Waterlogged",                severe: true,
        image: "/static/images/cases/SEVERE CASES/case6/plant.jpg",
        visual: "Yellow-green leaves; soft base; root rot; stunted growth",
        reason: "Root oxygen loss + rot",
        params: {
            temp:     { label: "Temperature",   value: "High",   status: "danger" },
            humidity: { label: "Humidity",      value: "Normal", status: "good"   },
            soil:     { label: "Soil Moisture", value: "High",   status: "danger" },
            light:    { label: "Light",         value: "Normal", status: "good"   }
        }
    },
    {
        id: 7,  name: "Hot + Humid + Dry Soil",           severe: true,
        image: "/static/images/cases/SEVERE CASES/case7/plant.jpg",
        visual: "Limp but moist leaves; uneven yellowing; patchy wilting",
        reason: "Conflicting stress — rapid decline",
        params: {
            temp:     { label: "Temperature",   value: "High",   status: "danger" },
            humidity: { label: "Humidity",      value: "High",   status: "danger" },
            soil:     { label: "Soil Moisture", value: "Low",    status: "danger" },
            light:    { label: "Light",         value: "Normal", status: "good"   }
        }
    },
    {
        id: 8,  name: "Hot + Humid + Waterlogged",        severe: true,
        image: "/static/images/cases/SEVERE CASES/case8/plant.jpg",
        visual: "Mushy stems; yellow leaves; fungal growth; plant collapse",
        reason: "Rot + fungus + tissue collapse",
        params: {
            temp:     { label: "Temperature",   value: "High",   status: "danger" },
            humidity: { label: "Humidity",      value: "High",   status: "danger" },
            soil:     { label: "Soil Moisture", value: "High",   status: "danger" },
            light:    { label: "Light",         value: "Normal", status: "good"   }
        }
    },
    {
        id: 12, name: "Cold + Dry Soil",                  severe: true,
        image: "/static/images/cases/SEVERE CASES/case12/plant.jpg",
        visual: "Small, stiff, yellowish leaves; poor development",
        reason: "Severe growth inhibition + dehydration",
        params: {
            temp:     { label: "Temperature",   value: "Low",    status: "danger" },
            humidity: { label: "Humidity",      value: "Normal", status: "good"   },
            soil:     { label: "Soil Moisture", value: "Low",    status: "danger" },
            light:    { label: "Light",         value: "Normal", status: "good"   }
        }
    },
    {
        id: 13, name: "Cold + Waterlogged",               severe: true,
        image: "/static/images/cases/SEVERE CASES/case13/plant.jpg",
        visual: "Yellow lower leaves; root rot; stunted plant",
        reason: "Root rot + stunted plant",
        params: {
            temp:     { label: "Temperature",   value: "Low",    status: "danger" },
            humidity: { label: "Humidity",      value: "Normal", status: "good"   },
            soil:     { label: "Soil Moisture", value: "High",   status: "danger" },
            light:    { label: "Light",         value: "Normal", status: "good"   }
        }
    },
    {
        id: 19, name: "Overwater + Low Light",            severe: true,
        image: "/static/images/cases/SEVERE CASES/case19/plant.jpg",
        visual: "Yellowish, soft leaves; weak structure; rot signs",
        reason: "Rot with no recovery energy",
        params: {
            temp:     { label: "Temperature",   value: "Optimal", status: "good"    },
            humidity: { label: "Humidity",      value: "Normal",  status: "good"    },
            soil:     { label: "Soil Moisture", value: "High",    status: "danger"  },
            light:    { label: "Light",         value: "Low",     status: "warning" }
        }
    },
    {
        id: 20, name: "Worst Case – Rot Conditions",      severe: true,
        image: "/static/images/cases/SEVERE CASES/case20/plant.jpg",
        visual: "Mushy yellow leaves; fungal growth; plant collapse",
        reason: "Full plant decay",
        params: {
            temp:     { label: "Temperature",   value: "Optimal", status: "good"    },
            humidity: { label: "Humidity",      value: "High",    status: "danger"  },
            soil:     { label: "Soil Moisture", value: "High",    status: "danger"  },
            light:    { label: "Light",         value: "Low",     status: "warning" }
        }
    },
    {
        id: 21, name: "Extreme Heat + Drought + Light",   severe: true,
        image: "/static/images/cases/SEVERE CASES/case21/plant.jpg",
        visual: "Rapid wilting; brown crispy leaves; plant death",
        reason: "Rapid death conditions",
        params: {
            temp:     { label: "Temperature",   value: "High",   status: "danger"  },
            humidity: { label: "Humidity",      value: "Any",    status: "warning" },
            soil:     { label: "Soil Moisture", value: "Low",    status: "danger"  },
            light:    { label: "Light",         value: "High",   status: "danger"  }
        }
    },
    {
        id: 23, name: "Cold + Wet + Dark",                severe: true,
        image: "/static/images/cases/SEVERE CASES/case23/plant.jpg",
        visual: "Yellow, decaying leaves; root rot; no growth",
        reason: "Decay + no metabolic recovery",
        params: {
            temp:     { label: "Temperature",   value: "Low",    status: "danger"  },
            humidity: { label: "Humidity",      value: "High",   status: "danger"  },
            soil:     { label: "Soil Moisture", value: "High",   status: "danger"  },
            light:    { label: "Light",         value: "Low",    status: "warning" }
        }
    }
];

/* ══════════════════════════════════════════════════════════════
   SINGLE SOURCE OF TRUTH — all thresholds for ESP32 12-bit ADC
   ADC range: 0–4095

   Air Temperature  : Recommended 20–34°C | Optimal 20–27°C
                      Warning:  18–19°C (low) | 35–37°C (high)
                      Danger:   < 18°C        | > 38°C
                      Philippine tropical cultivars tolerate up to 34°C;
                      local varieties heat-adapted for lowland conditions.

   Relative Humidity: Recommended 65–75%
                      Warning:  50–64% (low) | 76–85% (high)
                      Danger:   < 50%        | > 85%
                      Minimises Bacterial Soft Rot / Clubroot risk.

   Soil Moisture    : 0 = wet/saturated, 4095 = dry
                      Recommended 60–80% VWC = ADC 819–1638
                      Warning:  40–59% VWC = ADC 1639–2457 (getting dry)
                                81–90% VWC = ADC 410–818   (excess water)
                      Danger:   > 90% VWC = ADC <= 409     (waterlogged)
                                < 40% VWC = ADC > 2457     (critical drought)
                      Shallow-rooted crop; field capacity 60% lower threshold.

   Light Intensity  : Recommended 18,000–24,000 lux ≈ ADC 1800–2400
                      Warning:  10k–17k lux ≈ ADC 1000–1700 (low)
                                25k–27k lux ≈ ADC 2500–2700 (high)
                      Danger:   < 10k lux ≈ ADC < 1000      (too dark)
                                > 27k lux ≈ ADC > 2700      (excessive)
                      ADC↔lux ratio: ~0.1 ADC per lux (calibrated).
══════════════════════════════════════════════════════════════ */
const THRESHOLDS = {
    temp: {
        dangerLow:  18,    /* below = critical cold (<18°C)    */
        warnLow:    20,    /* 18–19°C = warning cold           */
        recLow:     20,    /* recommended range starts         */
        optHigh:    27,    /* optimal ceiling (midpoint)       */
        recHigh:    34,    /* recommended range ends           */
        warnHigh:   38,    /* 35–37°C = warning hot            */
        dangerHigh: 38     /* danger above 38°C                */
    },
    humidity: {
        dangerLow:  50,    /* below = critically dry (<50%)    */
        warnLow:    65,    /* 50–64% = warning dry             */
        recLow:     65,    /* recommended range starts         */
        recHigh:    75,    /* recommended range ends           */
        warnHigh:   85,    /* 76–85% = warning humid           */
        dangerHigh: 85     /* above = fungal danger (>85%)     */
    },
    soil: {
        /* INVERTED: 0 = wet/saturated, 4095 = dry             */
        dangerLow:   409,  /* <=409  ADC — waterlogged (>90% VWC wet) */
        warnLow:     818,  /* 410–818 ADC — excess water (81–90% VWC) */
        recLow:      819,  /* 819  ADC = ~80% VWC (moist upper limit) */
        recHigh:    1638,  /* 1638 ADC = ~60% VWC (field capacity)    */
        warnHigh:   2457,  /* 1639–2457 ADC — below field cap (40–59%)*/
        dangerHigh: 2457   /* >2457 ADC — critical drought (<40% VWC) */
    },
    light: {
        dangerLow:  1000,  /* <1000 ADC  = <10k lux  — too dark       */
        warnLow:    1800,  /* 1000–1700 ADC = 10k–17k lux (warning)   */
        recLow:     1800,  /* 1800 ADC = ~18,000 lux (rec. starts)    */
        recHigh:    2400,  /* 2400 ADC = ~24,000 lux (rec. ends)      */
        warnHigh:   2700,  /* 2500–2700 ADC = 25k–27k lux (warning)   */
        dangerHigh: 2700   /* >2700 ADC = >27k lux — excessive light  */
    }
};

/* Returns 'good' | 'warning' | 'danger' for any parameter + value */
function getParamStatus(param, value) {
    const t = THRESHOLDS[param];

    if (param === 'soil') {
        /* INVERTED scale: low ADC = wet, high ADC = dry */
        if (value <= t.dangerLow)  return 'danger';   /* waterlogged  */
        if (value <= t.warnLow)    return 'warning';  /* excess water */
        if (value <= t.recHigh)    return 'good';     /* optimal      */
        if (value <= t.warnHigh)   return 'warning';  /* getting dry  */
        return 'danger';                              /* drought      */
    }

    /* All other params: low value = cold/dry/dark, high value = hot/humid/bright */
    if (value < t.dangerLow)  return 'danger';
    if (value < t.warnLow)    return 'warning';
    if (value <= t.recHigh)   return 'good';
    if (value <= t.warnHigh)  return 'warning';
    return 'danger';
}

/* Human-readable status message */
function getParamLabel(param, value) {
    const s = getParamStatus(param, value);
    const t = THRESHOLDS[param];
    switch (param) {
        case 'temp':
            if (s === 'danger'  && value < t.dangerLow)  return 'Critical — below 18°C, severe cold damage';
            if (s === 'warning' && value < t.warnLow)    return 'Warning — cold stress (18–19°C)';
            if (s === 'good'   && value <= t.optHigh)    return 'Optimal range';
            if (s === 'good')                            return 'Within recommended range';
            if (s === 'warning' && value > t.recHigh)    return 'Warning — heat stress risk (35–37°C)';
            return 'Critical — severe heat stress above 38°C';
        case 'humidity':
            if (s === 'danger'  && value < t.dangerLow)  return 'Critical — below 50%, mist immediately';
            if (s === 'warning' && value < t.warnLow)    return 'Warning — low humidity (50–64%)';
            if (s === 'good')                            return 'Within recommended range';
            if (s === 'warning' && value > t.recHigh)   return 'Warning — high humidity, fungal risk (76–85%)';
            return 'Critical — extreme fungal pathogen risk above 85%';
        case 'soil':
            /* INVERTED: low ADC = wet, high ADC = dry */
            if (s === 'danger'  && value <= t.dangerLow) return 'Waterlogged — drainage needed (>90% VWC)';
            if (s === 'warning' && value <= t.warnLow)   return 'Excess water — reduce irrigation (81–90% VWC)';
            if (s === 'good')                            return 'Within recommended range (60–80% VWC)';
            if (s === 'warning' && value > t.recHigh)    return 'Low — below field capacity (40–59% VWC)';
            return 'Critical — water immediately (<40% VWC)';
        case 'light':
            if (s === 'danger'  && value < t.dangerLow)  return 'Critical — below 10,000 lux, too dark';
            if (s === 'warning' && value < t.warnLow)    return 'Warning — low light (10k–17k lux)';
            if (s === 'good')                            return 'Within recommended range (18k–24k lux)';
            if (s === 'warning' && value > t.recHigh)   return 'Warning — above saturation (25k–27k lux)';
            return 'Critical — excessive light stress above 27k lux';
    }
}

/* Subtitle string shown in recommendation cards */
function getParamSub(param, value) {
    switch (param) {
        case 'temp':     return `Now: ${value}°C | Recommended: 20°C – 34°C | Warning: 18–19°C / 35–37°C | Danger: <18°C / >38°C`;
        case 'humidity': return `Now: ${value}% | Recommended: 65% – 75% | Warning: 50–64% / 76–85% | Danger: <50% / >85%`;
        case 'soil':     return `Now: ${value} ADC | Recommended: 819–1638 ADC (60–80% VWC) | 0=wet, 4095=dry`;
        case 'light':    return `Now: ${value} ADC | Recommended: 1800–2400 ADC (~18k–24k lux)`;
    }
}

/* ── Build case card HTML ─────────────────────────────── */

/* Map a case's light label to one of 5 lighting state classes */
function getCaseLightClass(c) {
    const lv = c.params.light.value.toLowerCase();
    const ls = c.params.light.status;
    const adc = lv === 'low'  ? (ls === 'danger' ? 500   : 1300)
              : lv === 'high' ? (ls === 'danger' ? 2900  : 2580)
              : 2100; /* normal / optimal */
    if      (adc < THRESHOLDS.light.dangerLow)  return 'light-very-dark';
    else if (adc < THRESHOLDS.light.warnLow)    return 'light-dim';
    else if (adc <= THRESHOLDS.light.recHigh)   return 'light-normal';
    else if (adc <= THRESHOLDS.light.warnHigh)  return 'light-bright';
    else                                         return 'light-excessive';
}

function buildCaseCard(c) {
    const paramIcons = { temp: "🌡️", humidity: "💧", soil: "🌱", light: "☀️" };
    const paramsHTML = Object.entries(c.params).map(([key, p]) =>
        `<div class="ref-param-row">
            <span class="ref-param-icon">${paramIcons[key]}</span>
            <span class="ref-param-label">${p.label}</span>
            <span class="ref-param-value ${p.status}">${p.value}</span>
        </div>`
    ).join('');

    const badgeClass  = c.severe ? 'severe' : 'nonsevere';
    const badgeText   = c.severe ? '🔴 Severe' : '🟢 Non-Severe';
    const lightClass  = getCaseLightClass(c);

    return `<div class="ref-case-card ${c.severe ? 'severe' : ''}">
        <div class="ref-case-img-wrap ${lightClass}">
            <img src="${c.image}" alt="Case ${c.id}" loading="lazy" decoding="async"
                 onerror="this.style.display='none';this.parentElement.style.background='rgba(255,255,255,0.04)'">
            <span class="ref-severity-badge ${badgeClass}">${badgeText}</span>
        </div>
        <div class="ref-case-body">
            <span class="ref-case-number">Case ${String(c.id).padStart(2,'0')}</span>
            <p class="ref-case-name">${c.name}</p>
            <div class="ref-case-params">${paramsHTML}</div>
            <p class="ref-case-visual">🌿 ${c.visual}</p>
            <p class="ref-case-reason"><span class="ref-reason-label">Why ${c.severe ? 'severe' : 'non-severe'}:</span> ${c.reason}</p>
        </div>
    </div>`;
}

function getCasePlantImage(c) {
    const folder = c.severe ? 'SEVERE CASES' : 'NON-SEVERE CASES';
    return `/static/images/cases/${folder}/case${c.id}/${c.id}.png`;
}

/* ── Tab cache — built once, reused on tab switches ──── */
const _tabCache = {};

function getTabContent(tab) {
    if (_tabCache[tab]) return _tabCache[tab];
    const filtered = CASE_DATA.filter(c => tab === 'severe' ? c.severe : !c.severe);
    const title = tab === 'severe'
        ? '🔴 Severe Cases — critical conditions requiring immediate action'
        : '🟢 Non-Severe Cases — early or recoverable conditions';
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `<p class="ref-section-title">${title}</p><div class="ref-grid">${filtered.map(buildCaseCard).join('')}</div>`;
    _tabCache[tab] = wrapper;
    return wrapper;
}

function showTab(tab, contentEl) {
    const node = getTabContent(tab);
    if (contentEl.firstChild !== node) contentEl.replaceChildren(node);
}

/* ── Overlay open / close ─────────────────────────────── */
function initReferenceGuide() {
    const overlay        = document.getElementById('refOverlay');
    const openBtn        = document.getElementById('refGuideBtn');
    const closeBtn       = document.getElementById('refCloseBtn');
    const tabs           = document.querySelectorAll('.ref-tab');
    const content        = document.getElementById('refContent');
    const severeCount    = document.getElementById('severeCount');
    const nonsevereCount = document.getElementById('nonsevereCount');

    severeCount.textContent    = CASE_DATA.filter(c =>  c.severe).length;
    nonsevereCount.textContent = CASE_DATA.filter(c => !c.severe).length;

    /* start on non-severe tab */
    let activeTab = 'nonsevere';
    showTab(activeTab, content);
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === activeTab));

    function openOverlay()  { overlay.classList.add('open');    document.body.style.overflow = 'hidden'; }
    function closeOverlay() { overlay.classList.remove('open'); document.body.style.overflow = '';       }

    openBtn.addEventListener('click', openOverlay);
    closeBtn.addEventListener('click', closeOverlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeOverlay(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeOverlay(); });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.dataset.tab === activeTab) return;
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            activeTab = tab.dataset.tab;
            showTab(activeTab, content);
        });
    });
}

/* ═══════════════════════════════════════════════════════════
   ORIGINAL DASHBOARD LOGIC
═══════════════════════════════════════════════════════════ */

let tempChart, humidityChart, lightChart, soilChart;

function formatMinute(timestamp) {
    const d = new Date(timestamp);
    return String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
}

function formatSecond(timestamp) {
    const d = new Date(timestamp);
    return String(d.getHours()).padStart(2,'0') + ':' +
           String(d.getMinutes()).padStart(2,'0') + ':' +
           String(d.getSeconds()).padStart(2,'0');
}

function getFlaskGlow(status) {
    if (status === 'good')    return { shadow: '0 0 12px rgba(74,222,128,0.8), 0 0 32px rgba(74,222,128,0.4)',  border: 'rgba(74,222,128,0.6)'  };
    if (status === 'warning') return { shadow: '0 0 12px rgba(251,191,36,0.8), 0 0 32px rgba(251,191,36,0.4)',  border: 'rgba(251,191,36,0.6)'  };
    if (status === 'danger')  return { shadow: '0 0 12px rgba(248,113,113,0.8), 0 0 32px rgba(248,113,113,0.4)',border: 'rgba(248,113,113,0.6)' };
    return { shadow: 'none', border: 'rgba(255,255,255,0.2)' };
}

function applyFlaskGlow(tube, bulb, status) {
    const g = getFlaskGlow(status);
    if (tube) { tube.style.borderColor = g.border; tube.style.boxShadow = g.shadow; }
    if (bulb) { bulb.style.borderColor = g.border; bulb.style.boxShadow = `0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15), ${g.shadow}`; }
}

function updateTemperatureBar(temp, status) {
    const bar = document.getElementById("tempBar"), bulb = document.getElementById("tempBulb");
    const tube = bulb.previousElementSibling;
    /* Scale: 10°C bottom to 50°C top — covers full operating range with headroom */
    bar.style.height = (Math.max(0, Math.min(1, (temp - 10) / 40)) * 100) + "%";
    bar.style.background = "#e74c3c";
    bulb.style.background = "rgba(231,76,60,1)";
    document.querySelector(".temp-value-label").textContent = temp + "°C";
    applyFlaskGlow(tube, bulb, status);
}

function updateHumidityBar(humidity, status) {
    const bar = document.getElementById("humidityBar"), bulb = document.getElementById("humidityBulb");
    const tube = bulb.previousElementSibling;
    bar.style.height = (Math.max(0, Math.min(1, humidity / 100)) * 100) + "%";
    bar.style.background = "#3498db";
    bulb.style.background = "rgba(52,152,219,1)";
    document.querySelector(".humidity-value-label").textContent = humidity + "%";
    applyFlaskGlow(tube, bulb, status);
}

/* getSoilStatus delegates to unified getParamStatus (inverted scale handled there) */
function getSoilStatus(soil) {
    return getParamStatus('soil', soil);
}

function getSoilGlowFilter(status, brightness) {
    if (status === 'good')    return `brightness(${brightness}) drop-shadow(0 0 10px rgba(74,222,128,0.9))  drop-shadow(0 0 24px rgba(74,222,128,0.5))`;
    if (status === 'warning') return `brightness(${brightness}) drop-shadow(0 0 10px rgba(251,191,36,0.9))  drop-shadow(0 0 24px rgba(251,191,36,0.5))`;
    if (status === 'danger')  return `brightness(${brightness}) drop-shadow(0 0 10px rgba(248,113,113,0.9)) drop-shadow(0 0 24px rgba(248,113,113,0.5))`;
    return `brightness(${brightness})`;
}

function updateSoilGlow(soil) {
    const image = document.querySelector(".digital-twin-image");
    if (!image) return;
    if (_isHovering) return;   /* don't overwrite hover glow */
    const status     = getSoilStatus(soil);
    const brightness = document.querySelector(".digital-twin")?.style.getPropertyValue("--light-brightness") || "1";
    image.style.filter     = getSoilGlowFilter(status, brightness);
    image.style.transition = 'filter 0.6s ease';
}

function updateDigitalTwinLighting(light) {
    const twin = document.querySelector(".digital-twin"), pechay = document.querySelector(".pechay-overlay");
    if (!twin) return;

    const lx = "50%", ly = "0%";
    const px = "50%", py = "65%";

    let brightness, overlayGradient, lightShaft;

    if (light < THRESHOLDS.light.dangerLow) {
        /* < 1000 ADC — critically dark (<10k lux) */
        brightness    = 0.30;
        overlayGradient = `
            radial-gradient(ellipse 70% 55% at ${px} ${py},
                rgba(0,0,0,0)    0%,
                rgba(0,0,0,0.45) 40%,
                rgba(0,0,0,0.78) 70%,
                rgba(0,0,0,0.92) 100%),
            linear-gradient(180deg,
                rgba(0,0,0,0.6) 0%,
                rgba(0,0,0,0.2) 50%,
                rgba(0,0,0,0.5) 100%)`;
        lightShaft = `none`;

    } else if (light < THRESHOLDS.light.warnLow) {
        /* 1000–1799 ADC — warning low light (10k–17k lux) */
        brightness    = 0.62;
        overlayGradient = `
            radial-gradient(ellipse 80% 60% at ${px} ${py},
                rgba(0,0,0,0)    0%,
                rgba(0,0,0,0.18) 35%,
                rgba(0,0,0,0.50) 65%,
                rgba(0,0,0,0.72) 100%),
            linear-gradient(180deg,
                rgba(20,30,40,0.35) 0%,
                rgba(0,0,0,0)       60%,
                rgba(0,0,0,0.25)    100%)`;
        lightShaft = `
            radial-gradient(ellipse 30% 25% at ${lx} ${ly},
                rgba(180,200,220,0.06) 0%,
                rgba(180,200,220,0.02) 60%,
                transparent 100%)`;

    } else if (light <= THRESHOLDS.light.recHigh) {
        /* 1800–2400 ADC — recommended range (18k–24k lux) */
        brightness    = 1.0;
        overlayGradient = `
            radial-gradient(ellipse 60% 50% at ${px} ${py},
                rgba(0,0,0,0)    0%,
                rgba(0,0,0,0)    30%,
                rgba(0,0,0,0.18) 65%,
                rgba(0,0,0,0.38) 100%),
            linear-gradient(180deg,
                rgba(0,0,0,0.08) 0%,
                rgba(0,0,0,0)    40%,
                rgba(0,0,0,0.12) 100%)`;
        lightShaft = `
            radial-gradient(ellipse 45% 55% at ${lx} 10%,
                rgba(255,240,200,0.18) 0%,
                rgba(255,230,160,0.10) 35%,
                rgba(255,220,120,0.04) 65%,
                transparent 100%),
            radial-gradient(ellipse 25% 35% at ${px} 20%,
                rgba(255,245,220,0.10) 0%,
                transparent 70%)`;

    } else if (light <= THRESHOLDS.light.warnHigh) {
        /* 2401–2700 ADC — warning high light (25k–27k lux) */
        brightness    = 1.22;
        overlayGradient = `
            radial-gradient(ellipse 55% 45% at ${px} ${py},
                rgba(0,0,0,0)    0%,
                rgba(0,0,0,0)    20%,
                rgba(0,0,0,0.10) 55%,
                rgba(0,0,0,0.28) 100%),
            linear-gradient(180deg,
                rgba(0,0,0,0.04) 0%,
                rgba(0,0,0,0)    50%,
                rgba(0,0,0,0.08) 100%)`;
        lightShaft = `
            radial-gradient(ellipse 55% 70% at ${lx} 5%,
                rgba(255,245,180,0.30) 0%,
                rgba(255,235,140,0.18) 30%,
                rgba(255,220,100,0.08) 60%,
                transparent 100%),
            radial-gradient(ellipse 30% 40% at ${px} 15%,
                rgba(255,250,220,0.20) 0%,
                rgba(255,240,180,0.08) 50%,
                transparent 100%),
            radial-gradient(ellipse 80% 25% at 50% 0%,
                rgba(255,230,120,0.12) 0%,
                transparent 100%)`;

    } else {
        /* > 2700 ADC — excessive light (>27k lux) */
        brightness    = 1.50;
        overlayGradient = `
            radial-gradient(ellipse 50% 40% at ${px} ${py},
                rgba(0,0,0,0)    0%,
                rgba(0,0,0,0)    15%,
                rgba(0,0,0,0.08) 45%,
                rgba(0,0,0,0.22) 100%),
            linear-gradient(180deg,
                rgba(0,0,0,0)    0%,
                rgba(0,0,0,0)    60%,
                rgba(0,0,0,0.10) 100%)`;
        lightShaft = `
            radial-gradient(ellipse 70% 80% at ${lx} 0%,
                rgba(255,255,230,0.55) 0%,
                rgba(255,248,180,0.35) 20%,
                rgba(255,235,120,0.18) 45%,
                rgba(255,210,60,0.06)  70%,
                transparent 100%),
            radial-gradient(ellipse 40% 50% at ${px} 10%,
                rgba(255,255,240,0.30) 0%,
                rgba(255,245,180,0.12) 40%,
                transparent 100%),
            radial-gradient(ellipse 100% 20% at 50% 0%,
                rgba(255,240,150,0.25) 0%,
                transparent 100%)`;
    }

    twin.style.setProperty("--light-brightness", brightness);
    twin.style.setProperty("--overlay-gradient", overlayGradient.replace(/\n\s+/g, " "));
    twin.style.setProperty("--light-shaft",      lightShaft.replace(/\n\s+/g, " "));
    twin.style.transition = "all 1.2s ease";
    if (pechay && !_isHovering) { pechay.style.filter = `brightness(${brightness})`; pechay.style.transition = "filter 1.2s ease"; }
}

/* Soil image selection — INVERTED: low ADC = wet, high ADC = dry */
function updateDigitalTwinSoilImage(soil) {
    const image = document.querySelector(".digital-twin-image");
    if (!image) return;
    image.dataset.lastSoil = soil;
    const imageName = soil <= THRESHOLDS.soil.dangerLow  ? "soil_wet"
                    : soil <= THRESHOLDS.soil.recHigh    ? "soil_moist"
                    : "soil_dry";
    const newSrc = `/static/images/${imageName}.png`;
    if (!image.src.endsWith(newSrc)) {
        image.style.opacity = "0";
        setTimeout(() => { image.src = newSrc; image.style.opacity = "1"; }, 300);
    }
}

function startPechayAnimation() {
    const pechay = document.querySelector(".pechay-overlay");
    if (!pechay) return;
    const frames = ["/static/images/pechay.png","/static/images/pechay1.png","/static/images/pechay2.png","/static/images/pechay1.png"];
    let f = 0;
    setInterval(() => {
        f = (f + 1) % frames.length;
        const cf = pechay.style.filter;
        pechay.src = frames[f];
        pechay.style.filter = cf;
    }, 500);
}

/* ── Match current readings to closest CASE_DATA entry ───
   temp:     low(<20) | optimal(20-27) | tolerable(27-34) | high(>34)
   humidity: low(<65) | normal(65-75) | high(>75)
   soil:     INVERTED — high moisture=low ADC, low moisture=high ADC
   light:    low(<1800) | normal(1800-2400) | high(>2400)
─────────────────────────────────────────────────────────── */
function matchCurrentCase(temp, humidity, soil, light) {
    function tempCat(v) {
        if (v < THRESHOLDS.temp.warnLow)   return 'low';
        if (v <= THRESHOLDS.temp.optHigh)  return 'optimal';
        if (v <= THRESHOLDS.temp.recHigh)  return 'tolerable';
        return 'high';
    }
    function humCat(v) {
        if (v < THRESHOLDS.humidity.recLow)   return 'low';
        if (v <= THRESHOLDS.humidity.recHigh) return 'normal';
        return 'high';
    }
    function soilCat(v) {
        if (v <= THRESHOLDS.soil.dangerLow) return 'high';
        if (v <= THRESHOLDS.soil.recHigh)   return 'normal';
        return 'low';
    }
    function lightCat(v) {
        if (v < THRESHOLDS.light.recLow)   return 'low';
        if (v <= THRESHOLDS.light.recHigh) return 'normal';
        return 'high';
    }

    const tCat = tempCat(temp), hCat = humCat(humidity);
    const sCat = soilCat(soil),  lCat = lightCat(light);

    function normCase(v) {
        v = v.toLowerCase();
        if (v === 'optimal') return 'optimal';
        if (v === 'normal')  return 'normal';
        if (v === 'low')     return 'low';
        if (v === 'high')    return 'high';
        if (v === 'any')     return 'any';
        return v;
    }

    function matches(livecat, casecat) {
        if (casecat === 'any') return true;
        if (livecat === casecat) return true;
        if ((livecat === 'optimal' || livecat === 'normal') &&
            (casecat === 'optimal' || casecat === 'normal')) return true;
        if (livecat === 'tolerable' && casecat === 'high') return true;
        return false;
    }

    let best = null, bestScore = -1;
    CASE_DATA.forEach(c => {
        let score = 0;
        if (matches(tCat, normCase(c.params.temp.value)))     score += 2;
        if (matches(hCat, normCase(c.params.humidity.value))) score += 1.5;
        if (matches(sCat, normCase(c.params.soil.value)))     score += 1.5;
        if (matches(lCat, normCase(c.params.light.value)))    score += 1;
        if (score > bestScore) { bestScore = score; best = c; }
    });
    return best;
}

/* ── Populate the dynamic tooltip with a matched case ── */
function updateTooltipCase(c) {
    const img    = document.getElementById('tooltipCaseImg');
    const badge  = document.getElementById('tooltipCaseBadge');
    const num    = document.getElementById('tooltipCaseNumber');
    const name   = document.getElementById('tooltipCaseName');
    const params = document.getElementById('tooltipParams');
    if (!img || !c) return;

    img.src = c.image;
    img.alt = c.name;

    const liveLight = _liveReadings.light;
    const wrap = document.getElementById('tooltipImgWrap');
    if (wrap) {
        const lv = liveLight < THRESHOLDS.light.dangerLow ? 'low'
                 : liveLight < THRESHOLDS.light.warnLow   ? 'low'
                 : liveLight <= THRESHOLDS.light.recHigh  ? 'normal'
                 : 'high';
        const fakeCaseObj = { params: { light: { value: lv, status: getParamStatus('light', liveLight) } } };
        const lightClass = getCaseLightClass(fakeCaseObj);
        wrap.className = 'tooltip-case-img-wrap ' + lightClass;
    }
    img.style.filter = '';

    badge.textContent = c.severe ? '🔴 Severe' : '🟢 Non-Severe';
    badge.className   = `tooltip-case-badge ${c.severe ? 'severe' : 'nonsevere'}`;

    num.textContent  = `CASE ${String(c.id).padStart(2,'0')} — Best Match`;
    name.textContent = c.name;

    const header = document.getElementById('tooltipOutcomeHeader');
    const icon   = document.getElementById('tooltipOutcomeIcon');
    const lbl    = document.getElementById('tooltipOutcomeLabel');
    if (header && icon && lbl) {
        const keys = ['temp', 'humidity', 'soil', 'light'];
        const statuses = keys.map(k => getParamStatus(k, _liveReadings[k]));
        const dangerCount  = statuses.filter(s => s === 'danger').length;
        const warningCount = statuses.filter(s => s === 'warning').length;

        header.classList.remove('state-warning', 'state-danger');

        if (c.severe || dangerCount >= 2) {
            header.classList.add('state-danger');
            icon.textContent = '⚠️';
            lbl.textContent  = 'High Risk Outcome';
        } else if (dangerCount === 1 || warningCount >= 2) {
            header.classList.add('state-warning');
            icon.textContent = '⚡';
            lbl.textContent  = 'Possible Risk Outcome';
        } else {
            icon.textContent = '🔍';
            lbl.textContent  = 'Possible Outcome';
        }
    }

    const live = [
        { key: 'temp',     icon: '🌡️', label: 'Temperature',   value: `${_liveReadings.temp}°C`    },
        { key: 'humidity', icon: '💧', label: 'Humidity',       value: `${_liveReadings.humidity}%` },
        { key: 'soil',     icon: '🌱', label: 'Soil Moisture',  value: `${_liveReadings.soil} ADC`  },
        { key: 'light',    icon: '☀️', label: 'Light',          value: `${_liveReadings.light} ADC` }
    ];

    params.innerHTML = live.map(p => {
        const status = getParamStatus(p.key, _liveReadings[p.key]);
        return `<div class="tooltip-param-row">
            <span class="tooltip-param-icon">${p.icon}</span>
            <span class="tooltip-param-label">${p.label}</span>
            <span class="tooltip-param-value ${status}">${p.value}</span>
        </div>`;
    }).join('');
}

/* Live sensor readings cache */
const _liveReadings = { temp: 25, humidity: 70, soil: 1200, light: 2100 };

function initPlantHover() {
    const image   = document.querySelector(".digital-twin-image");
    const pechay  = document.querySelector(".pechay-overlay");
    const tooltip = document.getElementById("plantTooltip");
    const twin    = document.querySelector(".digital-twin");
    if (!tooltip || !twin) return;

    let animInterval = null;

    const frames = [
        "/static/images/pechay.png",
        "/static/images/pechay1.png",
        "/static/images/pechay2.png",
        "/static/images/pechay1.png"
    ];
    let frameIdx = 0;

    function startAnim() {
        if (animInterval) return;
        animInterval = setInterval(() => {
            frameIdx = (frameIdx + 1) % frames.length;
            const cf = pechay.style.filter;
            pechay.src = frames[frameIdx];
            pechay.style.filter = cf;
        }, 500);
    }

    function stopAnim() {
        clearInterval(animInterval);
        animInterval = null;
    }

    function showCasePlant(c) {
        stopAnim();
        pechay.style.transition = 'opacity 0.25s ease';
        pechay.style.opacity = '0';
        setTimeout(() => {
            pechay.src = getCasePlantImage(c);
            pechay.style.opacity = '1';
            if (_isHovering) applyGlow();
        }, 200);
    }

    function restoreAnim() {
        pechay.style.transition = 'opacity 0.25s ease';
        pechay.style.opacity = '0';
        setTimeout(() => {
            frameIdx = 0;
            pechay.src = frames[0];
            pechay.style.opacity = '1';
            startAnim();
        }, 200);
    }

    startAnim();

    const show = () => {
        tooltip.style.opacity = "1";
        tooltip.style.transform = "translateX(-50%) scale(1)";
    };
    const hide = () => {
        tooltip.style.opacity = "0";
        tooltip.style.transform = "translateX(-50%) scale(0.92)";
    };

    const applyGlow = () => {
        if (pechay) pechay.style.filter = "brightness(1.15) drop-shadow(0 0 16px rgba(74,222,128,0.6)) drop-shadow(0 0 32px rgba(74,222,128,0.25))";
        if (image)  image.style.filter  = getSoilGlowFilter(getSoilStatus(parseFloat(image.dataset.lastSoil || "1200")), 1.15);
    };
    const removeGlow = () => {
        const b = twin.style.getPropertyValue("--light-brightness") || "1";
        if (pechay) pechay.style.filter = `brightness(${b})`;
        if (image)  image.style.filter  = getSoilGlowFilter(getSoilStatus(parseFloat(image.dataset.lastSoil || "1200")), b);
    };

    twin.addEventListener("mousemove", e => {
        const on = e.target.classList.contains("pechay-overlay") ||
                   e.target.classList.contains("digital-twin-image");
        if (on && !_isHovering) {
            _isHovering = true;
            const matched = matchCurrentCase(
                _liveReadings.temp, _liveReadings.humidity,
                _liveReadings.soil, _liveReadings.light
            );
            updateTooltipCase(matched);
            showCasePlant(matched);
            show();
            applyGlow();
        } else if (!on && _isHovering) {
            _isHovering = false;
            hide();
            removeGlow();
            restoreAnim();
        }
    });

    twin.addEventListener("mouseleave", () => {
        if (!_isHovering) return;
        _isHovering = false;
        hide();
        removeGlow();
        restoreAnim();
    });
}

function updateRecommendations(temp, humidity, soil, light) {
    function setRec(id, vid, text, vals, status) {
        const el = document.getElementById(id), ve = document.getElementById(vid);
        const warn = el.closest('.rec-card').querySelector('.rec-warning');
        el.textContent = text; el.className = `rec-status ${status}`;
        if (ve) { ve.textContent = vals; ve.className = `rec-values ${status}`; }
        warn.classList.toggle('active', status !== 'good');
        warn.classList.toggle('danger', status === 'danger');
    }
    setRec('recTemp',     'recTempValues',     getParamLabel('temp',     temp),     getParamSub('temp',     temp),     getParamStatus('temp',     temp));
    setRec('recHumidity', 'recHumidityValues', getParamLabel('humidity', humidity), getParamSub('humidity', humidity), getParamStatus('humidity', humidity));
    setRec('recSoil',     'recSoilValues',     getParamLabel('soil',     soil),     getParamSub('soil',     soil),     getParamStatus('soil',     soil));
    setRec('recLight',    'recLightValues',    getParamLabel('light',    light),    getParamSub('light',    light),    getParamStatus('light',    light));
}

function updateTable(data) {
    const tbody = document.querySelector("#sensorTable tbody");
    tbody.innerHTML = "";
    data.slice(-8).reverse().forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${formatSecond(row[4])}</td><td class="temp-value">${row[0]}</td><td class="humidity-value">${row[1]}</td><td class="light-value">${row[2]}</td><td class="soil-value">${row[3]}</td>`;
        tbody.appendChild(tr);
    });
}

function createChart(id, label, labels, tooltips, data, chartVar, setChart, color) {
    if (chartVar) chartVar.destroy();
    setChart(new Chart(document.getElementById(id), {
        type: 'line',
        data: { labels, datasets: [{ label, data, tension: 0, borderWidth: 2, pointRadius: 3, borderColor: color, backgroundColor: color + "33", fill: true }] },
        options: {
            responsive: true, maintainAspectRatio: false, animation: false,
            plugins: { legend: { display: false }, title: { display: true, text: label }, tooltip: { callbacks: { title: ctx => tooltips[ctx[0].dataIndex] } } },
            scales: { x: { display: true, offset: true, ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 10 } }, y: { beginAtZero: false } }
        }
    }));
}

function updateEnvEdges(temp, humidity) {
    const tempEdge  = document.getElementById('tempEdge');
    const humidEdge = document.getElementById('humidEdge');
    if (!tempEdge || !humidEdge) return;

    const T = THRESHOLDS.temp;
    const H = THRESHOLDS.humidity;

    function applyEdge(el, gradient, borderSide, borderColor, height, pulse) {
        el.style.height     = height + '%';
        el.style.background = gradient;
        el.style.boxShadow  = `inset ${borderSide} ${borderColor}`;
        el.style.animation  = pulse ? `${el.dataset.anim} 1.2s ease-in-out infinite` : 'none';
        el.classList.add('visible');
    }

    function applyOptimal(el, direction, border) {
        el.style.height     = '10%';
        el.style.background = `linear-gradient(to ${direction}, rgba(74,222,128,0.22) 0%, rgba(74,222,128,0.08) 40%, transparent 100%)`;
        el.style.boxShadow  = `inset ${border} rgba(74,222,128,0.7)`;
        el.style.animation  = 'optimalBreath 3s ease-in-out infinite';
        el.classList.add('visible');
    }

    function clearEdge(el) {
        el.classList.remove('visible');
        el.style.height     = '0%';
        el.style.background = 'none';
        el.style.boxShadow  = 'none';
        el.style.animation  = 'none';
    }

    /* ── TEMPERATURE (top edge) ── */
    tempEdge.dataset.anim = 'edgePulseDanger';

    if (temp >= T.dangerHigh) {
        /* > 38°C — critical danger */
        const ratio  = Math.min((temp - T.dangerHigh) / 10, 1);
        const height = 15 + ratio * 45;
        const a1     = 0.50 + ratio * 0.30;
        const a2     = 0.20 + ratio * 0.18;
        const bA     = 0.80 + ratio * 0.20;
        const bW     = Math.round(4 + ratio * 4);
        tempEdge.dataset.anim = 'edgePulseDanger';
        applyEdge(tempEdge,
            `linear-gradient(to bottom, rgba(248,113,113,${a1}) 0%, rgba(248,113,113,${a2}) 35%, rgba(239,68,68,${a2*0.4}) 65%, transparent 100%)`,
            `0 ${bW}px 0 0`, `rgba(248,113,113,${bA})`,
            height, true
        );

    } else if (temp > T.recHigh) {
        /* 35–37°C — warning hot */
        const ratio  = Math.min((temp - T.recHigh) / (T.dangerHigh - T.recHigh), 1);
        const height = 12 + ratio * 20;
        const a1     = 0.25 + ratio * 0.25;
        const a2     = 0.08 + ratio * 0.12;
        const bA     = 0.50 + ratio * 0.30;
        const bW     = Math.round(2 + ratio * 2);
        applyEdge(tempEdge,
            `linear-gradient(to bottom, rgba(251,191,36,${a1}) 0%, rgba(251,191,36,${a2}) 35%, rgba(245,158,11,${a2*0.4}) 65%, transparent 100%)`,
            `0 ${bW}px 0 0`, `rgba(251,191,36,${bA})`,
            height, false
        );

    } else if (temp < T.dangerLow) {
        /* < 18°C — critical cold */
        const ratio  = Math.min((T.dangerLow - temp) / 10, 1);
        const height = 15 + ratio * 45;
        const a1     = 0.50 + ratio * 0.30;
        const a2     = 0.20 + ratio * 0.18;
        const bA     = 0.80 + ratio * 0.20;
        const bW     = Math.round(4 + ratio * 4);
        tempEdge.dataset.anim = 'edgePulseCold';
        applyEdge(tempEdge,
            `linear-gradient(to bottom, rgba(96,165,250,${a1}) 0%, rgba(96,165,250,${a2}) 35%, rgba(59,130,246,${a2*0.4}) 65%, transparent 100%)`,
            `0 ${bW}px 0 0`, `rgba(96,165,250,${bA})`,
            height, true
        );

    } else if (temp < T.warnLow) {
        /* 18–19°C — warning cold */
        const ratio  = Math.min((T.warnLow - temp) / (T.warnLow - T.dangerLow), 1);
        const height = 10 + ratio * 15;
        const a1     = 0.20 + ratio * 0.20;
        const a2     = 0.06 + ratio * 0.10;
        const bA     = 0.40 + ratio * 0.25;
        const bW     = Math.round(2 + ratio * 2);
        tempEdge.dataset.anim = 'edgePulseCold';
        applyEdge(tempEdge,
            `linear-gradient(to bottom, rgba(147,197,253,${a1}) 0%, rgba(147,197,253,${a2}) 35%, rgba(96,165,250,${a2*0.4}) 65%, transparent 100%)`,
            `0 ${bW}px 0 0`, `rgba(147,197,253,${bA})`,
            height, false
        );

    } else if (temp >= T.recLow && temp <= T.recHigh) {
        applyOptimal(tempEdge, 'bottom', '0 2px 0 0');

    } else {
        clearEdge(tempEdge);
    }

    /* ── HUMIDITY (bottom edge) ── */
    if (humidity >= H.dangerHigh) {
        /* > 85% — critical danger */
        const ratio  = Math.min((humidity - H.dangerHigh) / 15, 1);
        const height = 15 + ratio * 45;
        const a1     = 0.50 + ratio * 0.30;
        const a2     = 0.20 + ratio * 0.18;
        const bA     = 0.80 + ratio * 0.20;
        const bW     = Math.round(4 + ratio * 4);
        humidEdge.dataset.anim = 'edgePulseHumid';
        applyEdge(humidEdge,
            `linear-gradient(to top, rgba(34,211,238,${a1}) 0%, rgba(34,211,238,${a2}) 35%, rgba(6,182,212,${a2*0.4}) 65%, transparent 100%)`,
            `0 -${bW}px 0 0`, `rgba(34,211,238,${bA})`,
            height, true
        );

    } else if (humidity > H.recHigh) {
        /* 76–85% — warning humid */
        const ratio  = Math.min((humidity - H.recHigh) / (H.dangerHigh - H.recHigh), 1);
        const height = 10 + ratio * 20;
        const a1     = 0.22 + ratio * 0.28;
        const a2     = 0.08 + ratio * 0.12;
        const bA     = 0.45 + ratio * 0.35;
        const bW     = Math.round(2 + ratio * 2);
        humidEdge.dataset.anim = 'edgePulseHumid';
        applyEdge(humidEdge,
            `linear-gradient(to top, rgba(34,211,238,${a1}) 0%, rgba(34,211,238,${a2}) 35%, rgba(6,182,212,${a2*0.4}) 65%, transparent 100%)`,
            `0 -${bW}px 0 0`, `rgba(34,211,238,${bA})`,
            height, false
        );

    } else if (humidity < H.dangerLow) {
        /* < 50% — critically dry */
        const ratio  = Math.min((H.dangerLow - humidity) / 20, 1);
        const height = 15 + ratio * 45;
        const a1     = 0.50 + ratio * 0.30;
        const a2     = 0.20 + ratio * 0.18;
        const bA     = 0.80 + ratio * 0.20;
        const bW     = Math.round(4 + ratio * 4);
        humidEdge.dataset.anim = 'edgePulseDry';
        applyEdge(humidEdge,
            `linear-gradient(to top, rgba(248,113,113,${a1}) 0%, rgba(248,113,113,${a2}) 35%, rgba(239,68,68,${a2*0.4}) 65%, transparent 100%)`,
            `0 -${bW}px 0 0`, `rgba(248,113,113,${bA})`,
            height, true
        );

    } else if (humidity < H.recLow) {
        /* 50–64% — warning dry */
        const ratio  = Math.min((H.recLow - humidity) / (H.recLow - H.dangerLow), 1);
        const height = 10 + ratio * 18;
        const a1     = 0.22 + ratio * 0.22;
        const a2     = 0.07 + ratio * 0.10;
        const bA     = 0.42 + ratio * 0.28;
        const bW     = Math.round(2 + ratio * 2);
        humidEdge.dataset.anim = 'edgePulseDry';
        applyEdge(humidEdge,
            `linear-gradient(to top, rgba(251,191,36,${a1}) 0%, rgba(251,191,36,${a2}) 35%, rgba(245,158,11,${a2*0.4}) 65%, transparent 100%)`,
            `0 -${bW}px 0 0`, `rgba(251,191,36,${bA})`,
            height, false
        );

    } else if (humidity >= H.recLow && humidity <= H.recHigh) {
        applyOptimal(humidEdge, 'top', '0 -2px 0 0');

    } else {
        clearEdge(humidEdge);
    }
}

function getTempStatus(t)    { return getParamStatus('temp', t); }
function getHumidityStatus(h){ return getParamStatus('humidity', h); }

async function loadData() {
    const response = await fetch('/data');
    const data     = await response.json();
    const recent   = data.slice(-30);
    const labels   = recent.map(r => formatMinute(r[4]));
    const tooltips = recent.map(r => formatSecond(r[4]));
    const temps    = recent.map(r => r[0]), hums  = recent.map(r => r[1]);
    const lights   = recent.map(r => r[2]), soils = recent.map(r => r[3]);
    const lT = temps[temps.length-1], lH = hums[hums.length-1];
    const lS = soils[soils.length-1], lL = lights[lights.length-1];
    _liveReadings.temp = lT; _liveReadings.humidity = lH;
    _liveReadings.soil = lS; _liveReadings.light    = lL;
    updateTable(data);
    updateTemperatureBar(lT, getTempStatus(lT));
    updateHumidityBar(lH, getHumidityStatus(lH));
    updateRecommendations(lT, lH, lS, lL);
    updateEnvEdges(lT, lH);
    updateDigitalTwinLighting(lL);
    updateDigitalTwinSoilImage(lS);
    updateSoilGlow(lS);
    createChart("tempChart",     "Temperature (°C)",   labels, tooltips, temps,  tempChart,     c => tempChart     = c, "#e67e22");
    createChart("humidityChart", "Humidity (%)",        labels, tooltips, hums,   humidityChart, c => humidityChart = c, "#3498db");
    createChart("lightChart",    "Light (ADC)",         labels, tooltips, lights, lightChart,    c => lightChart    = c, "#f1c40f");
    createChart("soilChart",     "Soil Moisture (ADC)", labels, tooltips, soils,  soilChart,     c => soilChart     = c, "#8b5a2b");
}

/* INIT */
initPlantHover();
initReferenceGuide();
setInterval(loadData, 3000);
loadData();