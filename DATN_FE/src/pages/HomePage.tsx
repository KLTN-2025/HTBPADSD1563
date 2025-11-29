import { Link } from 'react-router-dom';
import {
  Vote,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Activity,
  Shield,
  Zap,
  Loader2,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import VotingCard from '../components/VotingCard';
import { cuocBoPhieuService } from '@/services/cuocBoPhieuService';
import { CuocBoPhieu } from '@/types';

export default function HomePage() {
  const [cuocBoPhieus, setCuocBoPhieus] = useState<CuocBoPhieu[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total_cuoc_bo_phieu: 0,
    cuoc_dang_dien_ra: 0,
    total_phieu_bau: 0,
    ty_le_tham_gia: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const polls = await cuocBoPhieuService.getAll();
        setCuocBoPhieus(polls);

        // Calculate stats
        const totalPolls = polls.length;
        const activePolls = polls.filter((p) => p.trang_thai === 'dang_dien_ra').length;

        // For total votes, we might need to fetch results for all polls or get from a stats endpoint
        // For now, let's estimate or fetch for active ones if possible, or just use 0 if expensive
        // Ideally backend provides a dashboard stats endpoint.
        // We'll calculate simple stats from loaded polls if they include vote counts (they might not in list view)

        setStats({
          total_cuoc_bo_phieu: totalPolls,
          cuoc_dang_dien_ra: activePolls,
          total_phieu_bau: 0, // Placeholder as we don't have global vote count easily
          ty_le_tham_gia: 0, // Placeholder
        });
      } catch (error) {
        console.error('Failed to fetch home data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const activeCuocBoPhieus = cuocBoPhieus.filter((c) => c.trang_thai === 'dang_dien_ra').slice(0, 4);

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
    suffix = '',
  }: {
    title: string;
    value: number | string;
    icon: any;
    color: string;
    suffix?: string;
  }) => (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className={`absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br ${color} opacity-10`} />
      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <div className={`rounded-xl bg-gradient-to-br ${color} p-3 text-white shadow-lg`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className={`rounded-full bg-gradient-to-r ${color} px-3 py-1 text-xs font-bold text-white`}>
            {stats.cuoc_dang_dien_ra > 0 && title.includes('đang diễn ra') && 'LIVE'}
          </div>
        </div>
        <p className="mb-1 text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900">
          {value}
          <span className="text-lg text-gray-500">{suffix}</span>
        </p>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 p-8 text-white shadow-2xl md:p-12">
        <div className="absolute right-0 top-0 h-64 w-64 translate-x-20 -translate-y-20 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-20 translate-y-20 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-semibold">Bảo mật với ZK-Proofs & Blockchain</span>
          </div>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Hệ thống Bầu cử
            <br />
            Điện tử Minh bạch
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-blue-100">
            Tham gia vào quá trình bầu cử dân chủ với công nghệ blockchain tiên tiến. Mọi phiếu bầu
            đều được bảo mật và minh bạch tuyệt đối.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/cuoc-bo-phieu"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <Vote className="h-5 w-5" />
              Xem cuộc bỏ phiếu
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
              <Activity className="h-5 w-5" />
              Tìm hiểu thêm
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Thống kê tổng quan</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Cuộc bỏ phiếu"
            value={stats.total_cuoc_bo_phieu}
            icon={Vote}
            color="from-blue-500 to-blue-600"
          />
          <StatCard
            title="Đang diễn ra"
            value={stats.cuoc_dang_dien_ra}
            icon={Activity}
            color="from-green-500 to-green-600"
          />
          <StatCard
            title="Tổng phiếu bầu"
            value={stats.total_phieu_bau}
            icon={CheckCircle2}
            color="from-purple-500 to-purple-600"
          />
          <StatCard
            title="Tỷ lệ tham gia"
            value={stats.ty_le_tham_gia}
            icon={TrendingUp}
            color="from-orange-500 to-orange-600"
            suffix="%"
          />
        </div>
      </div>

      {/* Active Voting Sessions */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Cuộc bỏ phiếu đang diễn ra</h2>
            <p className="text-sm text-gray-600">Tham gia ngay để đóng góp ý kiến của bạn</p>
          </div>
          <Link
            to="/cuoc-bo-phieu"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
          >
            Xem tất cả
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {activeCuocBoPhieus.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {activeCuocBoPhieus.map((cuocBoPhieu) => (
              <VotingCard key={cuocBoPhieu.id} cuocBoPhieu={cuocBoPhieu} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
            <Vote className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Không có cuộc bỏ phiếu nào đang diễn ra
            </h3>
            <p className="text-sm text-gray-600">Hãy quay lại sau để tham gia bầu cử</p>
          </div>
        )}
      </div>

      {/* Features */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Tại sao chọn chúng tôi?</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Bảo mật tuyệt đối</h3>
            <p className="text-sm text-gray-600">
              Sử dụng Zero-Knowledge Proofs để đảm bảo quyền riêng tư và tính ẩn danh của người bầu cử
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Minh bạch hoàn toàn</h3>
            <p className="text-sm text-gray-600">
              Tất cả kết quả được lưu trên blockchain, có thể kiểm chứng bất cứ lúc nào
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Nhanh chóng & Dễ dàng</h3>
            <p className="text-sm text-gray-600">
              Giao diện thân thiện, quy trình bầu cử đơn giản chỉ trong vài bước
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
