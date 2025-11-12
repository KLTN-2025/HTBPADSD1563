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
        Schema::create('xac_thuc_dinh_danhs', function (Blueprint $table) {
            $table->id();
            $table->enum('loai', ['cccd', 'the_sinh_vien', 'the_giang_vien', 'the_nhan_vien']);
            $table->string('so_dinh_danh_hash', 128);
            $table->enum('kenh', ['vn_eid', 'edu_id', 'company_id', 'khac'])->default('vn_eid');
            $table->string('co_quan_xac_thuc', 150)->nullable();
            $table->enum('trang_thai', ['cho_duyet', 'da_duyet', 'tu_choi'])->default('da_duyet');
            $table->dateTime('ngay_xac_thuc')->nullable();
            $table->text('thong_tin_bo_sung')->nullable();
            $table->timestamps();

            $table->index('loai');
            $table->unique('so_dinh_danh_hash');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('xac_thuc_dinh_danhs');
    }
};
