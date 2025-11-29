import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Plus, Pencil, Trash2, Building2 } from 'lucide-react';

interface ToChuc {
    id: number;
    ten_to_chuc: string;
    loai: string;
    ma_ngoai: string;
    nguoi_dungs_count: number;
    cuoc_bo_phieus_count: number;
}

interface IndexProps extends PageProps {
    toChucDonVis: {
        data: ToChuc[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export default function Index({ toChucDonVis }: IndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Bạn có chắc chắn muốn xóa tổ chức này?')) {
            router.delete(route('to-chuc-don-vi.destroy', id));
        }
    };

    const typeMap: Record<string, string> = {
        lop: 'Lớp',
        khoa: 'Khoa',
        cong_dong: 'Cộng đồng',
        khac: 'Khác',
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Tổ chức', href: '/to-chuc-don-vi' }]}>
            <Head title="Quản lý Tổ chức" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Danh sách Tổ chức</h1>
                    <Button asChild>
                        <Link href={route('to-chuc-don-vi.create')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Tạo mới
                        </Link>
                    </Button>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Tên tổ chức</TableHead>
                                <TableHead>Loại</TableHead>
                                <TableHead>Mã</TableHead>
                                <TableHead className="text-center">Thành viên</TableHead>
                                <TableHead className="text-center">Cuộc bỏ phiếu</TableHead>
                                <TableHead className="text-right">Hành động</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {toChucDonVis.data.length > 0 ? (
                                toChucDonVis.data.map((org) => (
                                    <TableRow key={org.id}>
                                        <TableCell>{org.id}</TableCell>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                                {org.ten_to_chuc}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                {typeMap[org.loai] || org.loai}
                                            </span>
                                        </TableCell>
                                        <TableCell>{org.ma_ngoai || '-'}</TableCell>
                                        <TableCell className="text-center">{org.nguoi_dungs_count}</TableCell>
                                        <TableCell className="text-center">{org.cuoc_bo_phieus_count}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={route('to-chuc-don-vi.edit', org.id)}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                                    onClick={() => handleDelete(org.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center">
                                        Không có dữ liệu.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
