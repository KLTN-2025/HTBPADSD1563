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
        Schema::create('merkle_roots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cuoc_bo_phieu_id')->constrained('cuoc_bo_phieus')->onDelete('cascade');
            $table->string('root', 100);
            $table->integer('depth')->nullable();
            $table->integer('so_lan_cap_nhat')->default(0);
            $table->integer('block_number')->nullable();
            $table->string('tx_hash', 100)->nullable();
            $table->timestamps();

            $table->index('cuoc_bo_phieu_id');
            $table->index('root');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merkle_roots');
    }
};
