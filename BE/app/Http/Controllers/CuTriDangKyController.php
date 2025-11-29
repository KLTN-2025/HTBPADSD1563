<?php

namespace App\Http\Controllers;

use App\Models\CuTriDangKy;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CuTriDangKyController extends Controller
{
    public function index()
    {
        $cuTriDangKys = CuTriDangKy::with(['cuocBoPhieu', 'dinhDanh'])
            ->where('trang_thai', 'cho_duyet')
            ->latest()
            ->paginate(15);

        return Inertia::render('CuTri/Index', [
            'cuTriDangKys' => $cuTriDangKys,
        ]);
    }

    public function update(Request $request, CuTriDangKy $cuTriDangKy)
    {
        $validated = $request->validate([
            'trang_thai' => 'required|in:duyet,huy',
        ]);

        $cuTriDangKy->update(['trang_thai' => $validated['trang_thai']]);

        return redirect()->back()->with('success', 'Đã cập nhật trạng thái đăng ký.');
    }
}
