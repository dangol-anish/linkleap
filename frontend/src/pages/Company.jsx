import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import sbAdd from "../assets/sidebar/sbAdd.svg";
import Pagination from "../components/Pagination";

const Company = () => {
  const [companyList, setCompanyList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    getCompanyData();
  }, []);

  useEffect(() => {
    getCompanyData();
  }, [currentPage, itemsPerPage]);

  const getCompanyData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/company/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentPage, itemsPerPage }),
        credentials: "include",
      });
      const data = await res.json();
      setCompanyList(data); // Update company list
    } catch (error) {
      console.error("Error", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(companyList)
    ? companyList.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <main className="flex min-h-screen">
        <Sidebar />
        <section className="w-full">
          <div className="flex w-full my-[32px] px-[32px] justify-between">
            <div>
              <h2 className="text-[30px] font-medium">Companies</h2>
              <p className="text-linkleap-gray">
                Track, manage, and forecast your customer and orders.
              </p>
            </div>
            <button className="bg-linkleap-login-btn flex gap-[8px] rounded-[8px] justify-center items-center px-[16px] py-[10px] h-[40px]">
              <img src={sbAdd} alt="sbAdd" />
              <span className="text-[14px] font-medium text-white">Add</span>
            </button>
          </div>
          {companyList.length === 0 ? (
            <div className="text-center text-linkleap-gray mt-8">
              No companies found.
            </div>
          ) : (
            <>
              <table className="w-full">
                <thead className="w-full text-[12px] text-left">
                  <tr className="text-left">
                    <th className="px-[24px] py-[12px]  text-linkleap-gray font-medium">
                      Company
                    </th>
                    <th className="px-[24px]  py-[12px] text-linkleap-gray font-medium">
                      Total People
                    </th>
                    <th className="px-[24px] py-[12px] text-linkleap-gray font-medium">
                      About
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((company, index) => (
                    <tr className="odd:bg-[#F9FAFB] w-fit" key={index}>
                      <td className="px-[24px] py-[12px] text-linkleap-gray font-medium"></td>
                      <td className="px-[24px] py-[12px] text-linkleap-gray font-medium text-[14px]"></td>
                      <td className="px-[24px] py-[12px] text-linkleap-gray font-medium text-[14px]"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={companyList.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default Company;
