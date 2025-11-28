import type {
    ToChucDonVi,
    CuocBoPhieu,
    LuaChon,
    KetQuaTongHop,
    CuTriDangKy,
    PhieuBau,
    HopDong,
    XacThucDinhDanh,
    DashboardStats,
} from '../types';

// Tổ chức đơn vị mock data
export const mockToChucDonVis: ToChucDonVi[] = [
    {
        id: 1,
        ten_to_chuc: 'Khoa Công nghệ Thông tin',
        loai: 'khoa',
        ma_ngoai: 'CNTT',
        created_at: '2024-01-15T08:00:00Z',
        updated_at: '2024-01-15T08:00:00Z',
    },
    {
        id: 2,
        ten_to_chuc: 'Lớp K66-CNTT1',
        loai: 'lop',
        ma_ngoai: 'K66-CNTT1',
        created_at: '2024-01-20T08:00:00Z',
        updated_at: '2024-01-20T08:00:00Z',
    },
    {
        id: 3,
        ten_to_chuc: 'Cộng đồng Blockchain Việt Nam',
        loai: 'cong_dong',
        ma_ngoai: 'BDVN',
        created_at: '2024-02-01T08:00:00Z',
        updated_at: '2024-02-01T08:00:00Z',
    },
    {
        id: 4,
        ten_to_chuc: 'Khoa Kinh tế',
        loai: 'khoa',
        ma_ngoai: 'KTE',
        created_at: '2024-01-10T08:00:00Z',
        updated_at: '2024-01-10T08:00:00Z',
    },
];

// Hợp đồng blockchain mock data
export const mockHopDongs: HopDong[] = [
    {
        id: 1,
        dia_chi_hop_dong: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        mang: 'Ethereum Sepolia',
        phien_ban: '1.0.0',
        trang_thai: 'hoat_dong',
        created_at: '2024-01-15T08:00:00Z',
        updated_at: '2024-01-15T08:00:00Z',
    },
    {
        id: 2,
        dia_chi_hop_dong: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        mang: 'Polygon Mumbai',
        phien_ban: '1.0.0',
        trang_thai: 'hoat_dong',
        created_at: '2024-02-01T08:00:00Z',
        updated_at: '2024-02-01T08:00:00Z',
    },
];

// Xác thực định danh mock data
export const mockXacThucDinhDanhs: XacThucDinhDanh[] = [
    {
        id: 1,
        ho_ten: 'Nguyễn Văn An',
        ngay_sinh: '2002-05-15',
        cccd: '001202001234',
        email: 'nguyenvanan@example.com',
        so_dien_thoai: '0912345678',
        loai_dinh_danh: 'cccd',
        trang_thai: 'da_xac_thuc',
        created_at: '2024-03-01T08:00:00Z',
        updated_at: '2024-03-01T08:00:00Z',
    },
    {
        id: 2,
        ho_ten: 'Trần Thị Bình',
        ngay_sinh: '2002-08-20',
        cccd: '001202005678',
        email: 'tranthibinh@example.com',
        so_dien_thoai: '0923456789',
        loai_dinh_danh: 'sinh_vien',
        trang_thai: 'da_xac_thuc',
        created_at: '2024-03-02T08:00:00Z',
        updated_at: '2024-03-02T08:00:00Z',
    },
];

// Lựa chọn mock data
export const mockLuaChons: LuaChon[] = [
    // Cuộc bỏ phiếu 1
    {
        id: 1,
        cuoc_bo_phieu_id: 1,
        ten_lua_chon: 'Nguyễn Văn A',
        mo_ta: 'Ứng viên có kinh nghiệm 3 năm làm lớp trưởng',
        thu_tu: 1,
        created_at: '2024-11-01T08:00:00Z',
        updated_at: '2024-11-01T08:00:00Z',
    },
    {
        id: 2,
        cuoc_bo_phieu_id: 1,
        ten_lua_chon: 'Trần Thị B',
        mo_ta: 'Học sinh giỏi, nhiệt tình hoạt động tập thể',
        thu_tu: 2,
        created_at: '2024-11-01T08:00:00Z',
        updated_at: '2024-11-01T08:00:00Z',
    },
    {
        id: 3,
        cuoc_bo_phieu_id: 1,
        ten_lua_chon: 'Lê Văn C',
        mo_ta: 'Có khả năng tổ chức sự kiện tốt',
        thu_tu: 3,
        created_at: '2024-11-01T08:00:00Z',
        updated_at: '2024-11-01T08:00:00Z',
    },
    // Cuộc bỏ phiếu 2
    {
        id: 4,
        cuoc_bo_phieu_id: 2,
        ten_lua_chon: 'ReactJS',
        mo_ta: 'Framework phổ biến nhất hiện nay',
        thu_tu: 1,
        created_at: '2024-11-10T08:00:00Z',
        updated_at: '2024-11-10T08:00:00Z',
    },
    {
        id: 5,
        cuoc_bo_phieu_id: 2,
        ten_lua_chon: 'VueJS',
        mo_ta: 'Framework dễ học, linh hoạt',
        thu_tu: 2,
        created_at: '2024-11-10T08:00:00Z',
        updated_at: '2024-11-10T08:00:00Z',
    },
    {
        id: 6,
        cuoc_bo_phieu_id: 2,
        ten_lua_chon: 'Angular',
        mo_ta: 'Framework mạnh mẽ từ Google',
        thu_tu: 3,
        created_at: '2024-11-10T08:00:00Z',
        updated_at: '2024-11-10T08:00:00Z',
    },
    {
        id: 7,
        cuoc_bo_phieu_id: 2,
        ten_lua_chon: 'Svelte',
        mo_ta: 'Framework mới, hiệu suất cao',
        thu_tu: 4,
        created_at: '2024-11-10T08:00:00Z',
        updated_at: '2024-11-10T08:00:00Z',
    },
    // Cuộc bỏ phiếu 3
    {
        id: 8,
        cuoc_bo_phieu_id: 3,
        ten_lua_chon: 'Đồng ý',
        thu_tu: 1,
        created_at: '2024-11-15T08:00:00Z',
        updated_at: '2024-11-15T08:00:00Z',
    },
    {
        id: 9,
        cuoc_bo_phieu_id: 3,
        ten_lua_chon: 'Không đồng ý',
        thu_tu: 2,
        created_at: '2024-11-15T08:00:00Z',
        updated_at: '2024-11-15T08:00:00Z',
    },
    {
        id: 10,
        cuoc_bo_phieu_id: 3,
        ten_lua_chon: 'Trung lập',
        thu_tu: 3,
        created_at: '2024-11-15T08:00:00Z',
        updated_at: '2024-11-15T08:00:00Z',
    },
    // Cuộc bỏ phiếu 4
    {
        id: 11,
        cuoc_bo_phieu_id: 4,
        ten_lua_chon: 'Tiến sĩ Nguyễn Văn D',
        mo_ta: '15 năm kinh nghiệm giảng dạy',
        thu_tu: 1,
        created_at: '2024-10-01T08:00:00Z',
        updated_at: '2024-10-01T08:00:00Z',
    },
    {
        id: 12,
        cuoc_bo_phieu_id: 4,
        ten_lua_chon: 'Phó giáo sư Trần Thị E',
        mo_ta: 'Chuyên gia blockchain quốc tế',
        thu_tu: 2,
        created_at: '2024-10-01T08:00:00Z',
        updated_at: '2024-10-01T08:00:00Z',
    },
    {
        id: 13,
        cuoc_bo_phieu_id: 4,
        ten_lua_chon: 'Tiến sĩ Lê Văn F',
        mo_ta: 'Chuyên gia AI và Machine Learning',
        thu_tu: 3,
        created_at: '2024-10-01T08:00:00Z',
        updated_at: '2024-10-01T08:00:00Z',
    },
    // Cuộc bỏ phiếu 5
    {
        id: 14,
        cuoc_bo_phieu_id: 5,
        ten_lua_chon: 'Thứ 2, 8:00-10:00',
        thu_tu: 1,
        created_at: '2024-12-01T08:00:00Z',
        updated_at: '2024-12-01T08:00:00Z',
    },
    {
        id: 15,
        cuoc_bo_phieu_id: 5,
        ten_lua_chon: 'Thứ 3, 13:00-15:00',
        thu_tu: 2,
        created_at: '2024-12-01T08:00:00Z',
        updated_at: '2024-12-01T08:00:00Z',
    },
    {
        id: 16,
        cuoc_bo_phieu_id: 5,
        ten_lua_chon: 'Thứ 4, 15:00-17:00',
        thu_tu: 3,
        created_at: '2024-12-01T08:00:00Z',
        updated_at: '2024-12-01T08:00:00Z',
    },
    {
        id: 17,
        cuoc_bo_phieu_id: 5,
        ten_lua_chon: 'Thứ 5, 8:00-10:00',
        thu_tu: 4,
        created_at: '2024-12-01T08:00:00Z',
        updated_at: '2024-12-01T08:00:00Z',
    },
];

// Cuộc bỏ phiếu mock data
export const mockCuocBoPhieus: CuocBoPhieu[] = [
    {
        id: 1,
        to_chuc_id: 2,
        hop_dong_id: 1,
        tieu_de: 'Bầu Ban cán sự lớp K66-CNTT1',
        mo_ta: 'Bầu chọn Ban cán sự lớp nhiệm kỳ 2024-2025. Mỗi sinh viên chọn 1 ứng viên yêu thích nhất.',
        che_do: 'mot_lua_chon',
        thoi_gian_bat_dau: '2024-11-20T08:00:00Z',
        thoi_gian_ket_thuc: '2024-11-27T23:59:59Z',
        trang_thai: 'dang_dien_ra',
        merkle_root_hien_tai: '0x8f4a2b3c9d1e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1',
        created_at: '2024-11-01T08:00:00Z',
        updated_at: '2024-11-22T10:30:00Z',
        to_chuc: mockToChucDonVis[1],
        hop_dong: mockHopDongs[0],
        lua_chons: mockLuaChons.filter((l) => l.cuoc_bo_phieu_id === 1),
    },
    {
        id: 2,
        to_chuc_id: 1,
        hop_dong_id: 1,
        tieu_de: 'Khảo sát Framework phát triển Web ưa thích',
        mo_ta: 'Khảo sát ý kiến sinh viên về các framework JavaScript để điều chỉnh chương trình đào tạo. Có thể chọn nhiều lựa chọn.',
        che_do: 'nhieu_lua_chon',
        thoi_gian_bat_dau: '2024-11-25T00:00:00Z',
        thoi_gian_ket_thuc: '2024-12-05T23:59:59Z',
        trang_thai: 'dang_dien_ra',
        merkle_root_hien_tai: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
        created_at: '2024-11-10T08:00:00Z',
        updated_at: '2024-11-25T08:00:00Z',
        to_chuc: mockToChucDonVis[0],
        hop_dong: mockHopDongs[0],
        lua_chons: mockLuaChons.filter((l) => l.cuoc_bo_phieu_id === 2),
    },
    {
        id: 3,
        to_chuc_id: 3,
        hop_dong_id: 2,
        tieu_de: 'Đề xuất tăng học phí năm 2025',
        mo_ta: 'Biểu quyết về đề xuất tăng học phí 10% cho năm học 2025-2026 để nâng cấp cơ sở vật chất.',
        che_do: 'mot_lua_chon',
        thoi_gian_bat_dau: '2024-11-26T08:00:00Z',
        thoi_gian_ket_thuc: '2024-12-10T23:59:59Z',
        trang_thai: 'len_ke_hoach',
        created_at: '2024-11-15T08:00:00Z',
        updated_at: '2024-11-15T08:00:00Z',
        to_chuc: mockToChucDonVis[2],
        hop_dong: mockHopDongs[1],
        lua_chons: mockLuaChons.filter((l) => l.cuoc_bo_phieu_id === 3),
    },
    {
        id: 4,
        to_chuc_id: 1,
        hop_dong_id: 1,
        tieu_de: 'Bầu Trưởng khoa Công nghệ Thông tin',
        mo_ta: 'Bầu chọn Trưởng khoa CNTT nhiệm kỳ 2024-2029. Cuộc bỏ phiếu đã kết thúc.',
        che_do: 'mot_lua_chon',
        thoi_gian_bat_dau: '2024-10-01T08:00:00Z',
        thoi_gian_ket_thuc: '2024-10-15T23:59:59Z',
        trang_thai: 'hoan_thanh',
        merkle_root_hien_tai: '0x9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c',
        created_at: '2024-09-15T08:00:00Z',
        updated_at: '2024-10-16T08:00:00Z',
        to_chuc: mockToChucDonVis[0],
        hop_dong: mockHopDongs[0],
        lua_chons: mockLuaChons.filter((l) => l.cuoc_bo_phieu_id === 4),
    },
    {
        id: 5,
        to_chuc_id: 2,
        tieu_de: 'Chọn lịch học bổ sung cuối kỳ',
        mo_ta: 'Xếp hạng các khung giờ học bổ sung theo mức độ ưu tiên của bạn (1 = ưu tiên nhất).',
        che_do: 'xep_hang',
        thoi_gian_bat_dau: '2024-12-01T00:00:00Z',
        thoi_gian_ket_thuc: '2024-12-07T23:59:59Z',
        trang_thai: 'len_ke_hoach',
        created_at: '2024-11-25T08:00:00Z',
        updated_at: '2024-11-25T08:00:00Z',
        to_chuc: mockToChucDonVis[1],
        lua_chons: mockLuaChons.filter((l) => l.cuoc_bo_phieu_id === 5),
    },
    {
        id: 6,
        to_chuc_id: 4,
        hop_dong_id: 1,
        tieu_de: 'Bầu chọn đề tài nghiên cứu khoa học',
        mo_ta: 'Cuộc bỏ phiếu đã bị hủy do thay đổi kế hoạch.',
        che_do: 'mot_lua_chon',
        trang_thai: 'huy',
        created_at: '2024-09-01T08:00:00Z',
        updated_at: '2024-09-10T08:00:00Z',
        to_chuc: mockToChucDonVis[3],
        hop_dong: mockHopDongs[0],
    },
];

// Kết quả tổng hợp mock data
export const mockKetQuaTongHops: KetQuaTongHop[] = [
    // Kết quả cuộc bỏ phiếu 1 (đang diễn ra, có kết quả tạm thời)
    {
        id: 1,
        cuoc_bo_phieu_id: 1,
        lua_chon_id: 1,
        tong_phieu: 45,
        cap_nhat_cuoi: '2024-11-25T14:30:00Z',
        created_at: '2024-11-20T08:00:00Z',
        updated_at: '2024-11-25T14:30:00Z',
        lua_chon: mockLuaChons[0],
    },
    {
        id: 2,
        cuoc_bo_phieu_id: 1,
        lua_chon_id: 2,
        tong_phieu: 67,
        cap_nhat_cuoi: '2024-11-25T14:30:00Z',
        created_at: '2024-11-20T08:00:00Z',
        updated_at: '2024-11-25T14:30:00Z',
        lua_chon: mockLuaChons[1],
    },
    {
        id: 3,
        cuoc_bo_phieu_id: 1,
        lua_chon_id: 3,
        tong_phieu: 28,
        cap_nhat_cuoi: '2024-11-25T14:30:00Z',
        created_at: '2024-11-20T08:00:00Z',
        updated_at: '2024-11-25T14:30:00Z',
        lua_chon: mockLuaChons[2],
    },
    // Kết quả cuộc bỏ phiếu 2 (đang diễn ra)
    {
        id: 4,
        cuoc_bo_phieu_id: 2,
        lua_chon_id: 4,
        tong_phieu: 89,
        cap_nhat_cuoi: '2024-11-25T18:00:00Z',
        created_at: '2024-11-25T00:00:00Z',
        updated_at: '2024-11-25T18:00:00Z',
        lua_chon: mockLuaChons[3],
    },
    {
        id: 5,
        cuoc_bo_phieu_id: 2,
        lua_chon_id: 5,
        tong_phieu: 56,
        cap_nhat_cuoi: '2024-11-25T18:00:00Z',
        created_at: '2024-11-25T00:00:00Z',
        updated_at: '2024-11-25T18:00:00Z',
        lua_chon: mockLuaChons[4],
    },
    {
        id: 6,
        cuoc_bo_phieu_id: 2,
        lua_chon_id: 6,
        tong_phieu: 34,
        cap_nhat_cuoi: '2024-11-25T18:00:00Z',
        created_at: '2024-11-25T00:00:00Z',
        updated_at: '2024-11-25T18:00:00Z',
        lua_chon: mockLuaChons[5],
    },
    {
        id: 7,
        cuoc_bo_phieu_id: 2,
        lua_chon_id: 7,
        tong_phieu: 23,
        cap_nhat_cuoi: '2024-11-25T18:00:00Z',
        created_at: '2024-11-25T00:00:00Z',
        updated_at: '2024-11-25T18:00:00Z',
        lua_chon: mockLuaChons[6],
    },
    // Kết quả cuộc bỏ phiếu 4 (hoàn thành)
    {
        id: 8,
        cuoc_bo_phieu_id: 4,
        lua_chon_id: 11,
        tong_phieu: 42,
        cap_nhat_cuoi: '2024-10-16T00:00:00Z',
        created_at: '2024-10-01T08:00:00Z',
        updated_at: '2024-10-16T00:00:00Z',
        lua_chon: mockLuaChons[10],
    },
    {
        id: 9,
        cuoc_bo_phieu_id: 4,
        lua_chon_id: 12,
        tong_phieu: 78,
        cap_nhat_cuoi: '2024-10-16T00:00:00Z',
        created_at: '2024-10-01T08:00:00Z',
        updated_at: '2024-10-16T00:00:00Z',
        lua_chon: mockLuaChons[11],
    },
    {
        id: 10,
        cuoc_bo_phieu_id: 4,
        lua_chon_id: 13,
        tong_phieu: 35,
        cap_nhat_cuoi: '2024-10-16T00:00:00Z',
        created_at: '2024-10-01T08:00:00Z',
        updated_at: '2024-10-16T00:00:00Z',
        lua_chon: mockLuaChons[12],
    },
];

// Cử tri đăng ký mock data
export const mockCuTriDangKys: CuTriDangKy[] = [
    {
        id: 1,
        cuoc_bo_phieu_id: 1,
        dinh_danh_id: 1,
        trang_thai: 'duyet',
        commitment_cm: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f',
        nullifier_pub: '0x9f8e7d6c5b4a3928170605d4c3b2a19f8e7d6c5b4a39281706',
        khoa_cong_nguoi_dung: '0xabc123def456',
        vi_tri_la: 15,
        created_at: '2024-11-05T08:00:00Z',
        updated_at: '2024-11-05T09:00:00Z',
        dinh_danh: mockXacThucDinhDanhs[0],
    },
    {
        id: 2,
        cuoc_bo_phieu_id: 1,
        dinh_danh_id: 2,
        trang_thai: 'duyet',
        commitment_cm: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a',
        nullifier_pub: '0x8e7d6c5b4a392817060594c3b2a19f8e7d6c5b4a39281706',
        khoa_cong_nguoi_dung: '0xdef456abc789',
        vi_tri_la: 27,
        created_at: '2024-11-06T08:00:00Z',
        updated_at: '2024-11-06T09:00:00Z',
        dinh_danh: mockXacThucDinhDanhs[1],
    },
];

// Dashboard stats
export const mockDashboardStats: DashboardStats = {
    total_cuoc_bo_phieu: 6,
    cuoc_dang_dien_ra: 2,
    cuoc_hoan_thanh: 1,
    total_phieu_bau: 543,
    total_cu_tri: 856,
    ty_le_tham_gia: 63.4,
};

// Helper function để lấy cuộc bỏ phiếu theo ID
export const getCuocBoPhieuById = (id: number): CuocBoPhieu | undefined => {
    const cuocBoPhieu = mockCuocBoPhieus.find((c) => c.id === id);
    if (!cuocBoPhieu) return undefined;

    // Thêm kết quả tổng hợp
    cuocBoPhieu.ket_qua_tong_hops = mockKetQuaTongHops.filter(
        (k) => k.cuoc_bo_phieu_id === id
    );

    // Thêm cử tri đăng ký
    cuocBoPhieu.cu_tri_dang_kys = mockCuTriDangKys.filter(
        (c) => c.cuoc_bo_phieu_id === id
    );

    return cuocBoPhieu;
};

// Helper function để lấy kết quả theo cuộc bỏ phiếu
export const getKetQuaByCuocBoPhieuId = (
    cuocBoPhieuId: number
): KetQuaTongHop[] => {
    return mockKetQuaTongHops.filter((k) => k.cuoc_bo_phieu_id === cuocBoPhieuId);
};
