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

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.id]: e.target.value });
  };

  return (
    <>
      <button
        onClick={() => openModal()}
        className="bg-linkleap-login-btn flex gap-[8px] rounded-[8px] justify-center items-center px-[16px] py-[10px] h-[40px]"
      >
        <img src={sbAdd} alt="sbAdd" />
        <span className="text-[14px] font-medium text-white">Add</span>
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
          className="bg-white h-[630px] w-[410px]  p-[24px] rounded-[12px] flex flex-col gap-[32px]"
        >
          <div className="flex flex-col gap-[20px]">
            <div className="flex gap-[8px] flex-col justify-center items-center">
              <h3 className="text-[18px] font-semibold">Add New User</h3>
              <p
                className="text-linkleap-gray text-[14px] font-normal
                  "
              >
                Enter the details of new users
              </p>
            </div>
            <div className="flex flex-col gap-[16px]">
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Name</p>
                <input
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]"
                  type="text"
                  placeholder="Shrijan Dangol"
                  id="userDisplayName"
                  onChange={handleChange}
                />
              </label>
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Email</p>
                <input
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]"
                  type="email"
                  id="userEmail"
                  placeholder="shrijan@gmail.com"
                  onChange={handleChange}
                />
              </label>
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Username</p>
                <input
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]"
                  type="text"
                  id="userName"
                  placeholder="shrijandangol"
                  onChange={handleChange}
                />
              </label>
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Password</p>
                <input
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]"
                  type="password"
                  placeholder="********"
                  name=""
                  id="userPassword"
                  onChange={handleChange}
                />
              </label>
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Role</p>
                <select
                  className="w-full appearance-none focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px] custom-select cursor-pointer"
                  name=""
                  id="userType"
                  onChange={handleChange}
                >
                  <option className="" value="Manager">
                    Manager
                  </option>
                  <option value="Customer Support">Customer Support</option>
                  <option value="Sales Representative">
                    Sales Representative
                  </option>
                </select>
              </label>
            </div>
          </div>
          <div className="flex gap-[8px]">
            <button
              className="w-[175px] py-[10px] px-[18px] border-[1px] rounded-[8px] text-[16px] font-medium"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button className="w-[175px] py-[10px] px-[18px] rounded-[8px] bg-linkleap-login-btn text-[16px] font-medium text-white ">
              Add
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddUser;