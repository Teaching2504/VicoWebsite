# VICO — Kết nối di sản Việt

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Desktop%20%7C%20Mobile-2E7D68)

VICO là website giới thiệu và lan tỏa giá trị văn hóa, làng nghề truyền thống Việt Nam. Trang web kể câu chuyện về nghệ nhân và di sản, đồng thời tạo cầu nối giữa làng nghề với cộng đồng và doanh nghiệp.

> **Trạng thái hiện tại:** Trang giới thiệu đã có thanh điều hướng responsive, hiệu ứng banner theo thao tác cuộn, carousel gồm một video và hai hình ảnh Gốm Biên Hòa, Lân Sư Rồng, cùng các phần giới thiệu di sản, nghệ nhân và liên hệ. Đây là frontend tĩnh, không cần cấu hình backend, database hoặc API key để chạy.

## Tính năng

- Trang chủ giới thiệu thông điệp **“Kết nối tinh hoa. Lan tỏa di sản Việt.”**
- Carousel có video làng nghề, ảnh Gốm Biên Hòa và ảnh Lân Sư Rồng.
- Chuyển banner bằng nút tam giác hoặc chấm điều hướng; nội dung và số thứ tự tự cập nhật theo danh sách slide.
- Cuộn trang để xem banner phóng lớn dần.
- Thanh điều hướng co gọn thành menu trên màn hình nhỏ.
- Các phần nội dung giới thiệu giá trị di sản, nghệ nhân và thông tin liên hệ VICO.

## Công nghệ

- React 19
- Vite 8
- JavaScript
- CSS
- Lucide React (biểu tượng)

## Cấu trúc dự án

```text
VicoWebsite/
├─ README.md
└─ frontend/
   ├─ public/
   │  ├─ images/
   │  │  ├─ banner2.jpeg       # Ảnh Lân Sư Rồng
   │  │  ├─ banner3.jpg        # Ảnh Gốm Biên Hòa
   │  │  └─ vicologo.png       # Logo VICO
   │  └─ videos/
   │     └─ heritage-h264.mp4  # Video banner
   ├─ src/
   │  ├─ App.jsx               # Nội dung trang và danh sách carousel
   │  ├─ App.css               # Giao diện và hiệu ứng
   │  ├─ index.css             # Kiểu dáng cơ bản
   │  └─ main.jsx              # Điểm khởi chạy React
   ├─ package.json             # Thư viện và lệnh chạy
   └─ vite.config.js
```

## Yêu cầu

- Node.js `20.19+` hoặc `22.12+`
- npm (được cài cùng Node.js)

## Cài đặt và chạy

Mở PowerShell hoặc Terminal tại thư mục gốc repo, sau đó cài thư viện:

```powershell
cd frontend
npm ci
```

Khởi chạy website ở chế độ phát triển:

```powershell
npm run dev
```

Mở địa chỉ Local mà Vite in trong Terminal (thường là <http://localhost:5173>). Để dừng server, nhấn `Ctrl + C`.

Không cần cài database hoặc chạy backend riêng.

## Các khu vực trên website

| Khu vực | Nội dung | Cách mở |
| --- | --- | --- |
| Trang chủ | Thông điệp VICO, tiêu đề và banner carousel | `/#home` |
| Giá trị di sản | Định hướng gìn giữ và đưa di sản đến gần cộng đồng | `/#heritage` |
| Nghệ nhân | Tôn vinh nghệ nhân và câu chuyện làng nghề | `/#artisans` |
| Liên hệ | Lời mời kết nối cùng VICO | `/#contact` |

## Kịch bản trình diễn

1. Mở trang chủ và giới thiệu thông điệp kết nối nghệ nhân, làng nghề và doanh nghiệp.
2. Dùng nút tam giác để chuyển qua video, Gốm Biên Hòa và Lân Sư Rồng.
3. Cuộn trang để trình bày hiệu ứng banner phóng lớn.
4. Tiếp tục cuộn tới các phần giá trị di sản, nghệ nhân và liên hệ.

## Thay ảnh hoặc video banner

Danh sách slide nằm trong mảng `slides` ở `frontend/src/App.jsx`.

- Ảnh đặt trong `frontend/public/images/`, ví dụ `/images/banner3.jpg`.
- Video đặt trong `frontend/public/videos/`, ví dụ `/videos/heritage-h264.mp4`.
- Với slide video, khai báo thêm thuộc tính `video`; trường `image` là ảnh dự phòng.
- Mỗi slide có thể có `category`, `title` và `description` để cập nhật nội dung hiển thị.

Ví dụ khai báo một slide ảnh:

```js
{
  image: "/images/ten-anh-moi.jpg",
  category: "TÊN CHỦ ĐỀ",
  title: "Tiêu đề banner",
  description: "Mô tả ngắn cho banner.",
}
```

Carousel tự lấy số lượng từ mảng `slides`, vì vậy bộ đếm và chấm điều hướng không cần sửa riêng khi thêm hoặc bớt slide.

## Kiểm tra và đóng gói

Chạy các lệnh trong thư mục `frontend`:

```powershell
npm run lint    # Kiểm tra code
npm run build   # Tạo bản production trong frontend/dist
npm run preview # Xem thử bản production trên máy
```

## Khắc phục nhanh

- **`npm` không chạy:** cài Node.js phiên bản đáp ứng yêu cầu, mở lại Terminal rồi thử lại.
- **Thiếu thư viện:** đảm bảo Terminal đang ở `frontend`, sau đó chạy `npm ci`.
- **Không thấy ảnh/video:** xác nhận file nằm trong `frontend/public/` và đường dẫn trong `slides` bắt đầu bằng `/images/` hoặc `/videos/`.
- **Video không phát:** dùng MP4 mã hóa H.264 và thử tải lại trang bằng Chrome hoặc Edge.
