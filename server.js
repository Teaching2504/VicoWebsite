const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Gọi file kết nối database
const db = require('./config/vicodb');

const app = express();

// Cấu hình nhận dữ liệu JSON và form
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cho phép hiển thị các file tĩnh trong thư mục public (HTML, CSS, JS, Ảnh)
app.use(express.static('public'));

// Cổng chạy server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`WEBSITE VICO ĐANG CHẠY TẠI: http://localhost:${PORT}`);
    console.log(`====================================================`);
});