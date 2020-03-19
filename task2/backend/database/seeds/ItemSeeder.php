<?php

use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
        $data=[];
        for($i=0; $i<=20; $i++){
            $data[]=[
              'name'=>$faker->sentence,
              'description'=>$faker->paragraph,
              'price'=>rand(100,1000),
              'created_at'=>\Carbon\Carbon::now(),
              'updated_at'=>\Carbon\Carbon::now(),
            ];
        }
            DB::table('items')->insert($data);
    }
}
