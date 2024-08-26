const { getConnection, sql } = require('./db');

module.exports = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .query(`
                SELECT 
                    ár AS Year, 
                    'Total Market' AS Segment, 
                    SUM(Sales) AS TotalSales
                FROM 
                    LCVSales  -- Replace with your actual table name
                WHERE 
                    markaðsflokkun IN ('COMP-D-VA', 'HEAVY-D-VA', 'MED-D-VAN', 'PICK-UP')
                GROUP BY 
                    ár
                ORDER BY 
                    Year DESC;
            `);

        const data = result.recordset;

        const years = data.map(item => item.Year.toString());
        const totalSales = data.map(item => item.TotalSales);

        res.status(200).json({ years, totalSales });
    } catch (error) {
        console.error('Error fetching total market data:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
