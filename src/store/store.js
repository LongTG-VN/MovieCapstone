import { configureStore } from "@reduxjs/toolkit";
import  ListCarouselStore  from "../components/pages/Home/CarouselComponent/slice";
import  ListMovieStore  from "../components/pages/Home/ListMovieComponent/slice";
import  RapChieuFilmStore  from "../components/pages/Home/RapChieuPhimComponent/slice";
import  DetailStore from "../components/pages/Detail/slice";
import  DetailRapStore  from "../components/pages/Detail/RapDetail/slice";
import  UserLoginStore  from "../components/pages/Login/slice";
import  MaLichChieuStore  from "../components/pages/Checkout/slice";
import  ListUserStore  from "../components/pages/User/slice";
import  ListPhimStore  from "../components/pages/Phim/slice";
const store = configureStore({
    reducer: {
  ListCarouselStore,
  ListMovieStore,
  RapChieuFilmStore,
  DetailStore,
  DetailRapStore,
  UserLoginStore,
  MaLichChieuStore,
  ListUserStore,
  ListPhimStore,
    }

})

export default store;