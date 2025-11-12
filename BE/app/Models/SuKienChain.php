<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SuKienChain extends Model
{
    use HasFactory;

    protected $table = 'su_kien_chains';

    protected $fillable = [
        'hop_dong_id',
        'ten_su_kien',
        'du_lieu_json',
        'block_number',
        'tx_hash',
        'thoi_diem',
    ];

    protected $casts = [
        'du_lieu_json' => 'array',
        'block_number' => 'integer',
        'thoi_diem' => 'datetime',
    ];

    /**
     * Get hợp đồng blockchain
     */
    public function hopDong(): BelongsTo
    {
        return $this->belongsTo(HopDong::class, 'hop_dong_id');
    }
}
