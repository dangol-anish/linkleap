import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AddCustomer from "../components/Customer/AddCustomer";
import EditCustomer from "../components/Customer/EditCustomer";
import DeleteCustomer from "../components/Customer/DeleteCustomer";
import { Link } from "react-router-dom";
import { getCurrencySymbol } from "../utils/currencyConverter";
import Pagination from "../components/Pagination";
import DraggableScrollContainer from "../utils/DraggableScrollContainer";
import StatusChange from "../components/Customer/StatusChange";
import { textLimiter } from "../utils/textLimiter";
import SidebarSmall from "../components/SidebarSmall";

const Customer = () => {
  const [customerList, setCustomerList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  useEffect(() => {
    getCustomerData();
  }, []);

  useEffect(() => {
    getCustomerData();
  }, [currentPage, itemsPerPage]);

  const getCustomerData = async () => {
    try {
      const res = await fetch("/api/customer/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPage, itemsPerPage }),
        credentials: "include",
      });
      const data = await res.json();
      setCustomerList(data.message);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(customerList)
    ? customerList.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <main className="flex flex-col md:flex-row min-h-screen">
        <SidebarSmall />
        <Sidebar />
        <section className="w-full flex flex-col justify-between flex-grow">
          <div>
            <div className="flex flex-col md:flex-row w-full my-[16px] md:my-[32px] px-[32px] justify-between items-start md:items-center">
              <div>
                <h2 className="text-[24px] md:text-[30px] font-medium">
                  Customers
                </h2>
                <p className="text-linkleap-gray">
                  Track, manage, and forecast your customer and orders.
                </p>
              </div>
              <div className="mt-[16px] md:mt-0">
                <AddCustomer getCustomerData={getCustomerData} />
              </div>
            </div>
            <div className="overflow-x-auto">
              <DraggableScrollContainer className="overflow-x-auto no-scrollbar">
                <table className="w-[110%]">
                  <thead className="w-full text-[12px] text-left">
                    <tr className="text-left">
                      <th className="px-[32px] w-[15%] py-[12px] text-linkleap-gray font-medium">
                        Customer
                      </th>
                      <th className="px-[24px] w-[12%] py-[12px] text-linkleap-gray font-medium">
                        Company
                      </th>
                      <th className="px-[24px] w-[12%] py-[12px] text-linkleap-gray font-medium">
                        Job Title
                      </th>
                      <th className="px-[24px] w-[12%] py-[12px] text-linkleap-gray font-medium">
                        Deal Value
                      </th>
                      <th className="px-[24px] w-[20%] py-[12px] text-linkleap-gray font-medium">
                        About
                      </th>
                      <th className="px-[24px] w-[9%] py-[12px] text-linkleap-gray font-medium">
                        Status
                      </th>
                      <th className="px-[24px] w-[9%] py-[12px] text-linkleap-gray font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((customer, index) => (
                      <tr
                        className="odd:bg-[#F9FAFB] w-fit text-linkleap-text"
                        key={customer.customer_id}
                      >
                        <td className="px-[32px] py-[12px]  font-medium">
                          <Link
                            to={`/customer/${customer.customer_id}`}
                            className="text-[14px] "
                          >
                            {textLimiter(customer.customer_name)}
                          </Link>
                          <br />
                          <span className="text-[14px] text-linkleap-gray">
                            {textLimiter(customer.customer_email)}
                          </span>
                        </td>
                        <td className="px-[24px] py-[12px]  font-medium text-[14px]">
                          {customer.company_name}
                        </td>
                        <td className="px-[24px] py-[12px]  font-medium text-[14px]">
                          {customer.customer_job_title}
                        </td>
                        <td className="px-[24px] py-[12px]  font-medium text-[14px]">
                          {getCurrencySymbol(customer.customer_deal_currency)}
                          {customer.customer_deal_value}
                        </td>
                        <td className="px-[24px] py-[12px]  font-medium text-[14px]">
                          {textLimiter(customer.customer_description)}
                        </td>
                        <td className="px-[24px] py-[12px]  font-medium text-[14px]">
                          <StatusChange
                            currentStatus={customer.customer_status}
                            customerId={customer.customer_id}
                            getCustomerData={getCustomerData}
                          />
                        </td>
                        <td className="px-[24px] py-[12px] w-[120px] font-medium text-[14px] flex =justify-center items-center">
                          <DeleteCustomer
                            customerId={customer.customer_id}
                            getCustomerData={getCustomerData}
                          />
                          <EditCustomer
                            customerId={customer.customer_id}
                            getCustomerData={getCustomerData}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </DraggableScrollContainer>
            </div>
          </div>
          <div>
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={customerList.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Customer;
