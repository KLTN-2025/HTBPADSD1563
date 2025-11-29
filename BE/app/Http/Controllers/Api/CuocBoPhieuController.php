<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CuocBoPhieu;
use Illuminate\Http\Request;

class CuocBoPhieuController extends Controller
{
    public function index(Request $request)
    {
        $query = CuocBoPhieu::with(['toChuc']);

        if ($request->has('trang_thai')) {
            $query->where('trang_thai', $request->trang_thai);
        }

        // If client requests all (e.g. for stats), we might want to paginate differently or allow 'all'
        if ($request->has('all')) {
            return response()->json($query->latest()->get());
        }

        $perPage = $request->input('per_page', 10);
        $cuocBoPhieus = $query->latest()->paginate($perPage);

        return response()->json($cuocBoPhieus);
    }

    public function show($id)
    {
        $cuocBoPhieu = CuocBoPhieu::with(['luaChons', 'toChuc', 'hopDong', 'ketQuaTongHops'])->findOrFail($id);
        return response()->json($cuocBoPhieu);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tieu_de' => 'required|string|max:200',
            'mo_ta' => 'nullable|string',
            'thoi_gian_bat_dau' => 'required|date',
            'thoi_gian_ket_thuc' => 'required|date|after:thoi_gian_bat_dau',
            'trang_thai' => 'required|in:len_ke_hoach,dang_dien_ra,dong,hoan_thanh,huy',
            'to_chuc_id' => 'nullable|exists:to_chuc_don_vis,id',
            'hop_dong_id' => 'nullable|exists:hop_dongs,id',
            'che_do' => 'nullable|in:mot_lua_chon,nhieu_lua_chon,xep_hang',
        ]);

        $cuocBoPhieu = CuocBoPhieu::create($validated);

        return response()->json($cuocBoPhieu, 201);
    }

    public function update(Request $request, string $id)
    {
        $cuocBoPhieu = CuocBoPhieu::findOrFail($id);

        $validated = $request->validate([
            'tieu_de' => 'sometimes|required|string|max:200',
            'mo_ta' => 'nullable|string',
            'thoi_gian_bat_dau' => 'sometimes|required|date',
            'thoi_gian_ket_thuc' => 'sometimes|required|date|after:thoi_gian_bat_dau',
            'trang_thai' => 'sometimes|required|in:len_ke_hoach,dang_dien_ra,dong,hoan_thanh,huy',
            'to_chuc_id' => 'nullable|exists:to_chuc_don_vis,id',
            'hop_dong_id' => 'nullable|exists:hop_dongs,id',
            'che_do' => 'nullable|in:mot_lua_chon,nhieu_lua_chon,xep_hang',
        ]);

        $cuocBoPhieu->update($validated);

        return response()->json($cuocBoPhieu);
    }

    public function destroy(string $id)
    {
        $cuocBoPhieu = CuocBoPhieu::findOrFail($id);
        $cuocBoPhieu->delete();

        return response()->json(null, 204);
    }
}
