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
        Schema::create('seller_verification', function (Blueprint $table) {
            $table->increments('id');
            $table->string('token');
            $table->unsignedBigInteger('seller_id')->nullable()->references('id')->on('sellers');
        });
       
        Schema::table('sellers', function (Blueprint $table) {
            $table->boolean('is_verified')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seller_verification');
    }
};
