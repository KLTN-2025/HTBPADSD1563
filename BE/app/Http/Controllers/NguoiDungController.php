<?php

namespace App\Http\Controllers;

use App\Models\NguoiDung;
use App\Models\ToChucDonVi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class NguoiDungController extends Controller
{
    public function index()
    {
        $query = NguoiDung::with('toChuc');

        if (auth()->user()->vai_tro === 'to_chuc_quan_ly') {
            $query->where('to_chuc_id', auth()->user()->to_chuc_id);
        }

        $nguoiDungs = $query->latest()->paginate(10);

        return Inertia::render('NguoiDung/Index', [
            'nguoiDungs' => $nguoiDungs,
        ]);
    }

    public function create()
    {
        $toChucDonVis = ToChucDonVi::all();
        return Inertia::render('NguoiDung/Create', [
            'toChucDonVis' => $toChucDonVis,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'ho_ten' => 'required|string|max:255',
            'email' => 'required|email|unique:nguoi_dungs,email',
            'mat_khau' => 'required|string|min:6',
            'vai_tro' => 'required|in:quan_tri,to_chuc_quan_ly,quan_sat',
            'to_chuc_id' => 'nullable|exists:to_chuc_don_vis,id',
        ]);

        $validated['mat_khau'] = Hash::make($validated['mat_khau']);
        $validated['trang_thai'] = 1; // Active by default

        NguoiDung::create($validated);

        return redirect()->route('nguoi-dung.index')->with('success', 'Tạo người dùng thành công.');
    }

    public function edit(NguoiDung $nguoiDung)
    {
        $toChucDonVis = ToChucDonVi::all();
        return Inertia::render('NguoiDung/Edit', [
            'nguoiDung' => $nguoiDung,
            'toChucDonVis' => $toChucDonVis,
        ]);
    }

    public function update(Request $request, NguoiDung $nguoiDung)
    {
        $validated = $request->validate([
            'ho_ten' => 'required|string|max:255',
            'email' => 'required|email|unique:nguoi_dungs,email,' . $nguoiDung->id,
            'vai_tro' => 'required|in:quan_tri,to_chuc_quan_ly,quan_sat',
            'to_chuc_id' => 'nullable|exists:to_chuc_don_vis,id',
            'mat_khau' => 'nullable|string|min:6',
            'trang_thai' => 'boolean',
        ]);

        if (!empty($validated['mat_khau'])) {
            $validated['mat_khau'] = Hash::make($validated['mat_khau']);
        } else {
            unset($validated['mat_khau']);
        }

        $nguoiDung->update($validated);

        return redirect()->route('nguoi-dung.index')->with('success', 'Cập nhật người dùng thành công.');
    }

    public function destroy(NguoiDung $nguoiDung)
    {
        $nguoiDung->delete();
        return redirect()->route('nguoi-dung.index')->with('success', 'Xóa người dùng thành công.');
    }
}
