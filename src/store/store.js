import { configureStore } from "@reduxjs/toolkit";
import  ListCarouselStore  from "../components/pages/Home/CarouselComponent/slice";
import  ListMovieStore  from "../components/pages/Home/ListMovieComponent/slice";
import  RapChieuFilmStore  from "../components/pages/Home/RapChieuPhimComponent/slice";
import  DetailStore from "../components/pages/Detail/slice";

const store = configureStore({
    reducer: {
  ListCarouselStore,
  ListMovieStore,
  RapChieuFilmStore,
  DetailStore,
    }

})

export default store;