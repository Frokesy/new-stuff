import React, { FC, SetStateAction, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./defaults/Loader";
import { pb } from "../../utils/pocketbaseClient";
import { ProductsProps } from "../pages/products";

interface NewProductProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditActive?: boolean;
  editedProduct?: ProductsProps;
  fetchAllProducts: () => void;
  setShowAccordion: React.Dispatch<SetStateAction<boolean>>;
}

const NewProduct: FC<NewProductProps> = ({
  setIsOpen,
  isEditActive,
  editedProduct,
  fetchAllProducts,
  setShowAccordion,
}) => {
  const [data, setData] = useState({
    name: "",
    active: true,
    desc: "",
    price: "",
    category: "",
    estimatedDeliveryDays: "",
  });

  const [error, setError] = useState({
    name: "",
    desc: "",
    price: "",
    image: "",
    category: "",
    estimatedDeliveryDays: "",
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [loading, setLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pic, setPic] = useState<string>("");

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      updatePic(e.target.files[0]);
    }
  };

  const validateField = (value: string) => {
    if (value === "") {
      return false;
    } else {
      return true;
    }
  };

  const isNameValid = validateField(data.name);
  const isDescValid = validateField(data.desc);
  const isPriceValid = validateField(data.price);
  const isCategoryValid = validateField(data.category);
  const isDeliveryInputValid = validateField(data.estimatedDeliveryDays);

  const createProduct = async () => {
    setLoading(true);

    const currentErrors = {
      name: isNameValid ? "" : "Field is required",
      desc: isDescValid ? "" : "Field is required",
      price: isPriceValid ? "" : "Price must be set",
      image: "",
      category: isCategoryValid ? "" : "Category must be set",
      estimatedDeliveryDays: isDeliveryInputValid
        ? ""
        : "Estimated delivery days must be set",
    };
    setError(currentErrors);

    const isValidForm = Object.values(currentErrors).every((err) => err === "");

    if (!isValidForm) {
      setLoading(false);
      setTimeout(
        () =>
          setError({
            name: "",
            desc: "",
            price: "",
            image: "",
            category: "",
            estimatedDeliveryDays: "",
          }),
        3000
      );
      return;
    }

    const product = {
      name: data.name,
      active: true,
      desc: data.desc,
      default_price_data: {
        currency: "GBP",
        unit_amount: parseInt(data.price) * 100,
      },
      images: [pic],
    };

    try {
      const response = await fetch(`${backendUrl}/create-product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: product }),
      }).then((res) => res.json());

      if (!response) {
        throw new Error("Failed to create product in the external service.");
      }

      const newProduct = {
        name: data.name,
        active: true,
        desc: data.desc,
        default_price: parseInt(data.price),
        image: pic,
        priceId: response.default_price,
        productId: response.id,
        category: data.category,
        estimatedDeliveryDays: data.estimatedDeliveryDays,
      };

      const createdProduct = await pb.collection("products").create(newProduct);

      if (createdProduct) {
        fetchAllProducts();

        toast.success("Product added successfully!", {
          position: "top-center",
          theme: "light",
          autoClose: 1500,
          hideProgressBar: true,
          draggable: true,
        });

        setTimeout(() => setIsOpen(false), 3000);
      }
    } catch (error) {
      console.error("Error creating product:", error);

      toast.error("An error occurred", {
        position: "top-center",
        theme: "light",
        autoClose: 2000,
        hideProgressBar: true,
        draggable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePic = (pics: File | undefined) => {
    if (pics === undefined) {
      setError((prevState) => ({
        ...prevState,
        image: "Please select an image",
      }));
      setTimeout(() => {
        setError((prevState) => ({
          ...prevState,
          image: "",
        }));
      }, 3000);
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "loveatlast");
      data.append("cloud_name", "dapeum1v8");
      fetch("https://api.cloudinary.com/v1_1/dapeum1v8/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError((prevState) => ({
        ...prevState,
        image: "Image type not supported!",
      }));
      setTimeout(() => {
        setError((prevState) => ({
          ...prevState,
          image: "",
        }));
      }, 3000);
      return;
    }
  };

  const updateProduct = async () => {
    setLoading(true);

    const product = {
      id: editedProduct?.productId,
      name: data.name ? data.name : editedProduct?.name,
      active: true,
      desc: data.desc ? data.desc : editedProduct?.desc,
    };

    try {
      await fetch(`${backendUrl}/update-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: product }),
      })
        .then((response) => response.json())
        .then(async (response) => {
          if (response) {
            try {
              const updatedData = {
                name: data.name || editedProduct?.name,
                active: true,
                desc: data.desc || editedProduct?.desc,
                category: data.category || editedProduct?.category,
                updated: response.updated,
              };

              const updatedProduct = await pb
                .collection("products")
                .update(editedProduct?.id as string, updatedData);

              if (updatedProduct) {
                setLoading(false);
                setShowAccordion(false);

                toast.success("Product updated successfully!", {
                  position: "top-center",
                  theme: "light",
                  autoClose: 1500,
                  hideProgressBar: true,
                  draggable: true,
                });
              }
            } catch (error) {
              console.error("Error updating product:", error);
            }
          }

          setTimeout(() => {
            setIsOpen(false);
          }, 3000);
        });
    } catch (error) {
      toast.error(error as string, {
        position: "top-center",
        theme: "light",
        autoClose: 2000,
        hideProgressBar: true,
        draggable: true,
      });
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-0 w-[100%] bg-opacity-60 bg-[#ccc] flex h-screen z-50">
      <ToastContainer />
      <div className="w-[50%]"></div>
      <div className="bg-[#fff] w-[50%] px-10 pt-4 h-[100%] shadow-2xl">
        <div className="h-[95vh] overflow-y-auto">
          <div className="flex justify-between border-b border-[#808080] pb-4">
            <h2 className="text-[20px] font-semibold">
              {isEditActive ? "Update Product" : "Create New Product"}
            </h2>
            <button
              onClickCapture={() => setIsOpen(false)}
              className="border border-[#333] px-3 py-1 text-[14px] rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>

          <div className="w-[80%] mt-10">
            <div className="flex flex-col w-[100%]">
              <label htmlFor="name" className="font-semibold">
                Name{!isEditActive && "(required)"}:
              </label>
              <span className="text-[12px] text-[#404040] pb-3">
                Name of the product or service, visible to customers.
              </span>
              <input
                type="text"
                id="name"
                placeholder={editedProduct ? editedProduct.name : ""}
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className={`outline-none border border-[#ccc] w-[100%] rounded-lg py-2 px-3 ${
                  error.name && "border-red-500"
                }`}
              />
              <span className="text-red-500 text-[10px] italic">
                {error.name}
              </span>
            </div>

            <div className="flex flex-col w-[100%] mt-6">
              <label htmlFor="name" className="font-semibold">
                desc{!isEditActive && "(required)"}:
              </label>
              <span className="text-[12px] pb-3 text-[#404040]">
                Appears at checkout, on the customer portal, and in quotes.
              </span>
              <textarea
                id="desc"
                placeholder={editedProduct ? editedProduct.desc : ""}
                value={data.desc}
                onChange={(e) => setData({ ...data, desc: e.target.value })}
                className={`outline-none border border-[#ccc] w-[100%] rounded-lg py-2 px-3 ${
                  error.desc && "border-red-500"
                }`}
              />
              <span className="text-red-500 text-[10px] italic">
                {error.desc}
              </span>
            </div>

            <div className="flex flex-col w-[100%] mt-6">
              <label htmlFor="name" className="font-semibold">
                Category{!isEditActive && "(required)"}:
              </label>
              <span className="text-[12px] text-[#404040] pb-3">
                Defines which category the product will be placed.
              </span>
              <select
                id="category"
                value={data.category}
                onChange={(e) => setData({ ...data, category: e.target.value })}
                className={`outline-none border border-[#ccc] bg-[#fff] w-[100%] rounded-lg py-2 px-3 ${
                  error.category && "border-red-500"
                }`}
              >
                <option value="" disabled>
                  {editedProduct ? editedProduct.category : "Select a category"}
                </option>
                <option value="fruits">Fruits</option>
                <option value="cereals">Cereals</option>
                <option value="vegetables">Vegetables</option>
                <option value="meat">Meat</option>
                <option value="milk&dairy">Milk & Dairy</option>
              </select>
              <span className="text-red-500 text-[10px] italic">
                {error.category}
              </span>
            </div>

            {!isEditActive && (
              <div className="flex flex-col w-[100%] mt-6">
                <label htmlFor="name" className="font-semibold">
                  Image:
                </label>
                <span className="text-[12px] pb-3 text-[#404040]">
                  Appears at checkout and customer portal, JPEG or PNG under
                  2MB.
                </span>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="text-[#333] font-semibold flex items-center text-[14px] border border-[#ccc] w-[30%] justify-center py-1 space-x-2 rounded-lg"
                >
                  <FaUpload />
                  <span>Upload</span>
                </button>
                <span className="text-red-500 text-[10px] italic">
                  {error.image}
                </span>
                <span className="text-[#7ea405] mt-1 text-[14px] italic">
                  {pic.slice(0, 20) + "..."}
                </span>
              </div>
            )}

            <div className="flex flex-col w-[100%] mt-6">
              <label htmlFor="name" className="font-semibold mb-3">
                Amount{!isEditActive && "(required)"}[£]:
              </label>
              <input
                type="number"
                id="price"
                placeholder={
                  editedProduct ? `${editedProduct.default_price}` : ""
                }
                value={data.price}
                onChange={(e) => setData({ ...data, price: e.target.value })}
                className={`outline-none border border-[#ccc] w-[100%] rounded-lg py-2 px-3 ${
                  error.price && "border-red-500"
                }`}
              />
              <span className="text-red-500 text-[10px] italic">
                {error.price}
              </span>
            </div>

            {!isEditActive && (
              <div className="flex flex-col w-[100%] mt-6">
                <label htmlFor="name" className="font-semibold">
                  Estimated Delivery Days (required):
                </label>
                <span className="text-[12px] text-[#404040] pb-3">
                  Specifies how long it&apos;ll take for the product to be
                  delivered from the day it was ordered.
                </span>
                <input
                  type="number"
                  id="deliveryDays"
                  placeholder={
                    editedProduct
                      ? editedProduct.estimatedDeliveryDays.toString()
                      : "e.g 5 (days)"
                  }
                  value={data.estimatedDeliveryDays}
                  onChange={(e) =>
                    setData({ ...data, estimatedDeliveryDays: e.target.value })
                  }
                  className={`outline-none border border-[#ccc] w-[100%] rounded-lg py-2 px-3 ${
                    error.estimatedDeliveryDays && "border-red-500"
                  }`}
                />

                <span className="text-red-500 text-[10px] italic">
                  {error.estimatedDeliveryDays}
                </span>
              </div>
            )}

            <div className="flex justify-end mt-6">
              {isEditActive ? (
                <button
                  onClick={updateProduct}
                  className="bg-[#19483a] text-[#fff] text-[14px] flex justify-center items-center h-[35px] w-[150px] rounded-lg font-semibold"
                >
                  {loading ? <Loader /> : "Update Product"}
                </button>
              ) : (
                <button
                  onClick={createProduct}
                  className="bg-[#19483a] text-[#fff] text-[14px] flex justify-center items-center h-[35px] w-[110px] rounded-lg font-semibold"
                >
                  {loading ? <Loader /> : "Add Product"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
