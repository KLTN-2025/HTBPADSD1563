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
        Schema::create('hop_dongs', function (Blueprint $table) {
            $table->id();
            $table->string('ten_hop_dong', 200)->nullable();
            $table->enum('mang', ['ethereum', 'polygon', 'bsc', 'arbitrum', 'optimism', 'local', 'khac'])->default('polygon');
            $table->integer('chain_id')->nullable();
            $table->string('dia_chi_hop_dong', 100);
            $table->string('tx_deploy', 100)->nullable();
            $table->enum('trang_thai', ['dang_ky', 'da_trien_khai', 'huy'])->default('da_trien_khai');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hop_dongs');
    }
};
