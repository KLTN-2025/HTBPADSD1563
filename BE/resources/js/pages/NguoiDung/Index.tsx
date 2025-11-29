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
import { Plus, Pencil, Trash2, User, Shield, Building2 } from 'lucide-react';

interface NguoiDung {
    id: number;
    ho_ten: string;
    email: string;
    vai_tro: string;
    trang_thai: number;
    to_chuc?: {
        ten_to_chuc: string;
    };
}

interface IndexProps extends PageProps {
    nguoiDungs: {
        data: NguoiDung[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export default function Index({ nguoiDungs }: IndexProps) {
    const handleDelete = (id: number) => {
        if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            router.delete(route('nguoi-dung.destroy', id));
        }
    };

    const roleMap: Record<string, string> = {
        quan_tri: 'Quản trị viên',
        to_chuc_quan_ly: 'Quản lý tổ chức',
        quan_sat: 'Quan sát viên',
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Người dùng', href: '/nguoi-dung' }]}>
            <Head title="Quản lý Người dùng" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold tracking-tight">Danh sách Người dùng</h1>
                    <Button asChild>
                        <Link href={route('nguoi-dung.create')}>
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
                                <TableHead>Họ tên</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Vai trò</TableHead>
                                <TableHead>Tổ chức</TableHead>
                                <TableHead>Trạng thái</TableHead>
                                <TableHead className="text-right">Hành động</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {nguoiDungs.data.length > 0 ? (
                                nguoiDungs.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-muted-foreground" />
                                                {user.ho_ten}
                                            </div>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Shield className="h-3 w-3" />
                                                {roleMap[user.vai_tro] || user.vai_tro}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {user.to_chuc ? (
                                                <div className="flex items-center gap-1">
                                                    <Building2 className="h-3 w-3" />
                                                    {user.to_chuc.ten_to_chuc}
                                                </div>
                                            ) : (
                                                '-'
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${user.trang_thai
                                                    ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                                                    : 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20'
                                                    }`}
                                            >
                                                {user.trang_thai ? 'Hoạt động' : 'Đã khóa'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={route('nguoi-dung.edit', user.id)}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                                    onClick={() => handleDelete(user.id)}
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
