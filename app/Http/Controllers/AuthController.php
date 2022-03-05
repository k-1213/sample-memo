<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{

    // login
    public function login(Request $request)
    {

        // get User
        $user = User::where('login_id', '=', $request->input('loginId'))
            ->where('password', '=', $request->input('password'))
            ->first();

        if(!empty($user)){

            $user->tokens()->where('name', "auth_$user->id")->delete();
            $user->token = $user->createToken("auth_$user->id")->plainTextToken;
            return UserResource::collection([$user]);
        }
        return null;
    }
}
