<?php

namespace App\Http\Controllers\Dashboard;

use Inertia\Inertia;
use App\Models\Company;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CompanyController extends Controller
{
    public function index(Request $request)  {

        $companies = Company::query();
        if (!is_null($request->search)) {
            $companies = $companies->where(function ($query) use ($request) {
                $query->orWhere('name', 'LIKE', "%$request->search%");
                $query->orWhere('email', 'LIKE', "%$request->search%");
            });
        }

        $companies = $companies->orderBy('created_at', 'desc')->paginate($request->limit ? $request->limit : 15);
        return Inertia::render('Companies/CompanyList', ["companies" => $companies]);
    }

    public function create() {

        return Inertia::render('Companies/CompanyCreate');

    }
}
