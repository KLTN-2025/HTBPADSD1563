<?php

namespace App\Http\Controllers;

use App\Models\ToChucDonVi;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ToChucDonViController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = ToChucDonVi::withCount(['nguoiDungs', 'cuocBoPhieus']);

        if (auth()->user()->vai_tro === 'to_chuc_quan_ly') {
            $query->where('id', auth()->user()->to_chuc_id);
        }

        $toChucDonVis = $query->latest()->paginate(10);

        return \Inertia\Inertia::render('ToChuc/Index', [
            'toChucDonVis' => $toChucDonVis
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return \Inertia\Inertia::render('ToChuc/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ten_to_chuc' => 'required|string|max:200',
            'loai' => 'required|in:lop,khoa,cong_dong,khac',
            'ma_ngoai' => 'nullable|string|max:100',
        ]);

        ToChucDonVi::create($validated);

        return redirect()->route('to-chuc-don-vi.index')->with('success', 'Tạo tổ chức thành công.');
    }

    /**
     * Display the specified resource.
     */
    public function show(ToChucDonVi $toChucDonVi)
    {
        return redirect()->route('to-chuc-don-vi.edit', $toChucDonVi);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ToChucDonVi $toChucDonVi)
    {
        return \Inertia\Inertia::render('ToChuc/Edit', [
            'toChucDonVi' => $toChucDonVi
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ToChucDonVi $toChucDonVi)
    {
        $validated = $request->validate([
            'ten_to_chuc' => 'required|string|max:200',
            'loai' => 'required|in:lop,khoa,cong_dong,khac',
            'ma_ngoai' => 'nullable|string|max:100',
        ]);

        $toChucDonVi->update($validated);

        return redirect()->route('to-chuc-don-vi.index')->with('success', 'Cập nhật thành công.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ToChucDonVi $toChucDonVi)
    {
        $toChucDonVi->delete();

        return redirect()->route('to-chuc-don-vi.index')->with('success', 'Đã xóa tổ chức.');
    }
}
