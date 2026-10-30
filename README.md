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
- Trang Sản phẩm riêng với 8 sản phẩm/dịch vụ, giá tham khảo, thư viện ảnh cho các mục đã có ảnh, hướng dẫn đặt dịch vụ và liên hệ tư vấn.
- Trang Về chúng tôi riêng, giới thiệu định hướng VICO, hành trình dự án và các thành viên.
- Trang Liên hệ riêng với form tư vấn và thông tin liên hệ VICO.
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
   │  │  └─ products/          # Ảnh sản phẩm theo nhóm làng nghề
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

## Đưa website lên GitHub Pages

Repo đã có workflow tự build thư mục `frontend` và deploy khi có commit mới lên nhánh `main`. Trong GitHub, vào **Settings → Pages**, đặt **Build and deployment → Source** thành **GitHub Actions**. Workflow dùng đường dẫn `/VicoWebsite/` cho địa chỉ project Pages; chạy local vẫn dùng đường dẫn gốc.

Sau khi lưu thay đổi ở máy, mở Terminal tại thư mục gốc repo và chạy:

```powershell
git add .
git commit -m "Update VICO website"
git push origin main
```

Mở tab **Actions** để xem hai bước build và deploy. Khi cả hai có dấu xanh, mở địa chỉ được ghi trong **Settings → Pages**. Những lần push tiếp theo lên `main` sẽ tự cập nhật website.

## Các khu vực trên website

| Khu vực | Nội dung | Cách mở |
| --- | --- | --- |
| Trang chủ | Thông điệp VICO, tiêu đề và banner carousel | `/#home` |
| Sản phẩm | Tám mục sản phẩm/dịch vụ, xem chi tiết, gói giá và liên hệ tư vấn | `/?page=products` |
| Về chúng tôi | Sứ mệnh, hành trình dự án và đội ngũ VICO | `/?page=about` |
| Nghệ nhân | Tôn vinh nghệ nhân và câu chuyện làng nghề | `/#artisans` |
| Giá trị di sản | Định hướng gìn giữ và đưa di sản đến gần cộng đồng | `/#heritage` |
| Liên hệ | Form tư vấn, địa chỉ, điện thoại và email | `/?page=contact` |

## Kịch bản trình diễn

1. Mở trang chủ và giới thiệu thông điệp kết nối nghệ nhân, làng nghề và doanh nghiệp.
2. Dùng nút tam giác để chuyển qua video, Gốm Biên Hòa và Lân Sư Rồng.
3. Cuộn trang để trình bày hiệu ứng banner phóng lớn.
4. Tiếp tục cuộn tới các phần giá trị di sản, nghệ nhân và liên hệ.
5. Mở trang Sản phẩm, xem chi tiết một mục rồi bấm liên hệ tư vấn để thấy chủ đề được điền sẵn trong form.
6. Mở trang Về chúng tôi để giới thiệu sứ mệnh, hành trình dự án và đội ngũ.
7. Điền form liên hệ để gửi yêu cầu tư vấn tới Formspree.

### Form liên hệ gửi thông tin đi đâu?

Formspree nhận form từ website tĩnh và gửi thông báo tới email đã xác nhận trong tài khoản. Endpoint hiện tại của VICO đã được khai báo trong frontend.

Nếu cần đổi endpoint khi chạy local, trong `frontend` sao chép `.env.example` thành `.env.local` rồi cập nhật biến:

```text
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

Khởi động lại `npm run dev` sau khi thay đổi. Form gửi nội dung qua endpoint Formspree tới email đã xác nhận trong tài khoản VICO. Xem [hướng dẫn chính thức](https://help.formspree.io/articles/building-your-form/building-an-html-form) nếu cần tạo form hoặc thay endpoint.

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
