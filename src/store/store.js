import { configureStore } from "@reduxjs/toolkit";
import  ListCarouselStore  from "../components/pages/Home/CarouselComponent/slice";


const store = configureStore({
    reducer: {
  ListCarouselStore,
    }

})

export default store;