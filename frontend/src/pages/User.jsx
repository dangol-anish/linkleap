import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import sbAdd from "../assets/sidebar/sbAdd.svg";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../components/Pagination";
import DeleteUser from "../components/User/DeleteUser";
import EditUser from "../components/User/EditUser";
import AddUser from "../components/User/AddUser";

const User = () => {
  const [userList, setUserList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [userData, setUserData] = useState({
    userType: "Manager",
  });

  const closeModal = () => {
    setModalIsOpen(false);
  };

  console.log(userList);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !userData.userName ||
      !userData.userDisplayName ||
      !userData.userEmail ||
      !userData.userPassword ||
      !userData.userType
    ) {
      toast.error("All input fields are required");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:3000/api/dashboard/addNewUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
          credentials: "include",
        }
      );
      const data = await res.json();

      if (data.success === true) {
        toast.success("New User Created!");
        closeModal();
        // Update user list
        getUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

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
      const res = await fetch("http://localhost:3000/api/dashboard/", {
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
              <AddUser
                setModalIsOpen={setModalIsOpen}
                modalIsOpen={modalIsOpen}
                handleSubmit={handleSubmit}
                setUserData={setUserData}
                userData={userData}
                closeModal={closeModal}
              />
            </div>

            <table className="w-full">
              <thead className="w-full text-[12px] text-left">
                <tr className="text-left">
                  <th className="px-[24px] py-[12px] text-linkleap-gray font-medium">
                    Users
                  </th>
                  <th className="px-[24px] py-[12px] text-linkleap-gray font-medium">
                    Role
                  </th>
                  <th className="px-[24px] py-[12px] text-linkleap-gray font-medium">
                    Username
                  </th>
                  <th className="px-[24px] py-[12px] text-linkleap-gray font-medium">
                    Password
                  </th>
                  <th></th>
                  <th className="px-[24px] py-[12px] text-linkleap-gray font-medium"></th>
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
                      <EditUser />
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
