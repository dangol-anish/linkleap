import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const CompanyDetails = () => {
  const [currentCompanyData, setCurrentCompanyData] = useState({});
  const [customersList, setCustomersList] = useState([]);
  const { companyId } = useParams();

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
      <main className="flex flex-col lg:flex-row min-h-screen">
        <Sidebar />

        <section className="w-full flex flex-col">
          <header className="flex w-full py-8 px-8 lg:py-16 lg:px-16 border-b">
            <div>
              <h2 className="text-2xl lg:text-3xl font-medium">Companies</h2>
              <p className="text-linkleap-gray">
                Track, manage, and forecast your customer and orders.
              </p>
            </div>
          </header>
          <div className="flex flex-col lg:flex-row h-full w-full">
            <div className="w-full lg:w-1/3 py-4 px-8 flex flex-col gap-6 border-b lg:border-r lg:border-b-0 border-linkleap-border">
              <label className="flex flex-col gap-1 w-full">
                <p className="text-sm font-medium">Company Name</p>
                <p className="w-full px-3 py-2 border rounded">
                  {currentCompanyData.companyName}
                </p>
              </label>
              <label className="flex flex-col gap-1 w-full">
                <p className="text-sm font-medium">Website</p>
                <p className="w-full px-3 py-2 border rounded">
                  {currentCompanyData.companyWebsite}
                </p>
              </label>
              <label className="w-full flex flex-col gap-1">
                <p className="text-sm font-medium">Company Description Title</p>
                <p className="w-full px-3 py-2 border rounded">
                  {currentCompanyData.companyDescTitle}
                </p>
              </label>
              <label className="flex flex-col gap-1 w-full">
                <p className="text-sm font-medium">Company Description</p>
                <p className="w-full px-3 py-2 border rounded">
                  {currentCompanyData.companyDesc}
                </p>
              </label>
            </div>
            <div className="w-full lg:w-2/3 py-4 px-8 flex flex-col gap-6">
              <h2 className="text-xl lg:text-2xl font-medium">People</h2>
              <ul className="flex flex-col gap-3">
                {customersList.map((data) => (
                  <li
                    key={data.customer_email}
                    className="flex flex-col gap-1 w-full"
                  >
                    <p className="text-sm font-medium">{data.customer_name}</p>
                    <p className="text-sm font-medium text-linkleap-gray">
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
