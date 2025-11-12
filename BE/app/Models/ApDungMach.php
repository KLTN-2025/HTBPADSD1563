<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ApDungMach extends Model
{
    use HasFactory;

    protected $table = 'ap_dung_machs';

    protected $fillable = [
        'cuoc_bo_phieu_id',
        'mach_chung_minh_id',
    ];

    /**
     * Get cuộc bỏ phiếu
     */
    public function cuocBoPhieu(): BelongsTo
    {
        return $this->belongsTo(CuocBoPhieu::class, 'cuoc_bo_phieu_id');
    }

    /**
     * Get mạch chứng minh
     */
    public function machChungMinh(): BelongsTo
    {
        return $this->belongsTo(MachChungMinh::class, 'mach_chung_minh_id');
    }
}
