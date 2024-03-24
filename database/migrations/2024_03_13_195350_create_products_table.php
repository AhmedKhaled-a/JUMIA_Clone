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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('title');
            $table->text('desc');
            $table->text('spec');
            $table->integer('price');
            $table->float('discount');
            $table->string('brand');
            $table->integer('stock');
            $table->float('rating');
            $table->string('thumbnail');
            $table->unsignedBigInteger('category_id')->nullable()->references('id')->on('categories')->onDelete();
            $table->unsignedBigInteger('seller_id')->nullable()->references('id')->on('sellers')->onDelete();

            // $table->foreign('category_id')
            // $table->foreign('seller_id')


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
