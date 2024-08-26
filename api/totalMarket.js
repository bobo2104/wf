const { getConnection, sql } = require('./db');

module.exports = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .query(`
                SELECT 
                    ár AS Year, 
                    SUM(Fjöldi_skráninga) AS TotalSales
                FROM 
                    YourTableName  -- Replace with your actual table name
                GROUP BY 
                    ár
                ORDER BY 
                    ár DESC;
            `);

        const data = result.recordset;

        // Map the data into arrays for years and sales
        const years = data.map(item => item.Year.toString());
        const totalSales = data.map(item => item.TotalSales);

        // Send the response
        res.status(200).json({ years, totalSales });
    } catch (error) {
        console.error('Error fetching total market data:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
