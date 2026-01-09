import type { KetQuaTongHop } from '../types';
import { useMemo } from 'react';

interface ResultChartProps {
    results: KetQuaTongHop[];
    showPercentage?: boolean;
}

export default function ResultChart({ results, showPercentage = true }: ResultChartProps) {
    const totalVotes = useMemo(() => {
        return results.reduce((sum, r) => sum + r.tong_phieu, 0);
    }, [results]);

    const sortedResults = useMemo(() => {
        return [...results].sort((a, b) => b.tong_phieu - a.tong_phieu);
    }, [results]);

    const getBarColor = (index: number) => {
        const colors = [
            'from-blue-500 to-blue-600',
            'from-purple-500 to-purple-600',
            'from-pink-500 to-pink-600',
            'from-orange-500 to-orange-600',
            'from-green-500 to-green-600',
            'from-indigo-500 to-indigo-600',
            'from-red-500 to-red-600',
            'from-yellow-500 to-yellow-600',
        ];
        return colors[index % colors.length];
    };

    const getPercentage = (votes: number) => {
        if (totalVotes === 0) return 0;
        return ((votes / totalVotes) * 100).toFixed(1);
    };

    if (results.length === 0) {
        return (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
                <p className="text-gray-500">Chưa có kết quả bỏ phiếu</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Kết quả bỏ phiếu</h3>
                <div className="text-sm text-gray-500">
                    Tổng số phiếu: <span className="font-bold text-gray-900">{totalVotes}</span>
                </div>
            </div>

            <div className="space-y-5">
                {sortedResults.map((result, index) => {
                    const percentage = getPercentage(result.tong_phieu);
                    const isWinner = index === 0 && sortedResults.length > 1;

                    return (
                        <div
                            key={result.id}
                            className={`group relative rounded-lg border p-4 transition-all duration-300 ${isWinner
                                    ? 'border-yellow-300 bg-yellow-50/50 shadow-md'
                                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                                }`}
                        >
                            {/* Winner badge */}
                            {isWinner && (
                                <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 text-white shadow-lg">
                                    <span className="text-sm font-bold">🏆</span>
                                </div>
                            )}

                            <div className="mb-3 flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="mb-1 flex items-center gap-2">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                                            {index + 1}
                                        </span>
                                        <h4 className="font-semibold text-gray-900">
                                            {result.lua_chon?.ten_lua_chon || `Lựa chọn ${result.lua_chon_id}`}
                                        </h4>
                                    </div>
                                    {result.lua_chon?.mo_ta && (
                                        <p className="ml-8 text-sm text-gray-500">{result.lua_chon.mo_ta}</p>
                                    )}
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-2xl font-bold text-gray-900">{result.tong_phieu}</span>
                                    {showPercentage && (
                                        <span className="text-sm font-medium text-gray-500">{percentage}%</span>
                                    )}
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="relative h-3 overflow-hidden rounded-full bg-gray-100">
                                <div
                                    className={`h-full bg-gradient-to-r transition-all duration-700 ease-out ${getBarColor(
                                        index
                                    )}`}
                                    style={{
                                        width: `${percentage}%`,
                                        transitionDelay: `${index * 100}ms`,
                                    }}
                                >
                                    {/* Shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                                </div>
                            </div>

                            {/* Last updated */}
                            {result.cap_nhat_cuoi && (
                                <div className="mt-2 text-xs text-gray-400">
                                    Cập nhật:{' '}
                                    {new Date(result.cap_nhat_cuoi).toLocaleString('vi-VN', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
