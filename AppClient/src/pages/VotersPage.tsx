import { mockCuTriDangKys, mockCuocBoPhieus } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';
import { Users, Search, Shield, Key, Hash } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function VotersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCuocBoPhieu, setSelectedCuocBoPhieu] = useState<string>('all');

    const cuocBoPhieuOptions = [
        { value: 'all', label: 'Tất cả cuộc bỏ phiếu' },
        ...mockCuocBoPhieus.map((c) => ({ value: c.id.toString(), label: c.tieu_de })),
    ];

    const filteredVoters = useMemo(() => {
        return mockCuTriDangKys.filter((voter) => {
            const matchesSearch =
                voter.dinh_danh?.ho_ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
                voter.dinh_danh?.email.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCuocBoPhieu =
                selectedCuocBoPhieu === 'all' ||
                voter.cuoc_bo_phieu_id === parseInt(selectedCuocBoPhieu);

            return matchesSearch && matchesCuocBoPhieu;
        });
    }, [searchTerm, selectedCuocBoPhieu]);

    const maskHash = (hash: string, showLength: number = 10) => {
        if (hash.length <= showLength * 2) return hash;
        return `${hash.slice(0, showLength)}...${hash.slice(-showLength)}`;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="mb-2 text-3xl font-bold text-gray-900">Cử tri đăng ký</h1>
                <p className="text-gray-600">
                    Danh sách cử tri đã đăng ký tham gia bỏ phiếu (dữ liệu được bảo mật)
                </p>
            </div>

            {/* Privacy Notice */}
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 flex-shrink-0 text-blue-600" />
                    <div>
                        <h3 className="font-semibold text-blue-900">Bảo vệ quyền riêng tư</h3>
                        <p className="mt-1 text-sm text-blue-700">
                            Tất cả thông tin cử tri được mã hóa. Chỉ hiển thị commitment và nullifier để xác minh
                            mà không tiết lộ danh tính thực.
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                    {/* Search */}
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm cử tri..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    {/* Cuoc Bo Phieu Filter */}
                    <select
                        value={selectedCuocBoPhieu}
                        onChange={(e) => setSelectedCuocBoPhieu(e.target.value)}
                        className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                        {cuocBoPhieuOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Results */}
            <div>
                <p className="mb-4 text-sm text-gray-600">
                    Hiển thị <span className="font-semibold text-gray-900">{filteredVoters.length}</span> cử tri
                </p>

                {filteredVoters.length > 0 ? (
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            Cử tri
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            Cuộc bỏ phiếu
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            Commitment
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            Nullifier
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            Vị trí
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                                            Trạng thái
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredVoters.map((voter) => {
                                        const cuocBoPhieu = mockCuocBoPhieus.find(
                                            (c) => c.id === voter.cuoc_bo_phieu_id
                                        );
                                        return (
                                            <tr key={voter.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="font-semibold text-gray-900">
                                                            {voter.dinh_danh?.ho_ten || 'N/A'}
                                                        </p>
                                                        <p className="text-sm text-gray-500">{voter.dinh_danh?.email}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-900">{cuocBoPhieu?.tieu_de}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Hash className="h-4 w-4 flex-shrink-0 text-gray-400" />
                                                        <code className="rounded bg-gray-100 px-2 py-1 text-xs font-mono text-gray-700">
                                                            {maskHash(voter.commitment_cm)}
                                                        </code>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Key className="h-4 w-4 flex-shrink-0 text-gray-400" />
                                                        <code className="rounded bg-gray-100 px-2 py-1 text-xs font-mono text-gray-700">
                                                            {maskHash(voter.nullifier_pub)}
                                                        </code>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                                        #{voter.vi_tri_la}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <StatusBadge status={voter.trang_thai} type="cu_tri" />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
                        <Users className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            Không tìm thấy cử tri
                        </h3>
                        <p className="text-sm text-gray-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                    </div>
                )}
            </div>

            {/* Info Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <div className="mb-3 flex items-center gap-2">
                        <div className="rounded-lg bg-green-100 p-2">
                            <Users className="h-5 w-5 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900">Tổng cử tri</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{mockCuTriDangKys.length}</p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <div className="mb-3 flex items-center gap-2">
                        <div className="rounded-lg bg-blue-100 p-2">
                            <Shield className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900">Đã xác thực</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                        {mockCuTriDangKys.filter((v) => v.trang_thai === 'duyet').length}
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <div className="mb-3 flex items-center gap-2">
                        <div className="rounded-lg bg-yellow-100 p-2">
                            <Key className="h-5 w-5 text-yellow-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900">Chờ duyệt</h3>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                        {mockCuTriDangKys.filter((v) => v.trang_thai === 'cho_duyet').length}
                    </p>
                </div>
            </div>
        </div>
    );
}
