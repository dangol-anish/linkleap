import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { ChartGraph } from "../utils/chart";
import moment from "moment";
import SidebarSmall from "../components/SidebarSmall";

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
      const res = await fetch("/api/dashboard/", {
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
    <main className="flex flex-col md:flex-row min-h-screen">
      <SidebarSmall />
      <Sidebar />
      <section className="w-full p-4 md:p-8">
        <div className="flex flex-col md:flex-row w-full mb-8 justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-medium">Dashboard</h2>
            <p className="text-gray-500">
              Track, manage, and forecast your customer and orders.
            </p>
          </div>
        </div>
        {data.success ? (
          <div className="flex flex-col md:flex-row w-full h-auto md:h-1/6 justify-around space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/3 border rounded-lg p-6 flex flex-col gap-4 justify-center">
              <p className="text-lg font-medium">Total Customers</p>
              <p className="text-3xl">{dashboardData.totalCustomers}</p>
            </div>
            <div className="w-full md:w-1/3 border rounded-lg p-6 flex flex-col gap-4 justify-center">
              <p className="text-lg font-medium">Total Companies</p>
              <p className="text-3xl">{dashboardData.totalCompanies}</p>
            </div>
            <div className="w-full md:w-1/3 border rounded-lg p-6 flex flex-col gap-4 justify-center">
              <p className="text-lg font-medium">Deal Value</p>
              <p className="text-3xl">
                ${dashboardData.totalDealValueUSD.toFixed(0)}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row w-full h-auto md:h-1/6 justify-around space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/3 border rounded-lg p-6 flex flex-col gap-4 justify-center">
              <p className="text-lg font-medium">Total Customers</p>
              <p className="text-3xl">0</p>
            </div>
            <div className="w-full md:w-1/3 border rounded-lg p-6 flex flex-col gap-4 justify-center">
              <p className="text-lg font-medium">Total Companies</p>
              <p className="text-3xl">0</p>
            </div>
            <div className="w-full md:w-1/3 border rounded-lg p-6 flex flex-col gap-4 justify-center">
              <p className="text-lg font-medium">Deal Value</p>
              <p className="text-3xl">0</p>
            </div>
          </div>
        )}
        <div className="w-full h-64 md:h-96 my-8">
          {chartData && <ChartGraph data={chartData} />}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
