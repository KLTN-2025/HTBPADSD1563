<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NguoiDung;
use Illuminate\Http\Request;

class NguoiDungController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return NguoiDung::with('toChucDonVi')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ho_ten' => 'required|string|max:255',
            'email' => 'required|email|unique:nguoi_dungs,email',
            'mat_khau' => 'required|string|min:6',
            'vai_tro' => 'required|in:quan_tri,to_chuc_quan_ly,quan_sat',
            'to_chuc_id' => 'nullable|exists:to_chuc_don_vis,id',
        ]);

        $validated['mat_khau'] = bcrypt($validated['mat_khau']);
        $nguoiDung = NguoiDung::create($validated);

        return response()->json($nguoiDung, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return NguoiDung::with('toChuc')->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $nguoiDung = NguoiDung::findOrFail($id);

        $validated = $request->validate([
            'ho_ten' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:nguoi_dungs,email,' . $id,
            'vai_tro' => 'sometimes|required|in:quan_tri,to_chuc_quan_ly,quan_sat',
            'to_chuc_id' => 'nullable|exists:to_chuc_don_vis,id',
        ]);

        $nguoiDung->update($validated);

        return response()->json($nguoiDung);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $nguoiDung = NguoiDung::findOrFail($id);
        $nguoiDung->delete();

        return response()->json(null, 204);
    }
}
