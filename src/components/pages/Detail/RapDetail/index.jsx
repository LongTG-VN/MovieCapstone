import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DetailRapAPI } from './slice';
import { Radio, Space, Tabs } from 'antd';

const RapDetailComponent = (props) => {
    // State để điều khiển vị trí Tab Cấp 1 (Hệ thống Rạp)
    const [tabPosition, setTabPosition] = useState('top'); 
    
    const { maPhim, phimDetail } = props;

    const dispatch = useDispatch();
    const state = useSelector((state) => state.DetailRapStore);
    const { data, error, loading } = state;

    useEffect(() => {
        // ✅ FIX: Chỉ gọi API khi maPhim là giá trị hợp lệ
        if (maPhim) {
            dispatch(DetailRapAPI(maPhim));
        }
    }, [dispatch, maPhim]);

    // --------------------------------------------------------
    // --- UTILITY: Chuyển đổi thời gian ISO sang HH:mm ---
    // --------------------------------------------------------
    const Convert = (time) => {
        try {
            const timePart = time.split('T')[1];
            return timePart.split(':').slice(0, 2).join(':');
        } catch (e) {
            return 'N/A';
        }
    };

    // --------------------------------------------------------
    // --- 3. renderLichChieuPhim (Nút Giờ Chiếu) ---
    // --------------------------------------------------------
    const renderLichChieuPhim = (rapChieu) => {
        if (!rapChieu.lichChieuPhim || rapChieu.lichChieuPhim.length === 0) {
            return <p className='text-gray-500'>Không có lịch chiếu.</p>;
        }
        
        return rapChieu.lichChieuPhim.map((phim, i) => {
            const key = phim.maLichChieu || String(i + 1);
            return (
                // ✅ FIX BỐ CỤC: Loại bỏ flex-grow khỏi div bọc
                <div key={key}>
                    <button 
                        className='bg-green-600 hover:bg-green-700 text-white font-medium px-3 py-1 rounded-md transition duration-150 text-sm whitespace-nowrap'
                        // TODO: Thêm onClick để đặt vé
                    >
                        {Convert(phim.ngayChieuGioChieu)}
                    </button>
                </div>
            );
        });
    };

    // --------------------------------------------------------
    // --- 2. renderRap (Tab Cấp 2: Chi nhánh Rạp) ---
    // --------------------------------------------------------
    const renderRap = (rap) => {
        return rap.cumRapChieu?.map((rapChieu, i) => {
            const id = rapChieu.maCumRap || String(i + 1);
            return {
                // Label: Logo + Tên Rạp + Địa chỉ (Dùng Flexbox)
                label: (
                    <div className='px-2 flex items-center space-x-2 text-left'>
                        <div className='flex-shrink-0'>
                            <img src={rap.logo} alt={rap.tenHeThongRap} className="w-10 h-10 object-cover rounded-full" width={40} />
                        </div>
                        <div className='flex-grow min-w-0'>
                            {/* ✅ FIX MẤT CHỮ: Loại bỏ truncate để tên rạp được xuống dòng */}
                            <h3 className="font-semibold text-gray-900 text-sm">
                                {rapChieu.tenCumRap}
                            </h3>
                            {/* Địa chỉ vẫn giữ truncate để giữ Label gọn gàng */}
                            <p className="text-xs text-gray-500 truncate">
                                {rapChieu.diaChi}
                            </p>
                        </div>
                    </div>
                ),
                key: id,
                // Children: Danh sách giờ chiếu
                children: (
                    // ✅ SCROLL NỘI DUNG & RESPONSIVE: Giới hạn chiều cao linh hoạt (vh) và thêm scroll
                    <div className='p-2 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto'> 
                        {/* ✅ FLEX WRAP: Đảm bảo các nút giờ chiếu dồn về trái và xuống dòng */}
                        <div className='flex flex-wrap justify-start gap-2 mt-2'> 
                             {renderLichChieuPhim(rapChieu)}   
                        </div> 
                    </div>
                ),
            }
        })
    }

    // --------------------------------------------------------
    // --- 1. renderRapChieuPhim (Tab Cấp 1: Hệ thống Rạp) ---
    // --------------------------------------------------------
    const renderRapChieuPhim = () => {
        return data?.heThongRapChieu.map((rap, i) => {
            const id = rap.maHeThongRap || String(i + 1);
            return {
                label: <img src={rap.logo} alt={rap.tenHeThongRap} width={50} className='rounded-full' />,
                key: id,
                children: (
                    // ✅ SCROLL TAB HEADER CẤP 2 & RESPONSIVE CONTAINER
                    <div className='p-2 border border-gray-200 bg-white max-h-[50vh] sm:max-h-[70vh] overflow-hidden'>
                        <Tabs
                            tabPosition="left"
                            tabBarStyle={{ 
                                maxHeight: '100%', 
                                overflowY: 'auto', 
                                // Tăng chiều rộng để tên rạp không bị xuống dòng quá nhiều
                                width: '350px' 
                            }}
                            items={renderRap(rap)}
                        />
                    </div>
                ),
            };
        })
    };

    // --------------------------------------------------------
    // --- Xử lý Loading/Error ---
    // --------------------------------------------------------
    if (loading) {
        return <p className="text-center py-10">Đang tải lịch chiếu rạp...</p>;
    }

    if (error || !data || !data.heThongRapChieu) {
        return <p className="text-center py-10 text-red-600">Không tìm thấy lịch chiếu cho phim này.</p>;
    }
    
    // --------------------------------------------------------
    // --- RETURN CHÍNH ---
    // --------------------------------------------------------
    return (
        <div className='mt-8'>
             {/* Điều khiển vị trí Tab Cấp 1 */}
           
             <Tabs
                tabPosition={tabPosition}
                items={renderRapChieuPhim()}
             />
        </div>
    );
};

export default RapDetailComponent;