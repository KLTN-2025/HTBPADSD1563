import AppLayout from '@/layouts/app-layout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { FormEventHandler } from 'react';

interface ToChuc {
    id: number;
    ten_to_chuc: string;
}

interface NguoiDung {
    id: number;
    ho_ten: string;
    email: string;
    vai_tro: string;
    to_chuc_id: number | null;
    trang_thai: number;
}

interface EditProps {
    nguoiDung: NguoiDung;
    toChucDonVis: ToChuc[];
}

export default function Edit({ nguoiDung, toChucDonVis }: EditProps) {
    const { data, setData, put, processing, errors, reset } = useForm({
        ho_ten: nguoiDung.ho_ten,
        email: nguoiDung.email,
        mat_khau: '',
        vai_tro: nguoiDung.vai_tro,
        to_chuc_id: nguoiDung.to_chuc_id ? nguoiDung.to_chuc_id.toString() : '',
        trang_thai: nguoiDung.trang_thai === 1,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('nguoi-dung.update', nguoiDung.id), {
            onFinish: () => reset('mat_khau'),
        });
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Người dùng', href: '/nguoi-dung' },
            { title: 'Chỉnh sửa', href: `/nguoi-dung/${nguoiDung.id}/edit` },
        ]}>
            <Head title="Chỉnh sửa Người dùng" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Chỉnh sửa Người dùng</h1>
                </div>

                <div className="max-w-2xl rounded-md border p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="ho_ten">Họ tên</Label>
                            <Input
                                id="ho_ten"
                                value={data.ho_ten}
                                onChange={(e) => setData('ho_ten', e.target.value)}
                                required
                            />
                            {errors.ho_ten && <p className="text-sm text-red-600">{errors.ho_ten}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="mat_khau">Mật khẩu mới (Để trống nếu không đổi)</Label>
                            <Input
                                id="mat_khau"
                                type="password"
                                value={data.mat_khau}
                                onChange={(e) => setData('mat_khau', e.target.value)}
                            />
                            {errors.mat_khau && <p className="text-sm text-red-600">{errors.mat_khau}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="vai_tro">Vai trò</Label>
                            <Select
                                value={data.vai_tro}
                                onValueChange={(value) => setData('vai_tro', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn vai trò" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="quan_tri">Quản trị viên</SelectItem>
                                    <SelectItem value="to_chuc_quan_ly">Quản lý tổ chức</SelectItem>
                                    <SelectItem value="quan_sat">Quan sát viên</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.vai_tro && <p className="text-sm text-red-600">{errors.vai_tro}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="to_chuc_id">Tổ chức (Tùy chọn)</Label>
                            <Select
                                value={data.to_chuc_id}
                                onValueChange={(value) => setData('to_chuc_id', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn tổ chức" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Không thuộc tổ chức nào</SelectItem>
                                    {toChucDonVis.map((org) => (
                                        <SelectItem key={org.id} value={org.id.toString()}>
                                            {org.ten_to_chuc}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.to_chuc_id && <p className="text-sm text-red-600">{errors.to_chuc_id}</p>}
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="trang_thai"
                                checked={data.trang_thai}
                                onChange={(e) => setData('trang_thai', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <Label htmlFor="trang_thai">Hoạt động</Label>
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button variant="outline" asChild>
                                <Link href={route('nguoi-dung.index')}>Hủy</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Đang lưu...' : 'Lưu thay đổi'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
