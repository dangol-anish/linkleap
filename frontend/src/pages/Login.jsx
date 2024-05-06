import React from "react";
import loginBanner from "../assets/loginBanner.jpeg";
import logo from "../assets/logo.svg";

const Login = () => {
  return (
    <div className="flex h-screen justify-between">
      <div className="flex w-[50%] justify-center items-center gap-[60px] flex-col ">
        <div className="flex gap-[16px] items-center justify-start w-[360px]">
          <img src={logo} alt="logoImage" />
          <p className="text-[32px] font-medium ">LinkLeap</p>
        </div>
        <form
          className="flex flex-col w-[360px] gap-[6px] items-start"
          action=""
        >
          <div className="flex flex-col gap-[6px] w-full">
            <label className="text-[14px] text-linkleap-gray" htmlFor="">
              Username
            </label>

            <input
              className="border-[1.5px] border-linkleap-border  rounded-[8px] px-[10px] py-[14px] "
              type="text"
              placeholder="shrijandangol"
            />
          </div>
          <div className="flex flex-col gap-[6px] w-full">
            <label className="text-[14px] text-linkleap-gray" htmlFor="">
              Password
            </label>

            <input
              className="border-[1.5px] text-linkleap-text border-linkleap-border rounded-[8px] px-[10px] py-[14px] text-[12px]"
              placeholder="&#9679; &#9679; &#9679; &#9679; &#9679;"
              type="password"
            />
          </div>

          <input
            className="w-[175px] h-[45px] bg-linkleap-login-btn my-[24px] rounded-[8px] text-white font-semibold"
            type="submit"
            value="Login"
          />
        </form>
      </div>

      <img
        className="h-full w-[50%] object-cover"
        src={loginBanner}
        alt="loginBannerImage"
      />
    </div>
  );
};

export default Login;
