import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListMovieAPI } from "./slice";
import { Link } from "react-router-dom";

const ListMovieComponent = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.ListMovieStore);
  const { loading, data, error } = state || {};

  useEffect(() => {
    dispatch(ListMovieAPI());
  }, []);

  const renderListFilm = () => {
    return data?.map((film) => {
      return (

        <div

          className="group relative overflow-hidden cursor-pointer rounded-2xl w-full aspect-[4/3] md:aspect-[2/3]"
        >
          {/* 1. Hình ảnh */}
          <img
            src={film.hinhAnh}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            alt={film.tenPhim}
          />

          {/* 2. Lớp Overlay (Không thay đổi) */}
          <div
            className="absolute inset-0 bg-black/60 flex flex-col items-center justify-end p-4 md:p-6 
               opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2 md:space-y-3"
          >
            <h3 className="text-white text-base text-[10px]  md:text-xl font-bold tracking-wide text-center">
              {film.tenPhim}
            </h3>

            <hr className="w-1/2 border-t-2 border-white/70" />

            <Link
              to="/news"
              className="px-3 py-1.5 md:px-4 md:py-2 bg-red-600 hover:bg-red-700 text-white text-sm md:text-base font-semibold rounded transition duration-200"
            >
              Detail
            </Link>
          </div>
        </div>
      );
    });
  };

  
  return (
    <div className="container mx-auto px-15 md:px-40 my-4">
      
      <h1 className="text-center text-4xl">Danh sách Film</h1>
    
      <div className="grid md:grid-cols-5 grid-cols-3 gap-4 text-center">
        {renderListFilm()}
      </div>
    </div>
  );
};

export default ListMovieComponent;
