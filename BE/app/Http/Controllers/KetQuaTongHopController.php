<?php

namespace App\Http\Controllers;

use App\Models\KetQuaTongHop;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class KetQuaTongHopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $ketQuaTongHops = KetQuaTongHop::with(['cuocBoPhieu', 'luaChon'])
            ->paginate(15);

        return response()->json($ketQuaTongHops);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'cuoc_bo_phieu_id' => 'required|exists:cuoc_bo_phieus,id',
            'lua_chon_id' => 'required|exists:lua_chons,id',
            'tong_phieu' => 'nullable|integer',
            'cap_nhat_cuoi' => 'nullable|date',
        ]);

        $ketQuaTongHop = KetQuaTongHop::create($validated);

        return response()->json($ketQuaTongHop, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(KetQuaTongHop $ketQuaTongHop): JsonResponse
    {
        $ketQuaTongHop->load(['cuocBoPhieu', 'luaChon']);

        return response()->json($ketQuaTongHop);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, KetQuaTongHop $ketQuaTongHop): JsonResponse
    {
        $validated = $request->validate([
            'cuoc_bo_phieu_id' => 'sometimes|required|exists:cuoc_bo_phieus,id',
            'lua_chon_id' => 'sometimes|required|exists:lua_chons,id',
            'tong_phieu' => 'nullable|integer',
            'cap_nhat_cuoi' => 'nullable|date',
        ]);

        $ketQuaTongHop->update($validated);

        return response()->json($ketQuaTongHop);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KetQuaTongHop $ketQuaTongHop): JsonResponse
    {
        $ketQuaTongHop->delete();

        return response()->json(['message' => 'Đã xóa kết quả tổng hợp thành công'], 200);
    }

    /**
     * Get kết quả theo cuộc bỏ phiếu
     */
    public function getByCuocBoPhieu($cuocBoPhieuId): JsonResponse
    {
        $ketQuaTongHops = KetQuaTongHop::with('luaChon')
            ->where('cuoc_bo_phieu_id', $cuocBoPhieuId)
            ->orderBy('tong_phieu', 'desc')
            ->get();

        return response()->json($ketQuaTongHops);
    }
}
