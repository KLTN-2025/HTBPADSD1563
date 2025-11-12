<?php

namespace App\Http\Controllers;

use App\Models\PhieuBauChiTiet;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PhieuBauChiTietController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $phieuBauChiTiets = PhieuBauChiTiet::with(['phieuBau', 'luaChon'])
            ->paginate(15);

        return response()->json($phieuBauChiTiets);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'phieu_bau_id' => 'required|exists:phieu_baus,id',
            'lua_chon_id' => 'required|exists:lua_chons,id',
            'gia_tri' => 'nullable|integer',
        ]);

        $phieuBauChiTiet = PhieuBauChiTiet::create($validated);

        return response()->json($phieuBauChiTiet, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(PhieuBauChiTiet $phieuBauChiTiet): JsonResponse
    {
        $phieuBauChiTiet->load(['phieuBau', 'luaChon']);

        return response()->json($phieuBauChiTiet);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PhieuBauChiTiet $phieuBauChiTiet): JsonResponse
    {
        $validated = $request->validate([
            'phieu_bau_id' => 'sometimes|required|exists:phieu_baus,id',
            'lua_chon_id' => 'sometimes|required|exists:lua_chons,id',
            'gia_tri' => 'nullable|integer',
        ]);

        $phieuBauChiTiet->update($validated);

        return response()->json($phieuBauChiTiet);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PhieuBauChiTiet $phieuBauChiTiet): JsonResponse
    {
        $phieuBauChiTiet->delete();

        return response()->json(['message' => 'Đã xóa chi tiết phiếu bầu thành công'], 200);
    }
}
