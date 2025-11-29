<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PhieuBau;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PhieuBauController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'cuoc_bo_phieu_id' => 'required|exists:cuoc_bo_phieu,id',
            'lua_chon_id' => 'required|exists:lua_chon,id',
            // Add other validation rules as needed, e.g., encrypted vote data
        ]);

        // This is a simplified voting logic. 
        // In a real blockchain voting system, you might receive a proof or encrypted ballot here.

        $phieuBau = PhieuBau::create([
            'nguoi_dung_id' => Auth::id(),
            'cuoc_bo_phieu_id' => $request->cuoc_bo_phieu_id,
            'lua_chon_id' => $request->lua_chon_id,
            'thoi_gian_bau' => now(),
            // 'du_lieu_ma_hoa' => $request->du_lieu_ma_hoa, // Example
        ]);

        return response()->json(['message' => 'Vote cast successfully', 'data' => $phieuBau], 201);
    }
}
