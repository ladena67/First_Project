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

/* FLASK BARS */
function updateTemperatureBar(temp){
    const bar  = document.getElementById("tempBar");
    const bulb = document.getElementById("tempBulb");
    const minTemp = 10, maxTemp = 40;
    let percent = (temp - minTemp) / (maxTemp - minTemp);
    percent = Math.max(0, Math.min(1, percent));
    bar.style.height      = (percent * 100) + "%";
    bar.style.background  = "#e74c3c";
    bulb.style.background = "rgba(231, 76, 60, 0.85)";
    document.querySelector(".temp-value-label").textContent = temp + "°C";
}

function updateHumidityBar(humidity){
    const bar  = document.getElementById("humidityBar");
    const bulb = document.getElementById("humidityBulb");
    let percent = humidity / 100;
    percent = Math.max(0, Math.min(1, percent));
    bar.style.height      = (percent * 100) + "%";
    bar.style.background  = "#3498db";
    bulb.style.background = "rgba(52, 152, 219, 0.85)";
    document.querySelector(".humidity-value-label").textContent = humidity + "%";
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

    if (image) {
        image.style.filter     = `brightness(${brightness})`;
        image.style.transition = "filter 1s ease";
    }
    if (pechay) {
        pechay.style.filter     = `brightness(${brightness})`;
        pechay.style.transition = "filter 1s ease";
    }
}

/* DIGITAL TWIN SOIL IMAGE SWAP */
function updateDigitalTwinSoilImage(soil) {
    const image = document.querySelector(".digital-twin-image");
    if (!image) return;

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

    function applyGlow() {
        if (image)  image.style.filter  = "brightness(1.15) drop-shadow(0 0 12px rgba(74,222,128,0.5)) drop-shadow(0 0 24px rgba(74,222,128,0.2))";
        if (pechay) pechay.style.filter = "brightness(1.15) drop-shadow(0 0 16px rgba(74,222,128,0.6)) drop-shadow(0 0 32px rgba(74,222,128,0.25))";
    }

    function removeGlow() {
        const brightness = twin.style.getPropertyValue("--light-brightness") || "1";
        if (image)  image.style.filter  = `brightness(${brightness})`;
        if (pechay) pechay.style.filter = `brightness(${brightness})`;
    }

    twin.addEventListener("mousemove", (e) => {
        const t = e.target;
        const onPlant = t.classList.contains("pechay-overlay") ||
                        t.classList.contains("digital-twin-image");

        if (onPlant && !hovering) {
            /* just entered — apply once */
            hovering = true;
            showTooltip();
            applyGlow();
        } else if (!onPlant && hovering) {
            /* just left plant area */
            hovering = false;
            hideTooltip();
            removeGlow();
        }
        /* if onPlant && hovering — mouse is still there, do nothing */
    });

    twin.addEventListener("mouseleave", () => {
        hovering = false;
        hideTooltip();
        removeGlow();
    });

    /* re-apply glow after each src swap since filter may reset */
    const observer = new MutationObserver(() => {
        if (hovering) applyGlow();
    });

    if (pechay) {
        observer.observe(pechay, { attributes: true, attributeFilter: ["src"] });
    }
}

/* RECOMMENDATIONS */
function updateRecommendations(temp, humidity, soil, light) {

    function setRec(id, text, status) {
        const el      = document.getElementById(id);
        const card    = el.closest('.rec-card');
        const warning = card.querySelector('.rec-warning');
        el.textContent = text;
        el.className   = `rec-status ${status}`;
        if (status === 'good') {
            warning.classList.remove('active', 'danger');
        } else if (status === 'warning') {
            warning.classList.add('active');
            warning.classList.remove('danger');
        } else {
            warning.classList.add('active', 'danger');
        }
    }

    /* temperature — optimal 18-22C, tolerable up to 34C */
    if (temp < 18)       setRec('recTemp', 'Too cold — below 18°C',      'danger');
    else if (temp <= 22) setRec('recTemp', 'Optimal range',               'good');
    else if (temp <= 30) setRec('recTemp', 'Tolerable — monitor closely', 'warning');
    else if (temp <= 34) setRec('recTemp', 'High — provide ventilation',  'warning');
    else                 setRec('recTemp', 'Critical — heat stress risk',  'danger');

    /* humidity — optimal 65-75%, danger above 80% */
    if (humidity < 50)        setRec('recHumidity', 'Too dry — mist or irrigate', 'danger');
    else if (humidity < 65)   setRec('recHumidity', 'Low — increase moisture',    'warning');
    else if (humidity <= 75)  setRec('recHumidity', 'Optimal range',              'good');
    else if (humidity <= 80)  setRec('recHumidity', 'Slightly high — monitor',    'warning');
    else                      setRec('recHumidity', 'Danger — fungal risk',        'danger');

    /* soil moisture — optimal 614-819 ADC (60-80%) */
    if (soil < 410)       setRec('recSoil', 'Critical — water immediately', 'danger');
    else if (soil < 614)  setRec('recSoil', 'Low — below field capacity',   'warning');
    else if (soil <= 819) setRec('recSoil', 'Optimal range',                'good');
    else if (soil <= 921) setRec('recSoil', 'High — reduce irrigation',     'warning');
    else                  setRec('recSoil', 'Waterlogged — drainage needed', 'danger');

    /* light intensity — optimal 272-545 ADC (~22,000 lux) */
    if (light < 90)        setRec('recLight', 'Too dark — insufficient growth', 'danger');
    else if (light < 272)  setRec('recLight', 'Low — below saturation point',   'warning');
    else if (light <= 545) setRec('recLight', 'Optimal range',                  'good');
    else if (light <= 727) setRec('recLight', 'High — monitor for stress',      'warning');
    else                   setRec('recLight', 'Excessive — provide shade',       'danger');
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

    updateTable(data);
    updateTemperatureBar(latestTemp);
    updateHumidityBar(latestHumidity);
    updateRecommendations(latestTemp, latestHumidity, latestSoil, latestLight);
    updateDigitalTwinLighting(500);
    updateDigitalTwinSoilImage(latestSoil);

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