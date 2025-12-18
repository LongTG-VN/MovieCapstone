import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavbarComponent = () => {

  const userString = localStorage.getItem("USER_LOGIN");

// Chuyển chuỗi ngược lại thành Object
  const data = JSON.parse(userString);

const navigate = useNavigate(); // Đừng quên import useNavigate từ react-router-dom

  const handleLogout = () => {
    localStorage.removeItem("USER_LOGIN");
    // Reload lại trang để xóa sạch trạng thái hoặc navigate về home
    window.location.href = "/home";
  };

  const RenderLogin = () => {
    if (data) {
      return (
        <div className="flex items-center space-x-4">
          {/* Hiển thị Avatar bằng chữ cái đầu của tên */}
          <div className="flex items-center space-x-2 border-r border-gray-500 pr-4">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-white text-sm border border-white">
              Hi
            </div>
            <span className="hidden sm:inline text-sm font-medium">
              {data.hoTen}
            </span>
          </div>
          
          {/* Nút Đăng xuất */}
          <button
            onClick={handleLogout}
            className="text-xs font-bold uppercase hover:text-orange-400 transition duration-300"
          >
            Đăng xuất
          </button>
        </div>
      );
    }

    return (
      <NavLink
        to="/login"
        className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2 transition duration-300"
      >
        Login
      </NavLink>
    );
  };

  return (
    <nav className="fixed w-full z-20 top-0 start-0 bg-black/50 text-white  z-50 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
        <NavLink
          to="/home"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://login.cybersoft.edu.vn/static/media/logoCyber.19572302.png"
            className="h-7 text-white"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl text-white font-semibold whitespace-nowrap">
            Cyber Movie
          </span>
        </NavLink>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {RenderLogin()}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={2}
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
          style={{alignItems:"center"}}
        >
          <ul className="flex flex-col gap-y-3 p-4 md:p-0 !mt-4 font-medium border border-default rounded-base  md:space-x-8 rtl:space-x-reverse md:flex-row md:border-0" >
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? "block  py-2 px-3 text-white bg-brand rounded-sm md:bg-transparent md:text-fg-brand md:p-0"
                    : "block py-2 px-3 text-white rounded hover:bg-neutral-tertiary hover:text-black md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                }
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/news"
                className={({ isActive }) =>
                  isActive
                    ? "block  py-2 px-3 text-white bg-brand rounded-sm md:bg-transparent md:text-fg-brand md:p-0"
                    : "block py-2 px-3 text-white rounded hover:bg-neutral-tertiary hover:text-black md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                }
              >
                News
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "block  py-2 px-3 text-white bg-brand rounded-sm md:bg-transparent md:text-fg-brand md:p-0"
                    : "block py-2 px-3 text-white rounded hover:bg-neutral-tertiary hover:text-black md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent"
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
