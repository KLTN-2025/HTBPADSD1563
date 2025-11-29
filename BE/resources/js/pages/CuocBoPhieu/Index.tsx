import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage, router } from '@inertiajs/react';
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
import { Plus, Pencil, Trash2, Calendar } from 'lucide-react';

interface CuocBoPhieu {
    id: number;
    tieu_de: string;
    trang_thai: string;
    thoi_gian_bat_dau: string;
    thoi_gian_ket_thuc: string;
    to_chuc: {
        ten_to_chuc: string;
    };
}

interface IndexProps extends PageProps {
    cuocBoPhieus: {
        data: CuocBoPhieu[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export default function Index({ cuocBoPhieus }: IndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Bạn có chắc chắn muốn xóa cuộc bỏ phiếu này?')) {
            router.delete(route('cuoc-bo-phieu.destroy', id));
        }
    };

    const statusMap: Record<string, { label: string; color: string }> = {
        len_ke_hoach: { label: 'Lên kế hoạch', color: 'bg-gray-100 text-gray-800' },
        dang_dien_ra: { label: 'Đang diễn ra', color: 'bg-green-100 text-green-800' },
        dong: { label: 'Đóng', color: 'bg-yellow-100 text-yellow-800' },
        hoan_thanh: { label: 'Hoàn thành', color: 'bg-blue-100 text-blue-800' },
        huy: { label: 'Hủy', color: 'bg-red-100 text-red-800' },
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Cuộc bỏ phiếu', href: '/cuoc-bo-phieu' }]}>
            <Head title="Quản lý Cuộc bỏ phiếu" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Danh sách Cuộc bỏ phiếu</h1>
                    <Button asChild>
                        <Link href={route('cuoc-bo-phieu.create')}>
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
                                <TableHead>Tiêu đề</TableHead>
                                <TableHead>Tổ chức</TableHead>
                                <TableHead>Thời gian</TableHead>
                                <TableHead>Trạng thái</TableHead>
                                <TableHead className="text-right">Hành động</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cuocBoPhieus.data.length > 0 ? (
                                cuocBoPhieus.data.map((poll) => (
                                    <TableRow key={poll.id}>
                                        <TableCell>{poll.id}</TableCell>
                                        <TableCell className="font-medium">{poll.tieu_de}</TableCell>
                                        <TableCell>{poll.to_chuc?.ten_to_chuc || 'N/A'}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(poll.thoi_gian_bat_dau).toLocaleDateString('vi-VN')}
                                                </span>
                                                <span>đến {new Date(poll.thoi_gian_ket_thuc).toLocaleDateString('vi-VN')}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusMap[poll.trang_thai]?.color || 'bg-gray-100'
                                                    }`}
                                            >
                                                {statusMap[poll.trang_thai]?.label || poll.trang_thai}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={route('cuoc-bo-phieu.edit', poll.id)}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                                    onClick={() => handleDelete(poll.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
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
