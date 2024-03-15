<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class AddOneUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'db:add-one-user';

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
        User::create([
            'fullname' => "Ahmed",
            'email' => "ahmed2100123@gmail.com",
            'password' => "veryStrong",
            'gender' => 'male',
            'username' => "ahmed22",
            'phone_number' => '012345678910',
            'address_country' => "EG",
            'address_city' => "ALX",
            'address_district' => "CO",
        ]);
    }
}
