import React, { useState } from "react";
import sbAdd from "../../assets/sidebar/sbAdd.svg";

import Modal from "react-modal";
import { toast } from "react-toastify";

const AddCompany = ({ getCompanyData }) => {
  const [companyData, setCompanyData] = useState({});

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
      !companyData.companyName ||
      !companyData.companyWebsite ||
      !companyData.companyDescTitle ||
      !companyData.companyDesc
    ) {
      toast.error("All input fields are required");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/company/addNewCompany`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(companyData),
          credentials: "include",
        }
      );
      const data = await res.json();

      if (data.success === true) {
        closeModal();

        toast.success("New Company Added!");
        getCompanyData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  const handleChange = (e) => {
    setCompanyData({ ...companyData, [e.target.id]: e.target.value });
  };

  return (
    <>
      {" "}
      <button
        onClick={() => openModal()}
        className="bg-linkleap-login-btn flex gap-[8px] rounded-[8px] justify-center items-center px-[16px] py-[10px] h-[40px]"
      >
        <img src={sbAdd} alt="sbAdd" />
        <span className="text-[14px] font-medium text-white">Add</span>
      </button>
      <Modal
        id="addCompanyModal"
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
          <div className="flex flex-col gap-[20px]">
            <div className="flex gap-[8px] flex-col justify-center items-center">
              <h3 className="text-[18px] font-semibold">Add New Company</h3>
              <p
                className="text-linkleap-gray text-[14px] font-normal
                  "
              >
                Enter the details of new company
              </p>
            </div>
            <div className="flex flex-col gap-[16px]">
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Company Name</p>
                <input
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]"
                  type="text"
                  placeholder="ABC Pvt. Ltd"
                  id="companyName"
                  onChange={handleChange}
                />
              </label>
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Website</p>
                <input
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]"
                  type="text"
                  id="companyWebsite"
                  placeholder="abc.com.np"
                  onChange={handleChange}
                />
              </label>
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">
                  Company Description Title
                </p>
                <input
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]"
                  type="text"
                  placeholder="ABC Title"
                  name=""
                  id="companyDescTitle"
                  onChange={handleChange}
                />
              </label>
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Company Description</p>
                <textarea
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px] h-[124px] resize-none"
                  name=""
                  id="companyDesc"
                  onChange={handleChange}
                ></textarea>
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

export default AddCompany;
