<?php

namespace App\Http\Controllers;

use App\Models\ApDungMach;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ApDungMachController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $apDungMachs = ApDungMach::with(['cuocBoPhieu', 'machChungMinh'])
            ->paginate(15);

        return response()->json($apDungMachs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'cuoc_bo_phieu_id' => 'required|exists:cuoc_bo_phieus,id',
            'mach_chung_minh_id' => 'required|exists:mach_chung_minhs,id',
        ]);

        // Check if already exists
        $exists = ApDungMach::where('cuoc_bo_phieu_id', $validated['cuoc_bo_phieu_id'])
            ->where('mach_chung_minh_id', $validated['mach_chung_minh_id'])
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Mạch này đã được áp dụng cho cuộc bỏ phiếu'
            ], 422);
        }

        $apDungMach = ApDungMach::create($validated);

        return response()->json($apDungMach, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(ApDungMach $apDungMach): JsonResponse
    {
        $apDungMach->load(['cuocBoPhieu', 'machChungMinh']);

        return response()->json($apDungMach);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ApDungMach $apDungMach): JsonResponse
    {
        $apDungMach->delete();

        return response()->json(['message' => 'Đã xóa áp dụng mạch thành công'], 200);
    }

    /**
     * Get mạch theo cuộc bỏ phiếu
     */
    public function getByCuocBoPhieu($cuocBoPhieuId): JsonResponse
    {
        $apDungMachs = ApDungMach::with('machChungMinh')
            ->where('cuoc_bo_phieu_id', $cuocBoPhieuId)
            ->get();

        return response()->json($apDungMachs);
    }
}
