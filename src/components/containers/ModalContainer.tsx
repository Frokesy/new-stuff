import React, { FC, ReactNode } from "react";
import { motion } from "framer-motion";
import { FaX } from "react-icons/fa6";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalContainer: FC<ModalProps> = ({ children, isOpen, setIsOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="bg-[#000] z-50 bg-opacity-65 top-0 w-[80vw] h-[100%] fixed flex justify-center items-center"
    >
      <div className="bg-[#fff] pb-10 lg:px-6 px-4 lg:h-auto max-h-[90vh] overflow-y-auto rounded-lg">
        <div className="flex justify-end py-6">
          <button
            className="flex cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaX />
          </button>
        </div>
        {children}
      </div>
    </motion.div>
  );
};

export default ModalContainer;
