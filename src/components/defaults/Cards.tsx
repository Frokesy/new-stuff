import { FaCheck, FaMoneyBill } from "react-icons/fa";
import { FaPeopleGroup, FaShop } from "react-icons/fa6";

const Cards = () => {
  //   const fetchStatistics = () => {
  //     fetch(`${baseUrl}/api/backoffice/statistics`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setStats(data.data);
  //       });
  //   };
  //   useEffect(() => {
  //     fetchStatistics();
  //   }, []);

  //   const numberWithCommas = (number) => {
  //     const numericValue = Number(number);

  //     if (!isNaN(numericValue)) {
  //       return numericValue.toLocaleString();
  //     } else {
  //       return "0.00";
  //     }
  //   };

  const CardContent = [
    {
      title: "Total Products",
      value: "35",
      icon: <FaShop />,
      color: "#1B264F",
    },
    {
      title: "Total Users",
      value: "2k+",
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
                {card.value}
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
