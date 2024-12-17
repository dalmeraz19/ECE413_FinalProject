const patients = {
        1: {
            name: "Patient A",
            age: 62,
            condition: "Arrhythmia",
            avgHeartRate: 75,
            maxHeartRate: 85,
            minHeartRate: 65,
            dailyData: {
                time: ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM"],
                heartRate: [70, 75, 80, 85, 80, 75, 70],
                oxygenLevel: [95, 94, 96, 97, 94, 93, 95],
            },
        },
        2: {
            name: "Patient B",
            age: 47,
            condition: "Hypertension",
            avgHeartRate: 82,
            maxHeartRate: 90,
            minHeartRate: 72,
            dailyData: {
                time: ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM"],
                heartRate: [70, 82, 85, 75, 85, 80, 78],
                oxygenLevel: [94, 93, 95, 96, 94, 92, 91],
            },
        },
        3: {
            name: "Patient C",
            age: 55,
            condition: "Diabetes",
            avgHeartRate: 78,
            maxHeartRate: 88,
            minHeartRate: 68,
            dailyData: {
                time: ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM"],
                heartRate: [72, 76, 80, 85, 82, 76, 72],
                oxygenLevel: [96, 95, 97, 98, 96, 94, 93],
            },
        },
        4: {
            name: "Patient D",
            age: 70,
            condition: "Cardiomyopathy",
            avgHeartRate: 90,
            maxHeartRate: 100,
            minHeartRate: 80,
            dailyData: {
                time: ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM"],
                heartRate: [85, 88, 92, 100, 96, 88, 85],
                oxygenLevel: [92, 91, 93, 94, 92, 90, 89],
            },
        },
}

// Get the patientId from the URL
const urlParams = new URLSearchParams(window.location.search);
const patientId = urlParams.get("patientId");
let patientName = patients[patientId].name
document.getElementById("week-summary").innerHTML = `${patientName}'s Weekly Summary`;
document.getElementById("daily-view").innerHTML = `${patientName}'s Daily View`;


// Display the patient's summary
const weeklyAvg = document.getElementById("weekly-avg");
const weeklyMax = document.getElementById("weekly-max");
const weeklyMin = document.getElementById("weekly-min");

if (patients[patientId]) {
    const patient = patients[patientId];
    // Populate summary data
    weeklyAvg.textContent = `${patient.avgHeartRate} bpm`;
    weeklyMax.textContent = `${patient.maxHeartRate} bpm`;
    weeklyMin.textContent = `${patient.minHeartRate} bpm`;

     // Frequency Slider Update
     const frequencySlider = document.getElementById("frequency");
     const frequencyValue = document.getElementById("frequency-value");

     frequencySlider.addEventListener("input", function() {
         frequencyValue.textContent = frequencySlider.value;
     });
     
    // Populate charts
    const heartRateChart = new Chart(document.getElementById("heartRateChart"), {
        type: "line",
        data: {
            labels: patient.dailyData.time,
            datasets: [
                {
                    label: "Heart Rate",
                    data: patient.dailyData.heartRate,
                    borderColor: "var(--primary)",
                    backgroundColor: "rgba(14, 165, 233, 0.2)",
                    fill: true,
                    pointBorderColor: "var(--primary-dark)",
                    pointBackgroundColor: "var(--primary)",
                },
            ],
        },
        options: {
            plugins: {
                tooltip: { enabled: true },
            },
            scales: {
                x: { title: { display: true, text: "Time of Day" } },
                y: { title: { display: true, text: "Heart Rate (bpm)" } },
            },
        },
    });

    const oxygenChart = new Chart(document.getElementById("oxygenChart"), {
        type: "line",
        data: {
            labels: patient.dailyData.time,
            datasets: [
                {
                    label: "Blood Oxygen Saturation",
                    data: patient.dailyData.oxygenLevel,
                    borderColor: "var(--secondary)",
                    backgroundColor: "rgba(244, 114, 182, 0.2)",
                    fill: true,
                    pointBorderColor: "var(--neutral-700)",
                    pointBackgroundColor: "var(--secondary)",
                },
            ],
        },
        options: {
            plugins: {
                tooltip: { enabled: true },
            },
            scales: {
                x: { title: { display: true, text: "Time of Day" } },
                y: { title: { display: true, text: "Oxygen Level (%)" } },
            },
        },
    });
} else {
    patientSummaryDiv.innerHTML = `<p>Patient details not found.</p>`;
}