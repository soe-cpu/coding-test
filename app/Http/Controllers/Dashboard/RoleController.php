<?php

namespace App\Http\Controllers\Dashboard;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    function __construct()
    {
         $this->middleware('permission:list|create|edit|delete', ['only' => ['index']]);
         $this->middleware('permission:create', ['only' => ['create','store']]);
         $this->middleware('permission:edit', ['only' => ['edit','update']]);
         $this->middleware('permission:delete', ['only' => ['delete']]);
    }

    public function index(Request $request)  {

        $roles = Role::query();
        if (!is_null($request->search)) {
            $roles = $roles->where(function ($query) use ($request) {
                $query->orWhere('name', 'LIKE', "%$request->search%");
            });
        }

        $roles = $roles->orderBy('created_at', 'desc')->paginate($request->limit ? $request->limit : 15);
        return Inertia::render('Roles/RoleList', ["roles" => $roles]);
    }

    public function create() {

        $permissions = Permission::get();
        return Inertia::render('Roles/RoleCreate', ["permissions" => $permissions]);

    }

    public function save(Request $request) {
        // dd();
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $role = Role::create(['name' => $request->name]);

        $permissions = [];
        foreach ($request->permission as $permissionName) {
            $permission = Permission::where('id', $permissionName)->first();
            if ($permission) {
                $permissions[] = $permission;
            }
        }

        $role->syncPermissions($permissions);

        return Redirect::to('/roles');
    }

    public function edit($id)  {
        $permissions = Permission::get();
        $role = Role::find($id);
        $rolePermissions = DB::table("role_has_permissions")->where("role_has_permissions.role_id",$id)
            ->pluck('permission_id');
            $rolePermissions = json_decode(json_encode($rolePermissions));

        return Inertia::render('Roles/RoleEdit', ["permissions" => $permissions, "role" => $role, "rolePermissions" => $rolePermissions]);


    }

    public function update(Request $request, $id)

    {

        $request->validate([
            'name' => 'required|string|max:255',
        ]);


        $role = Role::find($id);
        $role->name = $request->input('name');
        $role->save();

        $permissions = [];
        foreach ($request->permission as $permissionName) {
            $permission = Permission::where('id', $permissionName)->first();
            if ($permission) {
                $permissions[] = $permission;
            }
        }

        $role->syncPermissions($permissions);

        return Redirect::to('/roles');

    }

    public function delete($id): RedirectResponse
    {


        $role = Role::find($id)->delete();

        return Redirect::to('/roles');
    }
}
