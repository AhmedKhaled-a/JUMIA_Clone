<?php

namespace App\Console\Commands;

use App\Models\Seller;
use Illuminate\Console\Command;

class CreateMainSeller extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:create-main-seller';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Seller::create([
            'fullname' => "Jumia",
            'email' => "jumia@clone.com",
            'password' => "jumiaSecret",
            'shop_name' => "Jumia",
            'phone_number' => "000000000003",
            'confirmer_id' => "1",
        ]);
    }
}
