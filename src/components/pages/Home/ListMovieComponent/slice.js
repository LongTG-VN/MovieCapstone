import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import homeAPI from "../../../../service/HomeAPI";


const initialState = {
    loading : false,
    data: null,
    error: null
}

export const ListMovieAPI = createAsyncThunk (
    "ListMovielSlice/ListMovie", async (__ , {rejectWithValue}) => {
        try {
         const response = await homeAPI.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
     
        console.log(response.data.content);
        

         return response.data.content;
       

        } catch (error) {
            return rejectWithValue(error)
        }

    }
)


const ListMovieSlice = createSlice({
    name : "ListMovieSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
  builder.addCase(ListMovieAPI.pending,(state) => {
                state.loading = true
              }) ;
                builder.addCase(ListMovieAPI.fulfilled,(state,action) => {
                state.loading = false,
                state.data = action.payload
              }) ;
              builder.addCase(ListMovieAPI.rejected,(state,action) => {
                state.loading = false,
                state.error = action.payload
              }) ;
    }
})



export default ListMovieSlice.reducer