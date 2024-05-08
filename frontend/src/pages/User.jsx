import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import sbAdd from "../assets/sidebar/sbAdd.svg";
import Modal from "react-modal";
import dropdownArrow from "../assets/dropdownArrow.svg";

const User = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <main className="flex min-h-screen">
        <Sidebar />
        <section className="w-full">
          <div className="flex w-full my-[32px] px-[32px] justify-between">
            <div>
              <h2 className="text-[30px] font-medium">Users</h2>
              <p className="text-linkleap-gray">
                Track, manage, and forecast your customer and orders.
              </p>
            </div>
            <button
              onClick={() => openModal()}
              className="bg-linkleap-login-btn flex gap-[8px] rounded-[8px] justify-center items-center px-[16px] py-[10px] h-[40px]"
            >
              <img src={sbAdd} alt="sbAdd" />
              <span className="text-[14px] font-medium text-white">Add</span>
            </button>
          </div>

          <Modal
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
            <form className="bg-white h-[630px] w-[410px]  p-[24px] rounded-[12px] flex flex-col gap-[32px]">
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
                    />
                  </label>
                  <label className="flex flex-col gap-[6px]" htmlFor="">
                    <p className="text-[14px] font-medium">Email</p>
                    <input
                      className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]"
                      type="email"
                      placeholder="shrijan@gmail.com"
                    />
                  </label>
                  <label className="flex flex-col gap-[6px]" htmlFor="">
                    <p className="text-[14px] font-medium">Username</p>
                    <input
                      className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]"
                      type="text"
                      placeholder="shrijandangol"
                    />
                  </label>
                  <label className="flex flex-col gap-[6px]" htmlFor="">
                    <p className="text-[14px] font-medium">Password</p>
                    <input
                      className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]"
                      type="password"
                      placeholder="********"
                      name=""
                      id=""
                    />
                  </label>
                  <label className="flex flex-col gap-[6px]" htmlFor="">
                    <p className="text-[14px] font-medium">Role</p>
                    <select
                      className="w-full appearance-none focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px] custom-select cursor-pointer"
                      name=""
                      id=""
                    >
                      <option className="" value="">
                        Manager
                      </option>
                      <option value="">Customer Support</option>
                      <option value="">Sales Representative</option>
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
        </section>
      </main>
    </>
  );
};

export default User;
