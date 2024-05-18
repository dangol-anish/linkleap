import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { ChartGraph } from "../utils/chart";
import moment from "moment";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalCompanies: 0,
    totalCustomers: 0,
    totalDealValueUSD: 0.0,
  });

  const [data, setData] = useState({ success: false });
  const [chartData, setChartData] = useState(null);
  const prepareChartData = (data) => {
    const labels = data.map((item) =>
      moment(item.last_updated).format("MM-DD HH")
    );
    const customers = data.map((item) => parseInt(item.total_customers));
    const companies = data.map((item) => parseInt(item.total_companies));

    return { labels, customers, companies };
  };

  const getDashboardData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/dashboard/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const responseData = await res.json();
      setData({ success: responseData.success });
      setDashboardData(responseData.message);

      const preparedChartData = prepareChartData(responseData.data);
      setChartData(preparedChartData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    getDashboardData();

    const interval = setInterval(() => {
      getDashboardData();
    }, 60000);

    return () => clearInterval(interval);
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
          {data.success ? (
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
          ) : (
            <div className="w-full  h-[16%] flex justify-around">
              <div className="w-[30%] border rounded-[8px] h-full p-[24px]  flex flex-col gap-[24px] justify-center">
                <p className="text-[16px] font-medium">Total Customers</p>
                <p className="text-[36px]">0</p>
              </div>
              <div className="w-[30%] border rounded-[8px] h-full p-[24px]  flex flex-col gap-[24px] justify-center">
                <p className="text-[16px] font-medium">Total Companies</p>
                <p className="text-[36px]">0</p>
              </div>
              <div className="w-[30%] border rounded-[8px] h-full p-[24px] flex flex-col gap-[24px] justify-center">
                <p className="text-[16px] font-medium">Deal Value</p>
                <p className="text-[36px]">0</p>
              </div>
            </div>
          )}
          <div className=" h-[40vh] w-full flex  my-[32px] px-[32px]">
            {chartData && <ChartGraph data={chartData} />}{" "}
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
