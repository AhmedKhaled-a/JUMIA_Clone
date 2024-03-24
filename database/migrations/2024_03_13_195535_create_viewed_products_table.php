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
        Schema::create('viewed_products', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->dateTimeTz('viewed_at',$precision = 0);
            $table->unsignedBigInteger('user_id')->nullable()->references('id')->on('users')->cascadeOnDelete();
            $table->unsignedBigInteger('product_id')->nullable()->references('id')->on('products')->cascadeOnDelete();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('viewed_products');
    }
};
