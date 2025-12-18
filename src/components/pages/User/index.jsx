import React from 'react'

const UserComponent = () => {
  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Header section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 border-l-4 border-brand pl-4">
          Quản lý Người dùng
        </h1>
       <button className="flex items-center px-5 py-2.5 bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white hover:text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all duration-200 cursor-pointer border-none outline-none">
  {/* SVG sử dụng currentColor để tự động đổi màu theo chữ */}
  <svg 
    className="w-5 h-5 mr-2" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path>
  </svg>
  
  {/* Dùng span thay vì p để tránh lỗi hiển thị và dễ kiểm soát màu */}
  <span className="leading-none text-warning-medium">Thêm người dùng</span>
</button>
      </div>

      {/* Table Section */}
      <div className="relative overflow-hidden bg-white shadow-md border border-gray-200 rounded-xl">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold">ID</th>
              <th scope="col" className="px-6 py-4 font-semibold">Username</th>
              <th scope="col" className="px-6 py-4 font-semibold">Email</th>
              <th scope="col" className="px-6 py-4 font-semibold">Phone</th>
              <th scope="col" className="px-6 py-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900">1</td>
              <td className="px-6 py-4">Thái Văn A</td>
              <td className="px-6 py-4">a@gmail.com</td>
              <td className="px-6 py-4 text-gray-600">010101203</td>
              <td className="px-6 py-4">
                <div className="flex justify-center gap-x-4">
                  <button className="cursor-pointer px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    Sửa
                  </button>
                  <button className="cursor-pointer px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                    Xóa
                  </button>
                     
                </div>
              </td>
            </tr>
            {/* Thêm các dòng dữ liệu khác ở đây */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserComponent