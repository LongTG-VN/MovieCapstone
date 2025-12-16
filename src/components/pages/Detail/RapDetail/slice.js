import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import homeAPI from "../../../../service/HomeAPI";


const initialState = {
    loading : false,
    data: null,
    error: null
}

export const DetailRapAPI = createAsyncThunk (
    "DetailRaplSlice/DetailRap", async (maPhim, {rejectWithValue}) => {
        try {
         const response = await homeAPI.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
     
        console.log(response.data.content);
        

         return response.data.content;
       

        } catch (error) {
            return rejectWithValue(error)
        }

    }
)


const DetailRapSlice = createSlice({
    name : "DetailRapSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
  builder.addCase(DetailRapAPI.pending,(state) => {
                state.loading = true
              }) ;
                builder.addCase(DetailRapAPI.fulfilled,(state,action) => {
                state.loading = false,
                state.data = action.payload
              }) ;
              builder.addCase(DetailRapAPI.rejected,(state,action) => {
                state.loading = false,
                state.error = action.payload
              }) ;
    }
})



export default DetailRapSlice.reducer