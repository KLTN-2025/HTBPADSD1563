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

interface CreateProps {
    toChucDonVis: ToChuc[];
}

export default function Create({ toChucDonVis }: CreateProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        ho_ten: '',
        email: '',
        mat_khau: '',
        vai_tro: 'quan_sat',
        to_chuc_id: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('nguoi-dung.store'), {
            onFinish: () => reset('mat_khau'),
        });
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Người dùng', href: '/nguoi-dung' },
            { title: 'Tạo mới', href: '/nguoi-dung/create' },
        ]}>
            <Head title="Tạo Người dùng mới" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Tạo Người dùng mới</h1>
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
                            <Label htmlFor="mat_khau">Mật khẩu</Label>
                            <Input
                                id="mat_khau"
                                type="password"
                                value={data.mat_khau}
                                onChange={(e) => setData('mat_khau', e.target.value)}
                                required
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

                        <div className="flex justify-end gap-4">
                            <Button variant="outline" asChild>
                                <Link href={route('nguoi-dung.index')}>Hủy</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Đang lưu...' : 'Lưu'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
