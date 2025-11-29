<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('chi_tiet_phan_quyens', function (Blueprint $table) {
            $table->foreignId('id_chuc_vu')->constrained('chuc_vus')->cascadeOnDelete();
            $table->foreignId('id_chuc_nang')->constrained('chuc_nangs')->cascadeOnDelete();
            $table->primary(['id_chuc_vu', 'id_chuc_nang']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chi_tiet_phan_quyens');
    }
};
