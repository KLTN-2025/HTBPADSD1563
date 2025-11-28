import { useState, useMemo } from 'react';
import { mockCuocBoPhieus } from '../data/mockData';
import VotingCard from '../components/VotingCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

export default function CuocBoPhieuPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedOrg, setSelectedOrg] = useState<string>('all');

  const statuses = [
    { value: 'all', label: 'Tất cả', count: mockCuocBoPhieus.length },
    {
      value: 'dang_dien_ra',
      label: 'Đang diễn ra',
      count: mockCuocBoPhieus.filter((c) => c.trang_thai === 'dang_dien_ra').length,
    },
    {
      value: 'len_ke_hoach',
      label: 'Sắp diễn ra',
      count: mockCuocBoPhieus.filter((c) => c.trang_thai === 'len_ke_hoach').length,
    },
    {
      value: 'hoan_thanh',
      label: 'Hoàn thành',
      count: mockCuocBoPhieus.filter((c) => c.trang_thai === 'hoan_thanh').length,
    },
    {
      value: 'dong',
      label: 'Đã đóng',
      count: mockCuocBoPhieus.filter((c) => c.trang_thai === 'dong').length,
    },
  ];

  const organizations = useMemo(() => {
    const orgs = new Set(mockCuocBoPhieus.map((c) => c.to_chuc?.ten_to_chuc).filter(Boolean));
    return [{ value: 'all', label: 'Tất cả tổ chức' }, ...Array.from(orgs).map((org) => ({ value: org!, label: org! }))];
  }, []);

  const filteredCuocBoPhieus = useMemo(() => {
    return mockCuocBoPhieus.filter((cuocBoPhieu) => {
      const matchesSearch =
        cuocBoPhieu.tieu_de.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cuocBoPhieu.mo_ta?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cuocBoPhieu.to_chuc?.ten_to_chuc.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = selectedStatus === 'all' || cuocBoPhieu.trang_thai === selectedStatus;

      const matchesOrg =
        selectedOrg === 'all' || cuocBoPhieu.to_chuc?.ten_to_chuc === selectedOrg;

      return matchesSearch && matchesStatus && matchesOrg;
    });
  }, [searchTerm, selectedStatus, selectedOrg]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Cuộc bỏ phiếu</h1>
        <p className="text-gray-600">
          Danh sách tất cả các cuộc bỏ phiếu trong hệ thống
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm cuộc bỏ phiếu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Status Tabs */}
        <div className="overflow-x-auto">
          <div className="flex gap-2 border-b border-gray-200 pb-2">
            {statuses.map((status) => (
              <button
                key={status.value}
                onClick={() => setSelectedStatus(status.value)}
                className={`flex-shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-all ${selectedStatus === status.value
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {status.label}
                <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold">
                  {status.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Organization Filter */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <SlidersHorizontal className="h-4 w-4" />
            Bộ lọc:
          </div>
          <select
            value={selectedOrg}
            onChange={(e) => setSelectedOrg(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            {organizations.map((org) => (
              <option key={org.value} value={org.value}>
                {org.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Hiển thị <span className="font-semibold text-gray-900">{filteredCuocBoPhieus.length}</span> kết quả
          </p>
        </div>

        {filteredCuocBoPhieus.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {filteredCuocBoPhieus.map((cuocBoPhieu) => (
              <VotingCard key={cuocBoPhieu.id} cuocBoPhieu={cuocBoPhieu} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
            <Filter className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Không tìm thấy kết quả
            </h3>
            <p className="text-sm text-gray-600">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
