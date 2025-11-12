<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CuTriDangKy extends Model
{
    use HasFactory;

    protected $table = 'cu_tri_dang_kys';

    protected $fillable = [
        'cuoc_bo_phieu_id',
        'dinh_danh_id',
        'trang_thai',
        'commitment_cm',
        'nullifier_pub',
        'khoa_cong_nguoi_dung',
        'vi_tri_la',
        'ghi_chu',
    ];

    protected $casts = [
        'trang_thai' => 'string',
        'vi_tri_la' => 'integer',
    ];

    /**
     * Get cuộc bỏ phiếu
     */
    public function cuocBoPhieu(): BelongsTo
    {
        return $this->belongsTo(CuocBoPhieu::class, 'cuoc_bo_phieu_id');
    }

    /**
     * Get định danh
     */
    public function dinhDanh(): BelongsTo
    {
        return $this->belongsTo(XacThucDinhDanh::class, 'dinh_danh_id');
    }
}
