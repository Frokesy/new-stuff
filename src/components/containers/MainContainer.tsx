import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideNav from "../defaults/SideNav";
import { easeInOut, motion } from "framer-motion";
import LogoutModal from "../modals/LogoutModal";

interface ContainerProps {
  children: React.ReactNode;
  active: string;
}

const MainContainer: FC<ContainerProps> = ({ children, active }) => {
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (!id) {
      navigate("/");
    }
  }, [navigate]);

  const logout = () => {
    setShowLogoutModal(true);
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="w-[20%]">
          <SideNav active={active} logout={logout} />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: easeInOut }}
          className="w-[80%] bg-[#fff]"
        >
          {children}
        </motion.div>
      </div>
      {showLogoutModal && (
        <LogoutModal isOpen={showLogoutModal} setIsOpen={setShowLogoutModal} />
      )}
    </>
  );
};

export default MainContainer;
