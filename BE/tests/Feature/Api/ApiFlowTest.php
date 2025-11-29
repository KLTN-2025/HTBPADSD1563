<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ApiFlowTest extends TestCase
{
    use RefreshDatabase;

    // Note: This might be slow if migrations are heavy, but ensures clean state
    // If using SQLite in memory, it's fast.
    // For now, let's assume we are using the local sqlite file we created.
    // To avoid wiping the dev database, we should use a separate testing env, 
    // but standard Laravel setup handles this if phpunit.xml is configured.

    public function test_full_api_flow(): void
    {
        $this->withoutExceptionHandling();

        // 1. Create Organization
        $orgData = [
            'ten_to_chuc' => 'Test Organization',
            'loai' => 'cong_dong'
        ];

        // Create a NguoiDung to act as Admin
        $admin = \App\Models\NguoiDung::create([
            'ho_ten' => 'Super Admin',
            'email' => 'admin@test.com',
            'mat_khau' => bcrypt('password'),
            'vai_tro' => 'quan_tri',
            'trang_thai' => 1
        ]);

        $token = $admin->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])
            ->postJson('/api/to-chuc-don-vis', $orgData);

        $response->assertStatus(201);
        $orgId = $response->json('id');

        // 2. Create a User for that Organization
        $userData = [
            'ho_ten' => 'Poll Manager',
            'email' => 'manager@test.com',
            'vai_tro' => 'to_chuc_quan_ly',
            'to_chuc_id' => $orgId,
            'mat_khau' => 'password123'
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])
            ->postJson('/api/nguoi-dungs', $userData);

        $response->assertStatus(201);
        $userId = $response->json('id');

        // 3. Create a Poll
        $pollData = [
            'tieu_de' => 'Test Poll',
            'thoi_gian_bat_dau' => now()->toDateTimeString(),
            'thoi_gian_ket_thuc' => now()->addDays(7)->toDateTimeString(),
            'trang_thai' => 'len_ke_hoach',
            'to_chuc_id' => $orgId
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])
            ->postJson('/api/cuoc-bo-phieus', $pollData);

        $response->assertStatus(201);
        $pollId = $response->json('id');

        // 4. Add Choices (Candidates)
        $choiceData = [
            'cuoc_bo_phieu_id' => $pollId,
            'ten_lua_chon' => 'Candidate A',
            'mo_ta' => 'Description A'
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])
            ->postJson('/api/lua-chons', $choiceData);

        $response->assertStatus(201);
        $choiceId = $response->json('id');

        // 5. Register a Voter
        // Create XacThucDinhDanh
        $identity = \App\Models\XacThucDinhDanh::create([
            'loai' => 'cccd',
            'so_dinh_danh_hash' => hash('sha256', '123456789'),
            'kenh' => 'vn_eid',
            'trang_thai' => 'da_duyet'
        ]);

        $registrationData = [
            'cuoc_bo_phieu_id' => $pollId,
            'dinh_danh_id' => $identity->id,
            'trang_thai' => 'cho_duyet',
            'commitment_cm' => 'commitment_hash_123',
            'nullifier_pub' => 'nullifier_hash_123'
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])
            ->postJson('/api/cu-tri-dang-kys', $registrationData);

        $response->assertStatus(201);

        // 6. View Results (Empty initially)
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])
            ->getJson('/api/ket-qua-tong-hops?cuoc_bo_phieu_id=' . $pollId);

        $response->assertStatus(200);

        // 7. Create Smart Contract Info
        $contractData = [
            'ten_hop_dong' => 'VotingContract',
            'dia_chi_hop_dong' => '0x123...',
            'mang' => 'polygon',
            'trang_thai' => 'da_trien_khai'
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])
            ->postJson('/api/hop-dongs', $contractData);

        $response->assertStatus(201);
    }
}
