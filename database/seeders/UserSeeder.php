<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin seeder start //
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password')
        ]);
        $admin_role = Role::create([
            'name' => 'Admin'
        ]);
        $admin_permissions = Permission::all();
        $admin_role->syncPermissions($admin_permissions);
        $admin->assignRole([$admin_role->id]);
        // Admin Seeder end //

        // Manager seeder start //
        $manager = User::create([
            'name' => 'Manager',
            'email' => 'manager@gmail.com',
            'password' => bcrypt('password')
        ]);
        $manager_role = Role::create([
            'name' => 'Manager'
        ]);

        // User Seeder end //

        // User seeder start //
        $manager = User::create([
            'name' => 'User',
            'email' => 'user@gmail.com',
            'password' => bcrypt('password')
        ]);
        $manager_role = Role::create([
            'name' => 'User'
        ]);

        // for ($i=0; $i < 100; $i++) {
        //     User::create([
        //         'name' => $i,
        //         'email' => 'email@gmail.com' . $i,
        //         'password' => bcrypt('password')
        //     ]);
        // }

        // User Seeder end //

    }
}
