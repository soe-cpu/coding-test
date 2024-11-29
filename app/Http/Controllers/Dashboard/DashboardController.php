<?php

namespace App\Http\Controllers\Dashboard;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Employee;

class DashboardController extends Controller
{
    public function index()  {
        $companies = Company::orderBy('created_at', 'desc')->paginate(10);
        $employees = Employee::orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Dashboard', ["companies" => $companies, "employees" => $employees]);
    }
}



