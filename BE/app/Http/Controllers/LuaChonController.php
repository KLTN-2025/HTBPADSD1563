<?php

namespace App\Http\Controllers;

use App\Models\LuaChon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class LuaChonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $luaChons = LuaChon::with(['cuocBoPhieu', 'ketQuaTongHops'])
            ->paginate(15);

        return response()->json($luaChons);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'cuoc_bo_phieu_id' => 'required|exists:cuoc_bo_phieus,id',
            'ten_lua_chon' => 'required|string|max:200',
            'mo_ta' => 'nullable|string',
            'thu_tu' => 'nullable|integer',
        ]);

        $luaChon = LuaChon::create($validated);

        return response()->json($luaChon, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(LuaChon $luaChon): JsonResponse
    {
        $luaChon->load(['cuocBoPhieu', 'phieuBauChiTiets', 'ketQuaTongHops']);

        return response()->json($luaChon);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LuaChon $luaChon): JsonResponse
    {
        $validated = $request->validate([
            'cuoc_bo_phieu_id' => 'sometimes|required|exists:cuoc_bo_phieus,id',
            'ten_lua_chon' => 'sometimes|required|string|max:200',
            'mo_ta' => 'nullable|string',
            'thu_tu' => 'nullable|integer',
        ]);

        $luaChon->update($validated);

        return response()->json($luaChon);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LuaChon $luaChon): JsonResponse
    {
        $luaChon->delete();

        return response()->json(['message' => 'Đã xóa lựa chọn thành công'], 200);
    }
}
