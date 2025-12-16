import React, { useEffect, useState } from "react";
import { Radio, Space, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RapChieuFilmAPI } from "./slice";

const RacChieuPhimComponent = () => {
  const [tabPlacement, setTabPlacement] = useState("start");

  const changeTabPlacement = (e) => {
    setTabPlacement(e.target.value);
  };

  const dispatch = useDispatch();

  const state = useSelector((state) => state.RapChieuFilmStore);

  const { data, error, loading } = state || {};

  const renderLogo = () => {
    return data?.map((rap, i) => {
      const MaRap = `${i + 1}`;
      return {
        // Label Tab Cấp 1: Logo Hệ thống Rạp
        label: (
          <img src={rap.logo} alt="" width={50} className="rounded-full" />
        ),
        key: MaRap,

        // Children Tab Cấp 1: Tab Lồng (Tab Cấp 2)
       children: (
        <div className="p-4 border border-gray-200 bg-white">
          <Tabs
            tabPosition="left"
            // 🛑 BƯỚC 1: Dùng tabBarStyle để giới hạn chiều cao cột Tab và thêm scroll 
            tabBarStyle={{ 
              maxHeight: '500px', // Đặt chiều cao tối đa cho cột Tab (VD: 500px)
              width: '400px',     // Giới hạn chiều rộng cột Tab (Đã fix trước đó)
            }}
            // BƯỚC 2: Thêm class CSS cho toàn bộ Tabs container (Optional)
            items={renderListCumRap(rap)}
          />
        </div>
      ),
      };
    });
  };

  const renderLichFilm = (cumRap) => {
    return cumRap.danhSachPhim?.map((phim) => {
      return (
        <div
          // max-w-xs (max-width: 320px) giúp giới hạn độ rộng của Label Tab
          className="w-full text-left py-2 px-1 w-auto hover:bg-gray-100 transition duration-150 flex items-start space-x-2"
        >
          <div>
            <img
              src={phim.hinhAnh}
              className="flex-shrink-0 w-10 h-10 object-cover"
            />
            <img
              src="https://previews.123rf.com/images/smith1979/smith19791801/smith1979180100070/94195098-2d-custom-logotype-vector-design.avif"
              className="flex-shrink-0 w-10 h-10 object-cover mt-2"
            />
          </div>

          {/* 2. Container cho Văn bản (Text sẽ tự động wrap nếu quá dài) */}
          <div className="w-auto">
            <h4 className="font-semibold text-gray-900 text-xl">
              {phim.tenPhim}
            </h4>
            {/* Địa chỉ vẫn giữ truncate w-40 nếu cần */}
            <div class="grid grid-cols-5 gap-2">
             {renderLichChieuPhim(phim)}
            </div>
          </div>
        </div>
      );
    });
  };

  const Convert = (time) => {
   const timePart = time.split('T')[1]; // Kết quả: "20:00:00"

// 2. Tách chuỗi thời gian tại ':' và lấy hai phần tử đầu tiên (giờ và phút)
const gioPhut = timePart.split(':').slice(0, 2).join(':');

return gioPhut;
  }

  const renderLichChieuPhim = (phim) => {
    return phim.lstLichChieuTheoPhim?.map((lichChieu) => {
        
      return (
        <div><button type="button" class="text-white ml-2 bg-success box-border border border-transparent hover:bg-success-strong focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-0.5 focus:outline-none">{Convert(lichChieu.ngayChieuGioChieu) }</button>
        </div>
        
      )
    });
  };

  const renderListCumRap = (rap) => {
    return rap.lstCumRap?.map((cumRap, y) => {
      // Key Cấp 2: Kết hợp mã hệ thống và index để đảm bảo KHÔNG BỊ TRÙNG
      console.log(cumRap.danhSachPhim);

      const lstCumRap = `${y + 1}`;
      return {
        // 1. Label Tab Cấp 2: Hiển thị Tên Chi nhánh Rạp
        label: (
          // 🛑 SỬA: Thêm max-w-sm hoặc max-w-xs vào container này
          <div
            // max-w-xs (max-width: 320px) giúp giới hạn độ rộng của Label Tab
            className="w-auto text-left py-2 px-1 hover:bg-gray-100 transition duration-150 flex items-center space-x-2"
          >
            <img
              src={rap.logo}
              alt={cumRap.tenCumRap || "Logo Rạp"}
              className="rounded-full flex-shrink-0 w-10 h-10 object-cover"
            />

            {/* 2. Container cho Văn bản (Text sẽ tự động wrap nếu quá dài) */}
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">
                {cumRap.tenCumRap}
              </h4>
              {/* Địa chỉ vẫn giữ truncate w-40 nếu cần */}
              <p className="text-xs text-gray-500 truncate w-40">
                {cumRap.diaChi}
              </p>
            </div>
          </div>
        ),
        key: lstCumRap,

        // 2. Nội dung Tab Cấp 2 (Lịch Chiếu)
       children: (
          <div 
            // ✅ SỬA: Dùng max-h-[500px] để giới hạn chiều cao và hiển thị thanh scroll
            // Giá trị 500px này có thể được điều chỉnh (ví dụ: max-h-[70vh])
            className="p-4 bg-white max-h-[500px] overflow-y-auto"
          >
            {/* Nội dung danh sách phim */}
            {renderLichFilm(cumRap)} 
          </div>
        ),
      };
    });
  };

  useEffect(() => {
    dispatch(RapChieuFilmAPI());
  }, []);

  return (
    <div className="container mx-auto px-15 md:px-40 my-4 ">
      <h1 className="text-center text-4xl">Rạp Chiếu Film</h1>
      <Tabs
        tabPlacement={tabPlacement} // Giả sử tabPlacement đã được định nghĩa
        items={renderLogo()}
      />
    </div>
  );
};

export default RacChieuPhimComponent;
