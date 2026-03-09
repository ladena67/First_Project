let tempChart, humidityChart, lightChart, soilChart;

/* format time for X-axis (HH:MM only) */

function formatMinute(timestamp){

    const d = new Date(timestamp);

    const options = { timeZone: "Asia/Manila" };

    const phDate = new Date(
        d.toLocaleString("en-US", options)
    );

    const hour = String(phDate.getHours()).padStart(2,'0');
    const minute = String(phDate.getMinutes()).padStart(2,'0');

    return `${hour}:${minute}`;
}

/* format time with seconds for tooltip */

function formatSecond(timestamp){

    const d = new Date(timestamp);

    const options = { timeZone: "Asia/Manila" };

    const phDate = new Date(
        d.toLocaleString("en-US", options)
    );

    const hour = String(phDate.getHours()).padStart(2,'0');
    const minute = String(phDate.getMinutes()).padStart(2,'0');
    const second = String(phDate.getSeconds()).padStart(2,'0');

    return `${hour}:${minute}:${second}`;
}

async function loadData(){

    const response = await fetch('/data');
    const data = await response.json();

    const recent = data.slice(-30);

    const labels = recent.map(row => formatMinute(row[4]));
    const tooltips = recent.map(row => formatSecond(row[4]));

    const temps = recent.map(row => row[0]);
    const hums = recent.map(row => row[1]);
    const lights = recent.map(row => row[2]);
    const soils = recent.map(row => row[3]);

    updateTable(data);

    createChart("tempChart","Temperature (°C)",labels,tooltips,temps,tempChart,(c)=>tempChart=c);
    createChart("humidityChart","Humidity (%)",labels,tooltips,hums,humidityChart,(c)=>humidityChart=c);
    createChart("lightChart","Light",labels,tooltips,lights,lightChart,(c)=>lightChart=c);
    createChart("soilChart","Soil Moisture",labels,tooltips,soils,soilChart,(c)=>soilChart=c);

}

/* table still shows seconds */

function updateTable(data){

    const tableBody = document.querySelector("#sensorTable tbody");
    tableBody.innerHTML = "";

    data.slice(-10).reverse().forEach(row => {

        const tr = document.createElement("tr");

        const formattedTime = formatSecond(row[4]);

        tr.innerHTML = `
            <td>${formattedTime}</td>
            <td>${row[0]}</td>
            <td>${row[1]}</td>
            <td>${row[2]}</td>
            <td>${row[3]}</td>
        `;

        tableBody.appendChild(tr);

    });

}

function createChart(canvasId,label,labels,tooltips,data,chartVar,setChart){

    if(chartVar) chartVar.destroy();

    const ctx = document.getElementById(canvasId);

    const chart = new Chart(ctx,{

        type:'line',

        data:{
            labels:labels,
            datasets:[{
                label:label,
                data:data,
                tension:0,
                borderWidth:2,
                pointRadius:3,
                fill:false
            }]
        },

        options:{
            responsive:true,
            maintainAspectRatio:false,
            animation:false,

            plugins:{
                legend:{display:false},

                title:{
                    display:true,
                    text:label
                },

                tooltip:{
                    callbacks:{
                        title:function(context){
                            const index = context[0].dataIndex;
                            return tooltips[index]; // show seconds here
                        }
                    }
                }
            },

            scales:{
                x:{
                    display:true,
                    offset:true,
                    ticks:{
                        maxRotation:0,
                        minRotation:0,
                        autoSkip:true,
                        maxTicksLimit:10
                    }
                },
                y:{
                    beginAtZero:false
                }
            }

        }

    });

    setChart(chart);

}

setInterval(loadData,3000);
loadData();