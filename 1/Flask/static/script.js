let tempChart, humidityChart, lightChart, soilChart;

/* TIME FORMATTERS */
function formatMinute(timestamp){
    const d = new Date(timestamp);
    const phDate = new Date(d.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
    return String(phDate.getHours()).padStart(2,'0') + ':' +
           String(phDate.getMinutes()).padStart(2,'0');
}

function formatSecond(timestamp){
    const d = new Date(timestamp);
    const phDate = new Date(d.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
    return String(phDate.getHours()).padStart(2,'0')   + ':' +
           String(phDate.getMinutes()).padStart(2,'0') + ':' +
           String(phDate.getSeconds()).padStart(2,'0');
}

/* FLASK GLOW */
function getFlaskGlow(status) {
    if (status === 'good')    return { shadow: '0 0 12px rgba(74,222,128,0.8), 0 0 32px rgba(74,222,128,0.4)', border: 'rgba(74,222,128,0.6)'  };
    if (status === 'warning') return { shadow: '0 0 12px rgba(251,191,36,0.8), 0 0 32px rgba(251,191,36,0.4)',  border: 'rgba(251,191,36,0.6)'  };
    if (status === 'danger')  return { shadow: '0 0 12px rgba(248,113,113,0.8), 0 0 32px rgba(248,113,113,0.4)', border: 'rgba(248,113,113,0.6)' };
    return { shadow: 'none', border: 'rgba(255,255,255,0.2)' };
}

function applyFlaskGlow(tube, bulb, status) {
    const glow = getFlaskGlow(status);
    if (tube) {
        tube.style.borderColor = glow.border;
        tube.style.boxShadow   = glow.shadow;
    }
    if (bulb) {
        bulb.style.borderColor = glow.border;
        bulb.style.boxShadow   = `0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15), ${glow.shadow}`;
    }
}

/* FLASK BARS */
function updateTemperatureBar(temp, status) {
    const bar  = document.getElementById("tempBar");
    const bulb = document.getElementById("tempBulb");
    const tube = bulb.previousElementSibling;
    const minTemp = 10, maxTemp = 40;
    let percent = (temp - minTemp) / (maxTemp - minTemp);
    percent = Math.max(0, Math.min(1, percent));
    bar.style.height      = (percent * 100) + "%";
    bar.style.background  = "#e74c3c";
    bulb.style.background = "rgba(231, 76, 60, 1)";
    document.querySelector(".temp-value-label").textContent = temp + "°C";
    applyFlaskGlow(tube, bulb, status);
}

function updateHumidityBar(humidity, status) {
    const bar  = document.getElementById("humidityBar");
    const bulb = document.getElementById("humidityBulb");
    const tube = bulb.previousElementSibling;
    let percent = humidity / 100;
    percent = Math.max(0, Math.min(1, percent));
    bar.style.height      = (percent * 100) + "%";
    bar.style.background  = "#3498db";
    bulb.style.background = "rgba(52, 152, 219, 1)";
    document.querySelector(".humidity-value-label").textContent = humidity + "%";
    applyFlaskGlow(tube, bulb, status);
}

/* SOIL GLOW */
function getSoilStatus(soil) {
    if (soil < 410 || soil > 921) return 'danger';
    if (soil >= 614 && soil <= 819) return 'good';
    return 'warning';
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
    const status     = getSoilStatus(soil);
    const brightness = document.querySelector(".digital-twin")?.style.getPropertyValue("--light-brightness") || "1";
    image.style.filter     = getSoilGlowFilter(status, brightness);
    image.style.transition = 'filter 0.6s ease';
}

/* DIGITAL TWIN LIGHTING */
function updateDigitalTwinLighting(light) {
    const twin   = document.querySelector(".digital-twin");
    const image  = document.querySelector(".digital-twin-image");
    const pechay = document.querySelector(".pechay-overlay");

    if (!twin) return;

    const originX = "50%";
    const originY = "75%";
    let brightness, overlayGradient;

    if (light < 90) {
        brightness      = 0.35;
        overlayGradient = `radial-gradient(ellipse at ${originX} ${originY},
            rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.75) 100%)`;
    } else if (light < 272) {
        brightness      = 0.60;
        overlayGradient = `radial-gradient(ellipse at ${originX} ${originY},
            rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.55) 100%)`;
    } else if (light <= 545) {
        brightness      = 1.0;
        overlayGradient = `radial-gradient(ellipse at ${originX} ${originY},
            rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)`;
    } else if (light <= 727) {
        brightness      = 1.2;
        overlayGradient = `radial-gradient(ellipse at ${originX} ${originY},
            rgba(255,220,120,0.25) 0%, rgba(255,200,80,0.12) 40%, rgba(0,0,0,0) 100%)`;
    } else {
        brightness      = 1.5;
        overlayGradient = `radial-gradient(ellipse at ${originX} ${originY},
            rgba(255,210,80,0.5) 0%, rgba(255,190,50,0.3) 40%, rgba(255,160,20,0.1) 100%)`;
    }

    twin.style.setProperty("--light-brightness", brightness);
    twin.style.setProperty("--overlay-gradient", overlayGradient);
    twin.style.transition = "all 1s ease";

    /* pechay brightness only — soil image gets its own filter via updateSoilGlow */
    if (pechay) {
        pechay.style.filter     = `brightness(${brightness})`;
        pechay.style.transition = "filter 1s ease";
    }
}

/* DIGITAL TWIN SOIL IMAGE SWAP */
function updateDigitalTwinSoilImage(soil) {
    const image = document.querySelector(".digital-twin-image");
    if (!image) return;

    image.dataset.lastSoil = soil;

    let imageName;
    if (soil < 410)       imageName = "soil_dry";
    else if (soil <= 819) imageName = "soil_moist";
    else                  imageName = "soil_wet";

    const newSrc = `/static/images/${imageName}.png`;
    if (!image.src.endsWith(newSrc)) {
        image.style.opacity = "0";
        setTimeout(() => {
            image.src           = newSrc;
            image.style.opacity = "1";
        }, 300);
    }
}

/* PECHAY 3-FRAME ANIMATION */
function startPechayAnimation() {
    const pechay = document.querySelector(".pechay-overlay");
    if (!pechay) return;

    const frames = [
        "/static/images/pechay.png",
        "/static/images/pechay1.png",
        "/static/images/pechay2.png",
        "/static/images/pechay1.png"
    ];

    let currentFrame = 0;

    setInterval(() => {
        currentFrame = (currentFrame + 1) % frames.length;
        const currentFilter = pechay.style.filter;
        pechay.src          = frames[currentFrame];
        pechay.style.filter = currentFilter;
    }, 500);
}

/* PLANT HOVER — tooltip + glow */
function initPlantHover() {
    const image   = document.querySelector(".digital-twin-image");
    const pechay  = document.querySelector(".pechay-overlay");
    const tooltip = document.getElementById("plantTooltip");
    const twin    = document.querySelector(".digital-twin");

    if (!tooltip || !twin) return;

    let hovering = false;

    function showTooltip() {
        tooltip.style.opacity   = "1";
        tooltip.style.transform = "translateX(-50%) scale(1)";
    }

    function hideTooltip() {
        tooltip.style.opacity   = "0";
        tooltip.style.transform = "translateX(-50%) scale(0.92)";
    }

    function applyHoverGlow() {
        /* pechay gets hover green glow */
        if (pechay) pechay.style.filter = "brightness(1.15) drop-shadow(0 0 16px rgba(74,222,128,0.6)) drop-shadow(0 0 32px rgba(74,222,128,0.25))";
        /* pot keeps its soil status glow but brightens */
        if (image) {
            const soil       = parseFloat(image.dataset.lastSoil || "700");
            const status     = getSoilStatus(soil);
            image.style.filter = getSoilGlowFilter(status, 1.15);
        }
    }

    function removeHoverGlow() {
        const brightness = twin.style.getPropertyValue("--light-brightness") || "1";
        if (pechay) pechay.style.filter = `brightness(${brightness})`;
        /* restore soil glow at correct brightness */
        if (image) {
            const soil   = parseFloat(image.dataset.lastSoil || "700");
            const status = getSoilStatus(soil);
            image.style.filter = getSoilGlowFilter(status, brightness);
        }
    }

    twin.addEventListener("mousemove", (e) => {
        const t = e.target;
        const onPlant = t.classList.contains("pechay-overlay") ||
                        t.classList.contains("digital-twin-image");

        if (onPlant && !hovering) {
            hovering = true;
            showTooltip();
            applyHoverGlow();
        } else if (!onPlant && hovering) {
            hovering = false;
            hideTooltip();
            removeHoverGlow();
        }
    });

    twin.addEventListener("mouseleave", () => {
        hovering = false;
        hideTooltip();
        removeHoverGlow();
    });

    const observer = new MutationObserver(() => {
        if (hovering) applyHoverGlow();
    });

    if (pechay) {
        observer.observe(pechay, { attributes: true, attributeFilter: ["src"] });
    }
}

/* RECOMMENDATIONS */
function updateRecommendations(temp, humidity, soil, light) {

    function setRec(id, valuesId, text, valuesText, status) {
        const el      = document.getElementById(id);
        const valEl   = document.getElementById(valuesId);
        const card    = el.closest('.rec-card');
        const warning = card.querySelector('.rec-warning');
        el.textContent = text;
        el.className   = `rec-status ${status}`;
        if (valEl) {
            valEl.textContent = valuesText;
            valEl.className   = `rec-values ${status}`;
        }
        if (status === 'good') {
            warning.classList.remove('active', 'danger');
        } else if (status === 'warning') {
            warning.classList.add('active');
            warning.classList.remove('danger');
        } else {
            warning.classList.add('active', 'danger');
        }
    }

    /* TEMPERATURE — optimal 18–22°C */
    if (temp < 18)       setRec('recTemp', 'recTempValues', 'Too cold — below 18°C',      `Now: ${temp}°C | Optimal: 18°C – 22°C`, 'danger');
    else if (temp <= 22) setRec('recTemp', 'recTempValues', 'Optimal range',               `Now: ${temp}°C | Optimal: 18°C – 22°C`, 'good');
    else if (temp <= 30) setRec('recTemp', 'recTempValues', 'Tolerable — monitor closely', `Now: ${temp}°C | Optimal: 18°C – 22°C`, 'warning');
    else if (temp <= 34) setRec('recTemp', 'recTempValues', 'High — provide ventilation',  `Now: ${temp}°C | Optimal: 18°C – 22°C`, 'warning');
    else                 setRec('recTemp', 'recTempValues', 'Critical — heat stress risk',  `Now: ${temp}°C | Optimal: 18°C – 22°C`, 'danger');

    /* HUMIDITY — optimal 65–75% */
    if (humidity < 50)       setRec('recHumidity', 'recHumidityValues', 'Too dry — mist or irrigate', `Now: ${humidity}% | Optimal: 65% – 75%`, 'danger');
    else if (humidity < 65)  setRec('recHumidity', 'recHumidityValues', 'Low — increase moisture',    `Now: ${humidity}% | Optimal: 65% – 75%`, 'warning');
    else if (humidity <= 75) setRec('recHumidity', 'recHumidityValues', 'Optimal range',              `Now: ${humidity}% | Optimal: 65% – 75%`, 'good');
    else if (humidity <= 80) setRec('recHumidity', 'recHumidityValues', 'Slightly high — monitor',    `Now: ${humidity}% | Optimal: 65% – 75%`, 'warning');
    else                     setRec('recHumidity', 'recHumidityValues', 'Danger — fungal risk',        `Now: ${humidity}% | Optimal: 65% – 75%`, 'danger');

    /* SOIL MOISTURE — optimal 614–819 ADC */
    if (soil < 410)       setRec('recSoil', 'recSoilValues', 'Critical — water immediately', `Now: ${soil} | Optimal: 614 – 819 ADC`, 'danger');
    else if (soil < 614)  setRec('recSoil', 'recSoilValues', 'Low — below field capacity',   `Now: ${soil} | Optimal: 614 – 819 ADC`, 'warning');
    else if (soil <= 819) setRec('recSoil', 'recSoilValues', 'Optimal range',                `Now: ${soil} | Optimal: 614 – 819 ADC`, 'good');
    else if (soil <= 921) setRec('recSoil', 'recSoilValues', 'High — reduce irrigation',     `Now: ${soil} | Optimal: 614 – 819 ADC`, 'warning');
    else                  setRec('recSoil', 'recSoilValues', 'Waterlogged — drainage needed', `Now: ${soil} | Optimal: 614 – 819 ADC`, 'danger');

    /* LIGHT INTENSITY — optimal 272–545 ADC */
    if (light < 90)        setRec('recLight', 'recLightValues', 'Too dark — insufficient growth', `Now: ${light} | Optimal: 272 – 545 ADC`, 'danger');
    else if (light < 272)  setRec('recLight', 'recLightValues', 'Low — below saturation point',   `Now: ${light} | Optimal: 272 – 545 ADC`, 'warning');
    else if (light <= 545) setRec('recLight', 'recLightValues', 'Optimal range',                  `Now: ${light} | Optimal: 272 – 545 ADC`, 'good');
    else if (light <= 727) setRec('recLight', 'recLightValues', 'High — monitor for stress',      `Now: ${light} | Optimal: 272 – 545 ADC`, 'warning');
    else                   setRec('recLight', 'recLightValues', 'Excessive — provide shade',       `Now: ${light} | Optimal: 272 – 545 ADC`, 'danger');
}

/* TABLE */
function updateTable(data){
    const tableBody = document.querySelector("#sensorTable tbody");
    tableBody.innerHTML = "";
    data.slice(-8).reverse().forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${formatSecond(row[4])}</td>
            <td class="temp-value">${row[0]}</td>
            <td class="humidity-value">${row[1]}</td>
            <td class="light-value">${row[2]}</td>
            <td class="soil-value">${row[3]}</td>
        `;
        tableBody.appendChild(tr);
    });
}

/* CHART CREATOR */
function createChart(canvasId, label, labels, tooltips, data, chartVar, setChart, color){
    if (chartVar) chartVar.destroy();
    const chart = new Chart(document.getElementById(canvasId), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                tension: 0,
                borderWidth: 2,
                pointRadius: 3,
                borderColor: color,
                backgroundColor: color + "33",
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            plugins: {
                legend:  { display: false },
                title:   { display: true, text: label },
                tooltip: {
                    callbacks: {
                        title: (context) => tooltips[context[0].dataIndex]
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    offset: true,
                    ticks: { maxRotation: 0, minRotation: 0, autoSkip: true, maxTicksLimit: 10 }
                },
                y: { beginAtZero: false }
            }
        }
    });
    setChart(chart);
}

/* STATUS HELPERS */
function getTempStatus(temp) {
    if (temp < 18 || temp > 34) return 'danger';
    if (temp <= 22)             return 'good';
    return 'warning';
}

function getHumidityStatus(humidity) {
    if (humidity < 50 || humidity > 80)      return 'danger';
    if (humidity >= 65 && humidity <= 75)    return 'good';
    return 'warning';
}

/* LOAD DATA */
async function loadData(){
    const response = await fetch('/data');
    const data     = await response.json();

    const recent   = data.slice(-30);
    const labels   = recent.map(row => formatMinute(row[4]));
    const tooltips = recent.map(row => formatSecond(row[4]));
    const temps    = recent.map(row => row[0]);
    const hums     = recent.map(row => row[1]);
    const lights   = recent.map(row => row[2]);
    const soils    = recent.map(row => row[3]);

    const latestTemp     = temps[temps.length - 1];
    const latestHumidity = hums[hums.length - 1];
    const latestSoil     = soils[soils.length - 1];
    const latestLight    = lights[lights.length - 1];

    /* statuses computed AFTER latest values are defined */
    const tempStatus     = getTempStatus(latestTemp);
    const humidityStatus = getHumidityStatus(latestHumidity);

    updateTable(data);
    updateTemperatureBar(latestTemp, tempStatus);
    updateHumidityBar(latestHumidity, humidityStatus);
    updateRecommendations(latestTemp, latestHumidity, latestSoil, latestLight);
    updateDigitalTwinLighting(latestLight);
    updateDigitalTwinSoilImage(latestSoil);
    updateSoilGlow(latestSoil);

    createChart("tempChart",     "Temperature (°C)",   labels, tooltips, temps,  tempChart,     (c) => tempChart     = c, "#e67e22");
    createChart("humidityChart", "Humidity (%)",        labels, tooltips, hums,   humidityChart, (c) => humidityChart = c, "#3498db");
    createChart("lightChart",    "Light (ADC)",         labels, tooltips, lights, lightChart,    (c) => lightChart    = c, "#f1c40f");
    createChart("soilChart",     "Soil Moisture (ADC)", labels, tooltips, soils,  soilChart,     (c) => soilChart     = c, "#8b5a2b");
}

/* INIT */
startPechayAnimation();
initPlantHover();
setInterval(loadData, 3000);
loadData();