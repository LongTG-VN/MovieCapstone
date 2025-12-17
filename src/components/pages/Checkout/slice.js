import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import homeAPI from "../../../service/HomeAPI";


const initialState = {
    loading : false,
    data: null,
    error: null
}

export const MaLichChieuAPI = createAsyncThunk (
    "MaLichChieulSlice/MaLichChieu", async (MaLichChieu, {rejectWithValue}) => {
        try {
         const response = await homeAPI.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${MaLichChieu}`);
     
        console.log(response.data.content);
        

         return response.data.content;
       

        } catch (error) {
            return rejectWithValue(error)
        }

    }
)


const MaLichChieuSlice = createSlice({
    name : "MaLichChieuSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
  builder.addCase(MaLichChieuAPI.pending,(state) => {
                state.loading = true
              }) ;
                builder.addCase(MaLichChieuAPI.fulfilled,(state,action) => {
                state.loading = false,
                state.data = action.payload
              }) ;
              builder.addCase(MaLichChieuAPI.rejected,(state,action) => {
                state.loading = false,
                state.error = action.payload
              }) ;
    }
})



export default MaLichChieuSlice.reducer