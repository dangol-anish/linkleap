import { useState } from "react";
import editBtn from "../../assets/edit.svg";
import Modal from "react-modal";
import { toast } from "react-toastify";

const EditCompany = ({ companyId, getCompanyData }) => {
  const [currentCompanyData, setCurrentCompanyData] = useState({
    companyName: "",
    companyWebsite: "",
    companyDescTitle: "",
    companyDesc: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
    getCurrentCompanyData();
  };

  const closeModal = () => {
    setCurrentCompanyData({
      companyName: "",
      companyWebsite: "",
      companyDescTitle: "",
      companyDesc: "",
    });
    setModalIsOpen(false);
  };
  const handleChange = (e) => {
    setCurrentCompanyData({
      ...currentCompanyData,
      [e.target.name]: e.target.value,
    });
  };

  const getCurrentCompanyData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/company/getCurrentCompanyData/${companyId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await res.json();

      if (data.success === true) {
        setCurrentCompanyData(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (
      !currentCompanyData.companyName ||
      !currentCompanyData.companyDesc ||
      !currentCompanyData.companyDescTitle ||
      !currentCompanyData.companyWebsite
    ) {
      toast.error("All input fields are required");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/api/company/updateCompanyData/${companyId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentCompanyData),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success === true) {
        closeModal();

        getCompanyData();
        toast.success("Company data edited!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  return (
    <>
      <button onClick={() => openModal()} className="">
        <img src={editBtn} alt="Edit Button" />
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
          onSubmit={handleUpdate}
          className="bg-white h-auto w-[95%] max-w-md p-6 rounded-lg flex flex-col gap-8"
        >
          <div className="flex flex-col gap-[20px]">
            <div className="flex gap-[8px] flex-col justify-center items-center">
              <h3 className="text-[18px] font-semibold">
                Edit Company Details
              </h3>
              <p
                className="text-linkleap-gray text-[14px] font-normal
                  "
              >
                Edit the details of company
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
                  name="companyName"
                  onChange={handleChange}
                  value={currentCompanyData.companyName}
                />
              </label>
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Website</p>
                <input
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]"
                  type="text"
                  id="companyWebsite"
                  name="companyWebsite"
                  placeholder="abc.com.np"
                  onChange={handleChange}
                  value={currentCompanyData.companyWebsite}
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
                  id="companyDescTitle"
                  name="companyDescTitle"
                  onChange={handleChange}
                  value={currentCompanyData.companyDescTitle}
                />
              </label>
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Company Description</p>
                <textarea
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px] h-[124px] resize-none"
                  name="companyDesc"
                  id="companyDesc"
                  onChange={handleChange}
                  value={currentCompanyData.companyDesc}
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
              Update
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditCompany;
