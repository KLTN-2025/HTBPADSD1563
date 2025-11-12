<?php

namespace App\Http\Controllers;

use App\Models\XacThucDinhDanh;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class XacThucDinhDanhController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $xacThucDinhDanhs = XacThucDinhDanh::with('cuTriDangKys')
            ->paginate(15);

        return response()->json($xacThucDinhDanhs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'loai' => 'required|in:cccd,the_sinh_vien,the_giang_vien,the_nhan_vien',
            'so_dinh_danh_hash' => 'required|string|max:128|unique:xac_thuc_dinh_danhs,so_dinh_danh_hash',
            'kenh' => 'required|in:vn_eid,edu_id,company_id,khac',
            'co_quan_xac_thuc' => 'nullable|string|max:150',
            'trang_thai' => 'nullable|in:cho_duyet,da_duyet,tu_choi',
            'ngay_xac_thuc' => 'nullable|date',
            'thong_tin_bo_sung' => 'nullable|string',
        ]);

        $xacThuc = XacThucDinhDanh::create($validated);

        return response()->json($xacThuc, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(XacThucDinhDanh $xacThucDinhDanh): JsonResponse
    {
        $xacThucDinhDanh->load('cuTriDangKys');

        return response()->json($xacThucDinhDanh);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, XacThucDinhDanh $xacThucDinhDanh): JsonResponse
    {
        $validated = $request->validate([
            'loai' => 'sometimes|required|in:cccd,the_sinh_vien,the_giang_vien,the_nhan_vien',
            'so_dinh_danh_hash' => 'sometimes|required|string|max:128|unique:xac_thuc_dinh_danhs,so_dinh_danh_hash,' . $xacThucDinhDanh->id,
            'kenh' => 'sometimes|required|in:vn_eid,edu_id,company_id,khac',
            'co_quan_xac_thuc' => 'nullable|string|max:150',
            'trang_thai' => 'nullable|in:cho_duyet,da_duyet,tu_choi',
            'ngay_xac_thuc' => 'nullable|date',
            'thong_tin_bo_sung' => 'nullable|string',
        ]);

        $xacThucDinhDanh->update($validated);

        return response()->json($xacThucDinhDanh);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(XacThucDinhDanh $xacThucDinhDanh): JsonResponse
    {
        $xacThucDinhDanh->delete();

        return response()->json(['message' => 'Đã xóa xác thực định danh thành công'], 200);
    }
}
