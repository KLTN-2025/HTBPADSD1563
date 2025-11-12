<?php

namespace App\Http\Controllers;

use App\Models\HopDong;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class HopDongController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $hopDongs = HopDong::with(['cuocBoPhieus', 'suKienChains'])
            ->paginate(15);

        return response()->json($hopDongs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'ten_hop_dong' => 'nullable|string|max:200',
            'mang' => 'required|in:ethereum,polygon,bsc,arbitrum,optimism,local,khac',
            'chain_id' => 'nullable|integer',
            'dia_chi_hop_dong' => 'required|string|max:100',
            'tx_deploy' => 'nullable|string|max:100',
            'trang_thai' => 'nullable|in:dang_ky,da_trien_khai,huy',
        ]);

        $hopDong = HopDong::create($validated);

        return response()->json($hopDong, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(HopDong $hopDong): JsonResponse
    {
        $hopDong->load(['cuocBoPhieus', 'suKienChains']);

        return response()->json($hopDong);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HopDong $hopDong): JsonResponse
    {
        $validated = $request->validate([
            'ten_hop_dong' => 'nullable|string|max:200',
            'mang' => 'sometimes|required|in:ethereum,polygon,bsc,arbitrum,optimism,local,khac',
            'chain_id' => 'nullable|integer',
            'dia_chi_hop_dong' => 'sometimes|required|string|max:100',
            'tx_deploy' => 'nullable|string|max:100',
            'trang_thai' => 'nullable|in:dang_ky,da_trien_khai,huy',
        ]);

        $hopDong->update($validated);

        return response()->json($hopDong);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HopDong $hopDong): JsonResponse
    {
        $hopDong->delete();

        return response()->json(['message' => 'Đã xóa hợp đồng thành công'], 200);
    }
}
