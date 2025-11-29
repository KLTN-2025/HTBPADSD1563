<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('chuc_nangs', function (Blueprint $table) {
            $table->id();
            $table->string('ten_chuc_nang');
            $table->string('route_name')->unique(); // Key for permission check
            $table->integer('id_group')->nullable(); // Grouping ID
            $table->string('ten_group')->nullable(); // Grouping Name
            $table->boolean('trang_thai')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chuc_nangs');
    }
};
