const { getConnection, sql } = require('./db');

module.exports = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .query(`
                SELECT YEAR(Date) as Year, Segment, SUM(Sales) as TotalSales
                FROM LCVSales  -- Replace with your actual table name
                WHERE markaðsflokkun IN ('COMP-D-VA', 'HEAVY-D-VA', 'MED-D-VAN', 'PICK-UP')
                GROUP BY Segment, YEAR(Date)
                ORDER BY Year DESC, Segment;
            `);

        const data = result.recordset;

        const segments = [...new Set(data.map(item => item.Segment))];
        const years = [...new Set(data.map(item => item.Year.toString()))];
        
        const salesBySegment = {};
        segments.forEach(segment => {
            salesBySegment[segment] = years.map(year => {
                const record = data.find(item => item.Segment === segment && item.Year.toString() === year);
                return record ? record.TotalSales : 0;
            });
        });

        res.status(200).json({ segments, years, salesBySegment });
    } catch (error) {
        console.error('Error fetching LCV data:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
