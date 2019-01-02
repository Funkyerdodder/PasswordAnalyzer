<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class PasswordController extends Controller
{

    public function index() {
        return view('index');
    }

    public function create(Request $request) {
        $this->validate($request, [
            'password' => 'required|unique:users,password'
        ]);
        $user = new User();
        $user->password = $request->password;
        $user->save();

        return 'Saved';
    }
}
