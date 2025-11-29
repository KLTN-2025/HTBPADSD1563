<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class NguoiDung extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

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
     * Get the password for the user.
     */
    public function getAuthPassword()
    {
        return $this->mat_khau;
    }

    /**
     * Get tổ chức của người dùng
     */
    public function toChuc(): BelongsTo
    {
        return $this->belongsTo(ToChucDonVi::class, 'to_chuc_id');
    }
}
