<?php

namespace App\Http\Controllers\Dashboard;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller
{
    public function index(Request $request)  {
        $users = User::orderBy('created_at', 'desc')->paginate($request->limit ? $request->limit : 10);
        return Inertia::render('Users/UserList', ["users" => $users]);
    }
}
