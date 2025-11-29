<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ToChucSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $organizations = [
            [
                'ten_to_chuc' => 'Khoa Công nghệ Thông tin',
                'loai' => 'khoa',
                'ma_ngoai' => 'CNTT',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ten_to_chuc' => 'Lớp SE501',
                'loai' => 'lop',
                'ma_ngoai' => 'SE501',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ten_to_chuc' => 'Cộng đồng E-Voting',
                'loai' => 'cong_dong',
                'ma_ngoai' => 'EVOTE',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('to_chuc_don_vis')->insert($organizations);
    }
}
