# AppClient - Hệ thống Bầu cử Điện tử (Client)

Ứng dụng client React + TypeScript cho hệ thống bầu cử điện tử, kết nối với Laravel API backend.

## 🚀 Công nghệ sử dụng

- **React 18** - UI Framework
- **TypeScript** - Type safety
- **Vite** - Build tool nhanh
- **React Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling (responsive)
- **Lucide React** - Icons

## 📋 Yêu cầu

- Node.js >= 18.0.0
- npm hoặc yarn

## 🛠️ Cài đặt

1. Cài đặt dependencies:
```bash
npm install
# hoặc
yarn install
```

2. Tạo file `.env` từ `.env.example`:
```bash
cp .env.example .env
```

3. Cấu hình API URL trong file `.env`:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## 🏃 Chạy ứng dụng

### Development mode
```bash
npm run dev
# hoặc
yarn dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

### Build cho production
```bash
npm run build
# hoặc
yarn build
```

### Preview production build
```bash
npm run preview
# hoặc
yarn preview
```

## 📁 Cấu trúc thư mục

```
AppClient/
├── src/
│   ├── components/      # React components tái sử dụng
│   │   ├── Layout.tsx
│   │   ├── Card.tsx
│   │   ├── Button.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── StatusBadge.tsx
│   ├── lib/             # Utilities
│   │   └── api.ts       # Axios client configuration
│   ├── pages/           # Page components
│   │   ├── HomePage.tsx
│   │   ├── CuocBoPhieuPage.tsx
│   │   ├── CuocBoPhieuDetailPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── services/        # API services
│   │   ├── cuocBoPhieuService.ts
│   │   └── phieuBauService.ts
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static files
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── .env                 # Environment variables
```

## 🔌 Kết nối với Backend

Ứng dụng kết nối với Laravel API backend thông qua:

- **Base URL**: Được cấu hình trong `.env` file (`VITE_API_BASE_URL`)
- **API Client**: `src/lib/api.ts` - Axios instance với interceptors
- **Services**: `src/services/` - Các service functions để gọi API

### Các API endpoints được sử dụng:

- `GET /api/cuoc-bo-phieus` - Lấy danh sách cuộc bỏ phiếu
- `GET /api/cuoc-bo-phieus/:id` - Lấy chi tiết cuộc bỏ phiếu
- `GET /api/phieu-baus` - Lấy danh sách phiếu bầu
- `POST /api/phieu-baus` - Tạo phiếu bầu mới

## 🎨 Tính năng

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode ready (có thể mở rộng)
- ✅ Type-safe với TypeScript
- ✅ Error handling
- ✅ Loading states
- ✅ Pagination
- ✅ Status badges
- ✅ Modern UI với Tailwind CSS

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔐 Authentication

Hiện tại ứng dụng chưa có authentication. Có thể mở rộng bằng cách:

1. Thêm authentication service
2. Sử dụng localStorage/sessionStorage để lưu token
3. Thêm protected routes
4. Thêm login/register pages

## 📝 Lưu ý

- Đảm bảo Laravel backend đã chạy và CORS đã được cấu hình đúng
- Kiểm tra API URL trong file `.env` trước khi chạy
- Nếu gặp lỗi CORS, cần cấu hình trong Laravel backend

## 🚧 Mở rộng trong tương lai

- [ ] Authentication & Authorization
- [ ] Form bầu cử với ZK-proof integration
- [ ] Real-time updates với WebSocket
- [ ] Dark mode toggle
- [ ] Internationalization (i18n)
- [ ] Unit tests & E2E tests
- [ ] PWA support

