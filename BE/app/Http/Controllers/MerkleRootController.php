<?php

namespace App\Http\Controllers;

use App\Models\MerkleRoot;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class MerkleRootController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $merkleRoots = MerkleRoot::with('cuocBoPhieu')
            ->paginate(15);

        return response()->json($merkleRoots);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'cuoc_bo_phieu_id' => 'required|exists:cuoc_bo_phieus,id',
            'root' => 'required|string|max:100',
            'depth' => 'nullable|integer',
            'so_lan_cap_nhat' => 'nullable|integer',
            'block_number' => 'nullable|integer',
            'tx_hash' => 'nullable|string|max:100',
        ]);

        $merkleRoot = MerkleRoot::create($validated);

        return response()->json($merkleRoot, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(MerkleRoot $merkleRoot): JsonResponse
    {
        $merkleRoot->load('cuocBoPhieu');

        return response()->json($merkleRoot);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MerkleRoot $merkleRoot): JsonResponse
    {
        $validated = $request->validate([
            'cuoc_bo_phieu_id' => 'sometimes|required|exists:cuoc_bo_phieus,id',
            'root' => 'sometimes|required|string|max:100',
            'depth' => 'nullable|integer',
            'so_lan_cap_nhat' => 'nullable|integer',
            'block_number' => 'nullable|integer',
            'tx_hash' => 'nullable|string|max:100',
        ]);

        $merkleRoot->update($validated);

        return response()->json($merkleRoot);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MerkleRoot $merkleRoot): JsonResponse
    {
        $merkleRoot->delete();

        return response()->json(['message' => 'Đã xóa merkle root thành công'], 200);
    }
}
