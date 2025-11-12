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
        Schema::create('mach_chung_minhs', function (Blueprint $table) {
            $table->id();
            $table->string('ten_mach', 150);
            $table->string('phien_ban', 50);
            $table->string('verifying_key_cid', 100);
            $table->string('proving_key_cid', 100)->nullable();
            $table->string('hash_vk', 100)->nullable();
            $table->integer('so_rang_buoc')->nullable();
            $table->text('mo_ta')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mach_chung_minhs');
    }
};
