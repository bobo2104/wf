const { getConnection, sql } = require('./db');

module.exports = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .query(`SELECT TOP 4 YEAR(Date) as Year, SUM(Sales) as Sales FROM RetailCarSales GROUP BY YEAR(Date) ORDER BY Year DESC`);

        const data = result.recordset.reverse();

        const years = data.map(item => item.Year.toString());
        const sales = data.map(item => item.Sales);

        res.status(200).json({ years, predictions: sales });
    } catch (error) {
        console.error('Error fetching retail data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
