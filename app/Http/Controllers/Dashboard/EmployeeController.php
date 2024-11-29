<?php

namespace App\Http\Controllers\Dashboard;

use Inertia\Inertia;
use App\Models\Employee;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class EmployeeController extends Controller
{
    public function index(Request $request)  {

        $employees = Employee::query();
        if (!is_null($request->search)) {
            $employees = $employees->where(function ($query) use ($request) {
                $query->orWhere('name', 'LIKE', "%$request->search%");
                $query->orWhere('email', 'LIKE', "%$request->search%");
                $query->orWhere('phone', 'LIKE', "%$request->search%");
            });
        }

        $employees = $employees->with('company')->orderBy('created_at', 'desc')->paginate($request->limit ? $request->limit : 15);
        return Inertia::render('Employees/EmployeeList', ["employees" => $employees]);
    }

    public function create() {
        $companies = Company::all();
        return Inertia::render('Employees/EmployeeCreate', ["companies" => $companies]);

    }

    public function save(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'phone' => 'required|string',
            'profile_pic' => 'required|file|max:3000|mimes:jpeg,png',
            'company_id' => 'required',
        ]);

        $path = '';
            if($request->file()){
                $fileName = time() . '_' . $request->profile_pic->getClientOriginalName();
                $filePath = $request->file('profile_pic')->storeAs('Profile', $fileName, 'public');
                $path = '/storage/' . $filePath;
            }


        $employee = Employee::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'profile_pic' => $path,
            'company_id' => $request->company_id,
        ]);


        return Redirect::to('/employees');
    }

    public function edit($id)  {
        $employee = Employee::where('id', $id)->with('company')->first();
        $companies = Company::all();

        return Inertia::render('Employees/EmployeeEdit', ["employee" => $employee, "companies" => $companies]);


    }

    public function update(Request $request, $id)

    {
        // dd($request->all());

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'phone' => 'required|string',
        ]);

        $pathEmp = $request->file('logo');
        $path= Employee::where('id', $id)->value('profile_pic');
        if($pathEmp){
            if ($request->file()) {
                $fileName = time() . '_' . $request->profile_pic->getClientOriginalName();
                $filePath = $request->file('profile_pic')->storeAs('Profile', $fileName, 'public');
                $path = '/storage/' . $filePath;
            }
        }


        $employee = Employee::find($id)->update([
            'name' => $request->name,
            'email' => $request->email,
            'profile_pic' => $path,
            'company_id' => $request->company_id,
        ]);


        return Redirect::to('/employees');

    }

    public function delete($id): RedirectResponse
    {

        $employee = Employee::find($id)->delete();

        return Redirect::to('/employees');
    }
}
