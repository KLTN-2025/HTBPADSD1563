<?php

namespace App\Http\Controllers;

use App\Models\CuocBoPhieu;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CuocBoPhieuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = CuocBoPhieu::with(['toChuc']);

        if (auth()->user()->vai_tro === 'to_chuc_quan_ly') {
            $query->where('to_chuc_id', auth()->user()->to_chuc_id);
        }

        $cuocBoPhieus = $query->latest()->paginate(10);

        return \Inertia\Inertia::render('CuocBoPhieu/Index', [
            'cuocBoPhieus' => $cuocBoPhieus
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $toChucs = \App\Models\ToChucDonVi::all();
        return \Inertia\Inertia::render('CuocBoPhieu/Create', [
            'toChucs' => $toChucs
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'to_chuc_id' => 'required|exists:to_chuc_don_vis,id',
            'tieu_de' => 'required|string|max:200',
            'mo_ta' => 'nullable|string',
            'che_do' => 'required|in:mot_lua_chon,nhieu_lua_chon,xep_hang',
            'thoi_gian_bat_dau' => 'required|date',
            'thoi_gian_ket_thuc' => 'required|date|after:thoi_gian_bat_dau',
            'trang_thai' => 'required|in:len_ke_hoach,dang_dien_ra,dong,hoan_thanh,huy',
        ]);

        CuocBoPhieu::create($validated);

        return redirect()->route('cuoc-bo-phieu.index')->with('success', 'Tạo cuộc bỏ phiếu thành công.');
    }

    /**
     * Display the specified resource.
     */
    public function show(CuocBoPhieu $cuocBoPhieu)
    {
        // For admin, show might be same as edit or a detail view
        return redirect()->route('cuoc-bo-phieu.edit', $cuocBoPhieu);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CuocBoPhieu $cuocBoPhieu)
    {
        $toChucs = \App\Models\ToChucDonVi::all();
        return \Inertia\Inertia::render('CuocBoPhieu/Edit', [
            'cuocBoPhieu' => $cuocBoPhieu,
            'toChucs' => $toChucs
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CuocBoPhieu $cuocBoPhieu)
    {
        $validated = $request->validate([
            'to_chuc_id' => 'required|exists:to_chuc_don_vis,id',
            'tieu_de' => 'required|string|max:200',
            'mo_ta' => 'nullable|string',
            'che_do' => 'required|in:mot_lua_chon,nhieu_lua_chon,xep_hang',
            'thoi_gian_bat_dau' => 'required|date',
            'thoi_gian_ket_thuc' => 'required|date|after:thoi_gian_bat_dau',
            'trang_thai' => 'required|in:len_ke_hoach,dang_dien_ra,dong,hoan_thanh,huy',
        ]);

        $cuocBoPhieu->update($validated);

        return redirect()->route('cuoc-bo-phieu.index')->with('success', 'Cập nhật thành công.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CuocBoPhieu $cuocBoPhieu)
    {
        $cuocBoPhieu->delete();

        return redirect()->route('cuoc-bo-phieu.index')->with('success', 'Đã xóa cuộc bỏ phiếu.');
    }
}
