import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DetailAPI } from './slice';
import RapDetailComponent from './RapDetail';

const DetailComponent = () => {
    const params = useParams();
    const { id } = params;
    
    const state = useSelector((state) => state.DetailStore);
    const dispatch = useDispatch();

    const { data, error, loading } = state;

    const movie = data;
    
    useEffect(() => {
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
    
    // Hàm render lịch chiếu phim (Chỉ gọi khi data đã sẵn sàng)
    const renderRap = () => {
        if (data) {
            // ✅ Đảm bảo truyền đủ props cần thiết
            return <RapDetailComponent maPhim={data.maPhim} phimDetail={data} />;
        }
        return null;
    }

    return (
        <div className='container mx-auto'> 
            {/* --- 1. PHẦN HEADER CHI TIẾT PHIM (ẢNH NỀN) --- */}
            <div
                className="relative"
                style={{
                    backgroundImage: `url(${movie.hinhAnh})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    // ✅ Giảm chiều cao trên mobile, giữ 500px trên desktop
                    height: '350px', 
                    '@media (min-width: 768px)': {
                        height: '500px'
                    }
                }}
            >
                {/* Lớp Phủ Màu Tối (Overlay) */}
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                
                {/* Nội dung Chi tiết Phim */}
                <div className='relative z-20 h-full flex flex-col sm:flex-row items-center p-4 sm:p-8'> 
                    
                    {/* Poster Phim */}
                    <div className="flex-shrink-0 mb-4 sm:mb-0"> 
                        <img 
                            src={movie.hinhAnh} 
                            alt={movie.tenPhim} 
                            // ✅ Kích thước Responsive Poster
                            className="rounded-lg shadow-2xl w-32 h-48 sm:w-48 sm:h-72 object-cover"
                        />
                    </div>

                    {/* Thông tin Tóm tắt */}
                    <div className='ml-0 sm:ml-8 text-amber-50 text-center sm:text-left'>
                        {/* Tên Phim */}
                        <h1 className='text-3xl sm:text-4xl font-bold mb-2'>{movie.tenPhim}</h1>
                        
                        <div className="text-md sm:text-xl font-medium mb-4">
                            <p className="mb-1">⭐️ Đánh giá: {movie.danhGia}/10</p>
                            <p className="text-sm sm:text-base">Ngày khởi chiếu: {formatNgayKhoiChieu(movie.ngayKhoiChieu)}</p>
                        </div>
                        
                        {/* Mô tả (Ẩn trên mobile để tiết kiệm không gian) */}
                        <p className="hidden md:block text-base max-w-lg mb-4 line-clamp-4">
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

            {/* --- 2. PHẦN LỊCH CHIẾU PHIM (RapDetailComponent) --- */}
            <div className='my-7 px-2 sm:px-4 md:px-50'> 
                {renderRap()}
            </div>

        </div>
    );
}

export default DetailComponent;