import clsx from 'clsx';

interface StatusBadgeProps {
  status: string;
  type?: 'cuoc_bo_phieu' | 'phieu_bau' | 'cu_tri' | 'hop_dong' | 'dinh_danh';
  label?: string;
}

export default function StatusBadge({ status, type = 'cuoc_bo_phieu', label }: StatusBadgeProps) {
  const getStatusStyles = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string; icon?: string }> = {
      // Cuộc bỏ phiếu
      len_ke_hoach: { bg: 'bg-gray-100', text: 'text-gray-800', icon: '📋' },
      dang_dien_ra: { bg: 'bg-green-100', text: 'text-green-800', icon: '🔴' },
      dong: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '🔒' },
      hoan_thanh: { bg: 'bg-blue-100', text: 'text-blue-800', icon: '✅' },
      huy: { bg: 'bg-red-100', text: 'text-red-800', icon: '❌' },
      // Phiếu bầu
      hop_le: { bg: 'bg-green-100', text: 'text-green-800', icon: '✓' },
      khong_hop_le: { bg: 'bg-red-100', text: 'text-red-800', icon: '✗' },
      bi_tu_choi: { bg: 'bg-orange-100', text: 'text-orange-800', icon: '⚠' },
      // Cử tri
      cho_duyet: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '⏳' },
      duyet: { bg: 'bg-green-100', text: 'text-green-800', icon: '✓' },
      // Hợp đồng & Định danh
      hoat_dong: { bg: 'bg-green-100', text: 'text-green-800', icon: '●' },
      tam_dung: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '⏸' },
      ngung: { bg: 'bg-red-100', text: 'text-red-800', icon: '■' },
      cho_xac_thuc: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '⏳' },
      da_xac_thuc: { bg: 'bg-green-100', text: 'text-green-800', icon: '✓' },
      tu_choi: { bg: 'bg-red-100', text: 'text-red-800', icon: '✗' },
    };

    return statusMap[status] || { bg: 'bg-gray-100', text: 'text-gray-800' };
  };

  const getStatusLabel = (status: string) => {
    const labelMap: Record<string, string> = {
      // Cuộc bỏ phiếu
      len_ke_hoach: 'Lên kế hoạch',
      dang_dien_ra: 'Đang diễn ra',
      dong: 'Đã đóng',
      hoan_thanh: 'Hoàn thành',
      huy: 'Đã hủy',
      // Phiếu bầu
      hop_le: 'Hợp lệ',
      khong_hop_le: 'Không hợp lệ',
      bi_tu_choi: 'Bị từ chối',
      // Cử tri
      cho_duyet: 'Chờ duyệt',
      duyet: 'Đã duyệt',
      // Hợp đồng
      hoat_dong: 'Hoạt động',
      tam_dung: 'Tạm dừng',
      ngung: 'Ngừng',
      // Định danh
      cho_xac_thuc: 'Chờ xác thực',
      da_xac_thuc: 'Đã xác thực',
      tu_choi: 'Từ chối',
    };

    return label || labelMap[status] || status;
  };

  const styles = getStatusStyles(status);

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium',
        styles.bg,
        styles.text
      )}
    >
      {styles.icon && <span className="text-xs">{styles.icon}</span>}
      {getStatusLabel(status)}
    </span>
  );
}
