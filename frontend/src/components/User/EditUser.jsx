import { useEffect, useState } from "react";
import editBtn from "../../assets/edit.svg";
import Modal from "react-modal";
import { toast } from "react-toastify";

const EditUser = ({ userId, getUserData }) => {
  const [currentUserData, setCurrentUserData] = useState({
    userPassword: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
    getCurrentUserData();
  };

  const closeModal = () => {
    setCurrentUserData({
      userPassword: "",
    });
    setModalIsOpen(false);
  };

  const handleChange = (e) => {
    setCurrentUserData({
      ...currentUserData,
      [e.target.name]: e.target.value,
    });
  };

  const getCurrentUserData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/user/getCurrentUserData/${userId}`,
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
        setCurrentUserData(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  // useEffect(() => {
  //   getCurrentUserData();
  // }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3000/api/user/updateUserData/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentUserData),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success === true) {
        closeModal();

        getUserData();
        toast.success("User edited!");
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
          className="bg-white h-[630px] w-[410px]  p-[24px] rounded-[12px] flex flex-col gap-[32px]"
        >
          <div className="flex flex-col gap-[20px]">
            <div className="flex gap-[8px] flex-col justify-center items-center">
              <h3 className="text-[18px] font-semibold">Edit User</h3>
              <p
                className="text-linkleap-gray text-[14px] font-normal
                  "
              >
                Edit the details of the user
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
                  name="userDisplayName"
                  onChange={handleChange}
                  value={currentUserData.userDisplayName}
                />
              </label>
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Email</p>
                <input
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]"
                  type="email"
                  id="userEmail"
                  placeholder="shrijan@gmail.com"
                  name="userEmail"
                  onChange={handleChange}
                  value={currentUserData.userEmail}
                />
              </label>
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Username</p>
                <input
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]"
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder="shrijandangol"
                  onChange={handleChange}
                  value={currentUserData.userName}
                />
              </label>
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Password</p>
                <input
                  className="w-full focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px]"
                  type="password"
                  placeholder="********"
                  id="userPassword"
                  onChange={handleChange}
                  name="userPassword"
                />
              </label>
              <label className="flex flex-col gap-[6px]" htmlFor="">
                <p className="text-[14px] font-medium">Role</p>
                <select
                  className="w-full appearance-none focus:border-linkleap-login-btn focus:outline-none px-[14px] py-[10px] border-[1px] rounded-[8px] custom-select cursor-pointer"
                  name="userType"
                  id="userType"
                  value={currentUserData.userType}
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
              Update
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditUser;
