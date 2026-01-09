import type { CuocBoPhieu } from '../types';
import { Link } from 'react-router-dom';
import { Calendar, Users, Clock, TrendingUp } from 'lucide-react';
import StatusBadge from './StatusBadge';

interface VotingCardProps {
    cuocBoPhieu: CuocBoPhieu;
}

export default function VotingCard({ cuocBoPhieu }: VotingCardProps) {
    const totalVotes =
        cuocBoPhieu.ket_qua_tong_hops?.reduce((sum, k) => sum + k.tong_phieu, 0) || 0;
    const totalVoters = cuocBoPhieu.cu_tri_dang_kys?.length || 0;
    const participationRate = totalVoters > 0 ? ((totalVotes / totalVoters) * 100).toFixed(1) : '0';

    // Tính thời gian còn lại
    const getTimeRemaining = () => {
        if (!cuocBoPhieu.thoi_gian_ket_thuc || cuocBoPhieu.trang_thai !== 'dang_dien_ra') {
            return null;
        }
        const now = new Date();
        const endTime = new Date(cuocBoPhieu.thoi_gian_ket_thuc);
        const diff = endTime.getTime() - now.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        if (days > 0) return `${days} ngày`;
        if (hours > 0) return `${hours} giờ`;
        return 'Sắp kết thúc';
    };

    const timeRemaining = getTimeRemaining();

    // Hiển thị chế độ bầu cử
    const getCheDoText = (che_do: string) => {
        switch (che_do) {
            case 'mot_lua_chon':
                return 'Một lựa chọn';
            case 'nhieu_lua_chon':
                return 'Nhiều lựa chọn';
            case 'xep_hang':
                return 'Xếp hạng';
            default:
                return che_do;
        }
    };

    return (
        <Link to={`/cuoc-bo-phieu/${cuocBoPhieu.id}`}>
            <div className="voting-card group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-blue-300">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                    {/* Header */}
                    <div className="mb-4 flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                                {cuocBoPhieu.tieu_de}
                            </h3>
                            <p className="text-sm text-gray-500">{cuocBoPhieu.to_chuc?.ten_to_chuc}</p>
                        </div>
                        <StatusBadge status={cuocBoPhieu.trang_thai} type="cuoc_bo_phieu" />
                    </div>

                    {/* Description */}
                    {cuocBoPhieu.mo_ta && (
                        <p className="mb-4 line-clamp-2 text-sm text-gray-600">{cuocBoPhieu.mo_ta}</p>
                    )}

                    {/* Stats Grid */}
                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-blue-500" />
                            <span className="text-gray-600">
                                <strong className="font-semibold text-gray-900">{totalVotes}</strong> phiếu
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span className="text-gray-600">
                                <strong className="font-semibold text-gray-900">{participationRate}%</strong> tham gia
                            </span>
                        </div>
                    </div>

                    {/* Time info */}
                    {cuocBoPhieu.thoi_gian_bat_dau && (
                        <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>
                                {new Date(cuocBoPhieu.thoi_gian_bat_dau).toLocaleDateString('vi-VN', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                })}
                                {cuocBoPhieu.thoi_gian_ket_thuc && (
                                    <>
                                        {' - '}
                                        {new Date(cuocBoPhieu.thoi_gian_ket_thuc).toLocaleDateString('vi-VN', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                        })}
                                    </>
                                )}
                            </span>
                        </div>
                    )}

                    {timeRemaining && (
                        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-orange-600">
                            <Clock className="h-4 w-4 animate-pulse" />
                            <span>Còn {timeRemaining}</span>
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                            {getCheDoText(cuocBoPhieu.che_do)}
                        </span>
                        <span className="text-sm font-medium text-blue-600 transition-all group-hover:translate-x-1">
                            Xem chi tiết →
                        </span>
                    </div>

                    {/* Progress bar (nếu đang diễn ra) */}
                    {cuocBoPhieu.trang_thai === 'dang_dien_ra' && totalVoters > 0 && (
                        <div className="mt-4">
                            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                                    style={{ width: `${Math.min(parseFloat(participationRate), 100)}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
