import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const CompanyDetails = () => {
  const [currentCompanyData, setCurrentCompanyData] = useState({});
  const [customersList, setCustomersList] = useState([]);
  const { companyId } = useParams();

  console.log(customersList);

  useEffect(() => {
    const getCurrentCompanyData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/company/getCurrentCompanyData/${companyId}`,
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
          setCurrentCompanyData(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Error: " + error);
      }
    };
    getCurrentCompanyData();
  }, [companyId]);

  useEffect(() => {
    const getCustomersInCompany = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/company/customersInCompany/${companyId}`,
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
          setCustomersList(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Error: " + error);
      }
    };
    getCustomersInCompany();
  }, []);

  return (
    <>
      <main className="flex min-h-screen">
        <Sidebar />

        <section className="w-full flex flex-col">
          <header className="flex w-full py-[32px] px-[32px] border-b-[1px] ">
            <div>
              <h2 className="text-[30px] font-medium">Companies</h2>
              <p className="text-linkleap-gray">
                Track, manage, and forecast your customer and orders.
              </p>
            </div>
          </header>
          <div className="flex h-full w-full ">
            <div className="w-[30%] py-[16px] px-[32px] flex flex-col gap-[24px] border-r-[1px] border-linkleap-border">
              <label className="flex flex-col gap-[6px] w-full" htmlFor="">
                <p className="text-[14px] font-medium">Company Name</p>
                <p className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]">
                  {currentCompanyData.companyName}
                </p>
              </label>
              <label className="flex flex-col gap-[6px] w-full" htmlFor="">
                <p className="text-[14px] font-medium">Website</p>
                <p className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]">
                  {currentCompanyData.companyWebsite}
                </p>
              </label>
              <label className="w-full flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">
                  Company Description Title
                </p>
                <p className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]">
                  {currentCompanyData.companyDescTitle}
                </p>
              </label>
              <label className="flex flex-col gap-[6px] w-full" htmlFor="">
                <p className="text-[14px] font-medium">Company Description</p>
                <p className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]">
                  {currentCompanyData.companyDesc}
                </p>
              </label>
            </div>
            <div className="w-[60%] py-[16px] px-[32px] flex flex-col gap-[24px]">
              <h2 className="text-[24px] font-medium">People</h2>
              <ul className="flex flex-col gap-[12px]">
                {customersList.map((data) => (
                  <li className="flex flex-col gap-[6px] w-full">
                    <p className="text-[14px] font-medium">
                      {data.customer_name}
                    </p>
                    <p className="text-[14px] font-medium text-linkleap-gray">
                      {data.customer_email}
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

export default CompanyDetails;
