<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PhieuBau extends Model
{
    use HasFactory;

    protected $table = 'phieu_baus';

    protected $fillable = [
        'cuoc_bo_phieu_id',
        'nullifier',
        'proof_cid',
        'public_inputs_json',
        'tx_hash',
        'trang_thai',
        'ly_do_tu_choi',
        'thoi_diem',
    ];

    protected $casts = [
        'trang_thai' => 'string',
        'thoi_diem' => 'datetime',
        'public_inputs_json' => 'array',
    ];

    /**
     * Get cuộc bỏ phiếu
     */
    public function cuocBoPhieu(): BelongsTo
    {
        return $this->belongsTo(CuocBoPhieu::class, 'cuoc_bo_phieu_id');
    }

    /**
     * Get chi tiết phiếu bầu
     */
    public function chiTiets(): HasMany
    {
        return $this->hasMany(PhieuBauChiTiet::class, 'phieu_bau_id');
    }
}
