// Ensure this is linked correctly in your welcome.html file
document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/predict')
        .then(response => response.json())
        .then(data => {
            const labels = data.years; // e.g., ["2024", "2025", "2026", "2027"]
            const values = data.predictions; // e.g., [10000, 10500, 11000, 12000]

            const ctx = document.getElementById('carMarketChart').getContext('2d');
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Predicted Car Sales',
                        data: values,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
