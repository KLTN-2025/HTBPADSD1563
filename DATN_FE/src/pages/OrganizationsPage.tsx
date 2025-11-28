import { mockToChucDonVis, mockCuocBoPhieus } from '../data/mockData';
import { Building2, Vote, Search, Grid, List } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function OrganizationsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const orgTypes = [
        { value: 'all', label: 'Tất cả' },
        { value: 'lop', label: 'Lớp' },
        { value: 'khoa', label: 'Khoa' },
        { value: 'cong_dong', label: 'Cộng đồng' },
        { value: 'khac', label: 'Khác' },
    ];

    const getOrgStats = (orgId: number) => {
        const cuocBoPhieus = mockCuocBoPhieus.filter((c) => c.to_chuc_id === orgId);
        const active = cuocBoPhieus.filter((c) => c.trang_thai === 'dang_dien_ra').length;
        const completed = cuocBoPhieus.filter((c) => c.trang_thai === 'hoan_thanh').length;
        return { total: cuocBoPhieus.length, active, completed };
    };

    const filteredOrgs = useMemo(() => {
        return mockToChucDonVis.filter((org) => {
            const matchesSearch = org.ten_to_chuc.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = selectedType === 'all' || org.loai === selectedType;
            return matchesSearch && matchesType;
        });
    }, [searchTerm, selectedType]);

    const getTypeLabel = (type: string) => {
        const labels: Record<string, string> = {
            lop: 'Lớp',
            khoa: 'Khoa',
            cong_dong: 'Cộng đồng',
            khac: 'Khác',
        };
        return labels[type] || type;
    };

    const getTypeColor = (type: string) => {
        const colors: Record<string, string> = {
            lop: 'from-blue-500 to-blue-600',
            khoa: 'from-purple-500 to-purple-600',
            cong_dong: 'from-green-500 to-green-600',
            khac: 'from-gray-500 to-gray-600',
        };
        return colors[type] || 'from-gray-500 to-gray-600';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="mb-2 text-3xl font-bold text-gray-900">Tổ chức & Đơn vị</h1>
                <p className="text-gray-600">Danh sách các tổ chức tham gia hệ thống bầu cử</p>
            </div>

            {/* Filters */}
            <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                    {/* Search */}
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm tổ chức..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex gap-2 rounded-lg border border-gray-300 bg-white p-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`rounded-md px-3 py-2 text-sm font-medium transition-all ${viewMode === 'grid'
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <Grid className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`rounded-md px-3 py-2 text-sm font-medium transition-all ${viewMode === 'list'
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Type Filter */}
                <div className="flex flex-wrap gap-2">
                    {orgTypes.map((type) => (
                        <button
                            key={type.value}
                            onClick={() => setSelectedType(type.value)}
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${selectedType === type.value
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'
                                }`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results */}
            <div>
                <p className="mb-4 text-sm text-gray-600">
                    Hiển thị <span className="font-semibold text-gray-900">{filteredOrgs.length}</span> tổ chức
                </p>

                {filteredOrgs.length > 0 ? (
                    <div
                        className={
                            viewMode === 'grid'
                                ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
                                : 'space-y-4'
                        }
                    >
                        {filteredOrgs.map((org) => {
                            const stats = getOrgStats(org.id);
                            return (
                                <div
                                    key={org.id}
                                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                                >
                                    <div className={`absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br ${getTypeColor(org.loai)} opacity-10`} />

                                    <div className="relative">
                                        {/* Icon & Type */}
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className={`rounded-xl bg-gradient-to-br ${getTypeColor(org.loai)} p-3 text-white shadow-lg`}>
                                                <Building2 className="h-6 w-6" />
                                            </div>
                                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                                                {getTypeLabel(org.loai)}
                                            </span>
                                        </div>

                                        {/* Name */}
                                        <h3 className="mb-2 text-xl font-bold text-gray-900">{org.ten_to_chuc}</h3>
                                        {org.ma_ngoai && (
                                            <p className="mb-4 text-sm text-gray-500">Mã: {org.ma_ngoai}</p>
                                        )}

                                        {/* Stats */}
                                        <div className="mb-4 grid grid-cols-3 gap-3 border-t border-gray-100 pt-4">
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                                                <p className="text-xs text-gray-500">Tổng số</p>
                                            </div>
                                            <div className="text-center border-l border-gray-100">
                                                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                                                <p className="text-xs text-gray-500">Đang diễn ra</p>
                                            </div>
                                            <div className="text-center border-l border-gray-100">
                                                <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
                                                <p className="text-xs text-gray-500">Hoàn thành</p>
                                            </div>
                                        </div>

                                        {/* View Button */}
                                        <Link
                                            to={`/to-chuc/${org.id}`}
                                            className="flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 transition-all hover:bg-gray-200"
                                        >
                                            <Vote className="h-4 w-4" />
                                            Xem cuộc bỏ phiếu
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
                        <Building2 className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">Không tìm thấy tổ chức</h3>
                        <p className="text-sm text-gray-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                    </div>
                )}
            </div>
        </div>
    );
}
