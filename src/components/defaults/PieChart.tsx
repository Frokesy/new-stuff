import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { FaCalendarAlt, FaCaretLeft, FaCaretRight } from "react-icons/fa";

Chart.register(ArcElement);

const data = {
  labels: ["Red Apple", "Watermelon", "Lettuce"],
  datasets: [
    {
      label: "New dataset",

      data: [150,300, 70],

      backgroundColor: [
        "#ee2020",
        "#7ea405",
        "#ffc107",
      ],

      hoverOffset: 4,
    },
  ],
};

const PieChart = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-10 flex justify-between bg-[#fff] rounded-lg w-[100%] py-2 px-4">
        <h2>Top Performing Products</h2>
        <div className="flex items-center space-x-3">
          <FaCalendarAlt color="#808080" />
          <span className="text-[13px] text-[#808080]">Last 6 months</span>
          <FaCaretLeft />
          <FaCaretRight />
        </div>
      </div>
      <div className="w-[65%]">
        <Pie data={data} width={75} height={25} />
      </div>
    </div>
  );
};

export default PieChart;
