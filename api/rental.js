const sql = require('mssql');

const config = {
    user: process.env.DB_USER, // Use environment variables for security
    password: process.env.DB_PASSWORD,
    server: 'srvsql04',
    database: 'JetDW',
    options: {
        encrypt: true,
    }
};

module.exports = async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query`SELECT Year, Sales FROM RentalCarSalesHistory`;
        const data = result.recordset;

        // Example mock prediction logic
        const predictions = data.map(record => ({
            year: record.Year + 1,
            sales: record.Sales * 1.05 // Predicting a 5% growth each year
        }));

        res.status(200).json({
            years: predictions.map(p => p.year),
            predictions: predictions.map(p => p.sales)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
