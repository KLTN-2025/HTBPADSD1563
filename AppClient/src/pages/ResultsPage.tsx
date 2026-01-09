import { useParams, useNavigate } from 'react-router-dom';
import { getCuocBoPhieuById, getKetQuaByCuocBoPhieuId } from '../data/mockData';
import ResultChart from '../components/ResultChart';
import StatusBadge from '../components/StatusBadge';
import {
    ArrowLeft,
    Download,
    Share2,
    Shield,
    Users,
    TrendingUp,
    Award,
    ExternalLink,
} from 'lucide-react';

export default function ResultsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const cuocBoPhieu = id ? getCuocBoPhieuById(parseInt(id)) : undefined;
    const results = id ? getKetQuaByCuocBoPhieuId(parseInt(id)) : [];

    if (!cuocBoPhieu) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-900">404</h1>
                <p className="mb-6 text-gray-600">Không tìm thấy kết quả</p>
                <button
                    onClick={() => navigate('/cuoc-bo-phieu')}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Quay lại
                </button>
            </div>
        );
    }

    const totalVotes = results.reduce((sum, r) => sum + r.tong_phieu, 0);
    const totalVoters = cuocBoPhieu.cu_tri_dang_kys?.length || 0;
    const winner = results.length > 0 ? results.reduce((prev, current) => (prev.tong_phieu > current.tong_phieu ? prev : current)) : null;

    return (
        <div className="space-y-6">
            {/* Back Button */}
            <button
                onClick={() => navigate(`/cuoc-bo-phieu/${cuocBoPhieu.id}`)}
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
                <ArrowLeft className="h-4 w-4" />
                Quay lại chi tiết cuộc bỏ phiếu
            </button>

            {/* Header */}
            <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 to-purple-50 p-8 shadow-sm">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <div className="mb-2">
                            <StatusBadge status={cuocBoPhieu.trang_thai} type="cuoc_bo_phieu" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">Kết quả bỏ phiếu</h1>
                        <p className="mt-2 text-lg text-gray-700">{cuocBoPhieu.tieu_de}</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => alert('Xuất PDF')}
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <Download className="h-4 w-4" />
                            Xuất PDF
                        </button>
                        <button
                            onClick={() => alert('Chia sẻ')}
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <Share2 className="h-4 w-4" />
                            Chia sẻ
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="mt-6 grid gap-4 md:grid-cols-4">
                    <div className="rounded-xl border border-gray-200 bg-white p-4">
                        <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
                            <Users className="h-4 w-4" />
                            Tổng số phiếu
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{totalVotes}</p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-4">
                        <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
                            <Users className="h-4 w-4" />
                            Cử tri đăng ký
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{totalVoters}</p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-4">
                        <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
                            <TrendingUp className="h-4 w-4" />
                            Tỷ lệ tham gia
                        </div>
                        <p className="text-3xl font-bold text-gray-900">
                            {totalVoters > 0 ? ((totalVotes / totalVoters) * 100).toFixed(1) : 0}%
                        </p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-4">
                        <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
                            <Award className="h-4 w-4" />
                            Số lựa chọn
                        </div>
                        <p className="text-3xl font-bold text-gray-900">{results.length}</p>
                    </div>
                </div>
            </div>

            {/* Winner Card */}
            {winner && cuocBoPhieu.trang_thai === 'hoan_thanh' && (
                <div className="relative overflow-hidden rounded-2xl border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 p-8 shadow-lg">
                    <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-yellow-300/30 blur-2xl" />
                    <div className="relative flex items-center gap-4">
                        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 text-4xl shadow-lg">
                            🏆
                        </div>
                        <div className="flex-1">
                            <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-yellow-800">
                                Chiến thắng
                            </h2>
                            <h3 className="mb-1 text-2xl font-bold text-gray-900">
                                {winner.lua_chon?.ten_lua_chon}
                            </h3>
                            <p className="text-lg font-semibold text-yellow-700">
                                {winner.tong_phieu} phiếu (
                                {totalVotes > 0 ? ((winner.tong_phieu / totalVotes) * 100).toFixed(1) : 0}%)
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Results Chart */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                {results.length > 0 ? (
                    <ResultChart results={results} />
                ) : (
                    <div className="py-12 text-center text-gray-500">
                        <Users className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                        <p>Chưa có kết quả bỏ phiếu</p>
                    </div>
                )}
            </div>

            {/* Blockchain Verification */}
            {cuocBoPhieu.merkle_root_hien_tai && (
                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-8">
                    <div className="mb-4 flex items-center gap-3">
                        <Shield className="h-6 w-6 text-blue-600" />
                        <h3 className="text-lg font-semibold text-blue-900">Xác minh Blockchain</h3>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <p className="mb-1 text-sm font-medium text-blue-800">Merkle Root</p>
                            <p className="break-all rounded-lg bg-white/50 p-3 font-mono text-sm text-blue-900">
                                {cuocBoPhieu.merkle_root_hien_tai}
                            </p>
                        </div>
                        {cuocBoPhieu.hop_dong && (
                            <div>
                                <p className="mb-1 text-sm font-medium text-blue-800">Smart Contract</p>
                                <div className="flex items-center gap-2">
                                    <p className="rounded-lg bg-white/50 px-3 py-2 font-mono text-sm text-blue-900">
                                        {cuocBoPhieu.hop_dong.dia_chi_hop_dong}
                                    </p>
                                    <button
                                        onClick={() => alert('Xem trên blockchain explorer')}
                                        className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                    >
                                        Explorer
                                        <ExternalLink className="h-3 w-3" />
                                    </button>
                                </div>
                                <p className="mt-2 text-sm text-blue-700">
                                    Network: <span className="font-medium">{cuocBoPhieu.hop_dong.mang}</span>
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="mt-4 rounded-lg bg-blue-100 p-4 text-sm text-blue-900">
                        <strong>💡 Lưu ý:</strong> Bạn có thể xác minh tính toàn vẹn của kết quả này trên
                        blockchain. Mọi phiếu bầu đều được mã hóa và lưu trữ bất biến.
                    </div>
                </div>
            )}

            {/* Info Footer */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <h4 className="mb-3 font-semibold text-gray-900">Thông tin cuộc bỏ phiếu</h4>
                <dl className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <dt className="text-sm font-medium text-gray-600">Tổ chức</dt>
                        <dd className="mt-1 text-sm font-semibold text-gray-900">
                            {cuocBoPhieu.to_chuc?.ten_to_chuc}
                        </dd>
                    </div>
                    <div>
                        <dt className="text-sm font-medium text-gray-600">Chế độ bầu cử</dt>
                        <dd className="mt-1 text-sm font-semibold text-gray-900">
                            {cuocBoPhieu.che_do === 'mot_lua_chon' && 'Một lựa chọn'}
                            {cuocBoPhieu.che_do === 'nhieu_lua_chon' && 'Nhiều lựa chọn'}
                            {cuocBoPhieu.che_do === 'xep_hang' && 'Xếp hạng'}
                        </dd>
                    </div>
                    {cuocBoPhieu.thoi_gian_bat_dau && (
                        <div>
                            <dt className="text-sm font-medium text-gray-600">Thời gian bắt đầu</dt>
                            <dd className="mt-1 text-sm font-semibold text-gray-900">
                                {new Date(cuocBoPhieu.thoi_gian_bat_dau).toLocaleString('vi-VN')}
                            </dd>
                        </div>
                    )}
                    {cuocBoPhieu.thoi_gian_ket_thuc && (
                        <div>
                            <dt className="text-sm font-medium text-gray-600">Thời gian kết thúc</dt>
                            <dd className="mt-1 text-sm font-semibold text-gray-900">
                                {new Date(cuocBoPhieu.thoi_gian_ket_thuc).toLocaleString('vi-VN')}
                            </dd>
                        </div>
                    )}
                </dl>
            </div>
        </div>
    );
}
