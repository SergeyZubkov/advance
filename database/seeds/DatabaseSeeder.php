<?php

use App\User;
use App\Quote;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        DB::table('users')->delete();
        $users = array(
                ['name' => 'Сергей Зубков', 'email' => 'sergeyzubkov@gmail.com', 'password' => Hash::make('secret'), 'admin' => 1, 'showed_quotes' => "1 2 3"],
                ['name' => 'Вася Голубков', 'email' => 'chris@scotch.io', 'password' => Hash::make('secret'), 'admin' => 0],
                ['name' => 'Петя Иванов', 'email' => 'holly@scotch.io', 'password' => Hash::make('secret'), 'admin' => 0],
                ['name' => 'Маша Кривозуб', 'email' => 'adnan@scotch.io', 'password' => Hash::make('secret'), 'admin' => 0],
        );
            
        // Loop through each user above and create the record for them in the database
        foreach ($users as $user)
        {
            User::create($user);
        }

        DB::table('quotes')->delete();
        $quote = ['author' => 'Фаина Раневская', 'text' => 'Если женщина идет с опущенной головой — у нее есть любовник! Если женщина идет с гордо поднятой головой — у нее есть любовник! Если женщина держит голову прямо — у нее есть любовник! И вообще — если у женщины есть голова, то у нее есть любовник!
С сайта http://www.inpearls.ru/'];
        $counter = 10000; 
        // Loop through each user above and create the record for them in the database
        while ($counter)
        {
            Quote::create($quote);
            $counter--;
        }

        Model::reguard();
    }
}
