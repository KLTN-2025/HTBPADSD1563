<?php

namespace App\Http\Controllers;

use App\Models\SuKienChain;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SuKienChainController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $suKienChains = SuKienChain::with('hopDong')
            ->orderBy('block_number', 'desc')
            ->paginate(15);

        return response()->json($suKienChains);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'hop_dong_id' => 'required|exists:hop_dongs,id',
            'ten_su_kien' => 'required|string|max:120',
            'du_lieu_json' => 'nullable|json',
            'block_number' => 'nullable|integer',
            'tx_hash' => 'nullable|string|max:100',
            'thoi_diem' => 'nullable|date',
        ]);

        if (isset($validated['du_lieu_json'])) {
            $validated['du_lieu_json'] = json_decode($validated['du_lieu_json'], true);
        }

        $suKienChain = SuKienChain::create($validated);

        return response()->json($suKienChain, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(SuKienChain $suKienChain): JsonResponse
    {
        $suKienChain->load('hopDong');

        return response()->json($suKienChain);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SuKienChain $suKienChain): JsonResponse
    {
        $validated = $request->validate([
            'hop_dong_id' => 'sometimes|required|exists:hop_dongs,id',
            'ten_su_kien' => 'sometimes|required|string|max:120',
            'du_lieu_json' => 'nullable|json',
            'block_number' => 'nullable|integer',
            'tx_hash' => 'nullable|string|max:100',
            'thoi_diem' => 'nullable|date',
        ]);

        if (isset($validated['du_lieu_json'])) {
            $validated['du_lieu_json'] = json_decode($validated['du_lieu_json'], true);
        }

        $suKienChain->update($validated);

        return response()->json($suKienChain);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SuKienChain $suKienChain): JsonResponse
    {
        $suKienChain->delete();

        return response()->json(['message' => 'Đã xóa sự kiện blockchain thành công'], 200);
    }

    /**
     * Get sự kiện theo hợp đồng
     */
    public function getByHopDong($hopDongId): JsonResponse
    {
        $suKienChains = SuKienChain::where('hop_dong_id', $hopDongId)
            ->orderBy('block_number', 'desc')
            ->paginate(15);

        return response()->json($suKienChains);
    }
}
