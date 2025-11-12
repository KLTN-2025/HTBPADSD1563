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
        Schema::create('to_chuc_don_vis', function (Blueprint $table) {
            $table->id();
            $table->string('ten_to_chuc', 200);
            $table->enum('loai', ['lop', 'khoa', 'cong_dong', 'khac'])->default('cong_dong');
            $table->string('ma_ngoai', 100)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('to_chuc_don_vis');
    }
};
