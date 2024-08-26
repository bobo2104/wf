document.addEventListener('DOMContentLoaded', () => {
    console.log("Script Loaded"); // Debugging log

    const endpoints = [
        { id: 'rentalChart', url: '/api/rental', label: 'Rental Market' },
        { id: 'retailChart', url: '/api/retail', label: 'Retail Market' },
        { id: 'mainstreamChart', url: '/api/mainstream', label: 'Mainstream Market' },
        { id: 'premiumChart', url: '/api/premium', label: 'Premium Market' },
        { id: 'lcvChart', url: '/api/lcv', label: 'Light Commercial Vehicles (LCV) Market' },
    ];

    endpoints.forEach(endpoint => {
        fetch(endpoint.url)
            .then(response => {
                console.log(`Fetching data from ${endpoint.url}`); // Debugging log
                return response.json();
            })
            .then(data => {
                console.log(`Data for ${endpoint.label}:`, data); // Debugging log
                createChart(endpoint.id, data.years, data.predictions, endpoint.label);
            })
            .catch(error => console.error(`Error fetching data from ${endpoint.url}:`, error));
    });
});
