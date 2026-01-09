import apiClient from '@/lib/api';

export const phieuBauService = {
  // Submit a vote
  submitVote: async (data: { cuoc_bo_phieu_id: number; lua_chon_id: number }) => {
    // Note: The backend API for submitting a vote is likely /api/phieu-baus or similar.
    // Based on routes/api.php, we have:
    // Route::post('/phieu-baus', [PhieuBauController::class, 'store']);
    const response = await apiClient.post('/phieu-baus', data);
    return response.data;
  },

  // Check if user has voted (if API supports it)
  checkVoted: async (_cuocBoPhieuId: number) => {
    // This endpoint might not exist yet, but we can assume it might be needed.
    // For now, we'll return false or implement if backend has it.
    // Let's assume the backend might return this info in CuocBoPhieu details or a separate endpoint.
    // If not, we can't implement it fully yet without backend support.
    return false;
  }
};
