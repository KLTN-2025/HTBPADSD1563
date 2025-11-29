import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
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
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        ten_to_chuc: '',
        loai: 'cong_dong',
        ma_ngoai: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('to-chuc-don-vi.store'));
    };

    return (
        <AppLayout breadcrumbs={[
            { title: 'Tổ chức', href: '/to-chuc-don-vi' },
            { title: 'Tạo mới', href: '/to-chuc-don-vi/create' },
        ]}>
            <Head title="Tạo Tổ chức" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={route('to-chuc-don-vi.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-bold tracking-tight">Tạo Tổ chức mới</h1>
                </div>

                <div className="max-w-xl rounded-xl border p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="ten_to_chuc">Tên tổ chức</Label>
                            <Input
                                id="ten_to_chuc"
                                value={data.ten_to_chuc}
                                onChange={(e) => setData('ten_to_chuc', e.target.value)}
                                placeholder="Ví dụ: Khoa Công nghệ thông tin"
                            />
                            {errors.ten_to_chuc && <p className="text-sm text-red-500">{errors.ten_to_chuc}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ma_ngoai">Mã tổ chức (Tùy chọn)</Label>
                            <Input
                                id="ma_ngoai"
                                value={data.ma_ngoai}
                                onChange={(e) => setData('ma_ngoai', e.target.value)}
                                placeholder="Ví dụ: CNTT"
                            />
                            {errors.ma_ngoai && <p className="text-sm text-red-500">{errors.ma_ngoai}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="loai">Loại tổ chức</Label>
                            <Select
                                value={data.loai}
                                onValueChange={(value) => setData('loai', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="lop">Lớp</SelectItem>
                                    <SelectItem value="khoa">Khoa</SelectItem>
                                    <SelectItem value="cong_dong">Cộng đồng</SelectItem>
                                    <SelectItem value="khac">Khác</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.loai && <p className="text-sm text-red-500">{errors.loai}</p>}
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button variant="outline" asChild>
                                <Link href={route('to-chuc-don-vi.index')}>Hủy</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Tạo tổ chức
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
