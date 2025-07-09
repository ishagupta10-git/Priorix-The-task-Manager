import React, { useState, useContext } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FiUser, FiEdit3 } from "react-icons/fi";
import SideMenu from "./SideMenu";
import { UserContext } from "../../context/userContext";
import ProfileEditModal from "../Modals/ProfileEditModal";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="flex items-center justify-between bg-white border boredr-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
        <div className="flex items-center gap-5">
          <button
            className="block lg:hidden text-black"
            onClick={() => {
              setOpenSideMenu(!openSideMenu);
            }}
          >
            {openSideMenu ? (
              <HiOutlineX className="text-2xl" />
            ) : (
              <HiOutlineMenu className="text-2xl" />
            )}
          </button>

          <h2 className="text-lg font-medium text-black">Task Manager</h2>
        </div>

        {/* Profile Section */}
        {user && (
          <div className="flex items-center gap-2">
            {/* Desktop Profile Info */}
            <div className="hidden md:flex items-center gap-3">
              {user?.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-gray-200 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full border-2 border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <FiUser className="text-white text-sm" />
                </div>
              )}
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
              </div>
            </div>

            {/* Mobile Profile Avatar */}
            <div className="md:hidden">
              {user?.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-gray-200 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full border-2 border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <FiUser className="text-white text-sm" />
                </div>
              )}
            </div>

            {/* Edit Profile Button */}
            <button
              onClick={() => setShowProfileModal(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors group relative"
              title="Edit Profile"
            >
              <FiEdit3 className="text-gray-600 group-hover:text-blue-600 text-lg transition-colors" />
            </button>
          </div>
        )}

        {openSideMenu && (
          <div className="fixed top-[61px] -ml-4 bg-white">
            <SideMenu activeMenu={activeMenu} />
          </div>
        )}
      </div>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </>
  );
};

export default Navbar;
