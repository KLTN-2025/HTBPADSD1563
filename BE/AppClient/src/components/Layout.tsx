import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Vote, Building2, Users, Menu, X, BarChart3, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Trang chủ', to: '/', icon: Home },
    { name: 'Cuộc bỏ phiếu', to: '/cuoc-bo-phieu', icon: Vote },
    { name: 'Tổ chức', to: '/to-chuc', icon: Building2 },
    { name: 'Cử tri', to: '/cu-tri', icon: Users },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg">
                <Vote className="h-6 w-6" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">E-Voting System</h1>
                <p className="text-xs text-gray-500">Hệ thống bầu cử điện tử</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex gap-1 items-center">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.to);
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${active
                          ? 'bg-blue-100 text-blue-700 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                      >
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}

                <li className="ml-4 pl-4 border-l border-gray-200">
                  {user ? (
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <User className="h-4 w-4" />
                        </div>
                        <span className="hidden lg:inline">{user.name}</span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="hidden lg:inline">Đăng xuất</span>
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-all"
                    >
                      <User className="h-4 w-4" />
                      Đăng nhập
                    </Link>
                  )}
                </li>
              </ul>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 md:hidden"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white md:hidden">
            <nav className="px-4 py-4">
              <ul className="space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.to);
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${active
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                          }`}
                      >
                        <Icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {/* About */}
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                Về hệ thống
              </h3>
              <p className="text-sm text-gray-600">
                Hệ thống bầu cử điện tử sử dụng công nghệ blockchain và Zero-Knowledge Proofs để
                đảm bảo tính minh bạch và bảo mật.
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-900">Tính năng</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Bảo mật cao với ZK-Proofs
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Minh bạch với Blockchain
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Xác thực định danh an toàn
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-900">Liên hệ</h3>
              <p className="text-sm text-gray-600">
                Email: support@evoting.vn
                <br />
                Hotline: 1900 xxxx
                <br />
                <span className="text-xs text-gray-500">© 2024 E-Voting System</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
