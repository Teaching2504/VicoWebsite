
require('dotenv').config();

const express = require('express');
const path = require('path');
const pool = require('./config/vicodb');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Phục vụ HTML, CSS, JavaScript và hình ảnh
app.use(express.static(path.join(__dirname, 'public')));

// Kiểm tra máy chủ
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'VICO - KẾT NỐI DI SẢN VIỆT đang hoạt động!'
    });
});

// Kiểm tra database
app.get('/api/db-check', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT DATABASE() AS databaseName'
        );

        res.json({
            success: true,
            message: 'Kết nối database thành công!',
            database: rows[0].databaseName
        });
    } catch (error) {
        console.error('Lỗi truy vấn database:', error.message);

        res.status(500).json({
            success: false,
            message: 'Không thể truy vấn database.'
        });
    }
});

// Khởi chạy server
app.listen(PORT, () => {
    console.log(`VICO đang chạy tại http://localhost:${PORT}`);
});
