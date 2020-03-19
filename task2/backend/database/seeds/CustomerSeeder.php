<?php

use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Customer\Domain\Models\Customer::create([
            'first_name'=>'shenouda',
            'last_name'=>'shehata',
            'email'=>'shenopro@gmail.com',
            'store_credit'=>1000.0,
            'password'=>'123456',
        ]);
    }
}
