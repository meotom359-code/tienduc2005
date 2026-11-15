# VietGo AI — Website du lịch AI thông minh

Đây là bản demo frontend có thể mở và chỉnh sửa bằng Visual Studio Code. Giao diện lấy cảm hứng từ ảnh tham khảo: bản đồ lớn, thanh tìm kiếm, robot trợ lý, công cụ VR, nút yêu thích và thanh điều hướng đa giác.

## Cách chạy trong Visual Studio Code

1. Giải nén `du_lich_ai_thong_minh.zip`.
2. Mở thư mục `du_lich_ai_thong_minh` bằng Visual Studio Code.
3. Cài extension **Live Server** (Ritwick Dey) nếu chưa có.
4. Nhấn chuột phải vào `index.html` → **Open with Live Server**.
5. Đảm bảo có kết nối Internet để tải bản đồ OpenStreetMap, Leaflet và font chữ.

Có thể mở trực tiếp `index.html`, nhưng Live Server được khuyến nghị.

## Chức năng trong bản demo

- Bản đồ tương tác OpenStreetMap và marker địa điểm tại Hà Nội.
- Tìm kiếm địa điểm và xem vị trí trên bản đồ.
- Lấy vị trí hiện tại qua trình duyệt (cần cấp quyền).
- Bộ lọc theo sở thích.
- Lưu địa điểm yêu thích bằng `localStorage`.
- Trợ lý lập lịch trình demo dựa trên số ngày, ngân sách và phong cách du lịch.
- Cửa sổ trải nghiệm VR minh họa.
- Giao diện responsive cho máy tính và điện thoại.

## Lưu ý về AI, dữ liệu và bảo mật

Chức năng tư vấn hiện là **bản mô phỏng phía trình duyệt**, chưa gọi mô hình AI thật. Để dùng AI thật, cần tạo backend (ví dụ Node.js/Express hoặc Python/Flask) và gọi API từ backend. Không đặt API key bí mật trong `script.js` hoặc các tệp frontend.

Dữ liệu địa điểm đang được khai báo mẫu trong `script.js`; yêu thích được lưu trong trình duyệt hiện tại. Đây chưa phải hệ thống có tài khoản và cơ sở dữ liệu dùng chung. Có thể mở rộng bằng database như MySQL/MongoDB, xác thực tài khoản, phân quyền Admin, và API địa điểm.

Cửa sổ VR hiện là cảnh minh họa CSS, chưa phải trải nghiệm 360° thật. Có thể thay bằng ảnh panorama 360° hoặc thư viện xem 360°/WebXR. Nút Map 4D cũng đang là giao diện demo, bản đồ nền thực tế là OpenStreetMap 2D.

## Cấu trúc

- `index.html`: cấu trúc giao diện.
- `style.css`: thiết kế, màu sắc, bố cục và responsive.
- `script.js`: bản đồ, tìm kiếm, yêu thích và logic gợi ý demo.
