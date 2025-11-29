<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CuocBoPhieuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $polls = [
            [
                'to_chuc_id' => 1,
                'hop_dong_id' => null,
                'tieu_de' => 'Bầu chọn Ban Cán sự Khoa CNTT',
                'mo_ta' => 'Cuộc bầu cử để lựa chọn Ban Cán sự Khoa Công nghệ Thông tin nhiệm kỳ 2024-2025',
                'che_do' => 'mot_lua_chon',
                'thoi_gian_bat_dau' => Carbon::now()->subDays(2),
                'thoi_gian_ket_thuc' => Carbon::now()->addDays(5),
                'trang_thai' => 'dang_dien_ra',
                'merkle_root_hien_tai' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'to_chuc_id' => 2,
                'hop_dong_id' => null,
                'tieu_de' => 'Bình chọn hoạt động ngoại khóa',
                'mo_ta' => 'Lựa chọn các hoạt động ngoại khóa cho lớp SE501 trong học kỳ tới',
                'che_do' => 'nhieu_lua_chon',
                'thoi_gian_bat_dau' => Carbon::now()->addDays(3),
                'thoi_gian_ket_thuc' => Carbon::now()->addDays(10),
                'trang_thai' => 'len_ke_hoach',
                'merkle_root_hien_tai' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'to_chuc_id' => 3,
                'hop_dong_id' => null,
                'tieu_de' => 'Đánh giá hệ thống E-Voting',
                'mo_ta' => 'Khảo sát mức độ hài lòng về hệ thống bỏ phiếu điện tử',
                'che_do' => 'xep_hang',
                'thoi_gian_bat_dau' => Carbon::now()->subDays(10),
                'thoi_gian_ket_thuc' => Carbon::now()->subDays(3),
                'trang_thai' => 'hoan_thanh',
                'merkle_root_hien_tai' => 'abc123def456',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('cuoc_bo_phieus')->insert($polls);
    }
}
