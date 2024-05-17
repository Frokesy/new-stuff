import { useEffect } from "react";
import Chart from "chart.js/auto";
import { FaCalendarAlt, FaCaretLeft, FaCaretRight } from "react-icons/fa";

function Graph(): JSX.Element {
  useEffect(() => {
    const canvas = document.getElementById("myChart") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Unable to get 2D context for canvas");
    }

    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
        datasets: [
          {
            data: [50, 150, 300, 500, 750, 1100],
            label: "Users",
            borderColor: "#3A5743",
            backgroundColor: "#3A5743",
          },
        ],
      },
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div className={`flex flex-col`}>
      <div className="mb-10 flex justify-between bg-[#f1f1f1] rounded-lg py-2 px-4">
        <h2>Users on Rehobothz</h2>
        <div className="flex items-center space-x-3">
          <FaCalendarAlt color="#808080" />
          <span className="text-[13px] text-[#808080]">Last 6 months</span>
          <FaCaretLeft />
          <FaCaretRight />
        </div>
      </div>
      {/* line chart */}
      <div className="bg-white mx-4 px-4 pb-[3vh] pt-2">
        <div className="">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </div>
  );
}

export default Graph;
