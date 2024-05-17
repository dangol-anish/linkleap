import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalCompanies: 0,
    totalCustomers: 0,
    totalDealValueUSD: 0,
  });

  const getDashboardData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/dashboard/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setDashboardData(data.message);
    } catch (error) {
      toast.error("Error", error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);
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
          </div>
          <div className="w-full h-[16%] flex justify-around">
            <div className="w-[30%] border rounded-[8px] h-full p-[24px]  flex flex-col gap-[24px] justify-center">
              <p className="text-[16px] font-medium">Total Customers</p>
              <p className="text-[36px]">{dashboardData.totalCustomers}</p>
            </div>
            <div className="w-[30%] border rounded-[8px] h-full p-[24px]  flex flex-col gap-[24px] justify-center">
              <p className="text-[16px] font-medium">Total Companies</p>
              <p className="text-[36px]">{dashboardData.totalCompanies}</p>
            </div>
            <div className="w-[30%] border rounded-[8px] h-full p-[24px] flex flex-col gap-[24px] justify-center">
              <p className="text-[16px] font-medium">Deal Value</p>
              <p className="text-[36px]">
                ${dashboardData.totalDealValueUSD.toFixed(2)}
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
