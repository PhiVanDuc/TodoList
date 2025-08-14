export default function LazyLoadingDialog() {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="flex items-center gap-[15px] px-[20px] py-[10px] rounded-[10px] bg-white text-[15px]">
                <p>Đang tải giao diện</p>
                <div className="animate-spin rounded-full h-[20px] aspect-square border-[3px] border-neutral-800 border-t-transparent" />
            </div>
        </div>
    )
}
