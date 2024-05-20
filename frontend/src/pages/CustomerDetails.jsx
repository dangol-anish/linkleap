import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
import { getCurrencySymbol } from "../utils/currencyConverter";
import SidebarSmall from "../components/SidebarSmall";

const CustomerDetails = () => {
  const [currentCustomerData, setCurrentCustomerData] = useState({});
  const [currentCustomerLogs, setCurrentCustomerLogs] = useState([]);

  const { customerId } = useParams();

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const day = date.getUTCDate();
    const month = date.toLocaleString("en-US", {
      month: "short",
      timeZone: "UTC",
    });
    const year = date.getUTCFullYear();

    return `${hours}:${minutes} ${month} ${day} ${year}`;
  }

  useEffect(() => {
    const getCurrentCustomerData = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/customer/getCurrentCustomerData/${customerId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await res.json();

        if (data.success === true) {
          setCurrentCustomerData(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Error: " + error);
      }
    };
    getCurrentCustomerData();
  }, [customerId]);

  useEffect(() => {
    const getCustomerLogs = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/customer/getCustomerLogs/${customerId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await res.json();

        if (data.success === true) {
          setCurrentCustomerLogs(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Error: " + error);
      }
    };
    getCustomerLogs();
  }, []);

  return (
    <>
      <main className="flex flex-col lg:flex-row min-h-screen">
        <SidebarSmall />
        <Sidebar />

        <section className="w-full flex flex-col">
          <header className="flex w-full py-8 px-8 border-b-[1px]">
            <div>
              <h2 className="text-2xl font-medium">Customers</h2>
              <p className="text-gray-500">
                Track, manage, and forecast your customer and orders.
              </p>
            </div>
          </header>
          <div className="flex flex-col md:flex-row h-full w-full">
            <div className="w-full md:w-1/3 py-4 px-8 flex flex-col gap-6 border-b md:border-b-0 md:border-r border-gray-300">
              <label className="flex flex-col gap-2 w-full">
                <p className="text-sm font-medium">Name</p>
                <p className="w-full px-4 py-2 border rounded-md">
                  {currentCustomerData.customerName}
                </p>
              </label>
              <label className="flex flex-col gap-2 w-full">
                <p className="text-sm font-medium">Email</p>
                <p className="w-full px-4 py-2 border rounded-md">
                  {currentCustomerData.customerEmail}
                </p>
              </label>
              <label className="flex flex-col gap-2 w-full">
                <p className="text-sm font-medium">Job Title</p>
                <p className="w-full px-4 py-2 border rounded-md">
                  {currentCustomerData.customerJobTitle}
                </p>
              </label>
              <label className="flex flex-col gap-2 w-full">
                <p className="text-sm font-medium">Deal Value</p>
                <p className="w-full px-4 py-2 border rounded-md">
                  {getCurrencySymbol(currentCustomerData.dealValueCurrency)}{" "}
                  {currentCustomerData.customerDealValue}
                </p>
              </label>
              <label className="flex flex-col gap-2 w-full">
                <p className="text-sm font-medium">Company</p>
                <p className="w-full px-4 py-2 border rounded-md">
                  {currentCustomerData.customerCompany}
                </p>
              </label>
              <label className="flex flex-col gap-2 w-full">
                <p className="text-sm font-medium">Description</p>
                <p className="w-full px-4 py-2 border rounded-md">
                  {currentCustomerData.customerDescription}
                </p>
              </label>
              <label className="flex flex-col gap-2 w-full">
                <p className="text-sm font-medium">Status</p>
                <p className="w-full px-4 py-2 border rounded-md">
                  {currentCustomerData.customerStatus}
                </p>
              </label>
            </div>
            <div className="w-full md:w-2/3 py-4 px-8 flex flex-col gap-6">
              <h2 className="text-xl font-medium">Interactions</h2>
              <ul className="flex flex-col gap-3">
                {currentCustomerLogs.map((data) => (
                  <li
                    key={data.log_id}
                    className="flex bg-gray-200 py-3 px-6 gap-4 rounded-md w-full"
                  >
                    <p className="text-[14px] font-normal text-[#808080]">
                      {formatTimestamp(data.event_timestamp)}
                    </p>
                    <p className="text-[14px] font-medium">{data.event_type}</p>
                    <p className="text-[14px] font-medium text-linkleap-gray">
                      {data.last_status}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default CustomerDetails;
