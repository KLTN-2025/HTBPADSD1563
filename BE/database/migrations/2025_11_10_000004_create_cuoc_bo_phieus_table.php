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
        Schema::create('cuoc_bo_phieus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('to_chuc_id')->constrained('to_chuc_don_vis')->onDelete('cascade');
            $table->foreignId('hop_dong_id')->nullable()->constrained('hop_dongs')->onDelete('set null');
            $table->string('tieu_de', 200);
            $table->text('mo_ta')->nullable();
            $table->enum('che_do', ['mot_lua_chon', 'nhieu_lua_chon', 'xep_hang'])->default('mot_lua_chon');
            $table->dateTime('thoi_gian_bat_dau')->nullable();
            $table->dateTime('thoi_gian_ket_thuc')->nullable();
            $table->enum('trang_thai', ['len_ke_hoach', 'dang_dien_ra', 'dong', 'hoan_thanh', 'huy'])->default('len_ke_hoach');
            $table->string('merkle_root_hien_tai', 100)->nullable();
            $table->timestamps();

            $table->index('to_chuc_id');
            $table->index('hop_dong_id');
            $table->index('trang_thai');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cuoc_bo_phieus');
    }
};
