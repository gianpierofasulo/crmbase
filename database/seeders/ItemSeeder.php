<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemSeeder extends Seeder
{
    public function run()
    {
        DB::table('items')->insert([
            [
                'name' => 'Item 1',
                'price' => 10.99,
                'quantity' => 100,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Item 2',
                'price' => 20.99,
                'quantity' => 200,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

