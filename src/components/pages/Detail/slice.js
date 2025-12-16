import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import homeAPI from "../../../service/HomeAPI";


const initialState = {
    loading : false,
    data: null,
    error: null
}

export const DetailAPI = createAsyncThunk (
    "DetaillSlice/Detail", async (maPhim, {rejectWithValue}) => {
        try {
         const response = await homeAPI.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
     
        console.log(response.data.content);
        

         return response.data.content;
       

        } catch (error) {
            return rejectWithValue(error)
        }

    }
)


const DetailSlice = createSlice({
    name : "DetailSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
  builder.addCase(DetailAPI.pending,(state) => {
                state.loading = true
              }) ;
                builder.addCase(DetailAPI.fulfilled,(state,action) => {
                state.loading = false,
                state.data = action.payload
              }) ;
              builder.addCase(DetailAPI.rejected,(state,action) => {
                state.loading = false,
                state.error = action.payload
              }) ;
    }
})



export default DetailSlice.reducer