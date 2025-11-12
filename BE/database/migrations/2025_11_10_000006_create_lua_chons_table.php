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
        Schema::create('lua_chons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cuoc_bo_phieu_id')->constrained('cuoc_bo_phieus')->onDelete('cascade');
            $table->string('ten_lua_chon', 200);
            $table->text('mo_ta')->nullable();
            $table->integer('thu_tu')->default(1);
            $table->timestamps();

            $table->index('cuoc_bo_phieu_id');
            $table->index('thu_tu');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lua_chons');
    }
};
