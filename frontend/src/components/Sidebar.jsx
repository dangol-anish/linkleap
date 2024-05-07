import React from "react";
import logo from "../assets/logo.svg";
import sbDashLogo from "../assets/sidebar/sbDashLogo.svg";
import sbCustomerLogo from "../assets/sidebar/sbCustomerLogo.svg";
import sbCompanyLogo from "../assets/sidebar/sbCompanyLogo.svg";
import sbUserLogo from "../assets/sidebar/sbUserLogo.svg";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <div className="w-[310px] border h-screen">
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
          </ul>
        </section>
        <section></section>
      </div>
    </>
  );
};

export default Sidebar;
