<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ToChucDonVi extends Model
{
    use HasFactory;

    protected $table = 'to_chuc_don_vis';

    protected $fillable = [
        'ten_to_chuc',
        'loai',
        'ma_ngoai',
    ];

    protected $casts = [
        'loai' => 'string',
    ];

    /**
     * Get người dùng thuộc tổ chức
     */
    public function nguoiDungs(): HasMany
    {
        return $this->hasMany(NguoiDung::class, 'to_chuc_id');
    }

    /**
     * Get cuộc bỏ phiếu của tổ chức
     */
    public function cuocBoPhieus(): HasMany
    {
        return $this->hasMany(CuocBoPhieu::class, 'to_chuc_id');
    }
}
