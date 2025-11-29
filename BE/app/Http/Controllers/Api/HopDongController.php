<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HopDong;
use Illuminate\Http\Request;

class HopDongController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return HopDong::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ten_hop_dong' => 'required|string|max:200',
            'dia_chi_hop_dong' => 'required|string|max:100',
            'mang' => 'nullable|in:ethereum,polygon,bsc,arbitrum,optimism,local,khac',
            'chain_id' => 'nullable|integer',
            'tx_deploy' => 'nullable|string|max:100',
            'trang_thai' => 'required|in:dang_ky,da_trien_khai,huy',
        ]);

        $hopDong = HopDong::create($validated);

        return response()->json($hopDong, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return HopDong::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $hopDong = HopDong::findOrFail($id);

        $validated = $request->validate([
            'ten_hop_dong' => 'sometimes|required|string|max:200',
            'dia_chi_hop_dong' => 'sometimes|required|string|max:100',
            'mang' => 'nullable|in:ethereum,polygon,bsc,arbitrum,optimism,local,khac',
            'chain_id' => 'nullable|integer',
            'tx_deploy' => 'nullable|string|max:100',
            'trang_thai' => 'sometimes|required|in:dang_ky,da_trien_khai,huy',
        ]);

        $hopDong->update($validated);

        return response()->json($hopDong);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $hopDong = HopDong::findOrFail($id);
        $hopDong->delete();

        return response()->json(null, 204);
    }
}
