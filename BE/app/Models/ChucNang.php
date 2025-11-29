<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChucNang extends Model
{
    use HasFactory;

    protected $table = 'chuc_nangs';

    protected $fillable = [
        'ten_chuc_nang',
        'route_name',
        'id_group',
        'ten_group',
        'trang_thai',
    ];

    protected $casts = [
        'trang_thai' => 'boolean',
    ];

    public function chucVus()
    {
        return $this->belongsToMany(ChucVu::class, 'chi_tiet_phan_quyens', 'id_chuc_nang', 'id_chuc_vu');
    }
}
