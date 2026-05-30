# Hướng dẫn cài đặt và chạy dự án DuelCut Local

Tài liệu này cung cấp các bước chi tiết để thiết lập và chạy dự án DuelCut trên môi trường máy tính cá nhân của bạn.

## 1. Yêu cầu hệ thống (Prerequisites)

Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt các công cụ sau:
- **Node.js**: Phiên bản 18.x hoặc mới hơn (Khuyên dùng v20+).
- **npm**: Thường đi kèm khi cài đặt Node.js.
- **Git**: Để quản lý mã nguồn.

Kiểm tra phiên bản bằng lệnh:
```bash
node -v
npm -v
```

## 2. Các bước cài đặt (Installation)

Thực hiện các lệnh sau theo thứ tự:

### Bước 2.1: Sao chép kho lưu trữ (Clone Repository)
Nếu bạn chưa có mã nguồn local:
```bash
git clone <url-cua-kho-luu-tru>
cd Trae-hackathon
```

### Bước 2.2: Cài đặt thư viện (Install Dependencies)
```bash
npm install
```
*Lưu ý: Nếu gặp lỗi về quyền hạn, hãy thử dùng `sudo npm install` (Linux/macOS) hoặc chạy Terminal với quyền Administrator (Windows).*

## 3. Chạy ứng dụng (Running the App)

### Chế độ phát triển (Development Mode)
Để chạy ứng dụng với tính năng tự động tải lại khi sửa code:
```bash
npm run dev
```
Sau khi chạy, ứng dụng sẽ có tại: [http://localhost:3000](http://localhost:3000)

### Chế độ sản xuất (Production Build)
Để kiểm tra bản dựng tối ưu:
```bash
npm run build
npm run start
```

## 4. Kiểm tra và Xác nhận (Verification)

Để xác nhận ứng dụng chạy thành công, hãy kiểm tra:
1. **Trình duyệt**: Truy cập [http://localhost:3000](http://localhost:3000), bạn sẽ thấy giao diện Header "DuelCut".
2. **Chức năng**:
   - Chọn một mẫu log từ dropdown "Select Sample Log".
   - Nhấn nút "Generate Storyboard".
   - Kiểm tra xem các thẻ cảnh (Scene Cards) có xuất hiện ở bảng giữa không.
   - Kiểm tra xem bảng "Live Replay Preview" ở dưới cùng có hiển thị timeline không.

## 5. Xử lý lỗi Git (Git Troubleshooting)

Nếu bạn gặp lỗi `Your local changes to the following files would be overwritten by merge` (như trong Terminal #942-1011):

**Nguyên nhân**: Các tệp rác hoặc tệp tự động tạo (như `.next/` hoặc `node_modules/`) đang bị Git theo dõi.

**Cách xử lý**:
1. Cập nhật tệp `.gitignore` (đã được thực hiện trong dự án này).
2. Chạy các lệnh sau để làm sạch:
```bash
# Hủy bỏ các thay đổi tạm thời trong node_modules và .next
git restore node_modules/ .next/
# Xóa các tệp không được theo dõi
git clean -fd
# Thực hiện pull lại
git pull origin main
```

Nếu có xung đột mã nguồn (Merge Conflicts), hãy mở các tệp bị báo đỏ, tìm các thẻ `<<<<<<< HEAD`, `=======`, `>>>>>>>` để chọn đoạn mã đúng và lưu lại, sau đó commit.
