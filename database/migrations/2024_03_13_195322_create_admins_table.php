<?php

use App\Models\Admin;
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
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('username')->unique();
            $table->string('password');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->unsignedBigInteger('super_admin_id')->nullable();
            $table->foreign('super_admin_id')->references('id')->on('admins')->onDelete('cascade');

        });

        Admin::query()->create([
            'username' => 'Admin',
            'password' => bcrypt('password'),
            'email' => 'admin@admin.com',
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
