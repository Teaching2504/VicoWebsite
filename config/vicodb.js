const mysql = require('mysql2/promise');
require('dotenv').config();

// Tạo Connection Pool kết nối MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'vicodb',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4'
});

// Kiểm tra kết nối thử nghiệm
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('ĐÃ KẾT NỐI THÀNH CÔNG TỚI DATABASE: vicodb!');
        connection.release();
    } catch (error) {
        console.error('Lỗi kết nối MySQL:', error.message);
        console.error('Kiểm tra lại DB_USER hoặc DB_PASSWORD trong file .env nhé!');
    }
})();

module.exports = pool;