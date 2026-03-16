let tempChart, humidityChart, lightChart, soilChart;

function formatMinute(timestamp){
    const d = new Date(timestamp);
    const phDate = new Date(d.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
    const hour   = String(phDate.getHours()).padStart(2,'0');
    const minute = String(phDate.getMinutes()).padStart(2,'0');
    return `${hour}:${minute}`;
}

function formatSecond(timestamp){
    const d = new Date(timestamp);
    const phDate = new Date(d.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
    const hour   = String(phDate.getHours()).padStart(2,'0');
    const minute = String(phDate.getMinutes()).padStart(2,'0');
    const second = String(phDate.getSeconds()).padStart(2,'0');
    return `${hour}:${minute}:${second}`;
}

/* TEMPERATURE BAR */
function updateTemperatureBar(temp){
    const bar  = document.getElementById("tempBar");
    const bulb = document.getElementById("tempBulb");

    const minTemp = 10, maxTemp = 40;
    let percent = (temp - minTemp) / (maxTemp - minTemp);
    percent = Math.max(0, Math.min(1, percent));
    bar.style.height = (percent * 100) + "%";
    document.querySelector(".temp-value-label").textContent = temp + "°C";

    bar.style.background  = "#e74c3c";
    bulb.style.background = "rgba(231, 76, 60, 0.85)";
}

/* HUMIDITY BAR */
function updateHumidityBar(humidity){
    const bar  = document.getElementById("humidityBar");
    const bulb = document.getElementById("humidityBulb");

    let percent = humidity / 100;
    percent = Math.max(0, Math.min(1, percent));
    bar.style.height = (percent * 100) + "%";
    document.querySelector(".humidity-value-label").textContent = humidity + "%";

    bar.style.background  = "#3498db";
    bulb.style.background = "rgba(52, 152, 219, 0.85)";
}


function updateRecommendations(temp, humidity, soil, light) {

    // TEMPERATURE — optimal: 18–22°C, tolerable: 22–34°C, critical beyond
    const recTemp = document.getElementById('recTemp');
    if (temp < 18) {
        recTemp.textContent = 'Too cold — below 18°C';
        recTemp.className   = 'rec-status danger';
    } else if (temp <= 22) {
        recTemp.textContent = 'Optimal range';
        recTemp.className   = 'rec-status good';
    } else if (temp <= 30) {
        recTemp.textContent = 'Tolerable — monitor closely';
        recTemp.className   = 'rec-status warning';
    } else if (temp <= 34) {
        recTemp.textContent = 'High — provide ventilation';
        recTemp.className   = 'rec-status warning';
    } else {
        recTemp.textContent = 'Critical — heat stress risk';
        recTemp.className   = 'rec-status danger';
    }

    // HUMIDITY — optimal: 65–75%, danger above 80% (fungal risk)
    const recHum = document.getElementById('recHumidity');
    if (humidity < 50) {
        recHum.textContent = 'Too dry — mist or irrigate';
        recHum.className   = 'rec-status danger';
    } else if (humidity < 65) {
        recHum.textContent = 'Low — increase moisture';
        recHum.className   = 'rec-status warning';
    } else if (humidity <= 75) {
        recHum.textContent = 'Optimal range';
        recHum.className   = 'rec-status good';
    } else if (humidity <= 80) {
        recHum.textContent = 'Slightly high — monitor';
        recHum.className   = 'rec-status warning';
    } else {
        recHum.textContent = 'Danger — fungal risk';
        recHum.className   = 'rec-status danger';
    }

    // SOIL MOISTURE — 10-bit ADC (0–1023)
    // optimal: 614–819 (60–80% field capacity)
    const recSoil = document.getElementById('recSoil');
    if (soil < 410) {
        recSoil.textContent = 'Critical — water immediately';
        recSoil.className   = 'rec-status danger';
    } else if (soil < 614) {
        recSoil.textContent = 'Low — below field capacity';
        recSoil.className   = 'rec-status warning';
    } else if (soil <= 819) {
        recSoil.textContent = 'Optimal range';
        recSoil.className   = 'rec-status good';
    } else if (soil <= 921) {
        recSoil.textContent = 'High — reduce irrigation';
        recSoil.className   = 'rec-status warning';
    } else {
        recSoil.textContent = 'Waterlogged — drainage needed';
        recSoil.className   = 'rec-status danger';
    }

    // LIGHT INTENSITY — 10-bit ADC (0–1023)
    // optimal: 272–545 ADC (15,000–30,000 lux, target ~22,000 lux = 398 ADC)
    const recLight = document.getElementById('recLight');
    if (light < 90) {
        recLight.textContent = 'Too dark — insufficient growth';
        recLight.className   = 'rec-status danger';
    } else if (light < 272) {
        recLight.textContent = 'Low — below saturation point';
        recLight.className   = 'rec-status warning';
    } else if (light <= 545) {
        recLight.textContent = 'Optimal range';
        recLight.className   = 'rec-status good';
    } else if (light <= 727) {
        recLight.textContent = 'High — monitor for stress';
        recLight.className   = 'rec-status warning';
    } else {
        recLight.textContent = 'Excessive — provide shade';
        recLight.className   = 'rec-status danger';
    }
}

/* LOAD DATA */
async function loadData(){
    const response = await fetch('/data');
    const data     = await response.json();

    const recent = data.slice(-30);

    const labels   = recent.map(row => formatMinute(row[4]));
    const tooltips = recent.map(row => formatSecond(row[4]));
    const temps    = recent.map(row => row[0]);
    const hums     = recent.map(row => row[1]);
    const lights   = recent.map(row => row[2]);
    const soils    = recent.map(row => row[3]);

    updateTable(data);

    const latestTemp     = temps[temps.length - 1];
    const latestHumidity = hums[hums.length - 1];
    const latestSoil     = soils[soils.length - 1];
    const latestLight    = lights[lights.length - 1];

    updateTemperatureBar(latestTemp);
    updateHumidityBar(latestHumidity);
    updateRecommendations(latestTemp, latestHumidity, latestSoil, latestLight);

    createChart("tempChart",     "Temperature (°C)", labels, tooltips, temps,  tempChart,     (c) => tempChart     = c, "#e67e22");
    createChart("humidityChart", "Humidity (%)",      labels, tooltips, hums,   humidityChart, (c) => humidityChart = c, "#3498db");
    createChart("lightChart",    "Light (ADC)",       labels, tooltips, lights, lightChart,    (c) => lightChart    = c, "#f1c40f");
    createChart("soilChart",     "Soil Moisture (ADC)", labels, tooltips, soils, soilChart,   (c) => soilChart     = c, "#8b5a2b");
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
                legend: { display: false },
                title:  { display: true, text: label },
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

setInterval(loadData, 3000);
loadData();