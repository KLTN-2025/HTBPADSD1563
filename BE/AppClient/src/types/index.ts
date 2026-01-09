export interface User {
  id: number;
  ho_ten: string;
  email: string;
  vai_tro: 'quan_tri' | 'to_chuc_quan_ly' | 'quan_sat';
  to_chuc_id?: number;
  created_at: string;
  updated_at: string;
}

export interface ToChucDonVi {
  id: number;
  ten_to_chuc: string;
  loai: 'lop' | 'khoa' | 'cong_dong' | 'khac';
  ma_ngoai?: string;
  created_at: string;
  updated_at: string;
}

export interface CuocBoPhieu {
  id: number;
  tieu_de: string;
  mo_ta?: string;
  thoi_gian_bat_dau: string;
  thoi_gian_ket_thuc: string;
  trang_thai: 'len_ke_hoach' | 'dang_dien_ra' | 'dong' | 'hoan_thanh' | 'huy';
  to_chuc_id?: number;
  hop_dong_id?: number;
  che_do: 'mot_lua_chon' | 'nhieu_lua_chon' | 'xep_hang';
  created_at: string;
  updated_at: string;
  lua_chons?: LuaChon[];
}

export interface LuaChon {
  id: number;
  cuoc_bo_phieu_id: number;
  ten_lua_chon: string;
  mo_ta?: string;
  hinh_anh?: string;
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
}

export interface KetQuaTongHop {
  id: number;
  cuoc_bo_phieu_id: number;
  lua_chon_id: number;
  so_phieu: number;
  created_at: string;
  updated_at: string;
  lua_chon?: LuaChon;
}

export interface HopDong {
  id: number;
  ten_hop_dong: string;
  dia_chi_hop_dong: string;
  mang: 'ethereum' | 'polygon' | 'bsc' | 'arbitrum' | 'optimism' | 'local' | 'khac';
  chain_id?: number;
  tx_deploy?: string;
  trang_thai: 'dang_ky' | 'da_trien_khai' | 'huy';
  created_at: string;
  updated_at: string;
}
