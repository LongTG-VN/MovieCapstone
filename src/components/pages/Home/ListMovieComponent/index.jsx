import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListMovieAPI } from "./slice";
import { Link } from "react-router-dom";
import { Carousel } from 'antd';

// Cấu hình Carousel tập trung
const carouselSettings = {
  dots: false,
  infinite: true,
  speed: 800,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
  responsive: [
    {
      breakpoint: 1280, // Màn hình Laptop lớn
      settings: { slidesToShow: 4 }
    },
    {
      breakpoint: 1024, // Fix mốc 1020px
      settings: { slidesToShow: 3 }
    },
    {
      breakpoint: 640, // iPhone / Mobile 400px
      settings: { 
        slidesToShow: 2, // Hiển thị 2 cột trên mobile giúp poster không bị quá nhỏ
        arrows: false 
      }
    }
  ]
};

const ListMovieComponent = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.ListMovieStore) || {};

  useEffect(() => {
    dispatch(ListMovieAPI());
  }, [dispatch]);

  const renderCarouselItems = () => {
    return data?.map((film) => (
      console.log(film),
      
      <div key={film.maPhim} className="px-2"> {/* Padding tạo khoảng cách giữa các film */}
        <div className="group relative overflow-hidden cursor-pointer rounded-2xl w-full aspect-[2/3] shadow-lg bg-black">
          
          <img
            src={film.hinhAnh}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            alt={film.tenPhim}
          />

          {/* Overlay: Chỉ xuất hiện khi hover */}
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-end p-4 
                          opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
            
            <h3 className="text-white text-xs md:text-sm lg:text-base font-bold text-center mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform">
              {film.tenPhim}
            </h3>

            <Link
              to={`/detail/${film.maPhim}`}
              className="!inline-block !bg-red-600 hover:!bg-red-700 !text-white !text-[10px] md:!text-xs !font-bold !py-2 !px-4 !rounded !transition-colors !duration-300 !z-20"
            >
              DETAIL
            </Link>
          </div>
        </div>
      </div>
    ));
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="container mx-auto px-4 md:px-10 my-10">
      <h1 className="text-center text-3xl md:text-4xl font-bold mb-8 uppercase tracking-widest text-gray-800">
        Danh sách Film
      </h1>
      
      {/* List Film Carousel */}
      <div className="movie-carousel-wrapper">
        <Carousel {...carouselSettings}>
          {renderCarouselItems()}
        </Carousel>
      </div>

      {/* Tin tức công nghệ */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-red-600 pl-4">Tin tức công nghệ</h2>
        <Carousel autoplay speed={1000} dots={true}>
          <div className="bg-[#364d79] p-6 md:p-12 rounded-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <a href="#" className="bg-white p-6 rounded-xl hover:shadow-2xl transition-shadow block">
                <h5 className="font-bold text-lg mb-2 text-gray-900">Technology 2025</h5>
                <p className="text-gray-600 text-sm">Khám phá sự bùng nổ của AI trong điện ảnh.</p>
              </a>
              {/* Thêm các card khác tương tự */}
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default ListMovieComponent;