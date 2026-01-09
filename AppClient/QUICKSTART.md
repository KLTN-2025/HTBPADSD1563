# Hướng dẫn nhanh

## Bước 1: Cài đặt dependencies

```bash
cd AppClient
npm install
```

## Bước 2: Cấu hình môi trường

Tạo file `.env` (hoặc copy từ `.env.example`):

```bash
cp .env.example .env
```

Chỉnh sửa file `.env` và đặt URL API của Laravel backend:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## Bước 3: Chạy ứng dụng

```bash
npm run dev
```

Ứng dụng sẽ mở tại: `http://localhost:3000`

## Lưu ý

- Đảm bảo Laravel backend đã chạy
- Kiểm tra CORS configuration trong Laravel nếu gặp lỗi kết nối
- Xem `README.md` để biết thêm chi tiết

