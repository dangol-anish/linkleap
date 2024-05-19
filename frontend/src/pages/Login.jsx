import React from "react";
import loginBanner from "../assets/loginBanner.jpeg";
import logo from "../assets/logo.svg";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userName || !formData.userPassword) {
      toast.error("All input fields are required");
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();

      if (data.success === true) {
        toast.success("Login successful");
        navigate("/dashboard");
        localStorage.setItem("data", JSON.stringify(data.message));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  return (
    <div className="flex h-screen justify-between">
      <div className="flex w-full md:w-[50%] justify-center items-center gap-[60px] flex-col ">
        <div className="flex gap-[16px] items-center justify-start w-[360px]">
          <img src={logo} alt="logoImage" />
          <p className="text-[32px] font-medium ">LinkLeap</p>
        </div>
        <form
          className="flex flex-col w-[360px] gap-[6px] items-start"
          action=""
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-[6px] w-full">
            <label className="text-[14px] text-linkleap-gray" htmlFor="">
              Username
            </label>
            <input
              className="border-[1.5px] border-linkleap-border  rounded-[8px] px-[10px] py-[14px] focus:border-linkleap-login-btn focus:outline-none"
              type="text"
              placeholder="shrijandangol"
              id="userName"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-[6px] w-full">
            <label className="text-[14px] text-linkleap-gray" htmlFor="">
              Password
            </label>
            <input
              className="border-[1.5px] text-linkleap-text border-linkleap-border rounded-[8px] px-[10px] py-[14px] text-[12px] focus:border-linkleap-login-btn focus:outline-none"
              id="userPassword"
              placeholder="&#9679; &#9679; &#9679; &#9679; &#9679;"
              type="password"
              onChange={handleChange}
              autoComplete=""
            />
          </div>
          <input
            className="w-[175px] h-[45px] bg-linkleap-login-btn my-[24px] rounded-[8px] text-white font-semibold cursor-pointer"
            type="submit"
            value="Login"
          />
        </form>
      </div>
      <img
        className="h-full w-[50%] object-cover hidden md:block"
        src={loginBanner}
        alt="loginBannerImage"
      />
    </div>
  );
};

export default Login;
