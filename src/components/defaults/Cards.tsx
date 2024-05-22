import { useEffect, useState } from "react";
import { FaCheck, FaMoneyBill } from "react-icons/fa";
import { FaPeopleGroup, FaShop } from "react-icons/fa6";
import { supabase } from "../../../utils/supabaseClient";
import PageLoader from "./PageLoader";

const Cards = () => {
  const [data, setData] = useState({
    users: [],
    products: [],
  });
  const CardContent = [
    {
      title: "Total Products",
      value: data.products.length,
      icon: <FaShop />,
      color: "#1B264F",
    },
    {
      title: "Total Users",
      value: data.users.length,
      color: "#F7B32B",
      icon: <FaPeopleGroup />,
    },
    {
      title: "Total Revenue",
      value: `$6k+`,
      icon: <FaMoneyBill />,
      color: "#1c9772",
    },
    {
      title: "Orders Completed",
      value: "65",
      icon: <FaCheck />,
      color: "#34252F",
    },
  ];

  const fetchAllProducts = async () => {
    await fetch("http://localhost:4000/fetch-products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((productsData) => {
        setData((prevState) => ({
          ...prevState,
          products: productsData,
        }));
      });
  };

  const fetchUsers = async () => {
    try {
      const { data: users, error } = await supabase.from("users").select("*");
      if (error) {
        throw error;
      }
      setData((prevState) => ({
        ...prevState,
        users: users as never[],
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchAllProducts();
    fetchUsers();
  }, []);

  return (
    <div className="w-[100%] mx-auto">
      <div className="grid grid-cols-4 gap-x-[3vw]">
        {CardContent.map((card, index) => (
          <div
            key={index}
            className={`bg-[#f1f1f1] flex flex-col rounded-lg shadow-lg py-4 px-6 cursor-pointer hover:shadow-2xl duration-300 transition-all ease-in-out`}
          >
            <div className="flex">
              <h2
                className="text-[32px] bg-[#ccc] p-3 rounded-full"
                style={{ color: card.color }}
              >
                {card.icon}
              </h2>
            </div>
            <div className="flex flex-col items-center text-center justify-center space-y-2 mt-4">
              <h1
                style={{ color: card.color }}
                className={`font-bold text-[30px]`}
              >
                {card.value ? card.value : <PageLoader />}
              </h1>
              <h1 className="text-[#1B264F] font-bold text-[15px]">
                {card.title}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
