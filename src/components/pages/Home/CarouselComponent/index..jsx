import React, { useEffect } from "react";
import { Carousel } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { ListCarouselAPI } from "./slice";
const contentStyle = {
  margin: 0,
  // height: '700px',
  background: '#000000',
};

const CarouselComponent = () => {
  const dispatch = useDispatch()

  // Lây dữ liệu trong store
  const state = useSelector((state) => state.ListCarouselStore);

  const { loading, data, error } = state || {};
  // bắt đầu lấy data từ API 
  useEffect(() => {
    dispatch(ListCarouselAPI());
  }, [])

  if (loading) {
    return <h1>Loading</h1>
  }

  if (error) {
    return <h1>đã có lỗi hãy reload lại trang</h1>
  }


  // In ra ảnh trong carousel
  const renderImg = () => {
    return data?.map((banner, index) => {
      return (
        <div key={index}>

          <div style={contentStyle} className="relative w-full overflow-hidden
  aspect-[4/3] 
  
  sm:aspect-video 
  

  lg:aspect-[21/9] ">
            <img
              src={banner.hinhAnh}
              alt={`Banner ${index}`}
              className="absolute block w-full h-full object-contain top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      );
    });
  }


  return (
    <Carousel autoplay>
      {renderImg()}
    </Carousel>
  );
};

export default CarouselComponent;
