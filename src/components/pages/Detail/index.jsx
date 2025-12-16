import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DetailAPI } from './slice';

const DetailComponent = () => {
    const params = useParams();
    const { id } = params;
    
    const state = useSelector((state) => state.DetailStore);
    const dispatch = useDispatch();

    const { data, error, loading } = state;


    useEffect(() => {
        // ✅ Thêm dispatch và id vào dependency array
        dispatch(DetailAPI(id));
    }, [dispatch, id]); 


    const formatNgayKhoiChieu = (dateString) => {
        if (!dateString) return 'Đang cập nhật';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('vi-VN', { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric' 
            });
        } catch (e) {
            return 'Đang cập nhật';
        }
    };

    // --------------------------------------------------------
    // ✅ Xử lý Loading, Error và No Data
    // --------------------------------------------------------
    if (loading) {
        return (
            <div className="text-center py-20">
                <p className="text-xl font-semibold">Đang tải chi tiết phim...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <p className="text-xl text-red-600 font-semibold">Lỗi: Không thể tải chi tiết phim. Vui lòng thử lại sau.</p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="text-center py-20">
                <p className="text-xl text-gray-600 font-semibold">Không tìm thấy thông tin phim với mã ID: {id}.</p>
            </div>
        );
    }
    
    // Giả định data đã có và là đối tượng phim (để code gọn hơn)
    const movie = data;

    return (
        <div className='container'>
            <div
                className="relative"
                style={{
                    // ✅ Sử dụng ảnh poster phim làm background
                    backgroundImage: `url(${movie.hinhAnh})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '500px',
                }}
            >
                {/* Lớp Phủ Màu Tối (Overlay) - Giữ nguyên để chữ dễ đọc */}
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                
                {/* THÊM: Lớp Blur (Làm mờ ảnh nền) - Yêu cầu Tailwind CSS config hỗ trợ backdrop-filter */}
                {/* <div className="absolute inset-0 backdrop-blur-md z-10"></div> */}

                {/* Nội dung Chi tiết Phim */}
                {/* ✅ Xóa ml-23 không tồn tại, dùng ml-8 bên dưới */}
                <div className='relative ml-20 z-20 h-full flex items-center p-8 -z-0'>
                    
                    {/* Poster Phim */}
                    <div className="flex-shrink-0 z-0">
                        <img 
                            src={movie.hinhAnh} 
                            alt={movie.tenPhim} 
                            className="rounded-lg shadow-2xl w-48 h-72 object-cover"
                        />
                    </div>

                    {/* Thông tin Tóm tắt */}
                    <div className='ml-8 text-amber-50'>
                        {/* ✅ Dữ liệu động: tenPhim */}
                        <h1 className='text-4xl font-bold mb-2'>{movie.tenPhim}</h1>
                        
                        <div className="text-xl font-medium mb-4">
                            {/* ✅ Dữ liệu động: danhGia */}
                            <p className="mb-1">⭐️ Đánh giá: {movie.danhGia}/10</p>
                            
                            {/* ✅ Dữ liệu động: ngayKhoiChieu */}
                            <p className="text-base">Ngày khởi chiếu: {formatNgayKhoiChieu(movie.ngayKhoiChieu)}</p>
                        </div>
                        
                        {/* ✅ Dữ liệu động: moTa (dùng line-clamp-4 để giới hạn dòng) */}
                        <p className="text-base max-w-lg mb-4 line-clamp-4">
                            {movie.moTa}
                        </p>

                        {/* Nút Trailer/Đặt vé */}
                        <a 
                            href={movie.trailer}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 inline-block"
                        >
                            XEM TRAILER
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailComponent;