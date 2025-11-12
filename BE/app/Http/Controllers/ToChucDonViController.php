<?php

namespace App\Http\Controllers;

use App\Models\ToChucDonVi;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ToChucDonViController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $toChucDonVis = ToChucDonVi::with(['nguoiDungs', 'cuocBoPhieus'])
            ->paginate(15);

        return response()->json($toChucDonVis);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'ten_to_chuc' => 'required|string|max:200',
            'loai' => 'required|in:lop,khoa,cong_dong,khac',
            'ma_ngoai' => 'nullable|string|max:100',
        ]);

        $toChuc = ToChucDonVi::create($validated);

        return response()->json($toChuc, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(ToChucDonVi $toChucDonVi): JsonResponse
    {
        $toChucDonVi->load(['nguoiDungs', 'cuocBoPhieus']);

        return response()->json($toChucDonVi);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ToChucDonVi $toChucDonVi): JsonResponse
    {
        $validated = $request->validate([
            'ten_to_chuc' => 'sometimes|required|string|max:200',
            'loai' => 'sometimes|required|in:lop,khoa,cong_dong,khac',
            'ma_ngoai' => 'nullable|string|max:100',
        ]);

        $toChucDonVi->update($validated);

        return response()->json($toChucDonVi);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ToChucDonVi $toChucDonVi): JsonResponse
    {
        $toChucDonVi->delete();

        return response()->json(['message' => 'Đã xóa tổ chức thành công'], 200);
    }
}
