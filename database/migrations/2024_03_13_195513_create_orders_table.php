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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('count');
            $table->integer('price');
            $table->enum('order_status',['processing', 'rejected' ,'shipping', 'delivered']);
            $table->integer('shipping_period');
            $table->integer('shipping_cost');
            $table->unsignedBigInteger('seller_id')->nullable()->references('id')->on('sellers')->onDelete();
            $table->unsignedBigInteger('user_id')->nullable()->references('id')->on('users')->onDelete();
            $table->unsignedBigInteger('product_id')->nullable()->references('id')->on('products')->onDelete();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
