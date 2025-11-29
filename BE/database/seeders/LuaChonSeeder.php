<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LuaChonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $choices = [
            // Choices for Poll 1 (Ban Cán sự Khoa CNTT)
            [
                'cuoc_bo_phieu_id' => 1,
                'ten_lua_chon' => 'Ứng viên A - Nguyễn Văn An',
                'mo_ta' => 'Kinh nghiệm 5 năm trong quản lý khoa',
                'thu_tu' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cuoc_bo_phieu_id' => 1,
                'ten_lua_chon' => 'Ứng viên B - Trần Thị Bình',
                'mo_ta' => 'Chuyên gia về công nghệ blockchain',
                'thu_tu' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cuoc_bo_phieu_id' => 1,
                'ten_lua_chon' => 'Ứng viên C - Lê Văn Cường',
                'mo_ta' => 'Giảng viên ưu tú nhiều năm',
                'thu_tu' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Choices for Poll 2 (Hoạt động ngoại khóa)
            [
                'cuoc_bo_phieu_id' => 2,
                'ten_lua_chon' => 'Du lịch Đà Lạt',
                'mo_ta' => 'Chuyến du lịch 3 ngày 2 đêm tại Đà Lạt',
                'thu_tu' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cuoc_bo_phieu_id' => 2,
                'ten_lua_chon' => 'Workshop AI/ML',
                'mo_ta' => 'Tham gia workshop về trí tuệ nhân tạo',
                'thu_tu' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cuoc_bo_phieu_id' => 2,
                'ten_lua_chon' => 'Hackathon 48h',
                'mo_ta' => 'Thi đấu lập trình trong 48 giờ',
                'thu_tu' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cuoc_bo_phieu_id' => 2,
                'ten_lua_chon' => 'Teambuilding',
                'mo_ta' => 'Hoạt động gắn kết tập thể',
                'thu_tu' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Choices for Poll 3 (Đánh giá hệ thống)
            [
                'cuoc_bo_phieu_id' => 3,
                'ten_lua_chon' => 'Rất hài lòng',
                'mo_ta' => null,
                'thu_tu' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cuoc_bo_phieu_id' => 3,
                'ten_lua_chon' => 'Hài lòng',
                'mo_ta' => null,
                'thu_tu' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cuoc_bo_phieu_id' => 3,
                'ten_lua_chon' => 'Bình thường',
                'mo_ta' => null,
                'thu_tu' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'cuoc_bo_phieu_id' => 3,
                'ten_lua_chon' => 'Không hài lòng',
                'mo_ta' => null,
                'thu_tu' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('lua_chons')->insert($choices);
    }
}
