<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class NguoiDungSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'ho_ten' => 'Admin User',
                'email' => 'admin@evote.test',
                'mat_khau' => Hash::make('password'),
                'vai_tro' => 'quan_tri',
                'to_chuc_id' => 1, // Khoa CNTT
                'trang_thai' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ho_ten' => 'Test User',
                'email' => 'user@evote.test',
                'mat_khau' => Hash::make('password'),
                'vai_tro' => 'to_chuc_quan_ly',
                'to_chuc_id' => 2, // Lớp SE501
                'trang_thai' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'ho_ten' => 'Observer User',
                'email' => 'observer@evote.test',
                'mat_khau' => Hash::make('password'),
                'vai_tro' => 'quan_sat',
                'to_chuc_id' => 3, // Cộng đồng
                'trang_thai' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('nguoi_dungs')->insert($users);
    }
}
