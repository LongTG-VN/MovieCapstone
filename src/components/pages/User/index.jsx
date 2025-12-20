import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddUserAPI, DeleteUserAPI, ListUserAPI ,UpdateUserAPI} from './slice';

const UserComponent = () => {
  const state = useSelector((state) => state.ListUserStore);
  const dispatch = useDispatch();
  const { data, error, loading } = state;
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // State kiểm soát đóng mở Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
// Thêm state này vào component
const [editUser, setEditUser] = useState(null);
const handleOpenEdit = (user) => {
  console.log("Dữ liệu dòng này:", user); // Kiểm tra console xem có data không
 // [QUAN TRỌNG]: Đổ dữ liệu vào State dành riêng cho Edit
  setEditUser({
    taiKhoan: user.taiKhoan || "",
    hoTen: user.hoTen || "",
    email: user.email || "",
    soDt: user.soDt || user.soDT || "", // Chú ý soDt/soDT tùy API
    maNhom: "GP01",
    maLoaiNguoiDung: user.maLoaiNguoiDung || "KhachHang",
    matKhau: user.matKhau || "" 
  });
  
  setIsEditModalOpen(true); // Mở modal sau khi đã set state
};

// Đừng quên reset lại form khi bấm nút "Thêm người dùng" mới
const handleOpenAdd = () => {
  setEditUser(null);
  setAddUser({
    taiKhoan: "", matKhau: "", email: "", 
    soDt: "", maNhom: "GP01", maLoaiNguoiDung: "KhachHang", hoTen: ""
  });
  setIsModalOpen(true);
};

  const handleDeleteUser = (taiKhoan) => {
    if (window.confirm(`Bạn có chắc muốn xóa người dùng ${taiKhoan}?`)) {
      dispatch(DeleteUserAPI(taiKhoan));
    }
  };

  const [addUSer, setAddUser] = useState({
    taiKhoan: null,
    matKhau: null,
    email: null,
    soDt: null,
    maNhom: "GP01",
    maLoaiNguoiDung: "KhachHang",
    hoTen: null
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddUser({
      ...addUSer,
      [name]: value
    })
  }



  const handSubmit = (e) => {
    e.preventDefault();

    dispatch(AddUserAPI(addUSer))
      .unwrap() // Giúp bắt kết quả thành công/thất bại từ Thunk
      .then(() => {
        dispatch(ListUserAPI());
        // 1. Đóng modal
        setIsModalOpen(false);

        // 2. Reset state về ban đầu
        setAddUser({
          taiKhoan: "",
          matKhau: "",
          email: "",
          soDt: "",
          maNhom: "GP01",
          maLoaiNguoiDung: "KhachHang",
          hoTen: ""
        });
      }

      )

      .catch((err) => {
        // Không cần đóng modal nếu lỗi để user sửa lại
        console.error("Lỗi khi thêm:", err);
      });
  };
  useEffect(() => {
    dispatch(ListUserAPI());
  }, []);
  console.log(addUSer);

const handleEditChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(UpdateUserAPI(editUser)).unwrap().then(() => {
      setIsEditModalOpen(false);
      dispatch(ListUserAPI()); // Reload để lấy data mới nhất từ server
    });
  };

  const renderUser = () => {
    return data?.map((user, index) => (
      <tr key={user.taiKhoan} className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
        <td className="px-6 py-4">{user.hoTen}</td>
        <td className="px-6 py-4">{user.email}</td>
        <td className="px-6 py-4 text-gray-600">{user.soDT}</td>
        <td className="px-6 py-4">
          <div className="flex justify-center gap-x-4">
            <button onClick={() => handleOpenEdit(user)}  className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              Sửa
            </button>
            <button
              onClick={() => handleDeleteUser(user.taiKhoan)}
              className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              Xóa
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4">
          Quản lý Người dùng
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-lg transition-all"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
          </svg>
          Thêm người dùng
        </button>
      </div>

      {/* Modal - Conditional Rendering */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative p-4 w-full max-w-md bg-white rounded-xl shadow-2xl">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-xl font-semibold text-gray-900">Thêm người dùng mới</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-4 mt-4 " onSubmit={handSubmit}>
              <div>
                <label className="block mb-1 text-sm font-medium">Tài khoản</label>
                <input onChange={handleChange} type="text" name='taiKhoan' className="w-full p-2.5 border rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Username" required />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Họ tên</label>
                <input onChange={handleChange} type="text" name='hoTen' className="w-full p-2.5 border rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Nguyễn Văn A" required />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Email</label>
                <input onChange={handleChange} type="email" name='email' className="w-full p-2.5 border rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" required />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">số điện thoại</label>
                <input onChange={handleChange} type="text" name='soDt' className="w-full p-2.5 border rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="0xxxxxxxxx" required />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">mật khẩu</label>
                <input onChange={handleChange} type="password" name='matKhau' className="w-full p-2.5 border rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="mật khẩu" required />
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">Lưu thông tin</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-full py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200">Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 border-t-4 border-orange-500">
            <h3 className="text-xl font-bold mb-4">Cập nhật thông tin</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 uppercase font-bold">Tài khoản (ID)</label>
                <input name="taiKhoan" value={editUser.taiKhoan} disabled className="w-full p-2.5 border rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase font-bold">Họ tên</label>
                <input name="hoTen" value={editUser.hoTen} onChange={handleEditChange} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500" required />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase font-bold">Email</label>
                <input name="email" value={editUser.email} onChange={handleEditChange} type="email" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500" required />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase font-bold">Số điện thoại</label>
                <input name="soDt" value={editUser.soDt} onChange={handleEditChange} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-orange-500" required />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-orange-500 text-white py-2.5 rounded-lg shadow-md hover:bg-orange-600">Cập nhật</button>
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 bg-gray-100 py-2.5 rounded-lg">Đóng</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-4">STT</th>
              <th className="px-6 py-4">Họ Tên</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Số ĐT</th>
              <th className="px-6 py-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan="5" className="text-center py-10">Đang tải dữ liệu...</td></tr>
            ) : renderUser()}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserComponent;