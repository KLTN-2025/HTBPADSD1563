<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ToChucDonVi;
use Illuminate\Http\Request;

class ToChucDonViController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ToChucDonVi::all();
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

        $toChuc = ToChucDonVi::create($validated);

        return response()->json($toChuc, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return ToChucDonVi::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $toChuc = ToChucDonVi::findOrFail($id);

        $validated = $request->validate([
            'ten_to_chuc' => 'sometimes|required|string|max:200',
            'loai' => 'sometimes|required|in:lop,khoa,cong_dong,khac',
            'ma_ngoai' => 'nullable|string|max:100',
        ]);

        $toChuc->update($validated);

        return response()->json($toChuc);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $toChuc = ToChucDonVi::findOrFail($id);
        $toChuc->delete();

        return response()->json(null, 204);
    }
}
