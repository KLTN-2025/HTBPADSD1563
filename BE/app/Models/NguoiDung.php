<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NguoiDung extends Model
{
    use HasFactory;

    protected $table = 'nguoi_dungs';

    protected $fillable = [
        'ho_ten',
        'email',
        'mat_khau',
        'vai_tro',
        'to_chuc_id',
        'trang_thai',
    ];

    protected $hidden = [
        'mat_khau',
    ];

    protected $casts = [
        'vai_tro' => 'string',
        'trang_thai' => 'integer',
    ];

    /**
     * Get tổ chức của người dùng
     */
    public function toChuc(): BelongsTo
    {
        return $this->belongsTo(ToChucDonVi::class, 'to_chuc_id');
    }
}
