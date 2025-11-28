// Types cho hệ thống bầu cử điện tử

export interface ToChucDonVi {
  id: number;
  ten_to_chuc: string;
  loai: 'lop' | 'khoa' | 'cong_dong' | 'khac';
  ma_ngoai?: string;
  created_at: string;
  updated_at: string;
}

export interface NguoiDung {
  id: number;
  ho_ten: string;
  email: string;
  vai_tro: 'quan_tri' | 'to_chuc_quan_ly' | 'quan_sat';
  to_chuc_id?: number;
  trang_thai: number;
  created_at: string;
  updated_at: string;
  to_chuc?: ToChucDonVi;
}

export interface HopDong {
  id: number;
  dia_chi_hop_dong: string;
  mang: string;
  phien_ban: string;
  trang_thai: 'hoat_dong' | 'tam_dung' | 'ngung';
  created_at: string;
  updated_at: string;
}

export interface XacThucDinhDanh {
  id: number;
  ho_ten: string;
  ngay_sinh?: string;
  cccd?: string;
  email: string;
  so_dien_thoai?: string;
  loai_dinh_danh: 'cccd' | 'cmnd' | 'passport' | 'sinh_vien' | 'khac';
  trang_thai: 'cho_xac_thuc' | 'da_xac_thuc' | 'tu_choi';
  created_at: string;
  updated_at: string;
}

export interface CuocBoPhieu {
  id: number;
  to_chuc_id: number;
  hop_dong_id?: number;
  tieu_de: string;
  mo_ta?: string;
  che_do: 'mot_lua_chon' | 'nhieu_lua_chon' | 'xep_hang';
  thoi_gian_bat_dau?: string;
  thoi_gian_ket_thuc?: string;
  trang_thai: 'len_ke_hoach' | 'dang_dien_ra' | 'dong' | 'hoan_thanh' | 'huy';
  merkle_root_hien_tai?: string;
  created_at: string;
  updated_at: string;
  to_chuc?: ToChucDonVi;
  hop_dong?: HopDong;
  lua_chons?: LuaChon[];
  ket_qua_tong_hops?: KetQuaTongHop[];
  cu_tri_dang_kys?: CuTriDangKy[];
}

export interface LuaChon {
  id: number;
  cuoc_bo_phieu_id: number;
  ten_lua_chon: string;
  mo_ta?: string;
  thu_tu: number;
  created_at: string;
  updated_at: string;
}

export interface CuTriDangKy {
  id: number;
  cuoc_bo_phieu_id: number;
  dinh_danh_id: number;
  trang_thai: 'cho_duyet' | 'duyet' | 'huy';
  commitment_cm: string;
  nullifier_pub: string;
  khoa_cong_nguoi_dung?: string;
  vi_tri_la?: number;
  ghi_chu?: string;
  created_at: string;
  updated_at: string;
  dinh_danh?: XacThucDinhDanh;
}

export interface PhieuBau {
  id: number;
  cuoc_bo_phieu_id: number;
  nullifier: string;
  proof_cid: string;
  public_inputs_json?: Record<string, unknown>;
  tx_hash?: string;
  trang_thai: 'hop_le' | 'khong_hop_le' | 'bi_tu_choi';
  ly_do_tu_choi?: string;
  thoi_diem: string;
  created_at: string;
  updated_at: string;
  chi_tiets?: PhieuBauChiTiet[];
}

export interface PhieuBauChiTiet {
  id: number;
  phieu_bau_id: number;
  lua_chon_id: number;
  gia_tri: number;
  lua_chon?: LuaChon;
}

export interface KetQuaTongHop {
  id: number;
  cuoc_bo_phieu_id: number;
  lua_chon_id: number;
  tong_phieu: number;
  cap_nhat_cuoi: string;
  created_at: string;
  updated_at: string;
  lua_chon?: LuaChon;
}

export interface MerkleRoot {
  id: number;
  cuoc_bo_phieu_id: number;
  root_hash: string;
  so_la: number;
  chieu_cao_cay: number;
  thoi_diem_tao: string;
  created_at: string;
  updated_at: string;
}

export interface SuKienChain {
  id: number;
  loai_su_kien: string;
  block_number?: number;
  tx_hash?: string;
  du_lieu_json?: Record<string, unknown>;
  thoi_diem: string;
  created_at: string;
  updated_at: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

// Stats types for dashboard
export interface DashboardStats {
  total_cuoc_bo_phieu: number;
  cuoc_dang_dien_ra: number;
  cuoc_hoan_thanh: number;
  total_phieu_bau: number;
  total_cu_tri: number;
  ty_le_tham_gia: number;
}
