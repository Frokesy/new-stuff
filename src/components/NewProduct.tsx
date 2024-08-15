import React, { FC, useEffect, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./defaults/Loader";
import { supabase } from "../../utils/supabaseClient";

interface ProductProps {
  active: boolean;
  created_at: number;
  default_price: string;
  id: string;
  image: string;
  livemode: false;
  metadata: object;
  name: string;
  object: string;
  type: string;
  updated: string;
  description: string;
  category?: string;
  estimatedDeliveryDays: number;
}

interface NewProductProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditActive?: boolean;
  editedProduct?: ProductProps;
}

const NewProduct: FC<NewProductProps> = ({
  setIsOpen,
  isEditActive,
  editedProduct,
}) => {
  const [data, setData] = useState({
    name: "",
    active: true,
    description: "",
    price: "",
    category: "",
    estimatedDeliveryDays: "",
  });

  const [error, setError] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    estimatedDeliveryDays: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pic, setPic] = useState<string>("");
  const [prices, setPrices] = useState<{ [key: string]: number }>({});

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
  const isDescValid = validateField(data.description);
  const isPriceValid = validateField(data.price);
  const isCategoryValid = validateField(data.category);
  const isDeliveryInputValid = validateField(data.estimatedDeliveryDays);

  const createProduct = async () => {
    setLoading(true);
    setError({
      name: isNameValid ? "" : "Field is required",
      description: isDescValid ? "" : "Field is required",
      price: isPriceValid ? "" : "Price must be set",
      image: "",
      category: isCategoryValid ? "" : "Category must be set",
      estimatedDeliveryDays: isDeliveryInputValid
        ? ""
        : "Estimated delivery days must be set",
    });

    const product = {
      name: data.name,
      active: true,
      description: data.description,
      default_price_data: {
        currency: "GBP",
        unit_amount: parseInt(data.price) * 100,
      },
      images: [pic],
    };

    if (isNameValid && isPriceValid && isDescValid && error.image === "") {
      try {
        await fetch("http://localhost:4000/create-product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: product }),
        })
          .then((response) => response.json())
          .then(async (response) => {
            if (response) {
              const { data: product, error: productError } = await supabase
                .from("products")
                .insert([
                  {
                    name: data.name,
                    active: true,
                    desc: data.description,
                    default_price: parseInt(data.price),
                    image: pic,
                    priceId: response.default_price,
                    productId: response.id,
                    category: data.category,
                    estimatedDeliveryDays: data.estimatedDeliveryDays,
                  },
                ]);
              if (!productError) {
                console.log("Product added to supabase", product);
              } else {
                console.log("error", productError);
              }
            }

            setLoading(false);

            toast.success("Product added successfully!", {
              position: "top-center",
              theme: "light",
              autoClose: 1500,
              hideProgressBar: true,
              draggable: true,
            });
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
    } else {
      setLoading(false);
      if (!isNameValid) {
        setTimeout(() => {
          setError((prevState) => ({ ...prevState, name: "" }));
        }, 3000);
      }
      if (!isDescValid) {
        setTimeout(() => {
          setError((prevState) => ({ ...prevState, description: "" }));
        }, 3000);
      }
      if (!isPriceValid) {
        setTimeout(() => {
          setError((prevState) => ({ ...prevState, price: "" }));
        }, 3000);
      }
      if (!isCategoryValid) {
        setTimeout(() => {
          setError((prevState) => ({ ...prevState, price: "" }));
        }, 3000);
      }
      if (!isDeliveryInputValid) {
        setTimeout(() => {
          setError((prevState) => ({
            ...prevState,
            estimatedDeliveryDays: "",
          }));
        }, 3000);
      }
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

  const getPrice = async () => {
    await fetch("http://localhost:4000/fetch-prices", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((pricesData) => {
        const pricesMap: { [key: string]: number } = {};
        pricesData.forEach((price: { id: string; unit_amount: number }) => {
          pricesMap[price.id] = price.unit_amount;
        });
        setPrices(pricesMap);
      });
  };

  const updateProduct = async () => {
    setLoading(true);

    const product = {
      id: editedProduct?.id,
      name: data.name ? data.name : editedProduct?.name,
      active: true,
      description: data.description
        ? data.description
        : editedProduct?.description,
    };

    try {
      await fetch("http://localhost:4000/update-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: product }),
      })
        .then((response) => response.json())
        .then(async (response) => {
          if (response) {
            const { data: product, error: productError } = await supabase
              .from("products")
              .update([
                {
                  name: data.name ? data.name : editedProduct?.name,
                  active: true,
                  desc: data.description
                    ? data.description
                    : editedProduct?.description,
                  category: data.category
                    ? data.category
                    : editedProduct?.category,
                  updated: response.updated,
                },
              ])
              .eq("productId", editedProduct?.id);
            if (!productError) {
              console.log("Product updated", product);
            } else {
              console.log("error", productError);
            }
          }

          setLoading(false);

          toast.success("Product updated successfully!", {
            position: "top-center",
            theme: "light",
            autoClose: 1500,
            hideProgressBar: true,
            draggable: true,
          });
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

  useEffect(() => {
    getPrice();
  }, []);

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
                Description{!isEditActive && "(required)"}:
              </label>
              <span className="text-[12px] pb-3 text-[#404040]">
                Appears at checkout, on the customer portal, and in quotes.
              </span>
              <textarea
                id="desc"
                placeholder={editedProduct ? editedProduct.description : ""}
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                className={`outline-none border border-[#ccc] w-[100%] rounded-lg py-2 px-3 ${
                  error.description && "border-red-500"
                }`}
              />
              <span className="text-red-500 text-[10px] italic">
                {error.description}
              </span>
            </div>

            <div className="flex flex-col w-[100%] mt-6">
              <label htmlFor="name" className="font-semibold">
                Category{!isEditActive && "(required)"}:
              </label>
              <span className="text-[12px] text-[#404040] pb-3">
                Defines which category the product will be placed.
              </span>
              <input
                type="text"
                id="category"
                placeholder={
                  editedProduct ? editedProduct.category : "e.g cereals, fruits"
                }
                value={data.category}
                onChange={(e) => setData({ ...data, category: e.target.value })}
                className={`outline-none border border-[#ccc] w-[100%] rounded-lg py-2 px-3 ${
                  error.category && "border-red-500"
                }`}
              />
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
                  editedProduct
                    ? `${(prices[editedProduct.default_price] / 100).toFixed(
                        2
                      )}`
                    : ""
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
