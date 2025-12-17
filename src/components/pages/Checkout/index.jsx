import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import { MaLichChieuAPI } from './slice';

const CheckoutComponent = () => {
    const params = useParams();
    const { id } = params;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Lấy dữ liệu từ Redux
    const { data, loading } = useSelector((state) => state.MaLichChieuStore);
    const { danhSachGhe, thongTinPhim } = data || {};

    // State quản lý danh sách ghế đang chọn
    const [danhSachGheDangChon, setDanhSachGheDangChon] = useState([]);

    useEffect(() => {
        dispatch(MaLichChieuAPI(id));
    }, [id, dispatch]);

    const handleChonGhe = (ghe) => {
        const index = danhSachGheDangChon.findIndex(item => item.maGhe === ghe.maGhe);
        if (index !== -1) {
            const newDS = [...danhSachGheDangChon];
            newDS.splice(index, 1);
            setDanhSachGheDangChon(newDS);
        } else {
            setDanhSachGheDangChon([...danhSachGheDangChon, ghe]);
        }
    };

    const handlePayment = () => {
    if (danhSachGheDangChon.length === 0) {
        alert("Vui lòng chọn ít nhất một ghế!");
        return;
    }

    // Giả lập xử lý thanh toán
    alert("Thanh toán thành công! Chúc bạn xem phim vui vẻ.");
    
    // Chuyển hướng về trang chủ
    navigate("/home");
};

    // Hàm render danh sách ghế
    const renderGhe = () => {
    return danhSachGhe?.map((ghe) => {
        const isSelected = danhSachGheDangChon.find(item => item.maGhe === ghe.maGhe);
        
        // 1. Khởi tạo các biến chứa class rỗng
        let classLoaiGhe = "";
        let classTrangThaiGhe = "";

        // 2. Logic phân loại Ghế (Vip hay Thường)
        if (ghe.loaiGhe === 'Vip') {
            classLoaiGhe = "border-amber-400 text-amber-700";
            // Chỉ thêm màu nền amber nếu chưa được chọn và chưa bị đặt
            if (!isSelected && !ghe.daDat) classLoaiGhe += " bg-amber-100";
        } else {
            classLoaiGhe = "border-slate-200 text-slate-500";
            // Chỉ thêm màu nền slate nếu chưa được chọn và chưa bị đặt
            if (!isSelected && !ghe.daDat) classLoaiGhe += " bg-slate-100";
        }

        // 3. Logic trạng thái đặc biệt (Đang chọn > Đã đặt)
        if (isSelected) {
            classTrangThaiGhe = "bg-orange-500 text-white border-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]";
        } else if (ghe.daDat) {
            classTrangThaiGhe = "bg-gray-300 text-white cursor-not-allowed border-none";
        }

        const baseClass = "cursor-pointer w-8 h-8 sm:w-9 sm:h-9 rounded-md flex items-center justify-center text-[10px] font-bold transition-all duration-300 border";

        return (
            <button
                key={ghe.maGhe}
                disabled={ghe.daDat}
                onClick={() => handleChonGhe(ghe)}
                className={`
                    ${baseClass} 
                    ${classLoaiGhe} 
                    ${classTrangThaiGhe}
                    ${!ghe.daDat && !isSelected ? 'hover:bg-orange-500 hover:text-white hover:border-orange-500' : ''}
                `}
            >
                {ghe.daDat ? 'X' : ghe.tenGhe}
            </button>
        );
    });
};

    // Tính tổng tiền dựa trên danh sách ghế đang chọn
    const tongTien = danhSachGheDangChon.reduce((total, ghe) => total + ghe.giaVe, 0);

    if (loading) return <div className="text-center py-20">Đang tải phòng vé...</div>;

    return (
        <div className='min-h-screen bg-gray-50 py-10 px-5'>
            <div className='container mx-auto mt-20'>
                <div className='grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8'>

                    {/* --- CỘT TRÁI: PHÒNG VÉ --- */}
                    <div className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center'>
                        <div className='w-full mb-16 relative'>
                            <div className='w-4/5 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto shadow-[0_10px_30px_rgba(251,146,60,0.8)]'></div>
                            <div className='absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-400 tracking-[0.5em] uppercase'>
                                Màn Hình
                            </div>
                        </div>

                        <div className='grid grid-cols-10 sm:grid-cols-16 gap-2 sm:gap-3'>
                            {renderGhe()}
                        </div>

                        <div className='flex flex-wrap justify-center gap-8 mt-16 border-t border-gray-100 pt-8 w-full'>
                            <LegendItem color='bg-slate-100 border border-slate-200' label='Ghế thường' />
                            <LegendItem color='bg-amber-100 border border-amber-400' label='Ghế VIP' />
                            <LegendItem color='bg-orange-500' label='Đang chọn' />
                            <LegendItem color='bg-gray-300' label='Đã bán' isReserved />
                        </div>
                    </div>

                    {/* --- CỘT PHẢI: CHI TIẾT THANH TOÁN --- */}
                    <div className='bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100 flex flex-col h-fit sticky top-24'>
                        {/* Tổng tiền thực tế */}
                        <div className='p-8 text-center bg-slate-50 border-b border-gray-100'>
                            <span className='text-sm text-gray-500 block mb-1 uppercase tracking-widest font-semibold'>Tổng cộng</span>
                            <h1 className='text-4xl font-black text-green-600 font-mono'>
                                {tongTien.toLocaleString()}đ
                            </h1>
                        </div>

                        {/* Thông tin phim từ API */}
                        <div className='p-6 space-y-4'>
                            <div>
                                <span className='bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded mr-2 inline-block align-middle'>C18</span>
                                <h2 className='text-xl font-black text-slate-800 uppercase inline-block align-middle'>
                                    {thongTinPhim?.tenPhim}
                                </h2>
                            </div>
                            <div className='space-y-2'>
                                <InfoRow label='Cụm rạp:' value={thongTinPhim?.tenCumRap} />
                                <InfoRow label='Suất chiếu:' value={`${thongTinPhim?.ngayChieu} - ${thongTinPhim?.gioChieu}`} />
                                <InfoRow label='Rạp:' value={thongTinPhim?.tenRap} />
                            </div>
                        </div>

                        <div className='px-6'><hr className='border-gray-100' /></div>

                        {/* Chi tiết ghế đang chọn */}
                        <div className='p-6 flex-grow'>
                            <div className='flex justify-between items-start mb-4'>
                                <p className='text-gray-400 font-medium'>Ghế:</p>
                                <div className='text-right max-w-[150px]'>
                                    <span className='text-orange-600 font-bold text-lg break-words'>
                                        {danhSachGheDangChon.length > 0 
                                            ? danhSachGheDangChon.map(g => g.tenGhe).join(', ') 
                                            : '---'}
                                    </span>
                                </div>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className='text-gray-400 font-medium'>Tạm tính:</p>
                                <p className='font-bold text-slate-700'>{tongTien.toLocaleString()}đ</p>
                            </div>
                        </div>

                        <button onClick={handlePayment} className='group relative w-full cursor-pointer hover:bg-orange-600 text-white font-black py-5 text-lg transition-all duration-500 uppercase tracking-widest'>
                            Thanh Toán Ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}



const LegendItem = ({ color, label, isReserved }) => (
    <div className='flex items-center gap-3'>
        <div className={`w-5 h-5 rounded ${color} flex items-center justify-center text-[8px] text-white`}>
            {isReserved && 'X'}
        </div>
        <span className='text-xs font-semibold text-gray-500 uppercase'>{label}</span>
    </div>
);

const InfoRow = ({ label, value }) => (
    <div className='flex justify-between text-sm gap-2'>
        <span className='text-gray-400 whitespace-nowrap'>{label}</span>
        <span className='font-bold text-slate-700 text-right'>{value}</span>
    </div>
);

export default CheckoutComponent;