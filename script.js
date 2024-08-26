document.addEventListener('DOMContentLoaded', () => {
    const endpoints = [
        { id: 'lcvChart', url: '/api/lcv', label: 'LCV Segments' },
        { id: 'totalMarketChart', url: '/api/totalMarket', label: 'Total Market' }
    ];

    endpoints.forEach(endpoint => {
        fetch(endpoint.url)
            .then(response => response.json())
            .then(data => {
                if (endpoint.id === 'totalMarketChart' && data.years && data.totalSales) {
                    createTotalMarketChart(data.years, data.totalSales);
                } else if (endpoint.id === 'lcvChart' && data.years && data.salesBySegment) {
                    createSegmentCharts(data.years, data.salesBySegment, endpoint.label);
                } else {
                    console.error(`Invalid data structure from ${endpoint.url}:`, data);
                }
            })
            .catch(error => console.error(`Error fetching data from ${endpoint.url}:`, error));
    });
});

function createTotalMarketChart(labels, data) {
    const ctx = document.getElementById('totalMarketChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Market',
                data: data,
                borderColor: '#FF6384',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
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

function createSegmentCharts(labels, salesBySegment, label) {
    const ctx = document.getElementById('lcvChart').getContext('2d');

    const datasets = Object.keys(salesBySegment).map(segment => {
        return {
            label: segment,
            data: salesBySegment[segment],
            borderColor: getRandomColor(),
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderWidth: 2,
            fill: false,
        };
    });

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
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
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
    return colors[Math.floor(Math.random() * colors.length)];
}
