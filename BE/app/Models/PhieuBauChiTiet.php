<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PhieuBauChiTiet extends Model
{
    use HasFactory;

    protected $table = 'phieu_bau_chi_tiets';

    protected $fillable = [
        'phieu_bau_id',
        'lua_chon_id',
        'gia_tri',
    ];

    protected $casts = [
        'gia_tri' => 'integer',
    ];

    /**
     * Get phiếu bầu
     */
    public function phieuBau(): BelongsTo
    {
        return $this->belongsTo(PhieuBau::class, 'phieu_bau_id');
    }

    /**
     * Get lựa chọn
     */
    public function luaChon(): BelongsTo
    {
        return $this->belongsTo(LuaChon::class, 'lua_chon_id');
    }
}
