<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CuTriDangKy;
use Illuminate\Http\Request;

class CuTriDangKyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = CuTriDangKy::query();
        if ($request->has('cuoc_bo_phieu_id')) {
            $query->where('cuoc_bo_phieu_id', $request->cuoc_bo_phieu_id);
        }
        if ($request->has('dinh_danh_id')) {
            $query->where('dinh_danh_id', $request->dinh_danh_id);
        }
        return $query->with(['cuocBoPhieu'])->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'cuoc_bo_phieu_id' => 'required|exists:cuoc_bo_phieus,id',
            'dinh_danh_id' => 'required|exists:xac_thuc_dinh_danhs,id',
            'trang_thai' => 'required|in:cho_duyet,duyet,huy',
            'commitment_cm' => 'required|string|max:130',
            'nullifier_pub' => 'required|string|max:130',
            'khoa_cong_nguoi_dung' => 'nullable|string|max:130',
            'vi_tri_la' => 'nullable|integer',
            'ghi_chu' => 'nullable|string|max:255',
        ]);

        // Check if user belongs to the same organization as the poll
        $user = \Illuminate\Support\Facades\Auth::user();
        $poll = \App\Models\CuocBoPhieu::findOrFail($validated['cuoc_bo_phieu_id']);

        if ($user && $user->to_chuc_id !== $poll->to_chuc_id) {
            return response()->json(['message' => 'Bạn không thuộc tổ chức tổ chức cuộc bỏ phiếu này.'], 403);
        }

        // Check if already registered
        $exists = CuTriDangKy::where('cuoc_bo_phieu_id', $validated['cuoc_bo_phieu_id'])
            ->where('dinh_danh_id', $validated['dinh_danh_id'])
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'Cử tri đã đăng ký tham gia cuộc bỏ phiếu này.'], 409);
        }

        $cuTri = CuTriDangKy::create($validated);

        return response()->json($cuTri, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return CuTriDangKy::with(['cuocBoPhieu'])->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $cuTri = CuTriDangKy::findOrFail($id);

        $validated = $request->validate([
            'trang_thai' => 'sometimes|required|in:cho_duyet,duyet,huy',
            'commitment_cm' => 'sometimes|required|string|max:130',
            'nullifier_pub' => 'sometimes|required|string|max:130',
            'khoa_cong_nguoi_dung' => 'nullable|string|max:130',
            'vi_tri_la' => 'nullable|integer',
            'ghi_chu' => 'nullable|string|max:255',
        ]);

        $cuTri->update($validated);

        return response()->json($cuTri);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $cuTri = CuTriDangKy::findOrFail($id);
        $cuTri->delete();

        return response()->json(null, 204);
    }
}
