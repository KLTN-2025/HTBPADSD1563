<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        Admin::create([
            'ho_ten' => 'Master Admin',
            'email' => 'admin@evote.test',
            'mat_khau' => Hash::make('password'),
            'is_master' => true,
            'trang_thai' => true,
        ]);
    }
}
