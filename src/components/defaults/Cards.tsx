import { useEffect, useState } from "react";
import { FaCheck, FaMoneyBill } from "react-icons/fa";
import { FaPeopleGroup, FaShop } from "react-icons/fa6";
import PageLoader from "./PageLoader";
import { pb } from "../../../utils/pocketbaseClient";

interface OrderProps {
  id: number;
  products: string[];
  session_id: string;
  status: string;
  totalCost: string;
  user_id: string;
}

const Cards = () => {
  const [data, setData] = useState({
    users: [],
    products: [],
    totalOrders: [] as OrderProps[],
    completedOrders: [] as OrderProps[],
  });
  const totalRevenue = data.completedOrders.reduce(
    (sum, order) => sum + parseInt(order.totalCost),
    0
  );

  const CardContent = [
    {
      title: "Total Products",
      value: data.products.length === 0 ? 0 : data.products.length,
      icon: <FaShop />,
      color: "#1B264F",
    },
    {
      title: "Total Users",
      value: data.users.length === 0 ? 0 : data.users.length,
      color: "#F7B32B",
      icon: <FaPeopleGroup />,
    },
    {
      title: "Total Revenue",
      value: `£${totalRevenue}`,
      icon: <FaMoneyBill />,
      color: "#1c9772",
    },
    {
      title: "Orders (Completed)",
      value: `${data.totalOrders.length === 0 ? 0 : data.totalOrders.length} (${
        data.completedOrders.length === 0 ? 0 : data.completedOrders.length
      })`,
      icon: <FaCheck />,
      color: "#34252F",
    },
  ];

  const fetchAllProducts = async () => {
    try {
      const products = await pb.collection("products").getFullList();

      setData((prevState) => ({
        ...prevState,
        products: products as never[],
      }));
    } catch (error) {
      console.error("Error fetching Products:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const orders = await pb.collection("orders").getFullList();

      const completedOrders = orders.filter(
        (order) => order.status === "completed"
      );

      setData((prevState) => ({
        ...prevState,
        completedOrders: completedOrders as unknown as OrderProps[],
      }));

      setData((prevState) => ({
        ...prevState,
        totalOrders: orders as unknown as OrderProps[],
      }));
    } catch (error) {
      console.error("Error fetching Orders:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const users = await pb.collection("users").getFullList();

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
    fetchOrders();
    fetchUsers();
  }, []);

  console.log(data);

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
