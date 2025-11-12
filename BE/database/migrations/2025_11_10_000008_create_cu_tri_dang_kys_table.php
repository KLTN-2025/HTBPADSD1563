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
        Schema::create('cu_tri_dang_kys', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cuoc_bo_phieu_id')->constrained('cuoc_bo_phieus')->onDelete('cascade');
            $table->foreignId('dinh_danh_id')->constrained('xac_thuc_dinh_danhs')->onDelete('cascade');
            $table->enum('trang_thai', ['cho_duyet', 'duyet', 'huy'])->default('duyet');
            $table->string('commitment_cm', 130);
            $table->string('nullifier_pub', 130);
            $table->string('khoa_cong_nguoi_dung', 130)->nullable();
            $table->integer('vi_tri_la')->nullable();
            $table->string('ghi_chu', 255)->nullable();
            $table->timestamps();

            $table->index('cuoc_bo_phieu_id');
            $table->index('dinh_danh_id');
            $table->unique(['cuoc_bo_phieu_id', 'dinh_danh_id']);
            $table->unique(['cuoc_bo_phieu_id', 'commitment_cm']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cu_tri_dang_kys');
    }
};
