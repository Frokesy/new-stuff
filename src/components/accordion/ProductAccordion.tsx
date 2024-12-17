import { motion } from "framer-motion";
import { FC } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ProductsProps } from "../../pages/products";

interface AccordionProps {
  item: ProductsProps;
  handleClick: () => void;
}

const ProductAccordion: FC<AccordionProps> = ({ item, handleClick }) => {

  const handleDelete = async () => {
    const ids = {
      priceId: item.default_price,
      productId: item.id,
    };
    await fetch("http://localhost:4000/delete-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: ids }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        toast.success("Product deleted!", {
          position: "top-center",
          theme: "light",
          autoClose: 1500,
          hideProgressBar: true,
          draggable: true,
        });
      });
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute right-0 top-4 bg-[#fff] shadow-2xl w-[12vw] z-10"
      >
        <ToastContainer />
        <div className="flex flex-col text-[14px]">
          <span
            onClick={() => handleClick()}
            className="text-[#635bff] font-semibold px-4 py-2 cursor-pointer hover:bg-[#ccc] hover:text-[#333] transition-all duration-300 ease-in-out"
          >
            Edit Product
          </span>
          <span className="text-[#635bff] font-semibold px-4 py-2 cursor-pointer hover:bg-[#ccc] hover:text-[#333] transition-all duration-300 ease-in-out">
            Archive Product
          </span>
          <span
            onClick={handleDelete}
            className="text-[#ff0406] font-semibold px-4 py-2 cursor-pointer hover:bg-[#ccc] hover:text-[#333] transition-all duration-300 ease-in-out"
          >
            Delete Product
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductAccordion;
