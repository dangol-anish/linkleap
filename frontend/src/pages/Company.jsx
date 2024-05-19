import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Pagination from "../components/Pagination";
import AddCompany from "../components/Company/AddCompany";
import DeleteCompany from "../components/Company/DeleteCompany";
import EditCompany from "../components/Company/EditCompany";
import { Link } from "react-router-dom";
import { textLimiter } from "../utils/textLimiter";

const Company = () => {
  const [companyList, setCompanyList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);

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
      setCompanyList(data.message);
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
        <section className="w-full flex flex-col justify-between flex-grow">
          <div>
            <div className="flex flex-col md:flex-row w-full my-[32px] px-[32px] justify-between items-start md:items-center">
              <div>
                <h2 className="text-[24px] md:text-[30px] font-medium">
                  Companies
                </h2>
                <p className="text-linkleap-gray">
                  Track, manage, and forecast your customer and orders.
                </p>
              </div>
              <div className="mt-[16px] md:mt-0">
                <AddCompany getCompanyData={getCompanyData} />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="text-[12px] text-left">
                  <tr className="text-left">
                    <th className="px-[32px] w-[55%] py-[12px]  text-linkleap-gray font-medium">
                      Company
                    </th>
                    <th className="px-[24px] w-[14%]  py-[12px] text-linkleap-gray font-medium">
                      Total People
                    </th>
                    <th className="px-[24px] w-[21%] py-[12px] text-linkleap-gray font-medium">
                      About
                    </th>
                    <th className="px-[24px] w-[10%]  py-[12px] text-linkleap-gray font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((company, index) => (
                    <tr className="odd:bg-[#F9FAFB] w-fit" key={index}>
                      <td className="px-[32px] py-[12px] font-medium">
                        <Link
                          to={`/company/${company.company_id}`}
                          className="text-[14px]"
                        >
                          {company.company_name}
                        </Link>

                        <br />
                        <span className="text-[14px] text-linkleap-gray">
                          {company.company_website}
                        </span>
                      </td>
                      <td className="px-[24px] py-[12px] text-linkleap-gray font-medium text-[14px]">
                        {company.total_employee}
                      </td>
                      <td className="px-[24px] py-[12px] text-linkleap-gray font-medium text-[14px]">
                        <span className="text-[14px]">
                          {textLimiter(company.company_description_title)}
                        </span>
                        <br />
                        <span className="text-[14px] text-linkleap-gray">
                          {textLimiter(company.company_description)}
                        </span>
                      </td>
                      <td className="px-[24px] w-[120px] py-[12px] text-linkleap-gray font-medium text-[14px] flex justify-center items-center">
                        <DeleteCompany
                          companyId={company.company_id}
                          getCompanyData={getCompanyData}
                        />
                        <EditCompany
                          companyId={company.company_id}
                          getCompanyData={getCompanyData}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={companyList.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Company;
