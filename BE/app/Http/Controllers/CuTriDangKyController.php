<?php

namespace App\Http\Controllers;

use App\Models\CuTriDangKy;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CuTriDangKyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $cuTriDangKys = CuTriDangKy::with(['cuocBoPhieu', 'dinhDanh'])
            ->paginate(15);

        return response()->json($cuTriDangKys);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'cuoc_bo_phieu_id' => 'required|exists:cuoc_bo_phieus,id',
            'dinh_danh_id' => 'required|exists:xac_thuc_dinh_danhs,id',
            'trang_thai' => 'nullable|in:cho_duyet,duyet,huy',
            'commitment_cm' => 'required|string|max:130',
            'nullifier_pub' => 'required|string|max:130',
            'khoa_cong_nguoi_dung' => 'nullable|string|max:130',
            'vi_tri_la' => 'nullable|integer',
            'ghi_chu' => 'nullable|string|max:255',
        ]);

        $cuTriDangKy = CuTriDangKy::create($validated);

        return response()->json($cuTriDangKy, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(CuTriDangKy $cuTriDangKy): JsonResponse
    {
        $cuTriDangKy->load(['cuocBoPhieu', 'dinhDanh']);

        return response()->json($cuTriDangKy);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CuTriDangKy $cuTriDangKy): JsonResponse
    {
        $validated = $request->validate([
            'cuoc_bo_phieu_id' => 'sometimes|required|exists:cuoc_bo_phieus,id',
            'dinh_danh_id' => 'sometimes|required|exists:xac_thuc_dinh_danhs,id',
            'trang_thai' => 'nullable|in:cho_duyet,duyet,huy',
            'commitment_cm' => 'sometimes|required|string|max:130',
            'nullifier_pub' => 'sometimes|required|string|max:130',
            'khoa_cong_nguoi_dung' => 'nullable|string|max:130',
            'vi_tri_la' => 'nullable|integer',
            'ghi_chu' => 'nullable|string|max:255',
        ]);

        $cuTriDangKy->update($validated);

        return response()->json($cuTriDangKy);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CuTriDangKy $cuTriDangKy): JsonResponse
    {
        $cuTriDangKy->delete();

        return response()->json(['message' => 'Đã xóa đăng ký cử tri thành công'], 200);
    }
}
