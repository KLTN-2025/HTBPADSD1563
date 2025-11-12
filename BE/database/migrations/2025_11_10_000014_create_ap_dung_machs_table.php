<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ap_dung_machs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cuoc_bo_phieu_id')->constrained('cuoc_bo_phieus')->onDelete('cascade');
            $table->foreignId('mach_chung_minh_id')->constrained('mach_chung_minhs')->onDelete('cascade');
            $table->timestamps();

            $table->index('cuoc_bo_phieu_id');
            $table->index('mach_chung_minh_id');
            $table->unique(['cuoc_bo_phieu_id', 'mach_chung_minh_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ap_dung_machs');
    }
};
