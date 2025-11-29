<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Call seeders in dependency order
        $this->call([
            ToChucSeeder::class,
            NguoiDungSeeder::class,
            CuocBoPhieuSeeder::class,
            LuaChonSeeder::class,
        ]);

        // Keep the default User model seeder for compatibility
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );
    }
}
