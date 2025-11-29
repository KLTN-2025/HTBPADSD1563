import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Loader2 } from 'lucide-react';

interface ToChuc {
    id: number;
    ten_to_chuc: string;
}

interface CreateProps {
    toChucs: ToChuc[];
}

export default function Create({ toChucs }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        tieu_de: '',
        mo_ta: '',
        to_chuc_id: '',
        che_do: 'mot_lua_chon',
        thoi_gian_bat_dau: '',
        thoi_gian_ket_thuc: '',
        trang_thai: 'len_ke_hoach',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('cuoc-bo-phieu.store'));
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Cuộc bỏ phiếu', href: '/cuoc-bo-phieu' },
            { title: 'Tạo mới', href: '/cuoc-bo-phieu/create' },
        ]}>
            <Head title="Tạo Cuộc bỏ phiếu" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={route('cuoc-bo-phieu.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold tracking-tight">Tạo Cuộc bỏ phiếu mới</h1>
                </div>

                <div className="max-w-2xl rounded-xl border p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="tieu_de">Tiêu đề</Label>
                            <Input
                                id="tieu_de"
                                value={data.tieu_de}
                                onChange={(e) => setData('tieu_de', e.target.value)}
                                placeholder="Nhập tiêu đề cuộc bỏ phiếu"
                            />
                            {errors.tieu_de && <p className="text-sm text-red-500">{errors.tieu_de}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="to_chuc_id">Tổ chức</Label>
                            <Select
                                value={data.to_chuc_id}
                                onValueChange={(value) => setData('to_chuc_id', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn tổ chức" />
                                </SelectTrigger>
                                <SelectContent>
                                    {toChucs.map((tc) => (
                                        <SelectItem key={tc.id} value={tc.id.toString()}>
                                            {tc.ten_to_chuc}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.to_chuc_id && <p className="text-sm text-red-500">{errors.to_chuc_id}</p>}
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="che_do">Chế độ</Label>
                                <Select
                                    value={data.che_do}
                                    onValueChange={(value) => setData('che_do', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="mot_lua_chon">Một lựa chọn</SelectItem>
                                        <SelectItem value="nhieu_lua_chon">Nhiều lựa chọn</SelectItem>
                                        <SelectItem value="xep_hang">Xếp hạng</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.che_do && <p className="text-sm text-red-500">{errors.che_do}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="trang_thai">Trạng thái</Label>
                                <Select
                                    value={data.trang_thai}
                                    onValueChange={(value) => setData('trang_thai', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="len_ke_hoach">Lên kế hoạch</SelectItem>
                                        <SelectItem value="dang_dien_ra">Đang diễn ra</SelectItem>
                                        <SelectItem value="dong">Đóng</SelectItem>
                                        <SelectItem value="hoan_thanh">Hoàn thành</SelectItem>
                                        <SelectItem value="huy">Hủy</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.trang_thai && <p className="text-sm text-red-500">{errors.trang_thai}</p>}
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="thoi_gian_bat_dau">Thời gian bắt đầu</Label>
                                <Input
                                    id="thoi_gian_bat_dau"
                                    type="datetime-local"
                                    value={data.thoi_gian_bat_dau}
                                    onChange={(e) => setData('thoi_gian_bat_dau', e.target.value)}
                                />
                                {errors.thoi_gian_bat_dau && (
                                    <p className="text-sm text-red-500">{errors.thoi_gian_bat_dau}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="thoi_gian_ket_thuc">Thời gian kết thúc</Label>
                                <Input
                                    id="thoi_gian_ket_thuc"
                                    type="datetime-local"
                                    value={data.thoi_gian_ket_thuc}
                                    onChange={(e) => setData('thoi_gian_ket_thuc', e.target.value)}
                                />
                                {errors.thoi_gian_ket_thuc && (
                                    <p className="text-sm text-red-500">{errors.thoi_gian_ket_thuc}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="mo_ta">Mô tả</Label>
                            <Textarea
                                id="mo_ta"
                                value={data.mo_ta}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('mo_ta', e.target.value)}
                                placeholder="Mô tả chi tiết về cuộc bỏ phiếu..."
                                className="min-h-[100px]"
                            />
                            {errors.mo_ta && <p className="text-sm text-red-500">{errors.mo_ta}</p>}
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button variant="outline" asChild>
                                <Link href={route('cuoc-bo-phieu.index')}>Hủy</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Tạo cuộc bỏ phiếu
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
