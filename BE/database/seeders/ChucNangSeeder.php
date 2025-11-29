<?php

namespace Database\Seeders;

use App\Models\ChucNang;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Route;

class ChucNangSeeder extends Seeder
{
    public function run(): void
    {
        $routes = Route::getRoutes();
        $permissions = [];

        foreach ($routes as $route) {
            $name = $route->getName();

            // Only seed admin routes (exclude ignition, sanctum, etc.)
            if ($name && !str_starts_with($name, 'ignition.') && !str_starts_with($name, 'sanctum.')) {

                // Grouping logic based on prefix
                $group = explode('.', $name)[0];

                $permissions[] = [
                    'ten_chuc_nang' => $name,
                    'route_name' => $name,
                    'ten_group' => ucfirst($group),
                    'trang_thai' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        // Insert or ignore to avoid duplicates
        foreach ($permissions as $perm) {
            ChucNang::firstOrCreate(
                ['route_name' => $perm['route_name']],
                $perm
            );
        }
    }
}
