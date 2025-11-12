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
        Schema::create('su_kien_chains', function (Blueprint $table) {
            $table->id();
            $table->foreignId('hop_dong_id')->constrained('hop_dongs')->onDelete('cascade');
            $table->string('ten_su_kien', 120);
            $table->text('du_lieu_json')->nullable();
            $table->integer('block_number')->nullable();
            $table->string('tx_hash', 100)->nullable();
            $table->dateTime('thoi_diem')->nullable();
            $table->timestamps();

            $table->index('hop_dong_id');
            $table->index('block_number');
            $table->index('tx_hash');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('su_kien_chains');
    }
};
