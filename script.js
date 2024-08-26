document.addEventListener('DOMContentLoaded', () => {
    const endpoints = [
        { id: 'rentalChart', url: '/api/rental', label: 'Rental Market' },
        { id: 'retailChart', url: '/api/retail', label: 'Retail Market' },
        { id: 'mainstreamChart', url: '/api/mainstream', label: 'Mainstream Market' },
        { id: 'premiumChart', url: '/api/premium', label: 'Premium Market' },
        { id: 'lcvChart', url: '/api/lcv', label: 'Light Commercial Vehicles (LCV) Market' }, // New LCV segment
    ];

    endpoints.forEach(endpoint => {
        fetch(endpoint.url)
            .then(response => response.json())
            .then(data => {
                createChart(endpoint.id, data.years, data.predictions, endpoint.label);
            })
            .catch(error => console.error(`Error fetching data from ${endpoint.url}:`, error));
    });
});

function createChart(canvasId, labels, data, label) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                borderColor: getRandomColor(),
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 2,
                fill: true,
            }],
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true },
            },
        },
    });
}

function getRandomColor() {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']; // Added color for LCV
    return colors[Math.floor(Math.random() * colors.length)];
}
