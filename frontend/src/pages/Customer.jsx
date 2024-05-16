import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AddCustomer from "../components/Customer/AddCustomer";
import EditCustomer from "../components/Customer/EditCustomer";
import DeleteCustomer from "../components/Customer/DeleteCustomer";
import { Link } from "react-router-dom";
import { getCurrencySymbol } from "../utils/currencyConverter";
import Pagination from "../components/Pagination";
import DraggableScrollContainer from "../utils/DraggableScrollContainer";

const Customer = () => {
  const [customerList, setCustomerList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    getCustomerData();
  }, []);

  useEffect(() => {
    getCustomerData();
  }, [currentPage, itemsPerPage]);

  const getCustomerData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/customer/", {
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
      <main className="flex min-h-screen">
        <Sidebar />
        <section className="w-full flex flex-col justify-between">
          <div>
            <div className="flex w-full my-[32px] px-[32px] justify-between">
              <div>
                <h2 className="text-[30px] font-medium">Customers</h2>
                <p className="text-linkleap-gray">
                  Track, manage, and forecast your customer and orders.
                </p>
              </div>
              <AddCustomer getCustomerData={getCustomerData} />
            </div>

            <DraggableScrollContainer className="overflow-x-auto no-scrollbar">
              <table className="w-[120%]">
                <thead className="w-full text-[12px] text-left">
                  <tr className="text-left">
                    <th className="px-[24px] w-[15%] py-[12px] text-linkleap-gray font-medium">
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
                    <th className="px-[24px] w-[15%] py-[12px] text-linkleap-gray font-medium">
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
                    <tr className="odd:bg-[#F9FAFB] w-fit" key={index}>
                      <td className="px-[24px] py-[12px] text-linkleap-gray font-medium">
                        <Link
                          to={`/customer/${customer.customer_id}`}
                          className="text-[14px]"
                        >
                          {customer.customer_name}
                        </Link>
                        <br />
                        <span className="text-[14px] text-linkleap-gray">
                          {customer.customer_email}
                        </span>
                      </td>
                      <td className="px-[24px] py-[12px] text-linkleap-gray font-medium text-[14px]">
                        {customer.customer_company}
                      </td>
                      <td className="px-[24px] py-[12px] text-linkleap-gray font-medium text-[14px]">
                        {customer.customer_job_title}
                      </td>
                      <td className="px-[24px] py-[12px] text-linkleap-gray font-medium text-[14px]">
                        {getCurrencySymbol(customer.customer_deal_currency)}
                        {customer.customer_deal_value}
                      </td>
                      <td className="px-[24px] py-[12px] text-linkleap-gray font-medium text-[14px]">
                        {customer.customer_description}
                      </td>
                      <td className="px-[24px] py-[12px] text-linkleap-gray font-medium text-[14px]">
                        {customer.customer_status}
                      </td>
                      <td className="px-[24px] py-[12px] text-linkleap-gray font-medium text-[14px] flex justify-center items-center">
                        <EditCustomer
                          customerId={customer.customer_id}
                          getCustomerData={getCustomerData}
                        />
                        <DeleteCustomer
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
