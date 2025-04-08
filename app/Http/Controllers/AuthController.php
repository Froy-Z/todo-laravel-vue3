<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    private Request $request;

    public function __construct(Request $request)
    {
        $this->request = $request;
    }


    public function auth(): JsonResponse
    {
        return response()->json([
            'user' => $this->request->user(),
        ]);
    }

    public function register(): JsonResponse
    {
        $this->request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6'
        ]);

        $user = User::query()->create([
            'name' => $this->request->name,
            'email' => $this->request->email,
            'password' => Hash::make($this->request->password)
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Успешная регистрация',
            'token' => $token,
            'user' => $user
        ]);
    }

    /**
     * @throws ValidationException
     */
    public function login(): JsonResponse
    {
        $this->request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::query()->where('email', $this->request->email)->first();

        if (!$user || !Hash::check($this->request->password, $user->password)) {
            return response()->json(['message' => 'Неверный email или пароль'], 401);
        }

        $token = $user->createToken('api_token')->plainTextToken;

        return response()->json(['token' => $token]);
    }

    public function logout(): JsonResponse
    {
        $this->request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Выход выполнен']);
    }
}
