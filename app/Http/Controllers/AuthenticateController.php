<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use Tymon\JWTAuth\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\User;
use App\Quote;


class AuthenticateController extends Controller
{
    public function __construct(JWTAuth $auth)
    {
        // $this->middleware('jwt.auth', ['except' => ['authenticate']]);
        $this->JWTAuth = $auth;
    }
    /**
     * Return the user
     *
     * @return Response
     */
    public function index()
    {
        $users = User::all();
        return $users;
    }

    /**
     * Return a JWT
     *
     * @return Response
     */
    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');
        try {
            // verify the credentials and create a token for the user
            if (! $token = $this->JWTAuth->attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong
            return response()->json(['error' => 'could_not_create_token'], 500);
        }
        // if no errors are encountered we can return a JWT
        return response()->json(compact('token'));
    }
    /**
     * Return the authenticated user
     *
     * @return Response
     */
    public function getAuthenticatedUser()
    {
        try {
            if (! $user = $this->JWTAuth->parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }
        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
    }

    public function registration(Request $request)
    {
        $user = User::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => bcrypt($request->get('password')),
            'admin' => 0
        ]);
        $token = $this->JWTAuth->fromUser($user);

        return response()->json(compact('user'));
    }

}