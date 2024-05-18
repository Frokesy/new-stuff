import { motion } from "framer-motion";

const ProductAccordion = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute right-0 top-4 bg-[#fff] shadow-2xl w-[12vw] z-10"
    >
      <div className="flex flex-col text-[14px]">
        <span className="text-[#635bff] font-semibold px-4 py-2 cursor-pointer hover:bg-[#ccc] hover:text-[#333] transition-all duration-300 ease-in-out">
          Edit Product
        </span>
        <span className="text-[#635bff] font-semibold px-4 py-2 cursor-pointer hover:bg-[#ccc] hover:text-[#333] transition-all duration-300 ease-in-out">Archive Product</span>
        <span className="text-[#ff0406] font-semibold px-4 py-2 cursor-pointer hover:bg-[#ccc] hover:text-[#333] transition-all duration-300 ease-in-out">Delete Product</span>
      </div>
    </motion.div>
  );
};

export default ProductAccordion;
