<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LuaChon extends Model
{
    use HasFactory;

    protected $table = 'lua_chons';

    protected $fillable = [
        'cuoc_bo_phieu_id',
        'ten_lua_chon',
        'mo_ta',
        'thu_tu',
    ];

    protected $casts = [
        'thu_tu' => 'integer',
    ];

    /**
     * Get cuộc bỏ phiếu
     */
    public function cuocBoPhieu(): BelongsTo
    {
        return $this->belongsTo(CuocBoPhieu::class, 'cuoc_bo_phieu_id');
    }

    /**
     * Get chi tiết phiếu bầu
     */
    public function phieuBauChiTiets(): HasMany
    {
        return $this->hasMany(PhieuBauChiTiet::class, 'lua_chon_id');
    }

    /**
     * Get kết quả tổng hợp
     */
    public function ketQuaTongHops(): HasMany
    {
        return $this->hasMany(KetQuaTongHop::class, 'lua_chon_id');
    }
}
