<?php

namespace App\Http\Controllers;

use App\Models\MachChungMinh;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MachChungMinhController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $machChungMinhs = MachChungMinh::with('cuocBoPhieus')
            ->paginate(15);

        return response()->json($machChungMinhs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'ten_mach' => 'required|string|max:150',
            'phien_ban' => 'required|string|max:50',
            'verifying_key_cid' => 'required|string|max:100',
            'proving_key_cid' => 'nullable|string|max:100',
            'hash_vk' => 'nullable|string|max:100',
            'so_rang_buoc' => 'nullable|integer',
            'mo_ta' => 'nullable|string',
        ]);

        $machChungMinh = MachChungMinh::create($validated);

        return response()->json($machChungMinh, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(MachChungMinh $machChungMinh): JsonResponse
    {
        $machChungMinh->load('cuocBoPhieus');

        return response()->json($machChungMinh);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MachChungMinh $machChungMinh): JsonResponse
    {
        $validated = $request->validate([
            'ten_mach' => 'sometimes|required|string|max:150',
            'phien_ban' => 'sometimes|required|string|max:50',
            'verifying_key_cid' => 'sometimes|required|string|max:100',
            'proving_key_cid' => 'nullable|string|max:100',
            'hash_vk' => 'nullable|string|max:100',
            'so_rang_buoc' => 'nullable|integer',
            'mo_ta' => 'nullable|string',
        ]);

        $machChungMinh->update($validated);

        return response()->json($machChungMinh);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MachChungMinh $machChungMinh): JsonResponse
    {
        $machChungMinh->delete();

        return response()->json(['message' => 'Đã xóa mạch chứng minh thành công'], 200);
    }
}
