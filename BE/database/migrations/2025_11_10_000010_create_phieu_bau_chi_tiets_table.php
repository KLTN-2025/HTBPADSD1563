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
        Schema::create('phieu_bau_chi_tiets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('phieu_bau_id')->constrained('phieu_baus')->onDelete('cascade');
            $table->foreignId('lua_chon_id')->constrained('lua_chons')->onDelete('cascade');
            $table->integer('gia_tri')->default(1);
            $table->timestamps();

            $table->index('phieu_bau_id');
            $table->index('lua_chon_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phieu_bau_chi_tiets');
    }
};
