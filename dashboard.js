document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const token = localStorage.getItem('userInfo');
    if (!token) {
        // Apply the blur effect to the background
        document.body.style.filter = 'blur(5px)';
        // After the alert is dismissed, automatically redirect
        window.location.href = 'account.html';
    }


    // Fetch weekly summary data
    async function fetchWeeklySummary() {
        try {
            // const response = await fetch('http://your-backend-url/api/weekly-summary', {
            //     method: 'GET',
            //     headers: {
            //         'Authorization': `Bearer ${token}`,
            //         'Content-Type': 'application/json'
            //     }
            // });

            // if (!response.ok) throw new Error('Failed to fetch summary');

            // const data = await response.json();
            // Mock data
            const patient = {
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
        }
        
        // Display the patient's summary
        const weeklyAvg = document.getElementById("weekly-avg");
        const weeklyMax = document.getElementById("weekly-max");
        const weeklyMin = document.getElementById("weekly-min");
        
        if (patient) {
            console.log(patient)
            // Populate summary data
            weeklyAvg.textContent = `${patient.avgHeartRate} bpm`;
            weeklyMax.textContent = `${patient.maxHeartRate} bpm`;
            weeklyMin.textContent = `${patient.minHeartRate} bpm`;
             
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
        } catch (error) {
            console.error('Error fetching summary:', error);
            alert('Failed to load health summary');
        }
    }

   
    // Measurement settings form submission
    // measurementForm.addEventListener('submit', async (e) => {
    //     e.preventDefault();

    //     const startTime = document.getElementById('start-time').value;
    //     const endTime = document.getElementById('end-time').value;
    //     const frequency = document.getElementById('measurement-frequency').value;

    //     try {
    //         const response = await fetch('http://your-backend-url/api/measurement-settings', {
    //             method: 'POST',
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 startTime,
    //                 endTime,
    //                 frequency: parseInt(frequency)
    //             })
    //         });

    //         const data = await response.json();
    //         if (response.ok) {
    //             alert('Measurement settings updated successfully!');
    //         } else {
    //             alert(data.error || 'Failed to update settings');
    //         }
    //     } catch (error) {
    //         console.error('Error updating settings:', error);
    //         alert('An error occurred. Please try again.');
    //     }
    // });

    // Initial data fetch
    fetchWeeklySummary();
});

function togglePopup() {
    console.log('hi')
    const popup = document.getElementById("profilePopup");
    popup.style.display = popup.style.display === "block" ? "none" : "block";
  }
  
  // Close the popup when clicking outside
  document.addEventListener("click", function (event) {
    const popup = document.getElementById("profilePopup");
    const avatar = document.querySelector(".avatar");
    if (popup && !popup.contains(event.target) && !avatar.contains(event.target)) {
      popup.style.display = "none";
    }
  });