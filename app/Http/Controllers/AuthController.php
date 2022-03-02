<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    // // ログイン
    public function login(Request $request)
    {

        // 画面のログイン情報からユーザー情報を取得
        $user = User::where('login_id', '=', $request->input('loginId'))
            ->where('password', '=', $request->input('password'))
            ->get();

        if(count($user) > 0){
            return UserResource::collection($user);
        }
        return null;
    }
}
