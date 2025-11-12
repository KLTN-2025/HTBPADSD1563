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
        Schema::create('phieu_baus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cuoc_bo_phieu_id')->constrained('cuoc_bo_phieus')->onDelete('cascade');
            $table->string('nullifier', 130);
            $table->string('proof_cid', 100);
            $table->text('public_inputs_json')->nullable();
            $table->string('tx_hash', 100)->nullable();
            $table->enum('trang_thai', ['hop_le', 'khong_hop_le', 'bi_tu_choi'])->default('hop_le');
            $table->string('ly_do_tu_choi', 255)->nullable();
            $table->dateTime('thoi_diem');
            $table->timestamps();

            $table->index('cuoc_bo_phieu_id');
            $table->index('tx_hash');
            $table->unique(['cuoc_bo_phieu_id', 'nullifier']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('phieu_baus');
    }
};
