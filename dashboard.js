document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    // const token = localStorage.getItem('authToken');
    // if (!token) {
    //     window.alert("login/signup before proceeding to dashboard")
    //     window.location.href = 'account.html';
    // }
    

    // References to DOM elements
    const avgHeartRateEl = document.getElementById('avg-heart-rate');
    const minHeartRateEl = document.getElementById('min-heart-rate');
    const maxHeartRateEl = document.getElementById('max-heart-rate');
    const heartRateChart = document.getElementById('heart-rate-chart');
    const oxygenSaturationChart = document.getElementById('oxygen-saturation-chart');
    const measurementForm = document.getElementById('measurement-form');

    // Fetch weekly summary data
    async function fetchWeeklySummary() {
        try {
            const response = await fetch('http://your-backend-url/api/weekly-summary', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Failed to fetch summary');

            const data = await response.json();
            
            // Update summary statistics
            avgHeartRateEl.textContent = `${data.avgHeartRate.toFixed(1)} bpm`;
            minHeartRateEl.textContent = `${data.minHeartRate} bpm`;
            maxHeartRateEl.textContent = `${data.maxHeartRate} bpm`;

            // Render charts
            renderHeartRateChart(data.dailyHeartRates);
            renderOxygenSaturationChart(data.dailyOxygenSaturation);
        } catch (error) {
            console.error('Error fetching summary:', error);
            alert('Failed to load health summary');
        }
    }

    // Chart rendering functions
    function renderHeartRateChart(data) {
        new Chart(heartRateChart, {
            type: 'line',
            data: {
                labels: data.map(entry => entry.date),
                datasets: [{
                    label: 'Heart Rate (BPM)',
                    data: data.map(entry => entry.rate),
                    borderColor: 'rgb(14, 165, 233)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

    function renderOxygenSaturationChart(data) {
        new Chart(oxygenSaturationChart, {
            type: 'line',
            data: {
                labels: data.map(entry => entry.date),
                datasets: [{
                    label: 'Oxygen Saturation (%)',
                    data: data.map(entry => entry.level),
                    borderColor: 'rgb(244, 114, 182)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        min: 90,
                        max: 100
                    }
                }
            }
        });
    }

    // Measurement settings form submission
    measurementForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const startTime = document.getElementById('start-time').value;
        const endTime = document.getElementById('end-time').value;
        const frequency = document.getElementById('measurement-frequency').value;

        try {
            const response = await fetch('http://your-backend-url/api/measurement-settings', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    startTime,
                    endTime,
                    frequency: parseInt(frequency)
                })
            });

            const data = await response.json();
            if (response.ok) {
                alert('Measurement settings updated successfully!');
            } else {
                alert(data.error || 'Failed to update settings');
            }
        } catch (error) {
            console.error('Error updating settings:', error);
            alert('An error occurred. Please try again.');
        }
    });

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