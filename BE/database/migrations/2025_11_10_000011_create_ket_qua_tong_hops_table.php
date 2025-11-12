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
        Schema::create('ket_qua_tong_hops', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cuoc_bo_phieu_id')->constrained('cuoc_bo_phieus')->onDelete('cascade');
            $table->foreignId('lua_chon_id')->constrained('lua_chons')->onDelete('cascade');
            $table->integer('tong_phieu')->default(0);
            $table->dateTime('cap_nhat_cuoi')->nullable();
            $table->timestamps();

            $table->index('cuoc_bo_phieu_id');
            $table->index('lua_chon_id');
            $table->unique(['cuoc_bo_phieu_id', 'lua_chon_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ket_qua_tong_hops');
    }
};
