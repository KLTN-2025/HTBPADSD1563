import type { LuaChon } from '../types';
import { useState } from 'react';
import { CheckCircle2, Circle, CheckSquare, Square } from 'lucide-react';
import Button from './Button';

interface VotingFormProps {
    luaChons: LuaChon[];
    cheMode: 'mot_lua_chon' | 'nhieu_lua_chon' | 'xep_hang';
    onSubmit: (selections: number[]) => void;
    isSubmitting?: boolean;
}

export default function VotingForm({
    luaChons,
    cheMode,
    onSubmit,
    isSubmitting = false,
}: VotingFormProps) {
    const [selectedSingle, setSelectedSingle] = useState<number | null>(null);
    const [selectedMultiple, setSelectedMultiple] = useState<number[]>([]);
    const [rankings, setRankings] = useState<Map<number, number>>(new Map());
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowConfirm(true);
    };

    const confirmSubmit = () => {
        if (cheMode === 'mot_lua_chon' && selectedSingle) {
            onSubmit([selectedSingle]);
        } else if (cheMode === 'nhieu_lua_chon' && selectedMultiple.length > 0) {
            onSubmit(selectedMultiple);
        } else if (cheMode === 'xep_hang' && rankings.size > 0) {
            onSubmit(Array.from(rankings.keys()));
        }
        setShowConfirm(false);
    };

    const handleSingleSelect = (id: number) => {
        setSelectedSingle(id);
    };

    const handleMultipleSelect = (id: number) => {
        setSelectedMultiple((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleRankingChange = (id: number, rank: string) => {
        const rankNum = parseInt(rank);
        if (rankNum > 0 && rankNum <= luaChons.length) {
            setRankings((prev) => {
                const newMap = new Map(prev);
                newMap.set(id, rankNum);
                return newMap;
            });
        } else {
            setRankings((prev) => {
                const newMap = new Map(prev);
                newMap.delete(id);
                return newMap;
            });
        }
    };

    const isValid = () => {
        if (cheMode === 'mot_lua_chon') return selectedSingle !== null;
        if (cheMode === 'nhieu_lua_chon') return selectedMultiple.length > 0;
        if (cheMode === 'xep_hang') return rankings.size > 0;
        return false;
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        {cheMode === 'mot_lua_chon' && 'Chọn một lựa chọn'}
                        {cheMode === 'nhieu_lua_chon' && 'Chọn một hoặc nhiều lựa chọn'}
                        {cheMode === 'xep_hang' && 'Xếp hạng các lựa chọn (1 = ưu tiên nhất)'}
                    </h3>

                    <div className="space-y-3">
                        {luaChons.map((luaChon) => (
                            <div
                                key={luaChon.id}
                                className={`group cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${cheMode === 'mot_lua_chon' && selectedSingle === luaChon.id
                                        ? 'border-blue-500 bg-blue-50'
                                        : cheMode === 'nhieu_lua_chon' && selectedMultiple.includes(luaChon.id)
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                                onClick={() => {
                                    if (cheMode === 'mot_lua_chon') handleSingleSelect(luaChon.id);
                                    else if (cheMode === 'nhieu_lua_chon') handleMultipleSelect(luaChon.id);
                                }}
                            >
                                <div className="flex items-start gap-3">
                                    {/* Icon */}
                                    <div className="mt-0.5 flex-shrink-0">
                                        {cheMode === 'mot_lua_chon' &&
                                            (selectedSingle === luaChon.id ? (
                                                <CheckCircle2 className="h-6 w-6 text-blue-600" />
                                            ) : (
                                                <Circle className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                                            ))}
                                        {cheMode === 'nhieu_lua_chon' &&
                                            (selectedMultiple.includes(luaChon.id) ? (
                                                <CheckSquare className="h-6 w-6 text-blue-600" />
                                            ) : (
                                                <Square className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                                            ))}
                                        {cheMode === 'xep_hang' && (
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600">
                                                {rankings.get(luaChon.id) || '?'}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900">{luaChon.ten_lua_chon}</h4>
                                        {luaChon.mo_ta && <p className="mt-1 text-sm text-gray-600">{luaChon.mo_ta}</p>}
                                    </div>

                                    {/* Ranking input */}
                                    {cheMode === 'xep_hang' && (
                                        <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                                            <input
                                                type="number"
                                                min="1"
                                                max={luaChons.length}
                                                value={rankings.get(luaChon.id) || ''}
                                                onChange={(e) => handleRankingChange(luaChon.id, e.target.value)}
                                                placeholder="Hạng"
                                                className="w-16 rounded-lg border border-gray-300 px-2 py-1 text-center text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => window.history.back()}>
                        Hủy
                    </Button>
                    <Button type="submit" disabled={!isValid() || isSubmitting}>
                        {isSubmitting ? 'Đang gửi...' : 'Gửi phiếu bầu'}
                    </Button>
                </div>
            </form>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <h3 className="mb-4 text-xl font-bold text-gray-900">Xác nhận gửi phiếu bầu</h3>
                        <p className="mb-6 text-gray-600">
                            Bạn có chắc chắn muốn gửi phiếu bầu này? Sau khi gửi, bạn không thể thay đổi lựa chọn.
                        </p>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setShowConfirm(false)}
                                className="flex-1"
                            >
                                Hủy
                            </Button>
                            <Button onClick={confirmSubmit} className="flex-1">
                                Xác nhận
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
