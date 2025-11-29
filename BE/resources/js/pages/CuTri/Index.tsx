import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
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
import { Check, X, UserCheck } from 'lucide-react';

interface CuTri {
    id: number;
    commitment_cm: string;
    trang_thai: string;
    created_at: string;
    cuoc_bo_phieu: {
        tieu_de: string;
    };
    dinh_danh: {
        so_dinh_danh: string;
        ho_ten: string;
    };
}

interface IndexProps extends PageProps {
    cuTriDangKys: {
        data: CuTri[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export default function Index({ cuTriDangKys }: IndexProps) {
    const handleApprove = (id: number) => {
        if (confirm('Bạn có chắc chắn muốn duyệt cử tri này?')) {
            router.put(route('cu-tri-dang-ky.update', id), {
                trang_thai: 'duyet',
            });
        }
    };

    const handleReject = (id: number) => {
        if (confirm('Bạn có chắc chắn muốn từ chối cử tri này?')) {
            router.put(route('cu-tri-dang-ky.update', id), {
                trang_thai: 'huy',
            });
        }
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Duyệt Cử tri', href: '/cu-tri-dang-ky' }]}>
            <Head title="Duyệt đăng ký Cử tri" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Danh sách Đăng ký Cử tri</h1>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Cử tri</TableHead>
                                <TableHead>Số định danh</TableHead>
                                <TableHead>Cuộc bỏ phiếu</TableHead>
                                <TableHead>Thời gian đăng ký</TableHead>
                                <TableHead className="text-right">Hành động</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cuTriDangKys.data.length > 0 ? (
                                cuTriDangKys.data.map((registration) => (
                                    <TableRow key={registration.id}>
                                        <TableCell>{registration.id}</TableCell>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <UserCheck className="h-4 w-4 text-muted-foreground" />
                                                {registration.dinh_danh?.ho_ten || 'Ẩn danh'}
                                            </div>
                                        </TableCell>
                                        <TableCell>{registration.dinh_danh?.so_dinh_danh || 'N/A'}</TableCell>
                                        <TableCell>{registration.cuoc_bo_phieu?.tieu_de}</TableCell>
                                        <TableCell>
                                            {new Date(registration.created_at).toLocaleString('vi-VN')}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                                                    onClick={() => handleApprove(registration.id)}
                                                >
                                                    <Check className="mr-1 h-4 w-4" />
                                                    Duyệt
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                                                    onClick={() => handleReject(registration.id)}
                                                >
                                                    <X className="mr-1 h-4 w-4" />
                                                    Từ chối
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        Không có yêu cầu đăng ký nào đang chờ duyệt.
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
