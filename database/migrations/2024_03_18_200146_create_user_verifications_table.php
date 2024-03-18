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
        Schema::create('user_verifications', function (Blueprint $table) {
            $table->increments('id');
            $table->string('token');
            $table->unsignedBigInteger('user_id')->nullable()->references('id')->on('users');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_verified')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_verifications');
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('is_verified');
        });
    }
};
