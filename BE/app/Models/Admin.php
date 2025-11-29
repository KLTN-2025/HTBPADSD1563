<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $table = 'admins';

    protected $fillable = [
        'ho_ten',
        'email',
        'mat_khau',
        'id_chuc_vu',
        'is_master',
        'trang_thai',
    ];

    protected $hidden = [
        'mat_khau',
        'remember_token',
    ];

    protected $casts = [
        'is_master' => 'boolean',
        'trang_thai' => 'boolean',
    ];

    public function getAuthPassword()
    {
        return $this->mat_khau;
    }

    public function chucVu()
    {
        return $this->belongsTo(ChucVu::class, 'id_chuc_vu');
    }

    /**
     * Check if admin has permission for a specific route
     */
    public function hasPermission($routeName)
    {
        if ($this->is_master) {
            return true;
        }

        if (!$this->chucVu || !$this->chucVu->trang_thai) {
            return false;
        }

        return $this->chucVu->chucNangs()
            ->where('route_name', $routeName)
            ->where('chuc_nangs.trang_thai', true)
            ->exists();
    }
}
