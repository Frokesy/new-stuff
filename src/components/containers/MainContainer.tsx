import React, { FC } from "react";
import SideNav from "../defaults/SideNav";
import { easeInOut, motion } from "framer-motion";

interface ContainerProps {
  children: React.ReactNode;
  active: string;
}

const MainContainer: FC<ContainerProps> = ({ children, active }) => {
  return (
    <div className="flex justify-between">
      <div className="w-[20%]">
        <SideNav active={active} />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: easeInOut }}
        className="w-[80%] pt-10 bg-[#fff]"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default MainContainer;
