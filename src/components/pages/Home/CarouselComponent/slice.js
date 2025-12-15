import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import homeAPI from "../../../../service/HomeAPI";


const initialState = {
    loading : false,
    data: null,
    error: null
}

export const ListCarouselAPI = createAsyncThunk (
    "ListCarouselSlice/ListCarousel", async (__ , {rejectWithValue}) => {
        try {
         const response = await homeAPI.get("QuanLyPhim/LayDanhSachBanner");
     
         console.log(response.data.content);
      
         return response.data.content;
       

        } catch (error) {
            return rejectWithValue(error)
        }

    }
)


const ListCarouselSlice = createSlice({
    name : "ListCarouselSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
  builder.addCase(ListCarouselAPI.pending,(state) => {
                state.loading = true
              }) ;
                builder.addCase(ListCarouselAPI.fulfilled,(state,action) => {
                state.loading = false,
                state.data = action.payload
              }) ;
              builder.addCase(ListCarouselAPI.rejected,(state,action) => {
                state.loading = false,
                state.error = action.payload
              }) ;
    }
})



export default ListCarouselSlice.reducer