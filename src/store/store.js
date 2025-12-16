import { configureStore } from "@reduxjs/toolkit";
import  ListCarouselStore  from "../components/pages/Home/CarouselComponent/slice";
import  ListMovieStore  from "../components/pages/Home/ListMovieComponent/slice";


const store = configureStore({
    reducer: {
  ListCarouselStore,
  ListMovieStore
    }

})

export default store;