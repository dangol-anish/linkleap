import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getCurrencySymbol } from "../utils/currencyConverter";

const CustomerDetails = () => {
  const [currentCustomerData, setCurrentCustomerData] = useState({});
  const { customerId } = useParams();

  console.log(currentCustomerData);

  useEffect(() => {
    const getCurrentCustomerData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/customer/getCurrentCustomerData/${customerId}`,
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

  useEffect(() => {}, []);

  return (
    <>
      <main className="flex min-h-screen">
        <Sidebar />

        <section className="w-full flex flex-col">
          <header className="flex w-full py-[32px] px-[32px] border-b-[1px] ">
            <div>
              <h2 className="text-[30px] font-medium">Customers</h2>
              <p className="text-linkleap-gray">
                Track, manage, and forecast your customer and orders.
              </p>
            </div>
          </header>
          <div className="flex h-full w-full ">
            <div className="w-[30%] py-[16px] px-[32px] flex flex-col gap-[24px] border-r-[1px] border-linkleap-border">
              <label className="flex flex-col gap-[6px] w-full" htmlFor="">
                <p className="text-[14px] font-medium">Name</p>
                <p className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]">
                  {currentCustomerData.customerName}
                </p>
              </label>
              <label className="flex flex-col gap-[6px] w-full" htmlFor="">
                <p className="text-[14px] font-medium">Email</p>
                <p className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]">
                  {currentCustomerData.customerEmail}
                </p>
              </label>
              <label className="flex flex-col gap-[6px] w-full" htmlFor="">
                <p className="text-[14px] font-medium">Job Title</p>
                <p className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]">
                  {currentCustomerData.customerJobTitle}
                </p>
              </label>
              <label className="flex flex-col gap-[6px] w-full" htmlFor="">
                <p className="text-[14px] font-medium">Deal Value</p>
                <p className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]">
                  {getCurrencySymbol(currentCustomerData.dealValueCurrency)}{" "}
                  {currentCustomerData.customerDealValue}
                </p>
              </label>
              <label className="flex flex-col gap-[6px] w-full" htmlFor="">
                <p className="text-[14px] font-medium">Company</p>
                <p className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]">
                  {currentCustomerData.customerCompany}
                </p>
              </label>
              <label className="flex flex-col gap-[6px] w-full" htmlFor="">
                <p className="text-[14px] font-medium">Description</p>
                <p className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]">
                  {currentCustomerData.customerDescription}
                </p>
              </label>
              <label className="flex flex-col gap-[6px] w-full" htmlFor="">
                <p className="text-[14px] font-medium">Status</p>
                <p className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]">
                  {currentCustomerData.customerStatus}
                </p>
              </label>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default CustomerDetails;
