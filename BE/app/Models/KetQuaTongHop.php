<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class KetQuaTongHop extends Model
{
    use HasFactory;

    protected $table = 'ket_qua_tong_hops';

    protected $fillable = [
        'cuoc_bo_phieu_id',
        'lua_chon_id',
        'tong_phieu',
        'cap_nhat_cuoi',
    ];

    protected $casts = [
        'tong_phieu' => 'integer',
        'cap_nhat_cuoi' => 'datetime',
    ];

    /**
     * Get cuộc bỏ phiếu
     */
    public function cuocBoPhieu(): BelongsTo
    {
        return $this->belongsTo(CuocBoPhieu::class, 'cuoc_bo_phieu_id');
    }

    /**
     * Get lựa chọn
     */
    public function luaChon(): BelongsTo
    {
        return $this->belongsTo(LuaChon::class, 'lua_chon_id');
    }
}
