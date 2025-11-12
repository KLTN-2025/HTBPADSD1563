<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HopDong extends Model
{
    use HasFactory;

    protected $table = 'hop_dongs';

    protected $fillable = [
        'ten_hop_dong',
        'mang',
        'chain_id',
        'dia_chi_hop_dong',
        'tx_deploy',
        'trang_thai',
    ];

    protected $casts = [
        'mang' => 'string',
        'trang_thai' => 'string',
        'chain_id' => 'integer',
    ];

    /**
     * Get cuộc bỏ phiếu sử dụng hợp đồng
     */
    public function cuocBoPhieus(): HasMany
    {
        return $this->hasMany(CuocBoPhieu::class, 'hop_dong_id');
    }

    /**
     * Get sự kiện blockchain
     */
    public function suKienChains(): HasMany
    {
        return $this->hasMany(SuKienChain::class, 'hop_dong_id');
    }
}
