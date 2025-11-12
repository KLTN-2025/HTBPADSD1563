<?php

namespace App\Http\Controllers;

use App\Models\CuocBoPhieu;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CuocBoPhieuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $cuocBoPhieus = CuocBoPhieu::with([
            'toChuc',
            'hopDong',
            'luaChons',
            'merkleRoots',
            'cuTriDangKys',
            'phieuBaus',
            'ketQuaTongHops'
        ])->paginate(15);

        return response()->json($cuocBoPhieus);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'to_chuc_id' => 'required|exists:to_chuc_don_vis,id',
            'hop_dong_id' => 'nullable|exists:hop_dongs,id',
            'tieu_de' => 'required|string|max:200',
            'mo_ta' => 'nullable|string',
            'che_do' => 'required|in:mot_lua_chon,nhieu_lua_chon,xep_hang',
            'thoi_gian_bat_dau' => 'nullable|date',
            'thoi_gian_ket_thuc' => 'nullable|date|after:thoi_gian_bat_dau',
            'trang_thai' => 'nullable|in:len_ke_hoach,dang_dien_ra,dong,hoan_thanh,huy',
            'merkle_root_hien_tai' => 'nullable|string|max:100',
        ]);

        $cuocBoPhieu = CuocBoPhieu::create($validated);

        return response()->json($cuocBoPhieu, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(CuocBoPhieu $cuocBoPhieu): JsonResponse
    {
        $cuocBoPhieu->load([
            'toChuc',
            'hopDong',
            'luaChons',
            'merkleRoots',
            'cuTriDangKys',
            'phieuBaus',
            'ketQuaTongHops',
            'machChungMinhs'
        ]);

        return response()->json($cuocBoPhieu);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CuocBoPhieu $cuocBoPhieu): JsonResponse
    {
        $validated = $request->validate([
            'to_chuc_id' => 'sometimes|required|exists:to_chuc_don_vis,id',
            'hop_dong_id' => 'nullable|exists:hop_dongs,id',
            'tieu_de' => 'sometimes|required|string|max:200',
            'mo_ta' => 'nullable|string',
            'che_do' => 'sometimes|required|in:mot_lua_chon,nhieu_lua_chon,xep_hang',
            'thoi_gian_bat_dau' => 'nullable|date',
            'thoi_gian_ket_thuc' => 'nullable|date|after:thoi_gian_bat_dau',
            'trang_thai' => 'nullable|in:len_ke_hoach,dang_dien_ra,dong,hoan_thanh,huy',
            'merkle_root_hien_tai' => 'nullable|string|max:100',
        ]);

        $cuocBoPhieu->update($validated);

        return response()->json($cuocBoPhieu);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CuocBoPhieu $cuocBoPhieu): JsonResponse
    {
        $cuocBoPhieu->delete();

        return response()->json(['message' => 'Đã xóa cuộc bỏ phiếu thành công'], 200);
    }
}
