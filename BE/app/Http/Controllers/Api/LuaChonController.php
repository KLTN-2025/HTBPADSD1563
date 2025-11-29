<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LuaChon;
use Illuminate\Http\Request;

class LuaChonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = LuaChon::query();
        if ($request->has('cuoc_bo_phieu_id')) {
            $query->where('cuoc_bo_phieu_id', $request->cuoc_bo_phieu_id);
        }
        return $query->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'cuoc_bo_phieu_id' => 'required|exists:cuoc_bo_phieus,id',
            'ten_lua_chon' => 'required|string|max:255',
            'mo_ta' => 'nullable|string',
            'hinh_anh' => 'nullable|string',
        ]);

        $luaChon = LuaChon::create($validated);

        return response()->json($luaChon, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return LuaChon::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $luaChon = LuaChon::findOrFail($id);

        $validated = $request->validate([
            'ten_lua_chon' => 'sometimes|required|string|max:255',
            'mo_ta' => 'nullable|string',
            'hinh_anh' => 'nullable|string',
        ]);

        $luaChon->update($validated);

        return response()->json($luaChon);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $luaChon = LuaChon::findOrFail($id);
        $luaChon->delete();

        return response()->json(null, 204);
    }
}
