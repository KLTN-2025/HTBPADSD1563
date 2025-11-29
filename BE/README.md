# E-Voting System (Nhóm 07 - 2025)

Hệ thống bỏ phiếu điện tử ứng dụng công nghệ Blockchain (mô phỏng) và Zero-Knowledge Proofs.

## Yêu cầu hệ thống

-   PHP >= 8.2
-   Composer
-   Node.js >= 18
-   MySQL / MariaDB
-   XAMPP (khuyến nghị cho Windows)

## Cài đặt

1.  **Clone dự án**
    ```bash
    git clone <repository-url>
    cd nhom_07_2025
    ```

2.  **Cài đặt Dependencies**
    ```bash
    # Backend & Admin Panel
    composer install
    npm install

    # Client App
    cd AppClient
    npm install
    cd ..
    ```

3.  **Cấu hình môi trường**
    -   Copy file `.env.example` thành `.env`
    -   Cấu hình thông tin Database trong `.env`:
        ```env
        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=nhom_07_2025
        DB_USERNAME=root
        DB_PASSWORD=
        ```

4.  **Khởi tạo Database**
    ```bash
    php artisan key:generate
    php artisan migrate --seed
    ```
    *Lệnh `migrate --seed` sẽ tạo bảng và dữ liệu mẫu cho cả Admin và Client.*

## Chạy dự án

Mở 3 terminal riêng biệt:

1.  **Terminal 1 (Laravel Server & API)**
    ```bash
    php artisan serve
    ```
    Server sẽ chạy tại: `http://127.0.0.1:8000`

2.  **Terminal 2 (Admin Panel Assets)**
    ```bash
    npm run dev
    ```

3.  **Terminal 3 (Client App)**
    ```bash
    cd AppClient
    npm run dev
    ```
    Client App sẽ chạy tại: `http://localhost:5173` (mặc định)

## Hướng dẫn truy cập

### 1. Admin Panel (Quản trị hệ thống)
Dành cho Quản trị viên và Quản lý tổ chức.

-   **URL**: [http://127.0.0.1:8000/login](http://127.0.0.1:8000/login)
-   **Tài khoản Master Admin** (Toàn quyền):
    -   Email: `admin@evote.test`
    -   Password: `password`

### 2. Client App (Ứng dụng Cử tri)
Dành cho Sinh viên/Cử tri tham gia bỏ phiếu.

-   **URL**: [http://localhost:5173](http://localhost:5173) (hoặc port hiển thị ở Terminal 3)
-   **Tài khoản Test User**:
    -   Email: `user@evote.test`
    -   Password: `password`

## Cấu trúc dự án

-   **Admin Panel**: Laravel + Inertia.js + React (thư mục `resources/js`)
-   **Client App**: React (SPA) gọi API Laravel (thư mục `AppClient`)
-   **Database**: MySQL

## Tính năng chính

-   Quản lý Tổ chức, Đơn vị.
-   Quản lý Người dùng & Phân quyền (RBAC).
-   Tạo và Quản lý Cuộc bỏ phiếu.
-   Duyệt đăng ký Cử tri.
-   Bỏ phiếu an toàn & Minh bạch.
