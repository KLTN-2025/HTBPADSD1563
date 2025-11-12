<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MerkleRoot extends Model
{
    use HasFactory;

    protected $table = 'merkle_roots';

    protected $fillable = [
        'cuoc_bo_phieu_id',
        'root',
        'depth',
        'so_lan_cap_nhat',
        'block_number',
        'tx_hash',
    ];

    protected $casts = [
        'depth' => 'integer',
        'so_lan_cap_nhat' => 'integer',
        'block_number' => 'integer',
    ];

    /**
     * Get cuộc bỏ phiếu
     */
    public function cuocBoPhieu(): BelongsTo
    {
        return $this->belongsTo(CuocBoPhieu::class, 'cuoc_bo_phieu_id');
    }
}
