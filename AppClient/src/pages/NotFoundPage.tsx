import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-900 mb-4">Trang không tìm thấy</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">
          <Home className="h-4 w-4 mr-2" />
          Về trang chủ
        </Button>
      </Link>
    </div>
  );
}

