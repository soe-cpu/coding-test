<?php

namespace App\Http\Controllers\Dashboard;

use Inertia\Inertia;
use App\Models\Company;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

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

    public function save(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'logo' => 'required|file|max:3000|mimes:jpeg,png',
            'website' => 'required',
        ]);

        $path = '';
            if($request->file()){
                $fileName = time() . '_' . $request->logo->getClientOriginalName();
                $filePath = $request->file('logo')->storeAs('Logo', $fileName, 'public');
                $path = '/storage/' . $filePath;
            }


        $company = Company::create([
            'name' => $request->name,
            'email' => $request->email,
            'logo' => $path,
            'website' => $request->website,
        ]);


        return Redirect::to('/companies');
    }

    public function edit($id)  {
        $company = Company::find($id);

        return Inertia::render('Companies/CompanyEdit', ["company" => $company]);


    }

    public function update(Request $request, $id)

    {
        // dd($request->all());

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'website' => 'required',
        ]);

        $pathEmp = $request->file('logo');
        $path= Company::where('id', $id)->value('logo');
        if($pathEmp){
            if ($request->file()) {
                $fileName = time() . '_' . $request->logo->getClientOriginalName();
                $filePath = $request->file('logo')->storeAs('Logo', $fileName, 'public');
                $path = '/storage/' . $filePath;
            }
        }


        $company = Company::find($id)->update([
            'name' => $request->name,
            'email' => $request->email,
            'logo' => $path,
            'website' => $request->website,
        ]);


        return Redirect::to('/companies');

    }

    public function delete($id): RedirectResponse
    {

        $company = Company::find($id)->delete();

        return Redirect::to('/companies');
    }


}
