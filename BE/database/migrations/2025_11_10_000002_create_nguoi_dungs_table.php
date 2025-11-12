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
        Schema::create('nguoi_dungs', function (Blueprint $table) {
            $table->id();
            $table->string('ho_ten', 150);
            $table->string('email', 190)->unique();
            $table->string('mat_khau', 255);
            $table->enum('vai_tro', ['quan_tri', 'to_chuc_quan_ly', 'quan_sat'])->default('to_chuc_quan_ly');
            $table->foreignId('to_chuc_id')->nullable()->constrained('to_chuc_don_vis')->onDelete('set null');
            $table->tinyInteger('trang_thai')->default(1);
            $table->timestamps();

            $table->index('to_chuc_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nguoi_dungs');
    }
};
