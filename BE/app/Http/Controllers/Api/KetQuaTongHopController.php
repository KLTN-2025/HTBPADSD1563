<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\KetQuaTongHop;
use Illuminate\Http\Request;

class KetQuaTongHopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = KetQuaTongHop::query();
        if ($request->has('cuoc_bo_phieu_id')) {
            $query->where('cuoc_bo_phieu_id', $request->cuoc_bo_phieu_id);
        }
        return $query->with('luaChon')->get();
    }

    /**
     * Store a newly created resource in storage.
     * Note: Results are usually calculated, but this API allows manual entry or system updates.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'cuoc_bo_phieu_id' => 'required|exists:cuoc_bo_phieus,id',
            'lua_chon_id' => 'required|exists:lua_chons,id',
            'so_phieu' => 'required|integer|min:0',
        ]);

        $ketQua = KetQuaTongHop::updateOrCreate(
            [
                'cuoc_bo_phieu_id' => $validated['cuoc_bo_phieu_id'],
                'lua_chon_id' => $validated['lua_chon_id'],
            ],
            ['so_phieu' => $validated['so_phieu']]
        );

        return response()->json($ketQua, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return KetQuaTongHop::with('luaChon')->findOrFail($id);
    }
}
