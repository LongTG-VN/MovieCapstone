import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import AdminAPI from "../../../service/AdminAPI";


const initialState = {
    loading: false,
    data: null,
    error: null
}

export const ListUserAPI = createAsyncThunk(
    "ListUserlSlice/ListUser", async (__, { rejectWithValue }) => {
        try {
            const response = await AdminAPI.get("QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01");

            console.log(response.data.content);


            return response.data.content;


        } catch (error) {
            return rejectWithValue(error)
        }

    }
)

export const DeleteUserAPI = createAsyncThunk(
    "ListUserSlice/DeleteUser", 
    async (taiKhoan, { rejectWithValue }) => {
        try {
            // Kiểm tra lại .get hay .delete tùy theo API của bạn nhé
            await AdminAPI.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
            console.log(taiKhoan);
            
            return taiKhoan; // Trả về tài khoản để filter dưới slice
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


const ListUserSlice = createSlice({
    name: "ListUserSlice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(ListUserAPI.pending, (state) => {
            state.loading = true
        });
        builder.addCase(ListUserAPI.fulfilled, (state, action) => {
            state.loading = false,
                state.data = action.payload
        });
        builder.addCase(ListUserAPI.rejected, (state, action) => {
            state.loading = false,
                state.error = action.payload
        });
         builder.addCase(DeleteUserAPI.pending,(state) => {
                state.loading = true
              }) ;
              builder.addCase(DeleteUserAPI.fulfilled, (state, action) => {
    state.loading = false;
    // Lọc bỏ user có taiKhoan trùng với payload đã return từ Thunk
    if (state.data) {
        state.data = state.data.filter(user => user.taiKhoan !== action.payload);
    }
    alert("Xóa người dùng thành công!");
});
              builder.addCase(DeleteUserAPI.rejected,(state,action) => {
                state.loading = false,
                state.error = action.payload
              }) ;


    }
})



export default ListUserSlice.reducer