<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChucVu extends Model
{
    use HasFactory;

    protected $table = 'chuc_vus';

    protected $fillable = [
        'ten_chuc_vu',
        'trang_thai',
    ];

    protected $casts = [
        'trang_thai' => 'boolean',
    ];

    public function admins()
    {
        return $this->hasMany(Admin::class, 'id_chuc_vu');
    }

    public function chucNangs()
    {
        return $this->belongsToMany(ChucNang::class, 'chi_tiet_phan_quyens', 'id_chuc_vu', 'id_chuc_nang');
    }
}
