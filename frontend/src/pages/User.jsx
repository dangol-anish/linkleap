import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../components/Pagination";

import EditUser from "../components/User/EditUser";
import AddUser from "../components/User/AddUser";
import DeleteUser from "../components/User/DeleteUser";

const User = () => {
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    getUserData();
  }, [currentPage, itemsPerPage]);

  const getUserData = async () => {
    const currentUserData = JSON.parse(localStorage.getItem("data"));
    const userId = currentUserData.id;
    try {
      const res = await fetch("http://localhost:3000/api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, currentPage, itemsPerPage }),
        credentials: "include",
      });

      const data = await res.json();
      setUserList(data.message);
    } catch (error) {
      toast.error("Error", error);
    }
  };

  // pagination

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(userList)
    ? userList.slice(indexOfFirstItem, indexOfLastItem)
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
                <h2 className="text-[30px] font-medium">Users</h2>
                <p className="text-linkleap-gray">
                  Track, manage, and forecast your customer and orders.
                </p>
              </div>
              <AddUser getUserData={getUserData} />
            </div>

            <table className="w-full">
              <thead className="w-full text-[12px] text-left">
                <tr className="text-left">
                  <th className="px-[24px] w-[50%] py-[12px]  text-linkleap-gray font-medium">
                    Users
                  </th>
                  <th className="px-[24px] w-[13%]  py-[12px] text-linkleap-gray font-medium">
                    Role
                  </th>
                  <th className="px-[24px] w-[13%] py-[12px] text-linkleap-gray font-medium">
                    Username
                  </th>
                  <th className="px-[24px] w-[13%] py-[12px] text-linkleap-gray font-medium">
                    Password
                  </th>

                  <th className="px-[24px] w-[11%]  py-[12px] text-linkleap-gray font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user, index) => (
                  <tr className="odd:bg-[#F9FAFB] w-fit" key={index}>
                    <td className="px-[24px] py-[12px] text-linkleap-gray font-medium">
                      <span className="text-[14px]">
                        {user.user_display_name}
                      </span>
                      <br />
                      <span className="text-[14px] text-linkleap-gray">
                        {user.user_email}
                      </span>
                    </td>
                    <td className="px-[24px] py-[12px] text-linkleap-gray font-medium text-[14px]">
                      {user.user_type}
                    </td>
                    <td className="px-[24px] py-[12px] text-linkleap-gray font-medium text-[14px]">
                      {user.user_name}
                    </td>
                    <td className="px-[24px] py-[12px] text-linkleap-gray font-medium text-[14px]">
                      *******
                    </td>
                    <td className="px-[24px] py-[12px] text-linkleap-gray font-medium text-[14px] flex justify-center items-center">
                      <DeleteUser userId={user.id} getUserData={getUserData} />
                      <EditUser userId={user.id} getUserData={getUserData} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={userList.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default User;
