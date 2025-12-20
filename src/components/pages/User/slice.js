import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AdminAPI from "../../../service/AdminAPI";

const initialState = {
    loading: false,
    data: null,
    error: null,
};

// 1. API Lấy danh sách người dùng
export const ListUserAPI = createAsyncThunk(
    "ListUserSlice/ListUser",
    async (__, { rejectWithValue }) => {
        try {
            const response = await AdminAPI.get("QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01");
            return response.data.content;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// 2. API Xóa người dùng
export const DeleteUserAPI = createAsyncThunk(
    "ListUserSlice/DeleteUser",
    async (taiKhoan, { rejectWithValue }) => {
        try {
            await AdminAPI.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
            return taiKhoan; // Trả về tài khoản để filter ở reducer
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// 3. API Thêm người dùng
export const AddUserAPI = createAsyncThunk(
    "ListUserSlice/AddUser",
    async (user, { rejectWithValue }) => {
        try {
            const response = await AdminAPI.post(`QuanLyNguoiDung/ThemNguoiDung`, user);
            alert("Thêm người dùng thành công!");
            return response.data.content; 
        } catch (error) {
            alert(error.response?.data?.content || "Thêm thất bại");
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// 4. API Cập nhật thông tin người dùng
export const UpdateUserAPI = createAsyncThunk(
    "ListUserSlice/UpdateUser",
    async (user, { rejectWithValue }) => {
        try {
            // API CyberSoft dùng POST cho cập nhật
            const response = await AdminAPI.post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", user);
            alert("Cập nhật thành công!");
            return response.data.content;
        } catch (error) {
            alert(error.response?.data?.content || "Cập nhật thất bại");
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const ListUserSlice = createSlice({
    name: "ListUserSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Xử lý ListUser
            .addCase(ListUserAPI.pending, (state) => {
                state.loading = true;
            })
            .addCase(ListUserAPI.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(ListUserAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Xử lý DeleteUser
            .addCase(DeleteUserAPI.fulfilled, (state, action) => {
                if (state.data) {
                    state.data = state.data.filter((user) => user.taiKhoan !== action.payload);
                }
                alert("Xóa thành công!");
            })

            // Xử lý AddUser
            .addCase(AddUserAPI.pending, (state) => {
                state.loading = true;
            })
            .addCase(AddUserAPI.fulfilled, (state, action) => {
                state.loading = false;
                // Thêm trực tiếp vào mảng data để UI cập nhật ngay
                if (state.data) {
                    state.data.push(action.payload);
                }
            })
            .addCase(AddUserAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Xử lý UpdateUser
            .addCase(UpdateUserAPI.pending, (state) => {
                state.loading = true;
            })
            .addCase(UpdateUserAPI.fulfilled, (state, action) => {
                state.loading = false;
                if (state.data) {
                    // Tìm vị trí user vừa cập nhật và thay thế dữ liệu mới
                    const index = state.data.findIndex(u => u.taiKhoan === action.payload.taiKhoan);
                    if (index !== -1) {
                        state.data[index] = action.payload;
                    }
                }
            })
            .addCase(UpdateUserAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default ListUserSlice.reducer;