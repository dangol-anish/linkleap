import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../components/Pagination";
import { textLimiter } from "../utils/textLimiter";
import EditUser from "../components/User/EditUser";
import AddUser from "../components/User/AddUser";
import DeleteUser from "../components/User/DeleteUser";
import SidebarSmall from "../components/SidebarSmall";

const User = () => {
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/`, {
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
  const currentItems = userList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <main className="flex flex-col md:flex-row min-h-screen">
        <SidebarSmall />
        <Sidebar />
        <section className="w-full flex flex-col justify-between flex-grow">
          <div>
            <div className="flex flex-col md:flex-row w-full  my-[16px] md:my-[32px] px-[32px] justify-between items-start md:items-center">
              <div>
                <h2 className="text-[24px] md:text-[30px] font-medium">
                  Users
                </h2>
                <p className="text-linkleap-gray">
                  Track, manage, and forecast your customer and orders.
                </p>
              </div>
              <div className="mt-[16px] md:mt-0">
                <AddUser getUserData={getUserData} />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full ">
                <thead className="text-[12px] text-left">
                  <tr className="text-left">
                    <th className="px-[32px] w-[50%] py-[12px]  text-linkleap-gray font-medium">
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

                    <th className="px-[24px] w-[120px]  py-[12px] text-linkleap-gray font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((user, index) => (
                    <tr className="odd:bg-[#F9FAFB] w-fit" key={index}>
                      <td className="px-[32px] py-[12px] text-linkleap-gray font-medium">
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
                        {textLimiter(user.user_name)}
                      </td>
                      <td className="px-[24px] py-[12px] text-linkleap-gray font-medium text-[14px]">
                        *******
                      </td>
                      <td className="px-[24px] w-[120px] py-[12px] text-linkleap-gray font-medium text-[14px] flex justify-center items-center">
                        <DeleteUser
                          userId={user.id}
                          getUserData={getUserData}
                        />
                        <EditUser userId={user.id} getUserData={getUserData} />
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
