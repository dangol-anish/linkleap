import React from "react";
import logo from "../assets/logo.svg";
import sbDashLogo from "../assets/sidebar/sbDashLogo.svg";
import sbCustomerLogo from "../assets/sidebar/sbCustomerLogo.svg";
import sbCompanyLogo from "../assets/sidebar/sbCompanyLogo.svg";
import sbUserLogo from "../assets/sidebar/sbUserLogo.svg";
import logout from "../assets/logout.svg";

import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";

const SidebarSmall = () => {
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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok && data.success === true) {
        localStorage.removeItem("data");
        navigate("/");
      } else {
        throw new Error(data.message || "Logout failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.message || "Logout failed. Please try again.");
    }
  };

  return (
    <>
      <section className="flex px-[24px] py-[16px] md:hidden items-center justify-between border-b-[1px]">
        <Link to="/dashboard">
          <img src={logo} className="h-[32px] w-[32px]" alt="" />
        </Link>

        <ul className="flex  gap-[4px] text-linkleap-gray">
          <li>
            <Link
              className={`flex gap-[12px] px-[8px] py-[8px] items-center  cursor-pointer rounded-[6px] ${
                isActive("/dashboard") && "bg-[#F9FAFB]"
              }`}
              to="/dashboard"
            >
              <img src={sbDashLogo} alt="sbDashLogo" />
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
              </Link>
            </li>
          )}
        </ul>
        <img
          className="cursor-pointer"
          src={logout}
          onClick={onSubmit}
          alt="logoutBtn"
        />
      </section>
    </>
  );
};

export default SidebarSmall;
