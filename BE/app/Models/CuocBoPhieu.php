<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class CuocBoPhieu extends Model
{
    use HasFactory;

    protected $table = 'cuoc_bo_phieus';

    protected $fillable = [
        'to_chuc_id',
        'hop_dong_id',
        'tieu_de',
        'mo_ta',
        'che_do',
        'thoi_gian_bat_dau',
        'thoi_gian_ket_thuc',
        'trang_thai',
        'merkle_root_hien_tai',
    ];

    protected $casts = [
        'che_do' => 'string',
        'trang_thai' => 'string',
        'thoi_gian_bat_dau' => 'datetime',
        'thoi_gian_ket_thuc' => 'datetime',
    ];

    /**
     * Get tổ chức tạo cuộc bỏ phiếu
     */
    public function toChuc(): BelongsTo
    {
        return $this->belongsTo(ToChucDonVi::class, 'to_chuc_id');
    }

    /**
     * Get hợp đồng blockchain
     */
    public function hopDong(): BelongsTo
    {
        return $this->belongsTo(HopDong::class, 'hop_dong_id');
    }

    /**
     * Get merkle roots
     */
    public function merkleRoots(): HasMany
    {
        return $this->hasMany(MerkleRoot::class, 'cuoc_bo_phieu_id');
    }

    /**
     * Get lựa chọn
     */
    public function luaChons(): HasMany
    {
        return $this->hasMany(LuaChon::class, 'cuoc_bo_phieu_id');
    }

    /**
     * Get cử tri đăng ký
     */
    public function cuTriDangKys(): HasMany
    {
        return $this->hasMany(CuTriDangKy::class, 'cuoc_bo_phieu_id');
    }

    /**
     * Get phiếu bầu
     */
    public function phieuBaus(): HasMany
    {
        return $this->hasMany(PhieuBau::class, 'cuoc_bo_phieu_id');
    }

    /**
     * Get kết quả tổng hợp
     */
    public function ketQuaTongHops(): HasMany
    {
        return $this->hasMany(KetQuaTongHop::class, 'cuoc_bo_phieu_id');
    }

    /**
     * Get mạch chứng minh áp dụng
     */
    public function machChungMinhs(): BelongsToMany
    {
        return $this->belongsToMany(MachChungMinh::class, 'ap_dung_machs', 'cuoc_bo_phieu_id', 'mach_chung_minh_id')
            ->withTimestamps();
    }
}
