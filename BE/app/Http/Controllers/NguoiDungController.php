<?php

namespace App\Http\Controllers;

use App\Models\NguoiDung;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class NguoiDungController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $nguoiDungs = NguoiDung::with('toChuc')
            ->paginate(15);

        return response()->json($nguoiDungs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'ho_ten' => 'required|string|max:150',
            'email' => 'required|email|max:190|unique:nguoi_dungs,email',
            'mat_khau' => 'required|string|min:8',
            'vai_tro' => 'required|in:quan_tri,to_chuc_quan_ly,quan_sat',
            'to_chuc_id' => 'nullable|exists:to_chuc_don_vis,id',
            'trang_thai' => 'nullable|integer',
        ]);

        $validated['mat_khau'] = Hash::make($validated['mat_khau']);

        $nguoiDung = NguoiDung::create($validated);

        return response()->json($nguoiDung, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(NguoiDung $nguoiDung): JsonResponse
    {
        $nguoiDung->load('toChuc');

        return response()->json($nguoiDung);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, NguoiDung $nguoiDung): JsonResponse
    {
        $validated = $request->validate([
            'ho_ten' => 'sometimes|required|string|max:150',
            'email' => 'sometimes|required|email|max:190|unique:nguoi_dungs,email,' . $nguoiDung->id,
            'mat_khau' => 'sometimes|string|min:8',
            'vai_tro' => 'sometimes|required|in:quan_tri,to_chuc_quan_ly,quan_sat',
            'to_chuc_id' => 'nullable|exists:to_chuc_don_vis,id',
            'trang_thai' => 'nullable|integer',
        ]);

        if (isset($validated['mat_khau'])) {
            $validated['mat_khau'] = Hash::make($validated['mat_khau']);
        }

        $nguoiDung->update($validated);

        return response()->json($nguoiDung);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(NguoiDung $nguoiDung): JsonResponse
    {
        $nguoiDung->delete();

        return response()->json(['message' => 'Đã xóa người dùng thành công'], 200);
    }
}
