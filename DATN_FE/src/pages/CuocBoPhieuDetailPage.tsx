import { useParams, Link, useNavigate } from 'react-router-dom';
import { getCuocBoPhieuById, getKetQuaByCuocBoPhieuId } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import ResultChart from '../components/ResultChart';
import VotingForm from '../components/VotingForm';
import {
  Calendar,
  Users,
  Building2,
  ArrowLeft,
  TrendingUp,
  Shield,
  ExternalLink,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { useState } from 'react';

export default function CuocBoPhieuDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hasVoted, setHasVoted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const cuocBoPhieu = id ? getCuocBoPhieuById(parseInt(id)) : undefined;

  if (!cuocBoPhieu) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">404</h1>
        <p className="mb-6 text-gray-600">Không tìm thấy cuộc bỏ phiếu</p>
        <Link
          to="/cuoc-bo-phieu"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  const results = getKetQuaByCuocBoPhieuId(cuocBoPhieu.id);
  const totalVotes = results.reduce((sum, r) => sum + r.tong_phieu, 0);
  const totalVoters = cuocBoPhieu.cu_tri_dang_kys?.length || 0;
  const participationRate = totalVoters > 0 ? ((totalVotes / totalVoters) * 100).toFixed(1) : '0';

  const canVote = cuocBoPhieu.trang_thai === 'dang_dien_ra' && !hasVoted;
  const showResults =
    cuocBoPhieu.trang_thai === 'hoan_thanh' ||
    cuocBoPhieu.trang_thai === 'dong' ||
    cuocBoPhieu.trang_thai === 'dang_dien_ra';

  const handleVoteSubmit = (selections: number[]) => {
    console.log('Vote submitted:', selections);
    setHasVoted(true);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const InfoItem = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | React.ReactNode }) => (
    <div className="flex items-start gap-3">
      <div className="rounded-lg bg-gray-100 p-2">
        <Icon className="h-5 w-5 text-gray-600" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-base font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccess && (
        <div className="animate-slide-in-top fixed left-1/2 top-4 z-50 flex w-full max-w-md -translate-x-1/2 items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 shadow-lg">
          <CheckCircle2 className="h-6 w-6 flex-shrink-0 text-green-600" />
          <div>
            <h4 className="font-semibold text-green-900">Gửi phiếu bầu thành công!</h4>
            <p className="text-sm text-green-700">Phiếu bầu của bạn đã được ghi nhận an toàn.</p>
          </div>
        </div>
      )}

      {/* Back Button */}
      <button
        onClick={() => navigate('/cuoc-bo-phieu')}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại danh sách
      </button>

      {/* Header */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <StatusBadge status={cuocBoPhieu.trang_thai} type="cuoc_bo_phieu" />
              {cuocBoPhieu.trang_thai === 'dang_dien_ra' && (
                <span className="flex items-center gap-1 text-sm font-medium text-red-600">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                  </span>
                  ĐANG DIỄN RA
                </span>
              )}
            </div>
            <h1 className="mb-3 text-3xl font-bold text-gray-900">{cuocBoPhieu.tieu_de}</h1>
            {cuocBoPhieu.mo_ta && <p className="text-gray-600">{cuocBoPhieu.mo_ta}</p>}
          </div>
        </div>

        {/* Info Grid */}
        <div className="mt-6 grid gap-6 border-t border-gray-200 pt-6 md:grid-cols-2 lg:grid-cols-4">
          <InfoItem icon={Building2} label="Tổ chức" value={cuocBoPhieu.to_chuc?.ten_to_chuc || 'N/A'} />
          <InfoItem
            icon={Calendar}
            label="Thời gian"
            value={
              cuocBoPhieu.thoi_gian_bat_dau && cuocBoPhieu.thoi_gian_ket_thuc ? (
                <span className="text-sm">
                  {new Date(cuocBoPhieu.thoi_gian_bat_dau).toLocaleDateString('vi-VN')}
                  <br />→ {new Date(cuocBoPhieu.thoi_gian_ket_thuc).toLocaleDateString('vi-VN')}
                </span>
              ) : (
                'Chưa xác định'
              )
            }
          />
          <InfoItem icon={Users} label="Tổng phiếu" value={totalVotes.toString()} />
          <InfoItem icon={TrendingUp} label="Tỷ lệ tham gia" value={`${participationRate}%`} />
        </div>

        {/* Blockchain Info */}
        {cuocBoPhieu.merkle_root_hien_tai && (
          <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 flex-shrink-0 text-blue-600" />
              <div className="flex-1">
                <h4 className="mb-1 font-semibold text-blue-900">Merkle Root</h4>
                <p className="break-all font-mono text-xs text-blue-700">
                  {cuocBoPhieu.merkle_root_hien_tai}
                </p>
              </div>
            </div>
            {cuocBoPhieu.hop_dong && (
              <div className="mt-3 flex items-center gap-2 text-sm text-blue-700">
                <span className="font-medium">{cuocBoPhieu.hop_dong.mang}</span>
                <span>•</span>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 hover:text-blue-900"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Xem trên blockchain explorer');
                  }}
                >
                  Xem trên Explorer
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Voting Form */}
      {canVote && cuocBoPhieu.lua_chons && cuocBoPhieu.lua_chons.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Gửi phiếu bầu</h2>
              <p className="text-sm text-gray-600">Lựa chọn của bạn sẽ được bảo mật tuyệt đối</p>
            </div>
          </div>
          <VotingForm
            luaChons={cuocBoPhieu.lua_chons}
            cheMode={cuocBoPhieu.che_do}
            onSubmit={handleVoteSubmit}
          />
        </div>
      )}

      {/* Already Voted Message */}
      {hasVoted && cuocBoPhieu.trang_thai === 'dang_dien_ra' && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
          <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-green-600" />
          <h3 className="mb-2 text-lg font-semibold text-green-900">Bạn đã bỏ phiếu</h3>
          <p className="text-sm text-green-700">
            Cảm ơn bạn đã tham gia. Phiếu bầu của bạn đã được ghi nhận an toàn trên blockchain.
          </p>
        </div>
      )}

      {/* Results */}
      {showResults && results.length > 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <ResultChart results={results} />
          {cuocBoPhieu.trang_thai === 'dang_dien_ra' && (
            <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
              <strong>Lưu ý:</strong> Đây là kết quả tạm thời. Kết quả chính thức sẽ được công bố sau khi cuộc bỏ phiếu kết thúc.
            </div>
          )}
        </div>
      )}

      {/* View Full Results Link */}
      {showResults && (
        <div className="text-center">
          <Link
            to={`/cuoc-bo-phieu/${cuocBoPhieu.id}/ket-qua`}
            className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-6 py-3 font-medium text-gray-900 hover:bg-gray-200"
          >
            Xem kết quả chi tiết
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
