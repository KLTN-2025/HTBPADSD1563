<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\NguoiDung;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Find user by email
        $nguoiDung = NguoiDung::where('email', $request->email)->first();

        // Check if user exists and password is correct
        if (!$nguoiDung || !Hash::check($request->password, $nguoiDung->mat_khau)) {
            return response()->json(['message' => 'Invalid login details'], 401);
        }

        // Create token using Sanctum
        $token = $nguoiDung->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $nguoiDung->id,
                'ho_ten' => $nguoiDung->ho_ten,
                'email' => $nguoiDung->email,
                'vai_tro' => $nguoiDung->vai_tro,
            ],
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'id' => $user->id,
            'ho_ten' => $user->ho_ten,
            'email' => $user->email,
            'vai_tro' => $user->vai_tro,
        ]);
    }
}
