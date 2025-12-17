import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import homeAPI from "../../../service/HomeAPI";

const userString = localStorage.getItem("USER_LOGIN");

// Chuyển chuỗi ngược lại thành Object
const data = JSON.parse(userString);

const initialState = {
    loading : false,
    data,
    error: null
}

export const UserLoginAPI = createAsyncThunk (
    "UserLoginlSlice/UserLogin", async (user , {rejectWithValue}) => {
        try {
         const response = await homeAPI.post("QuanLyNguoiDung/DangNhap",user);
     
        console.log(response.data.content);
        

         return response.data.content;
       

        } catch (error) {
            return rejectWithValue(error)
        }

    }
)


const UserLoginSlice = createSlice({
    name : "UserLoginSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
  builder.addCase(UserLoginAPI.pending,(state) => {
                state.loading = true
              }) ;
                builder.addCase(UserLoginAPI.fulfilled,(state,action) => {
                state.loading = false,
                state.data = action.payload
              }) ;
              builder.addCase(UserLoginAPI.rejected,(state,action) => {
                state.loading = false,
                state.error = action.payload
              }) ;
    }
})



export default UserLoginSlice.reducer