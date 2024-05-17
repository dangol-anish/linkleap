import React from "react";
import logo from "../assets/logo.svg";
import sbDashLogo from "../assets/sidebar/sbDashLogo.svg";
import sbCustomerLogo from "../assets/sidebar/sbCustomerLogo.svg";
import sbCompanyLogo from "../assets/sidebar/sbCompanyLogo.svg";
import sbUserLogo from "../assets/sidebar/sbUserLogo.svg";
import logout from "../assets/logout.svg";
import avatar from "../assets/avatar.svg";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("data"));
  const userType = userData.user_type;

  const isActive = (path) => {
    return location.pathname === path;
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok && data.success === true) {
        localStorage.removeItem("data");
        navigate("/login");
      } else {
        throw new Error(data.message || "Logout failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Logout failed. Please try again.");
    }
  };

  return (
    <>
      <div className="min-w-[310px] border border-linkleap-border min-h-screen flex flex-col justify-between">
        <section className="flex flex-col gap-[24px] px-[24px] py-[32px]">
          <div className="flex items-center gap-[8px] ">
            <img src={logo} className="h-[32px] w-[32px]" alt="" />
            <p className="text-[20px] font-medium">LinkLeap</p>
          </div>
          <ul className="flex flex-col gap-[4px]">
            <li>
              <Link
                className={`flex gap-[12px] px-[8px] py-[8px] items-center cursor-pointer rounded-[6px] ${
                  isActive("/dashboard") && "bg-[#F9FAFB]"
                }`}
                to="/dashboard"
              >
                <img src={sbDashLogo} alt="sbDashLogo" />
                <p className="text-[16px] font-medium">Dashboard</p>
              </Link>
            </li>
            <li>
              <Link
                className={`flex gap-[12px] px-[8px] py-[8px] items-center cursor-pointer rounded-[6px] ${
                  isActive("/customer") && "bg-[#F9FAFB]"
                }`}
                to="/customer"
              >
                <img src={sbCustomerLogo} alt="sbCustomerLogo" />
                <p className="text-[16px] font-medium">Customers</p>
              </Link>
            </li>
            <li>
              <Link
                className={`flex gap-[12px] px-[8px] py-[8px] items-center cursor-pointer rounded-[6px] ${
                  isActive("/company") && "bg-[#F9FAFB]"
                }`}
                to="/company"
              >
                {" "}
                <img src={sbCompanyLogo} alt="sbCompanyLogo" />
                <p className="text-[16px] font-medium">Companies</p>
              </Link>
            </li>
            {userType === "superadmin" && (
              <li>
                <Link
                  className={`flex gap-[12px] px-[8px] py-[8px] items-center cursor-pointer rounded-[6px] ${
                    isActive("/user") && "bg-[#F9FAFB]"
                  }`}
                  to="/user"
                >
                  <img src={sbUserLogo} alt="sbCompanyLogo" />
                  <p className="text-[16px] font-medium">Users</p>
                </Link>
              </li>
            )}
          </ul>
        </section>
        <section className="flex justify-between px-[16px] py-[24px] border-t-[1px] border-linkleap-border items-center">
          <div className="flex gap-[12px] px-[8px] justify-between">
            <div className="text-[14px]">
              <p className="font-medium">{userData.user_display_name}</p>
              <p>{userData.user_email}</p>
            </div>
          </div>

          <img
            className="cursor-pointer w-[20px] h-[20px]"
            src={logout}
            onClick={onSubmit}
            alt="logoutBtn"
          />
        </section>
      </div>
    </>
  );
};

export default Sidebar;
