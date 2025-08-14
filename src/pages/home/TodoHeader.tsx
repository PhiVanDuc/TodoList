import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { HiOutlineDotsVertical } from "react-icons/hi";

import { signOutService } from "@/services/auth";

export default function TodoHeader() {
    return (
        <div className='flex items-center justify-between gap-[20px] px-[20px] py-[20px]'>
            <header>
                <h1 className="text-[20px] text-neutral-800 font-semibold">Danh sách công việc</h1>
                <p className="text-[15px] text-neutral-600">Ghi chú kế hoạch hoặc công việc quan trọng cần làm.</p>
            </header>

            <DropdownMenu>
                <DropdownMenuTrigger className="w-[30px] aspect-square flex items-center justify-center rounded-full bg-neutral-50 cursor-pointer transition-colors hover:bg-neutral-100">
                    <HiOutlineDotsVertical size={16} />
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuItem
                        className="flex items-center gap-[8px] px-[15px] py-[10px] cursor-pointer"
                        onClick={() => { signOutService() }}
                    >
                        Đăng xuất
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
