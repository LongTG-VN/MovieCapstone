import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import AdminAPI from "../../../service/AdminAPI";

const initialState = {
    loading : false,
    data: null,
    error: null
}

export const ListPhimAPI = createAsyncThunk (
    "ListPhimlSlice/ListPhim", async (__ , {rejectWithValue}) => {
        try {
         const response = await AdminAPI.get("QuanLyPhim/LayDanhSachPhim");
     
        console.log(response.data.content);
        

         return response.data.content;
       

        } catch (error) {
            return rejectWithValue(error)
        }

    }
)


const ListPhimSlice = createSlice({
    name : "ListPhimSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
  builder.addCase(ListPhimAPI.pending,(state) => {
                state.loading = true
              }) ;
                builder.addCase(ListPhimAPI.fulfilled,(state,action) => {
                state.loading = false,
                state.data = action.payload
              }) ;
              builder.addCase(ListPhimAPI.rejected,(state,action) => {
                state.loading = false,
                state.error = action.payload
              }) ;
    }
})



export default ListPhimSlice.reducer