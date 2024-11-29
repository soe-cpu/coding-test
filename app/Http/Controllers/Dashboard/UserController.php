<?php

namespace App\Http\Controllers\Dashboard;


use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{

    function __construct()
    {
         $this->middleware('permission:list|create|edit|delete', ['only' => ['index']]);
         $this->middleware('permission:create', ['only' => ['create','store']]);
         $this->middleware('permission:edit', ['only' => ['edit','update']]);
         $this->middleware('permission:delete', ['only' => ['delete']]);
    }

    public function index(Request $request)  {

        $users = User::query();
        if (!is_null($request->search)) {
            $users = $users->where(function ($query) use ($request) {
                $query->orWhere('name', 'LIKE', "%$request->search%");
                $query->orWhere('email', 'LIKE', "%$request->search%");
            });
        }

        $users = $users->orderBy('created_at', 'desc')->paginate($request->limit ? $request->limit : 15);
        return Inertia::render('Users/UserList', ["users" => $users]);
    }
    public function create(Request $request)  {

        $roles = Role::all();

        return Inertia::render('Users/UserCreate', ["roles" => $roles]);
    }

    public function save(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Password::defaults()],
            'roles' => 'required'
        ]);

        $input = $request->all();

        $input['password'] = Hash::make($input['password']);

        $user = User::create($input);

        $rs = [];
        foreach ($request->roles as $roleId) {
            $role = Role::where('id', $roleId)->first();
            if ($role) {
                $rs[] = $role;
            }
        }
        $user->assignRole($rs);

        return Redirect::to('/users');
    }

    public function edit($id)  {

        $user = User::find($id);
        $userRole = $user->roles->pluck('id');
        $userRole = json_decode(json_encode($userRole));
        $roles = Role::all();
        return Inertia::render('Users/UserEdit', ["user" => $user, 'userRole' => $userRole, 'roles' => $roles]);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,'.$id,
            'password' => 'same:confirm-password',
            'roles' => 'required'
        ]);

        $input = $request->all();
        if(!empty($input['password'])){
            $input['password'] = Hash::make($input['password']);
        }else{
            $input = Arr::except($input,array('password'));
        }

        $user = User::find($id);

        $user->update($input);

        DB::table('model_has_roles')->where('model_id',$id)->delete();

        $rs = [];
        foreach ($request->roles as $roleId) {
            $role = Role::where('id', $roleId)->first();
            if ($role) {
                $rs[] = $role;
            }
        }
        $user->assignRole($rs);

        return Redirect::to('/users');
    }

    public function delete($id): RedirectResponse
    {

        $user = User::find($id)->delete();

        return Redirect::to('/users');
    }
}
