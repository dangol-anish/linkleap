import React, { useState } from "react";
import sbAdd from "../../assets/sidebar/sbAdd.svg";

import Modal from "react-modal";
import { toast } from "react-toastify";

const AddUser = ({ getUserData }) => {
  const [userData, setUserData] = useState({
    userType: "Manager",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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
      const res = await fetch("/api/user/addNewUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });
      const data = await res.json();

      if (data.success === true) {
        closeModal();

        toast.success("New User Created!");
        getUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  return (
    <>
      <button
        onClick={() => openModal()}
        className="bg-linkleap-login-btn flex gap-2 rounded-lg justify-center items-center px-4 py-2 h-10"
      >
        <img src={sbAdd} alt="sbAdd" />
        <span className="text-sm font-medium text-white">Add</span>
      </button>

      <Modal
        id="addUserModal"
        className="flex flex-col justify-center items-center h-full"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName={{
          base: "fixed inset-0 bg-black bg-opacity-50 ",
          afterOpen: "bg-black bg-opacity-50 ",
          beforeClose: "bg-black bg-opacity-50",
        }}
        ariaHideApp={false}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white h-auto w-[95%] max-w-md p-6 rounded-lg flex flex-col gap-8"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col justify-center items-center gap-2">
              <h3 className="text-lg font-semibold">Add New User</h3>
              <p className="text-linkleap-gray text-sm font-normal">
                Enter the details of new users
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1" htmlFor="userDisplayName">
                <p className="text-sm font-medium">Name</p>
                <input
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-4 py-2 border rounded-lg"
                  type="text"
                  placeholder="Shrijan Dangol"
                  id="userDisplayName"
                  onChange={handleChange}
                />
              </label>
              <label className="flex flex-col gap-1" htmlFor="userEmail">
                <p className="text-sm font-medium">Email</p>
                <input
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-4 py-2 border rounded-lg"
                  type="email"
                  id="userEmail"
                  placeholder="shrijan@gmail.com"
                  onChange={handleChange}
                />
              </label>
              <label className="flex flex-col gap-1" htmlFor="userName">
                <p className="text-sm font-medium">Username</p>
                <input
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-4 py-2 border rounded-lg"
                  type="text"
                  id="userName"
                  placeholder="shrijandangol"
                  onChange={handleChange}
                />
              </label>
              <label className="flex flex-col gap-1" htmlFor="userPassword">
                <p className="text-sm font-medium">Password</p>
                <input
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-4 py-2 border rounded-lg"
                  type="password"
                  placeholder="********"
                  id="userPassword"
                  onChange={handleChange}
                />
              </label>
              <label className="flex flex-col gap-1" htmlFor="userType">
                <p className="text-sm font-medium">Role</p>
                <select
                  className="w-full appearance-none focus:border-linkleap-login-btn focus:outline-none px-4 py-2 border rounded-lg custom-select cursor-pointer"
                  id="userType"
                  onChange={handleChange}
                >
                  <option value="Manager">Manager</option>
                  <option value="Customer Support">Customer Support</option>
                  <option value="Sales Representative">
                    Sales Representative
                  </option>
                </select>
              </label>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="w-full py-2 px-4 border rounded-lg text-base font-medium"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button className="w-full py-2 px-4 rounded-lg bg-linkleap-login-btn text-base font-medium text-white">
              Add
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddUser;
