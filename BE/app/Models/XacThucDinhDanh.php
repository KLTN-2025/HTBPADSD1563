<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class XacThucDinhDanh extends Model
{
    use HasFactory;

    protected $table = 'xac_thuc_dinh_danhs';

    protected $fillable = [
        'loai',
        'so_dinh_danh_hash',
        'kenh',
        'co_quan_xac_thuc',
        'trang_thai',
        'ngay_xac_thuc',
        'thong_tin_bo_sung',
    ];

    protected $casts = [
        'loai' => 'string',
        'kenh' => 'string',
        'trang_thai' => 'string',
        'ngay_xac_thuc' => 'datetime',
    ];

    /**
     * Get cử tri đăng ký
     */
    public function cuTriDangKys(): HasMany
    {
        return $this->hasMany(CuTriDangKy::class, 'dinh_danh_id');
    }
}
