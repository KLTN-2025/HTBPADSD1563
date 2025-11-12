<?php

namespace App\Http\Controllers;

use App\Models\PhieuBau;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PhieuBauController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $phieuBaus = PhieuBau::with(['cuocBoPhieu', 'chiTiets'])
            ->paginate(15);

        return response()->json($phieuBaus);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'cuoc_bo_phieu_id' => 'required|exists:cuoc_bo_phieus,id',
            'nullifier' => 'required|string|max:130',
            'proof_cid' => 'required|string|max:100',
            'public_inputs_json' => 'nullable|json',
            'tx_hash' => 'nullable|string|max:100',
            'trang_thai' => 'nullable|in:hop_le,khong_hop_le,bi_tu_choi',
            'ly_do_tu_choi' => 'nullable|string|max:255',
            'thoi_diem' => 'required|date',
        ]);

        // Decode JSON if provided
        if (isset($validated['public_inputs_json'])) {
            $validated['public_inputs_json'] = json_decode($validated['public_inputs_json'], true);
        }

        $phieuBau = PhieuBau::create($validated);

        return response()->json($phieuBau, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(PhieuBau $phieuBau): JsonResponse
    {
        $phieuBau->load(['cuocBoPhieu', 'chiTiets.luaChon']);

        return response()->json($phieuBau);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PhieuBau $phieuBau): JsonResponse
    {
        $validated = $request->validate([
            'cuoc_bo_phieu_id' => 'sometimes|required|exists:cuoc_bo_phieus,id',
            'nullifier' => 'sometimes|required|string|max:130',
            'proof_cid' => 'sometimes|required|string|max:100',
            'public_inputs_json' => 'nullable|json',
            'tx_hash' => 'nullable|string|max:100',
            'trang_thai' => 'nullable|in:hop_le,khong_hop_le,bi_tu_choi',
            'ly_do_tu_choi' => 'nullable|string|max:255',
            'thoi_diem' => 'sometimes|required|date',
        ]);

        if (isset($validated['public_inputs_json'])) {
            $validated['public_inputs_json'] = json_decode($validated['public_inputs_json'], true);
        }

        $phieuBau->update($validated);

        return response()->json($phieuBau);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PhieuBau $phieuBau): JsonResponse
    {
        $phieuBau->delete();

        return response()->json(['message' => 'Đã xóa phiếu bầu thành công'], 200);
    }
}
