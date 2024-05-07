import React from "react";
import Sidebar from "../components/Sidebar";
import sbAdd from "../assets/sidebar/sbAdd.svg";

const Dashboard = () => {
  return (
    <>
      <main className="flex min-h-screen">
        <Sidebar />
        <section className="w-full">
          <div className="flex w-full my-[32px] px-[32px] justify-between">
            <div>
              <h2 className="text-[30px] font-medium">Dashboard</h2>
              <p className="text-linkleap-gray">
                Track, manage, and forecast your customer and orders.
              </p>
            </div>
            <button className="bg-linkleap-login-btn flex gap-[8px] rounded-[8px] justify-center items-center px-[16px] py-[10px] h-[40px]">
              <img src={sbAdd} alt="sbAdd" />
              <span className="text-[14px] font-medium text-white">Add</span>
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
