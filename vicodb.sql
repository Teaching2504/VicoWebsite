-- =============================================================
-- KHỞI TẠO CƠ SỞ DỮ LIỆU VICODB
-- =============================================================
CREATE DATABASE IF NOT EXISTS `vicodb`
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE `vicodb`;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `lienHeDoanhNghiep`;
DROP TABLE IF EXISTS `mediaBaiViet`;
DROP TABLE IF EXISTS `mauMaSanPham`;
DROP TABLE IF EXISTS `thongSoSanPham`;
DROP TABLE IF EXISTS `baiVietSanPham`;
DROP TABLE IF EXISTS `nguoiDung`;
SET FOREIGN_KEY_CHECKS = 1;

-- =============================================================
-- 1. BẢNG NGƯỜI DÙNG (CHỈ DÀNH CHO ROLE_ADMIN)
-- =============================================================
CREATE TABLE `nguoiDung` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `tenDangNhap` VARCHAR(50) NOT NULL UNIQUE,
    `matKhau` VARCHAR(255) NOT NULL,
    `hoTen` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `soDienThoai` VARCHAR(20),
    `vaiTro` VARCHAR(50) NOT NULL DEFAULT 'ROLE_ADMIN', 
    `trangThai` VARCHAR(50) DEFAULT 'HOAT_DONG',         -- HOAT_DONG, KHOA
    `matKhauHienThi` VARCHAR(255),
    `avatar` VARCHAR(500) NULL,                          -- Admin up sau
    `ngayTao` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- 2. BẢNG BÀI VIẾT SẢN PHẨM
-- =============================================================
CREATE TABLE `baiVietSanPham` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `nguoiDungId` BIGINT NOT NULL,                    -- Admin đăng bài (FK -> nguoiDung.id)
    
    -- PHẦN ĐẦU TRANG
    `tenSanPham` VARCHAR(150) NOT NULL,               -- Tên sản phẩm
    `duongDan` VARCHAR(150) NOT NULL UNIQUE,          -- Slug URL (long-den-phu-binh, lan-su-rong-cho-lon)
    `tieuDe` VARCHAR(255) NOT NULL,                   -- Headline trang web
    `hinhAnhDaiDien` VARCHAR(500) NULL,               -- Ảnh bìa (Admin up sau)
    `videoGioiThieu` VARCHAR(500) NULL,               -- Video giới thiệu (Admin up sau)
    `doanGioiThieu` TEXT NOT NULL,                    -- Đoạn giới thiệu mở đầu
    
    -- CÁC MỤC LỚN TƯƠNG ỨNG TÀI LIỆU
    `cauChuyen` MEDIUMTEXT NOT NULL,                  -- Mục 2: Câu chuyện xóm nghề & giữ lửa
    `dieuLamNenSanPham` MEDIUMTEXT NOT NULL,          -- Mục 3: Điều gì làm nên sản phẩm
    `quyTrinhSanXuat` MEDIUMTEXT NOT NULL,            -- Mục 4: Quy trình tạo ra sản phẩm
    `giaTriVanHoa` MEDIUMTEXT NOT NULL,               -- Mục 5: Giá trị văn hóa & tâm huyết nghệ nhân
    `giaTriTraiNghiem` MEDIUMTEXT NOT NULL,           -- Mục 6: Trải nghiệm & giá trị đối với người sở hữu
    `keuGoiHanhDong` TEXT NOT NULL,                   -- Mục 8: Lời kêu gọi hành động (CTA)
    
    -- QUẢN LÝ TRẠNG THÁI
    `trangThai` VARCHAR(50) DEFAULT 'XUAT_BAN',       -- XUAT_BAN, BAN_NHAP, AN
    `ngayTao` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `ngayCapNhat` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT `fk_baiViet_nguoiDung` FOREIGN KEY (`nguoiDungId`) 
        REFERENCES `nguoiDung`(`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- 3. BẢNG THÔNG SỐ SẢN PHẨM (MỤC 7 DẠNG BẢNG ĐỘNG)
-- =============================================================
CREATE TABLE `thongSoSanPham` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `baiVietId` BIGINT NOT NULL,                      -- Thuộc bài viết nào (FK -> baiVietSanPham.id)
    `tenThongSo` VARCHAR(150) NOT NULL,               -- Cột trái: Chất liệu, Kích thước, Giá...
    `giaTri` TEXT NOT NULL,                           -- Cột phải: Nội dung chi tiết
    `thuTuHienThi` INT DEFAULT 0,                     -- Sắp xếp thứ tự dòng trong bảng
    `ngayTao` DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_thongSo_baiViet` FOREIGN KEY (`baiVietId`) 
        REFERENCES `baiVietSanPham`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- 4. BẢNG MẪU MÃ / KIỂU DÁNG CHI TIẾT
-- =============================================================
CREATE TABLE `mauMaSanPham` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `baiVietId` BIGINT NOT NULL,                      -- Thuộc bài viết sản phẩm nào
    `tenMauMa` VARCHAR(150) NOT NULL,                 -- Đèn cá chép, Đèn ông sao, Đầu lân kim sa...
    `loaiKichThuoc` VARCHAR(50) DEFAULT 'TRUNG_BINH', -- NHO, TRUNG_BINH, LON, SU_KIEN
    `khoangGia` VARCHAR(100),                         -- Khoảng giá bán tham khảo
    `hinhAnh` VARCHAR(500) NULL,                      -- Ảnh riêng mẫu mã (Admin up sau)
    `ngayTao` DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_mauMa_baiViet` FOREIGN KEY (`baiVietId`) 
        REFERENCES `baiVietSanPham`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- 5. BẢNG ALBUM ẢNH & VIDEO ĐÍNH KÈM (ADMIN BỔ SUNG MEDIA VÀO ĐÂY)
-- =============================================================
CREATE TABLE `mediaBaiViet` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `baiVietId` BIGINT NOT NULL,                      -- Thuộc bài viết nào
    `loaiMedia` ENUM('HINH_ANH', 'VIDEO') DEFAULT 'HINH_ANH',
    `duongDanFile` VARCHAR(500) NOT NULL,             -- Đường dẫn file
    `chuThich` VARCHAR(255) NULL,                     -- Chú thích ảnh/video
    `thuTuHienThi` INT DEFAULT 0,                     -- Thứ tự hiển thị trong gallery
    `ngayTao` DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_media_baiViet` FOREIGN KEY (`baiVietId`) 
        REFERENCES `baiVietSanPham`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================
-- 6. BẢNG FORM KẾT NỐI DOANH NGHIỆP / ĐẶT HÀNG TƯ VẤN - ADMIN
-- =============================================================
CREATE TABLE `lienHeDoanhNghiep` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `baiVietId` BIGINT NULL,                          -- Khách quan tâm bài viết/sản phẩm nào
    `hoTen` VARCHAR(100) NOT NULL,                    -- Họ tên người gửi
    `tenDoanhNghiep` VARCHAR(150),                    -- Tên công ty / nhà hàng / trường học
    `soDienThoai` VARCHAR(20) NOT NULL,               -- Số điện thoại
    `email` VARCHAR(100),                             -- Email liên hệ
    `mucDich` VARCHAR(100) DEFAULT 'TRANG_TRI_SU_KIEN', 
    -- TRANG_TRI_SU_KIEN, MUA_SI, DAT_THEO_YEU_CAU, KHAC
    `noiDung` TEXT NOT NULL,                          -- Lời nhắn / Nhu cầu chi tiết
    `trangThai` VARCHAR(50) DEFAULT 'CHO_XU_LY',      -- CHO_XU_LY, DA_LIEN_HE, HOAN_THANH, HUY
    `ghiChuAdmin` TEXT NULL,                          -- Ghi chú của quản trị viên khi gọi điện tư vấn
    `ngayTao` DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_lienHe_baiViet` FOREIGN KEY (`baiVietId`) 
        REFERENCES `baiVietSanPham`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- =============================================================
-- DỮ LIỆU
-- =============================================================

-- 1. TÀI KHOẢN ADMIN (Tài khoản: Admin | Mật khẩu: Admin@123)
INSERT INTO `nguoiDung` (
    `id`, `tenDangNhap`, `matKhau`, `hoTen`, `email`, `soDienThoai`, `vaiTro`, `trangThai`, `matKhauHienThi`, `avatar`
) VALUES (
    1,
    'Admin', 
    '$2a$10$Rz7K3w5rG4n9Gz2XhFh/oe3aWbC5QxU.b2N6l6R3YxM1kL2jQ4z3a', 
    'Quản Trị Viên VICO', 
    'admin@vico.vn', 
    '0909123456', 
    'ROLE_ADMIN', 
    'HOAT_DONG', 
    'Admin@123',
    NULL
);

-- -------------------------------------------------------------
-- 2. SẢN PHẨM 1: LỒNG ĐÈN PHÚ BÌNH (Toàn bộ ảnh/video để NULL)
-- -------------------------------------------------------------
INSERT INTO `baiVietSanPham` (
    `id`, `nguoiDungId`, `tenSanPham`, `duongDan`, `tieuDe`, 
    `hinhAnhDaiDien`, `videoGioiThieu`, `doanGioiThieu`, 
    `cauChuyen`, `dieuLamNenSanPham`, `quyTrinhSanXuat`, 
    `giaTriVanHoa`, `giaTriTraiNghiem`, `keuGoiHanhDong`
) VALUES (
    1,
    1,
    'Lồng đèn Phú Bình',
    'long-den-phu-binh',
    'Lồng Đèn Phú Bình – Nét Đẹp Văn Hóa Truyền Thống Trong Từng Nét Vẽ Thủ Công',
    NULL,
    NULL,
    'Trải qua hơn nửa thế kỷ hình thành từ nguồn gốc làng nghề Nam Định di cư vào Nam, lồng đèn Phú Bình mang theo sự kiên trì và tỉ mỉ của người thợ qua từng khung tre, lớp giấy kiếng căng bóng. Mỗi chiếc lồng đèn không chỉ là món đồ chơi rực rỡ sắc màu dịp Rằm tháng Tám mà còn lưu giữ ký ức văn hóa dân tộc và tô điểm cho nhiều không gian trang trí. Hiện nay, các hộ làm nghề đang chủ động đưa sản phẩm lên các sàn thương mại điện tử và mạng xã hội để tiếp tục lan tỏa nét đẹp truyền thống.',
    'Nguồn gốc của làng nghề lồng đèn Phú Bình xuất phát từ các nghệ nhân thuộc làng nghề Bác Cổ, Báo Đáp (tỉnh Nam Định) di cư vào Nam từ nhiều thập niên trước. Trải qua hơn nửa thế kỷ phát triển trên đất Sài Gòn, nơi đây từng là làng nghề sầm uất với hàng trăm hộ gia đình cùng sản xuất lồng đèn mỗi mùa Trung thu. Sản phẩm thủ công của xóm nghề không chỉ phục vụ thị trường TP.HCM mà còn tỏa đi khắp các tỉnh miền Tây, miền Đông và miền Trung.\n\nTheo thời gian, sự xuất hiện của lồng đèn công nghiệp, lồng đèn nhựa, lồng đèn Trung Quốc giá rẻ và sự thay đổi thói quen giải trí của trẻ em đã khiến làng nghề gặp nhiều thách thức. Từ hàng trăm hộ theo nghề, hiện nay xóm Phú Bình chỉ còn khoảng 10 hộ gia đình bền bỉ duy trì. Dù đối mặt với gánh nặng tuổi tác và nguy cơ mai một, những người thợ lâu năm với 30 đến hơn 50 năm gắn bó vẫn tự hào giữ lửa nghề bằng tâm huyết của cả đời người.\n\nĐể thích ứng với thời đại mới, người làm nghề tại Phú Bình đã nhạy bén sáng tạo thêm nhiều mẫu mã hiện đại, làm lồng đèn theo linh vật ưa chuộng theo từng năm và đưa sản phẩm lên các sàn thương mại điện tử, mạng xã hội để tiếp cận người tiêu dùng khắp mọi miền.',
    'Chất liệu tự nhiên, dân gian: Khung đèn được tạo thành từ tre, nứa, lồ ô hoặc mây, kết hợp uốn bằng dây kẽm và phủ lớp giấy kiếng (giấy bóng kính) căng bóng hoặc giấy dán tươi màu.\n\n2. Kiểu dáng đa dạng: Bao gồm các mẫu truyền thống như cá chép, ngôi sao, bươm bướm, rồng, con gà, thỏ, voi, khỉ, chú chuột, đèn kéo quân, tàu thủy/tàu cá đến các mẫu hiện đại như siêu nhân, lồng đèn xếp giấy, lồng đèn dùng pin, lồng đèn Hội An hay uốn theo linh vật được ưa chuộng.\n\n3. Hoa văn & Màu sắc: Sử dụng lớp giấy bóng màu đỏ đẹp mắt kết hợp màu vẽ trang trí rực rỡ. Họa tiết trang trí được vẽ tay thủ công, đạt độ nét cao nhưng vẫn mềm mại và sinh động.\n\n4. Đặc điểm riêng biệt: Giấy căng bóng, khung uốn lượn tinh xảo, màu sắc tươi thắm bắt mắt và sự kết hợp giữa nét truyền thống với sự cải tiến mới lạ.',
    'Để tạo ra một chiếc lồng đèn thủ công hoàn chỉnh, người thợ Phú Bình phải trải qua 4 công đoạn chính và ít nhất 10 bước tỉ mỉ:\n\n- Công đoạn 1: Chẻ & Vót vật liệu: Thu gom tre, nứa hoặc lồ ô; tiến hành chẻ tre và vót nan tre, mây để chuẩn bị làm khung.\n- Công đoạn 2: Cột kẽm & Uốn khung: Dùng dây kẽm cột và nối các nan tre, mây để uốn thành khung đèn theo các hình dáng như con vật hay ngôi sao. Khâu khung thường được người thợ chuẩn bị trước từ tháng 2 - 3 âm lịch.\n- Công đoạn 3: Dán giấy kiếng: Dán phủ lớp giấy kiếng (hoặc giấy dán) bao bọc xung quanh khung tre, đảm bảo bề mặt giấy phẳng và căng bóng.\n- Công đoạn 4: Vẽ hoa văn trang trí: Dùng cọ tỉ mỉ vẽ các đường nét họa tiết, màu sắc lên mặt giấy. Có mẫu đơn giản chỉ mất 10 phút nhưng có mẫu phức tạp phải vẽ mất nửa ngày.\n- Công đoạn 5: Kiểm tra & Bàn giao: Sản phẩm sau khi hoàn thiện sẽ được kiểm tra lại cẩn thận trước khi giao cho khách hàng hoặc phân phối ra thị trường.',
    'Lưu giữ ký ức người Việt: Lồng đèn Phú Bình là sản phẩm truyền thống gắn liền với không gian Trung thu, mang nét đẹp văn hóa và không khí ấm áp cho người Việt qua nhiều thế hệ.\n\n2. Sự trao truyền & Tâm huyết nghệ nhân: Nghề làm lồng đèn được duy trì theo hình thức cha truyền con nối qua nhiều thập kỷ. Mỗi chiếc đèn là câu chuyện về sự kiên nhẫn, tỉ mỉ và tình yêu nghề của những người thợ gắn bó cả đời người.\n\n3. Giáo dục tình yêu quê hương: Trao tặng chiếc lồng đèn truyền thống cho con trẻ dịp Trung thu là cách tiếp lửa, giúp thế hệ trẻ thêm yêu quê hương và trân trọng giá trị văn hóa dân tộc.',
    'Giá trị thẩm mỹ thủ công: Người sở hữu được thưởng thức sản phẩm thủ công tinh xảo với khung tre uốn lượn, giấy bóng căng phẳng và hoa văn vẽ tay sắc nét, mềm mại.\n\n2. Giá trị an toàn: Đèn lồng được làm từ các nguyên liệu tự nhiên quen thuộc, đảm bảo tính an toàn và không lo độc hại cho trẻ em khi chơi.\n\n3. Ứng dụng trang trí đa dạng:\n- Làm đồ chơi rước đèn ý nghĩa cho thiếu nhi dịp Tết Trung thu.\n- Trang trí không gian nội thất và ngoại thất tại gia đình.\n- Trang trí quy mô cho công ty, trường học, trung tâm triển lãm, nhà hàng hoặc sự kiện.\n- Trang trí không gian mùa Giáng sinh với các mẫu đèn ngôi sao rực rỡ.',
    'Cùng giữ gìn và tiếp nối nét đẹp văn hóa Việt qua từng chiếc lồng đèn Phú Bình rực rỡ sắc màu. Dù bạn cần món quà Trung thu đầm ấm cho con em hay tìm kiếm điểm nhấn trang trí độc đáo cho nhà hàng, sự kiện, hãy liên hệ ngay với chúng tôi để được tư vấn các mẫu lồng đèn thủ công tinh xảo.'
);

-- BẢNG THÔNG SỐ CHI TIẾT SẢN PHẨM 1 (MỤC 7 TỪ PDF)
INSERT INTO `thongSoSanPham` (`baiVietId`, `tenThongSo`, `giaTri`, `thuTuHienThi`) VALUES
(1, 'Tên sản phẩm', 'Lồng đèn Phú Bình', 1),
(1, 'Chất liệu', 'Khung tre, nứa, lồ ô, mây, dây kẽm; phủ giấy kiếng (giấy bóng kính) hoặc giấy dán, màu vẽ trang trí', 2),
(1, 'Kích thước', 'Có các cỡ: loại nhỏ, loại tầm trung, loại lớn và loại kích thước lớn dùng cho trang trí sự kiện', 3),
(1, 'Màu sắc', 'Giấy kiếng màu rực rỡ (màu đỏ...), kết hợp hoa văn vẽ màu nhiều sắc thái bắt mắt', 4),
(1, 'Kiểu dáng', 'Cá chép, ngôi sao, bươm bướm, rồng, con gà, thỏ, voi, khỉ, chú chuột, siêu nhân, đèn kéo quân, tàu thủy/tàu cá, lồng đèn xếp giấy, lồng đèn dùng pin, lồng đèn Hội An, lồng đèn uốn theo linh vật', 5),
(1, 'Giá bán tham khảo', 'Loại nhỏ: 20.000 – 50.000 VNĐ/chiếc | Loại vừa / lớn: 80.000 – 200.000 VNĐ/chiếc | Loại kích thước lớn / thiết kế cầu kỳ trang trí sự kiện: Từ vài trăm nghìn đến vài triệu đồng/chiếc', 6),
(1, 'Cách sử dụng', 'Đồ chơi rước đèn Trung thu cho thiếu nhi (cần cân nhắc phù hợp với độ tuổi); trang trí nội/ngoại thất gia đình, nhà hàng, sự kiện, trường học, công ty; trang trí Giáng sinh', 7),
(1, 'Xuất xứ', 'Làng lồng đèn Phú Bình, phường Hoà Bình (hoặc Quận 11 / Tân Phú), TP.HCM (nguồn gốc nghệ nhân Bác Cổ, Nam Định)', 8),
(1, 'Thông tin liên hệ', 'Địa chỉ: 49/56/9 Trịnh Đình Trọng, Phường 5, Quận Tân Phú | Điện thoại: 0985.97.94.33 – 0907.737.915 | Website: https://longden.com.vn/', 9),
(1, 'Lưu ý đặc tính', 'Lồng đèn giấy kiếng dễ hư hỏng, khó vận chuyển xa (cần cẩn trọng khi đóng gói và vận chuyển).', 10);

-- CÁC MẪU MÃ CỦA SẢN PHẨM 1 (Chỉ gồm Cá chép và Rồng - Ảnh để NULL)
INSERT INTO `mauMaSanPham` (`baiVietId`, `tenMauMa`, `loaiKichThuoc`, `khoangGia`, `hinhAnh`) VALUES
(1, 'Lồng đèn Cá chép vẽ tay truyền thống', 'TRUNG_BINH', '80.000 – 200.000 VNĐ/chiếc', NULL),
(1, 'Lồng đèn Rồng thủ công tinh xảo', 'LON', 'Vài triệu - vài chục triệu/chiếc', NULL);

-- -------------------------------------------------------------
-- 3. SẢN PHẨM 2: LÂN SƯ RỒNG CHỢ LỚN (Toàn bộ ảnh/video để NULL)
-- -------------------------------------------------------------
INSERT INTO `baiVietSanPham` (
    `id`, `nguoiDungId`, `tenSanPham`, `duongDan`, `tieuDe`, 
    `hinhAnhDaiDien`, `videoGioiThieu`, `doanGioiThieu`, 
    `cauChuyen`, `dieuLamNenSanPham`, `quyTrinhSanXuat`, 
    `giaTriVanHoa`, `giaTriTraiNghiem`, `keuGoiHanhDong`
) VALUES (
    2,
    1,
    'Lân Sư Rồng Chợ Lớn',
    'lan-su-rong-cho-lon',
    'Nghệ Thuật Lân Sư Rồng Chợ Lớn – Nét Đẹp Dân Gian Đánh Thức Tinh Thần Lễ Hội',
    NULL,
    NULL,
    'Gắn liền với bề dày lịch sử của vùng đất Sài Gòn - Chợ Lớn, nghệ thuật chế tác và biểu diễn Lân Sư Rồng không chỉ là biểu tượng của sự may mắn, thịnh vượng mà còn là tinh hoa thủ công truyền thống được gìn giữ qua nhiều thế hệ võ sư và nghệ nhân người Hoa.',
    'Nghề làm đầu Lân Sư Rồng tại Chợ Lớn (Quận 5, Quận 6) đã tồn tại gần một thế kỷ, bắt nguồn từ các bang hội người Hoa di cư sang Việt Nam. Mỗi chiếc đầu lân được tạo tác không chỉ đòi hỏi bàn tay khéo léo của người thợ thủ công mỹ nghệ mà còn mang trong mình kiến thức võ thuật và phong thủy sâu sắc.\n\nTrải qua thăng trầm thời gian và sự cạnh tranh từ các sản phẩm công nghiệp nhập khẩu, những lò làm lân gia truyền lâu đời tại Chợ Lớn vẫn kiên trì giữ vững phương pháp thủ công truyền thống: uốn mây tre tỉ mỉ, dán từng lớp vải gia cố và vẽ tay từng nét mặt uy nghi của linh thú để giữ trọn cái hồn và thần thái uy dũng của con lân.',
    'Khung sườn dẻo dai: Được làm từ các nan mây, tre già chọn lọc kỹ lưỡng, uốn nắn bằng nhiệt và kết nối bằng dây kẽm chắc chắn, đảm bảo độ nhẹ nhưng chịu lực va đập cực tốt khi biểu diễn võ thuật.\n\n2. Kỹ thuật đắp giấy & vải gia cường: Sử dụng nhiều lớp giấy bồi kết hợp vải gấm hoặc vải mùng phủ keo chuyên dụng, tạo độ bền chắc cho vỏ đầu lân.\n\n3. Thần thái vẽ tay: Đôi mắt lân được vẽ thủ công sắc sảo với các hoa văn lửa, mây, bát quái; chớp mắt và tai lân cử động linh hoạt theo dây giật bên trong.\n\n4. Chi tiết trang trí cao cấp: Sử dụng lông cừu tự nhiên mềm mượt, kim sa lấp lánh, gương cầu phong thủy trên trán và chuông đồng vang rền.',
    'Quy trình chế tác một bộ đầu lân truyền thống chuẩn thi đấu đòi hỏi nhiều tuần lễ với các bước nghiêm ngặt:\n\n- Công đoạn 1: Chuẩn bị & Uốn khung sườn: Chẻ tre, vót nan mây, dùng nhiệt uốn định hình khung sườn đầu lân theo tỷ lệ chuẩn khí động học.\n- Công đoạn 2: Lắp đặt cơ chế chuyển động: Gắn hệ thống lò xo, ròng rọc điều khiển chớp mắt, vểnh tai và đóng mở hàm lân.\n- Công đoạn 3: Dán vải & Giấy bồi: Dán đan xen nhiều lớp vải và giấy bồi đặc chế, phơi khô tự nhiên dưới nắng để tạo khung vỏ cứng cáp.\n- Công đoạn 4: Vẽ họa tiết & Tô màu: Nghệ nhân vẽ tay các nét mặt lân uy nghi theo các phong cách truyền thống (Lân Phật Sơn, Lân Hạc Sơn).\n- Công đoạn 5: Đính lông cừu & Hoàn thiện: Gắn lông cừu, may thân lân, may quần biểu diễn và kiểm tra độ cân bằng trọng tâm trước khi xuất xưởng.',
    'Biểu tượng của Điềm Lành & Thịnh Vượng: Lân mang ý nghĩa xua đuổi tà khí, rước tài lộc và may mắn đến cho gia chủ trong dịp Khai trương, Tết Trung thu và Tết Nguyên Đán.\n\n2. Gìn giữ Tinh thần Thượng võ: Gắn bó mật thiết với các võ đường truyền thống, thể hiện tinh thần trượng nghĩa, kiên cường và đoàn kết cộng đồng.\n\n3. Bản sắc Đô thị Đa văn hóa: Là minh chứng sống động cho sự giao thoa văn hóa đặc sắc giữa cộng đồng người Hoa và người Việt tại TP.HCM.',
    'Trải nghiệm nghệ thuật đỉnh cao: Chiêm ngưỡng những đường nét tạo hình sống động, màu sắc rực rỡ và thần thái dũng mãnh của linh vật dân gian.\n\n2. Ứng dụng đa dạng trong đời sống hiện đại:\n- Biểu diễn mừng Lễ Khai trương, Khánh thành, Động thổ dự án.\n- Điểm nhấn văn hóa trong dịp Tết Trung thu và lễ hội truyền thống.\n- Trang trí phong thủy đại sảnh khách sạn, nhà hàng, không gian sự kiện cao cấp.',
    'Mang không khí rộn rã và vượng khí cát tường đến với không gian của bạn. Hãy liên hệ ngay với chúng tôi để được tư vấn các mẫu đầu Lân Sư Rồng thủ công cao cấp và đặt may đo theo yêu cầu riêng cho sự kiện của doanh nghiệp.'
);

-- BẢNG THÔNG SỐ CHI TIẾT SẢN PHẨM 2 (MỤC 7)
INSERT INTO `thongSoSanPham` (`baiVietId`, `tenThongSo`, `giaTri`, `thuTuHienThi`) VALUES
(2, 'Tên sản phẩm', 'Lân Sư Rồng Chợ Lớn', 1),
(2, 'Chất liệu', 'Khung nan mây tre dẻo dai, giấy bồi chịu lực, vải gấm cao cấp, lông cừu tự nhiên, mắt đèn LED, chuông đồng, hạt cườm kim sa', 2),
(2, 'Kích thước', 'Đầu lân số 1 (chu vi 1.35m - thi đấu chuyên nghiệp), đầu lân số 2 (chu vi 1.25m), đầu lân thiếu nhi và mô hình rồng truyền thống dài 18m - 25m', 3),
(2, 'Màu sắc', 'Vàng hoàng kim (Tài lộc), Đỏ son (May mắn), Xanh phong thủy (Bình an), Trắng bạc (Thanh khiết), Đen dũng mãnh (Khí phách Trương Phi)', 4),
(2, 'Kiểu dáng', 'Lân Phật Sơn (dáng mặt tròn dữ tợn, sừng cong), Lân Hạc Sơn (dáng mỏ vịt nhanh nhẹn), Đầu Sư tử Bắc Kinh, Đầu Rồng dạ quang', 5),
(2, 'Giá bán tham khảo', 'Loại trẻ em: 350.000 – 700.000 VNĐ/bộ | Loại biểu diễn/trang trí bán chuyên: 1.800.000 – 3.200.000 VNĐ/bộ | Loại thi đấu cao cấp lông cừu: 4.500.000 – 8.500.000 VNĐ/bộ', 6),
(2, 'Cách sử dụng', 'Múa biểu diễn khai trương, khánh thành, lễ hội Trung thu, Tết Nguyên Đán; trang trí phong thủy đại sảnh công ty, nhà hàng phong cách Á Đông', 7),
(2, 'Xuất xứ', 'Các lò nghề làm lân gia truyền khu vực Chợ Lớn (Quận 5, Quận 6), TP.HCM', 8),
(2, 'Thông tin liên hệ', 'Khu vực Chợ Lớn, TP.HCM | Hotline tư vấn & biểu diễn: 0985.97.94.33 – 0907.737.915 | Email: contact@vico.vn', 9),
(2, 'Lưu ý đặc tính', 'Bảo quản nơi khô ráo, tránh ẩm ướt để giữ độ phồng của lông cừu và độ bền khung sườn; tránh va đập mạnh phần cơ mắt khi vận chuyển.', 10);

-- CÁC MẪU MÃ CỦA SẢN PHẨM 2 (Ảnh để NULL)
INSERT INTO `mauMaSanPham` (`baiVietId`, `tenMauMa`, `loaiKichThuoc`, `khoangGia`, `hinhAnh`) VALUES
(2, 'Đầu Lân Kim Sa lông cừu đỏ may mắn', 'LON', '4.500.000 – 6.500.000 VNĐ/bộ', NULL),
(2, 'Đầu Lân Kim Sa vàng hoàng kim', 'LON', '4.500.000 – 6.500.000 VNĐ/bộ', NULL),
(2, 'Đầu Lân trẻ em rước đèn Trung thu', 'NHO', '350.000 – 700.000 VNĐ/bộ', NULL),
(2, 'Bộ Rồng dạ quang 9 khúc biểu diễn', 'SU_KIEN', '8.000.000 – 15.000.000 VNĐ/bộ', NULL);

