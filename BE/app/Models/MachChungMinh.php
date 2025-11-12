<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class MachChungMinh extends Model
{
    use HasFactory;

    protected $table = 'mach_chung_minhs';

    protected $fillable = [
        'ten_mach',
        'phien_ban',
        'verifying_key_cid',
        'proving_key_cid',
        'hash_vk',
        'so_rang_buoc',
        'mo_ta',
    ];

    protected $casts = [
        'so_rang_buoc' => 'integer',
    ];

    /**
     * Get cuộc bỏ phiếu áp dụng mạch này
     */
    public function cuocBoPhieus(): BelongsToMany
    {
        return $this->belongsToMany(CuocBoPhieu::class, 'ap_dung_machs', 'mach_chung_minh_id', 'cuoc_bo_phieu_id')
            ->withTimestamps();
    }
}
