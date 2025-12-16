import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import homeAPI from "../../../../service/HomeAPI";


const initialState = {
    loading : false,
    data: null,
    error: null
}

export const RapChieuFilmAPI = createAsyncThunk (
    "RapChieuFilmlSlice/RapChieuFilm", async (__ , {rejectWithValue}) => {
        try {
         const response = await homeAPI.get("QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01");
         
         console.log(response.data.content);
         
         
         
        
        

         return response.data.content;
       

        } catch (error) {
            return rejectWithValue(error)
        }

    }
)


const RapChieuFilmSlice = createSlice({
    name : "RapChieuFilmSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
  builder.addCase(RapChieuFilmAPI.pending,(state) => {
                state.loading = true
              }) ;
                builder.addCase(RapChieuFilmAPI.fulfilled,(state,action) => {
                state.loading = false,
                state.data = action.payload
              }) ;
              builder.addCase(RapChieuFilmAPI.rejected,(state,action) => {
                state.loading = false,
                state.error = action.payload
              }) ;
    }
})



export default RapChieuFilmSlice.reducer