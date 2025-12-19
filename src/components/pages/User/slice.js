import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import AdminAPI from "../../../service/AdminAPI";


const initialState = {
    loading : false,
    data: null,
    error: null
}

export const ListUserAPI = createAsyncThunk (
    "ListUserlSlice/ListUser", async (__ , {rejectWithValue}) => {
        try {
         const response = await AdminAPI.get("QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01");
     
        console.log(response.data.content);
        

         return response.data.content;
       

        } catch (error) {
            return rejectWithValue(error)
        }

    }
)


const ListUserSlice = createSlice({
    name : "ListUserSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
  builder.addCase(ListUserAPI.pending,(state) => {
                state.loading = true
              }) ;
                builder.addCase(ListUserAPI.fulfilled,(state,action) => {
                state.loading = false,
                state.data = action.payload
              }) ;
              builder.addCase(ListUserAPI.rejected,(state,action) => {
                state.loading = false,
                state.error = action.payload
              }) ;
    }
})



export default ListUserSlice.reducer