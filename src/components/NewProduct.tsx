import React, { FC, useEffect, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./defaults/Loader";

interface ProductProps {
  active: boolean;
  created: number;
  default_price: string;
  id: string;
  images: object[];
  livemode: false;
  metadata: object;
  name: string;
  object: string;
  type: string;
  updated: string;
  description: string;
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
  });

  const [error, setError] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
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

  const createProduct = async () => {
    setLoading(true);
    setError({
      name: isNameValid ? "" : "Field is required",
      description: isDescValid ? "" : "Field is required",
      price: isPriceValid ? "" : "Price must be set",
      image: "",
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
          .then((response) => {
            console.log(response);
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

    // if (data.price !== "") {
    //   const updatedPrice = {
    //     id: editedProduct?.default_price,
    //     unit_amount: parseInt(data.price) * 100,
    //   }
    //   await fetch("http://localhost:4000/update-price", {
    //     method: "POST",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     body: JSON.stringify({ item: updatedPrice }),
    //   })
    //     .then((response) => response.json())
    //     .then((response) => {
    //       console.log(response);
    //     });
    // }
    setError({
      name: isNameValid ? "" : "Field is required",
      description: isDescValid ? "" : "Field is required",
      price: isPriceValid ? "" : "Price must be set",
      image: "",
    });

    const product = {
      id: editedProduct?.id,
      name: data.name ? data.name : editedProduct?.name,
      active: true,
      description: data.description
        ? data.description
        : editedProduct?.description,
      // default_price: updatedPrice,
    };

    if (isNameValid && isPriceValid && isDescValid && error.image === "") {
      try {
        await fetch("http://localhost:4000/update-product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: product }),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
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

          {!isEditActive && (
            <div className="flex flex-col w-[100%] mt-6">
              <label htmlFor="name" className="font-semibold">
                Image:
              </label>
              <span className="text-[12px] pb-3 text-[#404040]">
                Appears at checkout and customer portal, JPEG or PNG under 2MB.
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
                  ? `${(prices[editedProduct.default_price] / 100).toFixed(2)}`
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
  );
};

export default NewProduct;
